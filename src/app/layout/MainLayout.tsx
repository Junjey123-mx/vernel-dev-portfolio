import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>

      <div data-layout-slot="navbar" aria-hidden="true" />

      <main id="main-content" className="responsive-container responsive-section">
        <Outlet />
      </main>

      <div data-layout-slot="footer" aria-hidden="true" />
    </div>
  );
}
