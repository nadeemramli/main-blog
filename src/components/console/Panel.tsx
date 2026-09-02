import classNames from "classnames";

import styles from "./Panel.module.scss";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  interactive?: boolean;
  padding?: "default" | "lg" | "none";
  /** React 19: plain prop. TiltPanel uses it to drive --tilt-x/--tilt-y. */
  ref?: React.Ref<HTMLElement>;
  children: React.ReactNode;
}

export const Panel = ({
  as: Component = "section",
  interactive = false,
  padding = "default",
  className,
  children,
  ...rest
}: PanelProps) => {
  return (
    <Component
      className={classNames(
        styles.panel,
        interactive && styles.interactive,
        padding === "lg" && styles.padLg,
        padding === "none" && styles.padNone,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
