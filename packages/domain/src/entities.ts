import type { WorkflowStatus, WorkflowStep } from "./types.js";
import { canTransition } from "./workflow-state.js";

export type { WorkflowStatus, WorkflowStep } from "./types.js";
export { canTransition } from "./workflow-state.js";

export interface ProjectPreferences {
  language: "fr";
  lastSessionKind?: "new" | "latest" | "existing" | "handoff";
  selectedSkills: string[];
}

export interface ProjectContext {
  projectId: string;
  projectPath: string;
  displayName: string;
  storageTarget: string;
  preferences: ProjectPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowRun {
  runId: string;
  projectId: string;
  sessionId: string;
  step: WorkflowStep;
  status: WorkflowStatus;
  progressEvents: string[];
  startedAt?: string;
  endedAt?: string;
}

export function createProjectContext(projectPath: string): ProjectContext {
  const now = new Date().toISOString();
  const displayName = projectPath.replace(/[\\/]+$/, "").split(/[\\/]/).pop() || "Projet";

  return {
    projectId: projectPath.toLowerCase(),
    projectPath,
    displayName,
    storageTarget: projectPath,
    preferences: { language: "fr", selectedSkills: [] },
    createdAt: now,
    updatedAt: now,
  };
}

export function createWorkflowRun(
  projectId: string,
  sessionId: string,
  step: WorkflowStep,
): WorkflowRun {
  return {
    runId: crypto.randomUUID(),
    projectId,
    sessionId,
    step,
    status: "queued",
    progressEvents: [],
  };
}
