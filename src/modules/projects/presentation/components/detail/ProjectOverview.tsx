import type { Project } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-overview-title">
      <h2 id="project-overview-title">Resumen del proyecto</h2>
      <p>{project.description}</p>
      <p>
        <strong>Rol:</strong> {project.role}
      </p>
    </SurfaceCard>
  );
}
