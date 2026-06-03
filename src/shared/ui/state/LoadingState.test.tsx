import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("renders the default message", () => {
    render(<LoadingState />);
    expect(screen.getByText("Cargando información...")).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<LoadingState message="Cargando proyectos..." />);
    expect(screen.getByText("Cargando proyectos...")).toBeInTheDocument();
  });

  it("has role status with aria-live polite", () => {
    render(<LoadingState />);
    const el = screen.getByRole("status");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-live", "polite");
  });

  it("uses custom label as aria-label", () => {
    render(<LoadingState label="Cargando stack" />);
    expect(screen.getByRole("status", { name: "Cargando stack" })).toBeInTheDocument();
  });
});
