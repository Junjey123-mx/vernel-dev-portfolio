import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders the default title and message", () => {
    render(<ErrorState />);
    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo cargar la información. Intenta nuevamente."),
    ).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(<ErrorState title="Error de red" message="Sin conexión a internet." />);
    expect(screen.getByText("Error de red")).toBeInTheDocument();
    expect(screen.getByText("Sin conexión a internet.")).toBeInTheDocument();
  });

  it("renders action node when provided", () => {
    render(<ErrorState action={<button>Reintentar</button>} />);
    expect(screen.getByRole("button", { name: "Reintentar" })).toBeInTheDocument();
  });

  it("does not render action slot when action is not provided", () => {
    render(<ErrorState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("has role alert", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
