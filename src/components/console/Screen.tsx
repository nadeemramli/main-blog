import classNames from "classnames";

import styles from "./Screen.module.scss";

export type ScreenStatus = "sync" | "live" | "idle" | "off" | "locked";

interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  nodeId?: string;
  status?: ScreenStatus;
  scanlines?: boolean;
  children: React.ReactNode;
}

export const Screen = ({
  nodeId,
  status,
  scanlines = false,
  className,
  children,
  ...rest
}: ScreenProps) => {
  return (
    <div className={classNames(styles.bezel, className)} {...rest}>
      <div className={styles.glass}>
        {scanlines && <div className={styles.scanlines} aria-hidden="true" />}
        {(nodeId || status) && (
          <div className={styles.statusRow}>
            <span>{nodeId}</span>
            {status && (
              <span className={classNames(styles.status, styles[status])}>
                {status !== "off" && (
                  <span className={styles.dot} aria-hidden="true" />
                )}
                {status.toUpperCase()}
              </span>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
