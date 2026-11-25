---
name: bmad-code-review
description: Review the current changes against the Gherkin scenarios and CLAUDE.md, as a second agent. Reports only findings that would break a scenario, leak data or violate a convention, then fixes them. Use for "bmad-code-review", "review the build" or "second pair of eyes".
argument-hint: "[base ref, default: last tag]"
---

Review as an independent second agent. Do not reuse the reasoning of whoever wrote the code; read the diff fresh.

###

$ARGUMENTS

###

Scope: the diff since the base ref given above, or since the latest git tag when none is given. Read `CLAUDE.md`, `docs/SPEC.md` and `features/*.feature` first.

Report only findings in these three classes, most severe first:

1. **Scenario broken.** A scenario in `features/` that the code does not satisfy, or a test that does not actually check its scenario.
2. **Data or secret exposure.** Personal data stored although `CLAUDE.md` forbids it, secrets in the repo, the moderation PIN reachable without the secret.
3. **Convention violated.** Anything in `CLAUDE.md` the code ignores: stack, migrations, test naming.

For each finding: file and line, one sentence on what is wrong, one sentence on the failure it causes. No style remarks, no suggestions for features that are not in a scenario.

Then fix every finding, run the test suite, and show that it is green. If nothing survives, say so in one line.
