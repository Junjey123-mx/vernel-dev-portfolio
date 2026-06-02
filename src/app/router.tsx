import { createBrowserRouter } from "react-router-dom";

import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProcessPage } from "@/pages/ProcessPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { StackPage } from "@/pages/StackPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/proyectos",
    element: <ProjectsPage />,
  },
  {
    path: "/proyectos/:slug",
    element: <ProjectDetailPage />,
  },
  {
    path: "/stack",
    element: <StackPage />,
  },
  {
    path: "/proceso",
    element: <ProcessPage />,
  },
  {
    path: "/sobre-mi",
    element: <AboutPage />,
  },
  {
    path: "/contacto",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
