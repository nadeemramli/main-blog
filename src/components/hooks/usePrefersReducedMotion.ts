"use client";

import { useEffect, useState } from "react";

/**
 * null = not yet known (pre-hydration). Effects must treat null as
 * "don't animate yet", not as permission.
 */
export function usePrefersReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
