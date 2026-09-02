import classNames from "classnames";

import styles from "./Panel.module.scss";

/* A narrow tag union (not React.ElementType): once @react-three/fiber augments
   JSX.IntrinsicElements, the wide union collapses `children` to `never`. */
export type PanelTag = "section" | "div" | "article" | "aside" | "header" | "footer" | "nav" | "li";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  as?: PanelTag;
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
  ref,
  ...rest
}: PanelProps) => {
  const Tag = Component as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
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
    </Tag>
  );
};
