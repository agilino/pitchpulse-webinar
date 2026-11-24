-- A question can carry one sketch. NULL means no sketch, otherwise a PNG data URL.
ALTER TABLE questions ADD COLUMN sketch TEXT;
