# Local Workflow Contract

This contract describes the boundary between the browser UI and the local orchestration layer.
The transport may be HTTP plus a local event channel, but the message shapes and behavior are
implementation-independent.

## Commands

- `context.load`: return project context, storage choices, sessions, and preferences.
- `context.save`: validate and persist changed context after user confirmation where required.
- `skills.list`: return discoverable local skills and descriptions.
- `workflow.start`: accept a step, inputs, session reference, and selected skills.
- `workflow.respond`: submit a Clarify answer or Analyze disposition.
- `workflow.confirm`: confirm a correction, storage target, permission, or implementation action.
- `workflow.cancel`: request cancellation and return the final observed state.
- `history.list`: return retained runs and decisions for the project.

## Events

Each event includes `runId`, `sequence`, `timestamp`, and `type`. Types include `state-changed`,
`output`, `question`, `finding`, `permission-required`, `files-changed`, `test-result`, `error`,
and `completed`.

The UI must tolerate duplicate or missing intermediate output by using sequence numbers and the
persisted final state. Commands must be rejected when the session is occupied, the project
context is stale, or the requested file scope is not approved.
