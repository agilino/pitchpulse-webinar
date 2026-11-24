Feature: Show the sketch with its question
  Everyone who sees a question sees its sketch.
  A sketch never changes the ordering.

  @must
  Scenario: The sketch shows for the other attendees and for the host
    Given Mia's question with a sketch
    When another attendee and the host look at the questions
    Then both see Mia's question with her sketch

  @later
  Scenario: A sketch does not change the ordering
    Given a question with a sketch and 3 votes
    And a question without a sketch and 5 votes
    When an attendee looks at the questions
    Then the question with 5 votes is listed above the question with the sketch
