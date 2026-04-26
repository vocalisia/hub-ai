import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://ai-due.com'
const LOCALES = ['en', 'fr', 'de', 'it'] as const
const DEFAULT_LOCALE = 'en'

type Locale = (typeof LOCALES)[number]

interface PageDef {
  /** path segment after locale, no leading slash; '' = home */
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// Public, indexable static pages (one entry per logical page; emitted x4 locales)
// EXCLUDED on purpose: /paiement (transactional), /simulation/[id] (dynamic, user-scoped)
const STATIC_PAGES: PageDef[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: 'simulateur', changeFrequency: 'monthly', priority: 0.9 },
  { path: 'tarifs', changeFrequency: 'monthly', priority: 0.9 },
  { path: 'architecture', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'carte', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'ebooks', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'tools', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'tools/maturite', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'tools/prompt', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'tools/roi', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'games', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'quiz', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'blog', changeFrequency: 'daily', priority: 0.9 },
  { path: 'careers', changeFrequency: 'monthly', priority: 0.6 },
  { path: 'contact', changeFrequency: 'yearly', priority: 0.6 },
]

const QUIZ_SLUGS = [
  'quel-ia-pour-votre-entreprise',
  'testez-connaissances-ia',
  'entreprise-prete-ia',
  'quel-agent-ia-deployer',
]

const GAME_SLUGS = [
  'neural-network',
  'pipeline-rag',
  'memory-ia',
  'prompt-engineering',
]

/**
 * Read root content/blog/*.mdx — these are the canonical slugs.
 * Per-locale subdirs (content/blog/{en,de,it}) mirror the same slug, so
 * we emit one entry per slug per locale w/ hreflang alternates.
 */
function readBlogSlugsForLocale(locale: Locale): { slug: string; lastModified: Date }[] {
  // Per-locale dir takes priority; fallback to root for default locale
  const localeDir = path.join(process.cwd(), 'content', 'blog', locale)
  const rootDir = path.join(process.cwd(), 'content', 'blog')
  const dir = fs.existsSync(localeDir) ? localeDir : locale === DEFAULT_LOCALE && fs.existsSync(rootDir) ? rootDir : null
  if (!dir) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
    .map((e) => {
      const slug = e.name.replace(/\.mdx$/, '')
      const filePath = path.join(dir, e.name)
      let lastModified: Date
      try {
        lastModified = fs.statSync(filePath).mtime
      } catch {
        lastModified = new Date()
      }
      return { slug, lastModified }
    })
}

/**
 * Build hreflang alternates map for a given path.
 * Includes all 4 locales + x-default → English.
 */
function buildAlternates(pathSegment: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const loc of LOCALES) {
    const url = pathSegment
      ? `${BASE_URL}/${loc}/${pathSegment}`
      : `${BASE_URL}/${loc}`
    langs[loc] = url
  }
  langs['x-default'] = pathSegment
    ? `${BASE_URL}/${DEFAULT_LOCALE}/${pathSegment}`
    : `${BASE_URL}/${DEFAULT_LOCALE}`
  return langs
}

function makeEntry(
  locale: Locale,
  pathSegment: string,
  lastModified: Date | string,
  changeFrequency: PageDef['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const url = pathSegment
    ? `${BASE_URL}/${locale}/${pathSegment}`
    : `${BASE_URL}/${locale}`
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildAlternates(pathSegment),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lastDeploy = new Date('2026-04-24')

  // 1. Static pages × 4 locales
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push(
        makeEntry(
          locale,
          page.path,
          lastDeploy,
          page.changeFrequency,
          page.priority,
        ),
      )
    }
  }

  // 2. Quiz pages × 4 locales
  for (const slug of QUIZ_SLUGS) {
    const segment = `quiz/${slug}`
    for (const locale of LOCALES) {
      entries.push(makeEntry(locale, segment, lastDeploy, 'monthly', 0.6))
    }
  }

  // 3. Game pages × 4 locales
  for (const slug of GAME_SLUGS) {
    const segment = `games/${slug}`
    for (const locale of LOCALES) {
      entries.push(makeEntry(locale, segment, lastDeploy, 'monthly', 0.6))
    }
  }

  // 4. Blog articles - only emit URL for locales where content actually exists
  for (const locale of LOCALES) {
    const posts = readBlogSlugsForLocale(locale)
    for (const { slug, lastModified } of posts) {
      const segment = `blog/${slug}`
      entries.push(makeEntry(locale, segment, lastModified, 'monthly', 0.7))
    }
  }

  return entries
}
