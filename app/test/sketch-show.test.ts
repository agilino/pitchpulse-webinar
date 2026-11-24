import { exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { attendeePage, isRedirectHome, listed, newVoter } from "./attendee";

const BASE = "https://pitchpulse.test";

// The value vitest.config.ts binds as MOD_PIN.
const MOD_PIN = "1234";

// Any string that matches SKETCH_PATTERN is a valid sketch.
const SKETCH = "data:image/png;base64,iVBORw0KGgo+/AAA=";

/** Asks the way the form does when something was drawn on the pad. */
function askWithSketch(text: string, sketch: string): Promise<Response> {
  return exports.default.fetch(`${BASE}/questions`, {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${newVoter()}` },
    body: new URLSearchParams({ text, sketch }),
  });
}

/** The list as the host sees it after entering the PIN. */
async function hostPage(): Promise<string> {
  const response = await exports.default.fetch(`${BASE}/mod`, {
    method: "POST",
    body: new URLSearchParams({ pin: MOD_PIN }),
  });
  return response.text();
}

/** The markup of one question, from its <li> to the closing tag. */
function questionMarkup(page: string, id: number): string {
  const item = page.match(
    new RegExp(`<li[^>]*data-question="${id}"[^>]*>[\\s\\S]*?</li>`),
  );
  return item ? item[0] : "";
}

/**
 * The src of the sketch shown with a question, or undefined when the question
 * shows none. The sketch sits directly after the text and before the actions.
 */
function sketchOf(page: string, id: number): string | undefined {
  const shown = questionMarkup(page, id).match(
    /<\/p>\s*<img\s+class="sketch"\s+src="([^"]*)"\s+alt="Sketch for this question"\s*\/?>\s*<div class="actions">/,
  );
  return shown?.[1];
}

describe("Show the sketch with its question", () => {
  it("The sketch shows for the other attendees and for the host", async () => {
    const text = "Could the dashboard be laid out like this?";
    const asked = await askWithSketch(text, SKETCH);
    expect(isRedirectHome(asked)).toBe(true);

    const forAttendee = await attendeePage();
    const forHost = await hostPage();

    const mia = (await listed(forAttendee)).find((q) => q.text === text);
    expect(mia).toBeDefined();
    expect(sketchOf(forAttendee, mia!.id)).toBe(SKETCH);

    expect((await listed(forHost)).map((q) => q.id)).toContain(mia!.id);
    expect(sketchOf(forHost, mia!.id)).toBe(SKETCH);
  });
});
