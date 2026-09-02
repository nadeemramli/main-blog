"use client";

import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import { DeviceOutline } from "./DeviceOutline";
import styles from "./DeviceDock.module.scss";

/* The dock (design.md §5.13, §6.1 v2): a recessed well in the hero's third
   column holding the 3D reference unit. The scene is a lazy chunk that
   loads after idle, only on >=1024px viewports and capable machines —
   never on the LCP path. The printed outline reserves the box and stays
   as the fallback, so the well is never empty and nothing shifts. */

const DeviceScene = dynamic(() => import("./DeviceScene"), {
  ssr: false,
  loading: () => null,
});

const MIN_WIDTH = 1024;

function lowTier(): boolean {
  if (typeof navigator === "undefined") return true;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return cores <= 4 || memory < 4 || !("WebGL2RenderingContext" in window);
}

export default function DeviceDockMount() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });
  const [ready, setReady] = useState(false);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (reduced === null) return;
    if (window.innerWidth < MIN_WIDTH || lowTier()) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <div ref={ref} className={styles.dock} data-painted={painted ? "" : undefined}>
      <DeviceOutline />
      <div className={styles.contact} aria-hidden="true" />
      {ready && (
        <div className={styles.canvas} aria-hidden="true">
          <DeviceScene
            active={inView}
            reduced={reduced === true}
            onFirstFrame={() => setPainted(true)}
          />
        </div>
      )}
    </div>
  );
}
