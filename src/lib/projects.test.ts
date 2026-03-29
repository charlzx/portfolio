import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

describe("PROJECTS data", () => {
  it("contains unique project ids", () => {
    const ids = PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has required public links and descriptions", () => {
    for (const project of PROJECTS) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.tagline.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.metaDescription.length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(project.publishedAt))).toBe(false);
      expect(project.url.startsWith("https://") || project.url === "").toBe(true);
    }
  });

  it("is sorted by newest publishedAt first", () => {
    for (let i = 1; i < PROJECTS.length; i++) {
      const previous = Date.parse(PROJECTS[i - 1].publishedAt);
      const current = Date.parse(PROJECTS[i].publishedAt);
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });
});
