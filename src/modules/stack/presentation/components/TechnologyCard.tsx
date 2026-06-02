import type { Technology, TechnologyCategory } from "@/modules/stack/domain/Technology";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

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

function getProjectCountLabel(count: number) {
  if (count === 0) {
    return "Exploratorio";
  }

  if (count === 1) {
    return "1 proyecto";
  }

  return `${count} proyectos`;
}

function getToneByCategory(category: TechnologyCategory) {
  if (category === "frontend") {
    return "cyan";
  }

  if (category === "backend" || category === "database") {
    return "blue";
  }

  if (category === "devops" || category === "cloud") {
    return "magenta";
  }

  return "purple";
}

export function TechnologyCard({ technology }: TechnologyCardProps) {
  const projectCount = technology.projectSlugs.length;

  return (
    <SpotlightCard
      as="article"
      className={styles.card}
      contentClassName={styles.cardContent}
      tone={getToneByCategory(technology.category)}
      variant={technology.featured ? "featured" : "default"}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.category}>{categoryLabelMap[technology.category]}</p>
          <h3 className={styles.title}>{technology.name}</h3>
        </div>

        {technology.featured ? <span className={styles.featuredBadge}>Featured</span> : null}
      </div>

      <p className={styles.description}>{technology.description}</p>

      <p className={styles.projectCount}>{getProjectCountLabel(projectCount)}</p>
    </SpotlightCard>
  );
}
