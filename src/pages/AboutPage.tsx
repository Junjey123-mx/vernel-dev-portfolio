import { AboutProfile } from "@/modules/profile/presentation/components/AboutProfile";
import { ContactPanel } from "@/modules/profile/presentation/components/ContactPanel";
import { PageHeroView } from "@/shared/ui/page-hero/PageHeroView";

export function AboutPage() {
  return (
    <PageHeroView
      contentLabel="Perfil profesional"
      description="Una mirada breve a mi contexto universitario, mi forma de trabajar y el tipo de proyectos que estoy construyendo para convertir aprendizaje en evidencia real."
      eyebrow="Sobre mí"
      size="compact"
      title="Perfil técnico y académico"
      titleId="about-title"
      tone="about"
    >
      <AboutProfile />
      <section id="contacto" className="anchor-section" aria-label="Contacto">
        <ContactPanel />
      </section>
    </PageHeroView>
  );
}
