import { ProjectsGrid } from "@/modules/projects/presentation/components/ProjectsGrid";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

export function ProjectsPage() {
  return (
    <section className="responsive-stack" aria-labelledby="projects-title">
      <SectionHeader
        eyebrow="Proyectos"
        title="Galería de proyectos"
        titleId="projects-title"
        description="Explora proyectos personales, académicos y colaborativos filtrados por tipo de trabajo, stack técnico y estado de entrega."
      />

      <ProjectsGrid />
    </section>
  );
}
