import test from "node:test"
import assert from "node:assert/strict"

import { calculateTripProgressStats } from "./trip-progress.js"

const meta = { start: "2026-05-28", totalKm: 1600 }
const cities = [
  { arrive: "2026-05-28", country: "Francia" },
  { arrive: "2026-06-01", country: "Inglaterra" },
  { arrive: "2026-06-06", country: "Belgica" },
  { arrive: "2026-06-08", country: "Belgica" },
  { arrive: "2026-06-09", country: "Belgica" },
  { arrive: "2026-06-10", country: "Paises Bajos" },
  { arrive: "2026-06-13", country: "Republica Checa" },
  { arrive: "2026-06-22", country: "Italia", publicStop: false },
]

test("calculateTripProgressStats: returns zero before the trip starts", () => {
  assert.deepEqual(calculateTripProgressStats("2026-05-21", cities, meta), {
    kmDone: 0,
    countriesDone: 0,
    citiesDone: 0,
  })
})

test("calculateTripProgressStats: counts the current city once it has arrived", () => {
  assert.deepEqual(calculateTripProgressStats("2026-05-30", cities, meta), {
    kmDone: 229,
    countriesDone: 1,
    citiesDone: 1,
  })
})

test("calculateTripProgressStats: counts reached countries and public city stops", () => {
  assert.deepEqual(calculateTripProgressStats("2026-06-15", cities, meta), {
    kmDone: 1600,
    countriesDone: 5,
    citiesDone: 7,
  })
})
