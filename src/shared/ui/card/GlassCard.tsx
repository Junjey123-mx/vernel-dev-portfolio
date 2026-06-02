import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

export type CardVariant = "compact" | "default" | "featured";
export type CardElement = "article" | "section" | "div";

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}

function buildCardClassName({
  className,
  variant,
}: {
  className?: string;
  variant: CardVariant;
}) {
  return [
    styles.card,
    styles.glassCard,
    styles[`variant-${variant}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function GlassCard({
  as: Component = "article",
  children,
  className,
  variant = "default",
  ...cardProps
}: GlassCardProps) {
  return (
    <Component className={buildCardClassName({ className, variant })} {...cardProps}>
      {children}
    </Component>
  );
}
