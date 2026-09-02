"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

/** Client shell for the console's runtime layer (design.md §7 v2).
 *  MotionConfig makes every framer-motion animation honour the user's
 *  reduced-motion preference. `data-hydrated` lets CSS suppress one-off
 *  transitions (e.g. the lamp rocker cap) that would otherwise play on
 *  first paint. */
export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
