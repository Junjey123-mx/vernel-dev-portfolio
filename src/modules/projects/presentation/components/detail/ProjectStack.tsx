import type { Project } from "@/modules/projects/domain/Project";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import type { TechBadgeTone } from "@/shared/ui/badge/TechBadge";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

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

interface ProjectStackProps {
  project: Project;
}

export function ProjectStack({ project }: ProjectStackProps) {
  return (
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
  );
}
