import test from "node:test"
import assert from "node:assert/strict"

import {
  deduplicatePhotos,
  resolutionScore,
  selectTopPhotos,
} from "./photo-scoring.js"

function makePhoto(id, time, width, height) {
  return {
    id,
    mediaMetadata: { creationTime: time, width: String(width), height: String(height) },
  }
}

test("deduplicatePhotos: removes photos within 5 seconds, keeps highest resolution", () => {
  const photos = [
    makePhoto("a", "2026-06-10T10:00:00Z", 4032, 3024),
    makePhoto("b", "2026-06-10T10:00:03Z", 1920, 1080), // same cluster, lower res
    makePhoto("c", "2026-06-10T10:01:00Z", 4032, 3024), // different cluster
  ]
  const result = deduplicatePhotos(photos)
  assert.equal(result.length, 2)
  assert.equal(result[0].id, "a")
  assert.equal(result[1].id, "c")
})

test("deduplicatePhotos: keeps higher-resolution photo in a cluster", () => {
  const photos = [
    makePhoto("a", "2026-06-10T10:00:00Z", 1920, 1080),
    makePhoto("b", "2026-06-10T10:00:02Z", 4032, 3024), // higher res
  ]
  const result = deduplicatePhotos(photos)
  assert.equal(result.length, 1)
  assert.equal(result[0].id, "b")
})

test("deduplicatePhotos: handles empty array", () => {
  assert.deepEqual(deduplicatePhotos([]), [])
})

test("resolutionScore: returns width × height", () => {
  const photo = makePhoto("a", "2026-06-10T10:00:00Z", 4032, 3024)
  assert.equal(resolutionScore(photo), 4032 * 3024)
})

test("selectTopPhotos: returns all photos when fewer than count", () => {
  const photos = [
    makePhoto("a", "2026-06-10T09:00:00Z", 4032, 3024),
    makePhoto("b", "2026-06-10T14:00:00Z", 4032, 3024),
  ]
  assert.equal(selectTopPhotos(photos, 10).length, 2)
})

test("selectTopPhotos: distributes across hours when many photos available", () => {
  const photos = [
    makePhoto("m1", "2026-06-10T08:00:00Z", 4032, 3024),
    makePhoto("m2", "2026-06-10T08:30:00Z", 4032, 3024),
    makePhoto("m3", "2026-06-10T09:00:00Z", 4032, 3024),
    makePhoto("a1", "2026-06-10T13:00:00Z", 4032, 3024),
    makePhoto("a2", "2026-06-10T14:00:00Z", 4032, 3024),
    makePhoto("a3", "2026-06-10T15:00:00Z", 4032, 3024),
    makePhoto("e1", "2026-06-10T19:00:00Z", 4032, 3024),
    makePhoto("e2", "2026-06-10T20:00:00Z", 4032, 3024),
    makePhoto("e3", "2026-06-10T21:00:00Z", 4032, 3024),
  ]
  const result = selectTopPhotos(photos, 6)
  assert.equal(result.length, 6)
  const hours = new Set(result.map(p => new Date(p.mediaMetadata.creationTime).getUTCHours()))
  assert.ok(hours.size >= 3, `Expected ≥3 different hours, got ${hours.size}`)
})

test("selectTopPhotos: correctly prioritizes early-morning hours over mid-day (numeric sort)", () => {
  // If sort is lexicographic, hour 10 comes before hour 2, breaking chronological order.
  // This test verifies hour 2 (02:00) is included when selecting 2 from hours 2, 10, 14.
  const photos = [
    makePhoto("early", "2026-06-10T02:00:00Z", 4032, 3024), // hour 2
    makePhoto("mid1",  "2026-06-10T10:00:00Z", 4032, 3024), // hour 10
    makePhoto("mid2",  "2026-06-10T10:30:00Z", 4032, 3024), // hour 10
    makePhoto("mid3",  "2026-06-10T10:45:00Z", 4032, 3024), // hour 10
    makePhoto("aft",   "2026-06-10T14:00:00Z", 4032, 3024), // hour 14
  ]
  const result = selectTopPhotos(photos, 3)
  assert.equal(result.length, 3)
  // With correct numeric sort, round-robin visits hours [2, 10, 14] in order.
  // Round 0: picks early (h2), mid1 (h10), aft (h14) → 3 items, done.
  const ids = result.map(p => p.id)
  assert.ok(ids.includes("early"), `Expected "early" in result, got: ${ids}`)
})
