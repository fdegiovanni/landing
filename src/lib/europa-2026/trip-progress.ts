import type { TripCity } from "@/data/europa-2026"

export type TripProgressMeta = {
  start: string
  totalKm: number
}

export type TripProgressStats = {
  kmDone: number
  countriesDone: number
  citiesDone: number
}

function dateValue(iso: string) {
  return new Date(`${iso}T12:00:00Z`).getTime()
}

export function calculateTripProgressStats(
  dateISO: string,
  cities: Pick<TripCity, "arrive" | "country" | "publicStop">[],
  meta: TripProgressMeta
): TripProgressStats {
  const currentDate = dateValue(dateISO)
  const publicCities = cities.filter((city) => city.publicStop !== false)

  if (currentDate < dateValue(meta.start)) {
    return { kmDone: 0, countriesDone: 0, citiesDone: 0 }
  }

  const reachedCities = publicCities.filter((city) => currentDate >= dateValue(city.arrive))
  const citiesDone = Math.min(reachedCities.length, publicCities.length)
  const countriesDone = new Set(reachedCities.map((city) => city.country)).size
  const kmDone =
    publicCities.length === 0
      ? 0
      : Math.round(meta.totalKm * (citiesDone / publicCities.length))

  return { kmDone, countriesDone, citiesDone }
}
