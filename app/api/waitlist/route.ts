import { NextRequest, NextResponse } from "next/server"
import { getSupabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim(), locale: locale || "fr" })

    if (error) {
      if (error.code === "23505") {
        // unique constraint — already registered, return success silently
        return NextResponse.json({ success: true, alreadyRegistered: true })
      }
      console.error("Waitlist insert error:", error)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
