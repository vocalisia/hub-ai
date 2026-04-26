'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function SwarmCTA() {
  const t = useTranslations('swarm.cta')
  const locale = useLocale()

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,165,114,0.15), transparent 60%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="eyebrow mb-5 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {t('badge')}
        </div>
        <h2 className="text-[clamp(26px,6vw,54px)] font-extrabold leading-[1.1] tracking-[-0.5px] mb-5 sm:mb-6">
          {t('title_line_1')}
          <br />
          <span className="gradient-text-luxury">{t('title_line_2')}</span>
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-lg text-white/75 max-w-2xl mx-auto mb-7 sm:mb-10 leading-[1.65]">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/simulateur`} className="btn-gold">
            {t('cta_primary')}
          </Link>
          <Link href={`/${locale}/tarifs`} className="btn-gold-outline">
            {t('cta_secondary')}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
