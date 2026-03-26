'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface EbookData {
  id: string
  title: string
  subtitle: string
  description: string
  chapters: string[]
  chapterCount: number
  pageCount: number
  tags: string[]
  crossLinks: { label: string; url: string }[]
  gradient: string
  icon: string
}

interface Props {
  ebook: EbookData
  index?: number
}

export default function EbookCard({ ebook, index = 0, locale = 'fr' }: Props & { locale?: string }) {
  const [chaptersOpen, setChaptersOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className="group"
    >
      <div className="relative bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-[#DAA520]/40 hover:shadow-[0_0_40px_rgba(218,165,32,0.08)]">
        {/* Top gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Book cover mockup */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: ebook.gradient
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Book spine effect */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/10" />

          {/* Central icon / emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-5xl">{ebook.icon}</span>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1f] to-transparent" />

          {/* Stats badges */}
          <div className="absolute bottom-4 left-6 flex gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-3.5 h-3.5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {ebook.chapterCount} chapitres
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-3.5 h-3.5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {ebook.pageCount} pages
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {ebook.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] text-[#FFD700]/80 bg-[#FFD700]/[0.06] px-2.5 py-1 rounded-full border border-[#FFD700]/10 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
            {ebook.title}
          </h2>
          <p className="text-purple-400/70 text-sm font-medium mb-3">{ebook.subtitle}</p>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{ebook.description}</p>

          {/* Expandable chapters */}
          <div className="mb-5">
            <button
              onClick={() => setChaptersOpen(!chaptersOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#FFD700] transition-colors w-full"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${chaptersOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Table des matieres
              <span className="text-gray-600 text-xs">({ebook.chapters.length} chapitres)</span>
            </button>

            <AnimatePresence>
              {chaptersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <ul className="mt-3 space-y-1.5 pl-6 border-l border-[#FFD700]/10">
                    {ebook.chapters.map((chapter, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="text-sm text-gray-500 flex items-start gap-2"
                      >
                        <span className="text-[#FFD700]/50 font-mono text-xs mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {chapter}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cross-links */}
          <div className="flex flex-wrap gap-2 mb-5">
            {ebook.crossLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-purple-400/70 hover:text-purple-300 bg-purple-500/[0.06] px-2.5 py-1 rounded-full border border-purple-500/10 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={`/${locale}/contact?ebook=${encodeURIComponent(ebook.title)}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-[#FFD700]/10 to-[#DAA520]/10 text-[#FFD700] border border-[#FFD700]/20 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/15 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Telecharger le eBook
          </a>
        </div>
      </div>
    </motion.div>
  )
}
