import type { Project, ProjectKind, ProjectStatus } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectArchitecture.module.css";

const kindLabelMap: Record<ProjectKind, string> = {
  academic: "Académico",
  collaborative: "Colaborativo",
  experimental: "Experimental",
  personal: "Personal",
  professional: "Profesional",
};

const statusLabelMap: Record<ProjectStatus, string> = {
  archived: "Archivado",
  completed: "Completado",
  deployed: "Deploy público",
  "in-progress": "En progreso",
  planned: "Planificado",
  private: "Privado",
};

interface ProjectArchitectureProps {
  project: Project;
}

export function ProjectArchitecture({ project }: ProjectArchitectureProps) {
  return (
    <ProjectDetailSection
      title="Arquitectura y evidencias"
      titleId="project-architecture-title"
      tone="blue"
    >
      <dl className={styles.metaList}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Tipo</dt>
          <dd className={styles.metaValue}>{kindLabelMap[project.kind]}</dd>
        </div>

        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Estado</dt>
          <dd className={styles.metaValue}>{statusLabelMap[project.status]}</dd>
        </div>

        {project.startedAt ? (
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Inicio</dt>
            <dd className={styles.metaValue}>{project.startedAt}</dd>
          </div>
        ) : null}

        {project.completedAt ? (
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Cierre</dt>
            <dd className={styles.metaValue}>{project.completedAt}</dd>
          </div>
        ) : null}

        {project.githubRepos && project.githubRepos.length > 0
          ? project.githubRepos.map((repo) => (
              <div className={styles.metaItem} key={`${repo.owner}/${repo.name}`}>
                <dt className={styles.metaLabel}>
                  {repo.label ?? "Repositorio"}
                </dt>
                <dd className={styles.metaValue}>
                  <a
                    className={styles.repoLink}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repo.owner}/{repo.name}
                  </a>
                </dd>
              </div>
            ))
          : null}
      </dl>

      {project.metrics && project.metrics.length > 0 ? (
        <div className={styles.metricsGrid}>
          {project.metrics.map((metric) => (
            <div className={styles.metricCard} key={metric.label}>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricLabel}>{metric.label}</p>
              {metric.description ? (
                <p className={styles.metricDesc}>{metric.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </ProjectDetailSection>
  );
}
