import { describe, expect, it } from "vitest";
import { ask, attendeePage, isRedirectHome, listed } from "./attendee";

describe("Ask a question", () => {
  it("A question of 280 characters is accepted", async () => {
    const text = "a".repeat(280);

    const response = await ask(text);

    expect(isRedirectHome(response)).toBe(true);
    expect(await listed()).toEqual([{ id: expect.any(Number), votes: 0, text }]);
  });

  it("A question of 281 characters is rejected", async () => {
    const response = await ask("a".repeat(281));

    expect(response.status).toBe(400);
    expect(await response.text()).toContain('class="error"');
    expect(await listed()).toEqual([]);
  });

  it("An empty question is rejected", async () => {
    const response = await ask("     ");

    expect(response.status).toBe(400);
    expect(await response.text()).toContain('class="error"');
    expect(await listed()).toEqual([]);
  });

  it("A link in a question stays plain text", async () => {
    const text = "Where are the slides? https://example.com/slides";

    const response = await ask(text);

    expect(isRedirectHome(response)).toBe(true);
    const page = await attendeePage();
    expect(await listed(page)).toEqual([{ id: expect.any(Number), votes: 0, text }]);
    expect(page).not.toMatch(/<a[\s>]/i);
  });
});
