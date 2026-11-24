import { exports } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { attendeePage, isRedirectHome, listed, newVoter } from "./attendee";

// A valid sketch per SKETCH_PATTERN: a PNG data URL.
const THREE_BOXES = "data:image/png;base64,iVBORw0KGgo+/A==";

/** Posts the ask form the way the browser does: the hidden sketch field is always sent. */
function askWithSketch(text: string, sketch: string): Promise<Response> {
  return exports.default.fetch("https://pitchpulse.test/questions", {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${newVoter()}` },
    body: new URLSearchParams({ text, sketch }),
  });
}

/** The src of each img.sketch that follows the text of a question directly, by question id. */
function sketches(page: string): Map<number, string> {
  const found = new Map<number, string>();
  const items = page.matchAll(
    /<li[^>]*data-question="(\d+)"[^>]*>\s*<p>[\s\S]*?<\/p>\s*(<img\b[^>]*>)/g,
  );
  for (const m of items) {
    const img = m[2];
    const src = img.match(/\bsrc="([^"]*)"/);
    if (/\bclass="sketch"/.test(img) && src) found.set(Number(m[1]), src[1]);
  }
  return found;
}

describe("Add a sketch to a question", () => {
  it("A question asked with a sketch is listed with the sketch", async () => {
    const text = "Could the dashboard be laid out like this?";

    const response = await askWithSketch(text, THREE_BOXES);

    expect(isRedirectHome(response)).toBe(true);
    const page = await attendeePage();
    const questions = await listed(page);
    expect(questions).toEqual([{ id: expect.any(Number), votes: 0, text }]);
    expect(sketches(page).get(questions[0].id)).toBe(THREE_BOXES);
    expect(page).toContain('alt="Sketch for this question"');
  });

  it("A question asked without a sketch is listed as today", async () => {
    const text = "When will the recording be available?";

    const response = await askWithSketch(text, "");

    expect(isRedirectHome(response)).toBe(true);
    const page = await attendeePage();
    expect(await listed(page)).toEqual([
      { id: expect.any(Number), votes: 0, text },
    ]);
    expect(sketches(page).size).toBe(0);
    expect(page).not.toMatch(/<img\b[^>]*class="sketch"/);
  });
});
