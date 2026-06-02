import { filterProjects } from "@/modules/projects/application/filterProjects";
import { projects } from "@/modules/projects/infrastructure/local/projects.data";
import { EmptyState } from "@/shared/ui/state/EmptyState";
import { useProjectFilterStore } from "@/store/useProjectFilterStore";

import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";

import styles from "./ProjectsGrid.module.css";

export function ProjectsGrid() {
  const activeFilter = useProjectFilterStore((state) => state.activeFilter);
  const resetFilter = useProjectFilterStore((state) => state.resetFilter);
  const filteredProjects = filterProjects(projects, activeFilter);
  const projectCount = filteredProjects.length;

  return (
    <div className={styles.projectsGridSection}>
      <div className={styles.toolbar}>
        <ProjectFilters />

        <p className={styles.resultCount} aria-live="polite">
          {projectCount === 1 ? "1 proyecto encontrado" : `${projectCount} proyectos encontrados`}
        </p>
      </div>

      {projectCount > 0 ? (
        <div className={styles.grid} aria-label="Listado de proyectos">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={project.featured} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Sin proyectos para este filtro"
          message="Prueba con otra categoría o limpia los filtros para ver todos los proyectos."
          action={
            <button className={styles.resetButton} type="button" onClick={resetFilter}>
              Limpiar filtros
            </button>
          }
        />
      )}
    </div>
  );
}
