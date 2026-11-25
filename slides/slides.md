---
theme: default
title: From idea to live app
info: |
  The full agentic loop: 45 minutes live, 15 minutes your questions. Live webinar by Adam Furmanczuk (Hepta MS).
class: text-left
colorSchema: light
selectable: true
drawings:
  persist: false
transition: fade
mdc: true
css: unocss
---

<div class="kicker">Live webinar · 45 minutes live · 15 minutes your questions · free</div>

# From idea to live app.

The full agentic loop, once, end to end. Built live. What was prepared, I tell you.

<div style="margin-top: 2.5rem; display: flex; gap: 2.5rem; font-size: 0.95rem">
<div><strong>Adam Furmanczuk</strong><br>Trainer, Spec Driven Development · Hepta MS</div>
<div><strong>24 Nov 2026</strong><br>19:00 CET · online</div>
</div>

<div class="footer"><span>heptams.org</span><span>© 2026 Adam Furmanczuk and Hepta MS · CC BY 4.0</span></div>

<!--
0:00. Welcome, one sentence on who I am: I teach teams to steer coding agents with specs. Start the timer now.

The frame: 45 minutes I build, 15 minutes you ask, in the app we build tonight.

Name what is prepared once: PitchPulse was live before tonight, you use it in a minute. Tonight we build your wish into it. Everything else happens in front of you. When something breaks, I jump to the next checkpoint and say so.
-->

---
layout: two-cols
---

<div class="kicker">The end, first</div>

# This app hides one business decision.

You'll notice it in about 15 minutes.

**PitchPulse.** Scan, ask a question, upvote the ones you want answered. No login.

<div style="margin-top: 1.5rem">
<span class="chip tool">Cloudflare Workers</span>
<span class="chip tool">D1</span>
<span class="chip tool">Claude Code</span>
</div>

::right::

<div style="display: flex; flex-direction: column; align-items: center; gap: 0.8rem; margin-top: 0.5rem">
<div style="font-weight: 700; font-size: 1.15rem; text-align: center; line-height: 1.3">Which feature would you add to PitchPulse?</div>
<img src="/qr-pitchpulse.svg" alt="QR code: PitchPulse" style="width: 220px; height: 220px">
<div style="font-size: 0.8rem; color: #6B7380">Post it. Vote on the others.</div>
</div>

<!--
0:00:30. QR up, ask the question: "Which feature would you add to PitchPulse? Post it, then vote on the others." Host view on the second screen.

While they type, the wound, verbatim: "AI gives your team more output. What you get is more waiting and more breakage. Tonight you see where that comes from."

Source if asked: DORA 2025 report (AI raises throughput and still raises delivery instability), Faros AI 2025 (98% more pull requests merged, 91% longer review time). Both are correlations.

Then close the phone and switch to the loop slide.
-->

---

<div class="kicker">What is an agentic loop?</div>

# Five steps. Then again.

<div class="lr-wrap">
<div class="lr">
<svg aria-hidden="true" width="698" height="460" viewBox="0 0 698 460" fill="none" stroke="#972929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 0; top: 0">
<defs><marker id="ring-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1l7 4-7 4" fill="none" stroke="#972929" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></marker></defs>
<path d="M326 70Q366 54 405 74" marker-end="url(#ring-ah)"></path>
<path d="M572 167Q604 170 606 194" marker-end="url(#ring-ah)"></path>
<path d="M511 338Q502 386 462 380" marker-end="url(#ring-ah)"></path>
<path d="M258 408Q222 418 198 368" marker-end="url(#ring-ah)"></path>
<path d="M152 225Q138 190 164 162" marker-end="url(#ring-ah)"></path>
</svg>

<div class="lr-center">
<div class="lr-rules">Live. Phases 1 to 4 end in a git tag. When something breaks, I jump to the next one.</div>
<div class="lr-team">YOUR TEAM:<br>YOU + YOUR AGENTIC TEAM</div>
</div>

<div class="lr-again"><span>AND AGAIN.</span> What the first users say feeds the next round.</div>

