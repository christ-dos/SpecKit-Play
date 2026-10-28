export interface EventLogEntry {
  runId: string;
  sequence: number;
  timestamp: string;
  event: string;
  payload: unknown;
}

export class EventLog {
  private readonly entries = new Map<string, EventLogEntry[]>();

  append(runId: string, event: string, payload: unknown): EventLogEntry {
    const runEntries = this.entries.get(runId) ?? [];
    const entry: EventLogEntry = {
      runId,
      sequence: runEntries.length + 1,
      timestamp: new Date().toISOString(),
      event,
      payload,
    };
    runEntries.push(entry);
    this.entries.set(runId, runEntries);
    return entry;
  }

  list(runId: string): readonly EventLogEntry[] {
    return this.entries.get(runId) ?? [];
  }
}
