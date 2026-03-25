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
    <main className="min-h-screen bg-[#0A0A1A] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">{t('title')}</h1>
          <p className="text-gray-400 text-xl">{t('subtitle')}</p>
        </div>

        {/* Filtres geo */}
        <GeoFilter locale={locale} activeFilter={searchParams.geo} />

        {/* Schema.org pour le blog */}
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

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </main>
  )
}
