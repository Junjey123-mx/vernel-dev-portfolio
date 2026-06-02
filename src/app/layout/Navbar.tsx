import { NavLink } from "react-router-dom";

interface NavigationItem {
  label: string;
  to: string;
  end?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Inicio",
    to: "/",
    end: true,
  },
  {
    label: "Proyectos",
    to: "/proyectos",
  },
  {
    label: "Stack",
    to: "/stack",
  },
  {
    label: "Proceso",
    to: "/proceso",
  },
  {
    label: "Sobre mí",
    to: "/sobre-mi",
  },
  {
    label: "Contacto",
    to: "/contacto",
  },
];

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "navbar-link navbar-link--active" : "navbar-link";
}

export function Navbar() {
  return (
    <header className="navbar-shell">
      <nav className="navbar responsive-container" aria-label="Navegación principal">
        <NavLink className="navbar-logo" to="/" aria-label="Ir al inicio de Vernel.dev">
          Vernel.dev
        </NavLink>

        <div className="navbar-links" aria-label="Secciones del portafolio">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              className={getNavLinkClassName}
              to={item.to}
              end={item.end}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <a
          className="navbar-cv"
          href="/cv/vernel-josue-cv.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir CV de Vernel Josué en una nueva pestaña"
        >
          CV
        </a>
      </nav>
    </header>
  );
}
