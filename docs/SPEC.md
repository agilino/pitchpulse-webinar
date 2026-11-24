# PitchPulse specification

This file is the index of the specification. Every behaviour change starts here.

## Index

- Problem and hypotheses: [docs/problem.md](problem.md)
- Rules and examples: `docs/specs/*.md` (none yet)
- Executable scenarios: `features/*.feature` (none yet)

## Non-goals

Version one deliberately does not do the following:

- No login. Attendees take part without an account.
- No IP check. Votes are not tied to an IP address.
- Double votes from a new cookie are accepted. Whoever clears the cookie can vote again.
