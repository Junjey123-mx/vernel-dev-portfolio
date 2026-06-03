import { Link } from "react-router-dom";

import type {
  Project,
  ProjectCategory,
  ProjectKind,
  ProjectStatus,
} from "@/modules/projects/domain/Project";
import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import type { ProjectBadgeVariant } from "@/shared/ui/badge/ProjectBadge";
import { GlassCard } from "@/shared/ui/card/GlassCard";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

import styles from "./ProjectHero.module.css";

const categoryLabelMap: Record<ProjectCategory, string> = {
  academic: "Académico",
  api: "API",
  backend: "Backend",
  "case-study": "Caso técnico",
  collaborative: "Colaborativo",
  database: "Base de datos",
  deployed: "Deploy",
  docker: "Docker",
  frontend: "Frontend",
  fullstack: "Full-stack",
  game: "Juego",
  mobile: "Mobile",
  systems: "Sistemas",
};

const categoryVariantMap: Record<ProjectCategory, ProjectBadgeVariant> = {
  academic: "academic",
  api: "backend",
  backend: "backend",
  "case-study": "caseStudy",
  collaborative: "collaborative",
  database: "backend",
  deployed: "deployed",
  docker: "fullstack",
  frontend: "frontend",
  fullstack: "fullstack",
  game: "featured",
  mobile: "mobile",
  systems: "academic",
};

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

interface ProjectHeroProps {
  project: Project;
}

function getPrimaryImage(project: Project) {
  return project.images[0];
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const image = getPrimaryImage(project);

  return (
    <div className={styles.hero}>
      <Link className={styles.backLink} to="/proyectos">← Volver a proyectos</Link>

      <SectionHeader
        eyebrow={`${kindLabelMap[project.kind]} · ${statusLabelMap[project.status]}`}
        title={project.title}
        titleId="project-detail-title"
        description={project.summary}
      />

      <div className="responsive-cluster" aria-label="Categorías del proyecto">
        {project.categories.map((category) => (
          <ProjectBadge
            key={category}
            label={categoryLabelMap[category]}
            variant={categoryVariantMap[category]}
          />
        ))}
      </div>

      {image ? (
        <div className={styles.imageWrap}>
          <GlassCard as="div" variant="featured">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}
