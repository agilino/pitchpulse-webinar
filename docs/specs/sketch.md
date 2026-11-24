# Sketch on a question

Story: As an attendee I want to add a quick finger sketch to my question, so that the room and the speaker see what I mean before they vote or answer.

Asking, voting and moderation stay as they are.

## Rules

- Rule: Should let an attendee add one sketch to a question while asking.
  - Example: The one where Mia asks "Could the dashboard be laid out like this?" and draws three boxes, and the question appears with her sketch.
  - Counter-example: The one where Jon asks without drawing anything, and his question appears exactly as today.
  - Counter-example: The one where Mia draws three boxes but types nothing. The question is rejected like an empty question today, because the text stays required.
  - Counter-example: The one where Mia wants to redo her sketch after asking. She cannot, she asks a new question.

- Rule: Must show the sketch to everyone who sees the question.
  - Example: The one where Mia's sketch shows with her question for the other attendees and for the host.
  - Counter-example: The one where a question with a sketch and 3 votes stays below a question without a sketch and 5 votes. A sketch never changes the ordering.

- Rule: Must remove a sketch together with its question.
  - Example: The one where the host clears the room and Mia's sketch is gone with her question.
  - Counter-example: The one where the host marks Mia's question as answered. The sketch stays with the answered question.

## Decided for this version

- No size limit on a sketch.
- No new moderation action. An unwanted sketch is removed only by clearing the whole room, also when the list is on a shared screen.

## Contract

What the build works against. Names and values are exact.

**Migration** `app/migrations/0003_sketch.sql`

- `ALTER TABLE questions ADD COLUMN sketch TEXT;`
- `NULL` means no sketch. Otherwise the column holds a PNG data URL. No size check.

**`app/src/db.ts`**

- `export const SKETCH_PATTERN = /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/;`
- `export type Question = { id: number; text: string; created_at: string; answered_at: string | null; votes: number; sketch: string | null };`
- `export async function listQuestions(db: D1Database): Promise<Question[]>` now also selects `q.sketch`. The ordering is unchanged.
- `export async function addQuestion(db: D1Database, text: string, sketch: string | null = null): Promise<void>`
- `toggleVote`, `markAnswered` and `clearRoom` stay as they are. The sketch goes with its question row.

**Route** `POST /questions` in `app/src/index.ts`, form encoded as today

- Fields: `text` (required, rules as today) and `sketch` (optional). A missing or empty `sketch` is stored as `NULL`.
- The text is checked first. Invalid text: `400`, the attendee page with today's error message and the text as draft.
- A non-empty `sketch` that does not match `SKETCH_PATTERN`: `400`, the attendee page with the error `The sketch could not be read. Please draw it again.` and the text as draft.
- On any `400` nothing is stored and the sketch is not sent back; the pad is empty again.
- Accepted: `303` to `/`, as today.
- No other route changes. No route changes or removes a sketch.

**HTML hooks** in `app/src/views.ts`; the signature of `questionsPage` is unchanged

- In `form.ask`: `<canvas id="sketch-pad" class="sketch-pad" width="320" height="200">`, `<input type="hidden" id="sketch" name="sketch" value="">` and `<button type="button" id="sketch-clear">`.
- On submit the client script sets `#sketch` to `canvas.toDataURL("image/png")` when something was drawn, otherwise it stays empty. `#sketch-clear` empties the pad and `#sketch`.
- In `questionItem`, for attendees and the host alike, a question with a sketch renders `<img class="sketch" src="..." alt="Sketch for this question" />` with the stored value verbatim as `src`, directly after the `<p>` of the text and before `div.actions`. The `<p>` stays the first child of the `<li>`.
- A question without a sketch renders no `img.sketch`.

**Tests** `app/test/sketch-add.test.ts`, `sketch-show.test.ts` and `sketch-remove.test.ts`, one per feature file

- Any string that matches `SKETCH_PATTERN` is a valid sketch, for example `data:image/png;base64,AAAA`.
