import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getPhotosForDate } from "@/lib/europa-2026/google-photos"
import { selectTopPhotos } from "@/lib/europa-2026/photo-scoring"
import { tripCities, tripConnections, tripMeta } from "@/data/europa-2026"
import { getTripState } from "@/lib/europa-2026/trip-state"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Support ?date=YYYY-MM-DD for manual/backfill runs
  const dateParam = request.nextUrl.searchParams.get("date")
  const dateISO = dateParam ?? new Date().toISOString().split("T")[0]

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

  const allPhotos = await getPhotosForDate(dateISO)
  if (allPhotos.length === 0) {
    return NextResponse.json({ message: `No photos found for ${dateISO}`, city: city.id })
  }

  const topPhotos = selectTopPhotos(allPhotos, 10)
  const synced: string[] = []

  for (const [index, photo] of topPhotos.entries()) {
    const downloadUrl = `${photo.baseUrl}=w1200-h1200`

    let imgBuffer: ArrayBuffer
    try {
      const imgResponse = await fetch(downloadUrl)
      if (!imgResponse.ok) continue
      imgBuffer = await imgResponse.arrayBuffer()
    } catch {
      continue
    }

    const storagePath = `${city.id}/${dateISO}/${photo.id}.jpg`

    const { error: uploadError } = await supabase.storage
      .from("europa-photos")
      .upload(storagePath, imgBuffer, { contentType: "image/jpeg", upsert: true })

    if (uploadError) continue

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
        width: parseInt(photo.mediaMetadata.width),
        height: parseInt(photo.mediaMetadata.height),
        score: parseInt(photo.mediaMetadata.width) * parseInt(photo.mediaMetadata.height),
        display_order: index,
      },
      { onConflict: "google_photo_id" }
    )

    if (!dbError) synced.push(photo.id)
  }

  return NextResponse.json({ synced: synced.length, date: dateISO, city: city.id })
}
