import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import { TechSignalPanel } from "./TechSignalPanel";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} animate-slide-up`} style={{ animationDelay: '80ms' }}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            Disponible para trabajar
          </p>

          <h1 className={`${styles.title} animate-slide-up`} id="hero-title" style={{ animationDelay: '160ms' }}>
            Vernel Hernández
          </h1>

          <p className={`${styles.role} animate-slide-up`} style={{ animationDelay: '280ms' }}>Desarrollador web junior</p>

          <p className={`${styles.description} animate-slide-up`} style={{ animationDelay: '370ms' }}>
            Construyo SPAs modernas con React, TypeScript y APIs REST, cuidando arquitectura,
            experiencia de usuario y despliegue.
          </p>

          <div className={`${styles.actions} animate-slide-up`} aria-label="Acciones principales" style={{ animationDelay: '460ms' }}>
            <a className={`${styles.cta} ${styles.primaryCta}`} href="mailto:verneljosue@gmail.com">
              <Mail size={15} aria-hidden="true" />
              Correo
            </a>

            <a
              className={`${styles.cta} ${styles.secondaryCta}`}
              href="https://github.com/Junjey123-mx"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub aria-hidden="true" style={{ width: 15, height: 15 }} />
              GitHub
            </a>

            <a
              className={`${styles.cta} ${styles.ghostCta}`}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin aria-hidden="true" style={{ width: 15, height: 15 }} />
              LinkedIn
            </a>
          </div>
        </div>

        <TechSignalPanel />
      </div>
    </section>
  );
}
