---
title: 'Ask and vote'
type: 'feature'
created: '2026-11-23'
status: 'in-review'
route: 'full'
route_source: 'auto'
review: 'thorough'
review_source: 'auto'
lenses_ran: ['blind-hunter', 'edge-case-hunter', 'verification-gap', 'intent-alignment']
review_loop_iteration: 0
baseline_commit: 'ecafbff977b3498b3e4e947a324991cebc73f105'
context:
  - '{project-root}/CLAUDE.md'
  - '{project-root}/docs/specs/ask-and-vote.md'
  - '{project-root}/features/ask.feature'
  - '{project-root}/features/vote.feature'
  - '{project-root}/features/ranking.feature'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Attendees can only read the question list. They cannot ask a question or vote, so the speaker has no ranking to answer from. Moderation exists and stays as it is.

**Approach:** Build the smallest implementation of the nine scenarios in `features/ask.feature`, `features/vote.feature` and `features/ranking.feature`: failing Vitest tests first, one per scenario and named after it, then the D1 migration, the handlers and the HTML.

## Boundaries & Constraints

**Always:** The scenarios are the contract: one test file per feature file, one test per scenario, named after it. A voter is a random cookie set on first visit; nothing personal is stored. Question text is stored and shown exactly as typed, as plain text. Stack and conventions per `CLAUDE.md`. The three moderation tests keep passing unchanged.

**Never:** Anything not in a scenario. No login, no IP check, no new dependency, no client build step. No change to `features/`, `docs/specs/`, `SPEC.md` or `app/migrations/0001_init.sql`. No git command that changes anything; the host commits and tags.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| A question of 280 characters is accepted | 280 characters | listed with 0 votes | No error expected |
| A question of 281 characters is rejected | 281 characters | nothing listed | rejected with a message |
| An empty question is rejected | only spaces | nothing listed | rejected with a message |
| A link in a question stays plain text | "Where are the slides? https://example.com/slides" | listed as typed, link not clickable | No error expected |
| A vote counts | question with 0 votes, an attendee votes | 1 vote | No error expected |
| Voting again takes the vote back | the same attendee votes again | 0 votes | No error expected |
| A new cookie counts as a new voter | the attendee votes again with a new cookie | 2 votes | No error expected |
| More votes come first | A asked before B, A has 1 vote, B has 2 | B before A | No error expected |
| On a tie the older question comes first | A asked before B, 1 vote each | A before B | No error expected |

</frozen-after-approval>

## Code Map

- `app/src/index.ts` -- Hono routes `GET /`, `GET /mod`, `POST /mod`, `POST /questions/:id{[0-9]+}/answer`. Add ask, vote and the voter cookie; leave `isModPin` and `pinFromForm` alone.
- `app/src/db.ts` -- `Question`, `listQuestions`, `markAnswered`. Add the vote count and the new order to the list (both pages use it), plus insert and vote toggle.
- `app/src/views.ts` -- `questionItem` emits `data-question="<id>"`, which the moderation tests parse; `html` escapes every value. Add the ask form, vote buttons and `data-votes`.
- `app/migrations/0001_init.sql` -- `questions` with `CHECK (length(text) BETWEEN 1 AND 280)`. Do not change.
- `app/test/setup.ts` -- resets D1 and applies all migrations before every test.
- `app/test/moderation.test.ts` -- pattern to copy: `exports.default.fetch(...)`, form posts with `URLSearchParams`.

## Tasks & Acceptance

**Execution:**
- [ ] `app/test/ask.test.ts` -- four tests named after `features/ask.feature` -- red first
- [ ] `app/test/vote.test.ts` -- three tests named after `features/vote.feature`; a voter is a cookie value -- red first
- [ ] `app/test/ranking.test.ts` -- two tests named after `features/ranking.feature` -- red first
- [ ] `app/migrations/0002_votes.sql` -- table `votes`, primary key (`question_id`, `voter_id`) -- one vote per voter and question
- [ ] `app/src/db.ts` -- insert question, toggle vote, list with counts ordered answered last, votes descending, older first -- data access
- [ ] `app/src/index.ts` -- `POST /questions`, `POST /questions/:id/vote`, voter cookie when missing -- handlers
- [ ] `app/src/views.ts` -- ask form with character counter, vote button and count, error message -- HTML

