Feature: Add a sketch to a question
  An attendee can add one sketch to a question while asking.
  The text stays required, and a sketch cannot be changed after asking.

  @must
  Scenario: A question asked with a sketch is listed with the sketch
    When Mia asks "Could the dashboard be laid out like this?" with a sketch of three boxes
    Then the question is accepted
    And it is listed with her sketch

  @must
  Scenario: A question asked without a sketch is listed as today
    When Jon asks a question without a sketch
    Then the question is accepted
    And it is listed with 0 votes and without a sketch

  @later
  Scenario: A sketch without text is rejected
    When Mia sends a sketch of three boxes without any text
    Then the question is rejected
    And no question is listed

  @later
  Scenario: A sketch cannot be redone after asking
    Given Mia's question with a sketch of three boxes
    When Mia asks a new question with a sketch of four boxes
    Then both questions are listed
    And the first question still shows the three boxes
