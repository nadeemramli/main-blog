"use client";

import { useSyncExternalStore } from "react";

/* The desk lamp switch (design.md §5.12): day or night. The console's own
   palette attribute (`data-console="night"` on <html>), separate from
   once-ui's `data-theme`. Night is the default; a visitor's "day" choice is
   persisted and applied before first paint by the inline script in
   layout.tsx, so nobody sees the wrong lamp. */

export type Lamp = "day" | "night";

export const LAMP_KEY = "console.lamp";
export const LAMP_EVENT = "console:lamp";
const THEME_COLOR: Record<Lamp, string> = { day: "#d5d2c6", night: "#1a1b19" };

const listeners = new Set<() => void>();

export function getLamp(): Lamp {
  if (typeof document === "undefined") return "day";
  return document.documentElement.dataset.console === "night" ? "night" : "day";
}

export function setLamp(next: Lamp) {
  const html = document.documentElement;
  if (next === "night") html.setAttribute("data-console", "night");
  else html.removeAttribute("data-console");
  try {
    localStorage.setItem(LAMP_KEY, next);
  } catch {
    /* private mode / storage disabled: the switch still works for this page */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[next]);
  listeners.forEach((fn) => fn());
  window.dispatchEvent(new CustomEvent(LAMP_EVENT, { detail: next }));
}

export function subscribeLamp(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

const getServerSnapshot = (): Lamp => "night";

/** Current lamp state; re-renders on switch. Server snapshot is "night"
 *  (the default; the SSR html carries data-console="night"). */
export function useLamp(): Lamp {
  return useSyncExternalStore(subscribeLamp, getLamp, getServerSnapshot);
}
