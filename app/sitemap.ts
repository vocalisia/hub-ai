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
  locales?: readonly Locale[]
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
  { path: 'tools', changeFrequency: 'monthly', priority: 0.8, locales: [DEFAULT_LOCALE] },
  { path: 'tools/maturite', changeFrequency: 'monthly', priority: 0.7, locales: [DEFAULT_LOCALE] },
  { path: 'tools/prompt', changeFrequency: 'monthly', priority: 0.7, locales: [DEFAULT_LOCALE] },
  { path: 'tools/roi', changeFrequency: 'monthly', priority: 0.7, locales: [DEFAULT_LOCALE] },
  { path: 'games', changeFrequency: 'monthly', priority: 0.7, locales: [DEFAULT_LOCALE] },
  { path: 'quiz', changeFrequency: 'monthly', priority: 0.7, locales: [DEFAULT_LOCALE] },
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
  // The blog route loader reads canonical root files plus locale-only files.
  // Locale-only files are real public URLs and must not be left out of sitemap.
  const localeDir = path.join(process.cwd(), 'content', 'blog', locale)
  const rootDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(rootDir)) return []

  const rootEntries = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
    .map((e) => e.name)
  const localeEntries = fs.existsSync(localeDir)
    ? fs.readdirSync(localeDir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
      .map((e) => e.name)
    : []
  const entries = Array.from(new Set([...rootEntries, ...localeEntries]))
  const seen = new Set<string>()
  return entries
    .flatMap((filename) => {
      const fallbackSlug = filename.replace(/\.mdx$/, '')
      const localePath = path.join(localeDir, filename)
      const filePath = locale !== DEFAULT_LOCALE && fs.existsSync(localePath)
        ? localePath
        : path.join(rootDir, filename)
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
function buildAlternates(pathSegment: string, locales: readonly Locale[] = LOCALES): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const loc of locales) {
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
  alternateLocales: readonly Locale[] = LOCALES,
): MetadataRoute.Sitemap[number] {
  const url = makeUrl(locale, pathSegment)
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildAlternates(pathSegment, alternateLocales),
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
    const pageLocales = page.locales ?? LOCALES
    for (const locale of pageLocales) {
      entries.push(
        makeEntry(
          locale,
          page.path,
          lastDeploy,
          page.changeFrequency,
          page.priority,
          pageLocales,
        ),
      )
    }
  }

  // 2. Quiz pages × 4 locales
  for (const slug of QUIZ_SLUGS) {
    const segment = `quiz/${slug}`
    entries.push(makeEntry(DEFAULT_LOCALE, segment, lastDeploy, 'monthly', 0.6, [DEFAULT_LOCALE]))
  }

  // 3. Game pages × 4 locales
  for (const slug of GAME_SLUGS) {
    const segment = `games/${slug}`
    entries.push(makeEntry(DEFAULT_LOCALE, segment, lastDeploy, 'monthly', 0.6, [DEFAULT_LOCALE]))
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
