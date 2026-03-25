import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import GeoFilter from '@/components/GeoFilter'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Blog IA — Articles Experts Geolocalises | Hub AI',
    description: 'Articles IA geolocalises : Suisse, Europe, Canada, USA. SEO local + expertise IA.',
    other: {
      'geo.region': 'CH',
      'geo.placename': 'Suisse'
    }
  }
}

export default async function BlogPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string }
  searchParams: { geo?: string }
}) {
  const t = await getTranslations({ locale, namespace: 'blog' })
  const allPosts = getAllPosts(locale)

  const posts = searchParams.geo
    ? allPosts.filter(p => {
        if (searchParams.geo === 'ch') return p.geo?.country === 'CH'
        if (searchParams.geo === 'ca') return p.geo?.country === 'CA'
        if (searchParams.geo === 'us') return p.geo?.country === 'US'
        if (searchParams.geo === 'eu') return p.geo?.continent === 'Europe'
        return true
      })
    : allPosts

  return (
    <main className="min-h-screen bg-[#030014] relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-purple-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
              Expert Articles
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              {t('title').split(' ')[0]}{' '}
              <span className="gradient-text-purple">{t('title').split(' ').slice(1).join(' ') || 'IA'}</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Decorative line */}
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          {/* Geo Filters */}
          <GeoFilter locale={locale} activeFilter={searchParams.geo} />

          {/* Schema.org */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "Blog IA — Hub AI",
                "url": `https://sebastien-ia.com/${locale}/blog`,
                "description": "Articles experts sur l'IA geolocalises CH/EU/CA/USA",
                "blogPost": posts.slice(0, 5).map(post => ({
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "datePublished": post.date,
                  "author": { "@type": "Person", "name": "Sebastien" },
                  "keywords": post.tags.join(', '),
                  "contentLocation": {
                    "@type": "Place",
                    "name": post.geo?.city,
                    "address": { "@type": "PostalAddress", "addressCountry": post.geo?.country }
                  }
                }))
              })
            }}
          />

          {/* Post count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 text-sm">
              <span className="text-white font-semibold">{posts.length}</span> article{posts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} locale={locale} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Aucun article pour cette region.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
