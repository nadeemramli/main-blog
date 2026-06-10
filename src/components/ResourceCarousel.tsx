"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Key } from "@/components/console";
import { ResourceCard, type ResourceCardProps } from "./ResourceCard";
import styles from "./ResourceCarousel.module.css";

interface ResourceCarouselProps {
  resources: ResourceCardProps[];
  contained?: boolean;
}

export function ResourceCarousel({
  resources,
  contained = false,
}: ResourceCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
    dragFree: true,
  });

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!resources?.length) {
    return null;
  }

  return (
    <div className={contained ? styles["embla--contained"] : styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {resources.map((resource, index) => (
            <div
              className={`${styles.embla__slide} ${
                index === selectedIndex ? styles["is-selected"] : ""
              } ${
                index === (selectedIndex + 1) % resources.length
                  ? styles["is-next"]
                  : ""
              }`}
              key={index}
            >
              <ResourceCard {...resource} />
            </div>
          ))}
        </div>
      </div>
      {/* Round icon Keys (design.md §6.5). */}
      <Key
        variant="icon"
        className={`${styles.embla__button} ${styles.embla__button__prev}`}
        onClick={scrollPrev}
        aria-label="Previous resources"
      >
        ←
      </Key>
      <Key
        variant="icon"
        className={`${styles.embla__button} ${styles.embla__button__next}`}
        onClick={scrollNext}
        aria-label="Next resources"
      >
        →
      </Key>
    </div>
  );
}
