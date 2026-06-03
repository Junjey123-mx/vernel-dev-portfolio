import { techIconMap } from "./iconMap";
import styles from "./Icon.module.css";

type IconSize = "sm" | "md" | "lg" | "xl";
type IconGlow = "cyan" | "blue" | "magenta" | "purple" | "neutral";

interface TechIconProps {
  name: string;
  size?: IconSize;
  glow?: IconGlow;
  className?: string;
  "aria-hidden"?: boolean;
}

export function TechIcon({
  name,
  size = "md",
  glow = "neutral",
  className,
  "aria-hidden": ariaHidden = true,
}: TechIconProps) {
  const Icon = techIconMap[name];

  if (!Icon) {
    return null;
  }

  const cls = [
    styles.techIcon,
    styles[`size-${size}`],
    styles[`glow-${glow}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} aria-hidden={ariaHidden}>
      <Icon />
    </span>
  );
}
