export type TechnologyLevel = "advanced" | "intermediate" | "basic";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "testing"
  | "mobile"
  | "language"
  | "tool"
  | "cloud"
  | "api"
  | "design"
  | "other";

export interface Technology {
  category: TechnologyCategory;
  description: string;
  featured?: boolean;
  id: string;
  level: TechnologyLevel;
  name: string;
  projectSlugs: string[];
}

export interface TechnologyGroup {
  description: string;
  level: TechnologyLevel;
  technologies: Technology[];
  title: string;
}

export interface TechnologyFilter {
  category?: TechnologyCategory;
  level?: TechnologyLevel;
  query?: string;
}
