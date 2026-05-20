import { google } from "googleapis"
import type { GooglePhotoMetadata } from "./photo-scoring"

function getAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  return client
}

export async function getPhotosForDate(dateISO: string): Promise<GooglePhotoMetadata[]> {
  const auth = getAuthClient()
  const { token } = await auth.getAccessToken()
  if (!token) throw new Error("Failed to get Google access token")

  const [year, month, day] = dateISO.split("-").map(Number)

  const response = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems:search",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          dateFilter: {
            ranges: [{ startDate: { year, month, day }, endDate: { year, month, day } }],
          },
          mediaTypeFilter: { mediaTypes: ["PHOTO"] },
        },
        pageSize: 100,
      }),
    }
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Google Photos API ${response.status}: ${body}`)
  }

  const data = await response.json()
  return (data.mediaItems ?? []) as GooglePhotoMetadata[]
}
