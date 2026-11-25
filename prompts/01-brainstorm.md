# 01 · Brainstorm (0:03 to 0:08)

Goal: a problem statement and three hypotheses in `docs/problem.md`. The product team is made of agents. Say out loud: these are hypotheses, not customer evidence.

## Prompt 1 · Party round, at most 2 minutes

```
/bmad-party-mode --mode session

Idea in one sentence: PitchPulse lets a webinar audience ask questions and upvote the ones they want answered, so the speaker answers what matters most.
The room's top feature wish (most votes in PitchPulse at minute one, a hypothesis, not customer evidence): [ROOM WISH]

John (PM), Mary (analyst), Sally (UX): argue about this idea for a few rounds.
Your goal is the input for docs/problem.md: the problem in 2 sentences, 3 hypotheses we can falsify, and what we leave out of version one.
Cover: who is the customer, what annoys them today, what would prove or kill the idea, and whether the room's wish belongs in version one or on the leave-out list.
Be concrete and disagree where you honestly would. Stop after 6 contributions and let me summarise.
```

Interrupt at 0:05:30 at the latest: "Thanks, team." Then:

## Prompt 2 · Problem statement

```
/bmad-brainstorming

Use the 'Ideate for me' stance and go straight to convergence, the party round above is the input. Write only the file.
From the party round above, write docs/problem.md with:
1. Problem statement in 2 sentences (who, what hurts, when).
2. Three hypotheses we will test with the first version, each falsifiable.
3. What we deliberately leave out of the first version.
Keep it under 150 words. Mark everything as hypotheses, we have not talked to customers yet.
```

Checkpoint:

```
git add -A && git commit -m "Add problem statement and hypotheses" && git tag 01-idea
```
