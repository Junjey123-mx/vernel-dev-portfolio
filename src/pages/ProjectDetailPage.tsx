import { useParams } from "react-router-dom";

import { GithubStatsCard } from "@/modules/github/presentation/components/GithubStatsCard";
import { getProjectBySlug } from "@/modules/projects/application/getProjectBySlug";
import { ProjectArchitecture } from "@/modules/projects/presentation/components/detail/ProjectArchitecture";
import { ProjectChallenges } from "@/modules/projects/presentation/components/detail/ProjectChallenges";
import { ProjectDecisions } from "@/modules/projects/presentation/components/detail/ProjectDecisions";
import { ProjectHero } from "@/modules/projects/presentation/components/detail/ProjectHero";
import { ProjectHighlights } from "@/modules/projects/presentation/components/detail/ProjectHighlights";
import { ProjectLinks } from "@/modules/projects/presentation/components/detail/ProjectLinks";
import { ProjectOverview } from "@/modules/projects/presentation/components/detail/ProjectOverview";
import { ProjectStack } from "@/modules/projects/presentation/components/detail/ProjectStack";
import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import { NotFoundPage } from "./NotFoundPage";
import styles from "./ProjectDetailPage.module.css";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(projects, slug ?? "");

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <article className={styles.page} aria-labelledby="project-detail-title">

      {/* Hero: back link + title + badges + image */}
      <div className="animate-slide-up">
        <ProjectHero project={project} />
      </div>

      {/* Group 1: Resumen + Stack */}
      <div className={`${styles.group} animate-slide-up`} style={{ animationDelay: "80ms" }}>
        <ProjectOverview project={project} />
        <ProjectStack project={project} />
      </div>

      {/* Group 2: Arquitectura | GitHub stats */}
      <div className={`${styles.group} animate-slide-up`} style={{ animationDelay: "160ms" }}>
        <div className={styles.splitGroup}>
          <ProjectArchitecture project={project} />
          {project.githubRepos && project.githubRepos.length > 0 ? (
            <div className={styles.githubStack}>
              {project.githubRepos.map((repo) => (
                <GithubStatsCard key={`${repo.owner}/${repo.name}`} repository={repo} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Group 3: Highlights | Decisiones */}
      <div className={`${styles.group} animate-slide-up`} style={{ animationDelay: "240ms" }}>
        <div className={styles.splitGroup}>
          <ProjectHighlights project={project} />
          <ProjectDecisions project={project} />
        </div>
      </div>

      {/* Group 4: Retos resueltos | Mejoras futuras */}
      <div className={`${styles.group} animate-slide-up`} style={{ animationDelay: "320ms" }}>
        <div className={styles.splitGroup}>
          <ProjectChallenges project={project} />
        </div>
      </div>

      {/* Group 5: Links */}
      <div className={`${styles.group} animate-slide-up`} style={{ animationDelay: "400ms" }}>
        <ProjectLinks project={project} />
      </div>

    </article>
  );
}
