import { NextResponse } from "next/server"
import { getAllArticles } from "@/lib/mdx"

export async function GET() {
  const articles = getAllArticles()
  return NextResponse.json(articles)
}
