"use client"

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react"
import styles from "./europa-2026.module.css"
import {
  tripCities,
  tripConnections,
  tripMeta,
  tripWeather,
  type TravelerProfile,
  type TripCity,
  type TripConnection,
} from "@/data/europa-2026"
import { daysBetween, getTripState } from "@/lib/europa-2026/trip-state"

type AccessState = "locked" | "greeted" | "unlocked"
type StoredSession = {
  traveler: TravelerProfile
  expiresAt: number
}
type CityPhoto = { public_url: string; taken_date: string; width: number; height: number }
type TripState =
  | { phase: "before"; dayOfTrip: 0; daysUntil: number }
  | { phase: "in-city"; dayOfTrip: number; city: TripCity }
  | { phase: "transit"; dayOfTrip: number; from: TripCity | null; to: TripCity | null; connection?: TripConnection | null }
  | { phase: "after"; dayOfTrip: number }

const STORAGE_KEY = "europa-2026-traveler"
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000
const publicCities = tripCities.filter((city) => city.publicStop !== false)

function todayLocalISO() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDay(iso: string) {
  const date = new Date(`${iso}T12:00:00Z`)
  return new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short" }).format(date)
}

function localTime(city: TripCity) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: city.timezone,
  }).format(new Date())
}

function transportLabel(transport?: TripConnection["transport"]) {
  const labels = {
    train: "Tren",
    bus: "Bus",
    flight: "Avion",
    "scenic-train": "Tren panoramico",
    "local-transfer": "Conexion local",
  }
  return transport ? labels[transport] : "Conexion"
}

function transportIcon(transport?: TripConnection["transport"]) {
  const icons = {
    train: "🚆",
    bus: "🚌",
    flight: "✈️",
    "scenic-train": "🚂",
    "local-transfer": "🚶",
  }
  return transport ? icons[transport] : "🚆"
}

