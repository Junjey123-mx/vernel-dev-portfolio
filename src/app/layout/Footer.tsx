const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Junjey123-mx",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    external: true,
  },
  {
    label: "Correo",
    href: "mailto:verneljosue@gmail.com",
    external: false,
  },
  {
    label: "CV",
    href: "/cv/vernel-josue-cv.pdf",
    external: true,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="footer responsive-container">
        <div className="footer-brand">
          <p className="footer-name">Vernel Josué</p>
          <p className="footer-role">Desarrollador web junior</p>
        </div>

        <p className="footer-tech">Construido con React, TypeScript, Vite y Docker.</p>

        <nav className="footer-links" aria-label="Links profesionales">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="footer-link"
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer-copy">© {currentYear} Vernel.dev. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
