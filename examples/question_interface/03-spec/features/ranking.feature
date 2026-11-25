Feature: Ranking
  Questions are listed by votes, most votes first.
  On a tie the older question comes first.

  Scenario: More votes come first
    Given question "A" was asked before question "B"
    And "A" has 1 vote and "B" has 2 votes
    When the questions are listed
    Then "B" is listed before "A"

  Scenario: On a tie the older question comes first
    Given question "A" was asked before question "B"
    And "A" and "B" have 1 vote each
    When the questions are listed
    Then "A" is listed before "B"
