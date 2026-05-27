
# fdegiovanni Landing Constitution

## Core Principles

### I. Production Landing First
The public site is live at `https://www.fdegiovanni.com/` and must remain operational. Technical backlog work must be incremental, reversible, and scoped so that fixes improve reliability without changing the public identity of the landing unless a spec explicitly asks for a product change.

### II. Spec-Driven Development
All non-trivial work starts from Spec Kit artifacts in `specs/<number>-<slug>/`:
- `spec.md` defines what and why, including user stories and acceptance criteria.
- `plan.md` defines technical approach, affected files, risks, and validation.
- `tasks.md` defines ordered implementation tasks that can be executed independently.

Implementation starts only after the related spec, plan, and tasks are internally consistent.

### III. Gitflow
Use Gitflow branch intent:
- `main`: production-ready history.
- `develop`: integration branch when the project adopts a long-lived integration flow.
- `feature/<slug>`: new features or planned technical backlog items.
- `bugfix/<slug>`: fixes for non-production incidents.
- `hotfix/<slug>`: urgent production fixes cut from `main`.
- `release/<version-or-date>`: release stabilization.

Each technical backlog item should declare the expected branch type. Prefer small PRs that map to one task group or one user story.

### IV. Verification Gates
A backlog item is not complete until these checks pass or the spec records a justified exception:
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Manual browser smoke test for affected public routes

If `npm run build` fails only because the local environment cannot reach Google Fonts, record that as an environment limitation and verify with an online CI/Vercel build before release.

### V. Type Safety And Runtime Honesty
TypeScript errors, dead API paths, and fake-success responses are treated as product risks. User-facing success states must reflect persisted or delivered outcomes. Shared data contracts must live in reachable source paths and be consumed consistently.

### VI. UX Accessibility Baseline
Navigation, contact, blog, and project routes must remain usable on mobile and desktop. Interactive controls need accessible labels, visible affordances, and keyboard-friendly behavior.

## Governance

This constitution is versioned with the repo. When a future spec conflicts with these principles, update this file first and mention the change in the related plan.

**Version:** 1.0.0  
**Adopted:** 2026-05-19  
**Last Updated:** 2026-05-19
