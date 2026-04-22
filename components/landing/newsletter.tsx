"use client"

import { useState } from "react"
import { translations, type Locale } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

interface NewsletterProps {
  locale: Locale
}

export function Newsletter({ locale }: NewsletterProps) {
  const t = translations[locale]
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="newsletter" className="py-20 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            {t.newsletter.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t.newsletter.subtitle}
          </p>

          {/* Form */}
          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-foreground font-medium">{t.newsletter.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-6 rounded-full bg-background border-border focus:border-primary"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="h-12 px-8 rounded-full bg-foreground hover:bg-foreground/90 text-background"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  </span>
                ) : (
                  t.newsletter.button
                )}
              </Button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-muted-foreground mt-4">
            {t.newsletter.privacy}
          </p>
        </div>
      </div>
    </section>
  )
}
