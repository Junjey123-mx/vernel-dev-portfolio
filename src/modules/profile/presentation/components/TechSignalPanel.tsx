import { BorderRotate } from "@/shared/ui/animated-gradient-border/AnimatedGradientBorder";
import { TechIcon } from "@/shared/ui/icon/TechIcon";

import styles from "./TechSignalPanel.module.css";

const signals = [
  { label: "React", value: "UI modular", glow: "cyan" as const },
  { label: "TypeScript", value: "tipado seguro", glow: "blue" as const },
  { label: "REST APIs", value: "consumo de datos", glow: "blue" as const },
  { label: "Docker", value: "entornos reproducibles", glow: "magenta" as const },
  { label: "PostgreSQL", value: "datos relacionales", glow: "purple" as const },
];

const tags = ["SPA", "API-ready", "Deploy"];

export function TechSignalPanel() {
  return (
    <BorderRotate
      className={styles.panelBorder}
      contentClassName={styles.panelContent}
      animationSpeed={2.6}
      borderRadius={32}
      borderWidth={1}
    >
      <aside className={styles.panel} aria-label="Resumen técnico del perfil">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Technical signal</p>
          <span className={styles.status} aria-label="Estado: en línea">
            <span className={styles.statusDot} aria-hidden="true" />
            Online
          </span>
        </div>

        <ul className={styles.signalList} aria-label="Stack técnico resumido">
          {signals.map((signal) => (
            <li className={styles.signalItem} key={signal.label}>
              <TechIcon
                name={signal.label}
                size="sm"
                glow={signal.glow}
                aria-hidden={true}
              />
              <span className={styles.signalLabel}>{signal.label}</span>
              <span className={styles.signalValue}>{signal.value}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Stack base para construir SPAs modernas, consumir APIs y preparar despliegues defendibles.
        </p>

        <div className={styles.tags} aria-label="Capacidades destacadas">
          {tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </aside>
    </BorderRotate>
  );
}
