import type { WorkflowStatus } from "./types.js";

const transitions: Record<WorkflowStatus, readonly WorkflowStatus[]> = {
  queued: ["running", "cancelled"],
  running: ["waiting_for_user", "completed", "failed", "cancelled", "interrupted"],
  waiting_for_user: ["running", "cancelled", "interrupted"],
  completed: [],
  failed: ["queued"],
  cancelled: ["queued"],
  interrupted: ["queued"],
};

export function canTransition(from: WorkflowStatus, to: WorkflowStatus): boolean {
  return transitions[from].includes(to);
}
