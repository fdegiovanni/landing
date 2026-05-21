import test from "node:test"
import assert from "node:assert/strict"

import { resolvePhotoSourceDate } from "./sync-photos-options.js"

test("resolvePhotoSourceDate: defaults to the trip date", () => {
  assert.equal(resolvePhotoSourceDate("2026-05-28", null), "2026-05-28")
})

test("resolvePhotoSourceDate: uses sourceDate when provided", () => {
  assert.equal(resolvePhotoSourceDate("2026-05-28", "2026-05-11"), "2026-05-11")
})
