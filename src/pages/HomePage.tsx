import { HeroSection } from "@/modules/profile/presentation/components/HeroSection";
import { AboutIntroSection } from "@/modules/profile/presentation/components/AboutIntroSection";
import { AboutProfile } from "@/modules/profile/presentation/components/AboutProfile";
import { ContactPanel } from "@/modules/profile/presentation/components/ContactPanel";
import { StrengthsSection } from "@/modules/profile/presentation/components/StrengthsSection";
import { FeaturedProjectsPreview } from "@/modules/projects/presentation/components/FeaturedProjectsPreview";

import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <AboutIntroSection />
      <section aria-label="Contexto académico y forma de trabajo">
        <AboutProfile />
      </section>
      <StrengthsSection />
      <FeaturedProjectsPreview />
      <section id="contacto" className="anchor-section" aria-label="Contacto">
        <ContactPanel />
      </section>
    </div>
  );
}
