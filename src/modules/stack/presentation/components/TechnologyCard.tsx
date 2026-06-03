import type { Technology, TechnologyCategory } from "@/modules/stack/domain/Technology";
import { TechIcon } from "@/shared/ui/icon/TechIcon";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import styles from "./TechnologyCard.module.css";

interface TechnologyCardProps {
  technology: Technology;
}

const categoryLabelMap: Record<TechnologyCategory, string> = {
  api: "API",
  backend: "Backend",
  cloud: "Cloud",
  database: "Base de datos",
  design: "Diseño",
  devops: "DevOps",
  frontend: "Frontend",
  language: "Lenguaje",
  mobile: "Mobile",
  other: "Otro",
  testing: "Testing",
  tool: "Herramienta",
};

const levelLabelMap: Record<string, string> = {
  advanced: "Avanzado",
  intermediate: "Intermedio",
  basic: "Básico",
};

const levelDotsMap: Record<string, number> = {
  advanced: 3,
  intermediate: 2,
  basic: 1,
};

function getToneByCategory(category: TechnologyCategory) {
  if (category === "frontend") return "cyan";
  if (category === "backend" || category === "database") return "blue";
  if (category === "devops" || category === "cloud") return "magenta";
  return "purple";
}

function getGlowByCategory(category: TechnologyCategory): "cyan" | "blue" | "magenta" | "purple" | "neutral" {
  if (category === "frontend") return "cyan";
  if (category === "backend" || category === "database") return "blue";
  if (category === "devops" || category === "cloud") return "magenta";
  return "neutral";
}

function getProjectTitlesForTech(slugs: string[]) {
  return slugs
    .map((slug) => projects.find((p) => p.id === slug || p.slug === slug)?.shortTitle ?? slug)
    .slice(0, 3);
}

export function TechnologyCard({ technology }: TechnologyCardProps) {
  const dots = levelDotsMap[technology.level] ?? 1;
  const projectTitles = getProjectTitlesForTech(technology.projectSlugs);

  return (
    <SpotlightCard
      as="article"
      className={styles.card}
      contentClassName={styles.cardContent}
      tone={getToneByCategory(technology.category)}
      variant={technology.featured ? "featured" : "default"}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <TechIcon
            name={technology.name}
            size="lg"
            glow={getGlowByCategory(technology.category)}
            aria-hidden={true}
          />
          <div>
            <p className={styles.category}>{categoryLabelMap[technology.category]}</p>
            <h3 className={styles.title}>{technology.name}</h3>
          </div>
        </div>
      </div>

      <p className={styles.description}>{technology.description}</p>

      <div className={styles.footer}>
        <div className={styles.levelRow}>
          <span className={styles.levelLabel}>{levelLabelMap[technology.level] ?? technology.level}</span>
          <div className={styles.dots} aria-label={`Nivel: ${levelLabelMap[technology.level] ?? technology.level}`}>
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`${styles.dot} ${n <= dots ? styles.dotActive : styles.dotInactive}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {projectTitles.length > 0 ? (
          <div className={styles.usedIn}>
            <span className={styles.usedInLabel}>En:</span>
            {projectTitles.map((title) => (
              <span className={styles.projectChip} key={title}>{title}</span>
            ))}
            {technology.projectSlugs.length === 0 && (
              <span className={styles.exploratoryChip}>Exploratorio</span>
            )}
          </div>
        ) : (
          <div className={styles.usedIn}>
            <span className={styles.exploratoryChip}>Exploratorio</span>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
