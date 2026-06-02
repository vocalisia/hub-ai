// src/app/news/[slug]/page.tsx — Single news article. Inherits header/footer + theme colors from layout.tsx.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { newsArticles, getNewsBySlug } from '@/data/news'

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const a = getNewsBySlug(slug)
  if (!a) return { title: 'Article introuvable' }
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, type: 'article', publishedTime: a.date },
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const a = getNewsBySlug(slug)
  if (!a) notFound()

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px', color: 'inherit' }}>
      <style>{`
        .news-article-body { font-size: 17px; line-height: 1.75; }
        .news-article-body h2 { font-size: 26px; font-weight: 700; margin: 32px 0 12px; line-height: 1.25; }
        .news-article-body h3 { font-size: 20px; font-weight: 700; margin: 24px 0 10px; }
        .news-article-body p { margin: 0 0 16px; }
        .news-article-body ul, .news-article-body ol { margin: 0 0 16px; padding-left: 24px; }
        .news-article-body li { margin: 4px 0; }
        .news-article-body a { color: #1a73e8; text-decoration: underline; }
        .news-article-body code { background: rgba(127,127,127,0.18); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .news-article-body pre { background: rgba(127,127,127,0.15); padding: 14px; border-radius: 8px; overflow-x: auto; }
        .news-article-body table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        .news-article-body th, .news-article-body td { border: 1px solid rgba(127,127,127,0.35); padding: 8px 12px; text-align: left; }
        .news-article-body img { max-width: 100%; height: auto; border-radius: 8px; }
        .news-article-body blockquote { border-left: 4px solid rgba(127,127,127,0.4); padding-left: 16px; margin: 16px 0; opacity: 0.85; }
      `}</style>

      <nav style={{ marginBottom: 24, fontSize: 13 }}>
        <Link href="/news" style={{ color: '#1a73e8' }}>&larr; Toutes les news</Link>
      </nav>

      <article>
        <time style={{ fontSize: 13, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1 }}>
          {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, margin: '10px 0 24px', color: 'inherit' }}>{a.title}</h1>

        <div
          className="news-article-body"
          style={{ color: 'inherit' }}
          dangerouslySetInnerHTML={{ __html: a.html }}
        />
      </article>

      <hr style={{ margin: '40px 0', border: 0, borderTop: '1px solid rgba(127,127,127,0.3)' }} />
      <Link href="/news" style={{ color: '#1a73e8', fontSize: 14 }}>&larr; Retour aux news</Link>
    </main>
  )
}
