"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./Reveal.module.scss";

interface RevealProps {
  /** Stagger slot — 80ms per shell (design.md §7). */
  index?: number;
  className?: string;
  children: React.ReactNode;
}

export const Reveal = ({ index = 0, className, children }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // null = pre-hydration: render visible (SSR-safe), no animation.
  const [state, setState] = useState<"ssr" | "hidden" | "visible">("ssr");

  useEffect(() => {
    if (reduced === null) return;
    if (reduced) {
      setState("visible");
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Already in view at hydration time? Don't hide what's being read.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("visible");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={classNames(
        styles.reveal,
        state === "hidden" && styles.hidden,
        className,
      )}
      style={
        state !== "ssr" ? { transitionDelay: `${index * 80}ms` } : undefined
      }
    >
      {children}
    </div>
  );
};
