"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Fictional copy for a fictional brand, per SPEC.md section 5. */
const QUOTES = [
  {
    quote:
      "The custody lesson alone stopped me from making a mistake I was about to make that week.",
    attribution: "Tunde A.",
  },
  {
    quote: "I finally understand what I own and why. That is worth more than any tip.",
    attribution: "Sarah K.",
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1080px] gap-12 px-6 py-16 sm:grid-cols-2 sm:gap-16 sm:py-28">
        {QUOTES.map((item, i) => (
          <motion.figure
            key={item.attribution}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="font-display text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mono-label mt-5 text-[0.7rem] text-muted">
              {item.attribution}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
