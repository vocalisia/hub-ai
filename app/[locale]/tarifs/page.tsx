import type { Metadata } from 'next'
import TarifsClient from './TarifsClient'

const TARIFS_SEO: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Pricing | AI-Due Public Opinion Simulation Plans',
    description: 'Choose your AI-Due plan: Starter, Pro or Enterprise. Run AI public opinion simulations, stress-test strategic decisions, scale across teams. Transparent pricing in EUR and USD.',
  },
  fr: {
    title: 'Tarifs | Plans AI-Due Simulation d’Opinion Publique',
    description: 'Choisissez votre formule AI-Due : Starter, Pro ou Enterprise. Lancez des simulations IA d’opinion publique, stress-testez vos décisions stratégiques, échelonnez sur vos équipes. Tarifs transparents en EUR et USD.',
  },
  de: {
    title: 'Preise | AI-Due Pläne für Meinungssimulation',
    description: 'Wählen Sie Ihr AI-Due-Paket: Starter, Pro oder Enterprise. KI-Simulationen der öffentlichen Meinung, Stresstest strategischer Entscheidungen, Team-Skalierung. Transparente Preise in EUR und USD.',
  },
  it: {
    title: 'Prezzi | Piani AI-Due Simulazione Opinione Pubblica',
    description: 'Scegli il tuo piano AI-Due: Starter, Pro o Enterprise. Simulazioni IA dell’opinione pubblica, stress-test di decisioni strategiche, scalabilità sui team. Prezzi trasparenti in EUR e USD.',
  },
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = TARIFS_SEO[locale] ?? TARIFS_SEO.en
  const url = `https://ai-due.com/${locale}/tarifs`

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://ai-due.com/en/tarifs',
        fr: 'https://ai-due.com/fr/tarifs',
        de: 'https://ai-due.com/de/tarifs',
        it: 'https://ai-due.com/it/tarifs',
        'x-default': 'https://ai-due.com/en/tarifs',
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

export default function TarifsPage() {
  return <TarifsClient />
}
