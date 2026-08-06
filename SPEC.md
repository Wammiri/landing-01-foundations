# SPEC: Foundations. Free 5 day crypto masterclass (lead capture)

## 0. What this is

A single page, direct response lead capture site for a fictional free email course called Foundations. The audience is careful beginners who want to understand crypto before putting money in. The page has exactly one job: collect an email. This is a concept build for Isaac Olorode's portfolio; it must look like a serious market education publication, never like a hype coin site and never like a generic AI template.

Do not browse the web. Everything needed is in this file. Network use is limited to npm install and the automatic font fetch next/font performs at build time.

## 1. Setup

```
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
npm i framer-motion
```

App Router, TypeScript, Tailwind. No other dependencies. No images in /public except favicon.

## 2. Design system

Identity: a market terminal meets an editorial publication. Deep slate, terminal amber, mono data accents. Calm authority, zero hype.

Palette (use these exact values as Tailwind arbitrary values or CSS vars):
- bg: #0B0E14 (deep blue slate, never pure black)
- panel: #12161F
- amber: #FFB020 (the single accent: CTA, eyebrow, key numbers, one headline word)
- text: #E8E6E1 (warm off white)
- muted: #97A0AF
- line: #232936 (hairline borders)

Fonts, loaded via next/font/google only:
- Display: Space Grotesk, weights 500 and 700
- Body: Inter, weights 400 and 500
- Data and labels: IBM Plex Mono, weights 400 and 500 (eyebrows, ticker, counter, nav links, all uppercase with letter spacing 0.08em)

Layout rules: max content width 1080px, generous vertical rhythm (sections separated by 96 to 128px on desktop, 64px mobile), hero left aligned, hairline dividers in `line` color between sections. Border radius 6px max; this page is crisp, not bubbly.

Forbidden: purple or blue gradients, emoji, icon libraries, card grids with drop shadows, centered hero, stock imagery, any raster image, em dashes in copy.

## 3. Signature element: the vocabulary ticker

One signature, everything else stays quiet. A full width horizontal ticker band under the hero, styled like a market tape: IBM Plex Mono, uppercase amber text on `panel` background with hairline top and bottom borders, scrolling the curriculum vocabulary instead of prices (this is honest: no fake price data).

Ticker content, separated by " · ": COLD STORAGE · PRIVATE KEYS · MARKET CAP · STABLECOINS · GAS FEES · CUSTODY · LIQUIDITY · SELF CUSTODY · VOLATILITY · POSITION SIZING · DYOR · RISK BUDGET

Implementation: duplicate the row twice inside an overflow hidden flex container, animate translateX from 0 to -50% with a CSS keyframe, 40s linear infinite, pause on hover. Respect prefers-reduced-motion (no animation, static row).

Secondary micro signature: the wordmark is `foundations_` in IBM Plex Mono with the underscore blinking via a 1.1s steps CSS animation. Also disabled under reduced motion.

## 4. Grain and glow

Behind the hero only: a radial amber glow, `background: radial-gradient(55% 45% at 28% 22%, rgba(255,176,32,0.10), transparent 70%)` layered over bg.

Global noise overlay component, rendered once in the layout:

```tsx
// components/Noise.tsx
export default function Noise() {
  return (
    <svg aria-hidden className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  );
}
```

## 5. Page structure and copy (use this copy verbatim)

1) Nav, sticky, translucent bg with backdrop blur, hairline bottom border. Left: wordmark `foundations_`. Right: one ghost button "Get the free course" (amber text, amber hairline border, transparent bg) that smooth scrolls to the form.

2) Hero, left aligned.
- Eyebrow (mono, amber, uppercase): FREE 5 DAY EMAIL COURSE
- H1 (Space Grotesk 700, ~clamp(2.4rem, 6vw, 4.2rem)): Understand crypto before you risk a dollar.
  The word "before" is amber; everything else is text color.
- Sub (Inter, muted, max 52ch): Five short lessons on how digital assets actually work. No hype, no jargon, no coin shilling. One email a day, each under ten minutes.
- Primary CTA (amber bg, #0B0E14 text, 600 weight): Start the free course
- Trust line under the CTA (mono, small, muted): JOINED BY <Counter /> CAREFUL INVESTORS
  Counter animates 0 to 12,400 over 1.6s on mount using framer-motion useMotionValue + animate + useTransform with toLocaleString rounding. Static "12,400" under reduced motion. (Demo figure for a fictional brand; the portfolio catalog discloses this.)

3) Vocabulary ticker (the signature, section 3).

