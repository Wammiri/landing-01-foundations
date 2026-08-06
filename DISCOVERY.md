# DISCOVERY: Foundations

**Mode:** New build from a PRD (`SPEC.md`). The spec is unusually complete, so discovery here is a thin pass that records intent, weight class, and the ambiguities the spec leaves open. It is not a full grill; the spec already answers what a grill would have asked.

**Date:** 2026-08-06

---

## 1. What is being built and why

A single page lead capture site for a fictional free five day email course about crypto. The real purpose is not the course. It is a portfolio artifact: a recruiter (Isabel) is screening Isaac for a direct response landing page builder role, and this page proves the lead capture pattern in the client's category (investing education) with the client's tooling (AI assisted, Next.js, GA4).

The page has exactly one conversion goal: an email address.

## 2. The real audience, two layers

There is a fictional audience and a real one, and the design must serve both.

- **Fictional:** careful beginners who want to understand crypto before putting money in. They are suspicious of hype. They have been burned or have watched someone get burned. The tone that converts them is calm authority, not urgency.
- **Real:** the recruiter and the end client, who will look at this for maybe ninety seconds on a phone. They are checking whether Isaac can build a page that looks professionally art directed rather than templated, and whether the DR fundamentals (single goal, clear CTA, tracked events) are present.

Where the two conflict, serve the fictional audience. A page that genuinely converts is the thing the real audience is looking for.

## 3. Why this pattern, in this suite

Four concept pages, four different DR patterns, four different visual identities, so nothing reads as templated. Foundations is the **lead capture** entry and the flagship. Its distinguishing identity is the market terminal aesthetic: deep slate, terminal amber, mono data type.

Its counterparts: Cambr (free trial, light and restrained), Market Clarity Live (webinar registration, hot red poster), Tally (waitlist, graph paper minimal).

## 4. Success criteria

- A recruiter on a phone reads it as a serious market education publication, not a hype coin site and not an AI template.
- The single email goal is unmistakable within one screen.
- Lighthouse mobile 95+, achieved honestly with zero raster images.
- GA4 fires `cta_click` and `course_signup` and they are visible in DebugView.
- Nothing on the page is dishonest about what it is.

## 5. Scale assumptions

None that matter. Static page, CDN served, no backend, no database, no per user state. The form posts nowhere; it swaps to a success state client side. Traffic is portfolio traffic, meaning tens of visits.

This is why the weight class is LIGHT.

## 6. Failure modes worth designing against

| Failure | Why it matters | Mitigation |
|---|---|---|
| Reads as a generic AI template | Kills the entire portfolio thesis | The spec's exact palette, the vocabulary ticker signature, left aligned hero, no card grids |
| Reads as a crypto hype site | Destroys credibility with a finance recruiter | No price data, no gains language, vocabulary ticker instead of a price tape |
| Layout shift from the counter | Visible jank, and it costs Lighthouse points | Fixed width container, tabular numbers, reserved space |
| Animation above the fold tanking mobile score | The README names this as the usual suspect | Hero entrance is a single orchestrated stagger, nothing continuous above the fold except the ticker, which is CSS transform only |
| Motion sickness or accessibility failure | Real user harm and a visible quality tell | Every animation gated behind `useReducedMotion`, ticker static under reduced motion |
| The concept credit being missed | Honesty rule violation, misrepresents fictional work as client work | Footer credit is a binding requirement in `CLAUDE.md` |

## 7. Data model

There is none. The only data is a single email string held in client state for the duration of a form submission, then discarded. Nothing is persisted, transmitted, or stored.

A code comment marks where a real ESP (Brevo, ConvertKit) would be wired in production. That comment is the deliverable, not an integration.

**Implication:** no privacy policy, no consent management, no GDPR surface beyond GA4 itself. Recorded as a decision, see `DECISIONS.md` D-06.

## 8. Ambiguities the spec leaves open

Resolved with sensible defaults, isolated so each is a one line switch, flagged for Isaac. See `DECISIONS.md` for the full record with confidence and cost.

- Ticker pause on hover behavior on touch devices (no hover, so no pause). Default: leave it, it degrades harmlessly.
- Whether the nav ghost button and the hero CTA both fire `cta_click`. Default: yes, with distinct `location` params, which is what the spec's location enum implies.
- Success state persistence on remount. Default: not persisted, the form resets on reload. No backend, so persistence would be theatre.
- Favicon design. Default: a simple amber `f_` mark generated as an SVG or ICO, no raster source.

## 9. Where this is heading next

Nowhere. This is a deliverable with a fixed scope and a deadline of tonight. It is not a product with a roadmap.

The one downstream dependency is external: once deployed, its production URL and real Lighthouse mobile score must be handed to project `05-isaac-site` to fill `[TODO_URL_1]` and `[TODO_SCORE_1]` in the catalog. That is tracked in this project's `BATCH_PLAN.md` as an outbound handoff.

## 10. Weight class decision

**LIGHT.** No signal from the methodology's heavy list is present: one role (anonymous visitor), no multi-tenancy, no regulated data, no money, no irreversible external actions, no AI with tool use.

The pack files exist because they are cheap and they carry the trail. Their contents stay thin. No control matrix, no adversarial pass, no staging environment.
