import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'AI Tools — Outils IA Recommandes | AI-DUE',
    description: 'Selection d\'outils IA verifies et recommandes par AI-DUE. Architecture, automatisation, voix, analyse et deploiement.',
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
      title: 'AI Tools — Outils IA Recommandes | AI-DUE',
      description: 'Selection d\'outils IA verifies et recommandes par AI-DUE.',
      url: `https://ai-due.com/${locale}/tools`,
      siteName: 'AI-DUE',
      locale: locale,
      type: 'website'
    }
  }
}

const TOOLS = [
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
              Stack IA
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Nos{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Outils</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {locale === 'en' ? 'Curated AI tools we use and recommend for building intelligent systems.' :
               locale === 'de' ? 'Kuratierte KI-Tools, die wir verwenden und empfehlen.' :
               locale === 'it' ? 'Strumenti IA selezionati che usiamo e raccomandiamo.' :
               'Selection d\'outils IA que nous utilisons et recommandons pour construire des systemes intelligents.'}
            </p>
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
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
                "numberOfItems": TOOLS.length,
                "itemListElement": TOOLS.map((tool, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": tool.name,
                    "description": tool.description,
                    "url": tool.url,
                    "applicationCategory": tool.category
                  }
                }))
              })
            }}
          />

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TOOLS.map((tool) => (
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
