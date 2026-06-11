"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./PageTransition.module.scss";

// Module scope: survives remounts across client-side navigations, resets on
// a full document load — so the first page view skips the ritual (the hero
// boot owns that) and every navigation after it gets one.
let hasNavigatedOnce = false;

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduced = usePrefersReducedMotion();
  // Captured at mount: was this mount caused by a navigation?
  const isNavigation = useRef(hasNavigatedOnce);
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    hasNavigatedOnce = true;
  }, []);

  useEffect(() => {
    if (!isNavigation.current || reduced !== false) return;
    setShowUnlock(true);
    const timer = setTimeout(() => setShowUnlock(false), 750);
    return () => clearTimeout(timer);
  }, [reduced]);

  const animate = isNavigation.current && reduced === false;

  return (
    <div className={classNames(styles.wrap, animate && styles.enter)}>
      {showUnlock && (
        <div className={styles.unlockChip} role="status">
          <span className={styles.unlockDot} aria-hidden="true" />
          Access granted
        </div>
      )}
      {children}
    </div>
  );
}
