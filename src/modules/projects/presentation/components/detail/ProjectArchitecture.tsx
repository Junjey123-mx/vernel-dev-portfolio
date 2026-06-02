import type { Project, ProjectKind, ProjectStatus } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

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
    <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-architecture-title">
      <h2 id="project-architecture-title">Arquitectura y evidencias</h2>

      <dl>
        <div>
          <dt>Tipo de proyecto</dt>
          <dd>{kindLabelMap[project.kind]}</dd>
        </div>

        <div>
          <dt>Estado</dt>
          <dd>{statusLabelMap[project.status]}</dd>
        </div>

        {project.startedAt ? (
          <div>
            <dt>Inicio</dt>
            <dd>{project.startedAt}</dd>
          </div>
        ) : null}

        {project.completedAt ? (
          <div>
            <dt>Cierre</dt>
            <dd>{project.completedAt}</dd>
          </div>
        ) : null}

        {project.github ? (
          <div>
            <dt>Repositorio principal</dt>
            <dd>
              <a href={project.github.url} target="_blank" rel="noreferrer">
                {project.github.owner}/{project.github.name}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      {project.metrics && project.metrics.length > 0 ? (
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
      ) : null}
    </SurfaceCard>
  );
}
