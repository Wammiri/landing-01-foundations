"use client";

import { animate, useMotionValue, useReducedMotion, useTransform, motion } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";

const TARGET = 12400;
const FINAL = TARGET.toLocaleString("en-US");

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

/**
 * Counts 0 to 12,400 once on mount.
 *
 * The server and the first client paint both render the final figure, so the
 * markup matches and there is no hydration mismatch. The animation only takes
 * over after mount, which also means the honest number is in the HTML even if
 * JavaScript never runs.
 *
 * No layout shift: the span reserves the final string's width with a fixed ch
 * measure and tabular numerals, so every intermediate value occupies exactly
 * the same box as the final one.
 *
 * The figure is demo copy for a fictional brand, per SPEC.md section 5.
 */
export default function Counter() {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();

  const count = useMotionValue(0);
  const formatted = useTransform(count, (value) => Math.round(value).toLocaleString("en-US"));

  useEffect(() => {
    if (!mounted || reduceMotion) return;

    count.set(0);
    const controls = animate(count, TARGET, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [count, mounted, reduceMotion]);

  const className = "tabular inline-block w-[6ch] text-right font-medium text-amber";
  const label = `${FINAL} careful investors`;

  // Before mount, and whenever motion is reduced, this is a plain static span.
  if (!mounted || reduceMotion) {
    return (
      <span className={className} aria-label={label}>
        {FINAL}
      </span>
    );
  }

  return (
    <motion.span className={className} aria-label={label}>
      {formatted}
    </motion.span>
  );
}
