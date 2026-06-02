import { useQuery } from "@tanstack/react-query";

import type { GitHubRepositoryResult } from "@/modules/github/domain/GitHubRepository";
import type { GithubRepoRef } from "@/modules/projects/domain/Project";
import { getGitHubRepositoryMetadataSafe } from "@/modules/projects/infrastructure/github/githubRepository";

const GITHUB_REPO_STALE_TIME = 1000 * 60 * 10;

function hasRepositoryRef(repository?: GithubRepoRef | null) {
  return Boolean(repository?.owner && repository?.name);
}

export function useGithubRepo(repository?: GithubRepoRef | null) {
  return useQuery<GitHubRepositoryResult>({
    enabled: hasRepositoryRef(repository),
    queryFn: () => {
      if (!repository) {
        return Promise.resolve({
          data: null,
          error: "No se proporcionó un repositorio de GitHub.",
        });
      }

      return getGitHubRepositoryMetadataSafe(repository);
    },
    queryKey: ["github", "repo", repository?.owner ?? "", repository?.name ?? ""],
    staleTime: GITHUB_REPO_STALE_TIME,
  });
}
