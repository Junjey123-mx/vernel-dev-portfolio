import type { HTMLAttributes } from "react";

import styles from "./State.module.css";

interface LoadingStateProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  label?: string;
  message?: string;
}

function buildStateClassName(className?: string) {
  return [styles.state, styles.loadingState, className ?? ""].filter(Boolean).join(" ");
}

export function LoadingState({
  className,
  label = "Cargando",
  message = "Cargando información...",
  ...stateProps
}: LoadingStateProps) {
  return (
    <section
      aria-label={label}
      aria-live="polite"
      className={buildStateClassName(className)}
      role="status"
      {...stateProps}
    >
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </section>
  );
}
