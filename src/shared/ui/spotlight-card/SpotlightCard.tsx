import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from "react";

import styles from "./SpotlightCard.module.css";

export type SpotlightCardVariant = "default" | "featured" | "subtle";
export type SpotlightCardTone = "cyan" | "blue" | "magenta" | "purple";
export type SpotlightCardElement = "div" | "section" | "article";

interface SpotlightCardProps extends HTMLAttributes<HTMLElement> {
  as?: SpotlightCardElement;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  interactive?: boolean;
  spotlightOpacity?: number;
  spotlightSize?: number;
  tone?: SpotlightCardTone;
  variant?: SpotlightCardVariant;
}

const toneColorMap: Record<SpotlightCardTone, string> = {
  cyan: "77, 232, 232",
  blue: "47, 128, 255",
  magenta: "217, 70, 239",
  purple: "139, 92, 246",
};

function buildRootClassName({
  className,
  disabled,
  interactive,
  tone,
  variant,
}: {
  className?: string;
  disabled: boolean;
  interactive: boolean;
  tone: SpotlightCardTone;
  variant: SpotlightCardVariant;
}) {
  return [
    styles.spotlightCard,
    styles[`variant-${variant}`],
    styles[`tone-${tone}`],
    interactive ? styles.interactive : "",
    disabled ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildContentClassName(contentClassName?: string) {
  return [styles.content, contentClassName ?? ""].filter(Boolean).join(" ");
}

function createStyleVariables({
  spotlightOpacity,
  spotlightSize,
  style,
  tone,
}: {
  spotlightOpacity: number;
  spotlightSize: number;
  style?: CSSProperties;
  tone: SpotlightCardTone;
}): CSSProperties {
  return {
    "--spotlight-color": toneColorMap[tone],
    "--spotlight-opacity": String(spotlightOpacity),
    "--spotlight-size": `${spotlightSize}px`,
    "--spotlight-x": "50%",
    "--spotlight-y": "50%",
    ...style,
  } as CSSProperties;
}

export function SpotlightCard({
  as: Component = "article",
  children,
  className,
  contentClassName,
  disabled = false,
  interactive = true,
  onPointerLeave,
  onPointerMove,
  spotlightOpacity = 0.22,
  spotlightSize = 320,
  style,
  tone = "cyan",
  variant = "default",
  ...cardProps
}: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    onPointerMove?.(event);

    if (!interactive || disabled) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    onPointerLeave?.(event);

    if (!interactive || disabled) {
      return;
    }

    const card = event.currentTarget;
    card.style.setProperty("--spotlight-x", "50%");
    card.style.setProperty("--spotlight-y", "50%");
  }

  return (
    <Component
      className={buildRootClassName({
        className,
        disabled,
        interactive,
        tone,
        variant,
      })}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={createStyleVariables({
        spotlightOpacity,
        spotlightSize,
        style,
        tone,
      })}
      {...cardProps}
    >
      <div className={buildContentClassName(contentClassName)}>{children}</div>
    </Component>
  );
}

export const GlowCard = SpotlightCard;
