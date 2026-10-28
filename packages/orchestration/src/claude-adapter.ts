import type { WorkflowStep } from "../../domain/src/entities.js";

export interface ExecutionRequest {
  projectPath: string;
  sessionId: string;
  step: WorkflowStep;
  input?: unknown;
  selectedSkills: string[];
}

export type ExecutionEvent =
  | { type: "state-changed"; status: string }
  | { type: "output"; chunk: string }
  | { type: "permission-required"; description: string }
  | { type: "error"; message: string }
  | { type: "completed"; result: unknown };

export interface ClaudeAdapter {
  execute(request: ExecutionRequest, onEvent: (event: ExecutionEvent) => void): Promise<void>;
  cancel(runId: string): Promise<void>;
}

export class UnavailableClaudeAdapter implements ClaudeAdapter {
  async execute(_request: ExecutionRequest, onEvent: (event: ExecutionEvent) => void): Promise<void> {
    onEvent({
      type: "error",
      message: "Claude Code n’est pas encore connecté à l’adaptateur local.",
    });
  }

  async cancel(_runId: string): Promise<void> {
    // No process is owned by this placeholder adapter.
  }
}
