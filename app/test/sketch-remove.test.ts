import { env, exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { attendeePage, isRedirectHome, listed, newVoter } from "./attendee";

// The value vitest.config.ts binds as MOD_PIN.
const RIGHT_PIN = "1234";

const BASE = "https://pitchpulse.test";

// Any string that matches SKETCH_PATTERN is a valid sketch.
const SKETCH = "data:image/png;base64,AAAA";

/** An attendee asks a question and sends a sketch along with it. */
function askWithSketch(text: string, sketch: string): Promise<Response> {
  return exports.default.fetch(`${BASE}/questions`, {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${newVoter()}` },
    body: new URLSearchParams({ text, sketch }),
  });
}

/** The host presses "Clear room" and confirms. */
function clearRoom(pin: string): Promise<Response> {
  return exports.default.fetch(`${BASE}/mod/clear`, {
    method: "POST",
    redirect: "manual",
    body: new URLSearchParams({ pin, confirm: "yes" }),
  });
}

/** The moderation page as the host sees it after entering the PIN. */
async function hostPage(pin: string): Promise<string> {
  const response = await exports.default.fetch(`${BASE}/mod`, {
    method: "POST",
    body: new URLSearchParams({ pin }),
  });
  return response.text();
}

/** The `src` of every sketch a page shows. */
function sketchesOn(page: string): string[] {
  const images = page.match(/<img\b[^>]*>/g) ?? [];
  return images
    .filter((img) => /class="sketch"/.test(img))
    .map((img) => /src="([^"]*)"/.exec(img)?.[1] ?? "");
}

/** The number of question rows that still hold a sketch. */
async function storedSketches(): Promise<number> {
  const row = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM questions WHERE sketch IS NOT NULL",
  ).first<{ n: number }>();
  return row!.n;
}

describe("Remove a sketch with its question", () => {
  it("Clearing the room removes the sketch with its question", async () => {
    // Given Mia's question with a sketch
    const text = "Could the dashboard be laid out like this?";
    expect(isRedirectHome(await askWithSketch(text, SKETCH))).toBe(true);
    const before = await attendeePage();
    expect((await listed(before)).map((q) => q.text)).toEqual([text]);
    expect(sketchesOn(before)).toEqual([SKETCH]);
    expect(await storedSketches()).toBe(1);

    // When the host clears the room
    const response = await clearRoom(RIGHT_PIN);
    expect(response.status).toBe(303);

    // Then no question is listed
    const after = await attendeePage();
    expect(await listed(after)).toEqual([]);

    // And Mia's sketch is gone
    expect(sketchesOn(after)).toEqual([]);
    expect(sketchesOn(await hostPage(RIGHT_PIN))).toEqual([]);
    expect(await storedSketches()).toBe(0);
  });
});
