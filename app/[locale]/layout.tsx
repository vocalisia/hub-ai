import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/app/globals.css'

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
      canonical: `https://ai-due.com/${locale}`,
      languages: {
        'fr': 'https://ai-due.com/fr',
        'en': 'https://ai-due.com/en',
        'de': 'https://ai-due.com/de',
        'it': 'https://ai-due.com/it'
      }
    },
    openGraph: {
      title: seo.home_title,
      description: seo.home_description,
      url: `https://ai-due.com/${locale}`,
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="https://ai-due.com/api/og" />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PE4BF17GKG" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PE4BF17GKG');
        `}} />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI-DUE",
              "url": "https://ai-due.com",
              "description": "AI Architecture & Intelligent Systems — Switzerland, Europe, Canada, USA",
              "inLanguage": [locale],
              "potentialAction": {
                "@type": "SearchAction",
                "target": `https://ai-due.com/${locale}/blog?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "author": {
                "@type": "Person",
                "name": "Sebastien",
                "url": "https://ai-due.com"
              }
            })
          }}
        />
        {/* Hreflang complet */}
        <link rel="alternate" hrefLang="fr" href="https://ai-due.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://ai-due.com/en" />
        <link rel="alternate" hrefLang="de" href="https://ai-due.com/de" />
        <link rel="alternate" hrefLang="it" href="https://ai-due.com/it" />
        <link rel="alternate" hrefLang="x-default" href="https://ai-due.com/fr" />
      </head>
      <body className={`${inter.className} bg-[#030014] text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
