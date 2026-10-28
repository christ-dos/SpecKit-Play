import { describe, expect, it } from "vitest";
import {
  canTransition,
  createProjectContext,
  createWorkflowRun,
  type WorkflowStep,
} from "../../packages/domain/src/entities.js";

describe("domain entities", () => {
  it("creates a project context with an in-project storage target", () => {
    const context = createProjectContext("C:\\Work\\demo");

    expect(context.projectPath).toBe("C:\\Work\\demo");
    expect(context.storageTarget).toBe("C:\\Work\\demo");
    expect(context.preferences.selectedSkills).toEqual([]);
  });

  it("creates a queued workflow run", () => {
    const run = createWorkflowRun("project-1", "session-1", "specify");

    expect(run.status).toBe("queued");
    expect(run.step satisfies WorkflowStep).toBe("specify");
  });

  it.each([
    ["queued", "running", true],
    ["running", "completed", true],
    ["running", "queued", false],
    ["completed", "running", false],
  ] as const)("validates %s -> %s as %s", (from, to, expected) => {
    expect(canTransition(from, to)).toBe(expected);
  });
});
