"use client";

import classNames from "classnames";

import styles from "./Rocker.module.scss";

export type RockerSide = "a" | "b";

interface RockerProps {
  labelA: string;
  labelB: string;
  value: RockerSide;
  onChange: (side: RockerSide) => void;
  /** Accessible name for the switch, e.g. "Filter projects". */
  ariaLabel?: string;
  className?: string;
}

export const Rocker = ({
  labelA,
  labelB,
  value,
  onChange,
  ariaLabel,
  className,
}: RockerProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value === "b"}
      aria-label={ariaLabel}
      className={classNames(styles.rocker, className)}
      onClick={() => onChange(value === "a" ? "b" : "a")}
    >
      <span
        className={classNames(styles.cap, value === "b" && styles.capB)}
        aria-hidden="true"
      />
      <span
        className={classNames(styles.option, value === "a" && styles.active)}
      >
        {labelA}
      </span>
      <span
        className={classNames(styles.option, value === "b" && styles.active)}
      >
        {labelB}
      </span>
    </button>
  );
};
