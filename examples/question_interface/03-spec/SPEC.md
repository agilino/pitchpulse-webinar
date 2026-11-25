# PitchPulse specification

Index of the specification. Rules and examples live in `docs/specs/`, executable scenarios in `features/`. One test file per feature file, one test per scenario, named after the scenario.

## Ask and vote

Spec: [docs/specs/ask-and-vote.md](docs/specs/ask-and-vote.md)

| Rule | Feature file | Scenarios |
| --- | --- | --- |
| Ask a question of 1 to 280 characters | [features/ask.feature](features/ask.feature) | 4 |
| One vote per voter and question; voting again takes it back | [features/vote.feature](features/vote.feature) | 3 |
| Most votes first, older first on a tie | [features/ranking.feature](features/ranking.feature) | 2 |
| Host marks answered with the PIN; answered moves to the bottom | [features/moderation.feature](features/moderation.feature) | 3 |

## Clear room

Spec: [docs/specs/clear-room.md](docs/specs/clear-room.md)

| Rule | Feature file | Scenarios |
| --- | --- | --- |
| Host clears the room with the PIN after confirming once | [features/clear-room.feature](features/clear-room.feature) | 4 |

Problem and hypotheses: [docs/problem.md](docs/problem.md)
