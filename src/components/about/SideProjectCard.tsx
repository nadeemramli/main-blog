import {
  Badge,
  Key,
  Panel,
  Screen,
  type LedColor,
  type ScreenStatus,
} from "@/components/console";

import styles from "./SideProjectCard.module.scss";

interface SideProject {
  name: string;
  role?: string;
  description: string;
  status: string;
  link?: string;
}

interface SideProjectCardProps {
  project: SideProject;
  index: number;
}

/* Map the free-text status onto the canon (design.md §5.6). */
function statusVisuals(status: string): {
  screen: ScreenStatus;
  led?: LedColor;
} {
  const normalized = status.toLowerCase();
  if (normalized.includes("develop")) return { screen: "sync", led: "red" };
  if (normalized.includes("prototype")) return { screen: "idle", led: "amber" };
  if (normalized.includes("active") || normalized.includes("live"))
    return { screen: "live", led: "mint" };
  return { screen: "off" };
}

export default function SideProjectCard({
  project,
  index,
}: SideProjectCardProps) {
  const visuals = statusVisuals(project.status);
  const nodeId = `NODE-SIDE.${String(index + 1).padStart(2, "0")}`;

  return (
    <Panel as="article" padding="none" className={styles.device}>
      <Screen nodeId={nodeId} status={visuals.screen}>
        <div className={styles.idle}>
          <div className={styles.idleName}>{project.name}</div>
          {project.role && <div className={styles.idleRole}>{project.role}</div>}
        </div>
      </Screen>
      <div className={styles.ink}>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.actions}>
          {project.link ? (
            <Key href={project.link} target="_blank" rel="noopener noreferrer">
              Visit →
            </Key>
          ) : (
            <span />
          )}
          <Badge led={visuals.led}>{project.status}</Badge>
        </div>
      </div>
    </Panel>
  );
}
