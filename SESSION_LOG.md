# SESSION_LOG: Foundations

Appended after every session. Never deleted. Newest entry at the bottom.

---

## 2026-08-06. Session 0: pack generation

**Who:** Claude Code, suite level setup session (run from the `landing-suite` root, covering all five projects).

**What landed:**

- `SPEC.md` renamed from `01-foundations.md` so the kickoff prompt resolves.
- Building pack created: `CLAUDE.md`, `DISCOVERY.md`, `DECISIONS.md`, `BATCH_PLAN.md`, `SESSION_LOG.md`, `CHANGELOG.md`.
- Weight class set to LIGHT and recorded as decision D-01.
- Git repository initialised and pushed to `Wammiri/landing-01-foundations` (public).

**Verification:** none applicable. No product code exists yet. Toolchain verified at suite level: Node 22.22.2, npm 10.9.7, git 2.53.0, Vercel CLI 52.0.0 present, GitHub CLI authenticated as `Wammiri`.

**Commits pushed:** `chore(pack): B0 building pack, spec, and gitignore`, pushed to `Wammiri/landing-01-foundations` (public) on branch `main`. The remote exists and is tracking, so B1 can push without stopping to ask.

**Flags for Isaac:**

1. **Vercel CLI is not logged in.** `vercel whoami` found no credentials. Run `vercel login` in a real terminal before any deploy. A Vercel CLI update is also available (52.0.0 to 56.5.0).
2. **GA4 Measurement ID needed.** Create the property and the data stream for this site, then replace `G-XXXXXXXXXX` in `app/layout.tsx`.

**Parked:** B2 is blocked pending deploy, which is blocked pending Vercel login.

**Next:** Batch B1, using the session prompt at the bottom of `BATCH_PLAN.md`, in a fresh session.

---

## 2026-08-07. Session 1: batch B1, build the page to spec

**Who:** Claude Code, batch B1, tasks B1-01 through B1-12.

**What landed** (one commit per task):

- `chore(setup): B1-01 scaffold next app and pin deps`. Next.js 16.3.0, React 19.2.8, TypeScript 5, Tailwind 4, `framer-motion` pinned to an exact 13.0.0. No other dependency.
- `feat(system): B1-02 design tokens, fonts, layout, analytics`. Palette and motion keyframes, three `next/font` families, noise overlay, GA4 scripts, commented pixel, metadata and Open Graph.
- `feat(nav): B1-03 sticky nav with blinking wordmark`.
- `feat(hero): B1-04 hero with amber glow and entrance`.
- `feat(hero): B1-05 animated reader counter`.
- `feat(ticker): B1-06 vocabulary ticker signature`.
- `feat(curriculum): B1-07 five day sequence`.
- `feat(content): B1-08 authors and testimonials`.
- `feat(form): B1-09 email capture with success state`.
- `feat(footer): B1-10 concept credit footer`.
- `fix(a11y): B1-11 focus rings, labels, 390px pass`.
- `test(e2e): B1-12 behavioral verification`.

**Verification: rung 3**, as planned.

- Rung 1: `npm run build` clean and fully static (all four routes prerendered), `npm run lint` clean.
- Rung 2: logic checked on the counter, the email regex, and every reduced motion branch.
- Rung 3: all ten `BATCH_PLAN.md` assertions pass, run against a production build (`next start`) rather than the dev server, so the result reflects what ships. Console is silent: zero errors, zero warnings, zero hydration messages.

Beyond the ten, the pass also measured contrast (body 7.32:1, headings 15.49:1, CTA 10.56:1, all above AA), walked the full tab order to confirm an amber focus ring on all six interactive elements, and confirmed zero `img` elements and zero raster backgrounds.

**Three real bugs were found and fixed during B1-11, not carried forward:**

1. **Hydration mismatch** in the hero and the counter. `useReducedMotion` returns `null` on the server and a boolean on the client, so the entrance states disagreed across hydration and React logged an error on every load. Both components now render the settled state on the server and through the first client paint, arming the animation only after mount via `useSyncExternalStore`. Side benefit: the counter's figure is now in the HTML even without JavaScript.
2. **Focus ring effectively invisible** on the two amber filled buttons. They set `color` to the page background, and Tailwind's `transition-all` was animating `outline-color` from that dark `currentColor`, so the ring rendered near black on amber. The transition is now scoped to `transform` and `filter`.
3. **Scroll revealed copy could be trapped at `opacity: 0`** if JavaScript never ran. A `noscript` branch forces it visible. The reveal is decoration; the copy is not.

**Ambiguities resolved, each a one line switch:**

1. **`next dev` appends a generated block to `CLAUDE.md`.** That file is the project's operating rules, it is outside B1's bounded file list, and the generated text contains an em dash, which the house style forbids. Set `agentRules: false` in `next.config.ts` and reverted the file. Confidence: high. Cost if wrong: near zero, one line.
2. **Tailwind v4 has no `tailwind.config.ts`.** `BATCH_PLAN.md` lists that file, but v4 uses an `@theme` block in `app/globals.css` instead, so the file is intentionally absent. Recorded in `DECISIONS.md` D-02. Confidence: high. Cost if wrong: near zero.
3. **`tests/` is excluded from the app typecheck.** `@playwright/test` is deliberately not a project dependency (D-05), so `next build` could not resolve its types. Excluding the folder keeps the runner external and the gate honest. Confidence: high. Cost if wrong: near zero.
4. **Scaffolding required a temporary subfolder.** `create-next-app` refuses to run in a directory containing the pack files. Scaffolded into `scaffold-tmp`, moved the output up, and deleted the folder. No trace remains.

