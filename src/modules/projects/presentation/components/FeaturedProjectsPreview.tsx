import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, ExternalLink, Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { getFeaturedProjects } from "@/modules/projects/application/getFeaturedProjects";
import { projects } from "@/modules/projects/infrastructure/local/projects.data";
import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./FeaturedProjectsPreview.module.css";

const featuredProjects = getFeaturedProjects(projects, 4);

function getProjectTone(index: number) {
  const tones = ["cyan", "blue", "magenta", "purple"] as const;
  return tones[index % tones.length];
}

function getPrimaryDemoLink(project: (typeof featuredProjects)[number]) {
  return project.links.find((link) => link.type === "demo" && link.url);
}

function getPrimaryRepositoryLink(project: (typeof featuredProjects)[number]) {
  return project.links.find((link) => link.type === "repository" && link.url);
}

function ImageFallback({ title }: { title: string }) {
  return (
    <div className={styles.imageFallback} aria-hidden="true">
      <Code2 className={styles.fallbackIcon} size={24} />
      <span className={styles.fallbackText}>{title}</span>
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const image = project.images[0];
  const demoLink = getPrimaryDemoLink(project);
  const repositoryLink = getPrimaryRepositoryLink(project);

  return (
    <SpotlightCard
      as="article"
      className={styles.card}
      contentClassName={styles.cardContent}
      tone={getProjectTone(index)}
      variant={project.priority === 1 ? "featured" : "default"}
    >
      <div className={styles.imageFrame}>
        {image && !imgError ? (
          <img
            className={styles.image}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImageFallback title={project.shortTitle ?? project.title} />
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.badges} aria-label="Categorías del proyecto">
          {project.categories.slice(0, 2).map((category) => (
            <ProjectBadge
              key={category}
              label={category}
              variant={category === "fullstack" ? "fullstack" : "featured"}
            />
          ))}
        </div>

        <div className={styles.copy}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.summary}>{project.summary}</p>
        </div>

        <div className={styles.stack} aria-label="Tecnologías principales">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge
              key={`${project.id}-${tech.name}`}
              label={tech.name}
              tone={tech.featured ? "cyan" : "neutral"}
            />
          ))}
        </div>

        <div className={styles.actions} aria-label={`Acciones para ${project.title}`}>
          <Link className={styles.primaryAction} to={`/proyectos/${project.slug}`}>
            <Eye size={13} aria-hidden="true" />
            Detalles
          </Link>

          {demoLink ? (
            <a
              className={styles.secondaryAction}
              href={demoLink.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver demo de ${project.title}`}
            >
              <ExternalLink size={12} aria-hidden="true" />
              Demo
            </a>
          ) : null}

          {repositoryLink ? (
            <a
              className={styles.secondaryAction}
              href={repositoryLink.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver código de ${project.title}`}
            >
              <SiGithub aria-hidden="true" style={{ width: 12, height: 12 }} />
              Código
            </a>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}

export function FeaturedProjectsPreview() {
  return (
    <section className={styles.featuredProjects} aria-labelledby="featured-projects-title">
      <div className={styles.headerRow}>
        <SectionHeader
          eyebrow="Proyectos destacados"
          title="Evidencia técnica con proyectos reales"
          titleId="featured-projects-title"
          description="Una selección de proyectos que muestran frontend moderno, integración con APIs, bases de datos, despliegue y criterio de arquitectura."
        />

        <Link className={styles.viewAllLink} to="/proyectos">
          Ver todos
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.grid}>
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
