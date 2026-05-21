import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.EUROPA_SUPABASE_SERVICE_KEY!
  )
  const city = request.nextUrl.searchParams.get("city")
  if (!city) {
    return NextResponse.json({ error: "city param required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("europa_photos")
    .select("public_url, taken_date, width, height, display_order")
    .eq("city_slug", city)
    .order("taken_date", { ascending: false })
    .order("display_order", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ photos: data ?? [] })
}
