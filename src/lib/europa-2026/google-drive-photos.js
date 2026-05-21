"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDrivePhotoQuery = buildDrivePhotoQuery;
exports.toPhotoMetadata = toPhotoMetadata;

function nextDayISO(dateISO) {
  const date = new Date(`${dateISO}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + 1)
  return date.toISOString().slice(0, 10)
}

function buildDrivePhotoQuery(folderId, dateISO) {
  const nextDay = nextDayISO(dateISO)
  return [
    `'${folderId}' in parents`,
    "trashed = false",
    "mimeType contains 'image/'",
    `createdTime >= '${dateISO}T00:00:00Z'`,
    `createdTime < '${nextDay}T00:00:00Z'`,
  ].join(" and ")
}

function parseDriveImageTime(time) {
  const match = time?.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/)
  if (!match) return null

  const [, year, month, day, hour, minute, second] = match
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
}

function parseFilenameTime(name) {
  const match = name?.match(/(\d{4})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/)
  if (!match) return null

  const [, year, month, day, hour, minute, second] = match
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
}

function toPhotoMetadata(file) {
  if (!file.id) throw new Error("Drive image is missing id")
  if (!file.createdTime) throw new Error(`Drive image ${file.id} is missing createdTime`)

  return {
    id: file.id,
    name: file.name ?? file.id,
    mediaMetadata: {
      creationTime:
        parseDriveImageTime(file.imageMediaMetadata?.time) ??
        parseFilenameTime(file.name) ??
        file.createdTime,
      width: String(file.imageMediaMetadata?.width ?? 0),
      height: String(file.imageMediaMetadata?.height ?? 0),
    },
  }
}
