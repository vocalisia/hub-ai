import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Montserrat, Lato } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBannerLazy from '@/components/CookieBannerLazy'
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

  // EN is the default locale — canonical points to / (root) to match Google's preference
  // Perf 2026-05-29: removed trailing slashes — site serves /fr (308 redirects /fr/ → /fr),
  // canonicals were pointing to redirect URLs → hreflang mismatch
  const canonicalUrl = locale === 'en'
    ? 'https://ai-due.com'
    : `https://ai-due.com/${locale}`

  return {
    metadataBase: new URL('https://ai-due.com'),
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
    openGraph: {
      title: seo.home_title,
      description: seo.home_description,
      url: canonicalUrl,
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
        {/* Consent Mode v2 + GA4 loader — tout inline pour forcer l'ordre (Next.js hoist les <script src> avant les inline, ce qui casse le consent) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});var _c=(typeof localStorage!=='undefined')?localStorage.getItem('hub_cookies'):null;if(_c==='rejected'){gtag('consent','update',{analytics_storage:'denied'});}(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-PE4BF17GKG';document.head.appendChild(s);})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('js',new Date());gtag('config','G-PE4BF17GKG');`,
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
                  "name": "Laurent Duplat",
                  "url": "https://ai-due.com/about",
                  "jobTitle": "Publication Director",
                  "sameAs": ["https://www.linkedin.com/in/laurentduplat/"]
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
                  "name": "Laurent Duplat",
                  "url": "https://ai-due.com/about",
                  "jobTitle": "Publication Director",
                  "sameAs": ["https://www.linkedin.com/in/laurentduplat/"]
                },
                "areaServed": ["Switzerland", "Europe", "Canada", "United States"],
                "knowsLanguage": ["fr", "en", "de", "it"],
                "sameAs": [
                  "https://www.linkedin.com/company/ai-due",
                  "https://twitter.com/ai_due_com",
                  "https://github.com/ai-due"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "contact@ai-due.com",
                  "contactType": "customer support",
                  "availableLanguage": ["French", "English", "German", "Italian"]
                }
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
          <CookieBannerLazy />
          <Suspense fallback={null}>
            <GA4Tracker />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

