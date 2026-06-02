import type { GitHubRepositoryApiResponse } from "@/modules/github/domain/GitHubRepository";

const GITHUB_API_BASE_URL = "https://api.github.com";

interface GitHubApiErrorResponse {
  documentation_url?: string;
  message?: string;
  status?: string;
}

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly responseUrl: string,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

function buildRepositoryUrl(owner: string, name: string) {
  return `${GITHUB_API_BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`;
}

async function readGitHubErrorMessage(response: Response) {
  const fallbackMessage = `GitHub API request failed with status ${response.status}`;

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

export async function fetchGitHubRepository(
  owner: string,
  name: string,
): Promise<GitHubRepositoryApiResponse> {
  const response = await fetch(buildRepositoryUrl(owner, name), {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    const message = await readGitHubErrorMessage(response);
    throw new GitHubApiError(message, response.status, response.url);
  }

  return response.json() as Promise<GitHubRepositoryApiResponse>;
}
