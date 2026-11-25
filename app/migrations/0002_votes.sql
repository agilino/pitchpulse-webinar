-- One vote per voter and question. voter_id is the random value of the voter
-- cookie; nothing else about the voter is stored.
CREATE TABLE votes (
  question_id INTEGER NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
  voter_id    TEXT    NOT NULL,
  PRIMARY KEY (question_id, voter_id)
) WITHOUT ROWID;
