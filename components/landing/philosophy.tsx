import { translations, type Locale } from "@/lib/translations"

interface PhilosophyProps {
  locale: Locale
}

export function Philosophy({ locale }: PhilosophyProps) {
  const t = translations[locale]

  return (
    <section id="philosophy" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
              {t.philosophy.title}
            </h2>
            <p className="text-primary text-lg italic">
              {t.philosophy.subtitle}
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-6">
            {t.philosophy.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-lg leading-relaxed text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
