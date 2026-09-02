"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import { ticker } from "./ticker";

/* Smooth scroll (design.md §7 v2). Lenis smooths the wheel on fine
   pointers and, since the mobile pass, syncs touch on coarse pointers so a
   flick decays on the same eased curve instead of the browser's stepped
   momentum. Never instantiated under reduced motion or before hydration,
   so it cannot touch first paint. It rides the shared ticker instead of
   its own rAF. Anchor clicks (`a[href^="#"]`) are intercepted with a
   header offset. */

export const SCROLL_OFFSET = -96; // clears the sticky instrument strip

type Mode = "fine" | "coarse";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function LenisTicker() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    return ticker.add((time) => lenis.raf(time));
  }, [lenis]);

  // Next moves the scroll position instantly on navigation (and on
  // back/forward). Resync Lenis's target so an in-flight animation can't
  // carry the old page's momentum into the new one.
  useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

const OPTIONS: Record<Mode, Record<string, unknown>> = {
  fine: {
    lerp: 0.1,
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
  },
  // Touch: Lenis owns the gesture. A slightly quicker lerp than the wheel
  // keeps a finger-tracking feel; the inertia exponent shapes the flick.
  coarse: {
    lerp: 0.12,
    duration: 1.0,
    smoothWheel: true,
    syncTouch: true,
    syncTouchLerp: 0.09,
    touchInertiaExponent: 1.7,
    touchMultiplier: 1,
  },
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    if (reduced !== false) return;
    setMode(window.matchMedia("(pointer: coarse)").matches ? "coarse" : "fine");
  }, [reduced]);

  // null (pre-hydration / unknown) or reduced: native scroll, nothing mounted.
  if (reduced !== false || mode === null) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        ...OPTIONS[mode],
        anchors: { offset: SCROLL_OFFSET },
        autoRaf: false,
      }}
    >
      <LenisTicker />
      {children}
    </ReactLenis>
  );
}
