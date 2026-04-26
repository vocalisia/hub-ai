'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const showcases = [
  {
    key: 'media',
    img: '/images/hero/media-launch.png',
  },
  {
    key: 'finance',
    img: '/images/hero/finance-earnings.png',
  },
  {
    key: 'policy',
    img: '/images/hero/policy-draft.png',
  },
  {
    key: 'product',
    img: '/images/hero/marketing-campaign.png',
  },
]

export default function SwarmShowcase() {
  const t = useTranslations('swarm.showcase')

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(26,37,96,0.3), transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-4">{t('kicker')}</div>
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold leading-[1.15] mb-4">
            {t('title')}{' '}
            <span className="gradient-text-luxury">{t('title_em')}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-[16px] leading-[1.7]">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {showcases.map((item, i) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                border: '1px solid rgba(201,165,114,0.2)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.8))',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden">
                <Image
                  src={item.img}
                  alt={t(`${item.key}_title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 0%, rgba(10,15,46,0.4) 60%, rgba(10,15,46,0.95) 100%)',
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(201,165,114,0.15)',
                      border: '1px solid rgba(201,165,114,0.4)',
                      color: '#C9A572',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    {t(`${item.key}_tag`)}
                  </span>
                </div>
              </div>
              <div className="relative p-5 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 sm:mb-3 font-[Montserrat] group-hover:text-gold transition-colors">
                  {t(`${item.key}_title`)}
                </h3>
                <p className="text-white/70 text-[15px] leading-[1.65] mb-4">
                  {t(`${item.key}_desc`)}
                </p>
                <div className="flex items-center gap-4 text-[13px]">
                  <div className="flex items-center gap-2 text-gold font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6" />
                    </svg>
                    {t(`${item.key}_metric`)}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
