import Image from "next/image"
import { translations, type Locale } from "@/lib/translations"
import { Apple } from "lucide-react"
import { WaitlistForm } from "@/components/landing/waitlist-form"

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

        {/* App preview */}
        <div className="flex flex-col items-center gap-10">
          {/* Two screenshots side by side */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <div className="bg-card rounded-3xl shadow-xl p-2 max-w-[160px] md:max-w-[200px] -rotate-3">
              <Image
                src="/images/app-screenshot-1.png"
                alt="Motif"
                width={200}
                height={400}
                className="rounded-2xl"
              />
            </div>
            <div className="bg-card rounded-3xl shadow-xl p-2 max-w-[160px] md:max-w-[200px] rotate-3">
              <Image
                src="/images/app-screenshot-2.png"
                alt="Motif"
                width={200}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Waitlist */}
          <div className="w-full max-w-md">
            <WaitlistForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  )
}
