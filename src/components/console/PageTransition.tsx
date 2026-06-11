"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    hasNavigatedOnce = true;
  }, []);

  const animate = isNavigation.current && reduced === false;

  return (
    <div className={classNames(styles.wrap, animate && styles.enter)}>
      {children}
    </div>
  );
}
