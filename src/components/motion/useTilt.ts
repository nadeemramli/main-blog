"use client";

import { useEffect, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

interface TiltOptions {
  /** Degrees at the element edge. Design cap is --console-tilt-max (4deg). */
  max?: number;
}

/* Element-local pointer tilt (design.md §5.1 v2). Writes --tilt-x/--tilt-y
   on the element; Panel's composed transform consumes them. Fine pointers
   only, never under reduced motion. Exact 0deg on leave so text re-snaps. */
export function useTilt(
  ref: RefObject<HTMLElement | null>,
  options?: TiltOptions,
) {
  const reduced = usePrefersReducedMotion();
  const max = options?.max ?? 4;

  useEffect(() => {
    if (reduced !== false) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      rx = -ny * max;
      ry = nx * max;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };
  }, [ref, reduced, max]);
}
