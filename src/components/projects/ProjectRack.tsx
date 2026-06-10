"use client";

import { useState } from "react";

import { Rocker, type RockerSide } from "@/components/console";
import { ProjectCard, type ProjectCardProps } from "@/components/ProjectCard";

import styles from "./ProjectRack.module.scss";

interface ProjectRackProps {
  projects: ProjectCardProps[];
}

/* ACTIVE = live or in-development; ALL is the default. */
const isActive = (status: ProjectCardProps["status"]) =>
  status === "live" || status === "in-development";

export const ProjectRack = ({ projects }: ProjectRackProps) => {
  const [filter, setFilter] = useState<RockerSide>("a");
  const visible =
    filter === "a" ? projects : projects.filter((p) => isActive(p.status));

  return (
    <div className={styles.rack}>
      <div className={styles.controls}>
        <Rocker
          labelA="All"
          labelB="Active"
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter projects by status"
        />
      </div>
      {visible.length === 0 ? (
        <div className={styles.empty}>No active devices</div>
      ) : (
        <div className={styles.grid}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </div>
  );
};
