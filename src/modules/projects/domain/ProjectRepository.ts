import type { Project, ProjectFilter } from "@/modules/projects/domain/Project";

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findFeatured(): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  findByFilter(filter: ProjectFilter): Promise<Project[]>;
}
