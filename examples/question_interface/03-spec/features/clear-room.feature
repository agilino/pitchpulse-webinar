Feature: Clear room
  Only the host, with the right PIN and after confirming once, can clear the room.
  Clearing removes every question and its votes for everyone, for good.

  Scenario: The host clears the room with the right PIN
    Given two questions with votes, one of them answered
    When the host clears the room with the right PIN and confirms
    Then no question is listed

  Scenario: A wrong PIN does not clear the room
    Given a question with 1 vote
    When someone tries to clear the room with a wrong PIN
    Then the attempt is refused
    And the question is still listed with 1 vote

  Scenario: Clearing without confirmation removes nothing
    Given a question with 1 vote
    When the host starts clearing the room with the right PIN but does not confirm
    Then the question is still listed with 1 vote

  Scenario: A vote for a cleared question is not counted
    Given a question that an attendee still sees
    And the host has cleared the room
    When the attendee votes for that question
    Then no vote is counted
    And the attendee sees the current list
