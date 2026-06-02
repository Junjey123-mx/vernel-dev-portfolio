import { ContactPanel } from "@/modules/profile/presentation/components/ContactPanel";
import { SectionHeader } from "@/shared/ui/section-header/SectionHeader";

export function ContactPage() {
  return (
    <section className="responsive-stack" aria-labelledby="contact-title">
      <SectionHeader
        eyebrow="Contacto"
        title="Conectemos para proyectos y oportunidades"
        titleId="contact-title"
        description="Estos son los canales principales para revisar mi trabajo, descargar mi CV o escribirme sobre oportunidades académicas, profesionales o colaborativas."
      />

      <ContactPanel />
    </section>
  );
}
