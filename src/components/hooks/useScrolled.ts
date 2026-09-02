"use client";

import { useEffect, useState } from "react";

/** True once the page has scrolled past `on` px; false again below `off`
 *  (hysteresis so the header never flutters at the threshold). Passive,
 *  rAF-coalesced. SSR and pre-hydration: false. */
export function useScrolled(on = 120, off = 72): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > off : y > on));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [on, off]);

  return scrolled;
}
