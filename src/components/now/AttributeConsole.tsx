"use client";

import { useRef, useState } from "react";

import { Key, MicroLcd, Screen } from "@/components/console";
import SkillRadarChart from "@/components/SkillRadarChart";
import HierarchicalSkillTracker from "@/components/HierarchicalSkillTracker";
import { useCountUp } from "@/components/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";
import { now, consoleData } from "@/app/resources/content";

import styles from "./AttributeConsole.module.scss";

type LayerId = "meta" | "fundamental" | "strategic" | "tactical" | "equity";

const LAYERS: { id: LayerId; label: string }[] = [
  { id: "meta", label: "Meta" },
  { id: "fundamental", label: "Fundamental" },
  { id: "strategic", label: "Strategic" },
  { id: "tactical", label: "Tactical" },
  { id: "equity", label: "Equity" },
];

const LAYER_INK: Record<
  Exclude<LayerId, "equity">,
  { title: string; description: string; approach: string }
> = {
  meta: now.metaLayer,
  fundamental: now.fundamentalLayer,
  strategic: now.strategicalLayer,
  tactical: now.tacticalLayer,
};

/* Equity readouts count up on mount (Phase 4 amendment 4). */
function EquityLcd({ label, value }: { label: string; value: string }) {
  const counted = useCountUp(value, true);
  return <MicroLcd label={label}>{counted}</MicroLcd>;
}

const DIM_MS = 60;

export default function AttributeConsole() {
  const [active, setActive] = useState<LayerId>("meta");
  // `shown` lags `active` by one 60ms phosphor dim — LCDs don't crossfade
  // (Phase 4 amendment 5). Reduced motion swaps instantly.
  const [shown, setShown] = useState<LayerId>("meta");
  const [dimming, setDimming] = useState(false);
  const reduced = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLElement | null)[]>([]);
  const dimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const choose = (id: LayerId) => {
    setActive(id);
    if (dimTimer.current) clearTimeout(dimTimer.current);
    if (reduced !== false) {
      setShown(id);
      return;
    }
    setDimming(true);
    dimTimer.current = setTimeout(() => {
      setShown(id);
      setDimming(false);
    }, DIM_MS);
  };

  const select = (index: number) => {
    const wrapped = (index + LAYERS.length) % LAYERS.length;
    choose(LAYERS[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        select(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        select(index - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(LAYERS.length - 1);
        break;
    }
  };

  const ink = shown !== "equity" ? LAYER_INK[shown] : null;

  return (
    <div className={styles.console}>
      <div
        role="tablist"
        aria-label="Attribute layers"
        className={styles.tablist}
      >
        {LAYERS.map((layer, index) => (
          <Key
            key={layer.id}
            role="tab"
            id={`attr-tab-${layer.id}`}
            aria-selected={active === layer.id}
            aria-controls="attr-panel"
            tabIndex={active === layer.id ? 0 : -1}
            pressed={active === layer.id}
            className={styles.tabKey}
            onClick={() => choose(layer.id)}
            onKeyDown={(event: React.KeyboardEvent) => onKeyDown(event, index)}
            // React 19: ref passes through Key's prop spread to the <button>.
            {...{
              ref: (el: HTMLElement | null) => {
                tabRefs.current[index] = el;
              },
            }}
          >
            {layer.label}
          </Key>
        ))}
      </div>

      <Screen nodeId="NODE-ATTR.01" status="live" className={styles.panel}>
        <div
          role="tabpanel"
          id="attr-panel"
          aria-labelledby={`attr-tab-${active}`}
          className={dimming ? styles.dimming : undefined}
        >
          {shown === "meta" && (
            <SkillRadarChart
              skills={now.metaLayer.skills}
              title={now.metaLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {shown === "fundamental" && (
            <HierarchicalSkillTracker
              clusters={now.fundamentalLayer.clusters}
            />
          )}
          {shown === "strategic" && (
            <SkillRadarChart
              skills={now.strategicalLayer.skills}
              title={now.strategicalLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {shown === "tactical" && (
            <SkillRadarChart
              skills={now.tacticalLayer.skills}
              title={now.tacticalLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {shown === "equity" && (
            <div className={styles.equityGrid}>
              {consoleData.equity.map((item) => (
                <div key={item.label} className={styles.equityCell}>
                  <EquityLcd
                    label={item.label}
                    value={
                      item.value ?? `${consoleData.focus.gaugePercent}% DRAFTED`
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Screen>

      {ink && (
        <div className={styles.ink}>
          <h3 className={styles.inkTitle}>{ink.title}</h3>
          <p className={styles.inkBody}>{ink.description}</p>
          <p className={styles.inkBody}>{ink.approach}</p>
        </div>
      )}
    </div>
  );
}
