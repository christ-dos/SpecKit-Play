import {
  canTransition,
  createWorkflowRun,
  type WorkflowRun,
  type WorkflowStep,
} from "../../domain/src/entities.js";
import { EventLog } from "./event-log.js";
import type { ClaudeAdapter, ExecutionRequest } from "./claude-adapter.js";

export class WorkflowRunner {
  constructor(private readonly adapter: ClaudeAdapter, private readonly eventLog = new EventLog()) {}

  async run(request: Omit<ExecutionRequest, "sessionId"> & { sessionId: string }): Promise<WorkflowRun> {
    const run = createWorkflowRun(request.projectPath, request.sessionId, request.step as WorkflowStep);
    this.transition(run, "running");

    await this.adapter.execute(request, (event) => {
      this.eventLog.append(run.runId, event.type, event);
      run.progressEvents.push(event.type);
      if (event.type === "error" && canTransition(run.status, "failed")) {
        this.transition(run, "failed");
      }
      if (event.type === "completed" && canTransition(run.status, "completed")) {
        this.transition(run, "completed");
      }
    });

    if (run.status === "running") {
      this.transition(run, "completed");
    }

    return run;
  }

  events(runId: string) {
    return this.eventLog.list(runId);
  }

  private transition(run: WorkflowRun, next: WorkflowRun["status"]): void {
    if (!canTransition(run.status, next)) {
      throw new Error(`Invalid workflow transition: ${run.status} -> ${next}`);
    }
    run.status = next;
    if (next === "running") run.startedAt = new Date().toISOString();
    if (["completed", "failed", "cancelled", "interrupted"].includes(next)) {
      run.endedAt = new Date().toISOString();
    }
  }
}
