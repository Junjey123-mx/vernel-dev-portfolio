import type { Project } from "@/modules/projects/domain/Project";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

interface ProjectHighlightsProps {
  project: Project;
}

export function ProjectHighlights({ project }: ProjectHighlightsProps) {
  return (
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
  );
}
