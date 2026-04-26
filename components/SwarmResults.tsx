'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type Bar = { label: string; value: number; color: string }

const RESULTS = {
  accuracy: [
    { label: 'Sentiment polarity', value: 89, color: '#C9A572' },
    { label: 'Trend direction', value: 84, color: '#C9A572' },
    { label: 'Risk identification', value: 78, color: '#C9A572' },
    { label: 'Audience segmentation', value: 92, color: '#C9A572' },
  ] as readonly Bar[],
  benchmarks: [
    { metric: 'Time to insight', before: '4-6 weeks', after: '< 5 min', delta: '-99%' },
    { metric: 'Cost per study', before: '€25-80k', after: '€49-499', delta: '-99%' },
    { metric: 'Coverage breadth', before: '5-10 voices', after: '500+ agents', delta: '+50×' },
    { metric: 'Replicability', before: 'Manual', after: 'Programmable', delta: '∞' },
  ],
}

export default function SwarmResults() {
  const t = useTranslations('swarm.results')

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(26,37,96,0.4), transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-4">{t('kicker')}</div>
          <h2 className="text-[clamp(26px,3.8vw,42px)] font-extrabold leading-[1.15] mb-4">
            {t('title')}{' '}
            <span className="gradient-text-luxury">{t('title_em')}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accuracy chart */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              border: '1px solid rgba(201,165,114,0.2)',
              background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-1">
                  {t('chart_label')}
                </div>
                <h3 className="text-xl font-bold font-[Montserrat]">{t('chart_title')}</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold gradient-text-luxury font-[Montserrat]">
                  86%
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">
                  {t('chart_avg')}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {RESULTS.accuracy.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/80">{bar.label}</span>
                    <span className="font-bold text-gold">{bar.value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #C9A572, #AD7D4E)`,
                        boxShadow: '0 0 10px rgba(201,165,114,0.5)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.value}%` }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-4 text-[11px] text-white/45 leading-relaxed"
              style={{ borderTop: '1px solid rgba(201,165,114,0.1)' }}
            >
              {t('chart_methodology')}
            </div>
          </div>

          {/* Benchmark table */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{
              border: '1px solid rgba(201,165,114,0.2)',
              background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
            }}
          >
            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-1">
                {t('bench_label')}
              </div>
              <h3 className="text-xl font-bold font-[Montserrat]">{t('bench_title')}</h3>
            </div>

            <div className="space-y-3">
              {RESULTS.benchmarks.map((b, i) => (
                <motion.div
                  key={b.metric}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="py-3 sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:items-center sm:gap-3"
                  style={{ borderBottom: i < RESULTS.benchmarks.length - 1 ? '1px solid rgba(201,165,114,0.08)' : 'none' }}
                >
                  <div className="text-sm font-medium text-white mb-1.5 sm:mb-0">{b.metric}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/45 line-through font-mono">{b.before}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A572" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span className="font-bold text-gold font-mono">{b.after}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="mt-6 pt-4 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(201,165,114,0.1)' }}
            >
              <span className="text-[11px] text-white/50 uppercase tracking-wider">
                {t('bench_overall')}
              </span>
              <span className="text-2xl font-extrabold gradient-text-luxury font-[Montserrat]">
                ×120 ROI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
