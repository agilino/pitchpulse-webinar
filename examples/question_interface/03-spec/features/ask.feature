Feature: Ask a question
  An attendee can ask a question of 1 to 280 characters.
  The text is listed exactly as typed.

  Scenario: A question of 280 characters is accepted
    When an attendee asks a question of 280 characters
    Then the question is accepted
    And it is listed with 0 votes

  Scenario: A question of 281 characters is rejected
    When an attendee asks a question of 281 characters
    Then the question is rejected
    And no question is listed

  Scenario: An empty question is rejected
    When an attendee asks a question that contains only spaces
    Then the question is rejected
    And no question is listed

  Scenario: A link in a question stays plain text
    When an attendee asks "Where are the slides? https://example.com/slides"
    Then the question is accepted
    And it is listed with the text exactly as typed
    And the link is not clickable
