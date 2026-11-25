# Decisions

Deviations from `CLAUDE.md` and choices it leaves open.

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-11-23 | App code lives in `app/`, not in the repo root. | The root carries the deck and the prompts. |
| 2026-11-23 | Tests use `@cloudflare/vitest-plugin`. | It is the new name of `@cloudflare/vitest-pool-workers`, which npm marks as deprecated. |
| 2026-11-23 | The D1 binding is `DB`, the database is called `pitchpulse`. | Code reads `env.DB`; `wrangler d1` commands take the database name. |
| 2026-11-23 | A fresh clone installs with `npm ci --prefix app`. | On Windows, `npm install --prefix app` without a package name fails: npm 10 treats it as a global install of the current folder. |
