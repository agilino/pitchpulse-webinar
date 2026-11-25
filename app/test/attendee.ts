import { exports } from "cloudflare:workers";

// Drives the app the way an attendee's browser does: form posts with a voter
// cookie, and reading the attendee page.

const BASE = "https://pitchpulse.test";

export type Listed = { id: number; votes: number; text: string };

/** A fresh voter, as a browser gets on its first visit. */
export function newVoter(): string {
  return crypto.randomUUID();
}

export function ask(text: string, voter = newVoter()): Promise<Response> {
  return exports.default.fetch(`${BASE}/questions`, {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${voter}` },
    body: new URLSearchParams({ text }),
  });
}

export function vote(id: number, voter: string): Promise<Response> {
  return exports.default.fetch(`${BASE}/questions/${id}/vote`, {
    method: "POST",
    redirect: "manual",
    headers: { Cookie: `voter=${voter}` },
  });
}

export async function attendeePage(): Promise<string> {
  const response = await exports.default.fetch(`${BASE}/`);
  return response.text();
}

/** The questions in the order the attendee page lists them. */
export async function listed(page?: string): Promise<Listed[]> {
  const html = page ?? (await attendeePage());
  const items = html.matchAll(
    /<li[^>]*data-question="(\d+)"[^>]*data-votes="(\d+)"[^>]*>\s*<p>([\s\S]*?)<\/p>/g,
  );
  return [...items].map((m) => ({
    id: Number(m[1]),
    votes: Number(m[2]),
    text: m[3],
  }));
}

/** Asks a question that must be accepted and returns its id. */
export async function askQuestion(text: string): Promise<number> {
  const response = await ask(text);
  if (response.status !== 303) {
    throw new Error(`question was not accepted: ${response.status}`);
  }
  const found = (await listed()).find((q) => q.text === text);
  if (!found) throw new Error(`question is not listed: ${text}`);
  return found.id;
}

export async function votesOf(id: number): Promise<number | undefined> {
  return (await listed()).find((q) => q.id === id)?.votes;
}

export function isRedirectHome(response: Response): boolean {
  return (
    response.status === 303 && response.headers.get("Location") === "/"
  );
}
