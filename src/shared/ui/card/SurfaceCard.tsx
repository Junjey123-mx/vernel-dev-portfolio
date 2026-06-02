import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";
import type { CardElement, CardVariant } from "./GlassCard";

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
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
    styles.surfaceCard,
    styles[`variant-${variant}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function SurfaceCard({
  as: Component = "article",
  children,
  className,
  variant = "default",
  ...cardProps
}: SurfaceCardProps) {
  return (
    <Component className={buildCardClassName({ className, variant })} {...cardProps}>
      {children}
    </Component>
  );
}
