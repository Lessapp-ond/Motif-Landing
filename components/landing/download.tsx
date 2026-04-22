import { translations, type Locale } from "@/lib/translations"
import { Apple, Smartphone } from "lucide-react"

interface DownloadProps {
  locale: Locale
}

export function Download({ locale }: DownloadProps) {
  const t = translations[locale]

  // Placeholder QR code data (will be replaced with actual store links)
  const appStoreUrl = "https://apps.apple.com"
  const playStoreUrl = "https://play.google.com"

  return (
    <section id="download" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            {t.download.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.download.subtitle}
          </p>
        </div>

        {/* QR Codes */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {/* App Store */}
          <div className="flex flex-col items-center">
            <div className="bg-card rounded-2xl p-6 shadow-lg mb-4">
              {/* QR Code Placeholder */}
              <div className="w-40 h-40 bg-foreground rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* QR Pattern Simulation */}
                <div className="absolute inset-2 grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square ${
                        // Create a QR-like pattern
                        [0,1,2,4,5,6,7,8,13,14,20,21,27,28,34,35,42,43,44,45,46,47,48].includes(i) ||
                        [3,10,17,24,31,38].includes(i) ||
                        Math.random() > 0.6
                          ? 'bg-background' 
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Apple className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Apple className="w-5 h-5" />
              <span className="font-medium">{t.download.appStore}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{t.download.scanQr}</p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-48 bg-border" />

          {/* Play Store */}
          <div className="flex flex-col items-center">
            <div className="bg-card rounded-2xl p-6 shadow-lg mb-4">
              {/* QR Code Placeholder */}
              <div className="w-40 h-40 bg-foreground rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* QR Pattern Simulation */}
                <div className="absolute inset-2 grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square ${
                        [0,1,2,4,5,6,7,8,13,14,20,21,27,28,34,35,42,43,44,45,46,47,48].includes(i) ||
                        [3,10,17,24,31,38].includes(i) ||
                        Math.random() > 0.6
                          ? 'bg-background' 
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Smartphone className="w-5 h-5" />
              <span className="font-medium">{t.download.playStore}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{t.download.scanQr}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
