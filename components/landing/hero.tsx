import Image from "next/image"
import { translations, type Locale } from "@/lib/translations"
import { WaitlistForm } from "@/components/landing/waitlist-form"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  const t = translations[locale]

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo Mark */}
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="Motif"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
            {t.hero.tagline}
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6 text-balance">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-pretty">
            {t.hero.subtitle}
          </p>

          {/* Waitlist */}
          <div className="w-full max-w-md">
            <WaitlistForm locale={locale} />
          </div>

          {/* App Preview */}
          <div className="mt-16 md:mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none h-20 bottom-0 top-auto" />
            <div className="bg-card rounded-3xl shadow-2xl shadow-primary/10 p-2 max-w-sm mx-auto">
              <Image
                src="/images/app-screenshot-1.png"
                alt="Motif App"
                width={320}
                height={640}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
