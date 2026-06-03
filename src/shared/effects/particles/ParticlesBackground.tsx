import { useEffect, useState } from "react";

import { Particles } from "@/shared/effects/particles/Particles";

import styles from "./Particles.module.css";

interface ParticlesBackgroundProps {
  className?: string;
  disabled?: boolean;
  variant?: "hero" | "page";
}

function buildBackgroundClassName(className?: string) {
  return [styles.particlesBackground, className ?? ""].filter(Boolean).join(" ");
}

function getMediaQueryValue(query: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
}

export function ParticlesBackground({
  className,
  disabled = false,
  variant = "hero",
}: ParticlesBackgroundProps) {
  const [isMobile, setIsMobile] = useState(() => getMediaQueryValue("(max-width: 768px)"));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    getMediaQueryValue("(prefers-reduced-motion: reduce)"),
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMobileChange = () => {
      setIsMobile(mobileQuery.matches);
    };

    const handleReducedMotionChange = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    handleMobileChange();
    handleReducedMotionChange();

    mobileQuery.addEventListener("change", handleMobileChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  if (disabled || prefersReducedMotion) {
    return null;
  }

  return (
    <div className={buildBackgroundClassName(className)} aria-hidden="true">
      <Particles
        alphaParticles
        cameraDistance={variant === "page" ? 22 : 20}
        className={styles.particlesLayer}
        disableRotation={isMobile}
        moveParticlesOnHover={!isMobile}
        particleBaseSize={variant === "page" ? (isMobile ? 72 : 96) : (isMobile ? 64 : 80)}
        particleColors={["#4de8e8", "#2f80ff", "#d946ef"]}
        particleCount={variant === "page" ? (isMobile ? 70 : 160) : (isMobile ? 35 : 90)}
        particleHoverFactor={isMobile ? 0 : 0.35}
        particleSpread={variant === "page" ? (isMobile ? 6 : 9.5) : (isMobile ? 5 : 7)}
        pixelRatio={1}
        sizeRandomness={1}
        speed={variant === "page" ? (isMobile ? 0.04 : 0.06) : (isMobile ? 0.035 : 0.05)}
      />
    </div>
  );
}
