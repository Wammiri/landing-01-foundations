# BATCH_PLAN: Foundations

Two batches. B1 builds and verifies the page. B2 is the post deploy handoff and only runs after Isaac has deployed.

Status values: `not started`, `in progress`, `blocked: pending X`, `done`.

---

## B1. Build the page to spec

**Status:** not started

**Depends on:** nothing

**Goal:** A complete, verified Foundations page matching `SPEC.md` exactly, committed and pushed.

**Files this batch may touch** (this is a greenfield scaffold, so the list is the shape of the project rather than a pre existing inventory):

```
package.json, package-lock.json, tsconfig.json, next.config.ts,
tailwind.config.ts, postcss.config.mjs, eslint.config.mjs, .gitignore
app/layout.tsx
app/page.tsx
app/globals.css
app/icon.svg              (or public/favicon.ico)
components/Noise.tsx
components/Nav.tsx
components/Hero.tsx
components/Counter.tsx
components/Ticker.tsx
components/Curriculum.tsx
components/Authors.tsx
components/Testimonials.tsx
components/SignupForm.tsx
components/Footer.tsx
lib/track.ts
tests/foundations.spec.ts (Playwright, added in the verification step)
SESSION_LOG.md, CHANGELOG.md, BATCH_PLAN.md
```

Do not touch `SPEC.md`, `DISCOVERY.md`, `DECISIONS.md`, or `CLAUDE.md` except to record a newly resolved ambiguity in `DECISIONS.md`.

**Tasks, one commit each:**

| ID | Task | Commit message |
|---|---|---|
| B1-01 | Scaffold Next.js, install framer-motion, pin the version in `DECISIONS.md` D-02, confirm `npm run build` and `npm run lint` pass on the untouched tree | `chore(setup): B1-01 scaffold next app and pin deps` |
| B1-02 | Design tokens in `globals.css` and Tailwind config, three `next/font` families, the `Noise` component, root layout with GA4 scripts and commented pixel, metadata and Open Graph | `feat(system): B1-02 design tokens, fonts, layout, analytics` |
| B1-03 | Nav with `foundations_` wordmark and blinking underscore, ghost CTA smooth scrolling to the form | `feat(nav): B1-03 sticky nav with blinking wordmark` |
| B1-04 | Hero: eyebrow, H1 with amber "before", sub, primary CTA, radial amber glow, orchestrated entrance | `feat(hero): B1-04 hero with amber glow and entrance` |
| B1-05 | Animated counter, fixed width, tabular numbers, no layout shift, static under reduced motion | `feat(hero): B1-05 animated reader counter` |
| B1-06 | Vocabulary ticker: duplicated row, 40s linear translateX, pause on hover, static under reduced motion | `feat(ticker): B1-06 vocabulary ticker signature` |
| B1-07 | Curriculum: five rows with mono indices, hairline dividers, whileInView stagger | `feat(curriculum): B1-07 five day sequence` |
| B1-08 | Authors block and two testimonials with scroll reveals | `feat(content): B1-08 authors and testimonials` |
| B1-09 | Final capture form: labeled input, client validation, GA event, success state, ESP comment | `feat(form): B1-09 email capture with success state` |
| B1-10 | Footer with the concept credit line, linked to isaac.aperio.finance/landing | `feat(footer): B1-10 concept credit footer` |
| B1-11 | Accessibility and polish pass: focus-visible amber rings, real labels, contrast check, 390px pass, em dash scan | `fix(a11y): B1-11 focus rings, labels, 390px pass` |
| B1-12 | Playwright behavioral verification, then update `SESSION_LOG.md`, `CHANGELOG.md`, and this file | `test(e2e): B1-12 behavioral verification` |

**Verification: rung 3.**

Rung 1, build and lint clean. Rung 2, targeted logic check on the counter, the email regex, and every `useReducedMotion` branch. Rung 3, Playwright via the `webapp-testing` skill against `npm run dev`, asserting:

1. Page loads, H1 text matches the spec verbatim, `before` is the amber span.
2. Ticker element exists and its transform advances between two samples.
3. Ticker animation is paused after hovering the band.
4. Counter reaches `12,400` and the element's bounding box width is identical before and after the animation (no layout shift).
5. Submitting an invalid email does not reach the success state.
6. Submitting a valid email swaps to the success copy `Done. Day 1 is on its way.`
7. `window.dataLayer` contains a `cta_click` entry after a CTA press and a `course_signup` entry after a valid submit.
8. At 390px viewport, `document.documentElement.scrollWidth` is not greater than `clientWidth` (no horizontal overflow).
9. With `prefers-reduced-motion: reduce` emulated, the ticker transform does not change between samples and the counter renders `12,400` statically.
10. The footer credit line is present and its link points to isaac.aperio.finance/landing.

Record the rung and the results in `SESSION_LOG.md`.

**Before pushing:** run the em dash scan from `CLAUDE.md`, and scan the diff for secrets.

**Human gates hit in this batch:** GA4 Measurement ID stays `G-XXXXXXXXXX` (flag it). Meta Pixel stays commented (flag it). Do not deploy.

---

## B2. Post deploy handoff

**Status:** blocked: pending Isaac deploying to Vercel and running PageSpeed Insights

**Depends on:** B1 done, then Isaac deploys.

**Goal:** Hand the production URL and the real Lighthouse mobile score to project `05-isaac-site`, which needs them for `[TODO_URL_1]` and `[TODO_SCORE_1]`.

**Tasks:**

| ID | Task |
|---|---|
| B2-01 | Confirm GA4 DebugView shows `page_view`, `cta_click`, and `course_signup` on the live URL |
| B2-02 | Record the production URL and the real PageSpeed mobile score in `SESSION_LOG.md`. Do not guess the score. |
| B2-03 | Report both to Isaac for entry into project 05 |

**Verification: rung 4**, live end to end against the deployed page and the real GA4 property.

---

## Session prompt for B1

Copy this verbatim into a fresh Claude Code session in this folder.

```
Read the onboarding files first: DECISIONS.md, SESSION_LOG.md, BATCH_PLAN.md.
Then read SPEC.md in full. CLAUDE.md is auto loaded.

Context not yet in the files: nothing. This is the first session on this project.
The folder currently contains only the pack files and SPEC.md. Node 22.22.2,
npm 10.9.7, git 2.53 are verified present. Vercel CLI is installed but NOT
logged in, so do not attempt to deploy.

Batch: B1
Tasks: B1-01 through B1-12
Files to touch: only those listed under B1 in BATCH_PLAN.md.

Build the project exactly to SPEC.md. Do not browse the web. Do not add
dependencies, sections, images, or copy beyond the spec. Where the spec gives
code, use it. Network use is limited to npm install and the next/font fetch at
build time.

Follow the protocol: bounded file list, verification ladder rung 3 (the ten
Playwright assertions listed in BATCH_PLAN.md, via the webapp-testing skill),
build and lint before commit, one commit per task as type(scope): ID description,
run the em dash scan from CLAUDE.md before committing, push at the end, update
SESSION_LOG.md, CHANGELOG.md, and BATCH_PLAN.md status.

Leave the GA4 Measurement ID as G-XXXXXXXXXX and flag it. Leave the Meta Pixel
block commented. Do not deploy: that is a human gate.
For any ambiguity, pick a sensible default, isolate it as a one line switch,
and flag it in SESSION_LOG.md with confidence and cost if wrong.

Work through the acceptance checklist at the end of SPEC.md before telling me
you are done.

One batch only. Stop and report when done or paused.
```
