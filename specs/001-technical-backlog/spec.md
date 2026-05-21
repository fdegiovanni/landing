# Technical Backlog Specification

**Feature Branch:** `feature/technical-backlog-hardening`  
**Created:** 2026-05-19  
**Status:** Draft  
**Input:** Review of the existing live landing at `https://www.fdegiovanni.com/` and local project checks.

## Summary

Create a prioritized technical backlog for the live personal landing so future work follows Spec-Driven Development with GitHub Spec Kit and Gitflow. The backlog focuses on reliability, type safety, honest contact behavior, mobile navigation, and repeatable verification while preserving the current public experience.

## User Stories

### US1 - Maintain The Live Landing With Confidence

As the site owner, I want the project to pass local quality gates so I can safely evolve a live landing without guessing whether changes broke core routes.

**Acceptance Criteria**

1. `npx tsc --noEmit` exits successfully.
2. `npm run lint` exits successfully.
3. `npm run build` exits successfully in an environment with access to required external font hosts, or the project documents and implements a local-font alternative.
4. The verification commands are documented in backlog tasks and can be run before every PR.

### US2 - Restore Type-Safe Blog Integration

As a visitor, I want the Blog page to load Hashnode posts reliably so I can read Federico's articles without runtime surprises.

**Acceptance Criteria**

1. Blog-related types are defined in a path reachable through the configured `@/*` alias, or imports are updated to match the current `types/` location.
2. `fetchHashnodePosts` handles missing `publication`, GraphQL errors, and empty post lists without throwing.
3. Blog components no longer rely on implicit `any`.
4. The Blog page keeps search, tag filtering, pagination, and load-more behavior.

### US3 - Make Contact Submission Honest And Consistent

As a visitor, I want contact submission success to mean my message was actually persisted or delivered.

**Acceptance Criteria**

1. The project has one canonical contact submission path, or both Server Action and API route share the same persistence logic.
2. `/api/contact` does not return success without saving or sending the message.
3. Rate limiting and anti-spam behavior are either wired into the active path or removed from inactive code.
4. Missing Supabase environment variables produce a controlled error instead of an import-time crash.

### US4 - Restore Mobile Navigation

As a mobile visitor, I want to open site navigation so I can reach About, Projects, Blog, Terminal, Contact, and Uses from a small screen.

**Acceptance Criteria**

1. The Header renders a mobile menu trigger on small screens.
2. Tapping the trigger opens the existing mobile overlay.
3. Tapping close or a navigation link closes the overlay.
4. Keyboard and screen-reader labels remain present.

### US5 - Align Next 15 Route Types And UI Component Types

As a developer, I want route props and component APIs to match installed library versions so framework upgrades do not leave the codebase in a half-migrated state.

**Acceptance Criteria**

1. Dynamic project route props satisfy Next 15 generated `PageProps`.
2. Link card icon rendering uses a narrowed Lucide icon type.
3. Carousel API state matches the actual shadcn/Embla API type and supports indicator navigation.
4. Uses page item keys and discriminated unions type-check without `never` or invalid property access.

### US6 - Reduce Lint Noise To Keep Future Reviews Useful

As a maintainer, I want lint output to be clean so future warnings point to real changes instead of old noise.

**Acceptance Criteria**

1. Unused imports and variables are removed.
2. JSX text lint errors are fixed with safe escaping.
3. Hook dependency warnings are resolved or documented with a local reason.
4. Remaining image optimization warnings are either fixed with `next/image` or consciously accepted in the plan.

## Prioritized Backlog

| Priority | Item | User Story | Branch Type | Rationale |
| --- | --- | --- | --- | --- |
| P0 | TypeScript compile recovery | US1, US2, US5 | `bugfix/typescript-compile-recovery` | Blocks reliable verification and future implementation. |
| P0 | Contact submission consistency | US3 | `bugfix/contact-submission-consistency` | Prevents fake-positive success responses. |
| P1 | Mobile header menu | US4 | `bugfix/mobile-header-menu` | Direct visitor UX issue on small screens. |
| P1 | Lint cleanup | US1, US6 | `bugfix/lint-cleanup` | Restores useful signal in reviews and CI. |
| P2 | Build/font reliability | US1 | `feature/local-font-build-reliability` | Makes offline/CI-restricted builds more predictable. |
| P2 | Blog resilience hardening | US2 | `feature/blog-resilience-hardening` | Improves external API failure behavior. |

## Non-Goals

- Redesigning the landing.
- Rewriting data content or personal copy.
- Replacing Supabase or Hashnode.
- Introducing a full test framework unless a future spec chooses one.
- Changing production deployment infrastructure.

## Assumptions

- The public site is currently operational and should not be destabilized by backlog work.
- The project can adopt Spec Kit artifacts manually before running `specify init`.
- Gitflow branch names are preferred for future work even though the current repo may not yet have a long-lived `develop` branch.

## Success Metrics

- Local checks pass: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- All public routes smoke-test successfully: `/`, `/about`, `/projects`, `/blog`, `/terminal`, `/contact`, `/uses`, `/links`.
- Contact form behavior is traceable from UI submission to Supabase insert or documented delivery path.
- Future backlog tasks can be converted to GitHub issues via Spec Kit task workflows.
