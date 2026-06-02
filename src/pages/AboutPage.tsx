import { AboutProfile } from "@/modules/profile/presentation/components/AboutProfile";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

export function AboutPage() {
  return (
    <section className="responsive-stack" aria-labelledby="about-title">
      <SectionHeader
        eyebrow="Sobre mí"
        title="Perfil profesional en construcción"
        titleId="about-title"
        description="Una presentación breve de mi contexto académico, enfoque técnico y forma de convertir proyectos en evidencia real de aprendizaje."
      />

      <AboutProfile />
    </section>
  );
}
