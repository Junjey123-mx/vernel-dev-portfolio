import {
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import { BorderGlowPanel } from "@/shared/ui/border-glow/BorderGlowPanel";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./ContactPanel.module.css";

interface ContactLink {
  description: string;
  external: boolean;
  href: string;
  icon: LucideIcon | IconType;
  label: string;
}

const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    icon: SiGithub,
    href: "https://github.com/Junjey123-mx",
    description: "Repositorios, commits y proyectos públicos.",
    external: true,
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/",
    description: "Perfil profesional y contacto académico/profesional.",
    external: true,
  },
  {
    label: "Correo",
    icon: Mail,
    href: "mailto:verneljosue@gmail.com",
    description: "Canal directo para contacto académico o profesional.",
    external: false,
  },
  {
    label: "CV",
    icon: FileText,
    href: "/cv/vernel-josue-cv.pdf",
    description: "Versión descargable del perfil profesional.",
    external: true,
  },
];

export function ContactPanel() {
  return (
    <div className="responsive-stack">
      {/* CTA principal */}
      <BorderGlowPanel as="article" animated>
        <div className={styles.ctaBlock}>
          <div className={styles.ctaTagRow}>
            <ProjectBadge label="Disponible para contacto" variant="deployed" />
          </div>

          <h2 className={styles.ctaTitle}>Hablemos de proyectos web</h2>

          <p className={styles.ctaBody}>
            Estoy abierto a contacto académico, revisión de proyectos, oportunidades junior y
            colaboración en productos web donde pueda aportar frontend, integración de APIs,
            documentación y despliegue.
          </p>

          <div className={styles.ctaActions} aria-label="Acciones principales de contacto">
            <a
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
              href="mailto:verneljosue@gmail.com"
            >
              <Mail size={15} aria-hidden="true" />
              Escribirme por correo
            </a>

            <a
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
              href="https://github.com/Junjey123-mx"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub aria-hidden="true" style={{ width: 15, height: 15 }} />
              Ver GitHub
            </a>

            <a
              className={`${styles.ctaBtn} ${styles.ctaBtnGhost}`}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin aria-hidden="true" style={{ width: 15, height: 15 }} />
              Ver LinkedIn
            </a>

            <a
              className={`${styles.ctaBtn} ${styles.ctaBtnGhost}`}
              href="/cv/vernel-josue-cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={15} aria-hidden="true" />
              Descargar CV
            </a>
          </div>
        </div>
      </BorderGlowPanel>

      {/* Cards de canales de contacto */}
      <div className={styles.linksGrid}>
        {contactLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div className={styles.linkCard} key={link.label}>
              <div className={styles.linkCardTop}>
                <div className={styles.linkIconWrap}>
                  <LinkIcon aria-hidden="true" style={{ width: 16, height: 16 }} />
                </div>
                <h3 className={styles.linkCardLabel} id={`contact-${link.label.toLowerCase()}-title`}>
                  {link.label}
                </h3>
              </div>

              <p className={styles.linkCardDesc}>{link.description}</p>

              {link.external ? (
                <a
                  className={styles.linkCardAction}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${link.label} en una nueva pestaña`}
                >
                  Abrir {link.label}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              ) : (
                <a
                  className={styles.linkCardAction}
                  href={link.href}
                  aria-label={`Contactar por ${link.label}`}
                >
                  Abrir {link.label}
                  <ArrowRight size={11} aria-hidden="true" />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Disponibilidad */}
      <SpotlightCard as="section" tone="blue" variant="subtle" aria-labelledby="contact-note-title">
        <div className={styles.availNote}>
          <h2 className={styles.availTitle} id="contact-note-title">
            <span className={styles.availDot} aria-hidden="true" />
            Disponibilidad
          </h2>
          <p className={styles.availText}>
            Puedo compartir detalles técnicos de mis proyectos, explicar decisiones de arquitectura,
            revisar código y presentar el proceso detrás de cada entrega del portafolio. Disponible
            para contacto académico y profesional.
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
}