<div class="lr-card" style="left: 124px; top: 0">
<div class="lr-head"><div class="lr-num">1</div><div class="lr-title">Brainstorm</div></div>
<svg aria-label="Pain: alone with the idea. Solution: a product team argues about it" width="110" height="44" viewBox="0 0 110 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="1" width="44" height="42" rx="6" fill="#F5F7FA" stroke="#D1D5DB" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="2"><circle cx="12" cy="11" r="3.5"></circle><path d="M12 15v11"></path></g>
<g stroke="#6B7380" stroke-width="1.5"><rect x="21" y="6" width="12" height="12" fill="#FFFFFF"></rect><path d="M5 30h36M20 30v-5h5v5M28 30v-5h5v5M36 30v-5h5v5"></path></g>
<text x="27" y="15.5" text-anchor="middle" style="font-family: Montserrat, Arial, sans-serif; font-weight: 700; font-size: 9px" fill="#6B7380">?</text>
<path d="M49 22h12M57 18l4 4-4 4" stroke="#972929" stroke-width="2"></path>
<rect x="65" y="1" width="44" height="42" rx="6" fill="#FFFFFF" stroke="#972929" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="1.5"><rect x="68" y="5" width="14" height="9" rx="2"></rect><rect x="92" y="3" width="14" height="9" rx="2"></rect><path d="M72 14l-1 3 4-3M101 12l1 3-4-3"></path></g>
<rect x="78" y="15" width="20" height="10" rx="2" fill="#972929"></rect>
<text x="88" y="22.5" text-anchor="middle" style="font-family: Montserrat, Arial, sans-serif; font-weight: 700; font-size: 7.5px" fill="#FFFFFF">€?</text>
<g stroke="#1B2430" stroke-width="1.5"><rect x="80" y="28" width="14" height="11" fill="#FFFFFF"></rect><path d="M69 26l9 4M106 26l-9 4M68 41h38"></path></g>
</svg>
<div class="lr-fill"><span>My customer is annoyed by</span><span class="lr-line"></span></div>
</div>

<div class="lr-card" style="left: 407px; top: 5px">
<div class="lr-head"><div class="lr-num">2</div><div class="lr-title">UX discovery</div></div>
<svg aria-label="Pain: a napkin sketch and a shrug. Solution: a clickable prototype on the phone" width="110" height="44" viewBox="0 0 110 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="1" width="44" height="42" rx="6" fill="#F5F7FA" stroke="#D1D5DB" stroke-width="1.5"></rect>
<g transform="rotate(-8 14 22)" stroke="#6B7380" stroke-width="1.5"><rect x="6" y="11" width="16" height="22" fill="#FFFFFF"></rect><path d="M9 15h10M9 20h7M9 25h10"></path><circle cx="17" cy="29" r="2.5"></circle></g>
<g stroke="#1B2430" stroke-width="2"><circle cx="35" cy="11" r="3.5"></circle><path d="M35 15v12M27 22l8-4 8 4M35 27l-4 9M35 27l4 9"></path></g>
<path d="M49 22h12M57 18l4 4-4 4" stroke="#972929" stroke-width="2"></path>
<rect x="65" y="1" width="44" height="42" rx="6" fill="#FFFFFF" stroke="#972929" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="1.5"><rect x="69" y="5" width="9" height="6" rx="1"></rect><circle cx="73.5" cy="8" r="1.5"></circle></g>
<rect x="82" y="5" width="16" height="32" rx="3" stroke="#1B2430" stroke-width="2" fill="#FFFFFF"></rect>
<path d="M85.5 11h9M85.5 16h9M85.5 21h9" stroke="#1B2430" stroke-width="2"></path>
<rect x="85.5" y="27" width="9" height="6" rx="2" fill="#972929"></rect>
<path d="M104 42L93 31" stroke="#1B2430" stroke-width="2.5"></path>
<circle cx="93" cy="31" r="1.5" fill="#1B2430"></circle>
</svg>
<div class="lr-fill"><span>Works the moment they can</span><span class="lr-line"></span></div>
</div>

