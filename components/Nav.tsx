"use client";

import { trackCta } from "@/lib/track";

/**
 * Sticky nav: translucent panel with backdrop blur and a hairline bottom
 * border. Client component only because the ghost CTA reports to GA4.
 */
export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-6"
      >
        <a href="#top" className="font-mono text-[0.95rem] font-medium tracking-[0.02em]">
          foundations
          <span aria-hidden className="blink text-amber">
            _
          </span>
          <span className="sr-only">Foundations home</span>
        </a>

        <a
          href="#signup"
          onClick={() => trackCta("nav")}
          className="mono-label rounded-[4px] border border-amber/60 px-4 py-2 text-[0.7rem] text-amber transition-colors hover:border-amber hover:bg-amber/10"
        >
          Get the free course
        </a>
      </nav>
    </header>
  );
}
