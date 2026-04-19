import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import GA4Tracker from '@/components/GA4Tracker'
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
    metadataBase: new URL('https://ai-due.com'),
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
    },
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
      verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
    }),
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
        {/* Consent Mode v2 — DOIT être avant gtag.js */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var _c=(typeof localStorage!=='undefined')?localStorage.getItem('hub_cookies'):null;gtag('consent','default',{analytics_storage:_c==='rejected'?'denied':'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="https://ai-due.com/api/og" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
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
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://ai-due.com/#organization",
                "name": "AI-DUE",
                "url": "https://ai-due.com",
                "logo": "https://ai-due.com/favicon.svg",
                "description": "AI Architecture & Intelligent Systems — Strategic consulting, training and AI integration for businesses in Switzerland, Europe, Canada and USA.",
                "email": "contact@ai-due.com",
                "founder": {
                  "@type": "Person",
                  "name": "Sebastien",
                  "url": "https://ai-due.com"
                },
                "areaServed": ["Switzerland", "Europe", "Canada", "United States"],
                "knowsLanguage": ["fr", "en", "de", "it"],
                "sameAs": []
              }
            ])
          }}
        />
        {/* Hreflang - géré par alternates dans generateMetadata de chaque page */}
      </head>
      <body className={`${inter.className} bg-[#030014] text-white antialiased`}>
        {/* GA4 tag — strategy afterInteractive = chargé après hydration, fiable Next.js 14 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PE4BF17GKG"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`gtag('js',new Date());gtag('config','G-PE4BF17GKG');`}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
          <Suspense fallback={null}>
            <GA4Tracker />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