<div class="lr-card" style="left: 513px; top: 196px">
<div class="lr-head"><div class="lr-num">3</div><div class="lr-title">Specs by example</div></div>
<svg aria-label="Pain: one sentence, three different interpretations. Solution: story, rules, examples and one open question" width="110" height="44" viewBox="0 0 110 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="1" width="44" height="42" rx="6" fill="#F5F7FA" stroke="#D1D5DB" stroke-width="1.5"></rect>
<text x="23" y="10" text-anchor="middle" style="font-family: Montserrat, Arial, sans-serif; font-weight: 700; font-size: 6.5px" fill="#1B2430">“can vote”</text>
<g stroke="#6B7380" stroke-width="1.5"><rect x="5" y="14" width="10" height="9" rx="1.5" fill="#FFFFFF"></rect><rect x="18" y="14" width="10" height="9" rx="1.5" fill="#FFFFFF"></rect><rect x="31" y="14" width="10" height="9" rx="1.5" fill="#FFFFFF"></rect><path d="M7.5 17h5M7.5 20h5M33.5 17h5M33.5 20h2"></path><circle cx="23" cy="18.5" r="2"></circle></g>
<g stroke="#1B2430" stroke-width="2"><circle cx="10" cy="31" r="3"></circle><circle cx="23" cy="31" r="3"></circle><circle cx="36" cy="31" r="3"></circle><path d="M10 34v6M23 34v6M36 34v6"></path></g>
<path d="M49 22h12M57 18l4 4-4 4" stroke="#972929" stroke-width="2"></path>
<rect x="65" y="1" width="44" height="42" rx="6" fill="#FFFFFF" stroke="#972929" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="1.5" fill="#F5F7FA"><rect x="69" y="5" width="36" height="7" rx="1"></rect><rect x="69" y="15" width="16" height="7" rx="1"></rect><rect x="89" y="15" width="16" height="7" rx="1"></rect><rect x="69" y="25" width="7" height="6" rx="1" fill="#FFFFFF"></rect><rect x="78" y="25" width="7" height="6" rx="1" fill="#FFFFFF"></rect><rect x="89" y="25" width="7" height="6" rx="1" fill="#FFFFFF"></rect><rect x="98" y="25" width="7" height="6" rx="1" fill="#FFFFFF"></rect></g>
<rect x="96" y="33" width="9" height="8" rx="1" fill="#972929"></rect>
<text x="100.5" y="39.5" text-anchor="middle" style="font-family: Montserrat, Arial, sans-serif; font-weight: 700; font-size: 7px" fill="#FFFFFF">?</text>
</svg>
<div class="lr-fill"><span>If</span><span class="lr-line"></span><span>, then</span><span class="lr-line"></span></div>
</div>

<div class="lr-card" style="left: 260px; top: 301px">
<div class="lr-head"><div class="lr-num">4</div><div class="lr-title">Build</div></div>
<svg aria-label="Pain: a loop of fixes at 2 a.m. Solution: plan, tests from the examples, review" width="110" height="44" viewBox="0 0 110 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="1" width="44" height="42" rx="6" fill="#F5F7FA" stroke="#D1D5DB" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="2"><rect x="6" y="14" width="20" height="14" rx="1" fill="#FFFFFF"></rect><path d="M3 31h26"></path></g>
<g stroke="#6B7380" stroke-width="1.5"><path d="M9 18h12M9 21h8"></path><path d="M21 9a5 5 0 1 0-5 5M16 11l0 3 3 0"></path></g>
<rect x="9" y="23.5" width="14" height="2.5" fill="#6B7380"></rect>
<g stroke="#1B2430" stroke-width="1.5"><circle cx="37" cy="13" r="5"></circle><path d="M37 13V9.5M37 13h2.5"></path><rect x="33" y="27" width="6" height="7" rx="1"></rect><path d="M39 29h2a1.5 1.5 0 0 1 0 3h-2"></path></g>
<path d="M49 22h12M57 18l4 4-4 4" stroke="#972929" stroke-width="2"></path>
<rect x="65" y="1" width="44" height="42" rx="6" fill="#FFFFFF" stroke="#972929" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="1.5"><rect x="69" y="6" width="6" height="6" rx="1"></rect><rect x="69" y="15" width="6" height="6" rx="1"></rect><rect x="69" y="24" width="6" height="6" rx="1"></rect><path d="M70.5 9l1.5 1.5 2.5-3M70.5 18l1.5 1.5 2.5-3M70.5 27l1.5 1.5 2.5-3M78 9h8M78 18h8M78 27h8"></path><rect x="90" y="6" width="7" height="6" rx="1"></rect><rect x="99" y="6" width="7" height="6" rx="1"></rect><path d="M91.5 9l1.5 1.5 2.5-3M100.5 9l1.5 1.5 2.5-3"></path></g>
<g stroke="#972929" stroke-width="2"><circle cx="95" cy="27" r="6"></circle><path d="M99.5 31.5L106 38" stroke-width="2.5"></path></g>
</svg>
<div class="lr-fill"><span>Done when this passes:</span><span class="lr-line"></span></div>
</div>

