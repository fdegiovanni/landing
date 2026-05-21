# Europa 2026 Journey Specification

**Feature Branch:** `feature/europa-2026-journey`  
**Created:** 2026-05-19  
**Status:** Draft  
**Input:** User request plus visual prototype in `/Users/fdegiovanni/Downloads/fede-viajando`.

## Summary

Build a private, mobile-first travel journal page at `/europa` for Federico's family and close friends to follow his 2026 Europe trip. The page should feel warm, playful, and easy for 60+ year-old relatives to use from a phone. It will start with a DNI-based access screen, then show an interactive route map, current trip status, city details, weather/time, travel connections, and eventually daily photo updates uploaded by a cron process.

## Product Goals

- Let family and friends quickly answer: "Where is Fede now?", "Where is he going next?", and "What did he see today?"
- Keep the experience simple enough for mobile users who are not technical.
- Follow the existing design direction: vintage postcard, warm paper textures, playful handwritten accents, stamps, route line, and clear big typography.
- Start with JSON-backed content so implementation can move fast.
- Leave clear extension points for Notion-backed itinerary content and automated photo ingestion.

## Design Reference

The initial visual direction comes from the local prototype:

- `Europa 2026.html`
- `app.jsx`
- `data.jsx`
- `screens.jsx`
- `europe-map.jsx`
- `variants.jsx`
- `uploads/pasted-1779158492258-0.png`

Primary style: **Postal vintage**.

Key visual ideas to preserve:

- Intro screen: "Europa 2026", "de fede, con cariño", DNI input, personalized greeting.
- Main map: senior-friendly schematic route, large numbered stops, red dashed path, current city highlight, visited/future states.
- Status card: before trip countdown, current city, in-transit state, after-trip message.
- City detail: hero photo, local time, weather, plan note, landmarks, food, fun fact, photo grid.
- Tone: canchera, familiar, readable, affectionate, and not overloaded.

## User Stories

### US1 - Private Family Access

As a family member or friend, I want to enter with my DNI so I can access a private travel journal without creating an account.

**Acceptance Criteria**

1. Visiting `/europa` initially shows an access screen.
2. The access screen asks for DNI using a numeric-friendly input.
3. A DNI present in the whitelist grants access and shows a personalized greeting.
4. A DNI not present in the whitelist shows a friendly error and lets the user retry.
5. The session stays unlocked for the current browser session without requiring repeated DNI entry on every navigation inside the page.
6. The whitelist is not exposed as plain client-side data in the production implementation.

### US2 - See Where Fede Is Now

As a visitor, I want the landing view after login to clearly show where Fede is now, what day of the trip it is, and whether he is in a city or traveling between cities.

**Acceptance Criteria**

1. The main view shows "hoy estoy en" when the current date falls inside a city stay.
2. The main view shows "en tránsito" when the current date falls between city stays.
3. The main view shows "faltan X días" before the trip starts.
4. The main view shows a completed-trip message after the trip ends.
5. The current city or next city is visually highlighted on the map.
6. The current status card is tappable when a current city exists and opens that city detail.

### US3 - Explore The Route

As a visitor, I want to tap cities on the map so I can understand the route and each destination.

**Acceptance Criteria**

1. The map shows the route through the trip destinations in chronological order using large numbered stops.
2. Visited, current, transit target, and future cities are visually distinguishable.
3. Tapping a city opens a city detail view.
4. City labels and touch targets are usable on a mobile viewport.
5. The map remains readable without requiring pinch zoom and does not rely on dense handwritten labels.

### US4 - Read City Details

As a visitor, I want each city page to show simple and fun information so I can follow the trip without needing another source.

**Acceptance Criteria**

1. Each city detail includes city name, country, arrival/departure dates, and trip stop number.
2. Each city detail includes a short description, plan note, landmarks, foods, and a fun fact.
3. Each city detail includes a primary image sourced initially from Wikipedia or Wikimedia Commons.
4. Each city detail includes a local time display.
5. Each city detail includes current temperature and weather summary.
6. Each city detail includes a photo section that can show future trip photos.

### US5 - Understand Connections Between Cities

As a visitor, I want to know how Fede is moving between cities so I can follow the travel days.

**Acceptance Criteria**

1. Each connection has origin, destination, date/time notes, and transport type.
2. Transport is represented with a simple icon or label: train, bus, flight, scenic train, or local transfer.
3. During transit, the main status card shows origin, destination, and transport.
4. The route map animates or highlights the active segment during transit.

### US6 - See Daily Photos Later

As a visitor, I want the page to show Fede's real photos as the trip progresses so I can feel close to the journey.

**Acceptance Criteria**

1. The first version can show placeholders or Wikipedia images before the trip.
2. A later photo ingestion job can associate uploaded photos with a city and date.
3. City detail pages can show a small grid of selected photos.
4. The UI handles "no photos yet" with warm empty copy.
5. Photo ingestion failures do not break the travel page.

### US7 - Keep Data Editable Without Code Later

As Federico, I want the content to start in JSON but be structured so it can move to Notion later.

**Acceptance Criteria**

1. The MVP stores itinerary, city content, connections, and whitelist data in typed JSON or TypeScript data modules.
2. Data structure separates public city/trip content from private access data.
3. The implementation plan documents a future Notion source adapter.
4. UI components consume normalized data instead of hardcoded text scattered across components.

## MVP Scope

### Included

