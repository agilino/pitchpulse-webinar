declare namespace Cloudflare {
  // Tells the Workers types what the main module exports, so that
  // `exports.default` is typed in tests. `wrangler types` generates the same.
  interface GlobalProps {
    mainModule: typeof import("./index");
  }

  // Bindings from wrangler.jsonc and secrets (.dev.vars locally, wrangler secret put in production).
  interface Env {
    DB: D1Database;
    MOD_PIN: string;
  }
}
