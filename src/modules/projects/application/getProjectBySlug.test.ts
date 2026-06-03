import { describe, it, expect } from "vitest";

import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import { getProjectBySlug } from "./getProjectBySlug";

describe("getProjectBySlug", () => {
  it("finds a project by exact slug", () => {
    const result = getProjectBySlug(projects, "retrosound-store");
    expect(result).not.toBeNull();
    expect(result?.slug).toBe("retrosound-store");
  });

  it("finds a project case-insensitively", () => {
    const result = getProjectBySlug(projects, "RETROSOUND-STORE");
    expect(result).not.toBeNull();
    expect(result?.slug).toBe("retrosound-store");
  });

  it("trims whitespace before matching", () => {
    const result = getProjectBySlug(projects, "  retrosound-store  ");
    expect(result).not.toBeNull();
    expect(result?.slug).toBe("retrosound-store");
  });

  it("returns null for a non-existent slug", () => {
    const result = getProjectBySlug(projects, "does-not-exist");
    expect(result).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(getProjectBySlug(projects, "")).toBeNull();
  });

  it("returns null for whitespace-only string", () => {
    expect(getProjectBySlug(projects, "   ")).toBeNull();
  });
});
