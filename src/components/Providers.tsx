"use client";

import { MotionConfig } from "framer-motion";

import { PointerLight } from "@/components/motion/PointerLight";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollRail } from "@/components/console/ScrollRail";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
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
  // The rail is desktop hardware: on phones it must not even run its
  // scroll spring and observers (the CSS only hid it).
  const railEnabled = useMediaQuery(
    "(min-width: 1200px) and (hover: hover) and (pointer: fine)",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <PointerLight />
        {railEnabled && <ScrollRail />}
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}
