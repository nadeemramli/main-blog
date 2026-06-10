import classNames from "classnames";

import {
  Badge,
  Key,
  Panel,
  Screen,
  type LedColor,
  type ScreenStatus,
} from "@/components/console";

import styles from "./ProjectCard.module.scss";

export type ProjectStatus = "live" | "in-development" | "prototype" | "archived";

export interface ProjectCardProps {
  slug: string;
  title: string;
  summary: string;
  images: string[];
  status: ProjectStatus;
  metric?: string;
  nodeId: string;
}

/* Status canon on the rack (design.md §6.4 + §5.6). */
const SCREEN_STATUS: Record<ProjectStatus, ScreenStatus> = {
  live: "live",
  "in-development": "sync",
  prototype: "idle",
  archived: "off",
};

const BADGE: Record<ProjectStatus, { led?: LedColor; label: string }> = {
  live: { led: "mint", label: "Live" },
  "in-development": { led: "red", label: "In Development" },
  prototype: { led: "amber", label: "Prototype" },
  archived: { label: "Archived" },
};

export const ProjectCard = ({
  slug,
  title,
  summary,
  images,
  status,
  metric,
  nodeId,
}: ProjectCardProps) => {
  const badge = BADGE[status];
  const image = images[0];

  return (
    <Panel
      as="article"
      className={classNames(
        styles.device,
        status === "archived" && styles.archived,
      )}
    >
      <Screen nodeId={nodeId} status={SCREEN_STATUS[status]}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className={styles.glassImage} />
        ) : (
          <div className={styles.idle}>
            <div className={styles.idleName}>{title}</div>
            {metric && <div className={styles.idleMetric}>{metric}</div>}
          </div>
        )}
      </Screen>
      <div className={styles.ink}>
        <h3 className={styles.name}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <Key href={`/projects/${slug}`}>Read Case Study →</Key>
          <Badge led={badge.led}>{badge.label}</Badge>
        </div>
      </div>
    </Panel>
  );
};
