import { Key, Panel, Screen } from "@/components/console";

import styles from "./ResourceCard.module.scss";

export interface ResourceCardProps {
  title: string;
  description: string;
  /** Pre-verified on disk by the server (null = render the idle state). */
  imageSrc: string | null;
  link: string;
  nodeId: string;
}

export function ResourceCard({
  title,
  description,
  imageSrc,
  link,
  nodeId,
}: ResourceCardProps) {
  return (
    <Panel as="article" padding="none" interactive className={styles.handheld}>
      <Screen nodeId={nodeId} status="live">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className={styles.glassImage} />
        ) : (
          <div className={styles.idle}>
            <div className={styles.idleName}>{title}</div>
            <div className={styles.idleDim}>EXTERNAL RESOURCE</div>
          </div>
        )}
      </Screen>
      <div className={styles.ink}>
        <h3 className={styles.name}>{title}</h3>
        <p className={styles.oneLiner}>{description}</p>
        <Key
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visitKey}
        >
          Visit Site
        </Key>
      </div>
    </Panel>
  );
}
