'use client'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'

const PREVIEW_POSTS = [
  {
    title: { fr: "L'IA en Suisse 2025 — Guide Complet", en: 'AI in Switzerland 2025 — Complete Guide', de: 'KI in der Schweiz 2025', it: 'IA in Svizzera 2025' },
    slug: 'ia-suisse-2025',
    geo: 'Geneve',
    flag: '🇨🇭',
    color: '#ef4444',
    tags: ['IA', 'Suisse', 'PME']
  },
  {
    title: { fr: 'Ecosysteme IA Montreal', en: 'AI Ecosystem Montreal', de: 'KI-Okosystem Montreal', it: 'Ecosistema IA Montreal' },
    slug: 'ai-montreal-2025',
    geo: 'Montreal',
    flag: '🇨🇦',
    color: '#f59e0b',
    tags: ['AI', 'Canada', 'Startups']
  }
]

export default function BlogPreview() {
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-xs font-medium uppercase tracking-[0.2em] mb-4 block">Insights</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Latest Articles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {PREVIEW_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="group relative bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all p-8 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 0% 100%, ${post.color}08, transparent 50%)` }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ background: post.color + '15', color: post.color }}
                      >
                        {post.flag} {post.geo}
                      </span>
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-600">#{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-xl group-hover:text-purple-300 transition-colors">
                      {post.title[locale]}
                    </h3>
                    <div className="mt-4 text-purple-400 text-sm font-medium flex items-center gap-2">
                      Read
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-300 font-semibold rounded-xl hover:bg-white/5 transition-all"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  )
}