**Acceptance Criteria:**
- Given the finished change, when `npm --prefix app test` runs, then all 12 tests pass and each test name equals a scenario title in `features/`.
- Given a first visit without a cookie, when a page is requested, then the response sets a random voter cookie and nothing else about the visitor is stored.
- Given the host list after a correct PIN, when questions have votes, then it shows the same order and the vote counts.

## Implementation Notes

- Implemented by a coding subagent on 2026-11-23: `app/test/ask.test.ts`, `vote.test.ts`, `ranking.test.ts`, the helper `app/test/attendee.ts`, `app/migrations/0002_votes.sql`, and changes in `app/src/db.ts`, `index.ts` and `views.ts`. Result: 12 tests in 4 files pass, the type check is clean.
- The working tree was dirty at `baseline_commit` by the host's instruction (no git until the deck is merged). The review diff was therefore taken against the snapshot of the previous state in `.tags.local/03-spec/app`, not against the commit.
- Additions beyond the scenarios: the form keeps the typed text after a rejection, a malformed voter cookie is replaced, the host list shows vote counts.
- Outside this spec: `app/scripts/smoketest.mjs` and the `smoketest` npm script were added by the host session during the review.
- Deployed as built on 2026-11-24: worker `pitchpulse` and worker `pitchpulse-backup`, each with its own D1 database. The Smoketest passed against both URLs.

## Spec Change Log

## Review Triage Log

Pass 1, 2026-11-24. Lenses: blind-hunter (BH, 14 findings), edge-case-hunter (EC, 12), verification-gap (VG, 8 gaps and 3 other findings), intent-alignment (IA, descriptive). Claims that needed checking were verified by four independent agents, with requests against the local dev server where a request could settle them. Over the 26 distinct claims: high 0, medium 12, low 12, false 0, maybe-false 0, no defect 2.

No patch was applied and no code was reverted. The slides session relayed the host's decision that the app is deployed as built and that missing behaviour is a candidate for the live feature. The routes below are proposals until the host confirms.

| Claim | What is wrong | Verdict | Proposed route | Evidence |
| --- | --- | --- | --- | --- |
| C1 | Two overlapping votes of one voter on one question answer 303 and 404, although the question exists (`toggleVote`, `app/src/db.ts`) | medium | patch | Reproduced: 36 of 150 simultaneous pairs. Never with the second request 1 to 25 ms behind. The vote count stays right. |
| C2 | A double submit of the ask form stores the question twice | medium | host decides | Reproduced: two identical posts both answered 303 and were listed twice. No scenario covers duplicates. |
| C3 | Line breaks and runs of spaces collapse in the list, so text is not shown as typed (`.question p` has no `white-space` rule) | low | patch | Reproduced in headless Chromium: four lines rendered as one, computed `white-space: normal`. |
| C4 | The page does not show whether this voter has voted; a second press takes the vote back | medium | host decides | Reproduced: the page is byte-identical with and without the vote. No scenario asks for the state. |
| C5 | Asking and voting redirect to the top of `/` with no confirmation | medium | host decides | Reproduced on a list of 29 questions: the new question sat 3642 px down, a vote came back at scroll position 0. |
| C6 | Nothing refreshes the lists; the host list exists only as the answer to a POST | medium | host decides | Reproduced: open pages made 0 requests in 10 s. `GET /mod` shows only the PIN form. |
| C7 | No test observes that the app issues the voter cookie; the tests make up voter ids | medium | patch (tests) | Filed by VG with a traced demonstration: deleting `setCookie` keeps all 12 tests green. The Smoketest does check it. |
| C8 | No test reads the host list, so its vote counts and answer buttons are unobserved | low | patch (tests) | Filed by VG: no test requests `/mod` or reads a host response body. |
| C9 | "On a tie the older question comes first" does not assert the votes | low | patch (tests) | Verified: the same order holds with 0 votes each and with the old `ORDER BY`. "More votes come first" still catches both regressions. |
| C10 | Escaping is untested: the link example needs none, and the helper compares escaped HTML, so a text with `& < > ' "` is reported as not listed | medium | patch (test helper); a markup example needs a new scenario | Filed by VG and EC: unescaped output keeps all tests green. |
| C11 | "Answered below open, whatever their votes" is not pinned by a test with votes | medium | host decides (new scenario) | Filed by VG: swapping the first two sort keys keeps all tests green. |
| C12 | `GET /` needs the `votes` table; without `0002_votes.sql` both lists answer 500, and there is no npm script for the remote migration | low | patch (tooling) | By reading: `listQuestions` joins `votes`, nothing catches the error. The remote migration was run by hand before the deploy. |
| C13 | Rules decided here are not in `docs/decisions.md` or `docs/specs/`: 30 days, Unicode characters, a line break counts once, any whitespace is empty | low | host decides (docs) | By reading: they exist in code and in this file only. |
| C14 | `POST /questions` has no size limit: a 5 MB text is processed and echoed back in full | medium | patch for the size limit; flooding is the host's decision | Reproduced: 5 MB answered 400 after 294 ms with a response of 5.25 million characters. Needs deliberate abuse. |
| C15 | The stored data cannot answer hypothesis 1 in `docs/problem.md`: no asker is stored and undone votes are deleted | low | host decides | By reading. Closing it changes what is stored about a visitor. |
| C16 | The Smoketest files are not part of the reviewed diff | no defect | none | True, and by design: a separate deliverable. It ran green three times locally and once each against the live and the backup URL. |
| C17 | A text starting with a NUL character answers 500 | low | rejected | Reproduced with a crafted request. A NUL cannot be typed into the form, nothing is stored. |
| C18 | A text of zero-width characters only is accepted as a blank card | low | rejected | Reproduced with U+200B. Needs deliberate input. |
| C19 | `GET /questions` answers 404 | low | rejected | Reproduced. Reached only by loading that address anew after a rejection. |
| C20 | A malformed multipart body answers 500 | low | rejected | Reproduced with crafted requests. The app's form posts urlencoded. |
| C21 | An unsent draft is lost when the attendee presses a vote button | medium | host decides | Reproduced in headless Chromium. The Back button restores it. |
| C22 | No test lets one voter vote for two questions, so "one vote per question" could shrink to one vote in total unnoticed | medium | patch (tests) | Filed by VG: removing `question_id = ?` from the DELETE keeps all tests green. |
| C23 | The tests post to hard-coded paths and field names and never use the rendered forms | medium | patch (tests) | Filed by VG and IA: renaming the textarea keeps all tests and the Smoketest green. |
| C24 | Keeping the typed text after a rejection is not asserted | low | patch (tests) | Filed by VG. |
| C25 | The counting rule (Unicode characters, a line break counts once) is not pinned; all boundary tests use ASCII | low | patch (tests) | Filed by VG: `text.length` instead of `[...text].length` keeps all tests green. |
| C26 | The change implements the scenario contract; the form, the cookie handed out, the host list and a running app are outside what the tests exercise | no defect | none | Descriptive finding of IA. The gaps are C7, C8 and C23; the running app was checked by hand and by the Smoketest. |

