import { getTranslations } from 'next-intl/server'
import nextDynamic from 'next/dynamic'
import type { Metadata } from 'next'
import CitySidebar from '@/components/CitySidebar'

export const dynamic = 'force-dynamic'

const Globe3D = nextDynamic(() => import('@/components/Globe3D'), { ssr: false })

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' })
  return {
    title: t('map_title'),
    description: t('home_description'),
    other: {
      'geo.region': 'CH',
      'geo.placename': 'Geneve, Suisse',
      'geo.position': '46.2044;6.1432',
      'ICBM': '46.2044, 6.1432'
    }
  }
}

export default async function CartePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'map' })

  return (
    <main className="min-h-screen bg-[#030014] relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-purple-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
              Interactive
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {t('title').split(' ')[0]}{' '}
              <span className="gradient-text-purple">{t('title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
            <div className="mx-auto mt-6 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          {/* Schema LocalBusiness */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Ecosysteme IA Mondial",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "LocalBusiness",
                      "name": "Hub AI — Geneve",
                      "address": { "@type": "PostalAddress", "addressLocality": "Geneve", "addressCountry": "CH" },
                      "geo": { "@type": "GeoCoordinates", "latitude": 46.2044, "longitude": 6.1432 }
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@type": "LocalBusiness",
                      "name": "Hub AI — Montreal",
                      "address": { "@type": "PostalAddress", "addressLocality": "Montreal", "addressCountry": "CA" }
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@type": "LocalBusiness",
                      "name": "Hub AI — San Francisco",
                      "address": { "@type": "PostalAddress", "addressLocality": "San Francisco", "addressCountry": "US" }
                    }
                  }
                ]
              })
            }}
          />

          {/* Globe + Sidebar layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Globe */}
            <div className="flex-1 bg-white/[0.015] rounded-2xl sm:rounded-3xl border border-white/[0.05] p-2 sm:p-4 md:p-6 overflow-hidden min-h-[350px] sm:min-h-[500px]">
              <Globe3D />
            </div>

            {/* City Sidebar */}
            <CitySidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
