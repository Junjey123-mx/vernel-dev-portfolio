import {
  GraduationCap,
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

const academicFacts: ProfileFact[] = [
  {
    icon: GraduationCap,
    label: "Universidad",
    value: "Universidad del Valle de Guatemala",
  },
  {
    icon: Code2,
    label: "Área",
    value: "Desarrollo web / sistemas",
  },
  {
    icon: Briefcase,
    label: "Enfoque",
    value: "Frontend, APIs, bases de datos y deploy",
  },
  {
    icon: CheckCircle2,
    label: "Objetivo",
    value: "Oportunidades junior y proyectos colaborativos",
  },
];

const workHabits = [
  "Analizo requisitos antes de escribir código",
  "Separo componentes, datos y estilos",
  "Manejo estados de carga, error y vacío",
  "Documento instalación, rutas y decisiones",
  "Reviso build, responsive y navegación",
];

const currentLearning = [
  "Arquitectura frontend con React + TypeScript",
  "Consumo de APIs reales",
  "Testing básico de componentes y flujos",
  "Deploys reproducibles",
  "Documentación técnica defendible",
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
              Soy estudiante de la Universidad del Valle de Guatemala y desarrollador web junior.
              Me enfoco en construir interfaces modernas, consumir APIs REST, documentar decisiones
              técnicas y convertir proyectos académicos o personales en evidencia real de aprendizaje.
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

      {/* Contexto académico + forma de trabajo */}
      <div className="responsive-grid">
        <SurfaceCard as="section" aria-labelledby="about-facts-title">
          <h2 id="about-facts-title" className={styles.focusSectionTitle} style={{ marginBottom: "1rem" }}>
            Contexto académico
          </h2>
          <p className={styles.sectionIntro}>
            Estudio en la Universidad del Valle de Guatemala, donde he trabajado proyectos de frontend,
            backend, bases de datos, documentación técnica y despliegue. Mi portafolio reúne proyectos
            que puedo explicar, ejecutar y defender técnicamente.
          </p>
          <div className={styles.factsGrid}>
            {academicFacts.map((fact) => {
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
              Cómo trabajo
            </h2>
            <p className={styles.sectionIntro}>
              Me gusta dividir los proyectos por fases, hacer commits pequeños, validar el build
              antes de cerrar cambios y documentar las decisiones importantes para que el proyecto
              pueda revisarse sin depender solo de una explicación oral.
            </p>
            <ul className={styles.focusList}>
              {workHabits.map((item) => (
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
            Actualmente estoy fortaleciendo
          </h2>
          <p className={styles.learningIntro}>
            Actualmente estoy fortaleciendo práctica técnica que me ayuda a convertir cada entrega
            en algo revisable, reproducible y mejor documentado.
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
