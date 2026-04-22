"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { blogTranslations, type BlogLocale } from "@/lib/blog-translations"
import { translations, type Locale } from "@/lib/translations"
import type { ArticleMeta } from "@/lib/mdx"
import { ArrowRight } from "lucide-react"

const categories = [
  { key: "all", label: "allArticles" },
  { key: "emotions", label: "emotions" },
  { key: "behavioral_finance", label: "behavioral_finance" },
  { key: "wellbeing", label: "wellbeing" },
  { key: "mindfulness", label: "mindfulness" },
  { key: "psychology", label: "psychology" },
]

export default function BlogPage() {
  const [locale, setLocale] = useState<Locale>("en")
  const [activeCategory, setActiveCategory] = useState("all")
  const [articles, setArticles] = useState<ArticleMeta[]>([])
  const [loading, setLoading] = useState(true)

  const t = translations[locale]
  const blogT = blogTranslations[locale as BlogLocale].blog

  useEffect(() => {
    const savedLocale = localStorage.getItem("motif-locale") as Locale
    if (savedLocale && ["en", "es", "fr"].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("motif-locale", newLocale)
  }

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter(
          (article) =>
            article.category.toLowerCase().replace(/\s+/g, "_") === activeCategory
        )

  const getCategoryLabel = (key: string) => {
    if (key === "all") return blogT.allArticles
    return blogT.categories[key as keyof typeof blogT.categories] || key
  }

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={handleLocaleChange} t={t} />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
              {blogT.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {blogT.subtitle}
            </p>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-card/80"
                }`}
              >
                {getCategoryLabel(cat.key)}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] rounded-2xl bg-card" />
                  <div className="mt-4 h-4 w-20 rounded bg-card" />
                  <div className="mt-3 h-6 w-3/4 rounded bg-card" />
                  <div className="mt-2 h-4 w-full rounded bg-card" />
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-foreground">{blogT.noArticles}</p>
              <p className="mt-2 text-muted-foreground">{blogT.noArticlesDescription}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  blogT={blogT}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale} t={t} />
    </div>
  )
}

function ArticleCard({
  article,
  blogT,
}: {
  article: ArticleMeta
  blogT: (typeof blogTranslations)["en"]["blog"]
}) {
  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <article className="overflow-hidden rounded-2xl bg-card transition-shadow hover:shadow-lg">
        {article.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent px-2 py-1 text-accent-foreground">
              {blogT.categories[
                article.category.toLowerCase().replace(/\s+/g, "_") as keyof typeof blogT.categories
              ] || article.category}
            </span>
            <span>{article.readingTime}</span>
          </div>
          <h2 className="mt-3 font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {article.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              <span>{blogT.by} </span>
              <span className="font-medium text-foreground">{article.author}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {blogT.readMore}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
