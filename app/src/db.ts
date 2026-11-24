/** Matches the CHECK on questions.text in migrations/0001_init.sql. */
export const MAX_QUESTION_LENGTH = 280;

/** A sketch is a PNG data URL. Anything else is rejected before it is stored. */
export const SKETCH_PATTERN = /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/;

export type Question = {
  id: number;
  text: string;
  created_at: string;
  answered_at: string | null;
  votes: number;
  sketch: string | null;
};

/**
 * Open questions first, most votes on top, the older question first on a tie.
 * Answered questions go to the bottom in the same order.
 */
export async function listQuestions(db: D1Database): Promise<Question[]> {
  const { results } = await db
    .prepare(
      `SELECT q.id, q.text, q.created_at, q.answered_at, q.sketch, COUNT(v.voter_id) AS votes
         FROM questions q
         LEFT JOIN votes v ON v.question_id = q.id
        GROUP BY q.id
        ORDER BY q.answered_at IS NOT NULL, votes DESC, q.created_at, q.id`,
    )
    .all<Question>();
  return results;
}

/**
 * Stores a question, with its sketch if there is one. The text must already be
 * valid, see `questionError`, and the sketch must match `SKETCH_PATTERN`.
 */
export async function addQuestion(
  db: D1Database,
  text: string,
  sketch: string | null = null,
): Promise<void> {
  await db
    .prepare("INSERT INTO questions (text, sketch) VALUES (?, ?)")
    .bind(text, sketch)
    .run();
}

/**
 * Gives the voter's vote to the question, or takes it back if the voter has
 * already voted for it. Returns false when there is no such question.
 */
export async function toggleVote(
  db: D1Database,
  questionId: number,
  voterId: string,
): Promise<boolean> {
  const removed = await db
    .prepare("DELETE FROM votes WHERE question_id = ? AND voter_id = ?")
    .bind(questionId, voterId)
    .run();
  if (removed.meta.changes > 0) return true;

  const added = await db
    .prepare(
      `INSERT OR IGNORE INTO votes (question_id, voter_id)
       SELECT id, ? FROM questions WHERE id = ?`,
    )
    .bind(voterId, questionId)
    .run();
  return added.meta.changes > 0;
}

/** Marks a question as answered. Returns false when there is no such question. */
export async function markAnswered(db: D1Database, id: number): Promise<boolean> {
  const { meta } = await db
    .prepare(
      `UPDATE questions
          SET answered_at = COALESCE(answered_at, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        WHERE id = ?`,
    )
    .bind(id)
    .run();
  return meta.changes > 0;
}

/** Clears the room: removes every question and every vote, for good. */
export async function clearRoom(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare("DELETE FROM votes"),
    db.prepare("DELETE FROM questions"),
  ]);
}
