// src/app/news/page.tsx — News index. Inherits site header/footer from layout.tsx.
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLatestNews } from '@/data/news'

export const metadata: Metadata = {
  title: 'News & Actualités',
  description: 'Dernières analyses, guides et actualités.',
}

export const dynamic = 'force-static'

export default function NewsIndexPage() {
  const items = getLatestNews(100)

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px', color: 'inherit' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'inherit' }}>News &amp; Actualités</h1>
      <p style={{ opacity: 0.7, marginBottom: 32 }}>
        Analyses, guides pratiques et dernières actualités du secteur.
      </p>

      {items.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucun article pour le moment. Revenez bientôt.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((a) => (
            <li key={a.slug} style={{ borderBottom: '1px solid rgba(127,127,127,0.25)', padding: '18px 0' }}>
              <Link href={`/news/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article>
                  <time style={{ fontSize: 12, opacity: 0.55, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h2 style={{ fontSize: 21, fontWeight: 700, margin: '6px 0', color: 'inherit' }}>{a.title}</h2>
                  <p style={{ opacity: 0.75, margin: 0 }}>{a.excerpt}</p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
