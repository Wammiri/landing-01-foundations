# Changelog

All notable changes to Foundations. Format based on Keep a Changelog. This project does not use semantic versioning; entries are grouped by batch.

## [Unreleased]

### Added (B1, 2026-08-07)

- Next.js 16.3.0 App Router scaffold with TypeScript and Tailwind v4. `framer-motion` pinned to an exact 13.0.0 and no other dependency.
- Design system: the spec palette, three `next/font` families (Space Grotesk, Inter, IBM Plex Mono), and the global noise overlay.
- Sticky nav with the `foundations_` wordmark and its blinking underscore, plus a ghost CTA that smooth scrolls to the form.
- Hero: eyebrow, H1 with the amber "before", sub, primary CTA, radial amber glow, and one orchestrated entrance.
- Reader counter animating 0 to 12,400 with reserved width and tabular numerals, so it cannot shift layout.
- The vocabulary ticker signature: a market tape carrying curriculum terms instead of prices, pausing on hover.
- Curriculum sequence of five days, the authors block, and two testimonials, all with scroll reveals.
- Email capture form with client side validation, a GA4 `course_signup` event, and a success state.
- Footer carrying the concept credit line, linked to isaac.aperio.finance/landing.
- GA4 scripts with the placeholder Measurement ID; the Meta Pixel block is present but commented.
- Playwright behavioral spec covering the ten assertions in `BATCH_PLAN.md`.

### Fixed (B1)

- Hydration mismatch in the hero and counter. `useReducedMotion` differs between server and client, so both now render the settled state through the first client paint and arm their animation after mount.
- Focus ring was near invisible on the two amber filled buttons, because `transition-all` animated `outline-color` from a dark `currentColor`. The transition is now scoped to transform and filter.
- Scroll revealed copy could stay stuck at opacity 0 if JavaScript never ran. A `noscript` branch now forces it visible.

### Added (B1a, 2026-08-07)

- Real GA4 Measurement ID `G-0QXCCQYR17` wired into `app/layout.tsx`, replacing the `G-XXXXXXXXXX` placeholder in all three places. Hardcoded, not read from an env var: a Measurement ID ships in client HTML regardless, so it is not a secret.
- A Playwright assertion that checks `course_signup` actually leaves the browser as a `/g/collect` request, not just that it reached `dataLayer`.

### Fixed (B1a)

- `course_signup` was reaching `dataLayer` but never transmitting to GA4. Firing `cta_click` in the same tick as `course_signup` on a valid submit meant GA4's batching starved the conversion event. `cta_click` now only fires on an invalid submit; a valid one sends `course_signup` alone. Found by live verification against the real GA4 property, which the placeholder ID had made impossible until now.

### Notes

- Zero raster images, zero emoji, zero em dashes. Contrast measured at 7.32:1 or better throughout.
- The site is deployed at `https://landing-01-foundations.vercel.app/` but that build still serves the placeholder ID pending a redeploy of this fix.
