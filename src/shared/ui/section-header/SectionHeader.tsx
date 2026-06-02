import type { HTMLAttributes, ReactNode } from "react";

import styles from "./SectionHeader.module.css";

export type SectionHeaderAlign = "left" | "center";

interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  align?: SectionHeaderAlign;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
}

function buildSectionHeaderClassName({
  align,
  className,
}: {
  align: SectionHeaderAlign;
  className?: string;
}) {
  return [
    styles.sectionHeader,
    styles[`align-${align}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function SectionHeader({
  align = "left",
  className,
  description,
  eyebrow,
  title,
  titleId,
  ...headerProps
}: SectionHeaderProps) {
  return (
    <header
      className={buildSectionHeaderClassName({ align, className })}
      {...headerProps}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title} id={titleId}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
