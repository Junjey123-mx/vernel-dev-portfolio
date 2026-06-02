import type { Project, ProjectFilter } from "@/modules/projects/domain/Project";

function getProjectPriority(project: Project) {
  return project.priority ?? Number.MAX_SAFE_INTEGER;
}

function sortProjectsByPriority(projects: Project[]) {
  return [...projects].sort((firstProject, secondProject) => {
    const priorityDifference = getProjectPriority(firstProject) - getProjectPriority(secondProject);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return firstProject.title.localeCompare(secondProject.title);
  });
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function projectMatchesQuery(project: Project, query: string) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableContent = [
    project.title,
    project.shortTitle,
    project.summary,
    project.description,
    project.role,
    project.kind,
    project.status,
    ...project.categories,
    ...project.stack.map((tech) => tech.name),
    ...project.highlights.map((highlight) => `${highlight.title} ${highlight.description}`),
    ...project.decisions.map((decision) => `${decision.title} ${decision.description}`),
    ...project.challenges.map((challenge) => `${challenge.title} ${challenge.description}`),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(normalizedQuery);
}

function projectMatchesFilter(project: Project, filter: ProjectFilter) {
  if (filter.category && !project.categories.includes(filter.category)) {
    return false;
  }

  if (filter.status && project.status !== filter.status) {
    return false;
  }

  if (filter.kind && project.kind !== filter.kind) {
    return false;
  }

  if (filter.featuredOnly && project.featured !== true) {
    return false;
  }

  if (filter.query && !projectMatchesQuery(project, filter.query)) {
    return false;
  }

  return true;
}

export function filterProjects(projects: Project[], filter: ProjectFilter = {}) {
  return sortProjectsByPriority(projects.filter((project) => projectMatchesFilter(project, filter)));
}
