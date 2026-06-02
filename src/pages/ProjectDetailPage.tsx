import { Link, useParams } from "react-router-dom";

import { getProjectBySlug } from "@/modules/projects/application/getProjectBySlug";
import type {
  Project,
  ProjectCategory,
  ProjectKind,
  ProjectLink,
  ProjectStatus,
} from "@/modules/projects/domain/Project";
import { projects } from "@/modules/projects/infrastructure/local/projects.data";
import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import type { ProjectBadgeVariant } from "@/shared/ui/badge/ProjectBadge";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import type { TechBadgeTone } from "@/shared/ui/badge/TechBadge";
import { GlassCard } from "@/shared/ui/card/GlassCard";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

import { NotFoundPage } from "./NotFoundPage";

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

const techToneMap: Record<Project["stack"][number]["category"], TechBadgeTone> = {
  backend: "purple",
  database: "blue",
  devops: "magenta",
  frontend: "cyan",
  language: "blue",
  mobile: "magenta",
  other: "neutral",
  testing: "neutral",
  tool: "neutral",
};

function getPrimaryImage(project: Project) {
  return project.images[0];
}

function getVisibleLinks(project: Project) {
  return project.links.filter((link) => Boolean(link.url));
}

function getLinkLabel(link: ProjectLink) {
  if (link.type === "repository") {
    return "Código";
  }

  if (link.type === "demo") {
    return "Demo";
  }

  if (link.type === "documentation") {
    return "Documentación";
  }

  if (link.type === "api") {
    return "API";
  }

  if (link.type === "case-study") {
    return "Caso técnico";
  }

  if (link.type === "download") {
    return "Descarga";
  }

  return link.label;
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(projects, slug ?? "");

  if (!project) {
    return <NotFoundPage />;
  }

  const image = getPrimaryImage(project);
  const visibleLinks = getVisibleLinks(project);

  return (
    <section className="responsive-stack" aria-labelledby="project-detail-title">
      <Link to="/proyectos">← Volver a proyectos</Link>

      <SectionHeader
        eyebrow={`${kindLabelMap[project.kind]} · ${statusLabelMap[project.status]}`}
        title={project.title}
        titleId="project-detail-title"
        description={project.summary}
      />

      {image ? (
        <GlassCard as="div" variant="featured">
          <img src={image.src} alt={image.alt} loading="lazy" />
        </GlassCard>
      ) : null}

      <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-overview-title">
        <h2 id="project-overview-title">Resumen del proyecto</h2>
        <p>{project.description}</p>
        <p>
          <strong>Rol:</strong> {project.role}
        </p>

        <div className="responsive-cluster" aria-label="Categorías del proyecto">
          {project.categories.map((category) => (
            <ProjectBadge
              key={category}
              label={categoryLabelMap[category]}
              variant={categoryVariantMap[category]}
            />
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-stack-title">
        <h2 id="project-stack-title">Stack técnico</h2>

        <div className="responsive-cluster" aria-label="Tecnologías del proyecto">
          {project.stack.map((tech) => (
            <TechBadge
              key={tech.name}
              label={tech.name}
              tone={tech.featured ? "cyan" : techToneMap[tech.category]}
            />
          ))}
        </div>
      </SurfaceCard>

      {project.metrics && project.metrics.length > 0 ? (
        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-metrics-title">
          <h2 id="project-metrics-title">Métricas y evidencias</h2>

          <div className="responsive-grid">
            {project.metrics.map((metric) => (
              <article key={metric.label}>
                <h3>{metric.label}</h3>
                <p>
                  <strong>{metric.value}</strong>
                </p>
                {metric.description ? <p>{metric.description}</p> : null}
              </article>
            ))}
          </div>
        </SurfaceCard>
      ) : null}

      <div className="responsive-grid">
        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-highlights-title">
          <h2 id="project-highlights-title">Highlights</h2>

          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight.title}>
                <strong>{highlight.title}:</strong> {highlight.description}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-decisions-title">
          <h2 id="project-decisions-title">Decisiones técnicas</h2>

          <ul>
            {project.decisions.map((decision) => (
              <li key={decision.title}>
                <strong>{decision.title}:</strong> {decision.description}
                {decision.reason ? <> Motivo: {decision.reason}</> : null}
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      <div className="responsive-grid">
        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-challenges-title">
          <h2 id="project-challenges-title">Retos resueltos</h2>

          <ul>
            {project.challenges.map((challenge) => (
              <li key={challenge.title}>
                <strong>{challenge.title}:</strong> {challenge.description}
                {challenge.solution ? <> Solución: {challenge.solution}</> : null}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-improvements-title">
          <h2 id="project-improvements-title">Mejoras futuras</h2>

          <ul>
            {project.improvements.map((improvement) => (
              <li key={improvement}>{improvement}</li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      {(visibleLinks.length > 0 || project.github) ? (
        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-links-title">
          <h2 id="project-links-title">Links del proyecto</h2>

          <div className="responsive-cluster">
            {visibleLinks.map((link) => (
              <a key={`${link.type}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                {getLinkLabel(link)}
              </a>
            ))}

            {project.github ? (
              <a href={project.github.url} target="_blank" rel="noreferrer">
                Repositorio GitHub
              </a>
            ) : null}
          </div>
        </SurfaceCard>
      ) : null}
    </section>
  );
}
