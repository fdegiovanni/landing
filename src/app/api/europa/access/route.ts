import { createHash, timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"

type Traveler = {
  displayName: string
  alias: string
  emoji: string
}

const TRAVELERS: Array<Traveler & { dniHash: string }> = [
  {
    dniHash: "61bcd812e856efdcc52e6d3425604e9695364b521c215eae75e09a4965b9ebe9",
    displayName: "Mama",
    alias: "Susana",
    emoji: "💛",
  },
  {
    dniHash: "74b494cfd98538f92b3f0f01386e4e3741b5fd5c362429c87ab450f94e6eaa6f",
    displayName: "Fede",
    alias: "Federico",
    emoji: "✈️",
  },
  {
    dniHash: "b8f5655a0264324ada61214f5aef3ffa7f99d1520ece738090a031783f8219cf",
    displayName: "Lu",
    alias: "Lucia",
    emoji: "🌷",
  },
  {
    dniHash: "cce2a0889fcc8d839b3ac967daad51fda304509432a74d8d8119c76d453d46bb",
    displayName: "Brenda",
    alias: "Bren",
    emoji: "🌷",
  },
  {
    dniHash: "465e18d0238feb718b4940046e9a29d1c5cbc25c163dd75fd5e0e84b47d348e4",
    displayName: "Leo",
    alias: "Leonardo",
    emoji: "🎒",
  },
]

function hashDni(dni: string) {
  return createHash("sha256").update(dni).digest("hex")
}

function safeHashEqual(a: string, b: string) {
  const left = Buffer.from(a, "hex")
  const right = Buffer.from(b, "hex")
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { dni?: string }
    const dni = String(body.dni ?? "").replace(/\D/g, "")

    if (dni.length < 6 || dni.length > 10) {
      return NextResponse.json({ ok: false, message: "DNI invalido" }, { status: 400 })
    }

    const incomingHash = hashDni(dni)
    const traveler = TRAVELERS.find((candidate) => safeHashEqual(candidate.dniHash, incomingHash))

    if (!traveler) {
      return NextResponse.json({ ok: false, message: "No te encontre en la lista del viaje" }, { status: 401 })
    }

    return NextResponse.json({
      ok: true,
      traveler: {
        displayName: traveler.displayName,
        alias: traveler.alias,
        emoji: traveler.emoji,
      },
    })
  } catch (error) {
    console.error("Europa 2026 access error:", error)
    return NextResponse.json({ ok: false, message: "No pude validar el acceso" }, { status: 500 })
  }
}
