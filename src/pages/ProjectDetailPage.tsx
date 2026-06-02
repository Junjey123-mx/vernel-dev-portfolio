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

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(projects, slug ?? "");

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <section className="responsive-stack" aria-labelledby="project-detail-title">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectStack project={project} />

      <div className="responsive-grid">
        <ProjectArchitecture project={project} />
        <GithubStatsCard repository={project.github} />
      </div>

      <div className="responsive-grid">
        <ProjectHighlights project={project} />
        <ProjectDecisions project={project} />
      </div>

      <ProjectChallenges project={project} />
      <ProjectLinks project={project} />
    </section>
  );
}
