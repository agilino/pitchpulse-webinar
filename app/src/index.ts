import { Hono } from "hono";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import {
  addQuestion,
  clearRoom,
  listQuestions,
  markAnswered,
  MAX_QUESTION_LENGTH,
  SKETCH_PATTERN,
  toggleVote,
} from "./db";
import { clearRoomPage, moderationPage, pinPage, questionsPage } from "./views";

type App = { Bindings: Cloudflare.Env; Variables: { voter: string } };

const app = new Hono<App>();

const VOTER_COOKIE = "voter";
const VOTER_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * A voter is a random cookie, set on the first visit and kept for 30 days.
 * Nothing else about the visitor is stored.
 */
app.use(async (c, next) => {
  let voter = getCookie(c, VOTER_COOKIE);
  if (!voter || !VOTER_PATTERN.test(voter)) {
    voter = crypto.randomUUID();
    setCookie(c, VOTER_COOKIE, voter, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: new URL(c.req.url).protocol === "https:",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
  c.set("voter", voter);
  await next();
});

/**
 * Why a question cannot be accepted, or null when it can. Length is counted in
 * Unicode characters with a line break counting once, like the database check.
 */
function questionError(text: string): string | null {
  if (text.trim() === "") return "Please type a question.";
  if ([...text].length > MAX_QUESTION_LENGTH) {
    return `A question can have at most ${MAX_QUESTION_LENGTH} characters.`;
  }
  return null;
}

/**
 * Checks the moderation PIN in constant time. Without a configured MOD_PIN,
 * moderation stays locked.
 */
async function isModPin(given: string, expected: string | undefined): Promise<boolean> {
  if (!expected) return false;
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(given)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  return crypto.subtle.timingSafeEqual(a, b);
}

async function pinFromForm(c: Context<App>): Promise<string> {
  const { pin } = await c.req.parseBody();
  return typeof pin === "string" ? pin : "";
}

app.get("/", async (c) => c.html(questionsPage(await listQuestions(c.env.DB))));

app.post("/questions", async (c) => {
  const body = await c.req.parseBody();
  const text = typeof body.text === "string" ? body.text.replace(/\r\n/g, "\n") : "";
  const error = questionError(text);
  if (error) {
    return c.html(
      questionsPage(await listQuestions(c.env.DB), { draft: text, error }),
      400,
    );
  }
  // The sketch is optional: missing or empty means none. On a rejection it is
  // not sent back, so the pad is empty again.
  const sketch = typeof body.sketch === "string" && body.sketch !== "" ? body.sketch : null;
  if (sketch !== null && !SKETCH_PATTERN.test(sketch)) {
    return c.html(
      questionsPage(await listQuestions(c.env.DB), {
        draft: text,
        error: "The sketch could not be read. Please draw it again.",
      }),
      400,
    );
  }
  await addQuestion(c.env.DB, text, sketch);
  return c.redirect("/", 303);
});

// A vote for a question that no longer exists is ignored: the attendee's page
// was out of date, so they are sent to the current list.
app.post("/questions/:id{[0-9]+}/vote", async (c) => {
  await toggleVote(c.env.DB, Number(c.req.param("id")), c.get("voter"));
  return c.redirect("/", 303);
});

app.get("/mod", (c) =>
  c.html(pinPage(undefined, c.req.query("cleared") ? "The room is cleared." : undefined)),
);

app.post("/mod", async (c) => {
  const pin = await pinFromForm(c);
  if (!(await isModPin(pin, c.env.MOD_PIN))) {
    return c.html(pinPage("Wrong PIN."), 403);
  }
  return c.html(moderationPage(await listQuestions(c.env.DB), pin));
});

// Clearing the room takes the PIN and one confirmation. Without the
// confirmation the host gets the page that asks for it, and nothing is removed.
app.post("/mod/clear", async (c) => {
  const body = await c.req.parseBody();
  const pin = typeof body.pin === "string" ? body.pin : "";
  if (!(await isModPin(pin, c.env.MOD_PIN))) {
    return c.html(pinPage("Wrong PIN."), 403);
  }
  if (body.confirm !== "yes") {
    const questions = await listQuestions(c.env.DB);
    return c.html(clearRoomPage(questions.length, pin));
  }
  await clearRoom(c.env.DB);
  // Redirect to the PIN form: the browser then has no clear request left that
  // a reload could send again.
  return c.redirect("/mod?cleared=1", 303);
});

app.post("/questions/:id{[0-9]+}/answer", async (c) => {
  const pin = await pinFromForm(c);
  if (!(await isModPin(pin, c.env.MOD_PIN))) {
    return c.html(pinPage("Wrong PIN."), 403);
  }
  const found = await markAnswered(c.env.DB, Number(c.req.param("id")));
  if (!found) return c.notFound();
  return c.html(moderationPage(await listQuestions(c.env.DB), pin));
});

export default app;
