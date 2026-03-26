import EbookCard from '@/components/EbookCard'
import type { EbookData } from '@/components/EbookCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'eBooks IA — Guides Experts Architecture & Intelligence Artificielle | AI-DUE',
    description: 'Telechargez nos eBooks gratuits sur l\'architecture IA, l\'IA generative et l\'intelligence artificielle. Guides complets avec cas pratiques, design patterns et deploiement.',
    alternates: {
      canonical: `https://ai-due.com/${locale}/ebooks`,
      languages: {
        'fr': 'https://ai-due.com/fr/ebooks',
        'en': 'https://ai-due.com/en/ebooks',
        'de': 'https://ai-due.com/de/ebooks',
        'it': 'https://ai-due.com/it/ebooks'
      }
    },
    openGraph: {
      title: 'eBooks IA — Guides Experts | AI-DUE',
      description: 'Guides complets sur l\'architecture IA, l\'IA generative et l\'intelligence artificielle. Telechargement gratuit.',
      url: `https://ai-due.com/${locale}/ebooks`,
      siteName: 'AI-DUE',
      locale: locale,
      type: 'website'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    }
  }
}

const EBOOKS: EbookData[] = [
  {
    id: 'architecture-ia',
    title: 'Architecture IA — Le Guide Definitif',
    subtitle: 'Concevoir des systemes IA robustes et scalables',
    description: 'Le guide complet pour architecturer des systemes d\'intelligence artificielle en production. Design patterns, microservices IA, pipelines MLOps, strategies de deploiement, scaling horizontal et monitoring avance. De la conception au deploiement, chaque etape est detaillee avec des cas concrets.',
    chapters: [
      'Introduction a l\'architecture IA moderne',
      'Design Patterns pour systemes intelligents',
      'Microservices IA : decomposition et orchestration',
      'Pipelines de donnees et feature stores',
      'MLOps : CI/CD pour le Machine Learning',
      'Strategies de deploiement (Blue/Green, Canary, Shadow)',
      'Scaling horizontal des modeles IA',
      'Monitoring et observabilite des systemes IA',
      'Securite et gouvernance des donnees',
      'Architecture event-driven pour l\'IA temps reel',
      'Cas pratiques : architectures de reference',
      'Roadmap et tendances futures'
    ],
    chapterCount: 12,
    pageCount: 180,
    tags: ['Architecture', 'MLOps', 'Design Patterns', 'Microservices', 'Scaling'],
    crossLinks: [
      { label: 'agents-ia.pro', url: 'https://agents-ia.pro' },
      { label: 'vocalis.pro', url: 'https://vocalis.pro' },
      { label: 'iapmesuisse.ch', url: 'https://iapmesuisse.ch' }
    ],
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #4c1d95 100%)',
    icon: '\u{1F3D7}'
  },
  {
    id: 'ia-generative',
    title: 'IA Generative — De GPT a la Production',
    subtitle: 'Maitriser les modeles generatifs et les deployer',
    description: 'Plongez dans l\'univers de l\'IA generative : des fondations theoriques des Transformers aux applications en production. LLM, modeles de diffusion, fine-tuning, RAG (Retrieval-Augmented Generation), prompt engineering avance. Chaque concept est illustre par des implementations concretes.',
    chapters: [
      'Fondations : attention, Transformers et au-dela',
      'Large Language Models (LLM) : fonctionnement interne',
      'Modeles de diffusion : images, audio, video',
      'Fine-tuning et adaptation de domaine',
      'RAG : Retrieval-Augmented Generation',
      'Prompt Engineering avance et chain-of-thought',
      'Agents IA autonomes et orchestration',
      'Evaluation et benchmarks des modeles generatifs',
      'Deploiement et optimisation (quantization, distillation)',
      'Ethique, biais et usage responsable de l\'IA generative'
    ],
    chapterCount: 10,
    pageCount: 150,
    tags: ['LLM', 'Transformers', 'RAG', 'Fine-tuning', 'Prompt Engineering'],
    crossLinks: [
      { label: 'vocalis.blog', url: 'https://vocalis.blog' },
      { label: 'agents-ia.pro', url: 'https://agents-ia.pro' },
      { label: 'seo-true.com', url: 'https://seo-true.com' }
    ],
    gradient: 'linear-gradient(135deg, #0c1a2e 0%, #1e3a5f 40%, #1d4ed8 100%)',
    icon: '\u{1F9E0}'
  },
  {
    id: 'ia-generale',
    title: 'IA Generale — Comprendre et Deployer l\'Intelligence Artificielle',
    subtitle: 'Des fondamentaux au deploiement en entreprise',
    description: 'Un guide accessible et complet pour comprendre l\'intelligence artificielle dans sa globalite. Machine Learning, Deep Learning, NLP, Computer Vision, ethique et regulation. Ideal pour les decideurs, chefs de projet et developpeurs souhaitant integrer l\'IA dans leur organisation.',
    chapters: [
      'Introduction a l\'Intelligence Artificielle',
      'Machine Learning : algorithmes et paradigmes',
      'Deep Learning : reseaux de neurones profonds',
      'Traitement du Langage Naturel (NLP)',
      'Computer Vision : voir et comprendre',
      'IA en entreprise : strategies d\'adoption',
      'Ethique, biais et IA responsable',
      'Regulation et conformite (AI Act, RGPD)'
    ],
    chapterCount: 8,
    pageCount: 120,
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Ethique'],
    crossLinks: [
      { label: 'trustly-ai.com', url: 'https://trustly-ai.com' },
      { label: 'master-seller.fr', url: 'https://master-seller.fr' },
      { label: 'iapmesuisse.ch', url: 'https://iapmesuisse.ch' }
    ],
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #3b1a5c 40%, #7c3aed 100%)',
    icon: '\u{1F4DA}'
  }
]

