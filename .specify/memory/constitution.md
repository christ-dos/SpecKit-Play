<!--
Sync Impact Report
- Version change: template → 1.0.0
- Modified principles: none; replaced scaffold placeholders with initial project principles
- Added sections: Product Scope & Local-First Constraints; Delivery Quality Gates
- Removed sections: none
- Follow-up TODOs: none
-->

# SpecKit Play Constitution

## Core Principles

### I. User-Guided Workflow
Every feature MUST reduce the cognitive load of running Spec Kit while keeping the user
in control of each consequential action. The interface MUST present one primary action at a
time, explain recommendations, and preserve access to the underlying command and result.

### II. Local-First and Explicit Consent
SpecKit Play MUST operate locally without a remote SpecKit service. It MUST not silently modify
files outside the selected project, take concurrent control of an occupied Claude session, or
perform an irreversible action without explicit confirmation. Session handoff and recovery MUST
be designed as secure, visible operations.

### III. Observable Execution
Every workflow step MUST expose its current state, streamed output when available, errors,
required permissions, changed files, and test results. A user MUST be able to understand what
Claude Code did, what remains pending, and how to recover from a failure.

### IV. Accessible and Conversational by Default
The product MUST provide a French-language interface that remains usable with keyboard
navigation, clear focus states, readable contrast, semantic labels, and understandable error
messages. Conversation, recommendations, and history MUST complement—not replace—explicit
controls and status information.

### V. Minimal, Testable Evolution
Work MUST stay within the smallest coherent scope that delivers user value. Each feature MUST
define independently testable user scenarios, measurable success criteria, and failure paths.
New dependencies, architectural complexity, and out-of-scope integrations require documented
justification.

## Product Scope & Local-First Constraints

Version one covers the Specify, Clarify, Plan, Tasks, Analyze, and Implement journey, with
Constitution and Checklist available as advanced options. It includes local project detection,
session selection or secure handoff, specification storage preferences, local skills discovery,
history, and result retention. Multi-user collaboration, cloud deployment, rewriting Spec Kit,
concurrent control of active sessions, and silent off-project changes are out of scope.

## Delivery Quality Gates

Before implementation, requirements MUST include acceptance scenarios, edge cases, assumptions,
and measurable outcomes. Before review, the feature MUST be checked against the constitution,
manual or automated tests MUST cover the primary flow, and UI changes MUST include a reproducible
verification path plus screenshots or equivalent evidence when useful.

## Governance

This constitution is the governing quality and scope reference for SpecKit Play. Pull requests
and feature reviews MUST verify compliance with its principles or explicitly document a justified
exception. Amendments MUST update this file, explain the impact, and increment the version using
Semantic Versioning: MAJOR for incompatible governance changes, MINOR for new principles or
sections, and PATCH for clarifications. The constitution takes precedence over local conventions
when they conflict.

**Version**: 1.0.0 | **Ratified**: 2026-10-28 | **Last Amended**: 2026-10-28
