import CareersPage from '@/components/CareersPage'
import type { Metadata } from 'next'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const canonicalUrl = `https://ai-due.com/${locale}/careers`

  return {
    title: 'Careers · AI-DUE — Join our global sales team',
    description:
      'AI-DUE recruits Sales Development Reps, Setters, Account Executives and Enterprise Closers. Remote sales roles for the AI market.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://ai-due.com/en/careers',
        fr: 'https://ai-due.com/fr/careers',
        de: 'https://ai-due.com/de/careers',
        it: 'https://ai-due.com/it/careers',
        'x-default': 'https://ai-due.com/fr/careers',
      },
    },
    openGraph: {
      url: canonicalUrl,
    },
  }
}

export default function Page() {
  return <CareersPage />
}
