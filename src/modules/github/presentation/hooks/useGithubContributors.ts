import { useQuery } from "@tanstack/react-query";

import type { GithubRepoRef } from "@/modules/projects/domain/Project";

const GITHUB_CONTRIBUTORS_STALE_TIME = 1000 * 60 * 30;
const GITHUB_API_BASE_URL = "https://api.github.com";

export interface GitHubContributor {
  avatarUrl: string;
  contributions: number;
  id: string;
  login: string;
  url: string;
}

export interface GitHubContributorsResult {
  data: GitHubContributor[] | null;
  error: string | null;
}

interface GitHubContributorApiResponse {
  avatar_url: string;
  contributions: number;
  html_url: string;
  id: number;
  login: string;
}

interface GitHubApiErrorResponse {
  message?: string;
}

function hasRepositoryRef(repository?: GithubRepoRef | null) {
  return Boolean(repository?.owner && repository?.name);
}

function buildContributorsUrl(repository: GithubRepoRef) {
  return `${GITHUB_API_BASE_URL}/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(
    repository.name,
  )}/contributors`;
}

function mapContributor(response: GitHubContributorApiResponse): GitHubContributor {
  return {
    avatarUrl: response.avatar_url,
    contributions: response.contributions,
    id: String(response.id),
    login: response.login,
    url: response.html_url,
  };
}

async function readGitHubErrorMessage(response: Response) {
  const fallbackMessage = `GitHub contributors request failed with status ${response.status}`;

  try {
    const errorBody = (await response.json()) as GitHubApiErrorResponse;

    if (errorBody.message) {
      return `${fallbackMessage}: ${errorBody.message}`;
    }

    return fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

async function fetchGitHubContributors(repository: GithubRepoRef): Promise<GitHubContributor[]> {
  const response = await fetch(buildContributorsUrl(repository), {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(await readGitHubErrorMessage(response));
  }

  const contributors = (await response.json()) as GitHubContributorApiResponse[];

  return contributors.map(mapContributor);
}

async function getGitHubContributorsSafe(
  repository: GithubRepoRef,
): Promise<GitHubContributorsResult> {
  try {
    const data = await fetchGitHubContributors(repository);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "No se pudieron consultar los contribuidores.",
    };
  }
}

export function useGithubContributors(repository?: GithubRepoRef | null) {
  return useQuery<GitHubContributorsResult>({
    enabled: hasRepositoryRef(repository),
    queryFn: () => {
      if (!repository) {
        return Promise.resolve({
          data: null,
          error: "No se proporcionó un repositorio de GitHub.",
        });
      }

      return getGitHubContributorsSafe(repository);
    },
    queryKey: ["github", "contributors", repository?.owner ?? "", repository?.name ?? ""],
    staleTime: GITHUB_CONTRIBUTORS_STALE_TIME,
  });
}
