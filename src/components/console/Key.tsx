import classNames from "classnames";
import Link from "next/link";

import styles from "./Key.module.scss";

export type KeyVariant = "default" | "primary" | "icon";

type KeyBaseProps = {
  variant?: KeyVariant;
  /** Renders an anchor instead of a button. */
  href?: string;
  /** Held-down state, e.g. the active nav item (design.md §5.7). */
  pressed?: boolean;
  /** Decorative cap (e.g. a tool chip): renders a span, no control semantics. */
  as?: "span";
  /** Free-standing caps drift ≤6px toward a fine pointer (design.md §5.5 v2).
   *  Track-seated caps (the nav) opt out. */
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
};

type KeyProps = KeyBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof KeyBaseProps
  >;

export const Key = ({
  variant = "default",
  href,
  pressed = false,
  as,
  magnetic = true,
  className,
  children,
  ...rest
}: KeyProps) => {
  const classes = classNames(
    styles.key,
    variant === "primary" && styles.primary,
    variant === "icon" && styles.icon,
    pressed && styles.pressed,
    className,
  );
  const magnet = magnetic ? "" : undefined;

  if (as === "span") {
    return (
      <span
        className={classes}
        data-magnetic={magnet}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }

  if (href) {
    // Internal routes go through the App Router — client-side transitions,
    // no full-document reload (and free viewport prefetch).
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} data-magnetic={magnet} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} data-magnetic={magnet} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} data-magnetic={magnet} {...rest}>
      {children}
    </button>
  );
};
