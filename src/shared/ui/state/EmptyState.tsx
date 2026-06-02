import type { HTMLAttributes, ReactNode } from "react";

import styles from "./State.module.css";

interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  action?: ReactNode;
  className?: string;
  message?: ReactNode;
  title?: ReactNode;
}

function buildStateClassName(className?: string) {
  return [styles.state, styles.emptyState, className ?? ""].filter(Boolean).join(" ");
}

export function EmptyState({
  action,
  className,
  message = "Todavía no hay información para mostrar.",
  title = "Sin resultados",
  ...stateProps
}: EmptyStateProps) {
  return (
    <section className={buildStateClassName(className)} {...stateProps}>
      <span className={styles.emptyIcon} aria-hidden="true">
        ◇
      </span>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </section>
  );
}
