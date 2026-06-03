import { describe, it, expect } from "vitest";

import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import { filterProjects } from "./filterProjects";

describe("filterProjects", () => {
  it("returns all projects when no filter is given", () => {
    expect(filterProjects(projects)).toHaveLength(projects.length);
  });

  it("returns projects sorted by priority ascending", () => {
    const result = filterProjects(projects);
    for (let i = 0; i < result.length - 1; i++) {
      const a = result[i].priority ?? Number.MAX_SAFE_INTEGER;
      const b = result[i + 1].priority ?? Number.MAX_SAFE_INTEGER;
      expect(a).toBeLessThanOrEqual(b);
    }
  });

  it("filters by category", () => {
    const result = filterProjects(projects, { category: "fullstack" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.categories.includes("fullstack"))).toBe(true);
  });

  it("filters by status", () => {
    const result = filterProjects(projects, { status: "deployed" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.status === "deployed")).toBe(true);
  });

  it("filters by kind", () => {
    const result = filterProjects(projects, { kind: "personal" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.kind === "personal")).toBe(true);
  });

  it("filters by featuredOnly", () => {
    const result = filterProjects(projects, { featuredOnly: true });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.featured === true)).toBe(true);
  });

  it("filters by query matching project title", () => {
    const result = filterProjects(projects, { query: "RetroSound" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((p) => p.title.toLowerCase().includes("retrosound"))).toBe(true);
  });

  it("filters by query matching stack tech name", () => {
    const result = filterProjects(projects, { query: "NestJS" });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((p) => p.stack.some((t) => t.name.toLowerCase() === "nestjs")),
    ).toBe(true);
  });

  it("returns empty array when query matches nothing", () => {
    expect(filterProjects(projects, { query: "xyzzy-impossible-match-9999" })).toHaveLength(0);
  });

  it("returns empty array when no projects match category", () => {
    expect(filterProjects(projects, { category: "case-study" })).toHaveLength(0);
  });
});
