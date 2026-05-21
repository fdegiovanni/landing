function parseISODate(value) {
  const [datePart] = value.split("T")
  const [year, month, day] = datePart.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function parseDateTime(value) {
  return value.includes("T") ? new Date(value) : parseISODate(value)
}

function daysBetween(from, to) {
  return Math.round((parseISODate(to) - parseISODate(from)) / 86400000)
}

function getTripState(date, cities, tripStart, tripEnd, connections = []) {
  const now = parseDateTime(date)
  const today = parseISODate(date)
  const start = parseISODate(tripStart)
  const end = parseISODate(tripEnd)
  const dayOfTrip = Math.floor((today - start) / 86400000) + 1

  if (today < start) {
    return {
      phase: "before",
      dayOfTrip: 0,
      daysUntil: daysBetween(date, tripStart),
    }
  }

  if (today >= end) {
    return {
      phase: "after",
      dayOfTrip: daysBetween(tripStart, tripEnd),
    }
  }

  for (const city of cities) {
    const arrive = parseISODate(city.arrive)
    const depart = parseISODate(city.depart)

    if (today >= arrive && today < depart) {
      return {
        phase: "in-city",
        city,
        dayOfTrip,
      }
    }
  }

  for (const connection of connections) {
    if (!connection.departAt || !connection.arriveAt) continue

    const departAt = parseDateTime(connection.departAt)
    const arriveAt = parseDateTime(connection.arriveAt)

    if (now >= departAt && now <= arriveAt) {
      return {
        phase: "transit",
        from: cities.find((city) => city.id === connection.fromCityId) ?? null,
        to: cities.find((city) => city.id === connection.toCityId) ?? null,
        connection,
        dayOfTrip,
      }
    }
  }

  let from = null
  let to = null

  for (const city of cities) {
    if (parseISODate(city.depart) <= today) {
      from = city
    }

    if (!to && parseISODate(city.arrive) > today) {
      to = city
    }
  }

  return {
    phase: "transit",
    from,
    to,
    connection: connections.find((item) => item.fromCityId === from?.id && item.toCityId === to?.id) ?? null,
    dayOfTrip,
  }
}

module.exports = {
  daysBetween,
  getTripState,
  parseISODate,
  parseDateTime,
}
