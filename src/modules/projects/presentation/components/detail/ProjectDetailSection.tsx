import type { ReactNode } from "react";

import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import type { SpotlightCardTone } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./ProjectDetailSection.module.css";

interface ProjectDetailSectionProps {
  children: ReactNode;
  contentClassName?: string;
  title: string;
  titleId: string;
  tone?: SpotlightCardTone;
}

export function ProjectDetailSection({
  children,
  contentClassName,
  title,
  titleId,
  tone = "cyan",
}: ProjectDetailSectionProps) {
  const cardContentClass = [styles.cardContent, contentClassName ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <SpotlightCard as="div" tone={tone} contentClassName={cardContentClass}>
        {children}
      </SpotlightCard>
    </section>
  );
}
