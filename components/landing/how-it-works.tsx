import { translations, type Locale } from "@/lib/translations"

interface HowItWorksProps {
  locale: Locale
}

export function HowItWorks({ locale }: HowItWorksProps) {
  const t = translations[locale]

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            {t.howItWorks.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {t.howItWorks.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < t.howItWorks.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
              
              <div className="text-center md:text-left">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <span className="font-serif text-2xl text-primary font-light">{step.step}</span>
                </div>
                
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