<div class="lr-card" style="left: -4px; top: 227px">
<div class="lr-head"><div class="lr-num">5</div><div class="lr-title">Ship</div></div>
<svg aria-label="Pain: it only runs on my laptop. Solution: a live URL and QR code on everyone's phone" width="110" height="44" viewBox="0 0 110 44" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="1" y="1" width="44" height="42" rx="6" fill="#F5F7FA" stroke="#D1D5DB" stroke-width="1.5"></rect>
<g stroke="#1B2430" stroke-width="2"><rect x="5" y="12" width="18" height="12" rx="1" fill="#FFFFFF"></rect><path d="M3 27h22"></path></g>
<text x="14" y="20" text-anchor="middle" style="font-family: Montserrat, Arial, sans-serif; font-weight: 600; font-size: 6px" fill="#6B7380">local</text>
<rect x="27" y="4" width="4" height="36" fill="#6B7380"></rect>
<g stroke="#6B7380" stroke-width="1.5"><rect x="34" y="7" width="6" height="11" rx="1.5"></rect><rect x="34" y="23" width="6" height="11" rx="1.5"></rect><rect x="41" y="15" width="3" height="11" rx="1"></rect></g>
<path d="M49 22h12M57 18l4 4-4 4" stroke="#972929" stroke-width="2"></path>
<rect x="65" y="1" width="44" height="42" rx="6" fill="#FFFFFF" stroke="#972929" stroke-width="1.5"></rect>
<path d="M71 18a4.5 4.5 0 0 1 8-3a4.5 4.5 0 0 1 8 3a3 3 0 0 1 0 6H71a3 3 0 0 1 0-6z" stroke="#1B2430" stroke-width="1.5"></path>
<g fill="#972929"><rect x="70" y="27" width="4" height="4"></rect><rect x="80" y="27" width="4" height="4"></rect><rect x="70" y="37" width="4" height="4"></rect><rect x="76" y="27" width="2" height="2"></rect><rect x="77" y="31" width="2" height="2"></rect><rect x="72" y="33" width="2" height="2"></rect><rect x="80" y="33" width="2" height="2"></rect><rect x="82" y="37" width="2" height="2"></rect><rect x="77" y="38" width="2" height="2"></rect></g>
<g stroke="#1B2430" stroke-width="1.5"><rect x="92" y="4" width="7" height="12" rx="1.5" fill="#FFFFFF"></rect><rect x="100" y="4" width="7" height="12" rx="1.5" fill="#FFFFFF"></rect><rect x="96" y="19" width="7" height="12" rx="1.5" fill="#FFFFFF"></rect><path d="M94 8h3M94 11h3M102 8h3M102 11h3M98 23h3M98 26h3"></path><path d="M93 38l3 3 6-6" stroke-width="2"></path></g>
</svg>
<div class="lr-fill"><span>Live at</span><span class="lr-line"></span><span>· Smoketest ☐</span></div>
</div>
</div>
</div>

<div style="position: absolute; left: 3.5rem; bottom: 2.2rem; display: flex; align-items: flex-end; gap: 0.6rem">
<img src="/qr-pitchpulse.svg" alt="QR code: PitchPulse" style="width: 110px; height: 110px">
<div style="font-size: 0.75rem; color: var(--hms-grey); line-height: 1.3">Late?<br>Post your wish.</div>
</div>

<!--
0:01:30. The loop is the same five steps every product team does. The difference: each step now has an agent that does the heavy lifting, and you coach it.

Rules in one sentence: it is live, phases 1 to 4 end in a git tag, phase 5 ends live, and when something breaks I jump to the next tag and say so. That is not cheating, that is engineering.

Show git tag in the terminal.

