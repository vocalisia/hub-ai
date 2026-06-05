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
import ClientErrorBoundary from '@/components/ClientErrorBoundary'
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

const aiDueDefinedTerms = [
  {
    name: 'AI agent',
    description: 'Software system that reasons about an objective, chooses actions, uses tools, observes results, and adapts its next steps without requiring a human prompt for every operation.',
  },
  {
    name: 'Autonomous AI agent',
    description: 'AI agent designed to pursue a business goal across multiple steps with planning, memory, tool use, feedback loops, and escalation rules.',
  },
  {
    name: 'Multi-agent system',
    description: 'Architecture where several specialized AI agents collaborate under an orchestrator or shared protocol to solve tasks that exceed a single agent capability.',
  },
  {
    name: 'Agentic RAG',
    description: 'Retrieval augmented generation pattern where an agent decides what to retrieve, when to search again, how to validate context, and how to cite sources.',
  },
  {
    name: 'RAG',
    description: 'Retrieval augmented generation technique that grounds a language model answer in retrieved documents, knowledge bases, or structured data before generation.',
  },
  {
    name: 'LLM orchestration',
    description: 'Coordination layer that routes prompts, tools, memory, retrieval, evaluation, and model calls so language models can operate reliably in production workflows.',
  },
  {
    name: 'ReAct loop',
    description: 'Reasoning and acting loop where an AI agent alternates between analysis, tool execution, observation, and revised planning until the objective is met.',
  },
  {
    name: 'Knowledge graph',
    description: 'Structured representation of entities and relationships that helps AI systems preserve context, explain links, and retrieve precise business knowledge.',
  },
  {
    name: 'AI architecture',
    description: 'Technical design of an AI system, including models, data flows, memory, tools, orchestration, security, evaluation, and deployment constraints.',
  },
  {
    name: 'Synthetic persona',
    description: 'Generated representative profile used to simulate audience reactions, decision patterns, or user behavior without relying on real personal data.',
  },
]

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
  const canonicalUrl = `https://ai-due.com/${locale}`

  return {
    metadataBase: new URL('https://ai-due.com'),
    title: seo.home_title,
    description: seo.home_description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': 'https://ai-due.com/fr',
        'en': 'https://ai-due.com/en',
        'de': 'https://ai-due.com/de',
        'it': 'https://ai-due.com/it',
        'x-default': 'https://ai-due.com/fr'
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
    <html lang={locale} translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
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
        <script
          id="ga4-lead-conversion-tracking"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.__ga4LeadTrackingInstalled)return;window.__ga4LeadTrackingInstalled=true;function send(n,p){if(typeof window.gtag!=='function')return;window.gtag('event',n,Object.assign({event_category:'lead',event_label:location.pathname,page_location:location.href},p||{}));}document.addEventListener('submit',function(e){var f=e.target;if(!f||f.tagName!=='FORM')return;var id=(f.id||f.getAttribute('name')||f.className||'form').toString();send('qualify_lead',{event_label:id,method:/newsletter/i.test(id)?'newsletter':'form'});},true);document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a'):null;if(!a)return;var h=a.getAttribute('href')||'';if(/wa\\.me|whatsapp/i.test(h)){send('close_convert_lead',{event_label:'whatsapp_click',method:'whatsapp'});}else if(/^tel:/i.test(h)){send('qualify_lead',{event_label:'phone_click',method:'phone'});}else if(/^mailto:/i.test(h)){send('qualify_lead',{event_label:'email_click',method:'email'});}else if(/contact|rdv|devis|quote|demo|booking|cal\\.com|calendly/i.test(h)){send('qualify_lead',{event_label:'contact_click',method:'contact'});}},true);})();`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Perf 2026-05-30: preconnect GTM (saves ~146ms per Lighthouse uses-rel-preconnect) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Perf 2026-05-30: preload LCP hero image — fetchpriority high so it races GTM/JS chunks.
            Matches the next/image srcset width served at 412px viewport (w=750&q=75). */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fhero%2Fhero-swarm.png&w=750&q=75"
          imageSrcSet="/_next/image?url=%2Fimages%2Fhero%2Fhero-swarm.png&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fhero%2Fhero-swarm.png&w=750&q=75 750w, /_next/image?url=%2Fimages%2Fhero%2Fhero-swarm.png&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Fhero%2Fhero-swarm.png&w=1920&q=75 1920w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <meta property="og:image" content="https://ai-due.com/api/og" />
        {/* E-E-A-T enriched schema — Organization + Person (Laurent Duplat) — Sprint 2026-05-29 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://ai-due.com/#website",
                "name": "AI-Due",
                "url": "https://ai-due.com",
                "description": "AI Architecture & Intelligent Systems — Switzerland, Europe, Canada, USA",
                "inLanguage": [locale],
                "publisher": { "@id": "https://ai-due.com/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `https://ai-due.com/${locale}/blog?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                },
                "author": { "@id": "https://ai-due.com/#laurent-duplat" }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://ai-due.com/#organization",
                "name": "AI-Due",
                "alternateName": "AI Due — AI Architecture Platform",
                "url": "https://ai-due.com",
                "logo": { "@type": "ImageObject", "url": "https://ai-due.com/favicon.svg", "width": 512, "height": 512 },
                "image": { "@type": "ImageObject", "url": "https://ai-due.com/api/og", "width": 1200, "height": 630 },
                "description": "AI Architecture & Intelligent Systems — Strategic consulting, training and AI integration for businesses in Switzerland, Europe, Canada and USA.",
                "email": "contact@ai-due.com",
                "foundingDate": "2023",
                "founder": { "@id": "https://ai-due.com/#laurent-duplat" },
                "areaServed": ["Switzerland", "Europe", "Canada", "United States"],
                "knowsLanguage": ["fr", "en", "de", "it"],
                "knowsAbout": [
                  "AI architecture",
                  "Multi-agent systems",
                  "AI integration for SMB",
                  "LLM orchestration",
                  "Strategic AI consulting",
                  "AI training",
                  "RAG systems",
                  "AI agents",
                  "Knowledge graphs",
                  "MLOps"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "CH",
                  "addressRegion": "Switzerland"
                },
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
                },
                "publishingPrinciples": "https://ai-due.com/about",
                "ethicsPolicy": "https://ai-due.com/about",
                "correctionsPolicy": "https://ai-due.com/contact",
                "diversityPolicy": "https://ai-due.com/about",
                "actionableFeedbackPolicy": "https://ai-due.com/contact"
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://ai-due.com/#laurent-duplat",
                "name": "Laurent Duplat",
                "url": "https://ai-due.com/about",
                "jobTitle": "Publication Director",
                "description": "Publication Director of AI-Due — AI architect and consultant in multi-agent systems, RAG and strategic AI integration for businesses.",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://ai-due.com/authors/laurent-duplat.jpg",
                  "width": 400,
                  "height": 400
                },
                "nationality": { "@type": "Country", "name": "France" },
                "worksFor": { "@id": "https://ai-due.com/#organization" },
                "knowsAbout": [
                  "AI architecture",
                  "Multi-agent systems",
                  "LLM orchestration",
                  "RAG systems",
                  "AI consulting",
                  "Strategic AI",
                  "Knowledge graphs",
                  "AI integration",
                  "AI training"
                ],
                "knowsLanguage": ["French", "English"],
                "sameAs": [
                  "https://www.linkedin.com/in/vocalisia/",
                  "https://x.com/VocalisAi",
                  "https://github.com/laurentduplat"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "DefinedTermSet",
                "@id": "https://ai-due.com/#ai-glossary",
                "name": "AI-Due AI Architecture Glossary",
                "description": "Core definitions used by AI-Due for AI agents, RAG, LLM orchestration, and production AI architecture.",
                "url": `https://ai-due.com/${locale}/blog`,
                "inLanguage": locale,
                "publisher": { "@id": "https://ai-due.com/#organization" },
                "hasDefinedTerm": aiDueDefinedTerms.map((term) => ({
                  "@type": "DefinedTerm",
                  "@id": `https://ai-due.com/#term-${term.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                  "name": term.name,
                  "description": term.description,
                  "inDefinedTermSet": "https://ai-due.com/#ai-glossary"
                }))
              }
            ])
          }}
        />
        {/* Hreflang - géré par alternates dans generateMetadata de chaque page */}
      </head>
      <body className={`${montserrat.variable} ${lato.variable} font-body bg-[#0a0f2e] text-white antialiased notranslate`} suppressHydrationWarning>
        {/* GA4 tag déplacé dans <head> au-dessus pour garantir ordre consent->gtag */}
        <NextIntlClientProvider messages={messages}>
          <ClientErrorBoundary name="navbar">
            <Navbar />
          </ClientErrorBoundary>
          {children}
          <ClientErrorBoundary name="footer">
            <Footer />
          </ClientErrorBoundary>
          <ClientErrorBoundary name="cookie-banner">
            <CookieBannerLazy />
          </ClientErrorBoundary>
          <ClientErrorBoundary name="ga4-tracker">
            <Suspense fallback={null}>
              <GA4Tracker />
            </Suspense>
          </ClientErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

