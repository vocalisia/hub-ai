import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://ai-due.com'
const locales = ['fr', 'en', 'de', 'it']

const staticPages = [
  '',
  '/blog',
  '/carte',
  '/contact',
  '/ebooks',
  '/games',
  '/quiz',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages in all locales
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // Blog articles
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  if (fs.existsSync(blogDir)) {
    const articles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
    for (const article of articles) {
      const slug = article.replace('.mdx', '')
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  }

  return entries
}
