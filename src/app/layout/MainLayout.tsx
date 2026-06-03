import { Outlet, ScrollRestoration } from "react-router-dom";

import { Footer } from "@/app/layout/Footer";
import { HashScroll } from "@/app/layout/HashScroll";
import { Navbar } from "@/app/layout/Navbar";
import { PageTransition } from "@/app/layout/PageTransition";
import { ScrollProgressBar } from "@/app/layout/ScrollProgressBar";
import { ParticlesBackground } from "@/shared/effects/particles/ParticlesBackground";

export function MainLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>

      <ScrollProgressBar />

      <Navbar />

      <ParticlesBackground className="app-particles" variant="page" />
      <HashScroll />
      <ScrollRestoration />

      <main id="main-content" className="responsive-container responsive-section">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
