import type { Project, ProjectLink } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

interface ProjectLinksProps {
  project: Project;
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

export function ProjectLinks({ project }: ProjectLinksProps) {
  const visibleLinks = getVisibleLinks(project);

  if (visibleLinks.length === 0 && !project.github) {
    return null;
  }

  return (
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
  );
}
