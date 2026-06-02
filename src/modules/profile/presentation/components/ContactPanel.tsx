import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";
import { BorderGlowPanel } from "@/shared/ui/border-glow/BorderGlowPanel";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

interface ContactLink {
  description: string;
  external: boolean;
  href: string;
  label: string;
}

const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Junjey123-mx",
    description: "Repositorios, commits y proyectos públicos.",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    description: "Perfil profesional y contacto académico/profesional.",
    external: true,
  },
  {
    label: "Correo",
    href: "mailto:verneljosue@gmail.com",
    description: "Canal directo para contacto académico o profesional.",
    external: false,
  },
  {
    label: "CV",
    href: "/cv/vernel-josue-cv.pdf",
    description: "Versión descargable del perfil profesional.",
    external: true,
  },
];

export function ContactPanel() {
  return (
    <div className="responsive-stack">
      <BorderGlowPanel as="article" animated>
        <div className="responsive-stack">
          <div className="responsive-cluster">
            <ProjectBadge label="Disponible para contacto" variant="deployed" />
            <TechBadge label="GitHub" tone="cyan" />
            <TechBadge label="Email" tone="blue" />
          </div>

          <div>
            <h2>Hablemos de proyectos web</h2>
            <p>
              Estoy abierto a contacto académico, revisión de proyectos, oportunidades junior y
              colaboración en productos web donde pueda aportar frontend, integración de APIs,
              documentación y despliegue.
            </p>
          </div>

          <div className="responsive-cluster" aria-label="Acciones principales de contacto">
            <a href="mailto:verneljosue@gmail.com">Escribirme por correo</a>
            <a href="https://github.com/Junjey123-mx" target="_blank" rel="noreferrer">
              Ver GitHub
            </a>
            <a href="/cv/vernel-josue-cv.pdf" target="_blank" rel="noreferrer">
              Descargar CV
            </a>
          </div>
        </div>
      </BorderGlowPanel>

      <div className="responsive-grid">
        {contactLinks.map((link) => (
          <SurfaceCard
            as="article"
            className="responsive-stack"
            aria-labelledby={`contact-${link.label.toLowerCase()}-title`}
            key={link.label}
          >
            <div>
              <ProjectBadge label={link.label} variant="caseStudy" />
            </div>

            <div>
              <h2 id={`contact-${link.label.toLowerCase()}-title`}>{link.label}</h2>
              <p>{link.description}</p>
            </div>

            {link.external ? (
              <a href={link.href} target="_blank" rel="noreferrer">
                Abrir {link.label}
              </a>
            ) : (
              <a href={link.href}>Abrir {link.label}</a>
            )}
          </SurfaceCard>
        ))}
      </div>

      <SpotlightCard as="section" tone="blue" variant="subtle" aria-labelledby="contact-note-title">
        <div className="responsive-stack">
          <h2 id="contact-note-title">Disponibilidad</h2>
          <p>
            Puedo compartir detalles técnicos de mis proyectos, explicar decisiones de arquitectura,
            revisar código y presentar el proceso detrás de cada entrega del portafolio.
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
}
