Feature: Vote for a question
  One voter has at most one vote per question; voting again takes the vote back.
  A voter is identified by a random cookie. No login, no IP check.

  Scenario: A vote counts
    Given a question with 0 votes
    When an attendee votes for it
    Then the question has 1 vote

  Scenario: Voting again takes the vote back
    Given an attendee has voted for a question
    When the same attendee votes for it again
    Then the question has 0 votes

  Scenario: A new cookie counts as a new voter
    Given an attendee has voted for a question
    When the attendee votes for it again with a new cookie
    Then the question has 2 votes
