# Setup

One-time setup for running PitchPulse in your own Cloudflare account. After this, the commands under "Operate PitchPulse" in the [README](README.md) work as written.

All commands run from the repo root, in Git Bash.

## Prerequisites

- Node.js 20+ and Git
- A Cloudflare account with a `workers.dev` subdomain
- Claude Code, if you want to run the loop from `prompts/`; see step 6 for the skills and tools it needs

## 1. Install and log in

```bash
npm --prefix app install
npm exec --prefix app -- wrangler login
npm exec --prefix app -- wrangler whoami
```

`whoami` shows the account wrangler will deploy to.

## 2. Create your own D1 database

`app/wrangler.jsonc` carries the `database_id` of the webinar's database. It does not exist in your account, so create your own:

```bash
npm exec --prefix app -- wrangler d1 create pitchpulse
```

Wrangler prints a `database_id` and offers to add the binding to your config. Answer no, the binding `DB` is already there. Replace the `database_id` in `app/wrangler.jsonc` with yours.

## 3. Run it locally

```bash
cp app/.dev.vars.example app/.dev.vars
npm --prefix app run db:migrate:local
npm --prefix app test
npm --prefix app run dev
```

`.dev.vars` holds the moderation PIN for local development. Never commit it.

## 4. First deploy

```bash
npm exec --prefix app -- wrangler d1 migrations apply pitchpulse --remote --config app/wrangler.jsonc
npm exec --prefix app -- wrangler deploy --config app/wrangler.jsonc
npm exec --prefix app -- wrangler secret put MOD_PIN --config app/wrangler.jsonc
```

`deploy` prints your URL, `https://pitchpulse.<your-subdomain>.workers.dev`. `secret put` asks for the PIN; choose a long one, attempts are not limited.

Then check the live app with the Smoketest:

```bash
npm --prefix app run smoketest -- https://pitchpulse.<your-subdomain>.workers.dev
```

## 5. Use your URL

The README and `prompts/05-ship.md` name the webinar's URL, `https://pitchpulse.heptams.workers.dev`. Use your own URL in those commands.

## 6. Skills and tools for the loop

Only needed for the prompts in `prompts/`. Operating the app needs none of it.

| What | Needed for | In the repo? |
| --- | --- | --- |
| `/example-mapping`, `/inception-canvas` | Phases 3 and 4 | Yes, in `.claude/skills/` |
| `/bmad-build`, `/bmad-code-review`, `/bmad-ux` | Phases 2 and 4 | Yes, short webinar versions in `.claude/skills/` |
| BMad Method: `bmad`, `bmad-party-mode`, `bmad-brainstorming`, `bmad-agent-dev`, `bmad-agent-ux-designer` | Phase 1, and the personas that `/bmad-build` and `/bmad-ux` load | No, install it |
| draw.io MCP | Phase 2 sketches, opening the canvas in phase 4 | No, install it |
| Cloudflare plugin for Claude Code | Phase 5 | No, install it |
| `/run` | Phase 5 | Built into Claude Code |

BMad Method comes from `bmad-code-org/BMAD-METHOD`. Install each skill named above, then run `/bmad setup` once in Claude Code. Setup restores `_bmad/scripts/` and names anything that is still missing, with its install command. BMad's scripts need `uv`.

```bash
npx skills add bmad-code-org/BMAD-METHOD --skill bmad
npx skills add bmad-code-org/BMAD-METHOD --skill bmad-party-mode
npx skills add bmad-code-org/BMAD-METHOD --skill bmad-brainstorming
npx skills add bmad-code-org/BMAD-METHOD --skill bmad-agent-dev
npx skills add bmad-code-org/BMAD-METHOD --skill bmad-agent-ux-designer
```

draw.io MCP, once per machine:

```bash
claude mcp add --scope user drawio -- npx -y @drawio/mcp
```

Cloudflare plugin, typed in Claude Code. It brings the wrangler skills and the Cloudflare docs:

```
/plugin marketplace add cloudflare/skills
/plugin install cloudflare@cloudflare
```

`/inception-canvas` fills the canvas with a small Python script, so Python 3 has to be on the path.