**Flags for Isaac:**

1. **GA4 Measurement ID still needed.** `app/layout.tsx` carries `G-XXXXXXXXXX` in three places (the script `src` and two `gtag` calls). Create the property and data stream, then replace all three. Human gate, untouched as instructed.
2. **Meta Pixel block is present but commented**, exactly as specced. Activating it is your call.
3. **Not deployed.** Vercel CLI is installed but not logged in. Run `vercel login`, then `vercel` and `vercel --prod`. Human gate.
4. **Favicon design is a judgement call.** `app/icon.svg` is a vector `f_` mark in amber on the page background, per D-10. It is a 32px square and trivially replaceable if you want something else.
5. **Python Playwright was installed machine wide** (`py -m pip install playwright`) to run the behavioral pass. It is not a project dependency and does not appear in `package.json`, so D-03 and D-05 hold.

**Parked:** B2, still blocked pending deploy, which is blocked pending Vercel login. Its job is to hand the production URL and the real PageSpeed mobile score to project `05-isaac-site`. Do not guess that score.

**Next:** B2, after Isaac deploys.

---

## 2026-08-07. Session 2: batch B1a, real GA4 Measurement ID

**Who:** Claude Code. Unplanned batch, entered through the plan rather than bolted onto B2, per the methodology's rule on new requirements.

**Why it exists:** Isaac deployed to `https://landing-01-foundations.vercel.app/` and supplied the real Measurement ID `G-0QXCCQYR17`. The deployed build still carried the `G-XXXXXXXXXX` placeholder, confirmed by fetching the live page: three placeholder occurrences, zero real ones. GA4 was therefore collecting nothing. B2 cannot verify events against a property that is not wired, so this had to land first.

**What landed:**

- `feat(analytics): B1a-01 wire the real GA4 measurement id`. Placeholder replaced in all three places in `app/layout.tsx`. Hardcoded rather than read from an env var, recorded as D-11.
- `fix(analytics): B1a-02 stop cta_click starving course_signup`. See the bug below.
- `test(e2e): B1a-03 assert course_signup is transmitted, not queued`.

**Verification: rung 4**, live end to end against the real GA4 property. This is a rung above B1, because the events could finally be checked against a real Measurement ID by observing the `/g/collect` requests leaving the browser.

- Build clean, lint clean, all ten B1 assertions still passing.
- Confirmed `page_view`, `cta_click`, and `course_signup` all transmit to `G-0QXCCQYR17`, with no other Measurement ID seen.
- Confirmed the invalid submit path still reports `cta_click`.

**One real bug found, and it is the interesting one:**

`course_signup` reached `dataLayer` but **never left the browser**. GA4 batches events arriving in the same tick, and the `cta_click` fired alongside it on submit was starving it: the collect request for the conversion was simply never sent. The B1 assertion passed because it only inspected `dataLayer`, which is the queue, not the wire.

This is exactly the failure the methodology's verification ladder is meant to catch: build and lint passing, and even a behavioral assertion passing, did not mean the behavior was correct. It took rung 4 against the real property to see it.

Fixed by firing `cta_click` only on an invalid submit, so a converting submit sends `course_signup` alone. Recorded as D-15. A new assertion (7b) now checks the collect request itself rather than the queue, so this cannot regress silently.

**Flags for Isaac:**

1. **Redeploy is needed.** The fix is pushed but the live site still serves the old build with the placeholder. Run `vercel --prod` again. Until then GA4 still collects nothing.
2. **Then confirm in GA4 DebugView** that `page_view`, `cta_click`, and `course_signup` all appear from the live URL. That is B2-01 and it needs your logged in browser.
3. **Meta Pixel** remains commented, unchanged.

**Parked:** B2, now blocked only on the redeploy above plus a real PageSpeed run.

**Next:** B2, once the redeploy is live.

---

## 2026-08-07. Session 3: B2, post deploy handoff (partial)

**Who:** Isaac, redeployed and confirmed directly. Claude Code recorded the outcome.

**What happened:** Isaac redeployed the B1a fix and confirmed in GA4 DebugView that `page_view`, `cta_click`, and `course_signup` all fire correctly on the live URL, `https://landing-01-foundations.vercel.app/`. That closes B2-01 and the analytics half of this project's scope: the batching bug from session 2 is confirmed fixed against the real, redeployed build, not just the local one.

**Explicitly skipped, not forgotten:** Isaac instructed skipping PageSpeed Insights. No real Lighthouse mobile score exists for this build. Per the methodology, a skipped required input gets a decision and a trigger, not silent completion, so B2-02 is marked skipped in `BATCH_PLAN.md` rather than done, and `[TODO_SCORE_1]` in project `05-isaac-site` cannot be filled from this session.

**Verification:** rung 4 for the analytics half, live against the real GA4 property, confirmed by Isaac directly in DebugView. No verification run for performance.

**Flags for Isaac:**

1. **`[TODO_SCORE_1]` in project `05-isaac-site` is still open.** The URL is ready to hand over; the score is not. If project 05 is worked on before a real PageSpeed run happens, that field needs either the run or an explicit decision to launch without it.
2. Nothing else outstanding on Foundations itself. The build, the deploy, and the analytics are all confirmed working.

**Parked:** the PageSpeed run, on Isaac's instruction, no trigger date set.

**Next:** nothing scheduled on this project. If a score is wanted later, it is a small follow up: run PageSpeed Insights against the live URL and record the number, no code change implied unless the score reveals a real problem.

---