4) The five days. Eyebrow: THE CURRICULUM. H2: Five days, five foundations.
A single column vertical sequence, each row: a mono amber index (01 to 05), a Space Grotesk title, one Inter line. Numbering is correct here because the content is a real sequence. Hairline divider between rows. Each row fades in and rises 20px on scroll into view (framer-motion whileInView, once, stagger 0.08).
- 01. What a blockchain actually is. And what it is not. The mental model that makes everything else make sense.
- 02. Coins, tokens, and stablecoins. The differences that decide what you are actually holding.
- 03. Wallets, keys, and custody. How people really lose money, and how not to be one of them.
- 04. Reading a market without falling for it. Cycles, narratives, and why your feed is not research.
- 05. Should you invest at all? A simple framework for position sizing, risk budget, and walking away.

5) Who writes this. One short block, no photo.
H3: Written by people who manage real money.
Body: Foundations is written by a small team of finance professionals who got tired of watching beginners learn the expensive way. Every lesson is the plain version of what we wish someone had told us first.

6) Two testimonials, text only, large Space Grotesk quotes with mono attribution. (Fictional copy for a fictional brand.)
- "The custody lesson alone stopped me from making a mistake I was about to make that week." TUNDE A.
- "I finally understand what I own and why. That is worth more than any tip." SARAH K.

7) Final capture. Eyebrow: START TODAY. H2: Learn the fundamentals first.
One email input (labeled, mono placeholder you@example.com) plus button "Send me Day 1 free". Micro line: Free forever. Unsubscribe anytime.
On submit: validate email format client side, fire the GA event, swap the form for a success state: "Done. Day 1 is on its way." Include a code comment where a real ESP (Brevo, ConvertKit) would be wired in production.

8) Footer: wordmark, then one line in muted mono: CONCEPT BUILD · DESIGNED AND BUILT BY ISAAC OLORODE · ISAAC.APERIO.FINANCE/LANDING (link). Copyright 2026.

## 6. Motion spec

framer-motion only. Hero elements: single orchestrated entrance on load (eyebrow, H1, sub, CTA stagger 0.06, fade + 16px rise, 0.5s ease out). Scroll reveals on the five day rows and testimonials, whileInView, once: true. CTA hover: translateY(-1px) and slight brightness. Nothing else moves. Wrap all of it with useReducedMotion: when true, render everything static.

## 7. Analytics

In app/layout.tsx:

```tsx
import Script from "next/script";
// GA4. Replace G-XXXXXXXXXX with the real Measurement ID.
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
<Script id="ga" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
`}</Script>
{/* Meta Pixel would be initialized here in production:
<Script id="meta-pixel">... fbq('init','PIXEL_ID'); fbq('track','PageView'); ...</Script>
Left commented intentionally on this concept build. */}
```

```ts
// lib/track.ts
export const track = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", name, params);
};
```

Events: `cta_click` with { location: "nav" | "hero" | "final" } on every CTA press; `course_signup` on valid form submit.

## 8. Performance and quality floor

- Zero raster images. All visuals are CSS, SVG, and type.
- Target Lighthouse mobile 95+. No layout shift: reserve space for the counter (fixed width, tabular numbers via font-variant-numeric).
- All text server rendered; only the counter, ticker pause, and form are client components.
- Visible focus-visible rings (amber) on all interactive elements. Form input has a real label. Color contrast: body text is `text` on `bg`, never amber on panel for body copy.
- Metadata: title "Foundations. A free 5 day crypto masterclass", description one sentence from the sub copy, basic Open Graph tags.
- Copy rule: no em dashes anywhere on the page.

## 9. Acceptance checklist (verify before declaring done)

- [ ] `npm run build` passes clean
- [ ] Phone width 390px: no horizontal overflow, form usable
- [ ] Ticker scrolls, pauses on hover, static under reduced motion
- [ ] Counter animates once, no layout shift
- [ ] GA events fire (check console dataLayer in dev)
- [ ] Footer concept credit present and linked
- [ ] No raster images, no emoji, no em dashes, no purple gradients
