import { html } from "hono/html";
import { MAX_QUESTION_LENGTH, type Question } from "./db";

// `html` escapes every interpolated value, so question text is always shown as
// plain text and a link in a question is never clickable.
type Html = ReturnType<typeof html>;

const styles = html`<style>
  :root {
    --ink: #1f2328;
    --muted: #6b7280;
    --paper: #fffdf4;
    --card: #ffffff;
    --accent: #ffd966;
    --error: #b42318;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font: 16px/1.45 system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  main {
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.25rem 1rem 3rem;
  }
  h1 {
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
  }
  .lead {
    margin: 0 0 1.25rem;
    color: var(--muted);
  }
  .questions {
    display: grid;
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .question {
    padding: 0.75rem 0.9rem;
    border: 2px solid var(--ink);
    border-radius: 0.75rem;
    background: var(--card);
  }
  .question p {
    margin: 0;
    overflow-wrap: anywhere;
  }
  .question.answered {
    border-style: dashed;
    border-color: var(--muted);
    color: var(--muted);
  }
  .question.answered p {
    text-decoration: line-through;
  }
  .badge {
    display: inline-block;
    margin-top: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
  .actions form {
    margin: 0;
  }
  .actions .badge {
    margin: 0;
  }
  .votes {
    font-weight: 600;
  }
  .ask {
    margin: 0 0 1.5rem;
  }
  .ask-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .count {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .count.over {
    color: var(--error);
    font-weight: 600;
  }
  label {
    font-weight: 600;
  }
  input[type="password"],
  textarea {
    display: block;
    width: 100%;
    margin: 0.35rem 0 0.75rem;
    padding: 0.6rem 0.75rem;
    border: 2px solid var(--ink);
    border-radius: 0.6rem;
    font: inherit;
  }
  textarea {
    resize: vertical;
  }
  button {
    padding: 0.55rem 0.9rem;
    border: 2px solid var(--ink);
    border-radius: 0.6rem;
    background: var(--accent);
    color: var(--ink);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
  .error {
    color: var(--error);
    font-weight: 600;
  }
  .empty {
    color: var(--muted);
  }
  .notice {
    font-weight: 600;
  }
  .clear {
    margin-top: 1.5rem;
  }
  button.danger {
    background: var(--error);
    color: #ffffff;
  }
  button.plain {
    background: var(--card);
  }
  .sketch-label {
    display: block;
    margin-bottom: 0.35rem;
    font-weight: 600;
  }
  .sketch-pad {
    display: block;
    width: 100%;
    max-width: 320px;
    height: auto;
    margin: 0 0 0.75rem;
    border: 2px dashed var(--ink);
    border-radius: 0.6rem;
    background: #ffffff;
    touch-action: none;
    cursor: crosshair;
  }
  .sketch {
    display: block;
    max-width: 100%;
    height: auto;
    margin-top: 0.6rem;
    border: 1px solid var(--muted);
    border-radius: 0.5rem;
    background: #ffffff;
  }
</style>`;

const layout = (title: string, content: Html) => html`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    ${styles}
  </head>
  <body>
    <main>${content}</main>
  </body>
</html>`;

const votesText = (votes: number) => `${votes} ${votes === 1 ? "vote" : "votes"}`;

const answeredBadge = (question: Question) =>
  question.answered_at ? html`<span class="badge">answered</span>` : "";

const questionItem = (question: Question, actions: Html) => html`
  <li
    class="question${question.answered_at ? " answered" : ""}"
    data-question="${question.id}"
    data-votes="${question.votes}"
  >
    <p>${question.text}</p>
    ${question.sketch
      ? html`<img
          class="sketch"
          src="${question.sketch}"
          alt="Sketch for this question"
        />`
      : ""}
    <div class="actions">${actions}</div>
  </li>
`;

const questionList = (
  questions: Question[],
  actionsFor: (question: Question) => Html,
) =>
  questions.length === 0
    ? html`<p class="empty">No questions yet.</p>`
    : html`<ol class="questions">
        ${questions.map((q) => questionItem(q, actionsFor(q)))}
      </ol>`;

// Counts characters the way the server does: Unicode characters, a line break
// counts once. No `${` in here, the template would interpolate it.
const counterScript = html`<script>
  (function () {
    var field = document.getElementById("text");
    var count = document.getElementById("count");
    var max = Number(count.dataset.max);
    function update() {
      var n = Array.from(field.value.replace(/\\r\\n/g, "\\n")).length;
      count.textContent = n + " / " + max;
      count.classList.toggle("over", n > max);
    }
    field.addEventListener("input", update);
    update();
  })();
</script>`;

