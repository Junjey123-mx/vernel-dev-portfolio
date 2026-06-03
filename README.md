# vernel-dev-portfolio

Portafolio personal de Vernel Josué — SPA construida con React 19, Vite 6 y TypeScript para presentar proyectos, stack técnico, proceso de trabajo y perfil profesional.

## Demo

> **Deploy en producción:** [vernel-dev-portfolio.vercel.app](https://vernel-dev-portfolio.vercel.app/)
>
> Repositorio público: [github.com/Junjey123-mx/vernel-dev-portfolio](https://github.com/Junjey123-mx/vernel-dev-portfolio)

---

## Stack tecnológico y justificación

| Tecnología | Versión | Qué es | Por qué se eligió |
|---|---|---|---|
| **React** | 19 | Librería UI basada en componentes | Los proyectos del portafolio (RetroSound, UVGenius, CalculaTRON) usan React. El portafolio en sí demuestra el mismo stack que aplico en producción — coherencia directa entre herramienta elegida y evidencia. |
| **Vite** | 6 | Bundler y servidor de desarrollo | CRA está abandonado desde 2023. Webpack manual requiere configuración extensa sin valor para esta escala. Vite tiene HMR instantáneo, tree-shaking automático y configuración mínima. Cold start ~5× más rápido que Webpack equivalente. |
| **TypeScript** | 5.7 | Tipado estático sobre JavaScript | Configuración `strict: true` con `noUnusedLocals`, `noUnusedParameters` y `noUncheckedSideEffectImports`. El sistema de tipos es una red de seguridad real: los modelos de dominio (`Project`, `Technology`, `GitHubRepositoryMetadata`) están totalmente tipados y el compilador rechaza usos incorrectos en tiempo de escritura. |
| **React Router** | 7 | Enrutamiento client-side | El portafolio es una SPA estática sin requisitos de SSR ni SSG, por lo que Next.js añadiría complejidad innecesaria (App Router, Server Components, layouts por archivo). React Router v7 da rutas dinámicas (`/proyectos/:slug`), layouts anidados y navegación fluida sin sobreingeniería. |
| **TanStack Query** | 5 | Gestión de server state y caché | El portafolio consume la GitHub API para mostrar metadata de repositorios en tiempo real. Fetch manual requeriría implementar caché, deduplicación de peticiones y estados loading/error a mano. SWR es más simple pero menos expresivo con TypeScript. TanStack Query v5 da caché configurable (`staleTime: 10 min`), estados tipados y deduplicación de peticiones sin código adicional. |
| **Zustand** | 5 | Estado global | El estado global del portafolio tiene dos responsabilidades acotadas: filtro de proyectos y tema visual. Redux Toolkit añadiría boilerplate innecesario (slices, selectors, reducers) para un estado tan pequeño. Context API sin optimizaciones genera re-renders en toda la subtree. Zustand da stores tipados con hooks directos y actualizaciones granulares. |
| **CSS Modules** | — | Estilos encapsulados por componente | La UI tiene un sistema visual personalizado (tema cyberpunk con variables CSS, animaciones específicas) que se expresa mejor con CSS declarativo que con clases utilitarias de Tailwind. CSS Modules da encapsulación automática sin overhead de runtime (styled-components) ni pérdida de acceso a primitivas CSS. Cada componente tiene su `.module.css` colocado junto a él. |

---

## Características principales

- **Galería de proyectos** con filtros por categoría, estado y tipo — estado gestionado con Zustand
- **Detalle de proyecto** por slug dinámico — arquitectura, decisiones, retos y mejoras propuestas
- **Metadata de GitHub en tiempo real** — estrellas, lenguaje principal, último push y contribuidores por repositorio, con caché de 10 minutos y manejo explícito de error
- **Sección de stack técnico** organizada por nivel de dominio (avanzado / intermedio / básico) con evidencia de proyectos por tecnología
- **Proceso de trabajo** — fases de desarrollo documentadas
- **Tema claro/oscuro** persistido en localStorage
- **Responsive** — diseño adaptable desde móvil hasta escritorio
- **Estados de UI explícitos** — loading, error y empty states en todas las vistas con datos remotos

---

## Arquitectura y estructura de carpetas

El proyecto sigue una arquitectura por módulos verticales: cada módulo encapsula su propio dominio, lógica de aplicación, infraestructura y presentación.

```
src/
├── app/
│   ├── layout/          # Navbar, Footer, MainLayout, PageTransition
│   ├── providers/       # ThemeProvider, QueryProvider
│   └── router.tsx       # Rutas de la SPA con React Router v7
│
├── modules/
│   ├── github/
│   │   ├── domain/      # Tipos e interfaces: GitHubRepositoryMetadata
│   │   └── presentation/
│   │       ├── components/   # GithubStatsCard
│   │       └── hooks/        # useGithubRepo, useGithubLanguages, useGithubContributors
│   │
│   ├── profile/
│   │   └── presentation/
│   │       └── components/   # HeroSection, AboutProfile, TechSignalPanel, ContactPanel…
│   │
│   ├── projects/
│   │   ├── domain/           # Project.ts — tipos, interfaces, ProjectFilter
│   │   ├── application/      # getFeaturedProjects, getProjectBySlug, filterProjects
│   │   ├── infrastructure/
│   │   │   ├── local/        # projects.data.ts — datos estáticos de proyectos
│   │   │   └── github/       # githubApi.ts, githubRepository.ts — integración GitHub API
│   │   └── presentation/
│   │       └── components/   # ProjectCard, ProjectFilters, ProjectsGrid, detalle…
│   │
│   └── stack/
│       ├── domain/           # Technology.ts
│       ├── infrastructure/   # stack.data.ts — datos de tecnologías por nivel
│       └── presentation/
│           └── components/   # StackLevelSection, TechnologyCard
│
├── pages/               # Páginas enrutadas: Home, Projects, ProjectDetail, Stack, Process, About, Contact
│
├── shared/
│   └── ui/              # Componentes reutilizables: NeonButton, TechBadge, SpotlightCard,
│                        # GlassCard, LoadingState, ErrorState, EmptyState, SectionHeader…
│
├── store/               # useProjectFilterStore, useThemeStore (Zustand)
└── styles/              # globals.css, variables.css, animations.css, responsive.css
```

---

## Integración con GitHub API

El portafolio consulta la API pública de GitHub (`api.github.com/repos/{owner}/{name}`) para mostrar metadata en tiempo real en el detalle de cada proyecto.

**Qué se consulta:** nombre completo, lenguaje principal, estrellas, forks, issues abiertos, rama por defecto, fecha de último push, tópicos y datos del propietario.

**Sin token de autenticación:** la API pública tiene un límite de 60 req/hora por IP. Para esta escala (visitas esporádicas de revisores) es suficiente.

**Manejo de errores:**
- `getGitHubRepositoryMetadataSafe` captura cualquier fallo de red o error de la API y retorna `{ data: null, error: string }` en lugar de lanzar una excepción
- Los hooks con TanStack Query exponen `isLoading`, `isError` y `data` tipados
- El componente `GithubStatsCard` muestra `ErrorState` si el fetch falla y `LoadingState` mientras carga
- El caché tiene `staleTime: 10 minutos`, evitando peticiones duplicadas al navegar entre proyectos

---

## Componentes visuales externos adaptados

Los siguientes efectos visuales son adaptaciones de componentes de referencia, integrados como módulos propios del proyecto:

| Componente | Descripción |
|---|---|
| `SpotlightCard` | Card con spotlight de luz que sigue el cursor — efecto con CSS custom properties |
| `AnimatedGradientBorder` / `BorderRotate` | Borde animado con gradiente rotatorio — usado en el `TechSignalPanel` del hero |
| `BorderGlowPanel` | Panel con glow difuso en los bordes |
| `ParticlesBackground` | Fondo de partículas conectadas en canvas — powered by OGL (WebGL) |

Todos viven en `src/shared/ui/` o `src/shared/effects/` y están integrados con el sistema de variables CSS del proyecto.

---

## Instalación y scripts

```bash
# Clonar e instalar dependencias
git clone https://github.com/Junjey123-mx/vernel-dev-portfolio.git
cd vernel-dev-portfolio
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint

# Tests (single run)
npm run test

# Tests en modo watch
npm run test:watch
```

No se requieren variables de entorno. La GitHub API se consume sin token desde el cliente.

---

## Testing

Las pruebas cubren la lógica pura de dominio y el comportamiento de los componentes de UI más críticos.

**Lógica de aplicación** (`src/modules/projects/application/`):
- `getFeaturedProjects` — filtra featured, ordena por prioridad, respeta el parámetro `limit`
- `getProjectBySlug` — lookup case-insensitive, trimming de espacios, retorna `null` en slug vacío o inexistente
- `filterProjects` — cada filtro disponible (`category`, `status`, `kind`, `featuredOnly`, `query`), incluyendo búsqueda por nombre de tech en el stack y caso sin resultados

**Componentes de UI** (`@testing-library/react`):
- `NeonButton` — render de children, disparo de `onClick`, estado `disabled` con atributos correctos, slots de icon
- `TechBadge` — render de label, todas las tones y sizes sin error
- `LoadingState` — mensaje por defecto y personalizado, `role="status"` con `aria-live="polite"`
- `ErrorState` — título y mensaje por defecto y personalizados, slot de acción, `role="alert"`
- `ProjectCard` — título, summary, link de detalles apuntando al slug correcto, links de demo y repositorio

**Stack de testing:** Vitest 4 + Testing Library 16 + jsdom.

---

## Despliegue

Desplegado en **Vercel**: [vernel-dev-portfolio.vercel.app](https://vernel-dev-portfolio.vercel.app/)

El build genera un directorio `dist/` con assets estáticos servibles desde cualquier CDN o servidor web. React Router en modo `createBrowserRouter` requiere que el servidor redirija todas las rutas al `index.html` (SPA fallback).
