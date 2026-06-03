import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";
import { BorderRotate } from "@/shared/ui/animated-gradient-border/AnimatedGradientBorder";

import styles from "./AboutIntroSection.module.css";

export function AboutIntroSection() {
  return (
    <section className={styles.aboutIntro} id="sobre-mi" aria-labelledby="home-about-title">
      <SectionHeader
        eyebrow="Sobre mí"
        title="Perfil técnico y académico"
        titleId="home-about-title"
        description="Una mirada breve a mi contexto universitario, mi forma de trabajar y el tipo de proyectos que estoy construyendo para convertir aprendizaje en evidencia real."
      />

      <div className={styles.content}>
        <BorderRotate
          as="article"
          className={`${styles.copyBorder} animate-slide-up`}
          contentClassName={styles.cardContent}
          style={{ animationDelay: "120ms" }}
          animationSpeed={2.8}
          borderRadius={28}
          borderWidth={1}
        >
          <div className={styles.copy}>
            <p>
              Soy estudiante de la Universidad del Valle de Guatemala y desarrollador web junior. Me
              enfoco en construir interfaces modernas, consumir APIs REST, documentar decisiones
              técnicas y convertir proyectos académicos o personales en evidencia real de aprendizaje.
            </p>
            <p>
              Me gusta dividir los proyectos por fases, hacer commits pequeños, validar el build antes
              de cerrar cambios y documentar las decisiones importantes para que el proyecto pueda
              revisarse sin depender solo de una explicación oral.
            </p>
          </div>
        </BorderRotate>

        <BorderRotate
          as="article"
          className={`${styles.photoBorder} animate-slide-up`}
          contentClassName={styles.photoContent}
          style={{ animationDelay: "240ms" }}
          animationSpeed={2.6}
          borderRadius={32}
          borderWidth={1}
        >
          <div className={styles.photoFrame}>
            <img
              className={styles.photo}
              src="/images/projects/yo.png"
              alt="Retrato profesional de Vernel Josué"
            />
          </div>
        </BorderRotate>
      </div>
    </section>
  );
}
