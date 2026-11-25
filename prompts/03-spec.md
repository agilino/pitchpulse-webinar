# 03 · Specs by example (0:15 to 0:26)

Goal: the turn first, then the room's wish as a spec. PitchPulse was live before tonight; the wish from minute one gets story, rules, examples, open questions and Gherkin. This is the core of the webinar and runs completely live.

## The turn (0:15 to 0:19), slide 6

Say: "Before we spec your wish, look at a rule you already used tonight. At minute one you all voted. With a cookie." Switch to VS Code and show the line in `CLAUDE.md`: "Identity of a voter is a random cookie, set on first visit. No personal data is stored." Slide 7, chat "Would you ship this? Yes or no.", read the result, then decide.

## Prompt 1 · Write the decision down

```
Start docs/SPEC.md as the index of the specification with a section "Non-goals": no login, no IP check, double votes from a new cookie are accepted in version one. Do not change code.
```

## Prompt 2 · Example Mapping of the wish (0:19)

```
/example-mapping The room's wish: [ROOM WISH].

First propose the user story in one sentence (As an attendee I want …, so that …) from docs/problem.md and version [WINNER] in docs/sketches.drawio, and wait for my OK. Then run example mapping on it. PitchPulse already runs; asking, voting and moderation stay as they are. Keep the rules small enough to build in ten minutes.
```

Open questions: answer small ones yourself in one sentence. If one is a real business decision, give it to the chat.

## Prompt 3 · Gherkin

```
Turn the approved spec for the wish into Gherkin: one feature file per rule in features/, one scenario per example, plain language, no UI steps. Tag every scenario @must or @later; @must is the smallest set worth deploying tonight. Add a "Contract" section to the spec with the migration number and columns, the db.ts function signatures, the route and form fields and the HTML hooks. Add the spec and the feature files to docs/SPEC.md. Do not write code.
```

Checkpoint:

```
git add -A && git commit -m "Add the room's wish as spec by example" && git tag 03-spec
```

The inception canvas runs during the build, see `04-build.md`.
