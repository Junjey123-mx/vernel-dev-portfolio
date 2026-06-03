import type { Project } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectHighlights.module.css";

interface ProjectHighlightsProps {
  project: Project;
}

export function ProjectHighlights({ project }: ProjectHighlightsProps) {
  return (
    <ProjectDetailSection
      title="Highlights técnicos"
      titleId="project-highlights-title"
      tone="cyan"
    >
      <ul className={styles.list}>
        {project.highlights.map((highlight) => (
          <li className={styles.item} key={highlight.title}>
            <span className={styles.itemTitle}>{highlight.title}</span>
            <span className={styles.itemDesc}>{highlight.description}</span>
          </li>
        ))}
      </ul>
    </ProjectDetailSection>
  );
}
