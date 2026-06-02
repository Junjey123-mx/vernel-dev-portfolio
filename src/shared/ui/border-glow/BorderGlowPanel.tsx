import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from "react";

import styles from "./BorderGlowPanel.module.css";

export type BorderGlowPanelElement = "div" | "section" | "article";

export interface BorderGlowPanelColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

interface BorderGlowPanelProps extends HTMLAttributes<HTMLElement> {
  animated?: boolean;
  as?: BorderGlowPanelElement;
  backgroundColor?: string;
  borderRadius?: number;
  children: ReactNode;
  className?: string;
  colors?: BorderGlowPanelColors;
  coneSpread?: number;
  contentClassName?: string;
  disabled?: boolean;
  edgeSensitivity?: number;
  fillOpacity?: number;
  glowColor?: string;
  glowIntensity?: number;
  glowRadius?: number;
}

const defaultColors: Required<BorderGlowPanelColors> = {
  primary: "#4de8e8",
  secondary: "#2f80ff",
  accent: "#d946ef",
};

function buildRootClassName({
  animated,
  className,
  disabled,
}: {
  animated: boolean;
  className?: string;
  disabled: boolean;
}) {
  return [
    styles.borderGlowPanel,
    animated ? styles.animated : "",
    disabled ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildContentClassName(contentClassName?: string) {
  return [styles.content, contentClassName ?? ""].filter(Boolean).join(" ");
}

function normalizeAngle(angle: number) {
  return angle < 0 ? angle + 360 : angle;
}

function getPointerAngle(element: HTMLElement, x: number, y: number) {
  const { width, height } = element.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;
  const radians = Math.atan2(y - centerY, x - centerX);
  return normalizeAngle(radians * (180 / Math.PI) + 90);
}

function getEdgeProximity(element: HTMLElement, x: number, y: number) {
  const { width, height } = element.getBoundingClientRect();
  const distanceToEdge = Math.min(x, y, width - x, height - y);
  const maxDistance = Math.max(Math.min(width, height) / 2, 1);
  const proximity = 1 - Math.min(Math.max(distanceToEdge / maxDistance, 0), 1);

  return Math.round(proximity * 100);
}

function createStyleVariables({
  backgroundColor,
  borderRadius,
  colors,
  coneSpread,
  edgeSensitivity,
  fillOpacity,
  glowColor,
  glowIntensity,
  glowRadius,
  style,
}: {
  backgroundColor: string;
  borderRadius: number;
  colors: BorderGlowPanelColors;
  coneSpread: number;
  edgeSensitivity: number;
  fillOpacity: number;
  glowColor: string;
  glowIntensity: number;
  glowRadius: number;
  style?: CSSProperties;
}): CSSProperties {
  const resolvedColors = {
    ...defaultColors,
    ...colors,
  };

  return {
    "--border-glow-bg": backgroundColor,
    "--border-glow-radius": `${borderRadius}px`,
    "--border-glow-padding": `${glowRadius}px`,
    "--border-glow-edge-sensitivity": String(edgeSensitivity),
    "--border-glow-cone-spread": `${coneSpread}%`,
    "--border-glow-fill-opacity": String(fillOpacity),
    "--border-glow-intensity": String(glowIntensity),
    "--border-glow-color": glowColor,
    "--border-glow-primary": resolvedColors.primary,
    "--border-glow-secondary": resolvedColors.secondary,
    "--border-glow-accent": resolvedColors.accent,
    "--edge-proximity": "0",
    "--cursor-angle": "45deg",
    ...style,
  } as CSSProperties;
}

export function BorderGlowPanel({
  animated = false,
  as: Component = "article",
  backgroundColor = "rgba(7, 22, 29, 0.88)",
  borderRadius = 28,
  children,
  className,
  colors,
  coneSpread = 25,
  contentClassName,
  disabled = false,
  edgeSensitivity = 30,
  fillOpacity = 0.35,
  glowColor = "77 232 232",
  glowIntensity = 0.85,
  glowRadius = 40,
  onPointerLeave,
  onPointerMove,
  style,
  ...panelProps
}: BorderGlowPanelProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    onPointerMove?.(event);

    if (disabled) {
      return;
    }

    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    panel.style.setProperty("--edge-proximity", String(getEdgeProximity(panel, x, y)));
    panel.style.setProperty("--cursor-angle", `${getPointerAngle(panel, x, y)}deg`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    onPointerLeave?.(event);

    if (disabled) {
      return;
    }

    const panel = event.currentTarget;
    panel.style.setProperty("--edge-proximity", "0");
  }

  return (
    <Component
      className={buildRootClassName({ animated, className, disabled })}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={createStyleVariables({
        backgroundColor,
        borderRadius,
        colors: colors ?? defaultColors,
        coneSpread,
        edgeSensitivity,
        fillOpacity,
        glowColor,
        glowIntensity,
        glowRadius,
        style,
      })}
      {...panelProps}
    >
      <span className={styles.edgeLight} aria-hidden="true" />
      <div className={buildContentClassName(contentClassName)}>{children}</div>
    </Component>
  );
}

export const BorderGlow = BorderGlowPanel;
