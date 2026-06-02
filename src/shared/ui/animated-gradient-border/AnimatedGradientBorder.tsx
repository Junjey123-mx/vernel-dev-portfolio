import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./AnimatedGradientBorder.module.css";

export type AnimatedGradientBorderMode =
  | "rotate"
  | "stop-rotate-on-hover"
  | "pause-rotate-on-hover";

export type AnimatedGradientBorderElement = "div" | "section" | "article";

export interface AnimatedGradientBorderColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

interface AnimatedGradientBorderProps extends HTMLAttributes<HTMLElement> {
  animationMode?: AnimatedGradientBorderMode;
  animationSpeed?: number;
  as?: AnimatedGradientBorderElement;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  gradientColors?: AnimatedGradientBorderColors;
}

const defaultGradientColors: Required<AnimatedGradientBorderColors> = {
  primary: "#4de8e8",
  secondary: "#2f80ff",
  accent: "#d946ef",
};

function buildRootClassName({
  animationMode,
  className,
  disabled,
}: {
  animationMode: AnimatedGradientBorderMode;
  className?: string;
  disabled: boolean;
}) {
  return [
    styles.animatedGradientBorder,
    styles[`mode-${animationMode}`],
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
  animationSpeed,
  backgroundColor,
  borderRadius,
  borderWidth,
  gradientColors,
  style,
}: {
  animationSpeed: number;
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  gradientColors: AnimatedGradientBorderColors;
  style?: CSSProperties;
}): CSSProperties {
  const colors = {
    ...defaultGradientColors,
    ...gradientColors,
  };

  return {
    "--agb-primary": colors.primary,
    "--agb-secondary": colors.secondary,
    "--agb-accent": colors.accent,
    "--agb-background": backgroundColor,
    "--agb-radius": `${borderRadius}px`,
    "--agb-border-width": `${borderWidth}px`,
    "--agb-speed": `${animationSpeed}s`,
    ...style,
  } as CSSProperties;
}

export function AnimatedGradientBorder({
  animationMode = "rotate",
  animationSpeed = 1.4,
  as: Component = "div",
  backgroundColor = "rgba(7, 22, 29, 0.88)",
  borderRadius = 28,
  borderWidth = 1,
  children,
  className,
  contentClassName,
  disabled = false,
  gradientColors,
  style,
  ...borderProps
}: AnimatedGradientBorderProps) {
  return (
    <Component
      className={buildRootClassName({ animationMode, className, disabled })}
      style={createStyleVariables({
        animationSpeed,
        backgroundColor,
        borderRadius,
        borderWidth,
        gradientColors: gradientColors ?? defaultGradientColors,
        style,
      })}
      {...borderProps}
    >
      <div className={buildContentClassName(contentClassName)}>{children}</div>
    </Component>
  );
}

export const BorderRotate = AnimatedGradientBorder;
