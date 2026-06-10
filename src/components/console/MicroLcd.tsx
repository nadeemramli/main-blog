import classNames from "classnames";

import styles from "./MicroLcd.module.scss";

interface MicroLcdProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  children: React.ReactNode;
}

export const MicroLcd = ({
  label,
  className,
  children,
  ...rest
}: MicroLcdProps) => {
  return (
    <span className={classNames(styles.chip, className)} {...rest}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.value}>{children}</span>
    </span>
  );
};
