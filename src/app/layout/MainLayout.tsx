import { Outlet } from "react-router-dom";

import { Footer } from "@/app/layout/Footer";
import { Navbar } from "@/app/layout/Navbar";

export function MainLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" className="responsive-container responsive-section">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
