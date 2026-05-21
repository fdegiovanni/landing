# Europa 2026 Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a private, mobile-first `/europa` journey page that lets family follow the Europe trip through a warm postcard-style map, city details, and trip status.

**Architecture:** Add an isolated route under `src/app/europa` with route-local styling and components. Keep public trip content in `src/data/europa-2026.ts`, reusable trip-state logic in `src/lib/europa-2026/trip-state.js`, and access validation in a server-only API route. The first implementation uses local JSON-like data and mock weather/photo placeholders while preserving future Notion and cron seams.

**Tech Stack:** Next.js 15 App Router, React 19 client components, Tailwind/global CSS plus route-local CSS module, Node `crypto` for DNI hashing, Node built-in test runner for trip-state logic.

---

## Files

- Create: `src/app/europa/page.tsx`
- Create: `src/app/europa/europa-2026.module.css`
- Create: `src/app/api/europa/access/route.ts`
- Create: `src/data/europa-2026.ts`
- Create: `src/lib/europa-2026/trip-state.js`
- Create: `src/lib/europa-2026/trip-state.test.mjs`
- Create: `specs/002-europa-2026-journey/clarify.md`
- Create: `specs/002-europa-2026-journey/tasks.md`
- Modify: `next.config.ts` if `next/image` is used for remote Wikimedia images. MVP will use regular `img`, so no config change is required.

## Implementation Notes

- The access API receives `{ dni: string }`, normalizes digits only, hashes with SHA-256, and compares against server-only hashes.
- The browser stores only the returned public profile in `sessionStorage`.
- The main map is a schematic SVG route adapted from the supplied prototype's visual language, but optimized for 60+ mobile readability.
- City hero images use direct Wikimedia/Special:FilePath URLs for the MVP.
- Trip-state behavior must be tested before UI implementation.

## Validation

Run:

```bash
node --test src/lib/europa-2026/trip-state.test.mjs
npx tsc --noEmit
npm run lint
npm run build
```

Known project-level caveat: the repository currently has pre-existing TypeScript and lint failures documented in `specs/001-technical-backlog`. This feature must not add new avoidable errors, but full green gates may require the technical backlog first.

## Manual QA

1. Visit `/europa` on a mobile viewport.
2. Enter an invalid DNI and verify friendly retry.
3. Enter a whitelisted DNI and verify personalized greeting.
4. Open the map and tap at least three cities.
5. Verify before/in-city/transit states by using the local simulated date override if enabled in development.
6. Confirm text remains readable at 390px width.
