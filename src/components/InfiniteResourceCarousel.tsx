"use client";

import { ResourceCard, type ResourceCardProps } from "./ResourceCard";
import styles from "./InfiniteResourceCarousel.module.css";

interface InfiniteResourceCarouselProps {
  resources: ResourceCardProps[];
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
}

// We render the set three times so the strip always overflows the viewport
// (even on ultra-wide screens) and the loop stays seamless. The track is
// translated by exactly one third of its width, landing the next identical
// copy precisely where the previous one started.
const COPIES = 3;

export function InfiniteResourceCarousel({
  resources,
  speed = 36,
  direction = "left",
}: InfiniteResourceCarouselProps) {
  if (!resources?.length) {
    return null;
  }

  const items = Array.from({ length: COPIES }, () => resources).flat();

  return (
    <div className={styles.marquee}>
      <div
        className={styles.track}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map((resource, index) => (
          <div
            className={styles.item}
            key={index}
            aria-hidden={index >= resources.length}
          >
            <ResourceCard {...resource} />
          </div>
        ))}
      </div>
    </div>
  );
}
