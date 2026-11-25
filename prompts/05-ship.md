# 05 · Ship (0:36 to 0:42)

Goal: the room's wish live on the URL everyone already uses, Smoketest passed. Same Worker, same D1, same QR as minute one.

## Prompt 1 · Deploy

```
/run

Ship the new version of PitchPulse to Cloudflare. Run every command from the repo root with npm --prefix app and --config app/wrangler.jsonc:
1. Apply only the new D1 migrations to the remote database "pitchpulse".
2. wrangler deploy, same Worker "pitchpulse", URL https://pitchpulse.heptams.workers.dev
3. Run the Smoketest against that URL: npm --prefix app run smoketest -- https://pitchpulse.heptams.workers.dev
4. Show me where the new feature appears on the live URL.
```

If anything fails twice, from the repo root: `npm exec --prefix app -- wrangler rollback --config app/wrangler.jsonc`. It rolls back the code only; that is why the migration is additive. Say openly that the wish stays on the laptop tonight; the live app keeps running.

No tag for this phase: it only deploys and changes no files. It ends with the passed Smoketest on the live URL.

## Closing the loop (0:42 to 0:45)

The QR on the bridge slide is the same as at minute one. Ask the audience to try the wish, post their questions and vote. Then the course line.
