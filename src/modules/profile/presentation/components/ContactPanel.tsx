import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import styles from "./ContactPanel.module.css";

export function ContactPanel() {
  return (
    <div className={styles.contactBlock}>
      <h2 className={styles.ctaTitle}>Hablemos de proyectos web</h2>

      <p className={styles.ctaBody}>
        Estoy abierto a contacto académico, revisión de proyectos, oportunidades junior y colaboración
        en productos web donde pueda aportar frontend, integración de APIs, documentación y despliegue.
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
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin aria-hidden="true" style={{ width: 15, height: 15 }} />
          Ver LinkedIn
        </a>
      </div>
    </div>
  );
}
