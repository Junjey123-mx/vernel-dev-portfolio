import type { Project } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectDecisions.module.css";

interface ProjectDecisionsProps {
  project: Project;
}

export function ProjectDecisions({ project }: ProjectDecisionsProps) {
  return (
    <ProjectDetailSection
      title="Decisiones técnicas"
      titleId="project-decisions-title"
      tone="magenta"
    >
      <ul className={styles.list}>
        {project.decisions.map((decision) => (
          <li className={styles.item} key={decision.title}>
            <span className={styles.itemTitle}>{decision.title}</span>
            <span className={styles.itemDesc}>{decision.description}</span>
            {decision.reason ? (
              <span className={styles.itemReason}>Motivo: {decision.reason}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </ProjectDetailSection>
  );
}
