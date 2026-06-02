import { technologyGroups } from "@/modules/stack/infrastructure/stack.data";
import { StackLevelSection } from "@/modules/stack/presentation/components/StackLevelSection";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

export function StackPage() {
  return (
    <section className="responsive-stack" aria-labelledby="stack-title">
      <SectionHeader
        eyebrow="Stack técnico"
        title="Tecnologías organizadas por experiencia"
        titleId="stack-title"
        description="Una lectura honesta del stack que he usado en proyectos personales, académicos y colaborativos, clasificado por nivel de dominio y evidencia práctica."
      />

      {technologyGroups.map((group) => (
        <StackLevelSection group={group} key={group.level} />
      ))}
    </section>
  );
}
