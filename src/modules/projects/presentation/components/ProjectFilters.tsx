import type { ProjectCategory } from "@/modules/projects/domain/Project";
import { useProjectFilterStore } from "@/store/useProjectFilterStore";

import styles from "./ProjectFilters.module.css";

interface ProjectFilterOption {
  category?: ProjectCategory;
  label: string;
}

interface ProjectFiltersProps {
  className?: string;
}

const filterOptions: ProjectFilterOption[] = [
  {
    label: "Todos",
  },
  {
    label: "Full-stack",
    category: "fullstack",
  },
  {
    label: "Frontend",
    category: "frontend",
  },
  {
    label: "Mobile",
    category: "mobile",
  },
  {
    label: "Académico",
    category: "academic",
  },
  {
    label: "Colaborativo",
    category: "collaborative",
  },
  {
    label: "Deploy",
    category: "deployed",
  },
  {
    label: "Docker",
    category: "docker",
  },
];

function buildFiltersClassName(className?: string) {
  return [styles.filters, className ?? ""].filter(Boolean).join(" ");
}

function isAllFilterActive(activeCategory?: ProjectCategory) {
  return !activeCategory;
}

function isOptionActive(option: ProjectFilterOption, activeCategory?: ProjectCategory) {
  if (!option.category) {
    return isAllFilterActive(activeCategory);
  }

  return option.category === activeCategory;
}

export function ProjectFilters({ className }: ProjectFiltersProps) {
  const activeCategory = useProjectFilterStore((state) => state.activeFilter.category);
  const resetFilter = useProjectFilterStore((state) => state.resetFilter);
  const setFilter = useProjectFilterStore((state) => state.setFilter);

  function handleFilterClick(option: ProjectFilterOption) {
    if (!option.category) {
      resetFilter();
      return;
    }

    setFilter({ category: option.category });
  }

  return (
    <div className={buildFiltersClassName(className)} aria-label="Filtros de proyectos">
      {filterOptions.map((option) => {
        const isActive = isOptionActive(option, activeCategory);

        return (
          <button
            className={isActive ? `${styles.filterButton} ${styles.active}` : styles.filterButton}
            key={option.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleFilterClick(option)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
