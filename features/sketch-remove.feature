Feature: Remove a sketch with its question
  A sketch goes when its question goes, and only then.
  Clearing the room is the only way to remove a sketch.

  @must
  Scenario: Clearing the room removes the sketch with its question
    Given Mia's question with a sketch
    When the host clears the room
    Then no question is listed
    And Mia's sketch is gone

  @later
  Scenario: An answered question keeps its sketch
    Given Mia's question with a sketch
    When the host marks the question as answered
    Then the question is listed as answered with her sketch
