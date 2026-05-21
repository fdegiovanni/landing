import test from "node:test"
import assert from "node:assert/strict"

import {
  buildDrivePhotoQuery,
  toPhotoMetadata,
} from "./google-drive-photos.js"

test("buildDrivePhotoQuery: limits images to the configured folder and day", () => {
  const query = buildDrivePhotoQuery("folder-123", "2026-06-10")

  assert.equal(
    query,
    "'folder-123' in parents and trashed = false and mimeType contains 'image/' and createdTime >= '2026-06-10T00:00:00Z' and createdTime < '2026-06-11T00:00:00Z'"
  )
})

test("toPhotoMetadata: maps Drive image metadata to the scoring shape", () => {
  const photo = toPhotoMetadata({
    id: "drive-file-1",
    name: "IMG_0001.JPG",
    createdTime: "2026-06-10T15:30:00Z",
    imageMediaMetadata: { width: 4032, height: 3024 },
  })

  assert.deepEqual(photo, {
    id: "drive-file-1",
    name: "IMG_0001.JPG",
    mediaMetadata: {
      creationTime: "2026-06-10T15:30:00Z",
      width: "4032",
      height: "3024",
    },
  })
})

test("toPhotoMetadata: prefers Drive image capture time when available", () => {
  const photo = toPhotoMetadata({
    id: "drive-file-1",
    name: "20260516_124343.jpg",
    createdTime: "2026-05-21T17:05:01Z",
    imageMediaMetadata: {
      width: 4032,
      height: 3024,
      time: "2026:05:16 12:43:43",
    },
  })

  assert.equal(photo.mediaMetadata.creationTime, "2026-05-16T12:43:43Z")
})

test("toPhotoMetadata: falls back to timestamp in filename", () => {
  const photo = toPhotoMetadata({
    id: "drive-file-1",
    name: "20260516_125542.jpg",
    createdTime: "2026-05-21T17:05:02Z",
    imageMediaMetadata: { width: 4032, height: 3024 },
  })

  assert.equal(photo.mediaMetadata.creationTime, "2026-05-16T12:55:42Z")
})
