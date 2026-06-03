import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { NeonButton } from "./NeonButton";

describe("NeonButton", () => {
  it("renders children text", () => {
    render(<NeonButton>Enviar</NeonButton>);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<NeonButton onClick={handleClick}>Click</NeonButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("has disabled attribute and aria-disabled when disabled", () => {
    render(<NeonButton disabled>Bloqueado</NeonButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("renders leftIcon when provided", () => {
    render(<NeonButton leftIcon={<span data-testid="left-icon" />}>Label</NeonButton>);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders rightIcon when provided", () => {
    render(<NeonButton rightIcon={<span data-testid="right-icon" />}>Label</NeonButton>);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});
