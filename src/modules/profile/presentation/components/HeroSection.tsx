import { Link } from "react-router-dom";

import { ParticlesBackground } from "@/shared/effects/particles/ParticlesBackground";

import { TechSignalPanel } from "./TechSignalPanel";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <ParticlesBackground className={styles.particles} />

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Portafolio web</p>

          <h1 className={styles.title} id="hero-title">
            Vernel Josué
          </h1>

          <p className={styles.role}>Desarrollador web junior</p>

          <p className={styles.description}>
            Construyo SPAs modernas con React, TypeScript y APIs REST, cuidando arquitectura,
            experiencia de usuario y despliegue.
          </p>

          <div className={styles.actions} aria-label="Acciones principales">
            <Link className={`${styles.cta} ${styles.primaryCta}`} to="/proyectos">
              Ver proyectos
            </Link>

            <a
              className={`${styles.cta} ${styles.secondaryCta}`}
              href="https://github.com/Junjey123-mx"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              className={`${styles.cta} ${styles.ghostCta}`}
              href="/cv/vernel-josue-cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Descargar CV
            </a>
          </div>
        </div>

        <TechSignalPanel />
      </div>
    </section>
  );
}
