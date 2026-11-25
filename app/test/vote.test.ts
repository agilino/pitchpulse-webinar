import { describe, expect, it } from "vitest";
import { askQuestion, isRedirectHome, newVoter, vote, votesOf } from "./attendee";

describe("Vote for a question", () => {
  it("A vote counts", async () => {
    const id = await askQuestion("How do you keep spec and code in sync?");
    expect(await votesOf(id)).toBe(0);

    const response = await vote(id, newVoter());

    expect(isRedirectHome(response)).toBe(true);
    expect(await votesOf(id)).toBe(1);
  });

  it("Voting again takes the vote back", async () => {
    const id = await askQuestion("How do you keep spec and code in sync?");
    const voter = newVoter();
    await vote(id, voter);

    const response = await vote(id, voter);

    expect(isRedirectHome(response)).toBe(true);
    expect(await votesOf(id)).toBe(0);
  });

  it("A new cookie counts as a new voter", async () => {
    const id = await askQuestion("How do you keep spec and code in sync?");
    await vote(id, newVoter());

    const response = await vote(id, newVoter());

    expect(isRedirectHome(response)).toBe(true);
    expect(await votesOf(id)).toBe(2);
  });
});
