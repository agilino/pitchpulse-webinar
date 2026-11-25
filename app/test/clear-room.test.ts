import { env, exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { askQuestion, isRedirectHome, listed, newVoter, vote } from "./attendee";

// The value vitest.config.ts binds as MOD_PIN.
const RIGHT_PIN = "1234";
const WRONG_PIN = "0000";

const BASE = "https://pitchpulse.test";

/** The host presses "Clear room"; with `confirm` the host also confirms. */
function clearRoom(pin: string, { confirm }: { confirm: boolean }): Promise<Response> {
  const fields: Record<string, string> = confirm ? { pin, confirm: "yes" } : { pin };
  return exports.default.fetch(`${BASE}/mod/clear`, {
    method: "POST",
    redirect: "manual",
    body: new URLSearchParams(fields),
  });
}

function markAsAnswered(id: number, pin: string): Promise<Response> {
  return exports.default.fetch(`${BASE}/questions/${id}/answer`, {
    method: "POST",
    body: new URLSearchParams({ pin }),
  });
}

async function storedVotes(): Promise<number> {
  const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM votes").first<{ n: number }>();
  return row!.n;
}

describe("Clear room", () => {
  it("The host clears the room with the right PIN", async () => {
    const open = await askQuestion("How do you keep spec and code in sync?");
    const answered = await askQuestion("Can we get the prompts afterwards?");
    await vote(open, newVoter());
    await vote(answered, newVoter());
    await markAsAnswered(answered, RIGHT_PIN);
    expect((await listed()).map((q) => q.votes)).toEqual([1, 1]);

    const response = await clearRoom(RIGHT_PIN, { confirm: true });

    // The answer is a redirect to the PIN form, so that reloading the page
    // cannot send the clear request a second time.
    expect(response.status).toBe(303);
    expect(response.headers.get("Location")).toBe("/mod?cleared=1");
    expect(await listed()).toEqual([]);
    expect(await storedVotes()).toBe(0);
  });

  it("A wrong PIN does not clear the room", async () => {
    const text = "Which model plans, which one builds?";
    const id = await askQuestion(text);
    await vote(id, newVoter());

    const response = await clearRoom(WRONG_PIN, { confirm: true });

    expect(response.status).toBe(403);
    expect(await listed()).toEqual([{ id, votes: 1, text }]);
  });

  it("Clearing without confirmation removes nothing", async () => {
    const text = "Which model plans, which one builds?";
    const id = await askQuestion(text);
    await vote(id, newVoter());

    const response = await clearRoom(RIGHT_PIN, { confirm: false });

    expect(response.status).toBe(200);
    expect(await listed()).toEqual([{ id, votes: 1, text }]);
  });

  it("A vote for a cleared question is not counted", async () => {
    const id = await askQuestion("How do you keep spec and code in sync?");
    await clearRoom(RIGHT_PIN, { confirm: true });

    const response = await vote(id, newVoter());

    expect(isRedirectHome(response)).toBe(true);
    expect(await listed()).toEqual([]);
    expect(await storedVotes()).toBe(0);
  });
});
