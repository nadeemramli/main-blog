"use client";

import { useEffect, useState } from "react";

import { Screen } from "@/components/console";
import TimeDisplay from "@/components/Header";
import { useCountUp } from "@/components/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

import styles from "./HeroScreen.module.scss";

interface Stat {
  label: string;
  value: string | null;
}

interface HeroScreenProps {
  name: string;
  roleLine: string;
  timeZone: string;
  stats: Stat[];
}

const FLICKER_MS = 280;
const LINE_STAGGER_MS = 60;

function StatValue({ value, timeZone }: { value: string | null; timeZone: string }) {
  const counted = useCountUp(value ?? "", value !== null);
  if (value === null) {
    // The live clock keeps its 1s tick untouched (Phase 4 amendment 4).
    return <TimeDisplay timeZone={timeZone} />;
  }
  return <>{counted}</>;
}

export default function HeroScreen({
  name,
  roleLine,
  timeZone,
  stats,
}: HeroScreenProps) {
  const reduced = usePrefersReducedMotion();
  const [booting, setBooting] = useState(false);

  // Boot on every arrival at the hero — the console powers on each time
  // you land on it (owner decision; was once-per-session).
  useEffect(() => {
    if (reduced !== false) return; // reduced or unknown: never boot
    setBooting(true);
  }, [reduced]);

  const lineDelay = (index: number) =>
    booting
      ? { animationDelay: `${FLICKER_MS + index * LINE_STAGGER_MS}ms` }
      : undefined;

  return (
    <div className={booting ? styles.boot : undefined}>
      <Screen nodeId="NODE-NR.01" status="sync" scanlines>
        <div className={`${styles.operatorLabel} ${styles.line}`} style={lineDelay(0)}>
          OPERATOR
        </div>
        <div className={`${styles.readoutXl} ${styles.line}`} style={lineDelay(1)}>
          {name}
        </div>
        <div className={`${styles.roleLine} ${styles.line}`} style={lineDelay(2)}>
          {roleLine}
          <span className={styles.cursor} aria-hidden="true">
            ▮
          </span>
        </div>
        <div className={`${styles.statsGrid} ${styles.line}`} style={lineDelay(3)}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>
                <StatValue value={stat.value} timeZone={timeZone} />
              </span>
            </div>
          ))}
        </div>
      </Screen>
    </div>
  );
}
