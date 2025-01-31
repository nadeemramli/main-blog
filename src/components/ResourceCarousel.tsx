"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ResourceCard } from "./ResourceCard";
import styles from "./ResourceCarousel.module.css";

interface ResourceCarouselProps {
  resources: Array<{
    title: string;
    description: string;
    imageSrc: string;
    link: string;
  }>;
}

export function ResourceCarousel({ resources }: ResourceCarouselProps) {
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
    <div className={styles.embla}>
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
      <button
        className={`${styles.embla__button} ${styles.embla__button__prev}`}
        onClick={scrollPrev}
      >
        ←
      </button>
      <button
        className={`${styles.embla__button} ${styles.embla__button__next}`}
        onClick={scrollNext}
      >
        →
      </button>
    </div>
  );
}
