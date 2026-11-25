# PitchPulse

Live Q&A and voting app for talks and webinars. Attendees scan a QR code, ask questions and upvote the ones they want answered. No login. The host moderates with a PIN.

## Source of truth

- `docs/SPEC.md` is the index of the specification. The rules and examples live in `docs/specs/*.md`, the executable scenarios in `features/*.feature`.
- Every behaviour change starts in the spec. If a scenario and the code disagree, the scenario wins until the spec is changed on purpose.
- `docs/problem.md` holds the problem statement and the hypotheses we test. Do not invent customer evidence.

## Stack

- App code lives in `app/`; run npm commands there.
- Runtime: Cloudflare Workers, database: Cloudflare D1 (SQLite), deployment with `wrangler`.
- Language: TypeScript. Framework: Hono. Keep the dependency list short; the whole app must build and deploy in under two minutes.
- Frontend: server-rendered HTML from Hono's `html` helper with a small amount of vanilla JavaScript, no build step for the client, phone first.
- Tests: Vitest with `@cloudflare/vitest-plugin`, so tests run against a real D1 binding. One test file per feature file, one test per scenario, named after the scenario.
- Decisions that deviate from this file are recorded in `docs/decisions.md`.

## Conventions

- Small commits, imperative subject line, English.
- Migrations in `app/migrations/` with a numeric prefix, applied with `wrangler d1 migrations apply`.
- Secrets never in the repo: `.dev.vars` locally, `wrangler secret put` in production.
- Identity of a voter is a random cookie, set on first visit. No personal data is stored.
- Moderation PIN comes from the secret `MOD_PIN`.
- A Smoketest is a script that hits the live URL, posts a question, votes once and checks the ordering. It runs after every deploy.

## Working style

- Use plan mode for anything larger than one file.
- Write the failing tests from the scenarios first, then implement until green.
- Run `npm test` before every commit.
- When unsure about a rule, ask, do not guess. Open questions go into the spec, not into the code.
