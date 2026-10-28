import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertLocalFolder,
  assertStorageTarget,
  isInsideProject,
} from "../../packages/domain/src/project-scope.js";

describe("project scope", () => {
  const projectPath = join("C:\\", "Work", "demo");

  it.each([
    [projectPath, projectPath, true],
    [projectPath, join(projectPath, "specs"), true],
    [projectPath, join("C:\\", "Work", "demo-other"), false],
  ])("checks whether %s contains %s", (project, candidate, expected) => {
    expect(isInsideProject(project, candidate)).toBe(expected);
  });

  it("normalizes an absolute local folder", () => {
    expect(assertLocalFolder(join(projectPath, ".", "specs"))).toBe(join(projectPath, "specs"));
  });

  it("rejects a relative local folder", () => {
    expect(() => assertLocalFolder("specs")).toThrow("absolute local path");
  });

  it("rejects a storage target outside the project boundary", () => {
    expect(() => assertStorageTarget(projectPath, join("C:\\", "Work", "other"))).toThrow(
      "explicit confirmation",
    );
  });
});
