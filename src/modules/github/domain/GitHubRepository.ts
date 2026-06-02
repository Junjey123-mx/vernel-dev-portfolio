export interface GitHubRepositoryOwner {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface GitHubRepositoryMetadata {
  createdAt: string;
  defaultBranch: string;
  description: string | null;
  forks: number;
  fullName: string;
  id: string;
  isArchived: boolean;
  isFork: boolean;
  isPrivate: boolean;
  language: string | null;
  name: string;
  openIssues: number;
  owner: GitHubRepositoryOwner;
  pushedAt: string;
  stars: number;
  topics: string[];
  updatedAt: string;
  url: string;
}

export interface GitHubRepositoryApiOwnerResponse {
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface GitHubRepositoryApiResponse {
  archived: boolean;
  created_at: string;
  default_branch: string;
  description: string | null;
  fork: boolean;
  forks_count: number;
  full_name: string;
  html_url: string;
  id: number;
  language: string | null;
  name: string;
  open_issues_count: number;
  owner: GitHubRepositoryApiOwnerResponse;
  private: boolean;
  pushed_at: string;
  stargazers_count: number;
  topics?: string[];
  updated_at: string;
}

export interface GitHubRepositoryResult {
  data: GitHubRepositoryMetadata | null;
  error: string | null;
}
