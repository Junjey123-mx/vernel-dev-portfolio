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

export type ProjectBadgeSize = "xs" | "sm" | "md";

interface ProjectBadgeProps {
  label: string;
  variant?: ProjectBadgeVariant;
  size?: ProjectBadgeSize;
  className?: string;
}

function buildProjectBadgeClassName({
  variant,
  size,
  className,
}: {
  variant: ProjectBadgeVariant;
  size: ProjectBadgeSize;
  className?: string;
}) {
  return [
    styles.badge,
    styles.projectBadge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function ProjectBadge({
  className,
  label,
  size = "xs",
  variant = "featured",
}: ProjectBadgeProps) {
  return (
    <span className={buildProjectBadgeClassName({ variant, size, className })}>
      {label}
    </span>
  );
}
