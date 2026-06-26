import type { Metadata } from 'next'
import Link from 'next/link'
import AIMaturityScore from '@/components/tools/AIMaturityScore'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const canonicalUrl = 'https://ai-due.com/fr/tools/maturite'

  return {
    title: 'Score de Maturité IA — Évaluez votre entreprise | AI-DUE',
    description: 'Évaluez la maturité IA de votre entreprise en 6 critères clés. Recevez un score sur 100 et des recommandations personnalisées.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': canonicalUrl,
        'x-default': canonicalUrl
      }
    },
    openGraph: {
      title: 'Score de Maturité IA — Évaluez votre entreprise | AI-DUE',
      description: 'Évaluez votre maturité IA en 6 critères. Score sur 100 + recommandations.',
      url: canonicalUrl,
      siteName: 'AI-DUE',
      locale: locale,
      type: 'website'
    }
  }
}

export default async function MaturitePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <main className="min-h-screen bg-[#030014] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-900/8 rounded-full blur-[180px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Score de Maturité IA",
            "description": "Évaluez la maturité IA de votre entreprise en 6 critères clés.",
            "url": "https://ai-due.com/fr/tools/maturite",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "AI-DUE",
              "url": "https://ai-due.com"
            }
          })
        }}
      />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href={`/${locale}/tools`} className="hover:text-purple-400 transition-colors">Outils</Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gold-accent">Score Maturité IA</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-gold-accent text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-gold-accent/20 bg-gold-accent/5">
              Outil Interactif
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Score de{' '}
              <span className="bg-gradient-to-r from-gold-accent to-amber-400 bg-clip-text text-transparent">Maturité IA</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Évaluez la maturité IA de votre entreprise sur 6 critères stratégiques. Obtenez votre score et des recommandations adaptées à votre niveau.
            </p>
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent" />
          </div>

          <AIMaturityScore />
        </div>
      </div>
    </main>
  )
}
