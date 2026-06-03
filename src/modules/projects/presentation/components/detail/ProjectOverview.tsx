import type { Project } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectOverview.module.css";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <ProjectDetailSection
      title="Resumen del proyecto"
      titleId="project-overview-title"
      tone="blue"
    >
      <p className={styles.description}>{project.description}</p>
      <p className={styles.role}>
        <span className={styles.roleLabel}>Rol</span>
        {project.role}
      </p>
    </ProjectDetailSection>
  );
}
