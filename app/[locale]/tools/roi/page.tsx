import type { Metadata } from 'next'
import Link from 'next/link'
import ROICalculator from '@/components/tools/ROICalculator'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Calculateur ROI IA — Estimez vos economies | AI-DUE',
    description: 'Calculez le retour sur investissement de l\'intelligence artificielle dans votre entreprise. Simulateur interactif avec economies, ROI et delai de rentabilite.',
    alternates: {
      canonical: `https://ai-due.com/${locale}/tools/roi`,
      languages: {
        'fr': 'https://ai-due.com/fr/tools/roi',
        'en': 'https://ai-due.com/en/tools/roi',
        'de': 'https://ai-due.com/de/tools/roi',
        'it': 'https://ai-due.com/it/tools/roi'
      }
    },
    openGraph: {
      title: 'Calculateur ROI IA — Estimez vos economies | AI-DUE',
      description: 'Simulateur interactif : calculez le ROI de l\'IA dans votre entreprise.',
      url: `https://ai-due.com/${locale}/tools/roi`,
      siteName: 'AI-DUE',
      locale: locale,
      type: 'website'
    }
  }
}

export default async function ROIPage({
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
            "name": "Calculateur ROI IA",
            "description": "Calculez le retour sur investissement de l'intelligence artificielle dans votre entreprise.",
            "url": `https://ai-due.com/${locale}/tools/roi`,
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
              <li className="text-purple-400">Calculateur ROI</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-purple-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
              Outil Interactif
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Calculateur{' '}
              <span className="bg-gradient-to-r from-purple-400 to-gold-accent bg-clip-text text-transparent">ROI IA</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Estimez en temps reel les economies et le retour sur investissement que l'intelligence artificielle peut apporter a votre entreprise.
            </p>
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          <ROICalculator />
        </div>
      </div>
    </main>
  )
}
