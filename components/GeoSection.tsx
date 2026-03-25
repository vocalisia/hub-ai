'use client'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'

const REGIONS = [
  {
    flag: '🇨🇭',
    name: { fr: 'Suisse', en: 'Switzerland', de: 'Schweiz', it: 'Svizzera' },
    desc: { fr: 'Hub central IA', en: 'Central AI Hub', de: 'Zentraler KI-Hub', it: 'Hub IA centrale' },
    cities: ['Geneve', 'Zurich', 'Lausanne', 'Bern'],
    color: '#ef4444',
    link: '/blog?geo=ch'
  },
  {
    flag: '🇪🇺',
    name: { fr: 'Europe', en: 'Europe', de: 'Europa', it: 'Europa' },
    desc: { fr: 'Innovation & regulation', en: 'Innovation & regulation', de: 'Innovation & Regulierung', it: 'Innovazione & regolamentazione' },
    cities: ['Paris', 'Berlin', 'London', 'Amsterdam'],
    color: '#6366f1',
    link: '/blog?geo=eu'
  },
  {
    flag: '🇨🇦',
    name: { fr: 'Canada', en: 'Canada', de: 'Kanada', it: 'Canada' },
    desc: { fr: 'Recherche & startups', en: 'Research & startups', de: 'Forschung & Startups', it: 'Ricerca & startup' },
    cities: ['Montreal', 'Toronto', 'Vancouver'],
    color: '#f59e0b',
    link: '/blog?geo=ca'
  },
  {
    flag: '🇺🇸',
    name: { fr: 'USA', en: 'USA', de: 'USA', it: 'USA' },
    desc: { fr: 'Silicon Valley & beyond', en: 'Silicon Valley & beyond', de: 'Silicon Valley & mehr', it: 'Silicon Valley & oltre' },
    cities: ['San Francisco', 'New York', 'Boston', 'Seattle'],
    color: '#3b82f6',
    link: '/blog?geo=us'
  }
]

export default function GeoSection() {
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-xs font-medium uppercase tracking-[0.2em] mb-4 block">Global Reach</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            4 Regions, 1 Network
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.flag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${locale}${region.link}`}>
                <div className="group relative bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all p-6 h-full overflow-hidden">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${region.color}10, transparent 70%)` }}
                  />

                  <div className="relative">
                    <div className="text-4xl mb-4">{region.flag}</div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      {region.name[locale]}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{region.desc[locale]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {region.cities.map(city => (
                        <span
                          key={city}
                          className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                          style={{ background: region.color + '12', color: region.color }}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
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
