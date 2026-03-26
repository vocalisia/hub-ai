import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'AI Tools — Outils IA Interactifs & Recommandes | AI-DUE',
    description: 'Calculateur ROI, generateur de prompts, score de maturite IA et selection d\'outils IA verifies par AI-DUE.',
    alternates: {
      canonical: `https://ai-due.com/${locale}/tools`,
      languages: {
        'fr': 'https://ai-due.com/fr/tools',
        'en': 'https://ai-due.com/en/tools',
        'de': 'https://ai-due.com/de/tools',
        'it': 'https://ai-due.com/it/tools'
      }
    },
    openGraph: {
      title: 'AI Tools — Outils IA Interactifs & Recommandes | AI-DUE',
      description: 'Calculateur ROI, generateur de prompts, score de maturite IA et outils recommandes.',
      url: `https://ai-due.com/${locale}/tools`,
      siteName: 'AI-DUE',
      locale: locale,
      type: 'website'
    }
  }
}

const INTERACTIVE_TOOLS = [
  {
    name: 'Calculateur ROI',
    description: 'Estimez les economies et le retour sur investissement de l\'IA dans votre entreprise. Simulez en temps reel.',
    href: '/tools/roi',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-purple-600 to-purple-400',
    border: 'hover:border-purple-500/40',
    glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]',
  },
  {
    name: 'Generateur de Prompts',
    description: 'Creez des prompts IA structures et optimises pour vos besoins : emails, articles, code et plus.',
    href: '/tools/prompt',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-blue-500',
    border: 'hover:border-cyan-500/40',
    glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]',
  },
  {
    name: 'Score Maturite IA',
    description: 'Evaluez la maturite IA de votre entreprise en 6 criteres et recevez des recommandations personnalisees.',
    href: '/tools/maturite',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-gold-accent to-amber-500',
    border: 'hover:border-amber-500/40',
    glow: 'group-hover:shadow-[0_0_40px_rgba(255,215,0,0.12)]',
  },
]

const EXTERNAL_TOOLS = [
  {
    name: 'Vocalis AI',
    description: 'Assistant vocal IA professionnel. Automatisez vos appels, qualifiez vos leads et gerez votre accueil telephonique 24/7.',
    url: 'https://vocalis.pro',
    category: 'Voice AI',
    icon: '\u{1F399}',
    tags: ['Voice', 'SaaS', 'Automation']
  },
  {
    name: 'Claude (Anthropic)',
    description: 'LLM de pointe pour le raisonnement, l\'analyse et la generation de contenu. Architecture Transformer avancee.',
    url: 'https://claude.ai',
    category: 'LLM',
    icon: '\u{1F9E0}',
    tags: ['LLM', 'Reasoning', 'Code']
  },
  {
    name: 'Cursor',
    description: 'IDE augmente par l\'IA. Editeur de code intelligent avec completion, refactoring et generation contextuelle.',
    url: 'https://cursor.sh',
    category: 'Development',
    icon: '\u{1F4BB}',
    tags: ['IDE', 'Code', 'Productivity']
  },
  {
    name: 'Vercel',
    description: 'Plateforme de deploiement frontend. Deployez vos applications Next.js en quelques secondes avec edge functions.',
    url: 'https://vercel.com',
    category: 'Infrastructure',
    icon: '\u25B2',
    tags: ['Hosting', 'Edge', 'Next.js']
  },
  {
    name: 'Resend',
    description: 'API email moderne pour developpeurs. Envoi transactionnel fiable avec React Email et analytics.',
    url: 'https://resend.com',
    category: 'Email',
    icon: '\u{1F4E7}',
    tags: ['Email', 'API', 'Transactional']
  },
  {
    name: 'Supabase',
    description: 'Alternative open-source a Firebase. Base de donnees PostgreSQL, auth, storage et realtime integres.',
    url: 'https://supabase.com',
    category: 'Database',
    icon: '\u{1F5C4}',
    tags: ['Database', 'Auth', 'Realtime']
  },
  {
    name: 'n8n',
    description: 'Plateforme d\'automatisation open-source. Connectez vos outils et creez des workflows complexes sans code.',
    url: 'https://n8n.io',
    category: 'Automation',
    icon: '\u{1F504}',
    tags: ['Automation', 'Workflow', 'No-code']
  },
  {
    name: 'Apify',
    description: 'Plateforme de web scraping et data extraction. Actors prets a l\'emploi pour collecter des donnees a grande echelle.',
    url: 'https://apify.com',
    category: 'Data',
    icon: '\u{1F577}',
    tags: ['Scraping', 'Data', 'Automation']
  },
]

export default async function ToolsPage({
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

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5">
              Outils Interactifs & Stack IA
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Nos{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Outils</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {locale === 'en' ? 'Interactive AI tools and curated stack to accelerate your digital transformation.' :
               locale === 'de' ? 'Interaktive KI-Tools und kuratierter Stack fur Ihre digitale Transformation.' :
               locale === 'it' ? 'Strumenti IA interattivi e stack curato per la vostra trasformazione digitale.' :
               'Outils IA interactifs et stack selectionne pour accelerer votre transformation digitale.'}
            </p>
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          {/* Interactive Tools Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-gold-accent flex items-center justify-center text-white text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Outils Interactifs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INTERACTIVE_TOOLS.map((tool) => (
                <Link
                  key={tool.name}
                  href={`/${locale}${tool.href}`}
                  className={`group relative bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 ${tool.border} ${tool.glow} hover:-translate-y-1`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    {tool.icon}
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">{tool.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.description}</p>

                  <span className="inline-flex items-center gap-1.5 text-purple-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                    Essayer
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Schema.org */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "AI Tools — AI-DUE",
                "url": `https://ai-due.com/${locale}/tools`,
                "numberOfItems": EXTERNAL_TOOLS.length + INTERACTIVE_TOOLS.length,
                "itemListElement": [
                  ...INTERACTIVE_TOOLS.map((tool, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "item": {
                      "@type": "WebApplication",
                      "name": tool.name,
                      "description": tool.description,
                      "url": `https://ai-due.com/${locale}${tool.href}`
                    }
                  })),
                  ...EXTERNAL_TOOLS.map((tool, i) => ({
                    "@type": "ListItem",
                    "position": INTERACTIVE_TOOLS.length + i + 1,
                    "item": {
                      "@type": "SoftwareApplication",
                      "name": tool.name,
                      "description": tool.description,
                      "url": tool.url,
                      "applicationCategory": tool.category
                    }
                  }))
                ]
              })
            }}
          />

          {/* External Tools Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center text-white text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              Stack IA Recommande
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {EXTERNAL_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-purple-300 transition-colors">{tool.name}</h3>
                      <span className="text-purple-400/60 text-xs font-medium">{tool.category}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="inline-block bg-[#0a0a1f]/60 rounded-2xl border border-white/[0.06] px-8 py-6">
              <p className="text-gray-400 text-sm mb-1">
                {locale === 'en' ? 'Need help choosing the right AI tools for your project?' :
                 'Besoin d\'aide pour choisir les bons outils IA pour votre projet ?'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors inline-flex items-center gap-1.5"
              >
                {locale === 'en' ? 'Talk to our team' : 'Contactez notre equipe'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
