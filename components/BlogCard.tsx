import Link from 'next/link'
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
}

export default function BlogCard({ post, locale }: Props) {
  const countryColor = GEO_COLORS[post.geo?.country] || '#8B5CF6'
  const flag = GEO_FLAGS[post.geo?.country] || '🌍'

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article className="group bg-[#0D0D1F] rounded-2xl border border-purple-500/10 hover:border-purple-500/40 transition-all p-6 h-full hover:-translate-y-1">
        {/* Geo badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: countryColor + '20', color: countryColor }}
          >
            {flag} {post.geo?.city || post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.readTime} min</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h2 className="text-white font-bold text-lg mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-gray-500 text-xs">
            {new Date(post.date).toLocaleDateString(locale, {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </span>
          <span className="text-purple-400 text-sm group-hover:translate-x-1 transition-transform">
            Lire
          </span>
        </div>
      </article>
    </Link>
  )
}
