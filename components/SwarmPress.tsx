'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const TRUST_BADGES = [
  { icon: '🔒', label: 'GDPR', sub: 'compliant' },
  { icon: '🇨🇭', label: 'Swiss', sub: 'made' },
  { icon: '⚡', label: '99.9%', sub: 'uptime' },
  { icon: '🛡️', label: 'SOC 2', sub: 'aligned' },
  { icon: '🔐', label: 'AES-256', sub: 'encrypted' },
  { icon: '🤖', label: 'Multi-LLM', sub: 'powered' },
]

export default function SwarmPress() {
  const t = useTranslations('swarm.press')

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,165,114,0.3), transparent)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,165,114,0.3), transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] uppercase tracking-[3px] text-white/45 font-semibold mb-8"
        >
          {t('label')}
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 items-center">
          {TRUST_BADGES.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -2, scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <div className="text-[12px] sm:text-[13px] font-bold text-white/85 font-[Montserrat] leading-tight">
                {b.label}
              </div>
              <div className="text-[10px] text-white/45 uppercase tracking-wider">
                {b.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