export default async function EbooksPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const totalPages = EBOOKS.reduce((sum, e) => sum + e.pageCount, 0)
  const totalChapters = EBOOKS.reduce((sum, e) => sum + e.chapterCount, 0)

  return (
    <main className="min-h-screen bg-[#030014] relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FFD700]/[0.03] rounded-full blur-[200px]" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#DAA520]/[0.04] rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#FFD700] text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5">
              Bibliotheque IA
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Nos{' '}
              <span className="gradient-text-gold">eBooks</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Guides experts et complets sur l&apos;architecture IA, l&apos;IA generative et l&apos;intelligence artificielle. Telechargement gratuit.
            </p>

            {/* Decorative line */}
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{EBOOKS.length}</p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">eBooks</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">{totalChapters}</p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Chapitres</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">{totalPages}</p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Pages</p>
            </div>
          </div>

          {/* Schema.org */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "eBooks IA — AI-DUE",
                "url": `https://ai-due.com/${locale}/ebooks`,
                "description": "Collection de eBooks experts sur l'architecture IA, l'IA generative et l'intelligence artificielle.",
                "hasPart": EBOOKS.map(ebook => ({
                  "@type": "Book",
                  "name": ebook.title,
                  "description": ebook.description,
                  "numberOfPages": ebook.pageCount,
                  "author": {
                    "@type": "Organization",
                    "name": "AI-DUE"
                  },
                  "inLanguage": "fr",
                  "isAccessibleForFree": true
                }))
              })
            }}
          />

          {/* eBooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {EBOOKS.map((ebook, index) => (
              <EbookCard key={ebook.id} ebook={ebook} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-block bg-[#0a0a1f]/60 rounded-2xl border border-white/[0.06] px-4 py-5 sm:px-8 sm:py-6 max-w-full">
              <p className="text-gray-400 text-sm mb-1">Vous souhaitez un eBook personnalise pour votre entreprise ?</p>
              <a
                href={`/${locale}/contact`}
                className="text-[#FFD700] hover:text-[#FFD700]/80 font-semibold text-sm transition-colors inline-flex items-center gap-1.5"
              >
                Contactez-nous
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
