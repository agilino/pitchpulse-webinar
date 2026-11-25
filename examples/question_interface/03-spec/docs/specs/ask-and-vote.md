# Ask and vote

> As an attendee I want to ask a question and upvote other attendees' questions, so that the speaker answers what matters most to the audience.

## Rules and examples

### Rule: An attendee must be able to ask a question of 1 to 280 characters

Text is stored and listed exactly as typed. A question that is empty or only spaces is not a question.

| Question text | Outcome |
| --- | --- |
| 280 characters | accepted, listed with 0 votes |
| 281 characters | rejected, nothing listed |
| only spaces | rejected, nothing listed |

- Example: The one where a question contains a link: it is accepted and the link stays plain text, not clickable.

Feature file: [features/ask.feature](../../features/ask.feature)

### Rule: One voter must have at most one vote per question; voting again takes the vote back

A voter is identified by a random cookie set on the first visit. There is no login and no IP check.

- Example: The one where an attendee votes for a question: the question has 1 vote.
- Example: The one where the same attendee votes for the same question again: the vote is taken back and the question has 0 votes.
- Counter-example: The one where the attendee votes again with a new cookie (for example from an incognito tab): it counts as a new voter and the question has 2 votes. Accepted in version one.

Feature file: [features/vote.feature](../../features/vote.feature)

### Rule: Questions should be listed by votes, most votes first; on a tie the older question comes first

- Example: The one where a newer question has more votes than an older one: the newer question comes first.
- Counter-example: The one where two questions have the same number of votes: the older question comes first.

Feature file: [features/ranking.feature](../../features/ranking.feature)

### Rule: Only the host, with the right PIN, must be able to mark a question as answered; answered questions move to the bottom

Answered questions are listed after all questions that are not answered, whatever their votes.

- Example: The one where the host marks a question as answered with the right PIN: it is answered.
- Counter-example: The one where someone tries with a wrong PIN: the attempt is refused and the question is still not answered.
- Example: The one where two questions were asked one after the other and the host marks the older one as answered: the newer one is now listed before it.

Feature file: [features/moderation.feature](../../features/moderation.feature)

## Decisions

- Identity: a voter is a random cookie, no login. Double votes from an incognito tab are accepted in version one.
- Links in a question are allowed as plain text and are not clickable.
- On a tie the older question comes first.
- A PIN is enough to protect moderation in the first version.
- An attendee may vote for their own question and for an answered question; neither is a special case.
- Marking a question as answered cannot be undone in version one.

## Non-goals (version one)

- No login: there are no accounts and no names.
- No IP check: votes are not limited by network address.
- Consequence: a new cookie, for example an incognito tab, counts as a new voter.
