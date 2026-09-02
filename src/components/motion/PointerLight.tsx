"use client";

import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import { pointer } from "./pointer";
import { ticker } from "./ticker";

/* The desk lamp (design.md §7 v2). One document-level pointer tracker writes
   the light vector (--light-dx, --light-dy) and the pointer fraction
   (--pointer-x, --pointer-y) on <html>; every neumorphic shadow pair and
   every LCD specular is composed from them. Fine pointers on >=1024px only,
   never under reduced motion. Otherwise nothing is written and the var()
   fallbacks keep the canonical top-left lamp. */

const MIN_WIDTH = 1024;
const LERP = 0.12;
const QUANT = 0.04; // 0.32px shadow steps: invisible, but half the style recalcs
const CANON = -1;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const quant = (v: number) => Math.round(v / QUANT) * QUANT;

/* The lamp swings on a short arm inside the top-left quadrant: the pair
   never flattens or flips (design.md §9 "no flat shadows"). A pointer in the
   top-left corner reproduces the canonical vector exactly. */
const toLight = (n: number) => clamp(-0.8 + 0.35 * n, -1, -0.45);

export function PointerLight() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced !== false) return;
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const html = document.documentElement;
    if (html.dataset.lighting === "static") return; // kill switch

    // Targets (viewport-centred, -1..1) and the eased current light vector.
    let tx = 0;
    let ty = 0;
    let active = false;
    let curDx = CANON;
    let curDy = CANON;
    let lastDx = NaN;
    let lastDy = NaN;
    let lastPx = NaN;
    let lastPy = NaN;
    let unsub: (() => void) | null = null;
    let wide = window.innerWidth >= MIN_WIDTH;
    let frame = 0;

    const clear = () => {
      html.style.removeProperty("--light-dx");
      html.style.removeProperty("--light-dy");
      html.style.removeProperty("--pointer-x");
      html.style.removeProperty("--pointer-y");
      html.removeAttribute("data-lighting");
      lastDx = lastDy = lastPx = lastPy = NaN;
    };

    const tick = () => {
      // Shadows are soft: 30Hz is plenty, and each write is a document-wide
      // style recalc (custom property on <html>). Skip alternate frames.
      if (active && (frame++ & 1)) return;
      const goalDx = active ? toLight(tx) : CANON;
      const goalDy = active ? toLight(ty) : CANON;
      curDx += (goalDx - curDx) * LERP;
      curDy += (goalDy - curDy) * LERP;

      const settled =
        Math.abs(goalDx - curDx) < 0.004 && Math.abs(goalDy - curDy) < 0.004;

      if (!active && settled) {
        // Lamp is back on its hook: hand control back to the CSS fallbacks.
        curDx = CANON;
        curDy = CANON;
        clear();
        pointer.set(0, 0, false);
        unsub?.();
        unsub = null;
        return;
      }

      const dx = quant(curDx);
      const dy = quant(curDy);
      if (dx !== lastDx) {
        html.style.setProperty("--light-dx", dx.toFixed(2));
        lastDx = dx;
      }
      if (dy !== lastDy) {
        html.style.setProperty("--light-dy", dy.toFixed(2));
        lastDy = dy;
      }

      if (active) {
        const px = quant((tx + 1) / 2);
        const py = quant((ty + 1) / 2);
        if (px !== lastPx) {
          html.style.setProperty("--pointer-x", px.toFixed(2));
          lastPx = px;
        }
        if (py !== lastPy) {
          html.style.setProperty("--pointer-y", py.toFixed(2));
          lastPy = py;
        }
      }
    };

    const wake = () => {
      if (!unsub) unsub = ticker.add(tick);
      html.dataset.lighting = "live";
    };

    const onMove = (e: PointerEvent) => {
      if (!wide || e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      active = true;
      pointer.set(tx, ty, true);
      wake();
    };

    const onLeave = () => {
      if (!active) return;
      active = false;
      pointer.set(tx, ty, false);
      wake();
    };

    const onResize = () => {
      wide = window.innerWidth >= MIN_WIDTH;
      if (!wide) onLeave();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
      unsub?.();
      clear();
      pointer.set(0, 0, false);
    };
  }, [reduced]);

  return null;
}
