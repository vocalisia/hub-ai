import type { Metadata } from 'next'
import SimulateurClient from './SimulateurClient'

const SIMULATEUR_SEO: Record<string, { title: string; description: string }> = {
  en: {
    title: 'AI Public Opinion Simulator | Stress-test Decisions | AI-Due',
    description: 'Upload any document and run synchronized AI simulations across social media and prediction markets. Stress-test scenarios with a digital twin of public opinion in minutes.',
  },
  fr: {
    title: 'Simulateur IA d’Opinion Publique | Stress-test de Décisions | AI-Due',
    description: 'Téléchargez un document et lancez des simulations IA synchronisées sur les réseaux sociaux et marchés de prédiction. Testez vos scénarios avec un jumeau numérique de l’opinion publique en quelques minutes.',
  },
  de: {
    title: 'KI-Simulator für öffentliche Meinung | Entscheidungs-Stresstest | AI-Due',
    description: 'Laden Sie ein Dokument hoch und führen Sie synchronisierte KI-Simulationen über Social Media und Prognosemärkte durch. Testen Sie Szenarien mit einem digitalen Zwilling der öffentlichen Meinung in Minuten.',
  },
  it: {
    title: 'Simulatore IA dell’Opinione Pubblica | Stress-test Decisioni | AI-Due',
    description: 'Carica un documento e avvia simulazioni IA sincronizzate su social media e mercati di previsione. Testa scenari con un gemello digitale dell’opinione pubblica in pochi minuti.',
  },
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = SIMULATEUR_SEO[locale] ?? SIMULATEUR_SEO.en
  const url = `https://ai-due.com/${locale}/simulateur`

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://ai-due.com/en/simulateur',
        fr: 'https://ai-due.com/fr/simulateur',
        de: 'https://ai-due.com/de/simulateur',
        it: 'https://ai-due.com/it/simulateur',
        'x-default': 'https://ai-due.com/en/simulateur',
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

export default function SimulateurPage() {
  return <SimulateurClient />
}
