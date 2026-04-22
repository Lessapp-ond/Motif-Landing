"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { blogTranslations, type BlogLocale } from "@/lib/blog-translations"
import { translations, type Locale } from "@/lib/translations"
import type { Article, ArticleMeta } from "@/lib/mdx"
import { ArrowLeft, Share2, Twitter, Linkedin, Link2 } from "lucide-react"

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 mb-4 font-serif text-3xl font-medium text-foreground" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 font-serif text-2xl font-medium text-foreground" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 font-serif text-xl font-medium text-foreground" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal pl-6 text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
}

interface ArticleContentProps {
  article: Article
  relatedArticles: ArticleMeta[]
}

export function ArticleContent({ article, relatedArticles }: ArticleContentProps) {
  const [locale, setLocale] = useState<Locale>("en")
  const [copied, setCopied] = useState(false)

  const t = translations[locale]
  const blogT = blogTranslations[locale as BlogLocale].blog

  useEffect(() => {
    const savedLocale = localStorage.getItem("motif-locale") as Locale
    if (savedLocale && ["en", "es", "fr"].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("motif-locale", newLocale)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={handleLocaleChange} t={t} />

      <main className="pt-24 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {blogT.backToBlog}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
                {blogT.categories[
                  article.category.toLowerCase().replace(/\s+/g, "_") as keyof typeof blogT.categories
                ] || article.category}
              </span>
              <span>{formatDate(article.date)}</span>
              <span>{article.readingTime}</span>
            </div>

            <h1 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              {article.title}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              {article.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-y border-border py-4">
              <div>
                <p className="font-medium text-foreground">{article.author}</p>
                <p className="text-sm text-muted-foreground">{article.authorRole}</p>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="mr-2 text-sm text-muted-foreground">{blogT.shareArticle}</span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-card p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-card p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  onClick={copyLink}
                  className="rounded-full bg-card p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {copied ? <Share2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </header>

          {/* Featured image */}
          {article.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose-motif">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>
        </article>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl px-6">
            <h2 className="mb-8 font-serif text-2xl font-medium text-foreground">
              {blogT.relatedArticles}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group rounded-2xl bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <span className="text-xs text-muted-foreground">
                    {relatedArticle.readingTime}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                    {relatedArticle.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {relatedArticle.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer locale={locale} t={t} />
    </div>
  )
}
