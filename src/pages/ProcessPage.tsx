import { ProcessTimeline } from "@/modules/profile/presentation/components/ProcessTimeline";
import { PageHeroView } from "@/shared/ui/page-hero/PageHeroView";

export function ProcessPage() {
  return (
    <PageHeroView
      contentLabel="Flujo de trabajo"
      description="Mi flujo de trabajo combina análisis, arquitectura modular, consumo de APIs, control de versiones, documentación y deploy para entregar proyectos que se puedan revisar y defender técnicamente."
      eyebrow="Proceso"
      title="Cómo construyo y valido proyectos"
      titleId="process-title"
      tone="process"
    >
      <ProcessTimeline />
    </PageHeroView>
  );
}
