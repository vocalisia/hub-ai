import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getMessages } from 'next-intl/server'
// Above-fold: keep static imports for fastest first paint
import SwarmHero from '@/components/AlumicaHero'
import ModelsExplainer from '@/components/ModelsExplainer'
import SwarmPress from '@/components/SwarmPress'
import ClientErrorBoundary from '@/components/ClientErrorBoundary'

// Below-fold: dynamic imports — code-split client bundle, keep SSR for SEO
// Placeholders sized roughly to prevent CLS while chunks load
const SwarmBento = dynamic(() => import('@/components/SwarmBento'), {
  loading: () => <div className="min-h-[600px]" aria-hidden />,
})
const SwarmResults = dynamic(() => import('@/components/SwarmResults'), {
  loading: () => <div className="min-h-[500px]" aria-hidden />,
})
const SwarmShowcase = dynamic(() => import('@/components/SwarmShowcase'), {
  loading: () => <div className="min-h-[600px]" aria-hidden />,
})
const SwarmWorkflow = dynamic(() => import('@/components/SwarmWorkflow'), {
  loading: () => <div className="min-h-[700px]" aria-hidden />,
})
const SwarmTestimonials = dynamic(() => import('@/components/SwarmTestimonials'), {
  loading: () => <div className="min-h-[500px]" aria-hidden />,
})
const SwarmCTA = dynamic(() => import('@/components/SwarmCTA'), {
  loading: () => <div className="min-h-[300px]" aria-hidden />,
})

// Per-page metadata override — allows page-specific title/description per locale
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await getMessages()
  const seo = (messages as any).seo

  // Perf 2026-05-29: no trailing slash — matches actual served URL (sitemap.ts already correct)
  const canonicalUrl = locale === 'en'
    ? 'https://ai-due.com'
    : `https://ai-due.com/${locale}`

  return {
    title: seo.home_title,
    description: seo.home_description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': 'https://ai-due.com/fr',
        'en': 'https://ai-due.com',
        'de': 'https://ai-due.com/de',
        'it': 'https://ai-due.com/it',
        'x-default': 'https://ai-due.com'
      }
    },
  }
}

// EN FAQ — generic product questions
const FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI-Due?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due is a public opinion simulation engine powered by AI Swarm technology. It lets strategy teams upload any document and run synchronized simulations across social media and prediction markets in under 5 minutes, using a digital twin of public opinion."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI opinion simulation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due deploys 250 AI agents with distinct personas, running 12 simulation rounds across 3 platforms simultaneously. Each agent reacts to your scenario based on demographic, psychographic and behavioral profiles, producing a ReACT report with cited agent statements and a synthetic prediction market outcome."
      }
    },
    {
      "@type": "Question",
      "name": "What decisions can I stress-test with AI-Due?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due is used for product launch impact analysis, financial announcement sentiment testing, regulatory proposal modeling, crisis communications strategy, and multi-channel campaign optimization. It achieves 86% accuracy vs human analyst panels."
      }
    }
  ]
}

// FR FAQ — optimised for keyword "agent ia autonome" (vol 520, pos 4 → target top 3)
const FAQ_SCHEMA_FR = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'un agent IA autonome ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un agent IA autonome est un programme d'intelligence artificielle capable de percevoir son environnement, de prendre des décisions et d'exécuter des tâches sans intervention humaine constante. Contrairement à un chatbot classique, un agent IA autonome planifie des séquences d'actions, utilise des outils externes (API, bases de données, navigateur web) et s'adapte aux résultats en temps réel pour atteindre un objectif défini."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne AI-Due ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due est une plateforme de simulation d'opinion publique alimentée par des essaims d'agents IA autonomes. Téléchargez un document, définissez un scénario, et AI-Due déploie 250 agents IA aux profils distincts pour simuler les réactions du marché sur les réseaux sociaux et les marchés de prédiction en moins de 5 minutes. Le rapport ReACT fournit des citations d'agents et une prévision synthétique."
      }
    },
    {
      "@type": "Question",
      "name": "Quels cas d'usage couvre un agent IA autonome avec AI-Due ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due couvre l'analyse d'impact de lancement produit, le test de sentiment d'annonces financières, la modélisation de propositions réglementaires, la stratégie de communication de crise et l'optimisation de campagnes multi-canaux. La plateforme atteint 86% de précision comparé aux panels d'analystes humains."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre AI-Due et un chatbot IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un chatbot IA répond à des questions dans une conversation unique. AI-Due orchestre un essaim d'agents IA autonomes qui travaillent en parallèle, chacun avec une personnalité et un rôle définis, pour simuler des dynamiques collectives complexes impossibles à reproduire avec un seul modèle de langage."
      }
    },
    {
      "@type": "Question",
      "name": "AI-Due est-il disponible en Suisse et en Europe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. AI-Due est la plateforme de référence en matière d'agent IA autonome pour les entreprises en Suisse, France, Belgique, Canada et aux États-Unis. L'interface est disponible en français, anglais, allemand et italien. Les données restent hébergées en Europe (RGPD)."
      }
    }
  ]
}

// Service JSON-LD for FR — no price, audit gratuit CTA
const SERVICE_SCHEMA_FR = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ai-due.com/fr#service",
  "name": "Agent IA Autonome — Plateforme AI-Due",
  "serviceType": "Intelligence Artificielle & Automatisation",
  "description": "AI-Due déploie des agents IA autonomes pour automatiser vos processus métier, simuler l'opinion publique et accélérer la prise de décision. Disponible en Suisse, France, Belgique, Canada et USA.",
  "url": "https://ai-due.com/fr",
  "areaServed": [
    { "@type": "Country", "name": "Switzerland" },
    { "@type": "Country", "name": "France" },
    { "@type": "Country", "name": "Belgium" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ],
  "inLanguage": "fr",
  "offers": {
    "@type": "Offer",
    "url": "https://ai-due.com/fr/contact"
  },
  "provider": {
    "@type": "Organization",
    "@id": "https://ai-due.com/#organization"
  }
}

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://ai-due.com/#software",
  "name": "AI-Due Simulation Engine",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://ai-due.com",
  "description": "AI Swarm public opinion simulation engine — stress-test decisions before they happen with 250 AI agents and synthetic prediction markets.",
  "offers": {
    "@type": "Offer"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://ai-due.com/#organization"
  }
}

export default function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const isFr = locale === 'fr'
  const schemas = isFr
    ? [FAQ_SCHEMA_FR, SERVICE_SCHEMA_FR, SOFTWARE_SCHEMA]
    : [FAQ_SCHEMA_EN, SOFTWARE_SCHEMA]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <main className="min-h-screen bg-black">
        <ClientErrorBoundary name="home-hero">
          <SwarmHero />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="models-explainer">
          <ModelsExplainer />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="press">
          <SwarmPress />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="bento">
          <SwarmBento />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="results">
          <SwarmResults />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="showcase">
          <SwarmShowcase />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="workflow">
          <SwarmWorkflow />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="testimonials">
          <SwarmTestimonials />
        </ClientErrorBoundary>
        <ClientErrorBoundary name="cta">
          <SwarmCTA />
        </ClientErrorBoundary>
      </main>
    </>
  )
}
