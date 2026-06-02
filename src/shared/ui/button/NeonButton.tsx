import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./NeonButton.module.css";

export type NeonButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type NeonButtonSize = "sm" | "md" | "lg";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeonButtonVariant;
  size?: NeonButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

function buildClassName({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: NeonButtonVariant;
  size: NeonButtonSize;
  fullWidth: boolean;
  className?: string;
}) {
  return [
    styles.neonButton,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function NeonButton({
  children,
  className,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  size = "md",
  type = "button",
  variant = "primary",
  ...buttonProps
}: NeonButtonProps) {
  return (
    <button
      className={buildClassName({ variant, size, fullWidth, className })}
      disabled={disabled}
      type={type}
      aria-disabled={disabled}
      {...buttonProps}
    >
      {leftIcon ? <span className={styles.icon} aria-hidden="true">{leftIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {rightIcon ? <span className={styles.icon} aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}
