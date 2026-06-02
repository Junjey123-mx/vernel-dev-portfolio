import { HeroSection } from "@/modules/profile/presentation/components/HeroSection";
import { StrengthsSection } from "@/modules/profile/presentation/components/StrengthsSection";
import { FeaturedProjectsPreview } from "@/modules/projects/presentation/components/FeaturedProjectsPreview";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StrengthsSection />
      <FeaturedProjectsPreview />
    </>
  );
}
