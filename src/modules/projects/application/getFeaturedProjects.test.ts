import { describe, it, expect } from "vitest";

import { projects } from "@/modules/projects/infrastructure/local/projects.data";

import { getFeaturedProjects } from "./getFeaturedProjects";

describe("getFeaturedProjects", () => {
  it("returns only featured projects", () => {
    const result = getFeaturedProjects(projects);
    expect(result.every((p) => p.featured === true)).toBe(true);
  });

  it("returns projects sorted by priority ascending", () => {
    const result = getFeaturedProjects(projects);
    for (let i = 0; i < result.length - 1; i++) {
      const a = result[i].priority ?? Number.MAX_SAFE_INTEGER;
      const b = result[i + 1].priority ?? Number.MAX_SAFE_INTEGER;
      expect(a).toBeLessThanOrEqual(b);
    }
  });

  it("respects the limit parameter", () => {
    const result = getFeaturedProjects(projects, 2);
    expect(result).toHaveLength(2);
  });

  it("returns all featured projects when no limit is given", () => {
    const allFeatured = projects.filter((p) => p.featured === true);
    const result = getFeaturedProjects(projects);
    expect(result).toHaveLength(allFeatured.length);
  });

  it("returns empty array for empty input", () => {
    expect(getFeaturedProjects([])).toHaveLength(0);
  });
});
