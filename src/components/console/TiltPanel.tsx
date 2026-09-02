"use client";

import { useRef } from "react";

import { useTilt } from "@/components/motion/useTilt";

import { Panel, type PanelProps } from "./Panel";

/* A Panel that tilts up to 4deg toward a fine pointer (design.md §5.1 v2).
   Use on device cards; never on text-heavy shells. Children pass straight
   through, so server components can render it. */
export function TiltPanel(props: PanelProps) {
  const ref = useRef<HTMLElement>(null);
  useTilt(ref);
  return <Panel ref={ref} data-tilt="" {...props} />;
}
