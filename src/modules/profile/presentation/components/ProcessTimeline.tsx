import { ProjectBadge } from "@/shared/ui/badge/ProjectBadge";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import type { SpotlightCardTone } from "@/shared/ui/spotlight-card/SpotlightCard";

interface ProcessStep {
  description: string;
  number: string;
  practices: string[];
  projects: string[];
  title: string;
  tone: SpotlightCardTone;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Análisis del problema",
    description:
      "Empiezo identificando el objetivo real del proyecto, los requisitos de entrega y el alcance mínimo que debe funcionar antes de mejorar la interfaz.",
    practices: [
      "Separar requisitos obligatorios de mejoras visuales",
      "Definir entidades, rutas y flujos principales",
      "Detectar riesgos técnicos antes de escribir código",
    ],
    projects: ["RetroSound Store", "UVGenius", "TripWise Android"],
    tone: "cyan",
  },
  {
    number: "02",
    title: "Arquitectura modular",
    description:
      "Organizo el código por dominios, módulos y responsabilidades para que cada parte del sistema tenga una función clara y defendible.",
    practices: [
      "Separar dominio, infraestructura y presentación",
      "Crear componentes reutilizables",
      "Evitar mezclar lógica de negocio con UI",
    ],
    projects: ["vernel-dev-portfolio", "RetroSound Store", "UVGenius"],
    tone: "blue",
  },
  {
    number: "03",
    title: "API, datos y estados",
    description:
      "Conecto la interfaz con fuentes de datos usando estados de carga, error y vacío para que la experiencia no dependa de respuestas perfectas.",
    practices: [
      "Consumir APIs REST con manejo de errores",
      "Modelar datos antes de renderizarlos",
      "Usar estados de loading, error y fallback",
    ],
    projects: ["Resident Evil Franchise Tracker", "RetroSound Store", "GitHub API"],
    tone: "magenta",
  },
  {
    number: "04",
    title: "Git, commits y revisión",
    description:
      "Trabajo con commits pequeños, auditorías por fase y revisión de archivos exactos para mantener el repositorio limpio y fácil de evaluar.",
    practices: [
      "Evitar git add . para no subir archivos internos",
      "Crear commits proporcionales al cambio",
      "Validar lint, build y estado de Git antes de cerrar",
    ],
    projects: ["vernel-dev-portfolio", "TRONSnake", "CalculaTRON"],
    tone: "purple",
  },
  {
    number: "05",
    title: "Documentación defendible",
    description:
      "Documento decisiones técnicas, instalación, rutas, credenciales de prueba cuando aplican y evidencia de cumplimiento para que el proyecto pueda ser revisado.",
    practices: [
      "README con instrucciones claras",
      "Explicar decisiones y límites del proyecto",
      "Relacionar funcionalidades con requisitos de evaluación",
    ],
    projects: ["RetroSound Store", "UVGenius", "Concurrent Tetris Pthreads"],
    tone: "cyan",
  },
  {
    number: "06",
    title: "Deploy y validación final",
    description:
      "Cierro verificando que el proyecto compile, que las rutas principales funcionen y que el resultado pueda abrirse desde un entorno público o reproducible.",
    practices: [
      "Ejecutar build antes del commit",
      "Probar rutas principales y estados vacíos",
      "Revisar deploy, Docker o instrucciones de ejecución",
    ],
    projects: ["TRONSnake", "CalculaTRON", "Resident Evil Franchise Tracker"],
    tone: "blue",
  },
];

export function ProcessTimeline() {
  return (
    <div className="responsive-stack" aria-label="Línea de tiempo del proceso de desarrollo">
      {processSteps.map((step) => (
        <SpotlightCard as="article" key={step.number} tone={step.tone} variant="featured">
          <div className="responsive-stack">
            <div>
              <p>{step.number}</p>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>

            <div className="responsive-grid">
              <section aria-labelledby={`process-practices-${step.number}`}>
                <h3 id={`process-practices-${step.number}`}>Prácticas aplicadas</h3>
                <ul>
                  {step.practices.map((practice) => (
                    <li key={practice}>{practice}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby={`process-projects-${step.number}`}>
                <h3 id={`process-projects-${step.number}`}>Proyectos relacionados</h3>
                <div className="responsive-cluster">
                  {step.projects.map((project) => (
                    <ProjectBadge key={project} label={project} variant="caseStudy" />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
