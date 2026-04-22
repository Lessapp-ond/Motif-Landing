import Image from "next/image"
import { translations, type Locale } from "@/lib/translations"
import { Apple, Play } from "lucide-react"

interface DownloadProps {
  locale: Locale
}

export function Download({ locale }: DownloadProps) {
  const t = translations[locale]

  return (
    <section id="download" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            {t.download.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.download.subtitle}
          </p>
        </div>

        {/* App preview + buttons */}
        <div className="flex flex-col items-center gap-10">
          {/* Two screenshots side by side */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <div className="bg-card rounded-3xl shadow-xl p-2 max-w-[160px] md:max-w-[200px] -rotate-3">
              <Image
                src="/images/app-screenshot-1.png"
                alt="Motif — Today screen"
                width={200}
                height={400}
                className="rounded-2xl"
              />
            </div>
            <div className="bg-card rounded-3xl shadow-xl p-2 max-w-[160px] md:max-w-[200px] rotate-3">
              <Image
                src="/images/app-screenshot-2.png"
                alt="Motif — Insights"
                width={200}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-colors"
            >
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">{t.download.cta}</div>
                <div className="text-base font-semibold">{t.download.appStore}</div>
              </div>
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 3.658L16.8 9.99l-2.302 2.302L5.864 3.658z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">{t.download.cta}</div>
                <div className="text-base font-semibold">{t.download.playStore}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
