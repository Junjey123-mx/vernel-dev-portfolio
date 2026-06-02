import type { TechnologyGroup } from "@/modules/stack/domain/Technology";

import { TechnologyCard } from "./TechnologyCard";

import styles from "./StackLevelSection.module.css";

interface StackLevelSectionProps {
  group: TechnologyGroup;
}

function getTechnologyCountLabel(count: number) {
  if (count === 1) {
    return "1 tecnología";
  }

  return `${count} tecnologías`;
}

export function StackLevelSection({ group }: StackLevelSectionProps) {
  return (
    <section className={styles.levelSection} aria-labelledby={`stack-level-${group.level}`}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{getTechnologyCountLabel(group.technologies.length)}</p>
          <h2 className={styles.title} id={`stack-level-${group.level}`}>
            {group.title}
          </h2>
        </div>

        <p className={styles.description}>{group.description}</p>
      </div>

      <div className={styles.grid}>
        {group.technologies.map((technology) => (
          <TechnologyCard key={technology.id} technology={technology} />
        ))}
      </div>
    </section>
  );
}
