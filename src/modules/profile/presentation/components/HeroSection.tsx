import { Link } from "react-router-dom";
import { Rocket, Download } from "lucide-react";
import { SiGithub } from "react-icons/si";

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
              <Rocket size={15} aria-hidden="true" />
              Ver proyectos
            </Link>

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
              href="/cv/vernel-josue-cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={15} aria-hidden="true" />
              Descargar CV
            </a>
          </div>
        </div>

        <TechSignalPanel />
      </div>
    </section>
  );
}
