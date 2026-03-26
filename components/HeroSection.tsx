'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030014]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-900/15 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Globe behind content - full screen centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[100vw] h-[100vh] opacity-40 sm:opacity-65 lg:opacity-75 flex items-center justify-center">
          <div className="w-full h-full max-w-[100vw]">
            <Globe3D />
          </div>
        </div>
      </div>

      {/* Content over globe */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium mb-6 sm:mb-8 tracking-wider uppercase backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Network Active
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-4 sm:mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
          {' '}
          <span className="text-white">DUE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-purple-300/80 text-sm sm:text-base font-medium mb-4 tracking-widest uppercase"
        >
          {t('subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
        >
          <Link
            href={`/${locale}/carte`}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <span className="flex items-center justify-center gap-2">
              {t('cta_map')}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="px-8 py-4 border border-white/10 text-gray-300 font-bold rounded-xl hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-sm text-sm sm:text-base"
          >
            {t('cta_blog')}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto pt-6 sm:pt-8 border-t border-white/5"
        >
          {[
            { value: '8', label: 'Sites' },
            { value: '43', label: 'Articles' },
            { value: '4', label: 'Langues' },
            { value: '68', label: 'Villes' }
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl sm:text-3xl font-black text-white">{value}</div>
              <div className="text-gray-600 text-[10px] sm:text-xs uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
