# Google Drive → Europa 2026 — Design Spec

**Date:** 2026-05-20  
**Status:** Approved  
**Branch:** feature/europa-2026-journey

---

## Context

The Europa 2026 page (`/europa`) is a passport-themed travel journal that tracks Fede's trip across Europe (May 28 – July 3, 2026). Each city has a detail view with a photo grid placeholder currently showing "proximamente". The goal is to automatically populate that grid with ~10 real photos per day, sourced from a Google Drive folder fed by phone automation.

---

## Requirements

- **Automatic**: no daily action required from the user beyond taking photos normally
- **Per-city**: photos displayed in the city's detail view, grouped by day
- **~10 photos/day**: smart selection via metadata scoring (no Vision API cost)
- **Permanent URLs**: photos downloaded to Supabase Storage so Google's expiring URLs don't break the page
- **Access-controlled**: page already requires DNI auth; photos inherit that protection
- **Works offline from Google**: if Google Drive API is temporarily unavailable, cached photos still display

---

## Architecture

### Integration: `googleapis` (npm) + direct REST

- OAuth2 via `google-auth-library` (part of `googleapis`)
- Refresh token stored as Vercel env var, set up once before the trip
- Google Drive API: list image files in a configured folder and download selected files
- Scope: `https://www.googleapis.com/auth/drive.readonly`

### Data flow

```
Vercel Cron (23:00 daily)
  → GET /api/europa/sync-photos (+ SYNC_SECRET header)
    → detect current city from trip-state.js
    → fetch today's photos from Google Drive folder (date filter)
    → score photos by metadata (see algorithm below)
    → download top 10 → Supabase Storage
    → upsert rows in `europa_photos` table
Europa page
  → GET /api/europa/photos?city=paris
    → reads from Supabase (fast, permanent URLs)
    → renders photo grid in city detail view
```

---

## Metadata Scoring Algorithm

No external AI/Vision API. Pure metadata from Google Drive file response.

```
score(photo) =
  resolution_score  (width × height, normalized)
  + hour_diversity_bonus  (prefer photos from different hours of the day)
  - duplicate_penalty  (photos within 5s of another → keep only highest resolution)
```

**Steps:**
1. Fetch all photos for the day from the configured Google Drive folder
2. Group by 5-second clusters → deduplicate (keep max resolution per cluster)
3. Score remaining photos by `width × height`
4. Apply hour-diversity: bucket photos by hour of day, ensure selection spans at least 3 different hours when possible
5. Take top 10 by score

---

## Supabase Schema

```sql
-- migration: supabase/migrations/001_europa_photos.sql
create table europa_photos (
  id              uuid default gen_random_uuid() primary key,
  city_slug       text not null,
  taken_date      date not null,
  google_photo_id text not null unique,
  storage_path    text not null,
  public_url      text not null,
  width           integer,
  height          integer,
  score           integer,
  display_order   integer,
  synced_at       timestamptz default now()
);

create index on europa_photos (city_slug, taken_date);
```

**Supabase Storage bucket:** `europa-photos` (public read, server-only write)  
**Path pattern:** `europa-photos/{city_slug}/{YYYY-MM-DD}/{google_photo_id}.jpg`

---

## Environment Variables

| Variable | Description | Where set |
|----------|-------------|-----------|
| `GOOGLE_CLIENT_ID` | OAuth2 app client ID | Vercel + `.env.local` |
| `GOOGLE_CLIENT_SECRET` | OAuth2 app client secret | Vercel + `.env.local` |
| `GOOGLE_REFRESH_TOKEN` | Long-lived refresh token (generated once) | Vercel + `.env.local` |
| `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` | Drive folder used as the photo inbox | Vercel + `.env.local` |
| `SYNC_SECRET` | Random secret to authenticate cron calls | Vercel + `.env.local` |

---

## Files

| File | Action | Purpose |
|------|--------|---------|
| `scripts/setup-google-drive-auth.ts` | **New** | One-time script: generates OAuth2 refresh token |
| `src/lib/europa-2026/google-drive-photos.ts` | **New** | Google Drive API client (auth + file search/download) |
| `src/lib/europa-2026/photo-scoring.ts` | **New** | Metadata scoring + deduplication logic |
| `src/app/api/europa/sync-photos/route.ts` | **New** | Cron endpoint: orchestrates fetch → score → store |
| `src/app/api/europa/photos/route.ts` | **New** | Read endpoint: returns photos for a city/date |
| `src/app/europa/page.tsx` | **Modify** | Add photo grid section to city detail view |
| `vercel.json` | **Modify** | Add cron schedule (`0 23 * * *`) |
| `supabase/migrations/001_europa_photos.sql` | **New** | Table + index migration |

Existing files to reuse:
- `src/data/europa-2026.ts` — city slug, arrival/departure dates (used by sync to know which city is active)
- `src/lib/europa-2026/trip-state.js` — `getTripState()` to detect current city
- `src/app/europa/europa-2026.module.css` — existing vintage styles for the photo grid

---

## Cron Config (`vercel.json`)

```json
{
  "crons": [{ "path": "/api/europa/sync-photos", "schedule": "0 23 * * *" }]
}
```

The sync endpoint also accepts manual calls (with `SYNC_SECRET`) for testing and backfilling missed days.

---

## Error Handling

- If Google Drive API fails: log error, return early, existing photos remain visible
- If a photo download fails: skip that photo, continue with others
- If Supabase write fails: log error, retry on next cron run (upsert by `google_photo_id`)
- Empty days (no photos taken): city photo grid stays hidden or shows placeholder

---

## Verification

1. **Before trip:** run `npx tsx scripts/setup-google-drive-auth.ts`, confirm refresh token saved and set `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`
2. **Local test:** `POST /api/europa/sync-photos` with `?date=2026-06-01` param + SYNC_SECRET → confirm photos appear in Supabase
3. **Page test:** open `/europa`, select a city with synced photos → confirm grid renders
4. **Cron test:** deploy to Vercel, trigger cron manually via Vercel dashboard → check logs
