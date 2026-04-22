"use client"

import Image from "next/image"
import Link from "next/link"
import { translations, type Locale } from "@/lib/translations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  t: (typeof translations)["en"]
}

export function Header({ locale, onLocaleChange, t }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const localeLabels = {
    en: "English",
    es: "Español",
    fr: "Français",
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Motif" width={40} height={40} className="rounded-full" />
            <span className="font-serif text-2xl font-light text-primary">Motif</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.features}
            </a>
            <a href="/#philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.philosophy}
            </a>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.blog}
            </Link>
            <a href="/#download" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.download}
            </a>
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{localeLabels[locale]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onLocaleChange("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLocaleChange("es")}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLocaleChange("fr")}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <a 
              href="/#features" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.features}
            </a>
            <a 
              href="/#philosophy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.philosophy}
            </a>
            <Link 
              href="/blog" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.blog}
            </Link>
            <a 
              href="/#download" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.download}
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
