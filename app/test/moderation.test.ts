import { env, exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";

// The value vitest.config.ts binds as MOD_PIN.
const RIGHT_PIN = "1234";
const WRONG_PIN = "0000";

async function addQuestion(text: string, askedAt: string): Promise<number> {
  const row = await env.DB.prepare(
    "INSERT INTO questions (text, created_at) VALUES (?, ?) RETURNING id",
  )
    .bind(text, askedAt)
    .first<{ id: number }>();
  return row!.id;
}

function markAsAnswered(id: number, pin: string): Promise<Response> {
  return exports.default.fetch(
    `https://pitchpulse.test/questions/${id}/answer`,
    { method: "POST", body: new URLSearchParams({ pin }) },
  );
}

async function isAnswered(id: number): Promise<boolean> {
  const row = await env.DB.prepare(
    "SELECT answered_at FROM questions WHERE id = ?",
  )
    .bind(id)
    .first<{ answered_at: string | null }>();
  return row!.answered_at !== null;
}

/** Ids of the questions in the order the attendee list shows them. */
async function listedIds(): Promise<number[]> {
  const page = await exports.default.fetch("https://pitchpulse.test/");
  const html = await page.text();
  return [...html.matchAll(/data-question="(\d+)"/g)].map((m) => Number(m[1]));
}

describe("Moderation", () => {
  it("The host marks a question as answered with the right PIN", async () => {
    const id = await addQuestion(
      "How do you keep spec and code in sync?",
      "2026-11-24T18:00:00.000Z",
    );

    const response = await markAsAnswered(id, RIGHT_PIN);

    expect(response.status).toBe(200);
    expect(await isAnswered(id)).toBe(true);
  });

  it("A wrong PIN does not change anything", async () => {
    const id = await addQuestion(
      "Which model plans, which one builds?",
      "2026-11-24T18:00:00.000Z",
    );

    const response = await markAsAnswered(id, WRONG_PIN);

    expect(response.status).toBe(403);
    expect(await isAnswered(id)).toBe(false);
  });

  it("An answered question moves to the bottom", async () => {
    const older = await addQuestion(
      "How do you keep spec and code in sync?",
      "2026-11-24T18:00:00.000Z",
    );
    const newer = await addQuestion(
      "Can we get the prompts afterwards?",
      "2026-11-24T18:01:00.000Z",
    );
    expect(await listedIds()).toEqual([older, newer]);

    await markAsAnswered(older, RIGHT_PIN);

    expect(await listedIds()).toEqual([newer, older]);
  });
});
