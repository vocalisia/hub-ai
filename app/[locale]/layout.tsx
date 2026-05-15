import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Montserrat, Lato } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import GA4Tracker from '@/components/GA4Tracker'
import '@/app/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

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
      siteName: 'AI-Due',
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
        {/* Consent Mode v2 — DOIT être avant gtag.js (raw <script> en head pour garantir l'ordre HTML) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});var _c=(typeof localStorage!=='undefined')?localStorage.getItem('hub_cookies'):null;if(_c==='accepted'){gtag('consent','update',{analytics_storage:'granted'});}`,
          }}
        />
        {/* GA4 — chargé INLINE en head APRÈS consent default pour respecter l'ordre RGPD */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PE4BF17GKG" />
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('js',new Date());gtag('config','G-PE4BF17GKG',{anonymize_ip:true});`,
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
                "name": "AI-Due",
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
                "name": "AI-Due",
                "url": "https://ai-due.com",
                "logo": {"@type": "ImageObject", "url": "https://ai-due.com/favicon.svg", "width": 512, "height": 512},
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
      <body className={`${montserrat.variable} ${lato.variable} font-body bg-[#0a0f2e] text-white antialiased`}>
        {/* GA4 tag déplacé dans <head> au-dessus pour garantir ordre consent->gtag */}
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

