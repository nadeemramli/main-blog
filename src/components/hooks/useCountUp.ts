"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const DURATION_MS = 800;

/**
 * Counts the leading integer of a readout up from 0 over 800ms
 * (design.md §7), preserving any prefix/suffix ("50% DRAFTED" → ticks
 * the 50). Values without a leading number render as-is. Reduced
 * motion renders the final value immediately.
 */
export function useCountUp(value: string, start: boolean): string {
  const reduced = usePrefersReducedMotion();
  // Leading integers only — counting a "/13" denominator would briefly
  // show a wrong total, and LCDs don't lie.
  const match = /^(\d+)([\s\S]*)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : null;
  const [current, setCurrent] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null || !start) return;
    if (reduced === null) return; // wait until preference is known
    if (reduced) {
      setCurrent(target);
      return;
    }

    const began = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(target * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, start, reduced]);

  if (!match || target === null) return value;
  const shown = current ?? (reduced === false ? 0 : target);
  return `${shown}${match[2]}`;
}
