"use client";

import { useRef, useState } from "react";

import { Key, MicroLcd, Screen } from "@/components/console";
import SkillRadarChart from "@/components/SkillRadarChart";
import HierarchicalSkillTracker from "@/components/HierarchicalSkillTracker";
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

export default function AttributeConsole() {
  const [active, setActive] = useState<LayerId>("meta");
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  const select = (index: number) => {
    const wrapped = (index + LAYERS.length) % LAYERS.length;
    setActive(LAYERS[wrapped].id);
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

  const ink = active !== "equity" ? LAYER_INK[active] : null;

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
            onClick={() => setActive(layer.id)}
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
        >
          {active === "meta" && (
            <SkillRadarChart
              skills={now.metaLayer.skills}
              title={now.metaLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {active === "fundamental" && (
            <HierarchicalSkillTracker
              clusters={now.fundamentalLayer.clusters}
            />
          )}
          {active === "strategic" && (
            <SkillRadarChart
              skills={now.strategicalLayer.skills}
              title={now.strategicalLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {active === "tactical" && (
            <SkillRadarChart
              skills={now.tacticalLayer.skills}
              title={now.tacticalLayer.title}
              description="Current skill levels and development targets"
            />
          )}
          {active === "equity" && (
            <div className={styles.equityGrid}>
              {consoleData.equity.map((item) => (
                <div key={item.label} className={styles.equityCell}>
                  <MicroLcd label={item.label}>
                    {item.value ??
                      `${consoleData.focus.gaugePercent}% DRAFTED`}
                  </MicroLcd>
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
