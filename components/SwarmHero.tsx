'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Logo3D = dynamic(() => import('./Logo3D'), { ssr: false })

export default function SwarmHero() {
  const t = useTranslations('swarm.hero')
  const locale = useLocale()

  const stats = [
    { value: '500+', label: t('stat_agents') },
    { value: '3', label: t('stat_platforms') },
    { value: '<5m', label: t('stat_time') },
    { value: '4', label: t('stat_lang') },
  ]

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-28">
      {/* Layered backgrounds */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-1/2 -left-[20%] w-[140%] h-[200%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,165,114,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Animated particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: '#AD7D4E',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px #AD7D4E',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#AD7D4E 1px, transparent 1px), linear-gradient(90deg, #AD7D4E 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center lg:min-h-[600px]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5 inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t('badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(28px,7vw,64px)] font-extrabold leading-[1.05] tracking-[-0.5px] mb-5 sm:mb-6"
            >
              {t('title_line_1')}
              <br />
              <span className="gradient-text-luxury">{t('title_line_2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] text-white/80 max-w-xl mb-6 sm:mb-8"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-7"
            >
              <Link href={`/${locale}/simulateur`} className="btn-gold">
                {t('cta_primary')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href={`/${locale}/tarifs`} className="btn-gold-outline">
                {t('cta_secondary')}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex items-center gap-3 text-[13px] text-white/60"
            >
              <span className="text-gold text-base">★★★★★</span>
              <span>{t('trust')}</span>
            </motion.div>
          </div>

          {/* 3D Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-[60px] opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(201,165,114,0.5), transparent 60%)',
              }}
            />
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[520px] aspect-square">
              <Logo3D />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-24 border-y py-7 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center"
          style={{
            borderColor: 'rgba(201, 165, 114, 0.2)',
            background:
              'linear-gradient(135deg, rgba(201,165,114,0.05), rgba(201,165,114,0.01))',
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-[clamp(32px,4.5vw,48px)] font-extrabold text-gold leading-none mb-2 font-[Montserrat]">
                {s.value}
              </div>
              <div className="text-white/70 text-[12px] uppercase tracking-[2px] font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
