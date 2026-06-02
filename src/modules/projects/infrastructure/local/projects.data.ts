import type { Project } from "@/modules/projects/domain/Project";

export const projects: Project[] = [
  {
    id: "retrosound-store",
    slug: "retrosound-store",
    title: "RetroSound Store",
    shortTitle: "RetroSound",
    summary:
      "Plataforma de e-commerce full-stack para una tienda de música física, con panel administrativo multi-rol, portal de proveedores y reportería SQL avanzada.",
    description:
      "RetroSound es una aplicación full-stack para gestionar una tienda de música física, desarrollada como proyecto del curso Bases de Datos 1 (UVG, Ciclo 1 2026). Implementa flujo completo de e-commerce (catálogo, carrito persistente en base de datos, checkout transaccional con IVA), panel de administración con cinco roles diferenciados, portal de proveedores y reportería avanzada con exportación CSV. El backend usa NestJS 11 con Prisma ORM sobre PostgreSQL, con operaciones críticas en stored procedures plpgsql con control de concurrencia. El frontend está construido con React 19, TanStack Query v5 y Tailwind CSS v4. Desplegado con Docker, backend serverless en Vercel y frontend estático en Netlify.",
    role:
      "Desarrollador full-stack individual: diseñé e implementé el backend en NestJS, el frontend en React, el esquema PostgreSQL, los stored procedures transaccionales y el deploy en Vercel y Netlify.",
    kind: "academic",
    status: "deployed",
    categories: ["fullstack", "frontend", "backend", "database", "docker", "academic", "deployed"],
    featured: true,
    priority: 1,
    stack: [
      { name: "React", category: "frontend", featured: true },
      { name: "TypeScript", category: "language", featured: true },
      { name: "NestJS", category: "backend", featured: true },
      { name: "PostgreSQL", category: "database", featured: true },
      { name: "Prisma", category: "database", featured: true },
      { name: "TanStack Query", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Radix UI", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Vite", category: "tool" },
      { name: "Docker", category: "devops" },
      { name: "Vercel", category: "devops" },
      { name: "Netlify", category: "devops" },
      { name: "JWT", category: "backend" },
      { name: "Vitest", category: "testing" },
    ],
    highlights: [
      {
        title: "E-commerce completo con checkout transaccional",
        description:
          "Catálogo con búsqueda, carrito persistente en base de datos, checkout que invoca stored procedures y desglose de IVA al 12%.",
      },
      {
        title: "Panel administrativo multi-rol",
        description:
          "Dashboard con métricas en tiempo real, gestión de inventario, ventas, clientes y empleados con cinco roles diferenciados y guards dobles en backend y frontend.",
      },
      {
        title: "Reportería SQL avanzada con exportación CSV",
        description:
          "Ocho tipos de informe con CTEs, DENSE_RANK, subqueries correlacionadas con EXISTS y STRING_AGG. Exportación CSV generada en el backend.",
      },
      {
        title: "Portal de proveedores independiente",
        description:
          "Módulo para registrar entregas, generar órdenes de compra y confirmar recepción de stock con control de concurrencia por stored procedure.",
      },
      {
        title: "iTunes API para enriquecimiento de portadas",
        description:
          "Consulta automática a la iTunes Search API con normalización de tildes, selección fuzzy del mejor match y caché en memoria.",
      },
    ],
    decisions: [
      {
        title: "Stored procedures con SELECT FOR UPDATE ordenado",
        description:
          "Las operaciones de stock (checkout, recepción) se ejecutan en procedures plpgsql con SELECT FOR UPDATE ordenado por id_producto.",
        reason:
          "Previene deadlocks bajo concurrencia al ordenar el acceso y garantiza rollback completo si ocurre un error en la transacción.",
      },
      {
        title: "Prisma sin migraciones sobre DDL versionado",
        description:
          "El ORM mapea al esquema existente sin generar migraciones propias; el DDL vive en scripts SQL versionados.",
        reason:
          "Práctica correcta cuando la base de datos se evalúa de forma independiente. Separa la gestión del esquema del ORM.",
      },
      {
        title: "Capa dual de base de datos: Prisma + pg raw",
        description:
          "Prisma para CRUD tipado con inferencia de tipos; pg raw para queries SQL complejos con CTEs y window functions.",
        reason:
          "Combina seguridad de tipos con expresividad SQL, usando cada herramienta donde es más adecuada.",
      },
      {
        title: "Precio snapshot en CarritoItem",
        description:
          "Cada ítem registra el precio al momento de ser agregado al carrito; el stored procedure de checkout usa ese valor, no el precio actual.",
        reason:
          "Evita el problema clásico de que el precio cambie entre 'agregar al carrito' y 'confirmar compra'.",
      },
    ],
    challenges: [
      {
        title: "Concurrencia en operaciones de stock",
        description:
          "Múltiples usuarios pueden intentar comprar el mismo producto simultáneamente, generando race conditions en el inventario.",
        solution:
          "Stored procedures con SELECT FOR UPDATE ordenado por id_producto serializan el acceso al stock y eliminan los deadlocks.",
      },
      {
        title: "Queries SQL complejos con Prisma ORM",
        description:
          "Los reportes avanzados con CTEs, DENSE_RANK y STRING_AGG no eran expresables cómodamente con el query builder de Prisma.",
        solution:
          "Se agregó pg raw como capa adicional solo para reportes, coexistiendo con Prisma para las operaciones CRUD estándar.",
      },
      {
        title: "Autenticación multi-rol en dos capas",
        description:
          "Coordinar guards de roles en el backend y redirecciones por rol en el frontend sin duplicar lógica ni crear inconsistencias.",
        solution:
          "Guards de NestJS en los endpoints y ProtectedRoute con lógica de rol en el router del frontend. Cada capa verifica en su contexto.",
      },
    ],
    improvements: [
      "Migrar el token JWT de localStorage a cookies HttpOnly para eliminar la exposición a XSS.",
      "Agregar pipeline de CI con GitHub Actions que valide lint y tests antes de cada deploy.",
      "Implementar paginación cursor-based en catálogo y reportes para escalar a inventarios grandes.",
    ],
    links: [
      { label: "Demo cliente", type: "demo", url: "", external: true },
      { label: "API backend", type: "api", url: "", external: true },
    ],
    images: [
      { src: "/images/projects/retrosound.png", alt: "Captura del proyecto RetroSound Store" },
    ],
    metrics: [
      { label: "Commits", value: "140", description: "En el repositorio, único autor" },
      { label: "Roles", value: "5", description: "Roles diferenciados con permisos granulares" },
      { label: "Tipos de reporte", value: "8", description: "Reportes SQL con exportación CSV" },
    ],
  },

  {
    id: "uvgenius",
    slug: "uvgenius",
    title: "UVGenius",
    shortTitle: "UVGenius",
    summary:
      "Plataforma universitaria full-stack para gestionar proyectos extracurriculares, con ciclo editorial de 8 estados, notificaciones en tiempo real por WebSocket y panel de administración.",
    description:
      "UVGenius es una plataforma web para centralizar proyectos extracurriculares, de investigación y extensión en la Universidad del Valle de Guatemala. Conecta estudiantes, líderes, organizaciones y administradores en un sistema con ciclo de vida editorial de 8 estados, revisiones con snapshots inmutables, notificaciones en tiempo real por WebSocket y panel de administración con métricas. Construida con NestJS 11, Prisma, PostgreSQL 17, Redis, Next.js 16 con App Router y Socket.io. Infraestructura dockerizada con CI/CD automatizado a Azure VM vía GitHub Actions. Proyecto colaborativo académico desarrollado en 4 sprints Scrum.",
    role:
      "Desarrollador principal de features end-to-end en el equipo: implementé el panel de administración completo (backend + frontend), el sistema de revisión editorial con snapshots, el formulario multi-paso de creación de proyectos y el flujo de detalle con búsqueda. El equipo colaboró en diseño, planificación y documentación.",
    kind: "collaborative",
    status: "deployed",
    categories: [
      "fullstack",
      "frontend",
      "backend",
      "database",
      "docker",
      "collaborative",
      "deployed",
    ],
    featured: true,
    priority: 2,
    stack: [
      { name: "Next.js", category: "frontend", featured: true },
      { name: "React", category: "frontend", featured: true },
      { name: "TypeScript", category: "language", featured: true },
      { name: "NestJS", category: "backend", featured: true },
      { name: "PostgreSQL", category: "database", featured: true },
      { name: "Prisma", category: "database" },
      { name: "Redis", category: "database" },
      { name: "Socket.io", category: "backend" },
      { name: "TanStack Query", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Radix UI", category: "frontend" },
      { name: "Zod", category: "tool" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Docker", category: "devops" },
      { name: "GitHub Actions", category: "devops" },
      { name: "Vitest", category: "testing" },
    ],
    highlights: [
      {
        title: "Ciclo de vida editorial de 8 estados",
        description:
          "Proyectos pasan por BORRADOR, EN_REVISION, OBSERVADO, PUBLICADO, EN_PROGRESO, EN_SOLICITUD_CIERRE, CERRADO y CANCELADO con transiciones protegidas en backend.",
      },
      {
        title: "Revisiones con snapshots inmutables",
        description:
          "Cada revisión captura el estado exacto del proyecto al momento del envío. El historial de auditoría es confiable incluso si el autor modifica el borrador.",
      },
      {
        title: "Notificaciones en tiempo real por WebSocket",
        description:
          "Socket.io con autenticación JWT, rooms por usuario y 23 tipos de notificaciones, incluyendo alertas de postulaciones y cambios de estado de proyectos.",
      },
      {
        title: "Panel de administración con métricas de plataforma",
        description:
          "Dashboard con 7 KPIs, gestión de usuarios paginada con filtros por rol y estado, drawer de detalle condicional y acciones con confirmación.",
      },
      {
        title: "CI/CD automatizado a Azure VM",
        description:
          "GitHub Actions construye imágenes Docker, las publica en GHCR y las despliega vía SSH a Azure VM con health check y seed automáticos en cada push a main.",
      },
    ],
    decisions: [
      {
        title: "Índice parcial único para revisiones pendientes",
        description:
          "Un índice parcial a nivel de base de datos garantiza que solo exista una revisión PENDIENTE por proyecto.",
        reason:
          "Elimina race conditions que la lógica de aplicación no puede evitar: cualquier segunda revisión PENDIENTE falla a nivel de constraint, no en código.",
      },
      {
        title: "Snapshot JSON inmutable en revisiones",
        description:
          "El campo snapshotProyecto captura el estado completo del proyecto al momento del envío a revisión.",
        reason:
          "Permite historial de auditoría inmutable: si el autor modifica el borrador mientras el admin revisa, la revisión sigue mostrando el estado enviado originalmente.",
      },
      {
        title: "Docker profiles para separar infra de apps",
        description:
          "docker compose up -d levanta solo PostgreSQL y Redis; --profile app agrega backend y frontend.",
        reason:
          "Permite trabajar con la base de datos dockerizada y el código en hot-reload local sin reconstruir imágenes en cada cambio.",
      },
      {
        title: "Dual baseURL en cliente HTTP según contexto",
        description:
          "El cliente HTTP detecta si se ejecuta en SSR (Node.js) o en el browser y ajusta la URL del API para cada contexto.",
        reason:
          "Resuelve el problema de resolución de dominio y CORS en producción con proxy inverso sin necesitar configuración adicional de Nginx.",
      },
    ],
    challenges: [
      {
        title: "Estado de revisión sin race conditions",
        description:
          "Dos administradores podían reclamar la misma revisión simultáneamente si la validación estaba solo en el servicio.",
        solution:
          "Índice parcial único en base de datos que hace fallar cualquier segunda revisión PENDIENTE para el mismo proyecto a nivel de constraint.",
      },
      {
        title: "SSR vs. CSR en Next.js App Router",
        description:
          "Algunas páginas necesitaban parámetros de URL en el servidor pero estado interactivo y mutaciones en el cliente.",
        solution:
          "Server Components extraen parámetros de URL y los pasan a Client Components que manejan estado e interacción, separando responsabilidades claramente.",
      },
      {
        title: "Deploy de cuatro servicios coordinado",
        description:
          "Coordinar el pipeline CI/CD para un sistema con PostgreSQL, Redis, backend NestJS y frontend Next.js en una VM Azure.",
        solution:
          "GitHub Actions con build multi-stage, push a GHCR y deploy SSH con health check antes de considerar el deploy exitoso.",
      },
    ],
    improvements: [
      "Migrar el almacenamiento del JWT de localStorage a cookies HttpOnly con SameSite=Strict.",
      "Agregar suite de tests de integración con supertest para los controladores de NestJS.",
      "Integrar Swagger/OpenAPI con @nestjs/swagger para documentación interactiva automática de la API.",
    ],
    links: [
      { label: "Demo en producción", type: "demo", url: "http://158.23.57.118", external: true },
    ],
    images: [{ src: "/images/projects/uvgenius.png", alt: "Captura del proyecto UVGenius" }],
    metrics: [
      {
        label: "Estados del ciclo editorial",
        value: "8",
        description: "Estados en el ciclo de vida de proyectos",
      },
      {
        label: "Tipos de notificación",
        value: "23",
        description: "Tipos de notificaciones por WebSocket",
      },
      {
        label: "Módulos NestJS",
        value: "15+",
        description: "Módulos de dominio en el backend",
      },
    ],
  },

  {
    id: "resident-evil-tracker",
    slug: "resident-evil-tracker",
    title: "Resident Evil Franchise Tracker",
    shortTitle: "RE Tracker",
    summary:
      "Catálogo personal full-stack para registrar y calificar los juegos de la franquicia Resident Evil, con API FastAPI, PostgreSQL, frontend Vanilla JS sin dependencias y deploy en Vercel y Azure.",
    description:
      "Resident Evil Franchise Tracker es una aplicación full-stack de catálogo personal para registrar entradas de la franquicia con más de 20 campos validados (año, plataformas, protagonistas, amenaza, orden cronológico), calificaciones personales, subida de portadas vía Cloudinary, dashboard con estadísticas y log de auditoría automático. El backend usa FastAPI con SQLModel sobre PostgreSQL 17, desplegado serverless en Vercel con Docker para desarrollo local. El frontend está construido con Vanilla JavaScript y ES Modules nativos sin bundler ni framework, servido desde un servidor Apache en Azure VM. Proyecto individual con dos repositorios separados y 49 commits en total.",
    role:
      "Desarrollador full-stack individual: diseñé la arquitectura modular por dominio del backend, implementé la API REST completa con FastAPI, el frontend con Vanilla JS en cuatro capas explícitas, la integración con Cloudinary y el deploy en Vercel y Azure.",
    kind: "personal",
    status: "deployed",
    categories: ["fullstack", "frontend", "backend", "api", "database", "docker", "deployed"],
    featured: true,
    priority: 3,
    stack: [
      { name: "FastAPI", category: "backend", featured: true },
      { name: "Python", category: "language", featured: true },
      { name: "PostgreSQL", category: "database", featured: true },
      { name: "SQLModel", category: "database" },
      { name: "Pydantic", category: "tool" },
      { name: "Uvicorn", category: "backend" },
      { name: "JavaScript", category: "language", featured: true },
      { name: "HTML5", category: "frontend" },
      { name: "CSS3", category: "frontend" },
      { name: "Cloudinary", category: "other" },
      { name: "Docker", category: "devops" },
      { name: "Vercel", category: "devops" },
      { name: "Azure", category: "devops" },
    ],
    highlights: [
      {
        title: "API REST modular por dominio",
        description:
          "Cada módulo (archive_entries, personal_ratings, activity_logs, dashboard, cover_assets) es autocontenido con model, schema, repository, service, mapper y router propios.",
      },
      {
        title: "Frontend Vanilla JS sin dependencias",
        description:
          "Cuatro capas explícitas (core utilities, services, pure function components, page controllers) con ES Modules nativos. Sin npm, sin bundler, cero overhead.",
      },
      {
        title: "Log de auditoría automático con persistencia",
        description:
          "Cada mutación genera un registro con acción, mensaje y valores anterior/nuevo. Los logs persisten al borrar el juego gracias a ON DELETE SET NULL.",
      },
      {
        title: "Dashboard con estadísticas agregadas",
        description:
          "Total de entradas, calificación promedio, juego mejor calificado, timeline histórico por año y feed de actividad reciente.",
      },
    ],
    decisions: [
      {
        title: "Arquitectura modular vertical en el backend",
        description:
          "Cada dominio encapsula sus propias capas (model, schema, repository, service, mapper, router) en lugar de carpetas globales por tipo.",
        reason:
          "Hace cada módulo autocontenido: si se extrajera como microservicio o se cambiara el framework, todo el código relevante está en un solo lugar.",
      },
      {
        title: "Frontend Vanilla JS con ES Modules nativos",
        description:
          "Sin dependencias npm, sin bundler. El sitio es servible desde Apache con una copia directa de archivos.",
        reason:
          "Demuestra comprensión directa del DOM y del lenguaje sin que un framework lo abstraiga. Para este alcance, añadir React habría sido over-engineering.",
      },
      {
        title: "URL params como estado del filtrado",
        description:
          "Los filtros de búsqueda, orden y página se persisten en la URL del navegador en la página de archivo.",
        reason:
          "Permite compartir búsquedas exactas, funciona con el botón atrás del navegador y no requiere ninguna librería de routing.",
      },
      {
        title: "Promise.allSettled para carga concurrente",
        description:
          "La página de detalle carga datos del juego, calificación y actividad en paralelo con Promise.allSettled.",
        reason:
          "Si una petición falla (por ejemplo, el juego no tiene calificación), las otras secciones igualmente se renderizan en lugar de mostrar un error total.",
      },
    ],
    challenges: [
      {
        title: "Conexión a base de datos con caracteres especiales",
        description:
          "Las contraseñas de Supabase pueden contener caracteres como @ o # que rompen el formato del DATABASE_URL.",
        solution:
          "Configuración dual: DATABASE_URL completa o componentes separados con URL-encoding automático de caracteres especiales.",
      },
      {
        title: "Frontend sin abstracción de framework",
        description:
          "Manejar estado, eventos, renderizado condicional y componentes reutilizables sin React, Vue ni Angular.",
        solution:
          "Patrón de componentes como funciones puras que retornan strings HTML. Los page controllers son los únicos con estado, separando vista de lógica.",
      },
      {
        title: "Persistencia de logs de auditoría al borrar entidades",
        description:
          "Al borrar un juego, los registros de actividad no debían perderse para mantener el historial de auditoría.",
        solution:
          "Relación con ON DELETE SET NULL: los logs sobreviven al borrado y quedan con la referencia en null, preservando el historial.",
      },
    ],
    improvements: [
      "Agregar autenticación con JWT o API Key para proteger los endpoints de escritura.",
      "Implementar suite de pruebas con pytest para los endpoints principales del backend.",
      "Configurar migraciones de base de datos con Alembic para gestionar cambios de esquema de forma reproducible.",
    ],
    links: [
      { label: "API (Vercel)", type: "api", url: "", external: true },
      { label: "Demo frontend", type: "demo", url: "", external: true },
    ],
    images: [
      {
        src: "/images/projects/resident-evil-tracker.png",
        alt: "Captura del proyecto Resident Evil Franchise Tracker",
      },
    ],
    metrics: [
      {
        label: "Commits",
        value: "49",
        description: "24 en backend + 25 en frontend, único autor",
      },
      {
        label: "Campos por entrada",
        value: "20+",
        description: "Campos validados por juego del catálogo",
      },
      {
        label: "Módulos de dominio",
        value: "5",
        description: "Módulos backend con capas explícitas",
      },
    ],
  },

  {
    id: "tron-snake",
    slug: "tron-snake",
    title: "TRON Snake",
    shortTitle: "TRONSnake",
    summary:
      "Juego de Snake para navegador con estética cyberpunk TRON, lógica separada en funciones puras, dificultad progresiva en 5 niveles y deploy en Vercel.",
    description:
      "TRON Snake reimagina el clásico Snake con estética cyberpunk inspirada en TRON: neón cyan, scanlines CRT, paneles HUD y efectos de brillo. Construido con React 19 y Vite, el valor técnico está en la arquitectura: la lógica de juego está separada en sistemas de funciones puras (movimiento, colisión, comida) sin estado ni dependencias de React, los custom hooks encapsulan el game loop y los controles de teclado, y los componentes son exclusivamente de renderizado. Incluye dificultad progresiva en 5 niveles (170ms a 90ms por tick), high score persistido en localStorage con carga lazy, y una máquina de estados explícita con 4 pantallas. Desplegado en Vercel.",
    role:
      "Desarrollador individual: diseñé la arquitectura desde la separación en sistemas puros hasta la UI, efectos visuales y el deploy en Vercel. Proyecto completado en 3 días.",
    kind: "personal",
    status: "deployed",
    categories: ["frontend", "game", "deployed"],
    featured: true,
    priority: 4,
    startedAt: "2026-05-27",
    completedAt: "2026-05-29",
    stack: [
      { name: "React", category: "frontend", featured: true },
      { name: "JavaScript", category: "language", featured: true },
      { name: "Vite", category: "tool" },
      { name: "CSS Modules", category: "frontend" },
      { name: "localStorage API", category: "tool" },
      { name: "ESLint", category: "tool" },
    ],
    highlights: [
      {
        title: "Sistemas de lógica pura sin dependencias de React",
        description:
          "movementSystem, collisionSystem y foodSystem son funciones que reciben datos y retornan datos, sin estado ni imports de React. Testeables de forma unitaria.",
      },
      {
        title: "Buffering de dirección entre ticks",
        description:
          "Dos estados separados (direction y nextDirection) previenen que el jugador presione dos teclas en el mismo tick y cause una colisión imposible.",
      },
      {
        title: "Dificultad progresiva en 5 niveles",
        description:
          "El intervalo del game loop se reduce de 170ms a 90ms en 5 escalones según el puntaje, sin reiniciar el juego.",
      },
      {
        title: "Máquina de estados explícita con 4 pantallas",
        description:
          "Estados bien definidos (START, RUNNING, PAUSED, GAME_OVER) con renderizado condicional de pantallas y transiciones protegidas en Game.jsx.",
      },
      {
        title: "Design tokens CSS centralizados",
        description:
          "Todos los colores, sombras y tipografía están en variables.css como custom properties. Cambiar la paleta completa requiere editar un solo archivo.",
      },
    ],
    decisions: [
      {
        title: "Separación en sistemas de funciones puras",
        description:
          "La lógica de movimiento, colisión y comida vive en funciones sin estado, sin hooks y sin importar React.",
        reason:
          "Hace el código testeable unitariamente, auditable en Game.jsx verificando solo qué llama y qué recibe, y portable a otro framework sin modificar los sistemas.",
      },
      {
        title: "Custom hook useGameLoop con cleanup garantizado",
        description:
          "Valida que onTick sea función y speed sea número finito antes de crear el intervalo, con clearInterval garantizado en el retorno del useEffect.",
        reason:
          "Demuestra criterio sobre efectos secundarios en React y previene memory leaks al cambiar de velocidad o desmontar el componente.",
      },
      {
        title: "Verificación de colisión contextual según el tick",
        description:
          "Al comer, verifica contra currentSnake.slice(1); sin comer, contra currentSnake.slice(1, -1), excluyendo la cola solo cuando va a desaparecer ese tick.",
        reason:
          "Evita el falso positivo clásico en Snake que terminaría erróneamente la partida cuando la cabeza se aproxima a la cola en el tick de crecimiento.",
      },
    ],
    challenges: [
      {
        title: "Game loop a velocidad variable",
        description:
          "La dificultad aumenta dinámicamente reduciendo el intervalo, lo que requiere recrear el setInterval correctamente sin perder el estado del juego.",
        solution:
          "useGameLoop destruye y recrea el setInterval cuando cambia la velocidad, con todas las dependencias correctamente declaradas en el useCallback del handler.",
      },
      {
        title: "Inicialización de high score sin re-renders",
        description:
          "Leer localStorage en cada render sería ineficiente y rompería en entornos sin window.",
        solution:
          "useState con función inicializadora (() => {...}) lee localStorage una sola vez al montar y verifica typeof window antes de acceder.",
      },
    ],
    improvements: [
      "Agregar tests unitarios con Vitest para los sistemas de funciones puras, que ya están estructurados para ser testeables de forma trivial.",
      "Implementar controles táctiles con swipe o botones on-screen para habilitar el juego en dispositivos móviles.",
      "Migrar a TypeScript para tipar el estado del juego, los vectores de dirección y los props de los componentes.",
    ],
    links: [
      {
        label: "Jugar en línea",
        type: "demo",
        url: "https://tron-snake-khaki.vercel.app/",
        external: true,
      },
      {
        label: "Código fuente",
        type: "repository",
        url: "https://github.com/Junjey123-mx/TRONSnake",
        external: true,
      },
    ],
    github: {
      owner: "Junjey123-mx",
      name: "TRONSnake",
      url: "https://github.com/Junjey123-mx/TRONSnake",
    },
    images: [{ src: "/images/projects/tron-snake.png", alt: "Captura del juego TRONSnake" }],
    metrics: [
      { label: "Commits", value: "21", description: "Con convención Conventional Commits" },
      {
        label: "Niveles de dificultad",
        value: "5",
        description: "Escalones de 170ms a 90ms por tick",
      },
      {
        label: "Días de desarrollo",
        value: "3",
        description: "Desde arquitectura inicial hasta deploy",
      },
    ],
  },

  {
    id: "calculatron",
    slug: "calculatron",
    title: "CalculaTRON",
    shortTitle: "CalculaTRON",
    summary:
      "Calculadora web con estética TRON construida con React 19 y TypeScript, con lógica separada en funciones puras, hook de estado con 5 transiciones, tests unitarios y Storybook.",
    description:
      "CalculaTRON demuestra arquitectura en tres capas en un proyecto React moderno: la lógica de cálculo vive en un módulo de funciones puras (calculatorEngine) independiente del framework, el estado se centraliza en un hook personalizado (useCalculator) con cinco estados de transición explícitos, y los componentes actúan exclusivamente como vista. Implementa TypeScript estricto, CSS Modules con variables CSS nativas, suite de tests con Vitest y Testing Library, historias de Storybook con variantes por componente y deploy en Vercel. React 19, Vite 8, TypeScript 6, Storybook 10 y Vitest 4 son versiones actuales al momento del desarrollo.",
    role:
      "Desarrollador individual: diseñé e implementé la arquitectura completa, desde la lógica de cálculo hasta la UI, los tests unitarios, la documentación con Storybook y el deploy en Vercel.",
    kind: "personal",
    status: "deployed",
    categories: ["frontend", "deployed"],
    featured: true,
    priority: 5,
    startedAt: "2026-05-31",
    completedAt: "2026-05-31",
    stack: [
      { name: "React", category: "frontend", featured: true },
      { name: "TypeScript", category: "language", featured: true },
      { name: "Vite", category: "tool" },
      { name: "CSS Modules", category: "frontend" },
      { name: "Vitest", category: "testing", featured: true },
      { name: "Testing Library", category: "testing" },
      { name: "Storybook", category: "tool" },
      { name: "ESLint", category: "tool" },
      { name: "Vercel", category: "devops" },
    ],
    highlights: [
      {
        title: "Lógica de cálculo en funciones puras",
        description:
          "calculatorEngine.ts no importa React. Las funciones appendDigit, calculate y formatResult son testeables directamente sin renderizar componentes.",
      },
      {
        title: "Estado centralizado en hook personalizado",
        description:
          "useCalculator maneja cinco estados (READY, INPUT, PENDING, RESULT, ERROR) con transiciones definidas. Los componentes solo llaman handleButtonPress.",
      },
      {
        title: "Tests con cobertura del camino crítico",
        description:
          "117 líneas de tests cubren operaciones encadenadas, casos de error y límites de display. No son tests de existencia, sino de comportamiento real.",
      },
      {
        title: "Storybook con historias por variante",
        description:
          "Cinco archivos de stories cubren cada componente con todas sus variantes, funcionando como documentación ejecutable del API de props.",
      },
    ],
    decisions: [
      {
        title: "calculatorEngine como módulo de funciones puras",
        description:
          "La lógica de cálculo vive en funciones sin estado ni dependencias de React, en un módulo completamente independiente del framework.",
        reason:
          "Permite tests unitarios directos sin renderizar componentes y hace la lógica portable a cualquier framework sin modificarla.",
      },
      {
        title: "CSS Modules con variables CSS nativas",
        description:
          "Cada componente tiene su .module.css propio. El tema visual (neón, glow, fuentes) vive en variables.css como custom properties.",
        reason:
          "Encapsulación por defecto sin overhead de runtime. Sin Tailwind ni styled-components para este alcance acotado.",
      },
      {
        title: "Constantes tipadas con as const",
        description:
          "OPERATIONS usa as const para derivar el tipo Operation sin necesidad de enums de TypeScript.",
        reason:
          "El sistema de tipos garantiza que no se puede pasar una cadena arbitraria donde se espera una operación, con menor verbosidad que los enums.",
      },
    ],
    challenges: [
      {
        title: "Regla de resultados negativos como estado ERROR",
        description:
          "La mayoría de calculadoras muestran resultados negativos. CalculaTRON los trata como ERROR por restricción deliberada del dominio de valores válidos.",
        solution:
          "Restricción documentada en calculatorLimits.ts que controla el espacio de valores del display. Es una decisión de diseño explicable, no un bug.",
      },
      {
        title: "Operaciones encadenadas sin pulsar C",
        description:
          "El resultado de una operación debe poder usarse como primer operando de la siguiente directamente.",
        solution:
          "useCalculator mantiene currentOperand y storedOperand separados con lógica de transición de estado que detecta el contexto de cada pulsación.",
      },
    ],
    improvements: [
      "Agregar soporte de entrada por teclado numérico para hacer la calculadora completamente usable en escritorio.",
      "Implementar un pipeline de CI con GitHub Actions que valide lint y tests en cada commit.",
      "Agregar tests E2E con Playwright para cubrir flujos completos de usuario en el navegador.",
    ],
    links: [
      {
        label: "Demo en línea",
        type: "demo",
        url: "https://calcula-tron.vercel.app/",
        external: true,
      },
      {
        label: "Código fuente",
        type: "repository",
        url: "https://github.com/Junjey123-mx/CalculaTRON",
        external: true,
      },
    ],
    github: {
      owner: "Junjey123-mx",
      name: "CalculaTRON",
      url: "https://github.com/Junjey123-mx/CalculaTRON",
    },
    images: [
      { src: "/images/projects/calculatron.png", alt: "Captura del proyecto CalculaTRON" },
    ],
    metrics: [
      {
        label: "Commits",
        value: "17",
        description: "Único autor, convención Conventional Commits",
      },
      {
        label: "Tests",
        value: "117 líneas",
        description: "Tests unitarios y de integración del engine",
      },
      {
        label: "Stories Storybook",
        value: "5",
        description: "Archivos de stories con variantes por componente",
      },
    ],
  },

  {
    id: "tripwise-android",
    slug: "tripwise-android",
    title: "TripWise Android",
    shortTitle: "TripWise",
    summary:
      "Aplicación Android nativa de reserva de alojamientos turísticos con panel de gestión para anfitriones en Jetpack Compose y generación de itinerarios con OpenAI GPT-4o-mini.",
    description:
      "TripWise es una plataforma móvil para descubrir y reservar alojamientos, construida con Kotlin y Jetpack Compose siguiendo el patrón MVVM con StateFlow. El módulo de anfitrión incluye un dashboard con estadísticas en tiempo real (ocupación, ingresos, rating), gestión de propiedades con upload de imágenes a Cloudinary, vista de reservas activas y calendario de disponibilidad. El backend en Node.js con Express 5 y MongoDB Atlas genera itinerarios personalizados usando GPT-4o-mini basándose en los intereses del usuario, duración y presupuesto de cada reserva. Proyecto académico colaborativo desarrollado en equipo de seis personas en la Universidad del Valle de Guatemala.",
    role:
      "Responsable del módulo de gestión para anfitriones en la app Android: panel de estadísticas con cuatro tabs, CRUD de propiedades con subida de imágenes a Cloudinary, calendario de disponibilidad y vista de reservas. Las funciones de búsqueda en mapa, reservas del usuario e itinerarios con IA fueron implementadas por otros miembros del equipo.",
    kind: "collaborative",
    status: "completed",
    categories: ["mobile", "collaborative"],
    featured: false,
    priority: 6,
    stack: [
      { name: "Kotlin", category: "language", featured: true },
      { name: "Jetpack Compose", category: "mobile", featured: true },
      { name: "MVVM", category: "mobile" },
      { name: "StateFlow", category: "mobile" },
      { name: "Retrofit", category: "mobile" },
      { name: "Coroutines", category: "mobile" },
      { name: "Cloudinary", category: "other" },
      { name: "Google Maps Compose", category: "mobile" },
      { name: "Firebase", category: "other" },
      { name: "Node.js", category: "backend" },
      { name: "Express", category: "backend" },
      { name: "MongoDB", category: "database" },
      { name: "OpenAI API", category: "other" },
      { name: "JWT", category: "backend" },
    ],
    highlights: [
      {
        title: "Dashboard del anfitrión con 4 tabs",
        description:
          "Panel con Overview (estadísticas), Bookings (reservas activas), Reviews (reseñas) y Calendar (disponibilidad), con swipe-to-refresh y animaciones reactivas.",
      },
      {
        title: "Gestión de propiedades con imágenes en la nube",
        description:
          "Creación y edición de propiedades con upload de imágenes desde la galería del dispositivo directamente a Cloudinary vía ImageRepository.",
      },
      {
        title: "Generación de itinerarios con IA",
        description:
          "Al confirmar una reserva, el backend llama a GPT-4o-mini con los intereses del usuario, días, presupuesto y localización de la propiedad para generar un itinerario personalizado.",
      },
      {
        title: "Navegación por roles desde el login",
        description:
          "El JWT incluye el rol del usuario (user, owner, admin) y el cliente Android enruta a activities distintas según el rol recibido en la respuesta.",
      },
    ],
    decisions: [
      {
        title: "MVVM con StateFlow sobre LiveData",
        description:
          "Los ViewModels exponen StateFlow que los composables consumen con collectAsState(), sin LiveData.",
        reason:
          "StateFlow es más idiomático con coroutines, elimina el null inicial de LiveData y es compatible con el ciclo de vida de los composables de Jetpack Compose.",
      },
      {
        title: "Repository Pattern para subida de imágenes",
        description:
          "La lógica de upload a Cloudinary está encapsulada en ImageRepository, independiente del ViewModel y de los composables.",
        reason:
          "Separa la lógica de infraestructura de la lógica de presentación, facilitando cambios de proveedor de imágenes sin tocar la UI.",
      },
      {
        title: "Soft delete en los modelos Mongoose del backend",
        description:
          "Los documentos nunca se borran físicamente; tienen un campo deleted.is que los marca como eliminados.",
        reason:
          "Permite restaurar datos, mantener integridad referencial y auditar el historial de registros sin pérdida permanente.",
      },
    ],
    challenges: [
      {
        title: "Upload de imágenes desde app móvil",
        description:
          "Subir imágenes desde la galería requería manejo de permisos, conversión de URI a InputStream y construcción de request multipart.",
        solution:
          "ImageRepository encapsula la conversión de Uri, la construcción del RequestBody multipart y la llamada a la API de Cloudinary de forma limpia.",
      },
      {
        title: "Coordinación de seis desarrolladores en paralelo",
        description:
          "Seis personas trabajando en el mismo repositorio con features paralelas que podían generar conflictos y dependencias circulares.",
        solution:
          "Flujo con feature branches, pull requests obligatorios documentados en BRANCHING_GUIDE.md y COMMIT_GUIDE.md, con más de 60 PRs registrados.",
      },
    ],
    improvements: [
      "Agregar al menos un test unitario del CalendarViewModel para verificar la lógica de disponibilidad.",
      "Extraer los SharedPreferences a un SessionManager propio en lugar de acceder a ellos directamente en los composables.",
      "Implementar controles de navegación más explícitos para usuarios nuevos en la aplicación.",
    ],
    links: [],
    images: [
      { src: "/images/projects/tripwise.png", alt: "Captura del proyecto TripWise Android" },
    ],
    metrics: [
      {
        label: "Contribuidores",
        value: "6",
        description: "Desarrolladores en el equipo del proyecto",
      },
      {
        label: "Pull Requests",
        value: "60+",
        description: "PRs documentados en el historial Git",
      },
      {
        label: "Commits propios",
        value: "10",
        description: "Commits funcionales del módulo host",
      },
    ],
  },

  {
    id: "concurrent-tetris",
    slug: "concurrent-tetris",
    title: "Concurrent Tetris Pthreads",
    shortTitle: "Tetris Concurrente",
    summary:
      "Juego de Tetris para consola en C++17 con paralelismo POSIX threads, renderizado ncurses con Unicode y motor de IA heurístico. Proyecto académico grupal.",
    description:
      "ConcurrentTetris-Pthreads es un juego de Tetris para terminal implementado en C++17 como proyecto del curso de Programación de Microprocesadores (CC3086, UVG, Ciclo 2 2025). El motor de IA paralela usa pthreads para distribuir la búsqueda de movimientos en los cores disponibles del hardware, evaluando posiciones con heurísticas reales (huecos, bumpiness, altura agregada, potencial de línea). El renderizado usa ncurses con Unicode wide characters para bordes dobles, color por tetromino y técnicas anti-flickering. Audio con SDL2. Mi aporte se centró en el módulo de display: bordes con Unicode box-drawing characters, fix de flickering y corrección del bug de rotación en las piezas J y Z. Proyecto grupal de cuatro personas.",
    role:
      "Contribuidor del módulo de rendering en equipo de cuatro personas: implementé los bordes con Unicode box-drawing characters, resolví el flickering del renderizado y corregí el bug de rotación de las piezas J y Z. La lógica de pthreads, la IA y la mecánica core del juego fueron implementadas por mis compañeros.",
    kind: "academic",
    status: "completed",
    categories: ["systems", "game", "academic"],
    featured: false,
    priority: 7,
    stack: [
      { name: "C++17", category: "language", featured: true },
      { name: "pthreads", category: "other", featured: true },
      { name: "ncurses", category: "other" },
      { name: "SDL2", category: "other" },
      { name: "CMake", category: "tool" },
    ],
    highlights: [
      {
        title: "Motor de IA con evaluación heurística paralela",
        description:
          "find_best_move distribuye la evaluación de movimientos en múltiples threads con pthreads, usando heurísticas de huecos, bumpiness y altura agregada.",
      },
      {
        title: "Detección de cores del hardware",
        description:
          "El motor detecta los procesadores disponibles con sysconf(_SC_NPROCESSORS_ONLN) y distribuye la carga en chunks para maximizar el paralelismo.",
      },
      {
        title: "Renderizado ncurses con bordes Unicode",
        description:
          "Bordes dobles con WACS_D_HLINE, color por tipo de tetromino, ghost piece y renderizado selectivo de zonas modificadas para eliminar flickering.",
      },
      {
        title: "Arquitectura modular en 10 módulos",
        description:
          "Separación en core, board, display, input, game, menu, scores, audio, AI y utils con responsabilidades claramente definidas.",
      },
    ],
    decisions: [
      {
        title: "pthreads nativos sobre abstracciones de alto nivel",
        description:
          "La evaluación paralela de la IA usa pthreads POSIX directamente en lugar de std::thread o librerías de concurrencia.",
        reason:
          "El objetivo del curso era demostrar programación concurrente a nivel de API POSIX, aprovechando los cores disponibles del hardware sin abstracciones.",
      },
      {
        title: "Renderizado selectivo en ncurses",
        description:
          "Solo se limpian y redibujan las zonas del tablero que han cambiado entre ticks, no la pantalla completa.",
        reason:
          "Elimina el flickering visible en terminales al actualizar solo los píxeles que realmente cambian, sin aumentar el overhead de renderizado.",
      },
      {
        title: "Evaluación heurística en IA sin árbol de búsqueda profundo",
        description:
          "La IA evalúa posiciones con heurísticas directas en lugar de árbol minimax.",
        reason:
          "Para un juego de un solo jugador en tiempo real, la evaluación heurística paralela ofrece decisiones de calidad suficiente con baja latencia.",
      },
    ],
    challenges: [
      {
        title: "Bug de rotación en piezas J y Z",
        description:
          "Las piezas J y Z no rotaban correctamente, resultando en posiciones inesperadas que rompían la jugabilidad.",
        solution:
          "Corrección de las matrices de rotación para esas piezas, verificando cada estado de rotación contra el comportamiento esperado del Tetris estándar.",
      },
      {
        title: "Flickering en el renderizado de ncurses",
        description:
          "Limpiar y redibujar la pantalla completa en cada tick causaba parpadeo visible que afectaba la experiencia de juego.",
        solution:
          "Renderizado selectivo: se identifican las regiones modificadas y solo se actualizan esas celdas, evitando el clear global de pantalla.",
      },
    ],
    improvements: [
      "Actualizar la sección de estructura de carpetas del README para que refleje la organización real del repositorio.",
      "Grabar un video del modo IA vs IA para visualizar el proyecto sin necesidad de compilarlo.",
      "Agregar al menos un test unitario para la lógica de evaluación heurística de la IA.",
    ],
    links: [],
    images: [
      {
        src: "/images/projects/tetris-concurrente.png",
        alt: "Captura del proyecto Concurrent Tetris Pthreads",
      },
    ],
    metrics: [
      {
        label: "Contribuidores",
        value: "4",
        description: "Desarrolladores en el equipo del proyecto",
      },
      {
        label: "Commits propios",
        value: "2",
        description: "Commits funcionales: bordes, anti-flickering, bug fix de rotación",
      },
      { label: "Módulos", value: "10", description: "Módulos de código con responsabilidades separadas" },
    ],
  },
];
