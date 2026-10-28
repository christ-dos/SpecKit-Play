---

description: "Implementation tasks for SpecKit Play"
---

# Tasks: SpecKit Play

**Input**: Design documents from `/specs/001-speckit-play/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Included because the constitution requires independently testable user scenarios and accessibility verification.

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Create the TypeScript workspace layout in `apps/`, `packages/`, and `tests/`.
- [X] T002 Initialize Node.js 22 project metadata and scripts in `package.json`.
- [ ] T003 [P] Configure TypeScript, Vitest, Playwright, linting, and formatting in root configuration files.
- [ ] T004 [P] Add local development and Windows launcher documentation in `README.md`.

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Create domain enums and shared result/error types in `packages/domain/src/types.ts`.
- [ ] T006 [P] Implement project-boundary and path validation in `packages/domain/src/project-scope.ts`.
- [ ] T007 [P] Implement ProjectContext, ClaudeSession, WorkflowRun, Decision, SkillUsage, and ImplementationResult schemas in `packages/domain/src/entities.ts`.
- [ ] T008 Implement state transition validation in `packages/domain/src/workflow-state.ts`.
- [ ] T009 [P] Implement JSON persistence with atomic writes and recovery markers in `packages/persistence/src/json-store.ts`.
- [ ] T010 [P] Implement structured local event logging in `packages/orchestration/src/event-log.ts`.
- [ ] T011 Define the execution adapter interface for start, handoff, progress, cancellation, permissions, and final results in `packages/orchestration/src/claude-adapter.ts`.
- [ ] T012 Implement local command routing and event delivery in `packages/orchestration/src/local-workflow.ts`.
- [ ] T013 [P] Add domain and persistence unit tests in `tests/unit/domain.test.ts` and `tests/unit/persistence.test.ts`.

## Phase 3: User Story 1 - Start and Configure a Project Workflow (Priority: P1) 🎯 MVP

**Goal**: Detect a project, choose a session and storage destination, and retain context safely.

**Independent Test**: Launch from a disposable project, configure context, reopen it, and verify that preferences and authorization boundaries are restored.

- [ ] T014 [P] [US1] Implement project detection and session discovery in `packages/orchestration/src/context-service.ts`.
- [ ] T015 [P] [US1] Implement storage target validation and preference persistence in `packages/persistence/src/project-context-store.ts`.
- [ ] T016 [US1] Implement context and session command handlers in `packages/orchestration/src/local-workflow.ts`.
- [ ] T017 [P] [US1] Build project setup, session choice, and storage screens in `apps/web/src/features/setup/`.
- [ ] T018 [US1] Add workflow shell and route state in `apps/web/src/features/workflow/WorkflowShell.tsx`.
- [ ] T019 [US1] Implement local launcher and browser opening from a project directory in `apps/launcher/src/index.ts`.
- [ ] T020 [US1] Add setup integration tests in `tests/integration/setup-workflow.test.ts`.
- [ ] T021 [US1] Add keyboard and accessible-label coverage for setup in `tests/accessibility/setup.spec.ts`.

## Phase 4: User Story 2 - Progress Through the Spec Kit Workflow (Priority: P1)

**Goal**: Run ordered workflow steps through Claude Code and show progress and results.

**Independent Test**: Start Specify, complete it with a fake adapter, continue through Tasks, and verify persisted states and artifacts.

- [ ] T022 [P] [US2] Implement workflow command and event schemas from `specs/001-speckit-play/contracts/local-workflow.md` in `packages/orchestration/src/contracts.ts`.
- [ ] T023 [US2] Implement adapter-backed workflow execution and retry states in `packages/orchestration/src/workflow-runner.ts`.
- [ ] T024 [US2] Implement progress, output, error, and completion event persistence in `packages/persistence/src/run-store.ts`.
- [ ] T025 [P] [US2] Build step navigation and progress components in `apps/web/src/features/workflow/ProgressPanel.tsx`.
- [ ] T026 [P] [US2] Build result, error, permission, and retry components in `apps/web/src/features/workflow/RunResult.tsx`.
- [ ] T027 [US2] Add workflow integration tests with a fake Claude adapter in `tests/integration/workflow-run.test.ts`.
- [ ] T028 [US2] Add browser coverage for Specify-to-Tasks in `tests/browser/specify-to-tasks.spec.ts`.

## Phase 5: User Story 3 - Resolve Clarify and Analyze Findings (Priority: P1)

**Goal**: Present questions and findings, capture decisions, apply confirmed corrections, and rerun analysis.

**Independent Test**: Feed questions and findings into the UI, choose recommended/custom responses and dispositions, and verify the resulting commands and rerun.

- [ ] T029 [P] [US3] Implement Clarify question and recommendation entities in `packages/domain/src/clarify.ts`.
- [ ] T030 [P] [US3] Implement Analyze finding categories and disposition validation in `packages/domain/src/analyze.ts`.
- [ ] T031 [US3] Implement decision persistence and confirmation handling in `packages/orchestration/src/decision-service.ts`.
- [ ] T032 [US3] Implement correction application and analysis rerun orchestration in `packages/orchestration/src/analyze-runner.ts`.
- [ ] T033 [P] [US3] Build Clarify question and answer views in `apps/web/src/features/clarify/`.
- [ ] T034 [P] [US3] Build Analyze findings, correction review, and confirmation views in `apps/web/src/features/analyze/`.
- [ ] T035 [US3] Add decision and rerun integration tests in `tests/integration/decisions.test.ts`.
- [ ] T036 [US3] Add browser coverage for recommended, custom, accepted, edited, and rejected decisions in `tests/browser/clarify-analyze.spec.ts`.

## Phase 6: User Story 4 - Skills, History, and Implementation Evidence (Priority: P2)

**Goal**: Discover and select local skills, execute implementation, and expose evidence and history.

**Independent Test**: Select skills, alter the selection before implementation, run a fake implementation, and inspect all recorded evidence.

- [ ] T037 [P] [US4] Implement local skill discovery and metadata normalization in `packages/orchestration/src/skill-service.ts`.
- [ ] T038 [P] [US4] Implement implementation result and file-change collection in `packages/orchestration/src/implementation-service.ts`.
- [ ] T039 [US4] Implement history queries and retention in `packages/persistence/src/history-store.ts`.
- [ ] T040 [P] [US4] Build skill discovery and selection views in `apps/web/src/features/skills/`.
- [ ] T041 [P] [US4] Build implementation progress and evidence views in `apps/web/src/features/implement/`.
- [ ] T042 [P] [US4] Build history and run detail views in `apps/web/src/features/history/`.
- [ ] T043 [US4] Add implementation evidence integration tests in `tests/integration/implementation-evidence.test.ts`.
- [ ] T044 [US4] Add browser coverage for skills, implementation evidence, and history recovery in `tests/browser/implementation-history.spec.ts`.

## Phase 7: User Story 5 - Advanced Controls and Accessible French UI (Priority: P2)

**Goal**: Provide optional advanced steps, French language content, accessible controls, and resilient recovery.

**Independent Test**: Use keyboard-only navigation, open advanced steps, interrupt a run, relaunch, and recover its recorded state.

- [ ] T045 [P] [US5] Add Constitution and Checklist as optional workflow routes in `apps/web/src/features/advanced/`.
- [ ] T046 [P] [US5] Add French labels, status messages, and error translations in `apps/web/src/i18n/fr.ts`.
- [ ] T047 [US5] Implement interruption recovery and safe handoff presentation in `packages/orchestration/src/recovery-service.ts`.
- [ ] T048 [US5] Implement accessible focus management and live status announcements in `apps/web/src/shared/accessibility/`.
- [ ] T049 [US5] Add keyboard-only and contrast checks in `tests/accessibility/workflow.spec.ts`.
- [ ] T050 [US5] Add interrupted, occupied-session, permission-denied, and unavailable-storage browser scenarios in `tests/browser/recovery.spec.ts`.

## Phase 8: Polish & Cross-Cutting Concerns

- [ ] T051 [P] Add security checks for project boundary, external storage confirmation, and sensitive log redaction in `tests/security/scope-and-logging.test.ts`.
- [ ] T052 [P] Add performance measurements for launch and event rendering in `tests/performance/startup-and-events.test.ts`.
- [ ] T053 [P] Document local setup, supported session handoff, and troubleshooting in `README.md`.
- [ ] T054 Run every scenario in `specs/001-speckit-play/quickstart.md` against a disposable project and record deviations.
- [ ] T055 Review the implementation against `.specify/memory/constitution.md` and update feature documentation if needed.
- [ ] T056 [P] Measure the first-time project configuration journey and assert completion within 3 minutes in `tests/browser/setup-time-limit.spec.ts`.
- [ ] T057 [P] Measure relaunch and recovery of the latest completed workflow and assert recovery within 30 seconds in `tests/browser/recovery-time-limit.spec.ts`.

## Dependencies & Execution Order

- Setup (T001-T004) precedes Foundational (T005-T013).
- Foundational work blocks all user stories.
- US1 and US2 are the MVP path; US2 depends on US1’s context and launcher contracts.
- US3 depends on US2’s workflow event and run contracts.
- US4 depends on foundational persistence and orchestration; it can begin in parallel with US2/US3 where files do not overlap.
- US5 depends on the workflow shell and persistence recovery behavior.
- Polish follows the desired user stories.

## Parallel Opportunities

- T003-T004 and T006-T010 can run in parallel after their phase prerequisites.
- Within US1, T014-T015 and T017 can run in parallel; T016 and T018 integrate them.
- Within US3, T029-T030 and T033-T034 can run in parallel before decision integration.
- Within US4, T037-T038 and T040-T042 can run in parallel where shared UI contracts are stable.
- T051-T053 can run in parallel after the implementation slices are complete.

## Implementation Strategy

1. Deliver Setup plus Foundational infrastructure.
2. Implement US1 and validate project/session/storage setup independently.
3. Implement US2 and validate the Specify-to-Tasks MVP path.
4. Add US3 as the decision safety gate.
5. Add US4 and US5, then run the complete quickstart and cross-cutting checks.
