"use client"

import { useState } from "react"
import { translations, type Locale } from "@/lib/translations"

interface WaitlistFormProps {
  locale: Locale
}

export function WaitlistForm({ locale }: WaitlistFormProps) {
  const t = translations[locale]
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      })

      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-primary font-medium">{t.waitlist.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.waitlist.placeholder}
        required
        className="flex-1 px-5 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "loading" ? "..." : t.waitlist.cta}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm sm:absolute sm:mt-14">{t.waitlist.error}</p>
      )}
    </form>
  )
}
