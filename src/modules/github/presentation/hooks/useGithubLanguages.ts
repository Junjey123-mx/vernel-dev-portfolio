import { useQuery } from "@tanstack/react-query";

import type { GithubRepoRef } from "@/modules/projects/domain/Project";

const GITHUB_LANGUAGES_STALE_TIME = 1000 * 60 * 30;
const GITHUB_API_BASE_URL = "https://api.github.com";

export interface GitHubLanguagesResult {
  data: Record<string, number> | null;
  error: string | null;
}

interface GitHubApiErrorResponse {
  message?: string;
}

function hasRepositoryRef(repository?: GithubRepoRef | null) {
  return Boolean(repository?.owner && repository?.name);
}

function buildLanguagesUrl(repository: GithubRepoRef) {
  return `${GITHUB_API_BASE_URL}/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(
    repository.name,
  )}/languages`;
}

async function readGitHubErrorMessage(response: Response) {
  const fallbackMessage = `GitHub languages request failed with status ${response.status}`;

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

async function fetchGitHubLanguages(repository: GithubRepoRef): Promise<Record<string, number>> {
  const response = await fetch(buildLanguagesUrl(repository), {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(await readGitHubErrorMessage(response));
  }

  return response.json() as Promise<Record<string, number>>;
}

async function getGitHubLanguagesSafe(repository: GithubRepoRef): Promise<GitHubLanguagesResult> {
  try {
    const data = await fetchGitHubLanguages(repository);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "No se pudieron consultar los lenguajes.",
    };
  }
}

export function useGithubLanguages(repository?: GithubRepoRef | null) {
  return useQuery<GitHubLanguagesResult>({
    enabled: hasRepositoryRef(repository),
    queryFn: () => {
      if (!repository) {
        return Promise.resolve({
          data: null,
          error: "No se proporcionó un repositorio de GitHub.",
        });
      }

      return getGitHubLanguagesSafe(repository);
    },
    queryKey: ["github", "languages", repository?.owner ?? "", repository?.name ?? ""],
    staleTime: GITHUB_LANGUAGES_STALE_TIME,
  });
}
