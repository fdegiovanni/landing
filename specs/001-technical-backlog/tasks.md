# Technical Backlog Tasks

**Input:** `specs/001-technical-backlog/spec.md` and `specs/001-technical-backlog/plan.md`  
**Workflow:** Spec Kit SDD with Gitflow branches.

## Phase 0 - Backlog Setup

- [ ] T001 Confirm Spec Kit initialization strategy. If running `specify init`, preserve `.specify/memory/constitution.md`.
- [ ] T002 Create Gitflow tracking issues from this file, or run `/speckit.taskstoissues` after Spec Kit is installed.
- [ ] T003 Confirm the integration branch policy: current branch-only flow or `develop` plus feature/bugfix branches.

## Phase 1 - P0 TypeScript Compile Recovery

**Branch:** `bugfix/typescript-compile-recovery`

- [ ] T004 Run `npx tsc --noEmit` and save the current failing output in the PR description.
- [ ] T005 Fix `src/app/projects/[id]/page.tsx` so `params` satisfies Next 15 generated route props.
- [ ] T006 Create reachable blog type definitions, preferably `src/types/blog.ts`, for `HashnodePost`, `HashnodeResponse`, and `BlogSectionProps`.
- [ ] T007 Update blog imports in `src/lib/hashnode-api.ts`, `src/components/blog-section.tsx`, `src/components/blog-post-card.tsx`, and `src/app/terminal/page.tsx`.
- [ ] T008 Add defensive handling in `src/lib/hashnode-api.ts` for GraphQL errors, missing `publication`, and empty edges.
- [ ] T009 Fix implicit `any` errors in blog filtering and tag rendering.
- [ ] T010 Fix `src/app/links/components/link-card.tsx` by narrowing dynamic Lucide icon resolution to a valid component type.
- [ ] T011 Fix `src/components/ai-adventures-carousel.tsx` to use the actual carousel API type and keep dot navigation working.
- [ ] T012 Fix `src/app/uses/page.tsx` and `src/data/uses.ts` so `UseItem` is a valid discriminated union with stable keys.
- [ ] T013 Run `npx tsc --noEmit`; expected result: exit code 0.
- [ ] T014 Commit with `fix: restore TypeScript compile`.

## Phase 2 - P0 Contact Submission Consistency

**Branch:** `bugfix/contact-submission-consistency`

- [ ] T015 Decide the canonical contact path: Server Action only, API route only, or shared persistence used by both.
- [ ] T016 Move Supabase insert logic into a reusable server-only function if both paths remain.
- [ ] T017 Guard missing `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` with controlled runtime errors.
- [ ] T018 Update `src/app/api/contact/route.ts` so it never returns success without persistence or delivery.
- [ ] T019 Keep or remove Upstash rate limiting based on whether the API route remains active.
- [ ] T020 Submit a test contact message in a safe environment and verify persistence.
- [ ] T021 Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
- [ ] T022 Commit with `fix: make contact submission consistent`.

## Phase 3 - P1 Mobile Header Menu

**Branch:** `bugfix/mobile-header-menu`

- [ ] T023 Add a small-screen menu trigger in `src/components/header.tsx`.
- [ ] T024 Wire the trigger to `setIsMenuOpen(true)`.
- [ ] T025 Verify the existing close button and nav link close behavior still work.
- [ ] T026 Smoke-test mobile viewport navigation for all entries in `src/lib/nav-links.ts`.
- [ ] T027 Run `npm run lint`.
- [ ] T028 Commit with `fix: restore mobile navigation trigger`.

## Phase 4 - P1 Lint Cleanup

**Branch:** `bugfix/lint-cleanup`

- [ ] T029 Run `npm run lint` and use the current output as the task checklist.
- [ ] T030 Remove unused imports and variables from lint-reported files.
- [ ] T031 Escape JSX quote text in `src/app/uses/page.tsx` and `src/components/blog-section.tsx`.
- [ ] T032 Resolve hook dependency warnings or document intentional dependency behavior locally.
- [ ] T033 Review `next/image` warnings and either convert eligible images or record accepted warnings in the PR.
- [ ] T034 Run `npm run lint`; expected result: exit code 0 or documented accepted warnings only.
- [ ] T035 Commit with `fix: clean lint baseline`.

## Phase 5 - P2 Build And Font Reliability

**Branch:** `feature/local-font-build-reliability`

- [ ] T036 Re-run `npm run build` in an environment with network access to confirm whether the Google Fonts error is local-only.
- [ ] T037 If local/offline builds are required, replace remote `next/font/google` usage in `src/app/layout.tsx` and `src/app/links/layout.tsx` with local fonts.
- [ ] T038 If remote fonts remain, document the network requirement in `README.md`.
- [ ] T039 Run `npm run build`; expected result: exit code 0 in the chosen build environment.
- [ ] T040 Commit with `chore: document build font requirements` or `feat: use local fonts for reliable builds`.

## Phase 6 - P2 Blog Resilience Hardening

**Branch:** `feature/blog-resilience-hardening`

- [ ] T041 Add explicit empty-state behavior for Hashnode outages or empty publications.
- [ ] T042 Add a small manual QA checklist for `/blog` search, tags, pagination, and load-more behavior.
- [ ] T043 Verify `fetchHashnodePosts` respects `next: { revalidate: 3600 }` or update the plan if client-side fetching makes that cache ineffective.
- [ ] T044 Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
- [ ] T045 Commit with `feat: harden blog loading states`.

## Final Checkpoint

- [ ] T046 Smoke-test `/`, `/about`, `/projects`, `/projects/landing-personal`, `/blog`, `/terminal`, `/contact`, `/uses`, and `/links`.
- [ ] T047 Confirm all P0 and P1 branches are merged before P2 work ships.
- [ ] T048 Update this backlog spec if implementation discoveries change scope.
