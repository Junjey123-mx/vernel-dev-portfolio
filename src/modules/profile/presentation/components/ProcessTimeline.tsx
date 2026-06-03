import {
  Search,
  Boxes,
  Database,
  GitBranch,
  FileText,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ProjectChip } from "@/shared/ui/chip/ProjectChip";
import { SpotlightCard } from "@/shared/ui/spotlight-card/SpotlightCard";
import type { SpotlightCardTone } from "@/shared/ui/spotlight-card/SpotlightCard";

import styles from "./ProcessTimeline.module.css";

type ProcessTone = SpotlightCardTone;

interface ProcessStep {
  description: string;
  icon: LucideIcon;
  number: string;
  practices: string[];
  projects: string[];
  title: string;
  tone: ProcessTone;
}

const toneClassMap: Record<ProcessTone, string> = {
  cyan: "",
  blue: styles.toneBlue,
  magenta: styles.toneMagenta,
  purple: styles.tonePurple,
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: Search,
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
    icon: Boxes,
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
    icon: Database,
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
    icon: GitBranch,
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
    icon: FileText,
    title: "Documentación defendible",
    description:
      "Documento decisiones técnicas, instalación, rutas y evidencia de cumplimiento para que el proyecto pueda ser revisado sin fricción.",
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
    icon: Rocket,
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
    <div className={styles.timeline} aria-label="Línea de tiempo del proceso de desarrollo">
      {processSteps.map((step) => {
        const StepIcon = step.icon;
        const toneClass = toneClassMap[step.tone];

        return (
          <div
            key={step.number}
            className={[styles.step, toneClass].filter(Boolean).join(" ")}
          >
            <div className={styles.stepLeft} aria-hidden="true">
              <div className={styles.numberBubble}>{step.number}</div>
              <StepIcon
                className={styles.stepIcon}
                size={16}
                aria-hidden="true"
              />
            </div>

            <SpotlightCard
              as="div"
              tone={step.tone}
              variant="default"
              contentClassName={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
              </div>

              <p className={styles.stepDescription}>{step.description}</p>

              <div className={styles.stepGrid}>
                <div className={styles.practicesBlock}>
                  <p className={styles.blockTitle}>Prácticas aplicadas</p>
                  <ul className={styles.practiceList}>
                    {step.practices.map((practice) => (
                      <li className={styles.practiceItem} key={practice}>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.projectsBlock}>
                  <p className={styles.blockTitle}>Aplicado en proyectos</p>
                  <div className={styles.projectsCluster}>
                    {step.projects.map((project) => (
                      <ProjectChip key={project} label={project} />
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        );
      })}
    </div>
  );
}
