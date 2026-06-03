import { ProjectsGrid } from "@/modules/projects/presentation/components/ProjectsGrid";
import { PageHeroView } from "@/shared/ui/page-hero/PageHeroView";

export function ProjectsPage() {
  return (
    <PageHeroView
      contentLabel="Listado de proyectos"
      description="Explora proyectos personales, académicos y colaborativos filtrados por tipo de trabajo, stack técnico y estado de entrega."
      eyebrow="Proyectos"
      title="Galería de proyectos"
      titleId="projects-title"
      tone="projects"
    >
      <ProjectsGrid />
    </PageHeroView>
  );
}
