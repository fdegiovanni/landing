import test from "node:test"
import assert from "node:assert/strict"

import { getTripState } from "./trip-state.js"

const cities = [
  { id: "paris", name: "Paris", arrive: "2026-05-28", depart: "2026-06-01" },
  { id: "londres", name: "Londres", arrive: "2026-06-01", depart: "2026-06-06" },
  { id: "gante", name: "Gante", arrive: "2026-06-07", depart: "2026-06-10" },
]

test("returns before phase with days until departure", () => {
  const state = getTripState("2026-05-18", cities, "2026-05-28", "2026-07-03")

  assert.equal(state.phase, "before")
  assert.equal(state.daysUntil, 10)
  assert.equal(state.dayOfTrip, 0)
})

test("returns in-city phase for dates inside a stay", () => {
  const state = getTripState("2026-06-03", cities, "2026-05-28", "2026-07-03")

  assert.equal(state.phase, "in-city")
  assert.equal(state.city.id, "londres")
  assert.equal(state.dayOfTrip, 7)
})

test("returns transit phase between city stays", () => {
  const state = getTripState("2026-06-06", cities, "2026-05-28", "2026-07-03")

  assert.equal(state.phase, "transit")
  assert.equal(state.from.id, "londres")
  assert.equal(state.to.id, "gante")
})

test("returns transit phase when date-time is inside a connection window", () => {
  const connections = [
    {
      fromCityId: "londres",
      toCityId: "gante",
      departAt: "2026-06-06T09:01:00+01:00",
      arriveAt: "2026-06-06T12:05:00+02:00",
      transport: "train",
    },
  ]

  const state = getTripState("2026-06-06T09:30:00+01:00", cities, "2026-05-28", "2026-07-03", connections)

  assert.equal(state.phase, "transit")
  assert.equal(state.from.id, "londres")
  assert.equal(state.to.id, "gante")
  assert.equal(state.connection.transport, "train")
})

test("returns after phase when trip has ended", () => {
  const state = getTripState("2026-07-05", cities, "2026-05-28", "2026-07-03")

  assert.equal(state.phase, "after")
  assert.equal(state.dayOfTrip, 36)
})
