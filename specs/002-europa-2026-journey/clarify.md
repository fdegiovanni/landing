# Europa 2026 Journey Clarifications

**Created:** 2026-05-19  
**Spec:** `specs/002-europa-2026-journey/spec.md`

## Decisions

1. **MVP content source:** Use local typed/static data modules. Notion remains a future adapter.
2. **Access model:** Validate DNI server-side through `/api/europa/access`. The whitelist must not be shipped to the browser as a plain object.
3. **Session persistence:** Keep access in `sessionStorage` for the current browser session. This is friendly for family use without creating long-lived credentials.
4. **Visual direction:** Use the prototype's Postal vintage style as the primary direction, borrowing legibility from the clean editorial variant where needed.
5. **Map direction:** Replace the hand-drawn geographic map with a senior-friendly schematic route. The route should use large numbered stops, simple readable labels, and a bold dashed path. Geographic accuracy is less important than instantly understanding order and current location.
6. **Madrid and Tirano:** Keep Madrid and Tirano as operational route/transit stops in the data model. The public main route emphasizes the requested Europe stops, while city detail can still support them if tapped or used by trip state.
7. **Weather MVP:** Use a provider-shaped local weather dataset for the first slice. The UI must be ready for a real provider later.
8. **Photos MVP:** Use Wikipedia/Wikimedia images as city hero images and warm placeholders for trip photos. Cron photo ingestion is deferred.
9. **Map accuracy:** Use the schematic route rather than exact GIS accuracy. The product goal is emotional clarity, not cartographic precision.

## Open Follow-Ups For Later Specs

- Choose photo cron source: Google Photos, iCloud export, Google Drive, local folder, or another source.
- Choose photo storage: Supabase Storage, Vercel Blob, repo/public assets, or external image host.
- Decide whether Notion should own only itinerary copy or also photo metadata.
- Decide whether to add rate limiting to the access endpoint.
