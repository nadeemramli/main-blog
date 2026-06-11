"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./BootIn.module.scss";

interface BootInProps {
  className?: string;
  children: React.ReactNode;
}

/** Wraps a page's dominant Screen so it powers on when you arrive —
 *  switching pages is switching devices (design.md §7). Post-hydration,
 *  every mount, skipped under reduced motion. */
export function BootIn({ className, children }: BootInProps) {
  const reduced = usePrefersReducedMotion();
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    if (reduced === false) setBooting(true);
  }, [reduced]);

  return (
    <div className={classNames(booting && styles.boot, className)}>
      {children}
    </div>
  );
}
