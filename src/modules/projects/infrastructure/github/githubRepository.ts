import type {
  GitHubRepositoryApiResponse,
  GitHubRepositoryMetadata,
  GitHubRepositoryResult,
} from "@/modules/github/domain/GitHubRepository";
import type { GithubRepoRef } from "@/modules/projects/domain/Project";

import { fetchGitHubRepository, GitHubApiError } from "./githubApi";

function mapGitHubRepositoryResponse(
  response: GitHubRepositoryApiResponse,
): GitHubRepositoryMetadata {
  return {
    createdAt: response.created_at,
    defaultBranch: response.default_branch,
    description: response.description,
    forks: response.forks_count,
    fullName: response.full_name,
    id: String(response.id),
    isArchived: response.archived,
    isFork: response.fork,
    isPrivate: response.private,
    language: response.language,
    name: response.name,
    openIssues: response.open_issues_count,
    owner: {
      avatarUrl: response.owner.avatar_url,
      login: response.owner.login,
      url: response.owner.html_url,
    },
    pushedAt: response.pushed_at,
    stars: response.stargazers_count,
    topics: response.topics ?? [],
    updatedAt: response.updated_at,
    url: response.html_url,
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof GitHubApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudo consultar metadata del repositorio.";
}

export async function getGitHubRepositoryMetadata(
  repository: GithubRepoRef,
): Promise<GitHubRepositoryMetadata> {
  const response = await fetchGitHubRepository(repository.owner, repository.name);
  return mapGitHubRepositoryResponse(response);
}

export async function getGitHubRepositoryMetadataSafe(
  repository: GithubRepoRef,
): Promise<GitHubRepositoryResult> {
  try {
    const data = await getGitHubRepositoryMetadata(repository);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function getGitHubRepositoriesMetadata(
  repositories: GithubRepoRef[],
): Promise<GitHubRepositoryResult[]> {
  return Promise.all(
    repositories.map((repository) => getGitHubRepositoryMetadataSafe(repository)),
  );
}
