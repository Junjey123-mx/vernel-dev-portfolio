import { technologyGroups } from "@/modules/stack/infrastructure/stack.data";
import { StackLevelSection } from "@/modules/stack/presentation/components/StackLevelSection";
import { PageHeroView } from "@/shared/ui/page-hero/PageHeroView";

export function StackPage() {
  return (
    <PageHeroView
      contentLabel="Tecnologías por nivel"
      description="Una lectura honesta del stack que he usado en proyectos personales, académicos y colaborativos, clasificado por nivel de dominio y evidencia práctica."
      eyebrow="Stack técnico"
      title="Tecnologías organizadas por experiencia"
      titleId="stack-title"
      tone="stack"
    >
      {technologyGroups.map((group) => (
        <StackLevelSection group={group} key={group.level} />
      ))}
    </PageHeroView>
  );
}
