import { getAllPosts, getPostsByCountry } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const posts = getAllPosts(params.locale)
  const post = posts.find(p => p.slug === params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Hub AI`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    other: {
      'geo.region': post.geo?.country,
      'geo.placename': post.geo?.city,
      'geo.position': `${post.geo?.lat};${post.geo?.lng}`,
      'ICBM': `${post.geo?.lat}, ${post.geo?.lng}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags
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
  if (!post) notFound()

  // Articles similaires (meme pays)
  const related = getPostsByCountry(post.geo?.country)
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#0A0A1A] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Schema.org Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "datePublished": post.date,
              "author": { "@type": "Person", "name": "Sebastien" },
              "publisher": {
                "@type": "Organization",
                "name": "Hub AI",
                "url": "https://sebastien-ia.com"
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

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href={`/${params.locale}`} className="hover:text-purple-400">Hub AI</Link>
          {' / '}
          <Link href={`/${params.locale}/blog`} className="hover:text-purple-400">Blog</Link>
          {' / '}
          <span className="text-gray-400">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">
              {post.geo?.city}, {post.geo?.country}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime} min</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{post.title}</h1>
          <p className="text-gray-400 text-lg">{post.excerpt}</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Contenu */}
        <article className="prose prose-invert prose-purple max-w-none mb-16">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Articles similaires */}
        {related.length > 0 && (
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/${params.locale}/blog/${r.slug}`}
                  className="bg-[#0D0D1F] rounded-xl p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all"
                >
                  <h3 className="text-white font-bold mb-2 line-clamp-2">{r.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
