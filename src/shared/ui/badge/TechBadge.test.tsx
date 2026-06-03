import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { TechBadge } from "./TechBadge";

describe("TechBadge", () => {
  it("renders the label", () => {
    render(<TechBadge label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders with each tone without error", () => {
    const tones = ["cyan", "blue", "magenta", "purple", "neutral"] as const;
    const { rerender } = render(<TechBadge label="React" tone={tones[0]} />);
    for (const tone of tones.slice(1)) {
      rerender(<TechBadge label="React" tone={tone} />);
    }
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders with sm and md size without error", () => {
    const { rerender } = render(<TechBadge label="TypeScript" size="sm" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    rerender(<TechBadge label="TypeScript" size="md" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
