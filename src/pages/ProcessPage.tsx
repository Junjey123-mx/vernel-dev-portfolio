import { ProcessTimeline } from "@/modules/profile/presentation/components/ProcessTimeline";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

export function ProcessPage() {
  return (
    <section className="responsive-stack" aria-labelledby="process-title">
      <SectionHeader
        eyebrow="Proceso"
        title="Cómo construyo y valido proyectos"
        titleId="process-title"
        description="Mi flujo de trabajo combina análisis, arquitectura modular, consumo de APIs, control de versiones, documentación y deploy para entregar proyectos que se puedan revisar y defender técnicamente."
      />

      <ProcessTimeline />
    </section>
  );
}
