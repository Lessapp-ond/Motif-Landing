"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Newsletter } from "@/components/landing/newsletter"
import { Download } from "@/components/landing/download"
import { Footer } from "@/components/landing/footer"
import { translations, type Locale } from "@/lib/translations"

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("motif-locale") as Locale
    if (savedLocale && ["en", "es", "fr"].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("motif-locale", newLocale)
  }

  const t = translations[locale]

  return (
    <main className="min-h-screen">
      <Header locale={locale} onLocaleChange={handleLocaleChange} t={t} />
      <Hero locale={locale} />
      <Features locale={locale} />
      <HowItWorks locale={locale} />
      <Newsletter locale={locale} />
      <Download locale={locale} />
      <Footer locale={locale} t={t} />
    </main>
  )
}