function formatConnectionTime(value?: string) {
  if (!value) return null
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

export default function Europa2026Page() {
  const [accessState, setAccessState] = useState<AccessState>("locked")
  const [traveler, setTraveler] = useState<TravelerProfile | null>(null)
  const [dni, setDni] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<TripCity | null>(null)
  const [today, setToday] = useState(todayLocalISO)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const simulatedDate = params.get("date")

    if (simulatedDate) {
      setToday(simulatedDate)
    }

    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (stored) {
      const parsed = JSON.parse(stored) as StoredSession

      if (Date.now() < parsed.expiresAt) {
        setTraveler(parsed.traveler)
        setAccessState("unlocked")
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const state = useMemo(
    () => getTripState(today, tripCities, tripMeta.start, tripMeta.end, tripConnections) as TripState,
    [today],
  )

  const totalDays = daysBetween(tripMeta.start, tripMeta.end)
  const highlightedCityId = state.phase === "in-city" ? state.city.id : state.phase === "transit" ? state.to?.id : null

  async function submitAccess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    const response = await fetch("/api/europa/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni }),
    })

    const data = (await response.json()) as { ok: boolean; traveler?: TravelerProfile; message?: string }
    setIsLoading(false)

    if (!data.ok || !data.traveler) {
      setError(data.message || "No te encontre en la lista del viaje")
      return
    }

    setTraveler(data.traveler)
    setAccessState("greeted")
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        traveler: data.traveler,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      } satisfies StoredSession),
    )
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY)
    setTraveler(null)
    setDni("")
    setSelectedCity(null)
    setAccessState("locked")
  }

  if (accessState === "locked") {
    return (
      <main className={styles.shell}>
        <section className={styles.passportCard} aria-label="Acceso privado Europa 2026">
          <div className={styles.stamp}>POR AVION<br />2026</div>
          <p className={styles.script}>de fede, con cariño</p>
          <h1 className={styles.welcomeTitle}>Europa <span>2026</span></h1>
          <p className={styles.kicker}>28 mayo - 3 julio · 16 ciudades</p>
          <p className={styles.prompt}>Hola... quien sos?</p>
          <p className={styles.helper}>Ingresa tu DNI para entrar al diario del viaje.</p>
          <form className={styles.accessForm} onSubmit={submitAccess}>
            <label className={styles.srOnly} htmlFor="dni">DNI</label>
            <input
              id="dni"
              inputMode="numeric"
              value={dni}
              onChange={(event) => setDni(event.target.value.replace(/\D/g, ""))}
              placeholder="DNI"
              className={styles.dniInput}
              autoComplete="off"
            />
            {error && <p className={styles.error}>{error}. Proba de nuevo o escribime.</p>}
            <button className={styles.primaryButton} disabled={isLoading}>
              {isLoading ? "Revisando..." : "Entrar al viaje"}
            </button>
          </form>
        </section>
      </main>
    )
  }

  if (accessState === "greeted" && traveler) {
    return (
      <main className={styles.shell}>
        <section className={styles.passportCard}>
          <div className={styles.greetingEmoji}>{traveler.emoji}</div>
          <p className={styles.script}>te estaba esperando</p>
          <h1 className={styles.greetingTitle}>Hola, {traveler.displayName}</h1>
          <p className={styles.helper}>Pasa nomas. Te voy mostrando por donde anda el viaje.</p>
          <button className={styles.primaryButton} onClick={() => setAccessState("unlocked")}>
            Ver el mapa
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.journeyShell}>
      <section className={styles.phoneStage}>
        {selectedCity ? (
          <CityDetail city={selectedCity} onBack={() => setSelectedCity(null)} />
        ) : (
          <>
            <header className={styles.topBar}>
              <div>
                <p className={styles.script}>hola {traveler?.displayName || "familia"}!</p>
                <h1>Mi viaje por Europa</h1>
              </div>
              <div className={styles.topActions}>
                <button className={styles.logoutButton} onClick={logout}>Salir</button>
                <div className={styles.dayBadge}>
                  <span>DIA</span>
                  <strong>{Math.max(0, state.dayOfTrip)}</strong>
                  <small>/ {totalDays}</small>
                </div>
              </div>
            </header>

            <StatusBanner state={state} onCity={setSelectedCity} />
            <EuropeMap currentDate={today} highlightedCityId={highlightedCityId} onCity={setSelectedCity} />
            <TripStats date={today} state={state} />
          </>
        )}
      </section>
    </main>
  )
}

function StatusBanner({ state, onCity }: { state: TripState; onCity: (city: TripCity) => void }) {
  if (state.phase === "before") {
    return (
      <section className={styles.statusDark}>
        <strong>{state.daysUntil}</strong>
        <div>
          <p className={styles.script}>faltan</p>
          <h2>dias para despegar</h2>
        </div>
        <span>✈️</span>
      </section>
    )
  }

  if (state.phase === "after") {
    return (
      <section className={styles.statusDark}>
        <div>
          <p className={styles.script}>el viaje termino</p>
          <h2>gracias por seguirme</h2>
        </div>
        <span>🤍</span>
      </section>
    )
  }

  if (state.phase === "transit") {
    const connection = state.connection || tripConnections.find(
      (item) => item.fromCityId === state.from?.id && item.toCityId === state.to?.id,
    )
    const departure = formatConnectionTime(connection?.departAt)
    const arrival = formatConnectionTime(connection?.arriveAt)

    return (
      <section className={styles.statusCard}>
        <p className={styles.script}>en transito</p>
        <h2>
          {state.from?.name || "Ruta"} <span>{transportIcon(connection?.transport)}</span> {state.to?.name || "proxima parada"}
        </h2>
        <small>
          {transportLabel(connection?.transport)}
          {connection?.service ? ` · ${connection.service}` : ""}
          {connection?.duration ? ` · ${connection.duration}` : ""}
        </small>
        {(departure || arrival) && <small>{departure || "Salida"} → {arrival || "Llegada"}</small>}
        <small>{connection?.note || "Camino a la proxima ciudad"}</small>
      </section>
    )
  }

  const weather = tripWeather[state.city.id]

  return (
    <button className={styles.statusCardButton} onClick={() => onCity(state.city)}>
      <span className={styles.cityEmoji}>{state.city.emoji}</span>
      <span>
        <span className={styles.script}>hoy estoy en</span>
        <strong>{state.city.name}</strong>
        <small>🕐 {localTime(state.city)} · {weather.icon} {weather.temperature}° · {weather.description}</small>
      </span>
      <span className={styles.chevron}>›</span>
    </button>
  )
}

