# 04 · Build (0:26 to 0:36)

Goal: the room's wish built from its scenarios, all tests green locally, with the inception canvas filled in a second pane while the build runs. PitchPulse itself was live before tonight (say so).

## Prompt 1 · Build

```
/build-wish spec: the spec of the room's wish in docs/specs/, features: its feature files in features/

Tell me the plan in two sentences while it starts. When it returns, run npm --prefix app test and show me the result: every existing test and the new ones green.
```

While it runs, open `/workflows`: one line per agent, each owns its files. The test agents report RED first, the integrator ends on green. Point at the new test named after a scenario of the wish: spec, test and live app are one chain.

## Prompt 2 · Inception canvas (second pane, while the build runs)

```
/inception-canvas

Fill the canvas for PitchPulse from docs/problem.md and docs/SPEC.md. Live fields first: quality goals (3, measurable), business context, organisational constraints, technical constraints. Ask me your questions first, recommendation first. Put a "?" where we still do not know.
```

Open the result in draw.io. One sentence on quality goals: "fast" is not a goal, "a vote shows up for everyone within one second" is.

Show the result:

```
npm --prefix app test
npm --prefix app run dev
```

Checkpoint:

```
git add -A && git commit -m "Build the room's wish from its scenarios, add inception canvas" && git tag 04-build
```

## Prompt 3 · Review by a second agent (second pane, after the tag, while the ship runs)

```
/bmad-code-review quick

Review the diff between the tags 03-spec and 04-build against the new feature files and CLAUDE.md. Report only findings that would make a scenario fail or leak data. Do not change files.
```
