# DECISIONS: Foundations

Every significant decision, including the ones where nothing gets built. Status is one of: settled, inferred (with confidence), open, deferred.

---

## D-01. Weight class is LIGHT

**Chosen:** Pack files present, contents thin. No control matrix, no adversarial pass, no staging, no multi-batch decomposition beyond build then verify.

**Why:** None of the methodology's heavy signals apply. One anonymous role, no multi-tenancy, no regulated data, no money, no irreversible actions, no AI with tool use. It is a static page with a client side form that posts nowhere.

**Traded off:** Less process trail than a heavy project. Acceptable, because the trail scales to the risk and the risk here is close to zero.

**Status:** settled

---

## D-02. Next.js App Router, TypeScript, Tailwind, framer-motion. Nothing else.

**Chosen:** The stack the spec names, with framer-motion as the single added dependency.

**Why:** framer-motion earns its place: the spec requires orchestrated hero entrance, `whileInView` scroll reveals with stagger, and a `useMotionValue` counter, all gated behind `useReducedMotion`. Writing that with the Web Animations API or CSS alone would be more code and would lose the reduced motion hook that ties it together. It is actively maintained and is already the suite standard across all five projects.

**Traded off:** Roughly 30 to 50 KB gzipped of client JS on a page targeting Lighthouse 95+. Mitigated by keeping client components to three: counter, ticker hover, form.

**Pinned versions** (recorded at install time, B1-01): `framer-motion` 13.0.0 (exact, no caret), Next.js 16.3.0, React 19.2.8, TypeScript 5, Tailwind 4.

**Note on Tailwind:** the scaffold produced Tailwind v4, which has no `tailwind.config.ts`. Design tokens therefore live in an `@theme` block in `app/globals.css` rather than a JS config file. `BATCH_PLAN.md` lists `tailwind.config.ts` in B1's file inventory; that file is intentionally absent because v4 does not use it.

**Status:** settled

---

## D-03. No packages beyond framer-motion

**Chosen:** No icon library, no UI kit, no form library, no validation library, no analytics package, no animation helper.

**Why:** The default answer to a new dependency is no until justified. Email validation is one regex. The GA4 helper is four lines. Every visual element in the spec is CSS, SVG, or type by design.

**Trigger that would change this:** none within tonight's scope.

**Status:** settled

---

## D-04. Static export, no backend, form posts nowhere

**Chosen:** The form validates client side, fires the GA event, and swaps to a success state. A code comment marks where a real ESP would be wired.

**Why:** The spec says so, and it is the honest choice. A fictional brand collecting real email addresses would create a real data protection obligation for a portfolio piece.

**Traded off:** The form is a demonstration, not a working funnel. The catalog page discloses that these are concept builds, so this is not misleading.

**Status:** settled

---

## D-05. No test framework beyond the Playwright behavioral pass

**Chosen:** No Jest, no Vitest, no unit test suite. Verification is build, lint, a targeted logic check, and one Playwright behavioral script.

**Why:** There is almost no pure logic to unit test. The counter, the email regex, and the reduced motion branches are better proven in a real browser, which is where the Playwright pass proves them anyway. A unit test suite here would be process for its own sake.

**Trigger that would change this:** if real business logic ever lands in this project, which it will not.

**Status:** settled

---

## D-06. No privacy policy, cookie banner, or consent management

**Chosen:** Build none of it.

**Why:** The page stores nothing and transmits nothing except GA4 pageviews and events. Recording the decision matters more than building the feature.

**Trigger that would change this:** if the form is ever wired to a real ESP and starts collecting real addresses, or if the page is targeted at EU traffic as a real campaign. Then a consent banner and a privacy policy become mandatory before launch, not optional.

**Status:** deferred, with trigger recorded

---

## D-07. Both nav and hero CTAs fire `cta_click` with distinct location params

**Chosen:** Every CTA press fires `cta_click`. `location` is `nav`, `hero`, or `final`.

**Why:** The spec defines the location enum with exactly those three values, which only makes sense if all three fire. Distinguishing which CTA converts is the entire point of the event.

**Confidence:** high. **Cost if wrong:** near zero, one line change.

**Status:** inferred, high confidence

---

## D-08. Ticker hover pause degrades silently on touch

**Chosen:** Implement pause on hover as specced. Do nothing extra for touch devices, where there is no hover state.

**Why:** The spec asks for pause on hover. On touch there is no hover, so the ticker simply keeps scrolling, which is correct behavior for a marquee. Adding a tap to pause interaction would be inventing a feature the spec did not ask for.

**Confidence:** high. **Cost if wrong:** near zero.

**Status:** inferred, high confidence

---

## D-09. Success state does not persist across reload

**Chosen:** The form resets to its initial state on page reload.

**Why:** There is no backend, so persisting a "you already signed up" state in localStorage would be theatre: it would claim a signup happened that never reached any system.

**Confidence:** high. **Cost if wrong:** near zero.

**Status:** inferred, high confidence

---

## D-10. Favicon is a vector `f_` mark, not a raster file

**Chosen:** An SVG favicon (or an ICO generated from vector shapes) using amber `#FFB020` on `#0B0E14`, echoing the `foundations_` wordmark.

**Why:** The spec permits a favicon in `/public` but forbids raster images everywhere else. A vector favicon keeps the zero raster claim clean and honest.

**Confidence:** medium on the exact design, high on the approach. **Cost if wrong:** near zero, it is a 32px square.

**Status:** inferred, medium confidence, flagged for Isaac

---

## D-11. GA4 Measurement ID stays as the placeholder

**Chosen:** `G-XXXXXXXXXX` is left exactly as written. The Meta Pixel block stays commented.

**Why:** Human gate. Only Isaac can create the GA4 property and its data streams. Code that reads a value is written by Claude; the value is set by Isaac.

**Status:** settled, blocked pending Isaac

---

## D-12. Em dash prevention is mechanical, not remembered

**Chosen:** A PowerShell scan for U+2014 across all source and markdown, run before every commit. Zero results is the pass condition.

**Why:** House style says enforce deterministically, not by asking the model to remember. The command is in `CLAUDE.md`.

**Status:** settled

---

## D-13. Git: own repository, own remote

**Chosen:** This folder is a standalone git repo with its own GitHub remote, not part of a monorepo.

**Why:** Five Claude Code instances run in parallel across five folders. A shared repo would produce constant push conflicts on one branch. Separate repos also map cleanly to separate Vercel projects.

**Status:** settled

---

## D-14. Deployment is a human gate

**Chosen:** Claude builds and verifies locally. Isaac runs `vercel` and `vercel --prod`.

**Why:** Vercel CLI on this machine is not logged in (`vercel whoami` returns no credentials). Deployment is also an outward facing action and the methodology gates anything verified against a live external service.

**Status:** settled, blocked pending Isaac
