import { HeroSection } from "@/modules/profile/presentation/components/HeroSection";
import { StrengthsSection } from "@/modules/profile/presentation/components/StrengthsSection";
import { FeaturedProjectsPreview } from "@/modules/projects/presentation/components/FeaturedProjectsPreview";

import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <StrengthsSection />
      <FeaturedProjectsPreview />
    </div>
  );
}
