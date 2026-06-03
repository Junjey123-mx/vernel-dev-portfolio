import {
  GraduationCap,
  MapPin,
  Briefcase,
  Code2,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TechBadge } from "@/shared/ui/badge/TechBadge";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";

import styles from "./AboutProfile.module.css";

interface ProfileFact {
  icon: LucideIcon;
  label: string;
  value: string;
}

const profileFacts: ProfileFact[] = [
  {
    icon: GraduationCap,
    label: "Universidad",
    value: "Universidad del Valle de Guatemala",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Guatemala",
  },
  {
    icon: Briefcase,
    label: "Rol",
    value: "Desarrollador web junior",
  },
  {
    icon: Code2,
    label: "Enfoque",
    value: "SPAs, APIs REST, bases de datos y deploy",
  },
];

const technicalFocus = [
  "Frontend modular con React y TypeScript",
  "Consumo de APIs con estados de carga, error y vacío",
  "Modelado de datos y uso de bases relacionales",
  "Documentación clara para defender decisiones técnicas",
  "Git con commits pequeños, revisión y auditoría por fase",
  "Deploy público o ejecución reproducible",
];

const currentLearning = [
  "Arquitectura frontend con React + TypeScript",
  "Testing de componentes y flujos críticos",
  "APIs reales con fallback y manejo de errores",
  "Proyectos desplegados y defendibles",
];

export function AboutProfile() {
  return (
    <div className="responsive-stack">
      {/* Tarjeta principal de perfil */}
      <SpotlightCard as="article" tone="cyan" variant="featured">
        <div className={styles.profileCard}>
          <div className={styles.nameBlock}>
            <h2 className={styles.name}>Vernel Josué</h2>
            <p className={styles.bio}>
              Soy estudiante de la Universidad del Valle de Guatemala y desarrollador web junior
              enfocado en construir interfaces modernas, consumir APIs REST y entregar proyectos
              que se puedan revisar, ejecutar y defender técnicamente.
            </p>
          </div>

          <div className={styles.techCluster} aria-label="Tecnologías principales del perfil">
            <TechBadge label="React" tone="cyan" />
            <TechBadge label="TypeScript" tone="cyan" />
            <TechBadge label="REST APIs" tone="blue" />
            <TechBadge label="PostgreSQL" tone="blue" />
            <TechBadge label="Docker" tone="magenta" />
          </div>
        </div>
      </SpotlightCard>

      {/* Grid de datos + enfoque técnico */}
      <div className="responsive-grid">
        <SurfaceCard as="section" aria-labelledby="about-facts-title">
          <h2 id="about-facts-title" className={styles.focusSectionTitle} style={{ marginBottom: "1rem" }}>
            Datos principales
          </h2>
          <div className={styles.factsGrid}>
            {profileFacts.map((fact) => {
              const FactIcon = fact.icon;
              return (
                <div className={styles.factCard} key={fact.label}>
                  <div className={styles.factIconWrap}>
                    <FactIcon size={15} aria-hidden="true" />
                  </div>
                  <div className={styles.factBody}>
                    <p className={styles.factLabel}>{fact.label}</p>
                    <p className={styles.factValue}>{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SurfaceCard>

        <SurfaceCard as="section" aria-labelledby="about-focus-title">
          <div className={styles.focusCard}>
            <h2 className={styles.focusSectionTitle} id="about-focus-title">
              Enfoque técnico
            </h2>
            <ul className={styles.focusList}>
              {technicalFocus.map((item) => (
                <li className={styles.focusItem} key={item}>
                  <span className={styles.focusDot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SurfaceCard>
      </div>

      {/* Aprendizaje actual */}
      <SurfaceCard as="section" aria-labelledby="about-learning-title">
        <div className={styles.learningCard}>
          <h2 id="about-learning-title" className={styles.focusSectionTitle}>
            Aprendizaje actual
          </h2>
          <p className={styles.learningIntro}>
            Actualmente estoy fortaleciendo mi criterio frontend y full-stack mediante proyectos que
            combinan UI, arquitectura por módulos, consumo de APIs, documentación y despliegue.
          </p>
          <div className={styles.learningGrid}>
            {currentLearning.map((item) => (
              <div className={styles.learningItem} key={item}>
                <CheckCircle2
                  className={styles.learningIcon}
                  size={16}
                  aria-hidden="true"
                />
                <p className={styles.learningText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
