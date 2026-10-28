# Feature Specification: SpecKit Play

**Feature Branch**: `001-speckit-play`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: Create SpecKit Play, a local Windows web interface that guides users through GitHub Spec Kit via Claude Code.

## User Scenarios & Testing

### User Story 1 - Start and configure a project workflow (Priority: P1)

As a developer, I want to launch the application from a project directory, identify the project,
choose a Claude Code session, and choose where specifications are stored so that I can begin with
the correct context.

**Why this priority**: Without reliable project and session context, every later workflow step is unsafe or misleading.

**Independent Test**: Start from a supported project directory, select each available session option and storage destination, then verify that the selected context is displayed and retained after reopening.

**Acceptance Scenarios**:

1. **Given** a valid project directory, **When** the user launches the application, **Then** the project identity and available storage choices are shown.
2. **Given** a project with no active reusable session, **When** the user chooses a new session, **Then** the application clearly indicates that a new Claude Code handoff is required.
3. **Given** saved project preferences, **When** the user reopens the application for that project, **Then** the preferences are restored and can be changed before execution.

### User Story 2 - Progress through the Spec Kit workflow (Priority: P1)

As a developer, I want guided Specify, Clarify, Plan, Tasks, Analyze, and Implement steps so that I can move from an idea to working changes without repeatedly entering commands.

**Why this priority**: This is the core value of SpecKit Play.

**Independent Test**: Execute a representative workflow from Specify through Tasks and verify that each completed step unlocks the next step with its result available.

**Acceptance Scenarios**:

1. **Given** a configured project, **When** the user starts Specify, **Then** the application sends the requested operation to Claude Code and displays progress and the resulting specification.
2. **Given** a completed step, **When** the user opens the workflow view, **Then** the current step, completed steps, next available action, and stored results are visible.
3. **Given** a failed operation, **When** Claude Code returns an error or permission request, **Then** the application shows the error, required action, and a safe retry or handoff option.

### User Story 3 - Resolve Clarify questions and Analyze findings (Priority: P1)

As a developer, I want understandable recommendations for questions and findings so that I can make informed decisions before implementation.

**Why this priority**: Clarification and analysis are the safety gates that prevent incorrect or incomplete implementation.

**Independent Test**: Provide a workflow result containing multiple questions and findings, select recommended and custom responses, confirm changes, and verify that the next verification result is displayed.

**Acceptance Scenarios**:

1. **Given** questions returned by Claude Code, **When** the user opens Clarify, **Then** each question shows its proposals, a recommended option with a short reason, and a custom response control.
2. **Given** a selected Clarify answer, **When** the user confirms it, **Then** the answer is sent and the next question or completion state is displayed.
3. **Given** Analyze findings, **When** the user reviews them, **Then** findings are categorized as OK, warning, or blocking and each proposed correction can be accepted, edited, or rejected.
4. **Given** accepted corrections, **When** the user confirms application, **Then** the changes are applied visibly and the analysis is rerun.

### User Story 4 - Review skills, history, and implementation evidence (Priority: P2)

As a developer, I want to choose local Claude skills and inspect implementation evidence so that I understand which capabilities were used and what changed in my project.

**Why this priority**: Skills and execution evidence improve control, reproducibility, and trust.

**Independent Test**: Discover local skills, select a subset, revise the selection before implementation, then run an implementation and inspect the skills, files, tests, errors, and permissions recorded.

**Acceptance Scenarios**:

1. **Given** local skills are available, **When** the user opens skill selection, **Then** each skill has an understandable name, description, and selection state.
2. **Given** selected skills, **When** the user changes them before coding, **Then** the revised selection is used and the actually used skills are shown afterward.
3. **Given** an implementation run, **When** it completes or fails, **Then** the application records progress, modified files, tests, errors, permissions, and the final result.

### User Story 5 - Use advanced controls and accessible French UI (Priority: P2)

As a developer, I want optional Constitution and Checklist steps, a French accessible interface, and a complete history so that I can adapt the workflow without losing context.

**Why this priority**: These capabilities support advanced users and make the workflow dependable for repeated use.

**Independent Test**: Navigate the interface using only the keyboard, open advanced steps, inspect history, and verify that labels, focus, results, and errors remain understandable.

**Acceptance Scenarios**:

1. **Given** an active workflow, **When** the user opens advanced options, **Then** Constitution and Checklist are available without being forced into the default path.
2. **Given** completed and failed operations, **When** the user opens history, **Then** exchanges, decisions, results, errors, and timestamps can be reviewed.
3. **Given** keyboard-only use, **When** the user navigates every primary action, **Then** focus is visible, controls are reachable, and status changes are announced in understandable French.

## Edge Cases

