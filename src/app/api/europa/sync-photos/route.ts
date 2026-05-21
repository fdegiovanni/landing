import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { downloadPhoto, getPhotosForDate } from "@/lib/europa-2026/google-drive-photos"
import { selectTopPhotos, resolutionScore } from "@/lib/europa-2026/photo-scoring"
import { resolvePhotoSourceDate } from "@/lib/europa-2026/sync-photos-options"
import { tripCities, tripConnections, tripMeta } from "@/data/europa-2026"
import { getTripState } from "@/lib/europa-2026/trip-state"

export const runtime = "nodejs"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.EUROPA_SUPABASE_SERVICE_KEY!
  )
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Support ?date=YYYY-MM-DD for manual/backfill runs
  const dateParam = request.nextUrl.searchParams.get("date")
  const dateISO = dateParam ?? new Date().toISOString().split("T")[0]
  const sourceDateISO = resolvePhotoSourceDate(
    dateISO,
    request.nextUrl.searchParams.get("sourceDate")
  )

  try {
    const state = getTripState(
      dateISO,
      tripCities,
      tripMeta.start,
      tripMeta.end,
      tripConnections
    )

    if (state.phase !== "in-city") {
      return NextResponse.json({
        message: `No active city on ${dateISO}`,
        phase: state.phase,
      })
    }

    const city = state.city

    const allPhotos = await getPhotosForDate(sourceDateISO)
    if (allPhotos.length === 0) {
      return NextResponse.json({
        message: `No photos found for ${sourceDateISO}`,
        date: dateISO,
        sourceDate: sourceDateISO,
        city: city.id,
      })
    }

    const topPhotos = selectTopPhotos(allPhotos, 10)

    const results = await Promise.all(
      topPhotos.map(async (photo, index) => {
        let imgBuffer: ArrayBuffer
        try {
          imgBuffer = await downloadPhoto(photo.id)
        } catch {
          return null
        }

        const storagePath = `${city.id}/${dateISO}/${photo.id}.jpg`

        const { error: uploadError } = await supabase.storage
          .from("europa-photos")
          .upload(storagePath, imgBuffer, { contentType: "image/jpeg", upsert: true })

        if (uploadError) return null

        const {
          data: { publicUrl },
        } = supabase.storage.from("europa-photos").getPublicUrl(storagePath)

        const { error: dbError } = await supabase.from("europa_photos").upsert(
          {
            city_slug: city.id,
            taken_date: dateISO,
            google_photo_id: photo.id,
            storage_path: storagePath,
            public_url: publicUrl,
            width: parseInt(photo.mediaMetadata.width, 10),
            height: parseInt(photo.mediaMetadata.height, 10),
            score: resolutionScore(photo),
            display_order: index,
          },
          { onConflict: "google_photo_id" }
        )

        return dbError ? null : photo.id
      })
    )

    const synced = results.filter(Boolean)
    return NextResponse.json({
      synced: synced.length,
      date: dateISO,
      sourceDate: sourceDateISO,
      city: city.id,
    })
  } catch (err) {
    console.error("[sync-photos] error:", err)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
