# Clear room

> As the host I want to clear the room, so that the list is empty for the next session.

## Rules and examples

### Rule: Only the host, with the right PIN and after confirming once, must be able to clear the room

Clearing removes every question and its votes for everyone, for good. Open and answered questions are cleared alike.

- Example: The one where the host clears the room with the right PIN and confirms: no question is listed any more, for attendees or for the host.
- Counter-example: The one where someone tries with a wrong PIN: the attempt is refused and every question is still listed with its votes.
- Counter-example: The one where the host starts clearing but does not confirm: nothing is removed.
- Example: The one where an attendee votes for a question that was cleared in the meantime: nothing is counted and the attendee sees the current list.

Feature file: [features/clear-room.feature](../../features/clear-room.feature)

## Decisions

- There is no delete for single questions. The host clears the whole room.
- Clearing cannot be undone.
- After clearing, the host is sent back to the PIN form, so that reloading the page cannot clear the room a second time.
- A vote for a question that no longer exists is ignored; the attendee sees the current list.
