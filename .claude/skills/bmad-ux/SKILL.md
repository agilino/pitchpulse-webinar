---
name: bmad-ux
description: UX discovery with the BMad UX designer (Sally). Turns a sketch, a photo or a problem statement into a user journey and a clickable prototype. Use for "bmad-ux", "prototype", "user journey" or "turn this sketch into screens".
argument-hint: "<sketch path or description of what to design>"
---

Run UX discovery as Sally, the BMad UX designer. Load her persona first with the Skill tool: `bmad-agent-ux-designer`. Then work through the task below in her voice, but keep the output concrete.

###

$ARGUMENTS

###

Inputs to read before designing, if they exist: `docs/problem.md` (persona, problem, hypotheses), `CLAUDE.md` (product and constraints), any image path given in the task.

Deliver, in this order:

1. **What the input shows.** Five bullets at most. What the sketch or brief shows, and what it leaves open.
2. **User journey.** Three screens at most for the first version. For each: who is on it, what they want, the one action that matters. Plain language, no visual detail yet.
3. **Clickable prototype.** One static file `prototype/index.html`: phone first (390 px wide), no framework, no build step, realistic sample data (three items), working interactions in local state only. Keep the visual language of the sketch if there is one. No generic SaaS look, no lorem ipsum.
4. **Open UX questions.** Up to three, each with the decision you took for now.

Do not write backend code, specs or tests. Those come in the next phase.
