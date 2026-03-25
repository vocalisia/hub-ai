import { getTranslations } from 'next-intl/server'
import nextDynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const WorldMap = nextDynamic(() => import('@/components/WorldMap'), { ssr: false })

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
    <main className="min-h-screen bg-[#0A0A1A] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">{t('title')}</h1>
          <p className="text-gray-400 text-xl">{t('subtitle')}</p>
        </div>

        {/* Schema LocalBusiness pour chaque ville */}
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
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Geneve",
                      "addressCountry": "CH"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 46.2044,
                      "longitude": 6.1432
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "LocalBusiness",
                    "name": "Hub AI — Montreal",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Montreal",
                      "addressCountry": "CA"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "LocalBusiness",
                    "name": "Hub AI — San Francisco",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "San Francisco",
                      "addressCountry": "US"
                    }
                  }
                }
              ]
            })
          }}
        />

        <WorldMap />
      </div>
    </main>
  )
}
