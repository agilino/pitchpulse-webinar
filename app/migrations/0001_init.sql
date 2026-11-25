-- Questions asked by attendees. answered_at is set by the host through moderation.
CREATE TABLE questions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  text        TEXT    NOT NULL CHECK (length(text) BETWEEN 1 AND 280),
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  answered_at TEXT
);
