import type { HTMLAttributes, ReactNode } from "react";

import styles from "./State.module.css";

interface ErrorStateProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  action?: ReactNode;
  className?: string;
  message?: ReactNode;
  title?: ReactNode;
}

function buildStateClassName(className?: string) {
  return [styles.state, styles.errorState, className ?? ""].filter(Boolean).join(" ");
}

export function ErrorState({
  action,
  className,
  message = "No se pudo cargar la información. Intenta nuevamente.",
  title = "Algo salió mal",
  ...stateProps
}: ErrorStateProps) {
  return (
    <section className={buildStateClassName(className)} role="alert" {...stateProps}>
      <span className={styles.errorIcon} aria-hidden="true">
        !
      </span>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </section>
  );
}
