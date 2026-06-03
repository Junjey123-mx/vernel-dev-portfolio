import { ExternalLink, FileText, Download, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";

import type { Project, ProjectLink } from "@/modules/projects/domain/Project";

import { ProjectDetailSection } from "./ProjectDetailSection";
import styles from "./ProjectLinks.module.css";

interface ProjectLinksProps {
  project: Project;
}

function getVisibleLinks(project: Project) {
  return project.links.filter((link) => Boolean(link.url));
}

const linkIconMap: Record<Exclude<ProjectLink["type"], "repository">, LucideIcon> = {
  demo: ExternalLink,
  documentation: FileText,
  api: Code2,
  "case-study": FileText,
  download: Download,
  other: ExternalLink,
};

const linkLabelMap: Record<ProjectLink["type"], string> = {
  repository: "Código",
  demo: "Demo",
  documentation: "Documentación",
  api: "API",
  "case-study": "Caso técnico",
  download: "Descarga",
  other: "Enlace",
};

export function ProjectLinks({ project }: ProjectLinksProps) {
  const visibleLinks = getVisibleLinks(project);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <ProjectDetailSection
      title="Links del proyecto"
      titleId="project-links-title"
      tone="cyan"
    >
      <div className={styles.linkGrid}>
        {visibleLinks.map((link) => {
          const label = link.label ?? linkLabelMap[link.type];
          if (link.type === "repository") {
            return (
              <a
                key={`${link.type}-${link.url}`}
                className={styles.linkCard}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub
                  className={styles.linkIcon}
                  style={{ width: 18, height: 18 }}
                  aria-hidden="true"
                />
                <span className={styles.linkLabel}>{label}</span>
                <ExternalLink className={styles.linkArrow} size={12} aria-hidden="true" />
              </a>
            );
          }
          const Icon = linkIconMap[link.type] ?? ExternalLink;
          return (
            <a
              key={`${link.type}-${link.url}`}
              className={styles.linkCard}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className={styles.linkIcon} size={18} aria-hidden="true" />
              <span className={styles.linkLabel}>{label}</span>
              <ExternalLink className={styles.linkArrow} size={12} aria-hidden="true" />
            </a>
          );
        })}

      </div>
    </ProjectDetailSection>
  );
}
