"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import Counter from "@/components/Counter";
import { trackCta } from "@/lib/track";

/*
  False on the server and for the first client paint, true afterwards.
  useSyncExternalStore is React's primitive for exactly this server/client
  split, and unlike a setState in an effect it does not trigger a cascading
  render.
*/
const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();

  /*
    One orchestrated entrance for the whole hero: fade plus a 16px rise,
    0.5s ease out, staggered 0.06 between children.

    The entrance only arms after mount. The server and the first client paint
    both render the settled state, so the markup matches and there is no
    hydration mismatch, and the hero copy is visible even without JavaScript.
    Under reduced motion the variants stay collapsed and nothing animates.
  */
  const animateEntrance = mounted && !reduceMotion;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: animateEntrance ? 0.06 : 0 },
    },
  };

  const item = animateEntrance
    ? {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
      }
    : { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };

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
            className="cta-amber inline-block rounded-[6px] bg-amber px-7 py-3.5 font-semibold text-bg transition-[transform,filter] duration-150 hover:-translate-y-px hover:brightness-110"
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