// The sketch pad: draw with finger, pen or mouse. The hidden field is filled
// only on submit and only when something was drawn. No `${` and no backslash
// in here, the template would interpret them.
const sketchScript = html`<script>
  (function () {
    var canvas = document.getElementById("sketch-pad");
    var field = document.getElementById("sketch");
    var clear = document.getElementById("sketch-clear");
    if (!canvas || !field || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var drawn = false;
    var drawing = false;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1f2328";
    function point(event) {
      var box = canvas.getBoundingClientRect();
      return {
        x: ((event.clientX - box.left) * canvas.width) / box.width,
        y: ((event.clientY - box.top) * canvas.height) / box.height,
      };
    }
    canvas.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      drawing = true;
      drawn = true;
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
      var p = point(event);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + 0.1, p.y + 0.1);
      ctx.stroke();
    });
    canvas.addEventListener("pointermove", function (event) {
      if (!drawing) return;
      event.preventDefault();
      var p = point(event);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    function stop() {
      drawing = false;
    }
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);
    function empty() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawn = false;
      field.value = "";
    }
    if (clear) clear.addEventListener("click", empty);
    canvas.form.addEventListener("submit", function () {
      field.value = drawn ? canvas.toDataURL("image/png") : "";
    });
    field.value = "";
  })();
</script>`;

const askForm = (draft: string, error?: string) => html`
  <form class="ask" method="post" action="/questions">
    <label for="text">Your question</label>
    <textarea id="text" name="text" rows="3" required>${draft}</textarea>
    ${error ? html`<p class="error" role="alert">${error}</p>` : ""}
    <span class="sketch-label">Sketch (optional)</span>
    <canvas
      id="sketch-pad"
      class="sketch-pad"
      width="320"
      height="200"
      aria-label="Sketch pad, draw with your finger"
    ></canvas>
    <input type="hidden" id="sketch" name="sketch" value="" />
    <div class="ask-row">
      <span id="count" class="count" data-max="${MAX_QUESTION_LENGTH}"
        >0 / ${MAX_QUESTION_LENGTH}</span
      >
      <button type="button" id="sketch-clear" class="plain">Clear sketch</button>
      <button type="submit">Ask</button>
    </div>
  </form>
  ${counterScript} ${sketchScript}
`;

/**
 * What attendees see. After a rejected question the page shows the error and
 * keeps the typed text in the form.
 */
export const questionsPage = (
  questions: Question[],
  ask: { draft?: string; error?: string } = {},
) =>
  layout(
    "PitchPulse",
    html`
      <h1>PitchPulse</h1>
      <p class="lead">Questions for the speaker.</p>
      ${askForm(ask.draft ?? "", ask.error)}
      ${questionList(
        questions,
        (q) => html`
          <form method="post" action="/questions/${q.id}/vote">
            <button type="submit" aria-label="Vote, ${votesText(q.votes)}">
              ▲ ${q.votes}
            </button>
          </form>
          ${answeredBadge(q)}
        `,
      )}
    `,
  );

/** The PIN form in front of moderation. */
export const pinPage = (error?: string, notice?: string) =>
  layout(
    "PitchPulse host",
    html`
      <h1>Host</h1>
      ${notice ? html`<p class="notice">${notice}</p>` : ""}
      <p class="lead">Enter the moderation PIN.</p>
      ${error ? html`<p class="error">${error}</p>` : ""}
      <form method="post" action="/mod">
        <label for="pin">PIN</label>
        <input
          id="pin"
          name="pin"
          type="password"
          autocomplete="off"
          required
          autofocus
        />
        <button type="submit">Open moderation</button>
      </form>
    `,
  );

/**
 * The host's list. There is no host session: every action sends the PIN again,
 * so the page carries it in a hidden field.
 */
export const moderationPage = (questions: Question[], pin: string) =>
  layout(
    "PitchPulse host",
    html`
      <h1>Host</h1>
      <p class="lead">Answered questions move to the bottom.</p>
      ${questionList(
        questions,
        (q) => html`
          <span class="votes">${votesText(q.votes)}</span>
          ${q.answered_at
            ? answeredBadge(q)
            : html`
                <form method="post" action="/questions/${q.id}/answer">
                  <input type="hidden" name="pin" value="${pin}" />
                  <button type="submit">Mark as answered</button>
                </form>
              `}
        `,
      )}
      ${questions.length === 0
        ? ""
        : html`
            <form class="clear" method="post" action="/mod/clear">
              <input type="hidden" name="pin" value="${pin}" />
              <button type="submit" class="danger">Clear room</button>
            </form>
          `}
    `,
  );

/** The host confirms once before the room is cleared. */
export const clearRoomPage = (count: number, pin: string) =>
  layout(
    "PitchPulse host",
    html`
      <h1>Clear the room?</h1>
      <p class="lead">
        This removes all questions (${count}) and their votes for everyone. It
        cannot be undone.
      </p>
      <div class="actions">
        <form method="post" action="/mod/clear">
          <input type="hidden" name="pin" value="${pin}" />
          <input type="hidden" name="confirm" value="yes" />
          <button type="submit" class="danger">Yes, clear the room</button>
        </form>
        <form method="post" action="/mod">
          <input type="hidden" name="pin" value="${pin}" />
          <button type="submit" class="plain">Cancel</button>
        </form>
      </div>
    `,
  );
