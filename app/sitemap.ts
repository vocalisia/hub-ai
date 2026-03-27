import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
  '/tools',
]

const quizSlugs = [
  'quel-ia-pour-votre-entreprise',
  'testez-connaissances-ia',
  'entreprise-prete-ia',
  'quel-agent-ia-deployer',
]

const gameSlugs = [
  'neural-network',
  'pipeline-rag',
  'memory-ia',
  'prompt-engineering',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lastDeploy = '2026-03-27'

  // Static pages in all locales
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: lastDeploy,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // Blog articles — read slug from frontmatter
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  if (fs.existsSync(blogDir)) {
    const articles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
    for (const article of articles) {
      const filePath = path.join(blogDir, article)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)
      const slug = data.slug || article.replace('.mdx', '')
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  }

  // Quiz pages
  for (const slug of quizSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/quiz/${slug}`,
        lastModified: lastDeploy,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // Game pages
  for (const slug of gameSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/games/${slug}`,
        lastModified: lastDeploy,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
