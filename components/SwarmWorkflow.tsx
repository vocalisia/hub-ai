'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const STEPS = [
  {
    key: 'upload',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    metric: '20 MB',
    metricLabel: 'max',
  },
  {
    key: 'graph',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h6M6 9v6M18 9v6M9 18h6M9 9l6 6M15 9l-6 6" />
      </svg>
    ),
    metric: '~ 12k',
    metricLabel: 'edges/min',
  },
  {
    key: 'agents',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    metric: '500+',
    metricLabel: 'agents',
  },
  {
    key: 'simulate',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    metric: '3',
    metricLabel: 'platforms',
  },
  {
    key: 'report',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    metric: '< 5 min',
    metricLabel: 'total time',
  },
] as const

export default function SwarmWorkflow() {
  const t = useTranslations('swarm.workflow')

  return (
    <section id="workflow" className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26,37,96,0.5), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-4">{t('kicker')}</div>
          <h2 className="text-[clamp(28px,4.2vw,48px)] font-extrabold leading-[1.1] mb-4">
            {t('title_1') || 'Five steps.'}{' '}
            <span className="gradient-text-luxury">{t('title_2') || 'Zero manual work.'}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-[10%] right-[10%] top-[60px] h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,165,114,0.5) 20%, rgba(201,165,114,0.5) 80%, transparent)',
            }}
          />
          <motion.div
            aria-hidden
            className="hidden md:block absolute top-[58px] w-3 h-3 rounded-full"
            style={{
              background: '#C9A572',
              boxShadow: '0 0 15px #C9A572, 0 0 30px #C9A572',
              left: '10%',
            }}
            animate={{ left: ['10%', '90%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
                      filter: 'blur(20px)',
                      opacity: 0.4,
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                  />
                  <div
                    className="relative w-[90px] h-[90px] rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #1a2560, #0a0f2e)',
                      border: '2px solid rgba(201,165,114,0.5)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 0 30px rgba(201,165,114,0.1)',
                    }}
                  >
                    <div className="text-gold">{step.icon}</div>
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold font-[Montserrat]"
                      style={{
                        background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
                        color: '#0a0f2e',
                        boxShadow: '0 4px 12px rgba(201,165,114,0.4)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div
                  className="inline-flex items-baseline gap-1 px-2.5 py-1 rounded-full mb-3"
                  style={{
                    background: 'rgba(201,165,114,0.08)',
                    border: '1px solid rgba(201,165,114,0.25)',
                  }}
                >
                  <span className="text-sm font-bold text-gold font-mono">{step.metric}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">
                    {step.metricLabel}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-[Montserrat]">
                  {t(`${step.key}_title`)}
                </h3>
                <p className="text-[12.5px] text-white/65 leading-[1.55] max-w-[200px]">
                  {t(`${step.key}_desc`)}
                </p>

                {i < STEPS.length - 1 && (
                  <motion.div
                    aria-hidden
                    className="md:hidden mt-5 mb-1"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A572" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
        >
          {[
            { v: '< 5m', l: t('end_time') || 'End-to-end' },
            { v: '99.9%', l: t('end_uptime') || 'SLA uptime' },
            { v: '100%', l: t('end_auto') || 'Auto-pipeline' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl p-4 text-center"
              style={{
                border: '1px solid rgba(201,165,114,0.18)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.5))',
              }}
            >
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text-luxury font-[Montserrat]">
                {s.v}
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/55 uppercase tracking-wider mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
