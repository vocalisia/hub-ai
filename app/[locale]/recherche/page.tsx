import type { Metadata } from 'next'
import RechercheClient from './RechercheClient'

const SEO: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Simulateur Recherche Marché IA | Testez votre produit sur des acheteurs français | AI-Due',
    description: 'Simulez les réactions de 10 à 15 acheteurs français IA en quelques minutes. Remplacez les études à 50 000 € par une simulation précise basée sur les données INSEE. Alternative française à Aaru.',
  },
  en: {
    title: 'AI Market Research Simulator | Test on French buyers | AI-Due',
    description: 'Simulate reactions from 10-15 AI French buyers in minutes. Replace €50,000 studies with precise AI simulation based on INSEE data. French alternative to Aaru.',
  },
  de: {
    title: 'KI-Marktforschungs-Simulator | Auf französischen Käufern testen | AI-Due',
    description: 'Simulieren Sie die Reaktionen von 10-15 KI-französischen Käufern in Minuten. Ersetzen Sie 50.000 € Studien durch präzise KI-Simulation basierend auf INSEE-Daten.',
  },
  it: {
    title: 'Simulatore di Ricerca di Mercato IA | Testa su acquirenti francesi | AI-Due',
    description: 'Simula le reazioni di 10-15 acquirenti francesi IA in pochi minuti. Sostituisci studi da 50.000 € con simulazioni IA precise basate sui dati INSEE.',
  },
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = SEO[locale] ?? SEO.fr
  const url = `https://ai-due.com/${locale}/recherche`

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        fr: 'https://ai-due.com/fr/recherche',
        en: 'https://ai-due.com/en/recherche',
        de: 'https://ai-due.com/de/recherche',
        it: 'https://ai-due.com/it/recherche',
        'x-default': 'https://ai-due.com/fr/recherche',
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

export default function RecherchePage() {
  return <RechercheClient />
}
