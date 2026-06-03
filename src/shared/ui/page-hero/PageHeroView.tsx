import type { ReactNode } from "react";

import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

import styles from "./PageHeroView.module.css";

type PageHeroTone = "projects" | "stack" | "process" | "about" | "contact";
type PageHeroSize = "hero" | "compact";

interface PageHeroViewProps {
  children: ReactNode;
  contentLabel: string;
  description: string;
  eyebrow: string;
  size?: PageHeroSize;
  title: string;
  titleId: string;
  tone: PageHeroTone;
}

export function PageHeroView({
  children,
  contentLabel,
  description,
  eyebrow,
  size = "hero",
  title,
  titleId,
  tone,
}: PageHeroViewProps) {
  return (
    <article className={`${styles.page} ${styles[`tone-${tone}`]} ${styles[`size-${size}`]}`}>
      <section className={styles.intro} aria-labelledby={titleId}>
        <div className={styles.introContent}>
          <SectionHeader
            align="center"
            className={styles.introHeader}
            eyebrow={eyebrow}
            title={title}
            titleId={titleId}
            description={description}
          />
        </div>
      </section>

      <section className={`${styles.content} view-divider`} aria-label={contentLabel}>
        {children}
      </section>
    </article>
  );
}
