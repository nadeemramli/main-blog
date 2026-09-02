"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import { ticker } from "./ticker";

/* Smooth scroll (design.md §7 v2). Lenis smooths the wheel only — touch
   stays native (syncTouch: false) — and is never instantiated under reduced
   motion or before hydration, so it cannot touch first paint. It rides the
   shared ticker instead of its own rAF. Anchor clicks (`a[href^="#"]`) are
   intercepted with a header offset. */

export const SCROLL_OFFSET = -96; // clears the sticky instrument strip

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
  // back/forward). Resync Lenis's target so an in-flight wheel animation
  // can't carry the old page's momentum into the new one.
  useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = usePrefersReducedMotion();

  // null (pre-hydration) or true: native scroll, nothing mounted.
  if (reduced !== false) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: SCROLL_OFFSET },
        autoRaf: false,
      }}
    >
      <LenisTicker />
      {children}
    </ReactLenis>
  );
}
