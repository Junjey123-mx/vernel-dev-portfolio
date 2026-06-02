export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "api"
  | "mobile"
  | "database"
  | "docker"
  | "academic"
  | "collaborative"
  | "deployed"
  | "case-study"
  | "game"
  | "systems";

export type ProjectStatus =
  | "planned"
  | "in-progress"
  | "completed"
  | "deployed"
  | "archived"
  | "private";

export type ProjectKind =
  | "personal"
  | "academic"
  | "collaborative"
  | "professional"
  | "experimental";

export type ProjectLinkType =
  | "demo"
  | "repository"
  | "api"
  | "documentation"
  | "case-study"
  | "download"
  | "other";

export interface ProjectLink {
  label: string;
  type: ProjectLinkType;
  url: string;
  external: boolean;
}

export interface GithubRepoRef {
  owner: string;
  name: string;
  url: string;
  branch?: string;
}

export interface ProjectTech {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "testing"
    | "mobile"
    | "language"
    | "tool"
    | "other";
  featured?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectDecision {
  title: string;
  description: string;
  reason?: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
  solution?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  description: string;
  role: string;
  kind: ProjectKind;
  status: ProjectStatus;
  categories: ProjectCategory[];
  stack: ProjectTech[];
  highlights: ProjectHighlight[];
  decisions: ProjectDecision[];
  challenges: ProjectChallenge[];
  improvements: string[];
  links: ProjectLink[];
  github?: GithubRepoRef;
  images: ProjectImage[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  priority?: number;
  startedAt?: string;
  completedAt?: string;
}

export interface ProjectFilter {
  category?: ProjectCategory;
  status?: ProjectStatus;
  kind?: ProjectKind;
  featuredOnly?: boolean;
  query?: string;
}
