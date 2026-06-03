import { Mail, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface FooterLink {
  external: boolean;
  href: string;
  icon: LucideIcon | IconType;
  label: string;
}

const footerLinks: FooterLink[] = [
  {
    label: "GitHub",
    icon: SiGithub,
    href: "https://github.com/Junjey123-mx",
    external: true,
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/",
    external: true,
  },
  {
    label: "Correo",
    icon: Mail,
    href: "mailto:verneljosue@gmail.com",
    external: false,
  },
  {
    label: "CV",
    icon: FileText,
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
          {footerLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <a
                key={link.label}
                className="footer-link"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                aria-label={link.external ? `${link.label} (abre en nueva pestaña)` : link.label}
              >
                <LinkIcon aria-hidden="true" style={{ width: 13, height: 13 }} />
                {link.label}
              </a>
            );
          })}
        </nav>

        <p className="footer-copy">© {currentYear} Vernel.dev. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
