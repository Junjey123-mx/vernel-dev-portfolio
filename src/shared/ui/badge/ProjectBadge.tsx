import styles from "./Badge.module.css";

export type ProjectBadgeVariant =
  | "featured"
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "academic"
  | "collaborative"
  | "deployed"
  | "caseStudy"
  | "private";

interface ProjectBadgeProps {
  label: string;
  variant?: ProjectBadgeVariant;
  className?: string;
}

function buildProjectBadgeClassName({
  variant,
  className,
}: {
  variant: ProjectBadgeVariant;
  className?: string;
}) {
  return [
    styles.badge,
    styles.projectBadge,
    styles[`variant-${variant}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function ProjectBadge({
  className,
  label,
  variant = "featured",
}: ProjectBadgeProps) {
  return (
    <span className={buildProjectBadgeClassName({ variant, className })}>
      {label}
    </span>
  );
}
