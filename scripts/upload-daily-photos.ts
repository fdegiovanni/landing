/**
 * Upload daily trip photos from a local folder to Supabase Storage.
 * Run each evening during the trip:
 *
 *   npx dotenv-cli -e .env.local -- npx tsx scripts/upload-daily-photos.ts \
 *     --date 2026-05-29 \
 *     --folder ~/Pictures/Europa/2026-05-29
 *
 * The script reads all JPEGs in the folder, picks the top 10 by file size
 * (largest = highest quality), uploads them to Supabase Storage, and upserts
 * rows into the europa_photos table.
 */

import { createClient } from "@supabase/supabase-js"
import * as fs from "node:fs"
import * as path from "node:path"
import * as crypto from "node:crypto"
import { tripCities, tripConnections, tripMeta } from "../src/data/europa-2026"
import { getTripState } from "../src/lib/europa-2026/trip-state"

const args = process.argv.slice(2)
const dateArg = args[args.indexOf("--date") + 1]
const folderArg = args[args.indexOf("--folder") + 1]

if (!dateArg || !folderArg) {
  console.error("Usage: upload-daily-photos.ts --date YYYY-MM-DD --folder /path/to/photos")
  process.exit(1)
}

const dateISO = dateArg
const folderPath = folderArg.replace(/^~/, process.env.HOME ?? "")

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`)
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.EUROPA_SUPABASE_SERVICE_KEY!
)

const state = getTripState(dateISO, tripCities, tripMeta.start, tripMeta.end, tripConnections)

if (state.phase !== "in-city") {
  console.log(`No active city on ${dateISO} (phase: ${state.phase})`)
  process.exit(0)
}

const city = state.city
console.log(`City: ${city.name} (${city.id}) — Date: ${dateISO}`)

const jpegFiles = fs
  .readdirSync(folderPath)
  .filter((f) => /\.(jpg|jpeg)$/i.test(f))
  .map((f) => {
    const fullPath = path.join(folderPath, f)
    const stat = fs.statSync(fullPath)
    return { name: f, fullPath, size: stat.size }
  })
  .sort((a, b) => b.size - a.size) // largest first = best quality
  .slice(0, 10)

if (jpegFiles.length === 0) {
  console.log("No JPEG files found in folder.")
  process.exit(0)
}

console.log(`Found ${jpegFiles.length} photos, uploading...`)

let synced = 0
for (const [index, file] of jpegFiles.entries()) {
  const imgBuffer = fs.readFileSync(file.fullPath)
  const photoId = crypto.createHash("md5").update(file.name + dateISO).digest("hex")
  const storagePath = `${city.id}/${dateISO}/${photoId}.jpg`

  const { error: uploadError } = await supabase.storage
    .from("europa-photos")
    .upload(storagePath, imgBuffer, { contentType: "image/jpeg", upsert: true })

  if (uploadError) {
    console.error(`  ✗ ${file.name}: ${uploadError.message}`)
    continue
  }

  const { data: { publicUrl } } = supabase.storage.from("europa-photos").getPublicUrl(storagePath)

  const { error: dbError } = await supabase.from("europa_photos").upsert(
    {
      city_slug: city.id,
      taken_date: dateISO,
      google_photo_id: photoId,
      storage_path: storagePath,
      public_url: publicUrl,
      width: null,
      height: null,
      score: file.size,
      display_order: index,
    },
    { onConflict: "google_photo_id" }
  )

  if (dbError) {
    console.error(`  ✗ ${file.name} (db): ${dbError.message}`)
  } else {
    console.log(`  ✓ ${file.name}`)
    synced++
  }
}

console.log(`\nDone: ${synced}/${jpegFiles.length} photos synced for ${city.name} on ${dateISO}`)
