import { translations, type Locale } from "@/lib/translations"
import { Heart, RefreshCw, User, Mail, Target, Shield } from "lucide-react"

interface FeaturesProps {
  locale: Locale
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  refresh: RefreshCw,
  user: User,
  mail: Mail,
  target: Target,
  shield: Shield,
}

export function Features({ locale }: FeaturesProps) {
  const t = translations[locale]

  return (
    <section id="features" className="py-20 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            {t.features.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid — 2x3 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Heart
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
