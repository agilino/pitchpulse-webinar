// Smoketest: posts a question, votes once and checks the ordering.
//
//   npm run smoketest -- https://pitchpulse.example.workers.dev
//
// It takes its vote back at the end. With MOD_PIN in the environment it also
// marks its question as answered, so it moves to the bottom of the list.

const base = (process.argv[2] ?? "").replace(/\/+$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Usage: npm run smoketest -- <url>");
  process.exit(2);
}

let failed = false;
function step(name, ok, detail = "") {
  if (!ok) failed = true;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `  [${detail}]`}`);
}

let voter = "";
const post = (path, fields = {}) =>
  fetch(base + path, {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${voter}` },
    body: new URLSearchParams(fields),
  });

/** The questions in the order the attendee page lists them. */
async function listed() {
  const page = await fetch(base + "/", { headers: { Cookie: `voter=${voter}` } });
  const html = await page.text();
  return [...html.matchAll(/<li\b([^>]*)>\s*<p>([\s\S]*?)<\/p>/g)]
    .filter(([, attributes]) => /data-question="\d+"/.test(attributes))
    .map(([, attributes, text]) => ({
      id: Number(/data-question="(\d+)"/.exec(attributes)[1]),
      votes: Number(/data-votes="(\d+)"/.exec(attributes)[1]),
      answered: /class="[^"]*\banswered\b/.test(attributes),
      text,
    }));
}

/** Open questions before answered ones, and within each group most votes first. */
function isOrderedByVotes(questions) {
  return questions.every((question, i) => {
    if (i === 0) return true;
    const previous = questions[i - 1];
    if (previous.answered !== question.answered) return question.answered;
    return previous.votes >= question.votes;
  });
}

/**
 * On a tie the older question comes first. Ids grow with every question asked,
 * so among the open questions with the same votes as the Smoketest question the
 * ids must rise. This also holds while other people ask and vote.
 */
function tieIsOldestFirst(questions, id) {
  const mine = questions.find((question) => question.id === id);
  if (!mine) return false;
  const tied = questions.filter((q) => !q.answered && q.votes === mine.votes);
  return tied.every((question, i) => i === 0 || tied[i - 1].id < question.id);
}

const home = await fetch(base + "/");
step("the page answers", home.status === 200, home.status);
voter = /voter=([^;]+)/.exec(home.headers.getSetCookie().join("; "))?.[1] ?? "";
step("a voter cookie is set", voter !== "");

const text = `Smoketest ${new Date().toISOString()}`;
const asked = await post("/questions", { text });
step("a question is accepted", asked.status === 303, asked.status);
const mine = (await listed()).find((question) => question.text === text);
step("it is listed", mine !== undefined);

if (mine) {
  const voted = await post(`/questions/${mine.id}/vote`);
  const afterVote = await listed();
  const votes = afterVote.find((question) => question.id === mine.id)?.votes ?? 0;
  step("its vote counts", voted.status === 303 && votes > mine.votes, votes);
  step("the list is ordered by votes", isOrderedByVotes(afterVote));
  step("on a tie the older questions come first", tieIsOldestFirst(afterVote, mine.id));

  // Tidy up. Other people may vote for the question at the same moment, so the
  // count after taking the vote back is reported, not asserted.
  await post(`/questions/${mine.id}/vote`);
  const afterUndo = (await listed()).find((question) => question.id === mine.id)?.votes;
  console.log(`note the Smoketest took its vote back; its question now has ${afterUndo ?? "no"} votes`);

  if (process.env.MOD_PIN) {
    const answered = await post(`/questions/${mine.id}/answer`, { pin: process.env.MOD_PIN });
    step("the Smoketest question is marked as answered", answered.status === 200, answered.status);
  }
}

console.log(failed ? "Smoketest failed" : "Smoketest passed");
process.exit(failed ? 1 : 0);
