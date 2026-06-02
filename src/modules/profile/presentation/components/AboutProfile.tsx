import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import { TechBadge } from "@/shared/ui/badge/TechBadge";
import { SurfaceCard } from "@/shared/ui/card/SurfaceCard";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";

const profileFacts = [
  {
    label: "Universidad",
    value: "Universidad del Valle de Guatemala",
  },
  {
    label: "Ubicación",
    value: "Guatemala",
  },
  {
    label: "Rol",
    value: "Desarrollador web junior",
  },
  {
    label: "Enfoque",
    value: "SPAs, APIs REST, bases de datos y deploy",
  },
];

const technicalFocus = [
  "Frontend modular con React y TypeScript",
  "Consumo de APIs con estados de carga, error y vacío",
  "Modelado de datos y uso de bases relacionales",
  "Documentación clara para defender decisiones técnicas",
  "Git con commits pequeños, revisión y auditoría por fase",
  "Deploy público o ejecución reproducible",
];

const currentLearning = [
  "Profundizar arquitectura frontend con React + TypeScript",
  "Mejorar testing de componentes y flujos críticos",
  "Integrar APIs reales con fallback y manejo de errores",
  "Construir proyectos desplegados y defendibles",
];

export function AboutProfile() {
  return (
    <div className="responsive-stack">
      <SpotlightCard as="article" tone="cyan" variant="featured">
        <div className="responsive-stack">
          <div>
            <ProjectBadge label="Perfil" variant="caseStudy" />
          </div>

          <div>
            <h2>Vernel Josué</h2>
            <p>
              Soy estudiante de la Universidad del Valle de Guatemala y desarrollador web junior
              enfocado en construir interfaces modernas, consumir APIs REST y entregar proyectos
              que se puedan revisar, ejecutar y defender técnicamente.
            </p>
          </div>

          <div className="responsive-cluster" aria-label="Tecnologías principales del perfil">
            <TechBadge label="React" tone="cyan" />
            <TechBadge label="TypeScript" tone="cyan" />
            <TechBadge label="REST APIs" tone="blue" />
            <TechBadge label="PostgreSQL" tone="blue" />
            <TechBadge label="Docker" tone="magenta" />
          </div>
        </div>
      </SpotlightCard>

      <div className="responsive-grid">
        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="about-facts-title">
          <h2 id="about-facts-title">Datos principales</h2>

          <dl>
            {profileFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </SurfaceCard>

        <SurfaceCard as="section" className="responsive-stack" aria-labelledby="about-focus-title">
          <h2 id="about-focus-title">Enfoque técnico</h2>

          <ul>
            {technicalFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      <SurfaceCard as="section" className="responsive-stack" aria-labelledby="about-learning-title">
        <h2 id="about-learning-title">Aprendizaje actual</h2>

        <p>
          Actualmente estoy fortaleciendo mi criterio frontend y full-stack mediante proyectos que
          combinan UI, arquitectura por módulos, consumo de APIs, documentación y despliegue.
        </p>

        <div className="responsive-grid">
          {currentLearning.map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>
                Este enfoque me ayuda a convertir prácticas académicas y proyectos personales en
                evidencia técnica clara para el portafolio.
              </p>
            </article>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
