import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  authorRole: string
  category: string
  image?: string
  readingTime: string
}

export interface Article extends ArticleMeta {
  content: string
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }
  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith('.mdx'))
}

export function getArticleBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug: realSlug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || '',
    authorRole: data.authorRole || '',
    category: data.category || '',
    image: data.image,
    readingTime: stats.text,
    content,
  }
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map((slug) => {
      const article = getArticleBySlug(slug.replace(/\.mdx$/, ''))
      if (!article) return null
      const { content, ...meta } = article
      return meta
    })
    .filter((article): article is ArticleMeta => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories)
}
