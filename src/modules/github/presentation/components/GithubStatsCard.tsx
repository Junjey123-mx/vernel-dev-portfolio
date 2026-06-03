import type { GithubRepoRef } from "@/modules/projects/domain/Project";
import { useGithubContributors } from "@/modules/github/presentation/hooks/useGithubContributors";
import { useGithubLanguages } from "@/modules/github/presentation/hooks/useGithubLanguages";
import { useGithubRepo } from "@/modules/github/presentation/hooks/useGithubRepo";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

import styles from "./GithubStatsCard.module.css";

interface GithubStatsCardProps {
  repository?: GithubRepoRef;
}

function formatDate(value?: string | null) {
  if (!value) {
    return "No disponible";
  }

  return new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatNumber(value?: number | null) {
  if (typeof value !== "number") {
    return "0";
  }

  return new Intl.NumberFormat("es-GT").format(value);
}


function getPrimaryLanguage(
  languages?: Record<string, number> | null,
  fallbackLanguage?: string | null,
) {
  if (languages && Object.keys(languages).length > 0) {
    return Object.entries(languages).sort(([, firstBytes], [, secondBytes]) => {
      return secondBytes - firstBytes;
    })[0][0];
  }

  return fallbackLanguage ?? "No detectado";
}

export function GithubStatsCard({ repository }: GithubStatsCardProps) {
  const repoQuery = useGithubRepo(repository);
  const languagesQuery = useGithubLanguages(repository);
  const contributorsQuery = useGithubContributors(repository);

  if (!repository) {
    return null;
  }

  const repoResult = repoQuery.data;
  const languagesResult = languagesQuery.data;
  const contributorsResult = contributorsQuery.data;
  const repo = repoResult?.data ?? null;
  const error =
    repoResult?.error ??
    languagesResult?.error ??
    contributorsResult?.error ??
    (repoQuery.error instanceof Error ? repoQuery.error.message : null) ??
    (languagesQuery.error instanceof Error ? languagesQuery.error.message : null) ??
    (contributorsQuery.error instanceof Error ? contributorsQuery.error.message : null);

  const isLoading = repoQuery.isLoading || languagesQuery.isLoading || contributorsQuery.isLoading;

  if (error && !repo) {
    return (
      <SurfaceCard as="section" className={styles.card} aria-labelledby="github-stats-title">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>GitHub API</p>
            <h2 className={styles.title} id="github-stats-title">
              Metadata no disponible
            </h2>
          </div>
        </div>

        <p className={styles.message}>
          No se pudo consultar GitHub en este momento. Puedes abrir el repositorio directamente.
        </p>

        <a className={styles.repoLink} href={repository.url} target="_blank" rel="noreferrer">
          Abrir repositorio
        </a>
      </SurfaceCard>
    );
  }

  if (isLoading && !repo) {
    return (
      <SurfaceCard as="section" className={styles.card} aria-labelledby="github-stats-title">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>GitHub API</p>
            <h2 className={styles.title} id="github-stats-title">
              Metadata GitHub
            </h2>
          </div>
        </div>

        <p className={styles.message}>Consultando metadata pública del repositorio...</p>
      </SurfaceCard>
    );
  }

  const contributors = contributorsResult?.data ?? [];
  const visibleContributors = contributors.slice(0, 3);
  const primaryLanguage = getPrimaryLanguage(languagesResult?.data, repo?.language);


  return (
    <SurfaceCard as="section" className={styles.card} aria-labelledby="github-stats-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>GitHub API</p>
          <h2 className={styles.title} id="github-stats-title">
            Metadata GitHub
          </h2>
        </div>

        <a className={styles.repoLink} href={repository.url} target="_blank" rel="noreferrer">
          Abrir repo
        </a>
      </div>

      <p className={styles.repoName}>{repo?.fullName ?? `${repository.owner}/${repository.name}`}</p>

      {error ? <p className={styles.warning}>Algunos datos dinámicos no están disponibles.</p> : null}

      <dl className={styles.statsGrid}>
        <div className={styles.statItem}>
          <dt>Stars</dt>
          <dd>{formatNumber(repo?.stars)}</dd>
        </div>

        <div className={styles.statItem}>
          <dt>Forks</dt>
          <dd>{formatNumber(repo?.forks)}</dd>
        </div>

        <div className={styles.statItem}>
          <dt>Último update</dt>
          <dd>{formatDate(repo?.updatedAt)}</dd>
        </div>

        <div className={styles.statItem}>
          <dt>Lenguaje principal</dt>
          <dd>{primaryLanguage}</dd>
        </div>
      </dl>

      <div className={styles.contributorsBlock}>
        <h3 className={styles.subTitle}>Contributors</h3>

        {visibleContributors.length > 0 ? (
          <ul className={styles.contributorList}>
            {visibleContributors.map((contributor) => (
              <li className={styles.contributorItem} key={contributor.id}>
                <a href={contributor.url} target="_blank" rel="noreferrer">
                  {contributor.login}
                </a>
                <span>{formatNumber(contributor.contributions)} commits</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.message}>Sin contributors disponibles.</p>
        )}
      </div>
    </SurfaceCard>
  );
}
