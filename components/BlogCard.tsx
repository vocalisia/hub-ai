'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blog'

const GEO_COLORS: Record<string, string> = {
  CH: '#EF4444',
  CA: '#F59E0B',
  US: '#3B82F6',
  FR: '#8B5CF6',
  DE: '#10B981',
  GB: '#6366F1'
}

const GEO_FLAGS: Record<string, string> = {
  CH: '🇨🇭', CA: '🇨🇦', US: '🇺🇸',
  FR: '🇫🇷', DE: '🇩🇪', GB: '🇬🇧'
}

interface Props {
  post: BlogPost
  locale: string
  index?: number
}

export default function BlogCard({ post, locale, index = 0 }: Props) {
  const countryColor = GEO_COLORS[post.geo?.country] || '#8B5CF6'
  const flag = GEO_FLAGS[post.geo?.country] || '🌍'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
    >
      <Link href={`/${locale}/blog/${post.slug}`}>
        <article className="group relative bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 card-hover-glow">
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${countryColor}, transparent)`
            }}
          />

          {/* Hover glow background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${countryColor}08, transparent 70%)`
            }}
          />

          <div className="relative p-6">
            {/* Geo badge + Read time */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                style={{ background: countryColor + '15', color: countryColor, border: `1px solid ${countryColor}20` }}
              >
                {flag} {post.geo?.city || post.category}
              </span>
              <span className="text-gray-600 text-xs font-medium flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
                {post.readTime} min
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[11px] text-purple-400/80 bg-purple-500/[0.08] px-2.5 py-1 rounded-full border border-purple-500/10 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-white font-bold text-lg mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2 leading-snug">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
              <span className="text-gray-600 text-xs font-medium">
                {new Date(post.date).toLocaleDateString(locale, {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5 text-purple-400/80 text-sm font-medium group-hover:text-purple-300 transition-colors">
                {locale === 'en' ? 'Read' : locale === 'de' ? 'Lesen' : locale === 'it' ? 'Leggi' : 'Lire'}
                <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
