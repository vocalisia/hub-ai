'use client'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'

const PREVIEW_POSTS = [
  {
    title: { fr: "L'IA en Suisse 2025", en: 'AI in Switzerland 2025', de: 'KI in der Schweiz 2025', it: 'IA in Svizzera 2025' },
    slug: 'ia-suisse-2025',
    geo: '🇨🇭 Geneve',
    color: '#EF4444'
  },
  {
    title: { fr: 'AI Ecosystem Montreal', en: 'AI Ecosystem Montreal', de: 'KI-Okosystem Montreal', it: 'Ecosistema IA Montreal' },
    slug: 'ai-montreal-2025',
    geo: '🇨🇦 Montreal',
    color: '#F59E0B'
  }
]

export default function BlogPreview() {
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
            Derniers Articles
          </h2>
          <p className="text-gray-400">Articles experts geolocalises</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {PREVIEW_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="bg-[#0D0D1F] rounded-2xl border border-purple-500/10 hover:border-purple-500/40 transition-all p-6 hover:-translate-y-1">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: post.color + '20', color: post.color }}
                  >
                    {post.geo}
                  </span>
                  <h3 className="text-white font-bold text-xl">
                    {post.title[locale]}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  )
}
