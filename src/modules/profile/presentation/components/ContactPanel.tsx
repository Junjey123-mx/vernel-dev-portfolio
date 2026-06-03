import { useState } from "react";
import { CheckCircle, Mail, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import styles from "./ContactPanel.module.css";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "El nombre es requerido.";
  }
  if (!values.email.trim()) {
    errors.email = "El correo es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un correo válido.";
  }
  if (!values.message.trim()) {
    errors.message = "El mensaje es requerido.";
  } else if (values.message.trim().length < 20) {
    errors.message = "El mensaje debe tener al menos 20 caracteres.";
  }
  return errors;
}

const EMPTY_VALUES: FormValues = { name: "", email: "", message: "" };

export function ContactPanel() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    const subject = encodeURIComponent(`Contacto desde portafolio — ${values.name}`);
    const body = encodeURIComponent(
      `Nombre: ${values.name}\nCorreo: ${values.email}\n\nMensaje:\n${values.message}`
    );
    window.location.href = `mailto:verneljosue@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className={styles.contactBlock}>
        <span className={styles.successIcon} aria-hidden="true">
          <CheckCircle size={48} />
        </span>
        <h2 className={styles.ctaTitle}>Mensaje listo</h2>
        <p className={styles.ctaBody}>
          Se abrió tu cliente de correo con el mensaje pre-cargado. Si no se abrió, escríbeme
          directamente a{" "}
          <a className={styles.inlineLink} href="mailto:verneljosue@gmail.com">
            verneljosue@gmail.com
          </a>
          .
        </p>
        <button className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`} type="button" onClick={handleReset}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className={styles.contactBlock}>
      <h2 className={styles.ctaTitle}>Hablemos de proyectos web</h2>

      <p className={styles.ctaBody}>
        Estoy abierto a contacto académico, revisión de proyectos, oportunidades junior y colaboración
        en productos web donde pueda aportar frontend, integración de APIs, documentación y despliegue.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="contact-name">
            Nombre
          </label>
          <input
            className={`${styles.fieldInput}${errors.name ? ` ${styles.fieldInputError}` : ""}`}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className={styles.fieldError} id="contact-name-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="contact-email">
            Correo electrónico
          </label>
          <input
            className={`${styles.fieldInput}${errors.email ? ` ${styles.fieldInputError}` : ""}`}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className={styles.fieldError} id="contact-email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="contact-message">
            Mensaje
          </label>
          <textarea
            className={`${styles.fieldTextarea}${errors.message ? ` ${styles.fieldInputError}` : ""}`}
            id="contact-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <span className={styles.fieldError} id="contact-message-error" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <button className={`${styles.ctaBtn} ${styles.ctaBtnPrimary} ${styles.submitBtn}`} type="submit">
          <Send size={15} aria-hidden="true" />
          Enviar mensaje
        </button>
      </form>

      <p className={styles.ctaDivider} aria-hidden="true">o contactar directamente</p>

      <div className={styles.ctaActions} aria-label="Otras formas de contacto">
        <a
          className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
          href="mailto:verneljosue@gmail.com"
        >
          <Mail size={15} aria-hidden="true" />
          Correo directo
        </a>

        <a
          className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
          href="https://www.linkedin.com/in/vernel-josue-386836390/"
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
