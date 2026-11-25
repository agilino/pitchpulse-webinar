# PitchPulse webinar: from idea to live app

Material for the free webinar **"From idea to live app"** by Adam Furmanczuk ([Hepta MS](https://heptams.org)): 45 minutes live, 15 minutes of questions. Adam runs the full agentic loop live with Claude Code: brainstorm, UX discovery, specs by example, build, ship. The running example is **PitchPulse**, a live Q&A and voting app on Cloudflare Workers + D1. It is live before the webinar; the audience posts feature wishes into it at minute one, and the winning wish is built and shipped live into the same app.

Webinar: 24 Nov 2026, 19:00 CET, online, free.

## What is in here

| Path | Content |
| --- | --- |
| `slides/` | Slidev deck in English with presenter notes (`slides/slides.md`) |
| `prompts/` | Every prompt typed into Claude Code during the webinar, one file per phase |
| `.claude/skills/` | The skills used live, so you can run the same loop at home |
| `CLAUDE.md` | Stack and conventions Claude Code follows when building PitchPulse |
| `app/` | PitchPulse itself, live before the webinar |
| `docs/`, `features/` | Created live during the webinar; `docs/SPEC.md` is the index of the specification |
| `examples/question_interface/` | A finished reference run, one folder per phase |

Running it in your own Cloudflare account? Start with [SETUP.md](SETUP.md): wrangler login, your own D1 database, the moderation PIN.

## Checkpoints

Phases 1 to 4 end in a git tag. If a phase goes wrong live, we jump to the next tag and carry on. Phase 5 only deploys, so it ends with the passed Smoketest instead of a tag.

| Tag | State after the phase |
| --- | --- |
| `00-start` | PitchPulse running, `CLAUDE.md`, prompts, slides |
| `01-idea` | Problem statement for the room's wish in `docs/problem.md` |
| `02-ux` | Three sketches in `docs/sketches.drawio`, clickable prototype of the chat's pick |
| `03-spec` | `docs/SPEC.md` with the non-goal, the wish as spec and `features/*.feature` |
| `04-build` | The wish built, all tests green, inception canvas |

## Run the slides

```
cd slides
npm install
npm run dev
```

Press `o` in the browser for the overview, `p` for presenter mode with notes.

## Operate PitchPulse

| | Live | Backup |
| --- | --- | --- |
| URL | https://pitchpulse.heptams.workers.dev | https://pitchpulse-backup.heptams.workers.dev |
| Worker, D1 | `pitchpulse` | `pitchpulse-backup` |
| Config | `app/wrangler.jsonc` | `app/wrangler.backup.jsonc` |

Commands from the repo root, in Git Bash. For the backup, use `app/wrangler.backup.jsonc`, the database `pitchpulse-backup` and the backup URL.

```bash
# The operation commands assume a working wrangler setup. Check SETUP.md first.

# Moderation PIN, once per Worker (asks for the value; choose a long one, attempts are not limited)
npm exec --prefix app -- wrangler secret put MOD_PIN --config app/wrangler.jsonc

# Tests and local run. Apply new migrations to the local D1 before dev,
# otherwise the page fails with "D1_ERROR: no such column".
npm --prefix app test
npm --prefix app run db:migrate:local
npm --prefix app run dev

# New migrations to the remote D1, then deploy
npm exec --prefix app -- wrangler d1 migrations apply pitchpulse --remote --config app/wrangler.jsonc
npm exec --prefix app -- wrangler deploy --config app/wrangler.jsonc

# Smoketest (posts one question "Smoketest <time>"; with MOD_PIN set it also marks it answered)
npm --prefix app run smoketest -- https://pitchpulse.heptams.workers.dev

# Plan B: back to the previous version
npm exec --prefix app -- wrangler rollback --config app/wrangler.jsonc
```

Before the webinar: open `/mod` on the live URL, enter the PIN and use "Clear room" to remove all test questions and votes.

## Try the loop at home

Prerequisites: Claude Pro or Max, Claude Code, Node.js 20+, Git, a Cloudflare account.

After cloning, run `/bmad setup` once in Claude Code. It restores `_bmad/scripts/` from the installed BMad skills.

Start with the prompt on the handout, then follow `prompts/` phase by phase.

## License

© 2026 Adam Furmanczuk and Hepta MS.

- **Code** (`app/`, `.claude/`, `prompts/`, and the Vue and CSS files in `slides/`): [MIT](LICENSE).
- **Slides and docs** (`slides/slides.md`, the exported PDF, `README.md`, `SETUP.md`, `docs/`, `examples/`): [CC BY 4.0](LICENSE-CC-BY-4.0). Reuse them with a credit such as: "From idea to live app" by Adam Furmanczuk and Hepta MS, CC BY 4.0, https://github.com/agilino/pitchpulse-webinar

Not covered by these licenses:

- The Hepta MS name and logos (`slides/public/heptams-logo*.svg`) and the trainer photo (`slides/public/course-trainers.webp`). All rights reserved.
- The arc42 Architecture Inception Canvas template and the canvases filled from it (`*-aic.drawio`, `.claude/skills/inception-canvas/*.drawio`): © Gernot Starke, Patrick Roos and arc42 Contributors, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