About 0:02:45, end of this slide: read the top 3 feature ideas aloud. "The winner goes into the brainstorm in a minute." Switch to phase 1 at 0:03.
-->

---
layout: two-cols
---

<div class="phase"><div class="num">1</div><div><strong>Brainstorm</strong><div class="time">0:03 – 0:08</div></div></div>

<div class="pain-solution">
<div><div class="label">Pain</div>Alone with the idea. Everyone you ask is polite.</div>
<div class="solution"><div class="label">Tonight</div>A product team argues about it for 2 minutes: PM, analyst, UX.</div>
</div>

<div style="margin-top: 1.2rem">
<span class="chip">/bmad-party-mode</span>
<span class="chip">/bmad-brainstorming</span>
</div>

<div class="git-tag">01-idea</div>

::right::

<div style="font-size: 0.9rem; margin-top: 0.5rem">

**Out of this phase**

- Problem statement, 2 sentences, in `docs/problem.md`
- 3 hypotheses we can falsify
- What we leave out

</div>

<!--
0:03:15. Paste Prompt 1 with the room's top wish, send it. Session mode: one stream, John, Mary and Sally talk in turn, about a minute.

While it runs, read aloud only the sharpest clash, best the one about the room's wish. Say once: these are hypotheses, not customers. The value is speed and disagreement, not truth.

0:05:30 at the latest: if it is still running, press Esc. "Thanks, team." Send Prompt 2.

While Prompt 2 writes (30 to 60 s), chat: "Would you keep the wish in version one? Yes or no."

From 0:07: show docs/problem.md. Chat: "Which hypothesis dies first? 1, 2 or 3?" Commit, tag 01-idea at 0:08. Plan B: cut the round, show the file from the tag.

Prompt 1, replace [ROOM WISH] with the room's top wish:

```
/bmad-party-mode --mode session

Idea in one sentence: PitchPulse lets a webinar audience ask questions and upvote the ones they want answered, so the speaker answers what matters most.
The room's top feature wish (most votes in PitchPulse at minute one, a hypothesis, not customer evidence): [ROOM WISH]

John (PM), Mary (analyst), Sally (UX): argue about this idea for a few rounds.
Your goal is the input for docs/problem.md: the problem in 2 sentences, 3 hypotheses we can falsify, and what we leave out of version one.
Cover: who is the customer, what annoys them today, what would prove or kill the idea, and whether the room's wish belongs in version one or on the leave-out list.
Be concrete and disagree where you honestly would. Stop after 6 contributions and let me summarise.
```

Prompt 2:

```
/bmad-brainstorming

Use the 'Ideate for me' stance and go straight to convergence, the party round above is the input. Write only the file.
From the party round above, write docs/problem.md with:
1. Problem statement in 2 sentences (who, what hurts, when).
2. Three hypotheses we will test with the first version, each falsifiable.
3. What we deliberately leave out of the first version.
Keep it under 150 words. Mark everything as hypotheses, we have not talked to customers yet.
```
-->

---
layout: two-cols
---

<div class="phase"><div class="num">2</div><div><strong>UX discovery</strong><div class="time">0:08 – 0:15</div></div></div>

<div class="pain-solution">
<div><div class="label">Pain</div>A napkin sketch and a shrug. "You'll see it when it's done."</div>
<div class="solution"><div class="label">Tonight</div>Three sketches in draw.io. You pick one, it becomes a clickable prototype on the phone.</div>
</div>

<div style="margin-top: 1.2rem">
<span class="chip">/bmad-ux</span>
<span class="chip tool">draw.io MCP</span>
</div>

<div class="git-tag">02-ux</div>

::right::

<div style="font-size: 0.9rem; margin-top: 0.5rem">

**Out of this phase**

- Three sketches of the room's wish, A, B, C in `docs/sketches.drawio`, the chat picks one
- Three screens: join, ask and vote, host
- `prototype/index.html`, phone first

</div>

<!--
0:08. Paste Prompt 1 with the room's wish, send. While draw.io opens (about a minute): the point is not the pixels, the point is that a founder can show something clickable the same evening.

About 0:10, three phones on screen. Chat: "A, B or C? Type the letter." 30 seconds, read the result aloud.

0:11. Paste Prompt 2 with the winner, send. Sally drafts how it looks and how it behaves, then renders the prototype.

