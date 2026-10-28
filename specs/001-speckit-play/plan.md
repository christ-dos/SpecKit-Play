# Implementation Plan: SpecKit Play

**Branch**: `001-speckit-play` | **Date**: 2026-10-28 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-speckit-play/spec.md`

## Summary

Build a local Windows desktop-launchable web application that guides one user through the Spec
Kit lifecycle while Claude Code remains the execution authority. A small launcher starts a
local session for the selected project, a browser UI presents the workflow, and a local
orchestration layer persists context, streams status, enforces project boundaries, and records
results. The first implementation should keep the execution adapter replaceable so Claude
session handoff can evolve without redesigning the workflow UI.

## Technical Context

**Language/Version**: TypeScript on Node.js 22 LTS

**Primary Dependencies**: React for the browser UI; a minimal local HTTP/WebSocket layer; no remote service dependency

**Storage**: Versionable JSON files under the selected project’s approved Spec Kit workspace; no database for v1

**Testing**: Vitest for unit tests; Playwright for browser workflow and accessibility checks; PowerShell smoke checks for launcher behavior

**Target Platform**: Windows 10/11 with a supported browser and local Claude Code installation

**Project Type**: Local desktop launcher plus browser-based web application

**Performance Goals**: Show the first usable application view within 3 seconds of launch; reflect available execution output within 1 second of receipt

**Constraints**: Local-only by default, single-user, project-bound file authorization, explicit confirmation for another local storage folder or other consequential changes, no automatic attachment to occupied sessions, resilient to interrupted sessions

**Scale/Scope**: One active project and one workflow run per local user; eight primary views plus optional advanced steps

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **User-Guided Workflow**: PASS — workflow state and confirmations are first-class UI requirements.
- **Local-First and Explicit Consent**: PASS — local execution, project boundary, and handoff are explicit design constraints.
- **Observable Execution**: PASS — status, output, errors, permissions, files, and tests are persisted and displayed.
- **Accessible and Conversational by Default**: PASS — French UI and keyboard/accessibility checks are required.
- **Minimal, Testable Evolution**: PASS — v1 excludes collaboration, cloud services, and concurrent takeover; user journeys are independently testable.

## Project Structure

### Documentation (this feature)

```text
specs/001-speckit-play/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── local-workflow.md
└── checklists/
    └── requirements.md
```

### Source Code (planned repository root)

```text
apps/
├── launcher/          # speckit-ui entry point and browser launch
└── web/               # React workflow interface
packages/
├── domain/            # workflow states, entities, validation
├── orchestration/     # Claude Code adapter, handoff, progress, permissions
└── persistence/       # local project context, history, result storage
tests/
├── unit/
├── integration/
├── browser/
└── accessibility/
```

**Structure Decision**: Use a small multi-package TypeScript workspace so the domain and
orchestration contracts can be tested independently from the browser UI. Keep the launcher and
web application separate because the launcher has Windows/process concerns while the UI must
remain replaceable and testable in a browser.

## Complexity Tracking

No constitution violations require justification.
