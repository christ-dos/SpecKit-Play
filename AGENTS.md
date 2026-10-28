# Repository Guidelines

## Project Structure & Module Organization

This repository is a local, pre-specification workspace for a visual interface around Claude Code and GitHub Spec Kit.

- `00-RESUME-ECHANGES.md` through `04-PARCOURS-ET-VUES.md` contain the project brief, functional and technical specifications, and screen flows.
- `wireframes/` contains the eight view-specific wireframe documents.
- `prototype-wireframes.html` is the navigable, backend-free HTML prototype.
- `.specify/` contains Spec Kit templates, workflow configuration, integrations, memory, and PowerShell helper scripts.
- `.claude/skills/` contains repository-local Claude workflow skills.

Keep new product documentation near the existing numbered documents. Keep reusable Spec Kit behavior in `.specify/` or `.claude/skills/` rather than duplicating instructions in individual specs.

## Build, Test, and Development Commands

There is no application build or automated test suite yet. Open `prototype-wireframes.html` directly in a browser to review the prototype. For Spec Kit setup checks, run from PowerShell:

```powershell
.\specify\scripts\powershell\check-prerequisites.ps1
```

Run workflow-specific scripts only when working on the corresponding Spec Kit flow, and inspect their parameters before execution.

## Coding Style & Naming Conventions

Use UTF-8 Markdown with concise headings, short paragraphs, and ordered lists for user flows. Preserve the existing numbered filename pattern for project documents (`05-...md`) and two-digit lowercase wireframe names (`09-...md`). For HTML changes, use semantic elements, two-space indentation, and descriptive kebab-case IDs/classes. Avoid introducing dependencies while the prototype remains standalone.

## Testing Guidelines

Testing is currently manual: open the prototype, exercise every navigation path, and verify that links, labels, and layouts match the relevant wireframe. When adding interactive behavior, document a reproducible verification path in the change description. Add automated tests only after an application runtime and test framework are introduced.

## Commit & Pull Request Guidelines

No Git history is available in this checkout, so no repository-specific commit convention can be inferred. Use clear imperative subjects, such as `docs: clarify implementation flow`. Pull requests should explain the intent, list changed documents or views, link the related issue/specification when one exists, and include screenshots or a short recording for prototype UI changes.

## Security & Configuration Tips

Do not commit credentials, tokens, personal paths, or generated runtime state. Treat `.specify/` and `.claude/skills/` as executable workflow configuration: review script changes carefully and prefer explicit, repository-scoped paths when running PowerShell commands.
