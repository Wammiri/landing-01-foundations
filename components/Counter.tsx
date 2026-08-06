"use client";

import { animate, useMotionValue, useReducedMotion, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

const TARGET = 12400;

/**
 * Counts 0 to 12,400 once on mount.
 *
 * No layout shift: the span reserves the final string's width with a fixed
 * ch measure and tabular numerals, so every intermediate value occupies
 * exactly the same box as the final one.
 *
 * The figure is demo copy for a fictional brand, per SPEC.md section 5.
 */
export default function Counter() {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? TARGET : 0);
  const formatted = useTransform(count, (value) => Math.round(value).toLocaleString("en-US"));

  useEffect(() => {
    if (reduceMotion) {
      count.set(TARGET);
      return;
    }

    const controls = animate(count, TARGET, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [count, reduceMotion]);

  return (
    <motion.span
      className="tabular inline-block w-[6ch] text-right font-medium text-amber"
      aria-label={`${TARGET.toLocaleString("en-US")} careful investors`}
    >
      {formatted}
    </motion.span>
  );
}