0:14. Open prototype/index.html at phone width, click through. Commit, tag 02-ux at 0:15. Plan B: if draw.io hangs, show examples/question_interface/02-ux/docs/sketch.jpg, say so, and run Prompt 2 with that file.

Prompt 1, replace [ROOM WISH]:

```
The room's wish: [ROOM WISH].
Using the draw.io MCP, sketch three different ways to build this wish into the PitchPulse attendee screen, side by side in one diagram, each as a phone wireframe (390x844), hand-drawn style (sketch=1), labelled A, B and C in big letters. Each version solves the wish differently; asking and voting stay on every screen.
Use three realistic sample questions with vote counts. Open it in draw.io and save the XML as docs/sketches.drawio.
```

Prompt 2, replace [WINNER] with A, B or C:

```
/bmad-ux The chat picked version [WINNER] in docs/sketches.drawio. Read docs/problem.md for the persona and the problem.
Fast path: draft DESIGN.md and EXPERIENCE.md with [ASSUMPTION] tags, no validation. Then render the attendee screen as an HTML mock at phone width and save it as prototype/index.html.
```
-->

---

<div class="kicker">One line in my project rules</div>

<div v-click style="margin-top: 1rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 1.15rem; background: #F5F7FA; border: 1px solid #D1D5DB; border-radius: 0.6rem; padding: 0.9rem 1.1rem">
Identity of a voter is a random cookie, set on first visit. No personal data is stored.
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem; font-size: 0.95rem; line-height: 1.4">
<div v-click style="border: 1.5px solid #D1D5DB; background: #F5F7FA; border-radius: 0.7rem; padding: 0.9rem">
Incognito tab: new cookie, one more vote.
<div style="font-weight: 700; margin-top: 0.6rem">Would you ship this?</div>
</div>
<div v-click style="background: #972929; color: #fff; border-radius: 0.7rem; padding: 0.9rem; font-weight: 600">
A business decision. I made it without noticing. The agent obeyed perfectly.
</div>
<div v-click style="background: #1B2430; color: #fff; border-radius: 0.7rem; padding: 0.9rem">
<div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; color: #D9A0A0; margin-bottom: 0.3rem">SPEC · NON-GOAL</div>
No login, no IP check, double votes accepted in version one.
</div>
</div>

<!--
0:15 to 0:19. Phase 3 opens here, before we spec the wish. First one sentence: "Before we spec your wish, look at a rule you already used tonight. At minute one you all voted. With a cookie." Switch to VS Code: CLAUDE.md is already open in its own tab, the line "Identity of a voter…" selected. Five seconds, "this is my file", then back to this slide. Open that tab before the webinar.

[click] The line appears. Read it aloud, slowly.

[click] Ask the chat: "Would you ship this? Yes or no." Give them 30 seconds, read the result aloud.

[click] Say verbatim: "The agent didn't decide this. I did, in one line of my project rules. It was a business decision and I didn't see it. The agent obeyed perfectly."

[click] Adam's decision after the vote: no login, because "no login" is the product. So the spec writes it down as a non-goal: no login, no IP check, double votes accepted in version one. The hole becomes a decision, not a surprise.

After click 4, paste this, then on to the next slide:

```
Start docs/SPEC.md as the index of the specification with a section "Non-goals": no login, no IP check, double votes from a new cookie are accepted in version one. Do not change code.
```
-->

---
layout: two-cols
---

<div class="phase"><div class="num">3</div><div><strong>Specs by example</strong><div class="time">0:15 – 0:26</div></div></div>

<div class="pain-solution">
<div><div class="label">Pain</div>Your rules file looks technical. Is it?</div>
<div class="solution"><div class="label">Tonight</div>Your wish as a story. Rules, examples, open questions. Then Gherkin.</div>
</div>

<div style="margin-top: 1.2rem">
<span class="chip ours">★ /example-mapping</span>
</div>

<div class="git-tag">03-spec</div>

::right::

<div style="font-size: 0.9rem; margin-top: 0.5rem">

**The story**

As an attendee I want ______, so that ______.

**From your wish, live**

- Rules: what must always hold
- Examples: one per rule, and one that breaks it
- Open questions: who decides?

</div>

