# Technical Backlog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stabilize the live landing's technical foundation while preserving the current public experience.

**Architecture:** Treat this as brownfield hardening. Each fix should be isolated by Gitflow branch, validated independently, and merged through a reviewable PR. Shared contracts should move into `src/` or be imported through an explicit alias so Next, TypeScript, and runtime behavior agree.

**Tech Stack:** Next.js 15.3.1 App Router, React 19, TypeScript strict mode, Tailwind CSS, shadcn/Radix UI primitives, Supabase, Hashnode GraphQL, Upstash rate limiting.

---

## Spec Kit Workflow

Use the standard Spec Kit flow for each backlog item:

1. `/speckit.specify` to refine the selected backlog item into a focused feature spec.
2. `/speckit.plan` to confirm affected files, validation commands, and branch type.
3. `/speckit.tasks` to generate implementation tasks with file paths.
4. `/speckit.analyze` before implementation when multiple artifacts change.
5. `/speckit.implement` after the spec, plan, and tasks are aligned.

This repository now includes a project constitution at `.specify/memory/constitution.md`. If `specify init` is later run, preserve this constitution or reconcile it with the generated one.

## Gitflow Plan

- Start each backlog item from the current integration branch.
- Use `bugfix/<slug>` for corrective work that does not add product scope.
- Use `feature/<slug>` for process or resilience improvements.
- Keep branches small enough that one branch can pass all verification gates.
- Merge through PR review; do not batch unrelated P0/P1 items.

Recommended execution order:

1. `bugfix/typescript-compile-recovery`
2. `bugfix/contact-submission-consistency`
3. `bugfix/mobile-header-menu`
4. `bugfix/lint-cleanup`
5. `feature/local-font-build-reliability`
6. `feature/blog-resilience-hardening`

## File Impact Map

### TypeScript Compile Recovery

- Modify `src/app/projects/[id]/page.tsx` to align dynamic route props with Next 15.
- Create or move blog types to `src/types/blog.ts`, or update `tsconfig.json` paths if keeping top-level `types/`.
- Modify `src/lib/hashnode-api.ts` to consume the corrected blog types.
- Modify `src/components/blog-section.tsx` and `src/components/blog-post-card.tsx` to remove implicit `any`.
- Modify `src/app/terminal/page.tsx` if it imports blog types.
- Modify `src/app/links/components/link-card.tsx` to narrow dynamic Lucide icon typing.
- Modify `src/components/ai-adventures-carousel.tsx` to use the carousel API type exposed by the local UI component.
- Modify `src/app/uses/page.tsx` and `src/data/uses.ts` only if the discriminated union needs correction.

### Contact Submission Consistency

- Modify `src/lib/actions/contact-actions.ts` to guard environment variables and expose a reusable persistence function.
- Modify `src/app/api/contact/route.ts` to call the same persistence function or remove the fake-success path.
- Modify `src/components/contact-form.tsx` only if the active submission path changes.
- Consider updating `schema.sql` only if table assumptions are wrong.

### Mobile Header Menu

- Modify `src/components/header.tsx` to render the mobile trigger and wire `setIsMenuOpen(true)`.
- Verify routes from `src/lib/nav-links.ts` remain reachable.

### Lint Cleanup

- Modify lint-reported files by removing unused imports/variables and escaping JSX text:
  - `src/app/about/page.tsx`
  - `src/app/api/contact/route.ts`
  - `src/app/layout.tsx`
  - `src/app/uses/page.tsx`
  - `src/components/about.tsx`
  - `src/components/blog-section.tsx`
  - `src/components/contact-form.tsx`
  - `src/components/contact.tsx`
  - `src/components/enhanced-timeline.tsx`
  - `src/components/footer.tsx`
  - `src/components/header.tsx`

### Build And Font Reliability

- Evaluate `src/app/layout.tsx` and `src/app/links/layout.tsx`.
- Choose either remote Google Fonts with CI network access or local bundled fonts.
- Document the chosen build requirement in `README.md`.

## Risks

- The site is live, so visual changes should be minimal and smoke-tested in a browser.
- Build failure from Google Fonts may be environment-specific; do not assume production is broken solely from offline local output.
- Contact changes can affect real user messages; test against a non-production Supabase project when possible.
- Blog behavior depends on Hashnode GraphQL availability and response shape.

## Validation

Run after each branch:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Manual smoke test:

```text
/
/about
/projects
/projects/landing-personal
/blog
/terminal
/contact
/uses
/links
```

For contact-specific work, submit one test message and verify the expected persistence or delivery path.

## Rollout

1. Merge P0 fixes first.
2. Deploy after P0 fixes if all checks pass.
3. Merge P1 UX/lint cleanup.
4. Merge P2 resilience work when CI/build behavior is understood.
