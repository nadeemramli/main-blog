import classNames from "classnames";

import type { LedColor } from "./Led";
import styles from "./Badge.module.scss";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Optional LED dot, e.g. red for "IN DEVELOPMENT", mint for "LIVE". */
  led?: LedColor;
  children: React.ReactNode;
}

export const Badge = ({ led, className, children, ...rest }: BadgeProps) => {
  return (
    <span className={classNames(styles.badge, className)} {...rest}>
      {led && (
        <span
          className={classNames(styles.dot, styles[led])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
