import type { Project } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectChallenges.module.css";

interface ProjectChallengesProps {
  project: Project;
}

export function ProjectChallenges({ project }: ProjectChallengesProps) {
  return (
    <>
      <ProjectDetailSection
        title="Retos resueltos"
        titleId="project-challenges-title"
        tone="blue"
      >
        <ul className={styles.list}>
          {project.challenges.map((challenge) => (
            <li className={styles.item} key={challenge.title}>
              <span className={styles.itemTitle}>{challenge.title}</span>
              <span className={styles.itemDesc}>{challenge.description}</span>
              {challenge.solution ? (
                <span className={styles.itemSolution}>
                  Solución: {challenge.solution}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </ProjectDetailSection>

      <ProjectDetailSection
        title="Mejoras futuras"
        titleId="project-improvements-title"
        tone="cyan"
      >
        <ul className={styles.list}>
          {project.improvements.map((improvement) => (
            <li className={styles.plainItem} key={improvement}>
              {improvement}
            </li>
          ))}
        </ul>
      </ProjectDetailSection>
    </>
  );
}