- The selected directory is not a valid project or is inaccessible.
- No Claude Code session can be created or safely handed off.
- A session is already occupied; the application must show the occupied state, never attach concurrently, and offer only a new session or an explicit handoff when the session is marked ready.
- Claude Code returns partial output, malformed output, a timeout, a cancellation, or a permission denial.
- The user closes the browser or application during execution; completed results must remain distinguishable from unfinished work.
- A requested local storage destination is unavailable or outside the approved project scope; the application must request explicit confirmation before using the latter.
- No local skills are found, or a previously selected skill is no longer available.
- An implementation changes files and then fails tests; the result must show both the changes and the failure.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST launch locally from a project directory and identify the selected project before workflow execution.
- **FR-002**: The system MUST offer new, latest, and existing Claude Code session choices when available, while clearly indicating when a secure handoff is required.
- **FR-003**: The system MUST let users choose either a specification location inside the selected project or another local folder explicitly selected by the user; network, cloud, archive, and remote repository destinations are out of scope for version one.
- **FR-004**: The system MUST persist project context and user preferences and allow users to review or change them before execution.
- **FR-005**: The system MUST provide guided access to Specify, Clarify, Plan, Tasks, Analyze, and Implement in a visible ordered workflow.
- **FR-006**: The system MUST execute each requested workflow operation through Claude Code and display progress, streamed output when available, and the resulting artifact or status.
- **FR-007**: The system MUST support Clarify questions, proposals, recommended answers with explanations, custom answers, confirmation, and sequential follow-up questions.
- **FR-008**: The system MUST categorize Analyze findings as OK, warning, or blocking and support accepting, editing, rejecting, confirming, applying, and rerunning corrections.
- **FR-009**: The system MUST make Constitution and Checklist available as optional advanced workflow steps.
- **FR-010**: The system MUST discover local Claude skills, allow selection before early workflow phases or implementation, allow changes before coding, and show skills actually used.
- **FR-011**: The system MUST prevent concurrent control of an occupied interactive Claude session. It MUST expose the states available, occupied, handoff pending, handoff confirmed, ended, and interrupted, and permit handoff only after the user explicitly confirms that the session is ready.
- **FR-012**: The system MUST show implementation progress, modified files, test results, errors, and required permissions before and after implementation.
- **FR-013**: The system MUST provide a French interface with keyboard navigation, visible focus, semantic labels, understandable status messages, and sufficient contrast.
- **FR-014**: The system MUST retain workflow history, user decisions, exchanges, errors, and results for later review within the local project context.
- **FR-015**: The system MUST require explicit confirmation before modifying files outside the selected project or applying Analyze recommendations.
- **FR-016**: The system MUST provide actionable recovery states for cancellation, timeout, partial output, permission denial, and unavailable storage.

### Key Entities

- **Project Context**: Selected project path, detected project identity, storage preferences, and associated workflow history.
- **Claude Session**: A new, latest, existing, or handed-off execution context with availability and ownership state.
- **Workflow Run**: An ordered Spec Kit operation, its inputs, progress, output, status, errors, and timestamps.
- **Decision**: A Clarify answer or Analyze finding disposition, including recommendation, user choice, and confirmation state.
- **Local Skill**: A discoverable skill with name, description, selection state, and recorded usage.
- **Implementation Result**: Changed files, tests, permissions, errors, and final execution status.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A first-time user can configure a project and reach the first workflow action in under 3 minutes without entering a Spec Kit command manually.
- **SC-002**: At least 90% of representative users can complete a Specify-to-Tasks walkthrough without facilitator intervention.
- **SC-003**: 100% of failed or permission-blocked workflow runs display a cause, current state, and at least one safe next action.
- **SC-004**: 100% of implementation runs expose the final status, modified files, tests, errors, permissions, and actually used skills.
- **SC-005**: All primary workflow actions are reachable and understandable using keyboard-only navigation in French.
- **SC-006**: Users can reopen a project and recover its latest completed workflow results and decisions within 30 seconds.

## Assumptions

- Users run the application on Windows and have Claude Code and the required Spec Kit commands available locally.
- Claude Code remains the execution authority; SpecKit Play orchestrates, presents, records, and requests confirmation but does not rewrite Spec Kit.
- Version one is single-user and local; collaboration and remote services are out of scope.
- The selected project directory is the default authorization boundary for file changes; another local folder may be used only after explicit user selection and confirmation.
- Streamed output may be unavailable for some operations; the interface must still show a clear pending or completed state.
- Existing terminal sessions cannot be attached concurrently; supported recovery uses an explicit handoff after a ready signal or a new session. SpecKit Play must never connect automatically to an occupied session.

## Out of Scope

- Multi-user collaboration or cloud deployment.
- Rewriting the Spec Kit engine or requiring an IntelliJ plugin.
- Concurrent takeover of an already active interactive Claude session.
- Silent modification of files outside the selected project.
- Network, cloud, archive, and remote repository export destinations.
