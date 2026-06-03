import { Layers, Database, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import type { SpotlightCardTone } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./StrengthsSection.module.css";

interface Strength {
  bullets: string[];
  description: string;
  icon: LucideIcon;
  number: string;
  tag: string;
  title: string;
  tone: SpotlightCardTone;
}

const strengths: Strength[] = [
  {
    number: "01",
    icon: Layers,
    title: "Frontend moderno",
    description:
      "Interfaces SPA claras, modulares y responsive, pensadas para crecer sin perder orden.",
    bullets: ["React + TypeScript", "Componentes reutilizables", "Accesibilidad base"],
    tag: "Interface",
    tone: "cyan",
  },
  {
    number: "02",
    icon: Database,
    title: "APIs y bases de datos",
    description:
      "Conecto frontend con datos reales: peticiones, estados de carga y errores controlados.",
    bullets: ["REST APIs", "PostgreSQL + Prisma", "TanStack Query"],
    tag: "Data flow",
    tone: "blue",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Documentación y deploy",
    description:
      "Entregas publicables con repos organizados, README útil y entornos reproducibles.",
    bullets: ["Git + GitHub", "Docker", "Vercel / Netlify"],
    tag: "Delivery",
    tone: "magenta",
  },
];

export function StrengthsSection() {
  return (
    <section className={styles.strengths} aria-labelledby="strengths-title">
      <SectionHeader
        align="center"
        eyebrow="Propuesta profesional"
        title="Fortalezas para construir productos web"
        titleId="strengths-title"
        description="Combino fundamentos de frontend, consumo de APIs, bases de datos y documentación para entregar interfaces claras, defendibles y publicables."
      />

      <div className={styles.grid}>
        {strengths.map((strength) => {
          const StrengthIcon = strength.icon;
          return (
            <SpotlightCard
              as="article"
              className={styles.card}
              contentClassName={styles.cardContent}
              key={strength.title}
              tone={strength.tone}
              variant="featured"
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <span className={styles.number}>{strength.number}</span>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <StrengthIcon size={20} />
                  </div>
                </div>
                <span className={styles.tag}>{strength.tag}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{strength.title}</h3>
                <p className={styles.cardDescription}>{strength.description}</p>
              </div>

              <ul className={styles.bulletList}>
                {strength.bullets.map((bullet) => (
                  <li className={styles.bulletItem} key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
