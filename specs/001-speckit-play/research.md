# Research: SpecKit Play

## Decision: Local launcher plus browser UI

**Rationale**: The product must start from a project directory, open a browser, remain local, and
avoid an IntelliJ plugin. A launcher can establish project context and start the local service;
the browser provides the conversational workflow and accessibility surface.

**Alternatives considered**: A browser-only page cannot reliably establish the originating project
or launch from PowerShell. An IntelliJ plugin violates the stated product boundary.

## Decision: Adapter-based Claude Code execution

**Rationale**: Claude Code remains the authority for Spec Kit commands and implementation. The
application should expose a narrow execution adapter for start, handoff, progress, cancellation,
permission requests, and result collection. This isolates session mechanics from workflow views.

**Alternatives considered**: Directly coupling every view to terminal process details would make
handoff, retries, and future Claude session support difficult to test and change.

## Decision: Project-scoped JSON persistence

**Rationale**: v1 is local and single-user, and the repository already treats specification files
as project artifacts. JSON files are inspectable, portable, and sufficient for preferences,
workflow history, decisions, and execution results without introducing a database service.

**Alternatives considered**: A database adds installation and backup complexity without a v1 need.
An in-memory store loses results after restart, violating recovery requirements.

## Decision: Progressive enhancement for streamed output

**Rationale**: The UI should show incremental output when Claude Code provides it, but must also
represent pending, completed, failed, cancelled, and interrupted states when streaming is absent.

**Alternatives considered**: Requiring streaming would make the workflow unreliable across session
handoff modes and would not satisfy recovery for interrupted runs.
