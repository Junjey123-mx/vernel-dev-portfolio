import type { Project } from "@/modules/projects/domain/Project";

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

export function getFeaturedProjects(projects: Project[], limit?: number) {
  const featuredProjects = sortProjectsByPriority(
    projects.filter((project) => project.featured === true),
  );

  if (typeof limit === "number") {
    return featuredProjects.slice(0, limit);
  }

  return featuredProjects;
}
