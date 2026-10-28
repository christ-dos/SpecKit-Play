export type WorkflowStep =
  | "specify"
  | "clarify"
  | "plan"
  | "tasks"
  | "analyze"
  | "implement"
  | "constitution"
  | "checklist";

export type WorkflowStatus =
  | "queued"
  | "running"
  | "waiting_for_user"
  | "completed"
  | "failed"
  | "cancelled"
  | "interrupted";

export type SessionKind = "new" | "latest" | "existing" | "handoff";

export type DomainErrorCode = "INVALID_SCOPE" | "INVALID_TRANSITION" | "VALIDATION_ERROR";

export interface DomainError {
  code: DomainErrorCode;
  message: string;
}

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: DomainError };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err(code: DomainErrorCode, message: string): Result<never> {
  return { ok: false, error: { code, message } };
}
