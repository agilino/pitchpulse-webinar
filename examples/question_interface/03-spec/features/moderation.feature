Feature: Moderation
  Only the host, with the right PIN, can mark a question as answered.
  Answered questions are listed after all questions that are not answered.

  Scenario: The host marks a question as answered with the right PIN
    Given a question that is not answered
    When the host marks it as answered with the right PIN
    Then the question is answered

  Scenario: A wrong PIN does not change anything
    Given a question that is not answered
    When someone tries to mark it as answered with a wrong PIN
    Then the attempt is refused
    And the question is still not answered

  Scenario: An answered question moves to the bottom
    Given question "A" was asked before question "B"
    And neither is answered
    When the host marks "A" as answered with the right PIN
    Then "B" is listed before "A"
