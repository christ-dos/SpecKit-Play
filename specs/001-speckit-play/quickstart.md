# Quickstart Validation: SpecKit Play

## Prerequisites

- Windows 10/11
- Node.js 22 LTS and the project package manager
- Claude Code installed and available from PowerShell
- A disposable test project containing a minimal Spec Kit setup

## Validation flow

1. Launch `speckit-ui` from the disposable project directory.
2. Start a timer at launch; confirm the browser shows the detected project, session choices, and specification storage options, then complete the initial configuration within 3 minutes.
3. Choose a new session and start Specify; verify progress and the saved result.
4. Continue through Clarify with one recommended answer and one custom answer.
5. Run Analyze; accept one recommendation, reject another, confirm, and verify the rerun.
6. Open skills, change the selection before Implement, then verify actual skill usage in the result.
7. Run Implement in the disposable project and verify files changed, tests, errors, permissions,
   and final status are visible.
8. Close and relaunch the application; start a timer and verify that context, history, decisions,
   and completed results are recoverable within 30 seconds.
9. Repeat with an occupied session, denied permission, cancelled run, unavailable storage, and
   keyboard-only navigation; verify the recovery and accessibility requirements.

Expected outcome: every primary scenario in `spec.md` can be demonstrated without a remote
SpecKit service or an IntelliJ plugin.