- Route `/europa`.
- DNI access screen with whitelist validation.
- Personalized greeting for known visitors.
- Mobile-first vintage postcard UI based on the provided prototype.
- Interactive schematic route map with the Europe journey.
- Trip state calculation: before, in-city, transit, after.
- City detail screen.
- JSON-backed trip data.
- Wikipedia/Wikimedia image URLs as first image source.
- Local time by city timezone.
- Weather-ready UI with either mocked weather or a simple provider abstraction.
- Photo grid placeholder for the future cron.

### Deferred

- Real cron job for photo ingestion.
- Notion-backed content management.
- Full admin UI.
- Real-time location tracking.
- Comments or reactions.
- User accounts.
- Push notifications.

## Route And Access Behavior

The page lives at:

```text
/europa
```

Access model:

- User enters DNI.
- Server validates DNI against a whitelist.
- On success, the app stores a short-lived access session.
- The page renders personalized copy using the matched person profile.
- On failure, the app returns a friendly retry state.

Security expectation:

- This is family-level privacy, not banking-grade auth.
- DNI values must not be shipped as a plain client-side object in production.
- If server-side validation is not possible in the first slice, the plan must explicitly mark client-side validation as temporary and unsuitable for final release.

## Trip Destinations

The journey should include these public stops:

1. París
2. Londres
3. Bruselas
4. Gante
5. Brujas
6. Amsterdam
7. Praga
8. Zurich
9. Lucerna
10. Interlaken
11. Grindelwald
12. Chur
13. Lago Como
14. Milán
15. Olbia

The prototype also includes Madrid and Tirano as operational route stops. The implementation plan should decide whether to expose them as public stops, connection-only stops, or hidden transit metadata.

## Initial Data Model

The MVP should support this shape conceptually:

```ts
type TravelerAccess = {
  dniHash: string
  displayName: string
  alias?: string
  emoji?: string
}

type TripCity = {
  id: string
  name: string
  country: string
  flag: string
  emoji: string
  arrive: string
  depart: string
  timezone: string
  coordinates: {
    mapX: number
    mapY: number
    lat?: number
    lon?: number
  }
  summary: string
  planNote: string
  landmarks: string[]
  foods: string[]
  funFact: string
  wikipediaImage?: {
    url: string
    attribution: string
    sourceUrl: string
  }
}

type TripConnection = {
  fromCityId: string
  toCityId: string
  departAt?: string
  arriveAt?: string
  transport: "train" | "bus" | "flight" | "scenic-train" | "local-transfer"
  note: string
}

type TripPhoto = {
  id: string
  cityId: string
  takenAt: string
  url: string
  caption?: string
  source: "cron" | "manual"
}
```

## Content Source Strategy

### Phase 1 - Local Data

Use local typed data modules:

- trip metadata
- cities
- connections
- whitelist
- static photo placeholders

### Phase 2 - Notion Adapter

Add a read adapter that can map Notion rows/pages into the same normalized data used by the UI. The UI should not know whether data came from JSON or Notion.

### Phase 3 - Photo Cron

Add a scheduled job that:

1. Finds candidate travel photos.
2. Selects a small set for the current city/date.
3. Uploads or publishes them to the configured storage.
4. Writes photo metadata into the data source.

The exact photo source and storage target are open decisions.

## Weather And Time

Time:

- Use IANA timezones per city.
- Display local time in a large, readable format.

Weather:

- MVP may use mock weather behind a provider interface.
- Production should use a real weather provider if API limits and cost are acceptable.
- Weather failures should show "clima no disponible" without breaking city detail.

## Accessibility And Mobile UX

Primary audience includes 60+ year-old family members using phones.

Requirements:

- Large tap targets.
- High contrast.
- Avoid tiny labels as primary navigation.
- Avoid hidden interactions that require technical intuition.
- Keep navigation shallow: access screen -> map -> city detail -> back.
- Avoid requiring pinch zoom.
- Use simple Spanish copy.
- Prefer visible text labels next to icons when meaning is not obvious.

## Visual Direction

Recommended direction: **Postal vintage with schematic route**.

Why:

- Best matches the travel/family tone.
- Feels personal and warm.
- The prototype already has the strongest detail in this direction.
- It supports playful copy without becoming childish.

Alternative styles from prototype:

- Kraft album: more dramatic and cozy, but darker and potentially less readable.
- Clean editorial: more legible and restrained, but less distinctive.

Decision for MVP:

- Use Postal vintage as the base.
- Use a schematic route instead of the original hand-drawn geographic map for the main mobile experience.
- Borrow legibility choices from Clean editorial where needed.
- Avoid overly dense map labels on mobile.

## Open Questions

1. Should Madrid and Tirano appear as public stops or only as hidden connection points?
2. Should access sessions persist only for the browser session or for several days?
3. Where will the future photo cron read photos from: local folder, Google Photos, iCloud export, Google Drive, or another source?
4. Where should uploaded photos live: repo/public assets, Supabase Storage, Vercel Blob, or another storage provider?
5. Should weather be real in the MVP or mocked until the itinerary page is visually complete?
6. Should Wikipedia/Wikimedia images be fetched at build time, stored manually in JSON, or proxied through an API route?

## Success Metrics

- A family member can unlock the page and understand the current trip state in under 10 seconds.
- A mobile visitor can open a city detail with one tap from the map/status card.
- All trip data can be edited in one small data area without changing UI components.
- The page remains pleasant before the trip, during city days, during transit, and after the trip.
- The first implementation can ship without the cron, while clearly reserving space for future real photos.

## Non-Goals

- Public SEO page for the trip.
- Social network features.
- Full authentication platform.
- Exact geographic map accuracy.
- Real-time GPS tracking.
- Replacing the existing landing navigation globally.
