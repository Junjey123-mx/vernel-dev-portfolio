import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  end?: boolean;
  label: string;
  to: string;
}

const navigationItems: NavigationItem[] = [
  { label: "Inicio", to: "/", end: true },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Stack", to: "/stack" },
  { label: "Proceso", to: "/proceso" },
];

function getNavLinkClassName(isActive: boolean) {
  return isActive ? "navbar-link navbar-link--active" : "navbar-link";
}

export function Navbar() {
  const { pathname } = useLocation();

  function isNavigationItemActive(item: NavigationItem) {
    return item.end ? pathname === item.to : pathname.startsWith(item.to);
  }

  return (
    <header className="navbar-shell">
      <nav className="navbar responsive-container" aria-label="Navegación principal">
        <Link className="navbar-logo" to="/" aria-label="Ir al inicio de Vernel.dev">
          Vernel.dev
        </Link>

        <div className="navbar-links" aria-label="Secciones del portafolio">
          {navigationItems.map((item) => (
            <Link
              key={item.to}
              className={getNavLinkClassName(isNavigationItemActive(item))}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  );
}
