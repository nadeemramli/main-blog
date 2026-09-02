"use client";

import { Rocker } from "./Rocker";
import { setLamp, useLamp } from "./lamp";

interface LampSwitchProps {
  className?: string;
}

/* The lamp rocker in the header cluster (design.md §5.12): DAY / NIGHT.
   Switching a lamp is instant — no crossfade. */
export function LampSwitch({ className }: LampSwitchProps) {
  const lamp = useLamp();
  return (
    <Rocker
      size="sm"
      labelA="Day"
      labelB="Night"
      value={lamp === "night" ? "b" : "a"}
      onChange={(side) => setLamp(side === "b" ? "night" : "day")}
      ariaLabel="Desk lamp: night mode"
      className={className}
    />
  );
}