function EuropeMap({
  currentDate,
  highlightedCityId,
  onCity,
}: {
  currentDate: string
  highlightedCityId: string | null | undefined
  onCity: (city: TripCity) => void
}) {
  const dateValue = new Date(`${currentDate}T12:00:00Z`).getTime()
  const routeCities = publicCities
  const activeIndex = highlightedCityId ? routeCities.findIndex((city) => city.id === highlightedCityId) : -1
  const activeCity = activeIndex >= 0 ? routeCities[activeIndex] : null
  const visibleStopCount = 4
  const maxStartIndex = Math.max(0, routeCities.length - visibleStopCount)
  const [routeStartIndex, setRouteStartIndex] = useState(() =>
    Math.min(Math.max(activeIndex >= 0 ? activeIndex : 0, 0), maxStartIndex)
  )
  const visibleCities = routeCities.slice(routeStartIndex, routeStartIndex + visibleStopCount)

  useEffect(() => {
    if (activeIndex < 0) return
    setRouteStartIndex(Math.min(Math.max(activeIndex - 1, 0), maxStartIndex))
  }, [activeIndex, maxStartIndex])

  function cityStatus(city: TripCity) {
    if (dateValue >= new Date(`${city.depart}T12:00:00Z`).getTime()) return "visited"
    if (city.id === highlightedCityId) return "current"
    return "future"
  }

  function previousStops() {
    setRouteStartIndex((index) => Math.max(0, index - 1))
  }

  function nextStops() {
    setRouteStartIndex((index) => Math.min(maxStartIndex, index + 1))
  }

  return (
    <section className={styles.mapWrap} aria-label="Mapa del viaje Europa 2026">
      <div className={styles.routeHeader}>
        <span>Ruta clara</span>
        <strong>{activeCity ? `Ahora: ${activeCity.name}` : "Europa 2026"}</strong>
      </div>
      <div className={styles.routeListPanel}>
        <button
          className={styles.routeListControl}
          onClick={previousStops}
          disabled={routeStartIndex === 0}
          aria-label="Subir lista de paradas"
        >
          <ChevronUp size={22} strokeWidth={2.5} />
          <span>anteriores</span>
        </button>

        <div className={styles.routeListWindow}>
          {visibleCities.map((city, offset) => {
            const index = routeStartIndex + offset
            const status = cityStatus(city)
            const isCurrent = city.id === highlightedCityId

            return (
              <button
                key={city.id}
                className={`${styles.routeStop} ${styles.routeStopListed} ${styles[`stop-${status}`]} ${isCurrent ? styles.stopCurrent : ""}`}
                onClick={() => onCity(city)}
                aria-label={`Ver parada ${index + 1}: ${city.name}`}
              >
                <span className={styles.stopNumber}>{index + 1}</span>
                <span className={styles.stopText}>
                  <span className={styles.stopName}>{city.name}</span>
                  <span className={styles.stopMeta}>{city.flag} · {formatDay(city.arrive)}</span>
                </span>
                <span className={styles.stopState}>{status === "visited" ? "Visitado" : status === "current" ? "Ahora" : "Falta"}</span>
              </button>
            )
          })}
        </div>

        <button
          className={styles.routeListControl}
          onClick={nextStops}
          disabled={routeStartIndex >= maxStartIndex}
          aria-label="Bajar lista de paradas"
        >
          <span>siguientes</span>
          <ChevronDown size={22} strokeWidth={2.5} />
        </button>
      </div>
      <div className={styles.routeLegend}>
        <span><i className={styles.legendVisited} /> Visitado</span>
        <span><i className={styles.legendCurrent} /> Ahora</span>
        <span><i className={styles.legendFuture} /> Falta</span>
      </div>
      <p className={styles.mapHint}>Toca una parada para ver fotos, clima y plan.</p>
    </section>
  )
}