Reviewer findings and the claim each one belongs to:

| Lens | Finding to claim |
| --- | --- |
| BH | 1 to C1 and C2, 2 to C3, 3 to C4, 4 to C5, 5 to C6, 6 to C7 and C8, 7 to C9, 8 to C10, 9 to C11, 10 to C12, 11 to C13 and C25, 12 to C14, 13 to C15, 14 to C16 |
| EC | 1 to C12, 2 to C1, 3 to C17, 4 to C18, 5 to C19, 6 to C20, 7 to C14, 8 to C2, 9 to C4, 10 to C3, 11 to C21, 12 to C10 |
| VG | gaps 1 to C22, 2 to C7, 3 to C11, 4 to C25, 5 to C23, 6 to C8, 7 to C10, 8 to C24; other findings 1 to C1, 2 to C3, 3 to C10 |
| IA | C26, with C7, C8 and C23 |

## Design Notes

Tests drive the app only through HTTP and read the attendee page: `data-question="<id>"` and `data-votes="<n>"` on each list item, in list order. Length is counted in Unicode characters after turning `\r\n` into `\n`, which matches the database check. A rejected question answers with status 400 and the page with an error message; an accepted question and a vote answer with a redirect to `/`. The voter cookie is `HttpOnly`, `SameSite=Lax`, `Secure` on https, and lasts 30 days.

House rule for this machine: use the shell only for npm commands, run from the repository root without `cd`. Read, search and edit files with the file tools, never with `cat`, `sed`, `head`, `tail`, `grep`, `find`, `ls`, `wc` or `diff`.

## Verification

**Commands:**
- `npm --prefix app test` -- expected: 4 files, 12 tests, all passing
- `npm exec --prefix app -- tsc --noEmit -p app/tsconfig.json` -- expected: no output, exit code 0

**Manual checks (if no CLI):**
- With `npm --prefix app run dev`: ask a question, vote, vote again, try 281 characters, vote from a second browser profile.
