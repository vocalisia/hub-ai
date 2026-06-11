import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://ai-due.com'
const LOCALES = ['en', 'fr', 'de', 'it'] as const
const DEFAULT_LOCALE = 'fr'
const REDIRECT_SOURCES = readRedirectSources()

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
  { path: 'contact', changeFrequency: 'monthly', priority: 0.9 },
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
function readRedirectSources(): Set<string> {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
    const config = JSON.parse(raw) as { redirects?: { source?: string }[] }
    return new Set((config.redirects ?? []).map((redirect) => redirect.source).filter(Boolean) as string[])
  } catch {
    return new Set()
  }
}

function isRedirectSource(locale: Locale, pathSegment: string): boolean {
  return REDIRECT_SOURCES.has(`/${locale}/${pathSegment}`) || REDIRECT_SOURCES.has(`/${pathSegment}`)
}

function readBlogSlugsForLocale(locale: Locale): { slug: string; lastModified: Date }[] {
  // The blog route loader iterates canonical root files and reads a translated
  // same-name file when it exists. The sitemap must mirror that exactly.
  const localeDir = path.join(process.cwd(), 'content', 'blog', locale)
  const rootDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(rootDir)) return []

  const entries = fs.readdirSync(rootDir, { withFileTypes: true })
  const seen = new Set<string>()
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
    .flatMap((e) => {
      const fallbackSlug = e.name.replace(/\.mdx$/, '')
      const localePath = path.join(localeDir, e.name)
      const filePath = locale !== DEFAULT_LOCALE && fs.existsSync(localePath)
        ? localePath
        : path.join(rootDir, e.name)
      let lastModified: Date
      try {
        lastModified = fs.statSync(filePath).mtime
      } catch {
        lastModified = new Date()
      }
      try {
        const raw = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(raw)
        const slug = String(data.slug || fallbackSlug).trim()
        if (isRedirectSource(locale, `blog/${slug}`)) return []
        if (!slug || seen.has(slug)) return []
        seen.add(slug)
        return [{ slug, lastModified }]
      } catch {
        if (isRedirectSource(locale, `blog/${fallbackSlug}`)) return []
        if (seen.has(fallbackSlug)) return []
        seen.add(fallbackSlug)
        return [{ slug: fallbackSlug, lastModified }]
      }
    })
}

function encodePath(pathSegment: string): string {
  return pathSegment
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function makeUrl(locale: Locale, pathSegment: string): string {
  return pathSegment
    ? `${BASE_URL}/${locale}/${encodePath(pathSegment)}`
    : `${BASE_URL}/${locale}`
}

/**
 * Build hreflang alternates map for a given path.
 * Includes all 4 locales + x-default to French.
 */
function buildAlternates(pathSegment: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const loc of LOCALES) {
    langs[loc] = makeUrl(loc, pathSegment)
  }
  langs['x-default'] = pathSegment
    ? makeUrl(DEFAULT_LOCALE, pathSegment)
    : `${BASE_URL}/${DEFAULT_LOCALE}`
  return langs
}

function buildBlogAlternates(slug: string, slugsByLocale: Record<Locale, Set<string>>): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const loc of LOCALES) {
    if (slugsByLocale[loc].has(slug) && !isRedirectSource(loc, `blog/${slug}`)) {
      langs[loc] = makeUrl(loc, `blog/${slug}`)
    }
  }
  if (slugsByLocale[DEFAULT_LOCALE].has(slug) && !isRedirectSource(DEFAULT_LOCALE, `blog/${slug}`)) {
    langs['x-default'] = makeUrl(DEFAULT_LOCALE, `blog/${slug}`)
  }
  return langs
}

function makeEntry(
  locale: Locale,
  pathSegment: string,
  lastModified: Date | string,
  changeFrequency: PageDef['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const url = makeUrl(locale, pathSegment)
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
  const postsByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, readBlogSlugsForLocale(locale)])
  ) as Record<Locale, { slug: string; lastModified: Date }[]>
  const slugsByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, new Set(postsByLocale[locale].map((post) => post.slug))])
  ) as Record<Locale, Set<string>>

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
    const posts = postsByLocale[locale]
    for (const { slug, lastModified } of posts) {
      const segment = `blog/${slug}`
      entries.push({
        url: makeUrl(locale, segment),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: buildBlogAlternates(slug, slugsByLocale),
        },
      })
    }
  }

  return entries
}