<!--
0:19. This is the core. Slow down here. The turn is done; now the room's wish gets the same treatment.

Paste Prompt 2. It proposes the story first; confirm or tweak it in one sentence. Then Claude proposes rules, examples and counter examples, and asks the open questions. Answer small ones yourself in one sentence. If one is a real business decision, give it to the chat: "Who decides this? You. Yes or no?"

Then Prompt 3, the Gherkin. Show the new feature file. Commit, tag 03-spec at 0:26.

Prompt 2, replace [ROOM WISH] and [WINNER]:

```
/example-mapping The room's wish: [ROOM WISH].

First propose the user story in one sentence (As an attendee I want …, so that …) from docs/problem.md and version [WINNER] in docs/sketches.drawio, and wait for my OK. Then run example mapping on it. PitchPulse already runs; asking, voting and moderation stay as they are. Keep the rules small enough to build in ten minutes.
```

Prompt 3:

```
Turn the approved spec for the wish into Gherkin: one feature file in features/, one scenario per example, plain language, no UI steps. Add the spec and the feature file to docs/SPEC.md. Do not write code.
```
-->

---
layout: two-cols
---

<div class="phase"><div class="num">4</div><div><strong>Build</strong><div class="time">0:26 – 0:36</div></div></div>

<div class="pain-solution">
<div><div class="label">Pain</div>A loop of fixes at 2 a.m. The agent "fixes" what it broke.</div>
<div class="solution"><div class="label">Tonight</div>Plan first. Tests from the examples. Then code. Then a second agent reviews.</div>
</div>

<div style="margin-top: 1.2rem">
<span class="chip">/bmad-build</span>
<span class="chip">/bmad-code-review</span>
<span class="chip ours">★ /inception-canvas</span>
<span class="chip tool">draw.io MCP</span>
</div>

<div class="git-tag">04-build</div>

::right::

<div style="font-size: 0.9rem; margin-top: 0.5rem">

**Out of this phase**

- One test per scenario, named after it
- Tests red, then green
- Review by a second agent against the spec
- Canvas: four fields, second pane
- App running locally

PitchPulse was live before tonight. Your wish is built now.

<div style="margin-top: 0.8rem; font-size: 0.7rem; color: #6B7380">arc42 Architecture Inception Canvas, canvas.arc42.org, CC BY-SA 4.0</div>

</div>

<!--
0:26. Say what is prepared: PitchPulse was live before tonight. Your wish gets built now, from the scenarios we just wrote, and all the old tests must stay green.

Plan mode first. Read the plan out loud, two sentences, approve. Let it run. Start the inception canvas in the second pane while the build runs. It asks up to four questions; take the recommendation unless the chat objects. Then open it in draw.io. Quality goals: "fast" is not a goal, "a vote shows up for everyone within one second" is.

0:28. Chat bet: "Green on the first run? Yes or no."

While the tests run, the sync story, 40 seconds, voice only: a sync script read from system A and wrote to B. The agent wrapped the read in a try/catch that swallowed the error, as clean error handling. A failed read wrote an empty list to B, and the next run synced the empty B back to A.

Then the next slide: the course, as an ad break while the build keeps running. Come back to this slide when the tests are green.

Point at the new test named after a scenario of the wish: spec, test and live app are one chain.

0:33 at the latest: review prompt. One finding is enough. Plan B at 0:34 without green tests: say what went wrong, git checkout 03-spec, show npm --prefix app test green on the running app. The wish goes into the next round; phase 5 then runs only the Smoketest against the live URL. Do not debug. Tag 04-build at 0:36.
-->

---

<div class="course-photo"><img src="/course-trainers.webp" alt="The three trainers of the course"></div>
<div class="kicker course-kicker">Next</div>

