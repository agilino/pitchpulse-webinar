import { describe, expect, it } from "vitest";
import { askQuestion, listed, newVoter, vote } from "./attendee";

async function listedIds(): Promise<number[]> {
  return (await listed()).map((q) => q.id);
}

describe("Ranking", () => {
  it("More votes come first", async () => {
    const a = await askQuestion("A");
    const b = await askQuestion("B");
    await vote(a, newVoter());
    await vote(b, newVoter());
    await vote(b, newVoter());

    expect(await listedIds()).toEqual([b, a]);
  });

  it("On a tie the older question comes first", async () => {
    const a = await askQuestion("A");
    const b = await askQuestion("B");
    await vote(a, newVoter());
    await vote(b, newVoter());

    expect(await listedIds()).toEqual([a, b]);
  });
});
