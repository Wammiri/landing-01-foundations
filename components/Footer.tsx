/**
 * The concept credit line is a binding honesty requirement, per CLAUDE.md.
 * It must stay legible: do not restyle it into invisibility.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1080px] px-6 py-14">
        <p className="font-mono text-[0.95rem] font-medium tracking-[0.02em]">
          foundations
          <span aria-hidden className="blink text-amber">
            _
          </span>
        </p>

        <p className="mono-label mt-6 text-[0.68rem] leading-relaxed text-muted">
          Concept build &middot; Designed and built by Isaac Olorode &middot;{" "}
          <a
            href="https://isaac.aperio.finance/landing"
            className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
          >
            isaac.aperio.finance/landing
          </a>
        </p>

        <p className="mono-label mt-4 text-[0.68rem] text-muted">Copyright 2026</p>
      </div>
    </footer>
  );
}
