import classNames from "classnames";

import styles from "./Led.module.scss";

export type LedColor = "red" | "mint" | "amber";

interface LedProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: LedColor;
  label: string;
  /** 2s idle pulse — for "live" states only (design.md §5.6). */
  pulse?: boolean;
}

export const Led = ({
  color = "mint",
  label,
  pulse = false,
  className,
  ...rest
}: LedProps) => {
  return (
    <span className={classNames(styles.led, className)} {...rest}>
      <span
        className={classNames(styles.dot, styles[color], pulse && styles.pulse)}
        aria-hidden="true"
      />
      <span className={styles.label}>{label}</span>
    </span>
  );
};
