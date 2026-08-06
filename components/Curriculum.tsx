"use client";

import { motion, useReducedMotion } from "framer-motion";

const DAYS = [
  {
    index: "01",
    title: "What a blockchain actually is.",
    line: "And what it is not. The mental model that makes everything else make sense.",
  },
  {
    index: "02",
    title: "Coins, tokens, and stablecoins.",
    line: "The differences that decide what you are actually holding.",
  },
  {
    index: "03",
    title: "Wallets, keys, and custody.",
    line: "How people really lose money, and how not to be one of them.",
  },
  {
    index: "04",
    title: "Reading a market without falling for it.",
    line: "Cycles, narratives, and why your feed is not research.",
  },
  {
    index: "05",
    title: "Should you invest at all?",
    line: "A simple framework for position sizing, risk budget, and walking away.",
  },
];

export default function Curriculum() {
  const reduceMotion = useReducedMotion();

  /* Numbering is correct here because the content is a real sequence. */
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-16 sm:py-28">
      <p className="mono-label text-[0.72rem] text-amber">The curriculum</p>
      <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] sm:text-[2.6rem]">
        Five days, five foundations.
      </h2>

      <ol className="mt-12 border-t border-line">
        {DAYS.map((day, i) => (
          <motion.li
            key={day.index}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-7 sm:gap-x-10"
          >
            <span className="mono-label pt-1 text-[0.8rem] text-amber">{day.index}</span>
            <div>
              <h3 className="font-display text-lg font-medium sm:text-xl">{day.title}</h3>
              <p className="mt-2 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">
                {day.line}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