<div class="course">
<h1>Your rules hide decisions too.</h1>
<div class="steps" style="display: block; margin-top: 0">
<div class="hl">
<div class="k">HEPTAMS SPEC DRIVEN DEVELOPMENT</div>
<div class="t">Steer coding agents with specs</div>
<div class="p">For founders who code and the team they lead. <span style="white-space: nowrap">4 half-days</span> live online, HeptaMS Certified Skill.</div>
<div class="course-dates">
<span>Mon 7 – Thu 10 Dec 2026</span><span>08:30 – 12:30 CET</span><span>German</span>
<span>Mon 14 – Thu 17 Dec 2026</span><span>20:00 – 00:00 CET</span><span>English</span>
<span>Tue 19 – Fri 22 Jan 2027</span><span>17:00 – 21:00 CET</span><span>English</span>
<span>Mon 8 – Thu 11 Feb 2027</span><span>22:00 – 02:00 CET</span><span>English</span>
</div>
<div class="price">from € 1,499</div>
</div>
</div>
<div class="course-cta">
<img src="/qr-course.svg" alt="QR code: course booking">
<div>heptams.org</div>
</div>
</div>

<!--
About 0:29, while the build runs: the ad break. No pitch voice. Say the course line verbatim: "Tonight I found one hidden decision in my own rules. In December you learn to find them in yours."

Then the facts once: four half-days, live online, four dates from December to February, from 1,499 euros.

Back to the terminal as soon as the tests are green, 0:33 at the latest. The review prompt, plan B and the tag are in the notes of the Build slide.
-->

---
layout: two-cols
---

<div class="phase"><div class="num">5</div><div><strong>Ship</strong><div class="time">0:36 – 0:42</div></div></div>

<div class="pain-solution">
<div><div class="label">Pain</div>"It runs on my laptop." Nobody else can try it.</div>
<div class="solution"><div class="label">Tonight</div>Migration, deploy, Smoketest. Your wish on your phone, same QR as minute one.</div>
</div>

<div style="margin-top: 1.2rem">
<span class="chip">/run</span>
<span class="chip tool">Cloudflare wrangler</span>
</div>

::right::

<div style="font-size: 0.9rem; margin-top: 0.5rem">

**Out of this phase**

- New migration applied to the live database
- `wrangler deploy` to the same URL
- Smoketest against the live URL: the old flow and your wish
- Same QR as minute one

</div>

<!--
0:36. One prompt does the whole ship. Narrate in one sentence: migration, deploy to the URL you already use, then the Smoketest hits the live URL and checks the old flow and the wish.

Smoketest is the word, keep it. It is the difference between "deployed" and "works".

Chat: type "ready" when your phone is out. Plan B: if the deploy fails twice, `npm exec --prefix app -- wrangler rollback --config app/wrangler.jsonc` from the repo root, say openly that the wish stays on the laptop tonight. The live app keeps running. No tag: the phase ends with the passed Smoketest at 0:42.
-->

---
layout: center
class: dark
---

<div style="text-align: center">
<div class="kicker" style="color: #D9A0A0">Your turn</div>

# Your wish is live.<br>What was the hardest part for you?

<div style="font-size: 1rem; color: #D1D5DB">Ask in PitchPulse or in the chat.</div>
</div>

<!--
0:42 to 0:45. Demo the wish yourself on the live URL, 30 seconds. Then: "What was the hardest part for you tonight? Ask in PitchPulse or in the chat." They still have PitchPulse open from minute one, no new QR. Give them 30 seconds, watch the host view and the chat, read the top answer aloud.

Then 30 seconds of recap: "The fast part was the boring part." Read the real spec minutes off the timer, do not guess them.
-->

---
layout: center
---

<div class="prompt-box" style="max-width: 760px">
<div class="k">WE HAD A LITTLE HOMEWORK FOR YOU</div>
"You are my product manager. Ask me 5 questions about my idea, one at a time. Then write a 1-page spec: 3 Example Mapping rules, each with one example and one open question."
</div>
<div style="margin-top: 1.5rem; display: flex; justify-content: center; align-items: center; gap: 1.5rem">
<div style="font-size: 0.9rem; color: #404040; max-width: 480px">Tonight I found one hidden decision in my own rules. In December you learn to find them in yours.</div>
<img src="/qr-course.svg" alt="QR code: course booking" style="width: 110px; height: 110px">
</div>

<!--
0:45. Open the discussion with the homework: "We had a little homework for you." "Who tried it? What did your product manager ask you?" Take one or two voices, then zoom out to all questions.

This slide stays up during the discussion. Host view on the second screen, answer top to bottom, short answers.

0:59. The course line again, same words: "Tonight I found one hidden decision in my own rules. In December you learn to find them in yours." Then stop sharing at 1:00.
-->
