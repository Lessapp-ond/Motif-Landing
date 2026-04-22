import { translations, type Locale } from "@/lib/translations"

interface WhyBuiltThisProps {
  locale: Locale
}

export function WhyBuiltThis({ locale }: WhyBuiltThisProps) {
  const t = translations[locale]

  return (
    <section id="why" className="py-20 md:py-32 bg-[hsl(var(--primary)/0.04)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
              {t.whyBuilt.title}
            </h2>
          </div>

          {/* Story */}
          <div className="space-y-6 mb-12">
            {t.whyBuilt.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Founder */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-xl">
              G
            </div>
            <div>
              <p className="font-medium text-foreground">{t.whyBuilt.founder}</p>
              <p className="text-sm text-muted-foreground">{t.whyBuilt.founderRole}</p>
            </div>
          </div>

          {/* Psychologists mention */}
          <p className="text-sm text-muted-foreground italic border-l-2 border-primary/20 pl-4">
            {t.whyBuilt.psychologists}
          </p>
        </div>
      </div>
    </section>
  )
}
