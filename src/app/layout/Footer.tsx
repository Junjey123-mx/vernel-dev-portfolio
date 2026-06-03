export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="footer responsive-container">
        <div className="footer-brand">
          <p className="footer-name">Vernel Hernández</p>
          <p className="footer-copy">© {currentYear} Vernel.dev. Todos los derechos reservados.</p>
        </div>

        <div className="footer-summary">
          <p className="footer-role">Desarrollador web junior</p>
          <p className="footer-tech">Construido con React, TypeScript, Vite y Docker.</p>
        </div>
      </div>
    </footer>
  );
}
