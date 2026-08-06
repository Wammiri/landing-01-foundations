# CLAUDE.md: Foundations

## Identity

A single page direct response lead capture site for a fictional free email course called Foundations. One job: collect an email. Concept build for Isaac Olorode's landing page portfolio. Part of a five project suite built in parallel.

`SPEC.md` in this folder is the complete specification. It is self contained: palettes, fonts, verbatim copy, code snippets, analytics, and performance rules are all inside it. Build exactly to spec.

## Weight class: LIGHT

This is a single static page. No auth, no database, no money, no user accounts, no untrusted input beyond an email field that is validated client side and sent nowhere. Per the building methodology's right-sizing rule, this project gets the pack files but thin contents.

Explicitly NOT needed here, and this is a recorded decision, not an oversight:
- No control matrix. There are no permissions, no state machines, no persistent data.
- No adversarial pass. Nothing is exposed to untrusted input; the form has no backend.
- No staging environment. There is no production database and no real users.
- No multi-batch decomposition. One build batch, one verification batch. See `BATCH_PLAN.md`.

Do not add process weight beyond this. Do not write a control matrix. Do not add a test framework beyond the Playwright behavioral check specified in `BATCH_PLAN.md`.

## Tech stack

Next.js App Router, TypeScript, Tailwind, framer-motion. That is the entire dependency list.

**A dependency is a decision.** Do not add any package beyond `framer-motion`. No icon libraries, no UI kits, no animation libraries, no form libraries, no analytics packages. If you believe something is needed, stop and flag it rather than installing it. The spec's forbidden lists are binding.

## Honesty rules (non negotiable, they exist to protect Isaac's credibility)

- The footer must carry: `CONCEPT BUILD · DESIGNED AND BUILT BY ISAAC OLORODE · ISAAC.APERIO.FINANCE/LANDING` (linked). This line is not optional and must not be restyled into invisibility.
- Foundations is a fictional brand. Never use a real company name, a real logo, or a real person's name or likeness.
- The counter figure (12,400) and the two testimonials are demo copy for a fictional brand, exactly as written in the spec. Do not invent additional statistics, conversion percentages, ratings, press mentions, or trust badges.
- Do not add social proof beyond what the spec lists.

## House style (enforced, not remembered)

**No em dashes anywhere.** Not in page copy, not in comments, not in metadata, not in commit messages, not in the pack files. Use periods, commas, colons, or parentheses. En dashes only for date ranges.

This is checked mechanically before the batch is closed. From the project root:

```powershell
Get-ChildItem -Recurse -File -Include *.tsx,*.ts,*.css,*.md,*.json | Where-Object { $_.FullName -notmatch 'node_modules|\.next' } | Select-String -Pattern ([char]0x2014) | Select-Object Path, LineNumber, Line
```

Zero results is the pass condition. If it returns anything, fix it before committing.

Also forbidden per spec: emoji, raster images, purple or blue gradients, icon libraries, centered hero, card grids with drop shadows.

## Verification

Follow the verification ladder. This is a UI and behavior project, so it earns rung 3.

1. `npm run build` clean, `npm run lint` clean.
2. Logic check on the counter, the email validation, and the reduced motion branches.
3. Playwright behavioral check via the `webapp-testing` skill against the local dev server. The specific assertions are listed in `BATCH_PLAN.md`.

Record which rung was used in `SESSION_LOG.md`. Build and lint passing does not mean the behavior is correct.

## Human gates (stop and flag, do not invent)

Only Isaac can do these. Write the code that reads them, then flag:

- The GA4 Measurement ID. Leave `G-XXXXXXXXXX` exactly as written in `app/layout.tsx`.
- The Meta Pixel ID. The pixel block stays commented out. Do not activate it.
- Any deploy to Vercel. Vercel CLI is not logged in on this machine.

## Git

This folder is its own git repository. Commit format: `type(scope): ID description`, for example `feat(hero): B1-03 hero section with counter`. One commit per task closed. Push at the end of the batch. Scan the diff for secrets before pushing.

## Onboarding read order

Every session, before touching code: `DECISIONS.md`, then `SESSION_LOG.md`, then `BATCH_PLAN.md`. Consult `DISCOVERY.md` for product intent. `SPEC.md` is the specification and is binding over all of them on matters of design and copy.

## Stop condition

One batch per session. When the batch is done, update `SESSION_LOG.md`, `CHANGELOG.md`, and `BATCH_PLAN.md` status, commit, push, then stop and report. Do not chain into the next batch.
