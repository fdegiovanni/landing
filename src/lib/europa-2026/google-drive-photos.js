"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDrivePhotoQuery = buildDrivePhotoQuery;
exports.downloadPhoto = downloadPhoto;
exports.getPhotosForDate = getPhotosForDate;
exports.toPhotoMetadata = toPhotoMetadata;

const { google } = require("googleapis")

function getAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return client
}

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

async function getPhotosForDate(dateISO) {
  const folderId = process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID
  if (!folderId) throw new Error("Missing GOOGLE_DRIVE_PHOTOS_FOLDER_ID")

  const auth = getAuthClient()
  const drive = google.drive({ version: "v3", auth })
  const query = buildDrivePhotoQuery(folderId, dateISO)
  const photos = []
  let pageToken

  do {
    const response = await drive.files.list({
      q: query,
      spaces: "drive",
      pageSize: 100,
      pageToken,
      orderBy: "createdTime",
      fields:
        "nextPageToken, files(id, name, createdTime, imageMediaMetadata(width, height, time))",
    })

    for (const file of response.data.files ?? []) {
      photos.push(toPhotoMetadata(file))
    }
    pageToken = response.data.nextPageToken ?? undefined
  } while (pageToken)

  return photos
}

async function downloadPhoto(photoId) {
  const auth = getAuthClient()
  const { token } = await auth.getAccessToken()
  if (!token) throw new Error("Failed to get Google Drive access token")

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(photoId)}?alt=media`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Google Drive download ${response.status}: ${body}`)
  }

  return response.arrayBuffer()
}
