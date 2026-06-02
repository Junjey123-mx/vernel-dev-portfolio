import type { Project } from "@/modules/projects/domain/Project";

export function getProjectBySlug(projects: Project[], slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  return projects.find((project) => project.slug.toLowerCase() === normalizedSlug) ?? null;
}
