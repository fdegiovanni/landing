"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOpenMeteoForecastUrl = buildOpenMeteoForecastUrl;
exports.parseOpenMeteoCurrentWeather = parseOpenMeteoCurrentWeather;
exports.weatherCodeToCondition = weatherCodeToCondition;

function buildOpenMeteoForecastUrl({ latitude, longitude, timezone }) {
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  url.searchParams.set("latitude", String(latitude))
  url.searchParams.set("longitude", String(longitude))
  url.searchParams.set("current", "temperature_2m,weather_code")
  url.searchParams.set("timezone", timezone)
  url.searchParams.set("forecast_days", "1")
  return url
}

function weatherCodeToCondition(code) {
  if (code === 0) return { icon: "☀️", description: "Despejado" }
  if ([1, 2].includes(code)) return { icon: "🌤️", description: "Parcial" }
  if (code === 3) return { icon: "☁️", description: "Nublado" }
  if ([45, 48].includes(code)) return { icon: "🌫️", description: "Niebla" }
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "🌦️", description: "Llovizna" }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { icon: "🌧️", description: "Lluvia" }
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "❄️", description: "Nieve" }
  if ([95, 96, 99].includes(code)) return { icon: "⛈️", description: "Tormenta" }
  return { icon: "⛅", description: "Variable" }
}

function parseOpenMeteoCurrentWeather(data) {
  const temperature = data.current?.temperature_2m
  const weatherCode = data.current?.weather_code

  if (typeof temperature !== "number" || typeof weatherCode !== "number") {
    throw new Error("Invalid Open-Meteo current weather response")
  }

  return {
    temperature: Math.round(temperature),
    ...weatherCodeToCondition(weatherCode),
  }
}
