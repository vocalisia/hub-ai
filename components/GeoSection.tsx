'use client'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'

const REGIONS = [
  {
    flag: '🇨🇭',
    name: { fr: 'Suisse', en: 'Switzerland', de: 'Schweiz', it: 'Svizzera' },
    cities: ['Geneve', 'Zurich', 'Lausanne', 'Bern'],
    color: '#EF4444',
    link: '/blog?geo=ch'
  },
  {
    flag: '🇪🇺',
    name: { fr: 'Europe', en: 'Europe', de: 'Europa', it: 'Europa' },
    cities: ['Paris', 'Berlin', 'London', 'Amsterdam'],
    color: '#6366F1',
    link: '/blog?geo=eu'
  },
  {
    flag: '🇨🇦',
    name: { fr: 'Canada', en: 'Canada', de: 'Kanada', it: 'Canada' },
    cities: ['Montreal', 'Toronto', 'Vancouver'],
    color: '#F59E0B',
    link: '/blog?geo=ca'
  },
  {
    flag: '🇺🇸',
    name: { fr: 'USA', en: 'USA', de: 'USA', it: 'USA' },
    cities: ['San Francisco', 'New York', 'Boston', 'Seattle'],
    color: '#3B82F6',
    link: '/blog?geo=us'
  }
]

export default function GeoSection() {
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4">
            Presence Mondiale
          </h2>
          <p className="text-gray-400">Notre ecosysteme IA couvre 4 regions strategiques</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.flag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${locale}${region.link}`}>
                <div className="bg-[#0D0D1F] rounded-2xl border border-purple-500/10 hover:border-purple-500/40 transition-all p-6 h-full hover:-translate-y-1">
                  <div className="text-4xl mb-4">{region.flag}</div>
                  <h3 className="text-white font-bold text-xl mb-3">
                    {region.name[locale]}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {region.cities.map(city => (
                      <span
                        key={city}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: region.color + '20', color: region.color }}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
