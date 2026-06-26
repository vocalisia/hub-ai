import { getAllPosts, getPostsByCountry } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReadingProgress from '@/components/ReadingProgress'

export const revalidate = 86400

const markdownComponents = {
  h1: ({ node: _node, ...props }: any) => <h2 {...props} />,
}

const BLOG_SLUG_ALIASES: Record<string, string> = {
  'reputation-digitale-ia-ecommercants': 'digital-reputation-ai-ecommerce-sellers',
  'reputation-digitale-ia-ecommerçants': 'digital-reputation-ai-ecommerce-sellers',
  'reputation-digitale-ia-ecommerÃ§ants': 'digital-reputation-ai-ecommerce-sellers',
  'automazione-ia-aziendale-2026-04-14': 'ia-automatisation-entreprise',
  'automazione-ai-aziende-2026-04-14': 'ia-automatisation-entreprise',
  'ai-du-2026-04-13': 'ai-agents-for-business-2026-04-14',
  'ai-montreal-2025': 'ia-canada-toronto',
}

function getLegacyBlogAliasKey(slug: string) {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    decoded = slug
  }

  return decoded
    .replace(/\u00c3\u0192\u00c2\u00a7/g, 'c')
    .replace(/\u00c3\u00a7/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function resolveLegacyBlogTarget(locale: string, slug: string) {
  const legacySlug = getLegacyBlogAliasKey(slug)

  if (legacySlug === 'ai-canada-montreal') {
    return locale === 'fr' ? 'ia-canada-toronto' : 'ai-montreal-2025'
  }

  if (legacySlug === 'ai-montreal-2025') {
    return locale === 'fr' ? 'ia-canada-toronto' : undefined
  }

  if (
    legacySlug === 'reputation-digitale-ia-ecommercants' ||
    legacySlug === 'reputation-digitale-ia-ecommerants'
  ) {
    return 'digital-reputation-ai-ecommerce-sellers'
  }

  return BLOG_SLUG_ALIASES[legacySlug]
}

function redirectLegacySlug(locale: string, slug: string) {
  const target = resolveLegacyBlogTarget(locale, slug)
  if (target) {
    permanentRedirect(`/${locale}/blog/${target}`)
  }
}

function extractFaq(content: string) {
  const faqStart = content.search(/^## FAQ\b/im)
  if (faqStart < 0) return []

  const faqContent = content.slice(faqStart)
  const matches = Array.from(
    faqContent.matchAll(/^###\s+(.+?)\s*\n+([\s\S]*?)(?=\n###\s+|\n##(?!#)\s+|(?![\s\S]))/gm),
  )

  return matches
    .map((match) => ({
      question: match[1].trim(),
      answer: match[2]
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/[*_`>#-]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    }))
    .filter((item) => item.question && item.answer)
    .slice(0, 6)
}

function cleanSchemaText(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_`>#|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isHowToCandidate(post: { slug: string; title: string; tags: string[]; category: string }) {
  const text = `${post.slug} ${post.title} ${post.category} ${post.tags.join(' ')}`
  return /guide|how to|comment|tutoriel|tutorial|methode|method|strategie|strategy|checklist|complete/i.test(text)
}

function extractHowToSteps(content: string) {
  const body = content.replace(/^---[\s\S]*?---\s*/m, '')
  const matches = Array.from(
    body.matchAll(/^##(?!#)\s+(.+?)\s*\n+([\s\S]*?)(?=\n##(?!#)\s+|(?![\s\S]))/gm),
  )

  return matches
    .map((match, index) => {
      const name = cleanSchemaText(match[1])
      const text = cleanSchemaText(match[2])
      return {
        "@type": "HowToStep",
        "position": index + 1,
        "name": name,
        "text": text.slice(0, 500),
      }
    })
    .filter((step) => {
      const heading = step.name.toLowerCase()
      return step.name &&
        step.text.length > 80 &&
        !/faq|conclusion|ressources|resources|pour aller plus loin|introduction/.test(heading)
    })
    .slice(0, 8)
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const posts = getAllPosts(params.locale)
  const post = posts.find(p => p.slug === params.slug)
  if (!post) return {}

  const locale = params.locale
  const slug = params.slug

  return {
    title: `${post.title} | AI-Due`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `https://ai-due.com/${locale}/blog/${slug}`,
      languages: {
        'fr': `https://ai-due.com/fr/blog/${slug}`,
        'en': `https://ai-due.com/en/blog/${slug}`,
        'de': `https://ai-due.com/de/blog/${slug}`,
        'it': `https://ai-due.com/it/blog/${slug}`,
      }
    },
    other: {
      'geo.region': post.geo?.country,
      'geo.placename': post.geo?.city,
      'geo.position': `${post.geo?.lat};${post.geo?.lng}`,
      'ICBM': `${post.geo?.lat}, ${post.geo?.lng}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ai-due.com/${locale}/blog/${slug}`,
      siteName: 'AI-Due',
      locale: locale,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [`https://ai-due.com${post.coverImage}`] : undefined
    }
  }
}

export default function BlogPostPage({
  params
}: {
  params: { locale: string; slug: string }
}) {
  const posts = getAllPosts(params.locale)
  const post = posts.find(p => p.slug === params.slug)
  if (!post) redirectLegacySlug(params.locale, params.slug)
  if (!post) notFound()

  const related = getPostsByCountry(post.geo?.country)
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)
  const faqItems = extractFaq(post.content)
  const howToSteps = isHowToCandidate(post) ? extractHowToSteps(post.content) : []

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen bg-[#030014] relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Schema.org Article */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": post.title,
                  "datePublished": post.date,
                  "author": {
                    "@type": "Person",
                    "name": "Laurent Duplat",
                    "url": "https://ai-due.com/about",
                    "sameAs": [
                      "https://www.linkedin.com/in/vocalisia/",
                      "https://x.com/VocalisAi"
                    ]
                  },
                  "dateModified": post.dateModified || post.date,
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://ai-due.com/${params.locale}/blog/${params.slug}`
                  },
                  "image": post.coverImage
                    ? `https://ai-due.com${post.coverImage}`
                    : post.geo?.country
                      ? `https://ai-due.com/api/og?title=${encodeURIComponent(post.title)}`
                      : "https://ai-due.com/api/og",
                  "publisher": {
                    "@type": "Organization",
                    "name": "AI-Due",
                    "url": "https://ai-due.com"
                  },
                  "keywords": post.tags.join(', '),
                  "contentLocation": {
                    "@type": "Place",
                    "name": post.geo?.city,
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": post.geo?.lat,
                      "longitude": post.geo?.lng
                    }
                  }
                })
              }}
            />
            {faqItems.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqItems.map((item) => ({
                      "@type": "Question",
                      "name": item.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer,
                      },
                    })),
                  }),
                }}
              />
            )}
            {howToSteps.length >= 3 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "@id": `https://ai-due.com/${params.locale}/blog/${params.slug}#howto`,
                    "name": post.title,
                    "description": post.excerpt,
                    "inLanguage": params.locale,
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": `https://ai-due.com/${params.locale}/blog/${params.slug}`
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Laurent Duplat",
                      "url": "https://ai-due.com/about"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "AI-Due",
                      "url": "https://ai-due.com"
                    },
                    "step": howToSteps,
                  }),
                }}
              />
            )}

            {/* Breadcrumb */}
            <nav className="mb-10 flex items-center gap-2 text-sm text-gray-600">
              <Link href={`/${params.locale}`} className="hover:text-purple-400 transition-colors">Hub AI</Link>
              <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/${params.locale}/blog`} className="hover:text-purple-400 transition-colors">Blog</Link>
              <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-14">
              {/* Meta row */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {post.geo?.city}, {post.geo?.country}
                </span>
                <span className="text-gray-600 text-xs flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  {post.readTime} min
                </span>
                <span className="text-gray-700">|</span>
                <span className="text-gray-600 text-xs">
                  {new Date(post.date).toLocaleDateString(params.locale, {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white mb-6 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {post.coverImage && (
                <figure className="my-8">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto rounded-2xl border border-white/[0.08]"
                  />
                </figure>
              )}

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-purple-400/80 bg-purple-500/[0.08] px-3 py-1.5 rounded-full border border-purple-500/10 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-10 gradient-divider" />
            </header>

            {/* Content */}
            <article className="prose prose-invert prose-purple max-w-none mb-20 prose-premium">
              <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
            </article>

            {/* Author card */}
            <div className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm">
                  S
                </div>
                <div>
                  <p className="text-white font-semibold">Sebastien</p>
                  <p className="text-gray-500 text-sm">Hub AI - Expert IA</p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <section>
                <div className="gradient-divider mb-12" />
                <h2 className="text-2xl font-bold text-white mb-8">
                  Articles similaires
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {related.map(r => (
                    <Link
                      key={r.slug}
                      href={`/${params.locale}/blog/${r.slug}`}
                      className="group relative bg-[#0a0a1f]/80 rounded-2xl p-5 border border-white/[0.06] hover:border-purple-500/30 transition-all duration-400 card-hover-glow overflow-hidden"
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative">
                        <span className="text-purple-400/60 text-xs font-medium mb-3 block">
                          {r.geo?.city}, {r.geo?.country}
                        </span>
                        <h3 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors leading-snug">
                          {r.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{r.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back to blog */}
            <div className="mt-16 text-center">
              <Link
                href={`/${params.locale}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Retour au blog
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