function TripStats({ date, state }: { date: string; state: TripState }) {
  const currentDate = new Date(`${date}T12:00:00Z`).getTime()
  const totalDays = daysBetween(tripMeta.start, tripMeta.end)
  const visitedCities = tripCities.filter((city) => currentDate >= new Date(`${city.depart}T12:00:00Z`).getTime())
  const visitedCountries = new Set(visitedCities.map((city) => city.country))
  const kmDone = state.phase === "before" ? 0 : state.phase === "after" ? tripMeta.totalKm : Math.round(tripMeta.totalKm * (state.dayOfTrip / totalDays))

  return (
    <footer className={styles.statsPanel}>
      <div><strong>{kmDone.toLocaleString("es-AR")}</strong><span>km</span></div>
      <div><strong>{visitedCountries.size}</strong><span>paises</span></div>
      <div><strong>{visitedCities.length}</strong><span>ciudades</span></div>
      {state.phase !== "before" && state.phase !== "after" && (
        <p className={styles.dailyNote}>Hoy: tres mapas abiertos, dos cafes y una felicidad enorme.</p>
      )}
    </footer>
  )
}

function CityDetail({ city, onBack }: { city: TripCity; onBack: () => void }) {
  const weather = tripWeather[city.id]
  const stopNumber = publicCities.findIndex((item) => item.id === city.id) + 1
  const [photos, setPhotos] = useState<CityPhoto[]>([])
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const galleryPhotos = useMemo(() => photos.slice(0, 10), [photos])
  const activePhoto = activePhotoIndex === null ? null : galleryPhotos[activePhotoIndex] ?? null

  useEffect(() => {
    setPhotos([])
    setActivePhotoIndex(null)
    fetch(`/api/europa/photos?city=${city.id}`)
      .then((r) => r.json())
      .then((data) => setPhotos(data.photos ?? []))
      .catch(() => {})
  }, [city.id])

  useEffect(() => {
    if (activePhotoIndex === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhotoIndex(null)
      }
      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) =>
          current === null ? current : (current - 1 + galleryPhotos.length) % galleryPhotos.length
        )
      }
      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) =>
          current === null ? current : (current + 1) % galleryPhotos.length
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activePhotoIndex, galleryPhotos.length])

  function showPreviousPhoto() {
    setActivePhotoIndex((current) =>
      current === null ? current : (current - 1 + galleryPhotos.length) % galleryPhotos.length
    )
  }

  function showNextPhoto() {
    setActivePhotoIndex((current) =>
      current === null ? current : (current + 1) % galleryPhotos.length
    )
  }

  return (
    <article className={styles.cityDetail}>
      <div className={styles.heroImage}>
        <div className={styles.heroFallback}>
          <span>{city.emoji}</span>
          <strong>{city.name}</strong>
        </div>
        <img
          src={city.image.url}
          alt={`${city.name}, ${city.country}`}
          onError={(event) => {
            event.currentTarget.style.display = "none"
          }}
        />
        <button className={styles.backButton} onClick={onBack} aria-label="Volver al mapa">←</button>
        <span className={styles.countryPill}>{city.flag} · {city.country}</span>
      </div>
      <div className={styles.cityContent}>
        <p className={styles.script}>{stopNumber > 0 ? `parada ${stopNumber} de ${publicCities.length}` : "parada de conexion"}</p>
        <h1>{city.name}</h1>
        <p className={styles.dateLine}>{formatDay(city.arrive)} → {formatDay(city.depart)}</p>
        <p className={styles.summary}>{city.summary}</p>

        <div className={styles.timeWeather}>
          <div><span>hora local</span><strong>{localTime(city)}</strong></div>
          <div><span>clima ahora</span><strong>{weather.icon} {weather.temperature}°</strong></div>
        </div>

        <InfoBlock title="plan aca">
          <p>{city.planNote}</p>
        </InfoBlock>

        <InfoBlock title="que visitar">
          <div className={styles.chips}>{city.landmarks.map((item) => <span key={item}>{item}</span>)}</div>
        </InfoBlock>

        <InfoBlock title="que comer">
          <div className={styles.foodChips}>{city.foods.map((item) => <span key={item}>{item}</span>)}</div>
        </InfoBlock>

        <div className={styles.factBox}>
          <span>sabias que...</span>
          <p>{city.funFact}</p>
        </div>

        <InfoBlock title="fotos del cron">
          {photos.length > 0 ? (
            <>
              <div className={styles.photoGrid}>
                {galleryPhotos.map((photo, i) => (
                  <button
                    key={`${photo.public_url}-${i}`}
                    className={`${styles.photoPlaceholder} ${styles.photoButton}`}
                    onClick={() => setActivePhotoIndex(i)}
                    aria-label={`Ver foto ${i + 1} de ${city.name}`}
                  >
                    <img
                      src={photo.public_url}
                      alt={`${city.name} · foto ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
              <p className={styles.photoNote}>
                {(() => {
                  const shown = galleryPhotos
                  const oldest = shown[shown.length - 1].taken_date
                  return oldest === shown[0].taken_date ? shown[0].taken_date : `${oldest} – ${shown[0].taken_date}`
                })()}
              </p>
            </>
          ) : (
            <>
              <div className={styles.photoGrid}>
                {["📷", "🌅", "🍽️", "🚶"].map((emoji, index) => (
                  <div key={index} className={styles.photoPlaceholder}>
                    <span>{emoji}</span>
                    <small>proximamente</small>
                  </div>
                ))}
              </div>
              <p className={styles.photoNote}>Se van a subir cada dia desde mi camara.</p>
            </>
          )}
        </InfoBlock>

        <a className={styles.attribution} href={city.image.sourceUrl} target="_blank" rel="noreferrer">
          Imagen inicial: {city.image.attribution}
        </a>
      </div>

      {activePhoto && activePhotoIndex !== null && (
        <div
          className={styles.galleryOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos de ${city.name}`}
          onClick={() => setActivePhotoIndex(null)}
        >
          <div className={styles.galleryFrame} onClick={(event) => event.stopPropagation()}>
            <div className={styles.galleryToolbar}>
              <span>{city.name}</span>
              <strong>{activePhotoIndex + 1} / {galleryPhotos.length}</strong>
              <button
                className={styles.galleryIconButton}
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Cerrar galeria"
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>

            <div className={styles.galleryImageWrap}>
              {galleryPhotos.length > 1 && (
                <button
                  className={`${styles.galleryNavButton} ${styles.galleryPrevButton}`}
                  onClick={showPreviousPhoto}
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={28} strokeWidth={2.4} />
                </button>
              )}
              <img
                src={activePhoto.public_url}
                alt={`${city.name} · foto ampliada ${activePhotoIndex + 1}`}
                className={styles.galleryImage}
              />
              {galleryPhotos.length > 1 && (
                <button
                  className={`${styles.galleryNavButton} ${styles.galleryNextButton}`}
                  onClick={showNextPhoto}
                  aria-label="Foto siguiente"
                >
                  <ChevronRight size={28} strokeWidth={2.4} />
                </button>
              )}
            </div>

            <p className={styles.galleryDate}>{activePhoto.taken_date}</p>
          </div>
        </div>
      )}
    </article>
  )
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.infoBlock}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
