# Europa 2026 Journey Tasks

**Input:** `specs/002-europa-2026-journey/spec.md`, `clarify.md`, and `plan.md`

## Phase 1 - Trip Logic

- [x] T001 Create trip-state utility with date parsing, day counting, and phase detection.
- [x] T002 Write tests for before, in-city, transit, and after phases.
- [x] T003 Run trip-state tests and verify they fail before implementation, then pass after implementation.

## Phase 2 - Data

- [x] T004 Create local trip data with cities, connections, public content, weather, and placeholder photo metadata.
- [x] T005 Include requested destinations plus operational route stops.
- [x] T006 Keep whitelist out of client data.

## Phase 3 - Access

- [x] T007 Create `/api/europa/access`.
- [x] T008 Normalize DNI input and validate against server-side SHA-256 hashes.
- [x] T009 Return only public profile fields on success.

## Phase 4 - UI

- [x] T010 Create `/europa` page.
- [x] T011 Build access screen, personalized greeting, map home, status banner, and city detail view.
- [x] T012 Add route-local vintage postcard styling.
- [x] T013 Add mobile-first touch targets and readable typography.
- [x] T013A Replace hand-drawn geographic map with senior-friendly numbered schematic route.

## Phase 5 - Verification

- [x] T014 Run `node --test src/lib/europa-2026/trip-state.test.mjs`.
- [x] T015 Run `npx tsc --noEmit` and record project-level failures. Result: failed on pre-existing issues from `specs/001-technical-backlog`; no `/europa` TypeScript errors were reported.
- [x] T016 Run `npm run lint` and record project-level failures. Result: failed on pre-existing lint issues from `specs/001-technical-backlog`; the new `/europa` image warning was handled locally.
- [x] T017 Run or attempt `npm run build` and record environment/project-level failures. Result: failed because the sandbox cannot resolve `fonts.googleapis.com`, matching the known build/font reliability backlog item.
- [x] T018 Smoke-test `/europa` in browser. Result: access screen, valid DNI, map state, simulated date, city detail, and remote-image fallback verified at 390px mobile viewport.
