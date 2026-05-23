import test from "node:test"
import assert from "node:assert/strict"

import {
  buildOpenMeteoForecastUrl,
  parseOpenMeteoCurrentWeather,
  weatherCodeToCondition,
} from "./open-meteo-weather.js"

test("buildOpenMeteoForecastUrl: requests current weather for coordinates", () => {
  const url = buildOpenMeteoForecastUrl({
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
  })

  assert.equal(url.origin, "https://api.open-meteo.com")
  assert.equal(url.pathname, "/v1/forecast")
  assert.equal(url.searchParams.get("latitude"), "48.8566")
  assert.equal(url.searchParams.get("longitude"), "2.3522")
  assert.equal(url.searchParams.get("current"), "temperature_2m,weather_code")
  assert.equal(url.searchParams.get("timezone"), "Europe/Paris")
})

test("weatherCodeToCondition: maps common weather codes", () => {
  assert.deepEqual(weatherCodeToCondition(0), { icon: "☀️", description: "Despejado" })
  assert.deepEqual(weatherCodeToCondition(61), { icon: "🌧️", description: "Lluvia" })
  assert.deepEqual(weatherCodeToCondition(95), { icon: "⛈️", description: "Tormenta" })
})

test("parseOpenMeteoCurrentWeather: returns rounded temperature and condition", () => {
  const weather = parseOpenMeteoCurrentWeather({
    current: { temperature_2m: 18.6, weather_code: 3 },
  })

  assert.deepEqual(weather, {
    temperature: 19,
    icon: "☁️",
    description: "Nublado",
  })
})
