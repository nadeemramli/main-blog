"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./Gauge.module.scss";

interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Needle position, 0–100. */
  percent: number;
  /** Mono caption under the dial, e.g. "CURRENT FOCUS". */
  label: string;
  /** Printed ink value, e.g. "Building Dealn". */
  value: string;
}

const PIVOT_X = 100;
const PIVOT_Y = 98;
const NEEDLE_R = 68;
const TICK_INNER_R = 76;
const TICK_OUTER_R = 86;

const polar = (radius: number, percent: number) => {
  const angle = Math.PI * (1 - percent / 100);
  return {
    x: PIVOT_X + radius * Math.cos(angle),
    y: PIVOT_Y - radius * Math.sin(angle),
  };
};

/* Needle spring (design.md §7): rest → value on viewport entry, slight
   overshoot, once per page load. Reduced motion renders the final angle. */
const SPRING = { stiffness: 80, damping: 10, mass: 1 };

export const Gauge = ({
  percent,
  label,
  value,
  className,
  ...rest
}: GaugeProps) => {
  const clamped = Math.max(0, Math.min(100, percent));
  const wellRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wellRef, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();

  const motionPercent = useMotionValue(0);
  const sprung = useSpring(motionPercent, SPRING);
  const [shown, setShown] = useState(0);

  useEffect(() => sprung.on("change", (v) => setShown(v)), [sprung]);

  useEffect(() => {
    if (reduced === null || !inView) return;
    if (reduced) {
      sprung.jump(clamped);
      setShown(clamped);
      return;
    }
    motionPercent.set(clamped);
  }, [inView, reduced, clamped, motionPercent, sprung]);

  // Overshoot may briefly leave [0,100]; the dial tolerates ±5.
  const needleTip = polar(NEEDLE_R, Math.max(-5, Math.min(105, shown)));

  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
      className={classNames(styles.gauge, className)}
      {...rest}
    >
      <div ref={wellRef} className={styles.well}>
        <svg
          className={styles.dial}
          viewBox="0 0 200 104"
          aria-hidden="true"
          focusable="false"
        >
          {[0, 25, 50, 75, 100].map((tick) => {
            const inner = polar(TICK_INNER_R, tick);
            const outer = polar(TICK_OUTER_R, tick);
            return (
              <line
                key={tick}
                className={styles.tick}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
              />
            );
          })}
          <line
            className={styles.needle}
            x1={PIVOT_X}
            y1={PIVOT_Y}
            x2={needleTip.x}
            y2={needleTip.y}
          />
        </svg>
        <span className={styles.cap} aria-hidden="true" />
      </div>
      <span className={styles.caption}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
