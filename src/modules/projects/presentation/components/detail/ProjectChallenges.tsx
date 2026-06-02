import type { Project } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

interface ProjectChallengesProps {
  project: Project;
}

export function ProjectChallenges({ project }: ProjectChallengesProps) {
  return (
    <SurfaceCard as="section" className="responsive-stack" aria-labelledby="project-challenges-title">
      <h2 id="project-challenges-title">Retos y mejoras futuras</h2>

      <div className="responsive-stack">
        <div>
          <h3>Retos resueltos</h3>
          <ul>
            {project.challenges.map((challenge) => (
              <li key={challenge.title}>
                <strong>{challenge.title}:</strong> {challenge.description}
                {challenge.solution ? <> Solución: {challenge.solution}</> : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Mejoras futuras</h3>
          <ul>
            {project.improvements.map((improvement) => (
              <li key={improvement}>{improvement}</li>
            ))}
          </ul>
        </div>
      </div>
    </SurfaceCard>
  );
}
