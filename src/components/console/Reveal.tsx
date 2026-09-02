"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./Reveal.module.scss";

interface RevealProps {
  /** Explicit stagger slot (80ms each). Omit to auto-batch: shells that
   *  enter the viewport in the same ~120ms window stagger after each
   *  other; a shell entering alone starts at once. */
  index?: number;
  className?: string;
  children: React.ReactNode;
}

const STAGGER_MS = 80;
const BATCH_WINDOW_MS = 120;

let batchAt = 0;
let batchCount = 0;

function nextBatchDelay(): number {
  const now = performance.now();
  if (now - batchAt < BATCH_WINDOW_MS) {
    batchCount += 1;
  } else {
    batchAt = now;
    batchCount = 0;
  }
  return batchCount * STAGGER_MS;
}

/* Shell reveal (design.md §7 v2): the shell lifts off the desk — hinged at
   its bottom edge, from 8° and 24px below, fading in over 400ms. One-shot.
   SSR output is always visible; anything already in view at hydration is
   never hidden (LCP safety). `data-revealed` marks the visible state so
   log lines and LEDs can key their own entry motion off it. */
export const Reveal = ({ index, className, children }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // null = pre-hydration: render visible (SSR-safe), no animation.
  const [state, setState] = useState<"ssr" | "hidden" | "visible">("ssr");
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    if (reduced === null) return;
    if (reduced) {
      setState("visible");
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Already in view at hydration time? Don't hide what's being read.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("visible");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDelay(index !== undefined ? index * STAGGER_MS : nextBatchDelay());
          setState("visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, index]);

  return (
    <div
      ref={ref}
      className={classNames(
        styles.reveal,
        state === "hidden" && styles.hidden,
        className,
      )}
      data-revealed={state === "visible" ? "" : undefined}
      style={state !== "ssr" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
