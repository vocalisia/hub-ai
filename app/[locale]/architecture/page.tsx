import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
// Above-fold static imports
import HeroSection from '@/components/HeroSection'
import ArchitectureSchema from '@/components/ArchitectureSchema'

// Below-fold: dynamic — code-split, keep SSR for SEO content
const NeuralFeatures = dynamic(() => import('@/components/NeuralFeatures'), {
  loading: () => <div className="min-h-[600px]" aria-hidden />,
})
const NetworkGraph = dynamic(() => import('@/components/NetworkGraph'), {
  loading: () => <div className="min-h-[700px]" aria-hidden />,
})
const GeoSection = dynamic(() => import('@/components/GeoSection'), {
  loading: () => <div className="min-h-[500px]" aria-hidden />,
})
const BlogPreview = dynamic(() => import('@/components/BlogPreview'), {
  loading: () => <div className="min-h-[400px]" aria-hidden />,
})

const ARCHITECTURE_SEO: Record<string, { title: string; description: string }> = {
  en: {
    title: 'AI Architecture & Intelligent Systems Ecosystem | AI-Due',
    description: 'Explore the AI-Due ecosystem: agent architecture, neural systems, multimodal pipelines and decision intelligence across Europe, Switzerland, Canada and the USA.',
  },
  fr: {
    title: 'Architecture IA & Écosystème de Systèmes Intelligents | AI-Due',
    description: "Découvrez l'écosystème AI-Due : architecture d'agents IA, systèmes neuronaux, pipelines multimodaux et intelligence décisionnelle pour l'Europe, la Suisse, le Canada et les USA.",
  },
  de: {
    title: 'KI-Architektur & Intelligente Systeme | AI-Due',
    description: 'Entdecken Sie das AI-Due-Ökosystem: KI-Agenten-Architektur, neuronale Systeme, multimodale Pipelines und Decision Intelligence für Europa, Schweiz, Kanada und USA.',
  },
  it: {
    title: 'Architettura IA & Sistemi Intelligenti | AI-Due',
    description: "Scopri l'ecosistema AI-Due: architettura di agenti IA, sistemi neurali, pipeline multimodali e decision intelligence per Europa, Svizzera, Canada e USA.",
  },
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = ARCHITECTURE_SEO[locale] ?? ARCHITECTURE_SEO.en
  const url = `https://ai-due.com/${locale}/architecture`

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://ai-due.com/en/architecture',
        fr: 'https://ai-due.com/fr/architecture',
        de: 'https://ai-due.com/de/architecture',
        it: 'https://ai-due.com/it/architecture',
        'x-default': 'https://ai-due.com/en/architecture',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: 'AI-Due',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  }
}

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#030014]">
      <HeroSection />
      <ArchitectureSchema />
      <NeuralFeatures />
      <NetworkGraph />
      <GeoSection />
      <BlogPreview />
    </main>
  )
}
