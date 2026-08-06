"use client";

import { motion, useReducedMotion } from "framer-motion";
import Counter from "@/components/Counter";
import { trackCta } from "@/lib/track";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /*
    One orchestrated entrance for the whole hero: fade plus a 16px rise,
    0.5s ease out, staggered 0.06 between children. Under reduced motion the
    variants collapse to the settled state and nothing animates.
  */
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
    },
  };

  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Radial amber glow, behind the hero only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 28% 22%, rgba(255,176,32,0.10), transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-[1080px] px-6 pb-16 pt-20 sm:pb-24 sm:pt-28"
      >
        <motion.p variants={item} className="mono-label text-[0.72rem] text-amber">
          Free 5 day email course
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 max-w-[16ch] font-display font-bold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
        >
          Understand crypto <span className="text-amber">before</span> you risk a dollar.
        </motion.h1>

        <motion.p variants={item} className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">
          Five short lessons on how digital assets actually work. No hype, no jargon, no coin
          shilling. One email a day, each under ten minutes.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <a
            href="#signup"
            onClick={() => trackCta("hero")}
            className="inline-block rounded-[6px] bg-amber px-7 py-3.5 font-semibold text-bg transition-all duration-150 hover:-translate-y-px hover:brightness-110"
          >
            Start the free course
          </a>
        </motion.div>

        <motion.p variants={item} className="mono-label mt-6 text-[0.7rem] text-muted">
          Joined by <Counter /> careful investors
        </motion.p>
      </motion.div>
    </section>
  );
}
