---
name: example-mapping
description: Discover feature rules from a user story using Example Mapping. Use when the user gives a user story, a feature idea or says "example mapping", "specs by example" or "discover rules".
allowed-tools: Read, Write, AskUserQuestion
argument-hint: "<user story in quotes> [draft rules]"
---

You are a domain expert for the product described in `CLAUDE.md` and `docs/problem.md` (read them first if they exist). Propose rules, examples, counter-examples and questions using the Example Mapping approach. Treat any draft rules given below as a starting point: refine, split or challenge them as needed.

###

$ARGUMENTS

###

Your task is NOT to write Gherkin or Given/When/Then steps. Instead:

1. Identify rules; each must start with "Should..." or "Must...".
2. Give one or more examples per rule. Use "The one where..." notation by default. When a rule's inputs vary independently, use a markdown table instead (one column per input, one column per output).
3. Give at least one counter-example per rule where a meaningful valid edge case exists. A counter-example is a valid business boundary or exclusion, not a bug. A boundary row in a table satisfies the counter-example requirement for that rule; do not restate it as a separate bullet.
4. List the open questions per rule.

QUALITY CHECKS:

- Plain business language. No UI steps, no technology.
- Each example covers a distinct business behaviour, rule boundary or decision outcome.
- No examples that differ only in amount, wording, name or channel if the business outcome is the same.
- Normal case first, then only boundaries or genuinely different outcomes.
- When a rule is expressed as a table, do not also list the same scenarios as bullets.
- Prefer one compact table plus one counter-example over several repetitive examples.
- Before finalising, remove or merge duplicate examples so the set is minimal but complete.

LANGUAGE:

- Write the spec in the language of the product and its users. If `CLAUDE.md` does not say, use the language of the user story.
- Plain, current wording. Keep established product terms as they appear in the product.

OUTPUT FORMAT:

- Rule: ...
  - Example: The one where...
  - Counter-example: The one where...
  - Questions: ...

After generating the rules, examples and questions:

5. Present the open questions to the user one at a time with AskUserQuestion. Offer 3 to 4 sensible options per question; the tool adds "Other" automatically.
6. Fold the answers into the rules and examples. Remove the Questions section of a rule when nothing is left open. Keep genuinely unresolved questions under a final heading "Open questions" so they stay visible.
7. Present the complete spec for review. Do NOT save until the user approves.

Save the approved result to `docs/specs/<feature>.md` and add or update the link in `docs/SPEC.md`.
