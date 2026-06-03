import {
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    <div className={styles.profileStack}>
      <section className={styles.miniSection} aria-labelledby="about-facts-title">
        <div className={styles.sectionHeader}>
          <h2 id="about-facts-title" className={styles.sectionTitle}>
            Contexto académico
          </h2>
          <p className={styles.sectionIntro}>
            Estudio en la Universidad del Valle de Guatemala, donde he trabajado proyectos de
            frontend, backend, bases de datos, documentación técnica y despliegue. Mi portafolio
            reúne proyectos que puedo explicar, ejecutar y defender técnicamente.
          </p>
        </div>

        <SurfaceCard as="div" className={styles.sectionCard}>
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
      </section>

      <section className={styles.miniSection} aria-labelledby="about-learning-title">
        <div className={styles.sectionHeader}>
          <h2 id="about-learning-title" className={styles.sectionTitle}>
            Actualmente estoy fortaleciendo
          </h2>
          <p className={styles.sectionIntro}>
            Actualmente estoy fortaleciendo práctica técnica que me ayuda a convertir cada entrega
            en algo revisable, reproducible y mejor documentado.
          </p>
        </div>

        <SurfaceCard as="div" className={styles.sectionCard}>
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
        </SurfaceCard>
      </section>

      <section className={styles.miniSection} aria-labelledby="about-focus-title">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id="about-focus-title">
            Cómo trabajo
          </h2>
          <p className={styles.sectionIntro}>
            Me gusta dividir los proyectos por fases, hacer commits pequeños, validar el build
            antes de cerrar cambios y documentar las decisiones importantes para que el proyecto
            pueda revisarse sin depender solo de una explicación oral.
          </p>
        </div>

        <SurfaceCard as="div" className={styles.sectionCard}>
          <ul className={styles.focusList}>
            {workHabits.map((item) => (
              <li className={styles.focusItem} key={item}>
                <span className={styles.focusDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </section>
    </div>
  );
}
