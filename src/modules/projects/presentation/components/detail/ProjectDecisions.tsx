import type { Project } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

interface ProjectDecisionsProps {
  project: Project;
}

export function ProjectDecisions({ project }: ProjectDecisionsProps) {
  return (
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
  );
}
