import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await getMessages()
  const seo = (messages as any).seo

  return {
    title: seo.home_title,
    description: seo.home_description,
    alternates: {
      canonical: `https://sebastien-ia.com/${locale}`,
      languages: {
        'fr': 'https://sebastien-ia.com/fr',
        'en': 'https://sebastien-ia.com/en',
        'de': 'https://sebastien-ia.com/de',
        'it': 'https://sebastien-ia.com/it'
      }
    },
    openGraph: {
      title: seo.home_title,
      description: seo.home_description,
      url: `https://sebastien-ia.com/${locale}`,
      siteName: 'Hub AI',
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

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hub AI",
              "url": "https://sebastien-ia.com",
              "description": "Hub IA multilingue — Suisse, Europe, Canada, USA",
              "inLanguage": [locale],
              "potentialAction": {
                "@type": "SearchAction",
                "target": `https://sebastien-ia.com/${locale}/blog?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "author": {
                "@type": "Person",
                "name": "Sebastien",
                "url": "https://sebastien-ia.com"
              }
            })
          }}
        />
        {/* Hreflang complet */}
        <link rel="alternate" hrefLang="fr" href="https://sebastien-ia.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://sebastien-ia.com/en" />
        <link rel="alternate" hrefLang="de" href="https://sebastien-ia.com/de" />
        <link rel="alternate" hrefLang="it" href="https://sebastien-ia.com/it" />
        <link rel="alternate" hrefLang="x-default" href="https://sebastien-ia.com/fr" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
