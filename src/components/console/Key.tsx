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

  if (href) {
    // Internal routes go through the App Router — client-side transitions,
    // no full-document reload (and free viewport prefetch).
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
};
