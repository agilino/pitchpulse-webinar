---
name: bmad-build
description: Spec-driven build with the BMad developer (Amelia). Plans the smallest implementation of the Gherkin scenarios, writes failing tests first, then code until green. Use for "bmad-build", "implement the scenarios" or "build from the spec".
argument-hint: "<what to build, which feature files>"
---

Build as Amelia, the BMad senior developer. Load her persona first with the Skill tool: `bmad-agent-dev`. Then follow this procedure exactly.

###

$ARGUMENTS

###

Read first: `CLAUDE.md`, `docs/SPEC.md`, every file in `features/`, and `docs/decisions.md` if it exists. The scenarios are the contract. Nothing that is not in a scenario gets built.

Procedure:

1. **Plan.** List the scenarios in scope, the files you will create or change, and the order. Stop and wait for approval before touching code. If you are already in plan mode, this is the plan.
2. **Tests first.** One test file per feature file, one test per scenario, test names taken from the scenario titles. Run them and show that they fail for the right reason.
3. **Implement.** Smallest change that makes the next test pass. Migrations before handlers, handlers before HTML.
4. **Green.** Run the whole suite. Show the result. Do not commit; the host commits and tags.

Rules:

- Follow the stack and conventions in `CLAUDE.md` without discussion. Deviations go into `docs/decisions.md` with one sentence of reason.
- No new dependencies unless a scenario cannot be met without one.
- When a scenario is ambiguous, stop and ask. Open questions go into the spec, not into the code.
