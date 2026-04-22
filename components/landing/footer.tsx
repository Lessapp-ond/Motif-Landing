import Image from "next/image"
import { translations, type Locale } from "@/lib/translations"

interface FooterProps {
  locale: Locale
  t?: (typeof translations)["en"]
}

export function Footer({ locale, t: providedT }: FooterProps) {
  const t = providedT || translations[locale]

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Motif" width={32} height={32} className="rounded-full" />
              <span className="font-serif text-xl font-light text-primary">Motif</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.links.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.links.terms}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.links.contact}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
