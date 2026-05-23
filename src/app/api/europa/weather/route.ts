import { NextRequest, NextResponse } from "next/server"
import { tripCities, tripWeather } from "@/data/europa-2026"
import {
  buildOpenMeteoForecastUrl,
  parseOpenMeteoCurrentWeather,
} from "@/lib/europa-2026/open-meteo-weather"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const cityId = request.nextUrl.searchParams.get("city")
  if (!cityId) {
    return NextResponse.json({ error: "city param required" }, { status: 400 })
  }

  const city = tripCities.find((item) => item.id === cityId)
  if (!city) {
    return NextResponse.json({ error: "city not found" }, { status: 404 })
  }

  if (!city.coordinates) {
    const fallback = tripWeather[city.id]
    if (!fallback) {
      return NextResponse.json({ error: "city coordinates missing" }, { status: 500 })
    }
    return NextResponse.json({ ...fallback, source: "fallback" })
  }

  try {
    const url = buildOpenMeteoForecastUrl({
      ...city.coordinates,
      timezone: city.timezone,
    })
    const response = await fetch(url, { next: { revalidate: 15 * 60 } })

    if (!response.ok) {
      throw new Error(`Open-Meteo ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({ ...parseOpenMeteoCurrentWeather(data), source: "open-meteo" })
  } catch (error) {
    console.error("[europa-weather] error:", error)
    const fallback = tripWeather[city.id]
    if (!fallback) {
      return NextResponse.json({ error: "Weather unavailable" }, { status: 502 })
    }
    return NextResponse.json({ ...fallback, source: "fallback" })
  }
}
