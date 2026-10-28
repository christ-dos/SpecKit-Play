# Data Model: SpecKit Play

## ProjectContext

- `projectId`: stable local identifier
- `projectPath`: selected project directory
- `displayName`: human-readable project name
- `storageTarget`: approved in-project or explicitly exported destination
- `preferences`: language, last session choice, selected skills, and UI preferences
- `createdAt`, `updatedAt`

Validation: project path must exist and be readable; storage target must be a local readable/writable folder and must be approved before use. Network, cloud, archive, and remote repository targets are invalid in v1.

## ClaudeSession

- `sessionId`: local reference
- `kind`: `new`, `latest`, `existing`, or `handoff`
- `status`: `available`, `starting`, `active`, `occupied`, `handoff_pending`, `handoff_confirmed`, `ended`, `interrupted`, or `unavailable`
- `projectId`, `startedAt`, `endedAt`
- `ownershipNotice`: human-readable handoff/concurrency information

An `occupied` session cannot be attached concurrently. A handoff requires a visible ready signal,
an explicit user confirmation, and a recorded transition to `handoff_confirmed`; otherwise the
application must offer a new session or retry path.

## WorkflowRun

- `runId`, `projectId`, `sessionId`
- `step`: `specify`, `clarify`, `plan`, `tasks`, `analyze`, `implement`, `constitution`, or `checklist`
- `status`: `queued`, `running`, `waiting_for_user`, `completed`, `failed`, `cancelled`, or `interrupted`
- `input`, `progressEvents`, `outputReference`, `error`, `permissions`, `startedAt`, `endedAt`

State transitions must be recorded and invalid transitions rejected.

## Decision

- `decisionId`, `runId`, `kind`: `clarify-answer` or `analyze-disposition`
- `questionOrFinding`, `options`, `recommendation`, `recommendationReason`
- `userChoice`: selected, custom, accepted, edited, or rejected
- `confirmedAt`

Analyze changes require confirmation before application.

## SkillUsage and ImplementationResult

`SkillUsage` stores skill identity, selection state, and actual usage. `ImplementationResult` stores
changed files, test outcomes, permission requests, errors, and final status. Both are linked to a
`WorkflowRun` and retained in history.
