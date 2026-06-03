import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import { ProjectCard } from "./ProjectCard";

const retrosound = projects.find((p) => p.slug === "retrosound-store")!;

function renderCard(featured = false) {
  return render(
    <MemoryRouter>
      <ProjectCard project={retrosound} featured={featured} />
    </MemoryRouter>,
  );
}

describe("ProjectCard", () => {
  it("renders the project title", () => {
    renderCard();
    expect(screen.getByText(retrosound.title)).toBeInTheDocument();
  });

  it("renders the project summary", () => {
    renderCard();
    expect(screen.getByText(retrosound.summary)).toBeInTheDocument();
  });

  it("renders a details link pointing to the project slug", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /detalles/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/proyectos/${retrosound.slug}`);
  });

  it("renders a demo link when the project has one", () => {
    renderCard();
    expect(screen.getByRole("link", { name: /demo/i })).toBeInTheDocument();
  });

  it("renders a repository link when the project has one", () => {
    renderCard();
    expect(
      screen.getByRole("link", { name: new RegExp(`código de ${retrosound.title}`, "i") }),
    ).toBeInTheDocument();
  });
});
