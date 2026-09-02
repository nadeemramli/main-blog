"use client";

import classNames from "classnames";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";
import { SCROLL_OFFSET } from "@/components/motion/SmoothScroll";

import styles from "./ScrollRail.module.scss";

/* The rack rail (design.md §5.12): a recessed vertical track on the left
   edge with a carriage that rides scroll progress, and a tick per section.
   Sections opt in with `data-rail="LABEL"`. Fine pointers ≥1200px only
   (CSS); hidden when a page has fewer than two sections. */

const TRACK = 240;
const CARRIAGE = 18;

interface RailItem {
  label: string;
  el: HTMLElement;
  /** Position along the track in scroll-progress space, 0..1. */
  at: number;
}

function collect(): RailItem[] {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-rail]"),
  );
  const range = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const scrollY = window.scrollY;
  return nodes.map((el) => {
    // Document-space top (offsetTop would be relative to a transformed
    // Reveal wrapper while it is still hidden).
    const top = el.getBoundingClientRect().top + scrollY;
    return {
      label: el.dataset.rail ?? "",
      el,
      at: Math.min(1, Math.max(0, (top + SCROLL_OFFSET) / range)),
    };
  });
}

export function ScrollRail() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const [items, setItems] = useState<RailItem[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  const y = useTransform(
    [scrollYProgress, sprung],
    ([raw, spring]: number[]) => (reduced ? raw : spring) * (TRACK - CARRIAGE),
  );

  // Collect sections on every route change, after the page has laid out;
  // re-collect when the page's DOM changes (e.g. the projects filter).
  useEffect(() => {
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // The body observer fires for every text update (the clock ticks
        // each second); only re-render when the rail actually changed.
        const next = collect();
        setItems((prev) =>
          prev.length === next.length &&
          prev.every(
            (p, i) =>
              p.el === next[i].el &&
              p.label === next[i].label &&
              Math.abs(p.at - next[i].at) < 0.002,
          )
            ? prev
            : next,
        );
      });
    };
    refresh();
    const main = document.querySelector("main") ?? document.body;
    const mo = new MutationObserver(refresh);
    mo.observe(main, { childList: true, subtree: true });
    window.addEventListener("resize", refresh, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", refresh);
    };
  }, [pathname]);

  // Active section: the one crossing a band just above the viewport middle.
  useEffect(() => {
    if (items.length < 2) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = items.findIndex((it) => it.el === entry.target);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((it) => io.observe(it.el));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const jump = (item: RailItem) => {
    if (lenis) {
      lenis.scrollTo(item.el, { offset: SCROLL_OFFSET });
    } else {
      item.el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className={styles.rail} aria-label="Sections">
      <div className={styles.track} style={{ height: TRACK }}>
        <motion.div
          className={styles.carriage}
          style={{ y, height: CARRIAGE }}
          aria-hidden="true"
        />
        {items.map((item, i) => (
          <button
            key={`${item.label}-${i}`}
            type="button"
            className={classNames(styles.tick, i === active && styles.active)}
            style={{ top: `${item.at * 100}%` }}
            onClick={() => jump(item)}
            aria-current={i === active ? "location" : undefined}
          >
            <span className={styles.mark} aria-hidden="true" />
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
