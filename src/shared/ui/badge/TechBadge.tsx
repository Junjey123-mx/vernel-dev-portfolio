import styles from "./Badge.module.css";

export type TechBadgeTone = "cyan" | "blue" | "magenta" | "purple" | "neutral";
export type TechBadgeSize = "sm" | "md";

interface TechBadgeProps {
  label: string;
  tone?: TechBadgeTone;
  size?: TechBadgeSize;
  className?: string;
}

function buildTechBadgeClassName({
  tone,
  size,
  className,
}: {
  tone: TechBadgeTone;
  size: TechBadgeSize;
  className?: string;
}) {
  return [
    styles.badge,
    styles.techBadge,
    styles[`tone-${tone}`],
    styles[`size-${size}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function TechBadge({
  className,
  label,
  size = "sm",
  tone = "cyan",
}: TechBadgeProps) {
  return (
    <span className={buildTechBadgeClassName({ tone, size, className })}>
      {label}
    </span>
  );
}
