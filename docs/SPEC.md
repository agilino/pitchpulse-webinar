# PitchPulse specification

This file is the index of the specification. Every behaviour change starts here.

## Index

- Problem and hypotheses: [docs/problem.md](problem.md)
- Rules and examples, in `docs/specs/`:
  - [Sketch on a question](specs/sketch.md), with the contract for the build
- Executable scenarios, in `features/`, tagged `@must` (deployed first) or `@later`:
  - [Add a sketch to a question](../features/sketch-add.feature)
  - [Show the sketch with its question](../features/sketch-show.feature)
  - [Remove a sketch with its question](../features/sketch-remove.feature)

## Non-goals

Version one deliberately does not do the following:

- No login. Attendees take part without an account.
- No IP check. Votes are not tied to an IP address.
- Double votes from a new cookie are accepted. Whoever clears the cookie can vote again.
