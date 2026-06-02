import { Link } from "react-router-dom";

import type { Project, ProjectCategory, ProjectLink } from "@/modules/projects/domain/Project";
import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import type { ProjectBadgeVariant } from "@/shared/ui/badge/ProjectBadge";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import type { TechBadgeTone } from "@/shared/ui/badge/TechBadge";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  className?: string;
  featured?: boolean;
  project: Project;
}

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

const techToneMap: Record<string, TechBadgeTone> = {
  frontend: "cyan",
  backend: "purple",
  database: "blue",
  devops: "magenta",
  testing: "neutral",
  mobile: "magenta",
  language: "blue",
  tool: "neutral",
  other: "neutral",
};

function buildCardClassName(className?: string) {
  return [styles.projectCard, className ?? ""].filter(Boolean).join(" ");
}

function getPrimaryImage(project: Project) {
  return project.images[0];
}

function getProjectTone(project: Project) {
  if (project.categories.includes("fullstack")) {
    return "cyan";
  }

  if (project.categories.includes("frontend")) {
    return "blue";
  }

  if (project.categories.includes("mobile")) {
    return "magenta";
  }

  return "purple";
}

function getFeaturedStack(project: Project) {
  const featuredTech = project.stack.filter((tech) => tech.featured === true);
  const fallbackTech = project.stack.filter(
    (tech) => !featuredTech.some((featured) => featured.name === tech.name),
  );

  return [...featuredTech, ...fallbackTech].slice(0, 5);
}

function getProjectLink(project: Project, type: ProjectLink["type"]) {
  return project.links.find((link) => link.type === type && link.url);
}

export function ProjectCard({ className, featured = false, project }: ProjectCardProps) {
  const image = getPrimaryImage(project);
  const demoLink = getProjectLink(project, "demo");
  const repositoryLink = getProjectLink(project, "repository");
  const documentationLink = getProjectLink(project, "documentation");
  const stack = getFeaturedStack(project);

  return (
    <SpotlightCard
      as="article"
      className={buildCardClassName(className)}
      contentClassName={styles.cardContent}
      tone={getProjectTone(project)}
      variant={featured || project.featured ? "featured" : "default"}
    >
      <div className={styles.imageFrame}>
        {image ? (
          <img className={styles.image} src={image.src} alt={image.alt} loading="lazy" />
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.badges} aria-label={`Categorías de ${project.title}`}>
          {project.categories.slice(0, 3).map((category) => (
            <ProjectBadge
              key={category}
              label={categoryLabelMap[category]}
              variant={categoryVariantMap[category]}
            />
          ))}
        </div>

        <div className={styles.copy}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.summary}>{project.summary}</p>
        </div>

        <div className={styles.stack} aria-label={`Stack principal de ${project.title}`}>
          {stack.map((tech) => (
            <TechBadge
              key={`${project.id}-${tech.name}`}
              label={tech.name}
              tone={tech.featured ? "cyan" : techToneMap[tech.category]}
            />
          ))}
        </div>

        <div className={styles.actions} aria-label={`Acciones para ${project.title}`}>
          <Link className={styles.primaryAction} to={`/proyectos/${project.slug}`}>
            Detalles
          </Link>

          {demoLink ? (
            <a
              className={styles.secondaryAction}
              href={demoLink.url}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          ) : null}

          {repositoryLink ? (
            <a
              className={styles.secondaryAction}
              href={repositoryLink.url}
              target="_blank"
              rel="noreferrer"
            >
              Código
            </a>
          ) : null}

          {documentationLink ? (
            <a
              className={styles.secondaryAction}
              href={documentationLink.url}
              target="_blank"
              rel="noreferrer"
            >
              Documentación
            </a>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}
