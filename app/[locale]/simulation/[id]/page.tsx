'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

type Reaction = {
  platform: 'twitter' | 'reddit' | 'polymarket'
  agent: string
  role: string
  stance: 'support' | 'neutral' | 'oppose'
  text: string
}

type SimResult = {
  ok: true
  mode?: 'live-llm' | 'live-miro' | 'demo'
  simulationId?: string
  doc_summary?: string
  reactions?: Reaction[]
  sentiment?: { support: number; neutral: number; oppose: number }
  report?: string
  risks?: string[]
}

const stanceColor: Record<Reaction['stance'], string> = {
  support: '#22c55e',
  neutral: '#94a3b8',
  oppose: '#ef4444',
}

const platformBadge: Record<Reaction['platform'], { label: string; color: string }> = {
  twitter: { label: 'X / Twitter', color: '#1DA1F2' },
  reddit: { label: 'Reddit', color: '#FF4500' },
  polymarket: { label: 'Polymarket', color: '#C9A572' },
}

export default function SimulationViewPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ?? ''
  const locale = useLocale()
  const t = useTranslations('simulation')
  const [data, setData] = useState<SimResult | null>(null)

  useEffect(() => {
    if (!id) return
    const cached = sessionStorage.getItem(`sim-${id}`)
    if (cached) {
      try {
        setData(JSON.parse(cached) as SimResult)
        return
      } catch {}
    }
    setData({
      ok: true,
      mode: 'demo',
      simulationId: id,
      doc_summary: 'Result not found in session. Run a new simulation.',
      reactions: [],
      sentiment: { support: 0, neutral: 100, oppose: 0 },
      report: '',
      risks: [],
    })
  }, [id])

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0a0f2e] text-white flex items-center justify-center">
        <div className="text-white/60 text-sm">Loading…</div>
      </main>
    )
  }

  const isDemo = data.mode === 'demo'
  const sentiment = data.sentiment ?? { support: 33, neutral: 34, oppose: 33 }

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)' }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'rgba(201,165,114,0.10)' }}
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {data.mode === 'live-llm' ? 'LLM SIMULATION' : data.mode === 'live-miro' ? 'LIVE' : 'DEMO'}
            </div>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.5px] mb-3 font-[Montserrat]">
              {t('title')}
            </h1>
            <p className="text-white/65 text-sm font-mono mb-2">{id}</p>
            {data.doc_summary && (
              <p className="text-white/75 max-w-2xl mx-auto">{data.doc_summary}</p>
            )}
          </motion.div>

          {/* Sentiment overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl p-6 sm:p-8 mb-6"
            style={{
              border: '1px solid rgba(201,165,114,0.22)',
              background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-3">
              {t('sentiment_label')} ({data.reactions?.length ?? 0})
            </div>
            <div className="h-4 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full"
                style={{ background: '#22c55e' }}
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.support}%` }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="h-full"
                style={{ background: '#94a3b8' }}
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.neutral}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="h-full"
                style={{ background: '#ef4444' }}
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.oppose}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <div className="text-2xl font-extrabold" style={{ color: '#22c55e' }}>
                  {sentiment.support}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/55">Support</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold" style={{ color: '#94a3b8' }}>
                  {sentiment.neutral}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/55">Neutral</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold" style={{ color: '#ef4444' }}>
                  {sentiment.oppose}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/55">Oppose</div>
              </div>
            </div>
          </motion.div>

          {/* Risks */}
          {data.risks && data.risks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-3xl p-6 sm:p-8 mb-6"
              style={{
                border: '1px solid rgba(201,165,114,0.22)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-4">
                {t('risks_label')}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.risks.map((risk, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{
                      border: '1px solid rgba(239,68,68,0.2)',
                      background: 'rgba(239,68,68,0.04)',
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                      style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/85 leading-snug">{risk}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reactions */}
          {data.reactions && data.reactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl p-6 sm:p-8 mb-6"
              style={{
                border: '1px solid rgba(201,165,114,0.22)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-4">
                {t('reactions_label')}
              </div>
              <div className="space-y-3">
                {data.reactions.map((r, i) => {
                  const platform = platformBadge[r.platform] ?? platformBadge.twitter
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="p-4 rounded-2xl"
                      style={{
                        border: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
                              color: '#0a0f2e',
                            }}
                          >
                            {r.agent.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate">{r.agent}</div>
                            <div className="text-[11px] text-white/55 truncate">{r.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: `${platform.color}20`, color: platform.color }}
                          >
                            {platform.label}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{
                              background: `${stanceColor[r.stance]}20`,
                              color: stanceColor[r.stance],
                            }}
                          >
                            {r.stance}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] text-white/85 leading-relaxed">{r.text}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Executive report */}
          {data.report && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl p-6 sm:p-8"
              style={{
                border: '1px solid rgba(201,165,114,0.3)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.06), rgba(10,15,46,0.7))',
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-4">
                {t('report_label')}
              </div>
              <div className="text-[15px] text-white/85 leading-[1.75] whitespace-pre-line">
                {data.report}
              </div>
            </motion.div>
          )}

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href={`/${locale}/simulateur`} className="btn-gold-outline">
              {t('new_sim')}
            </Link>
            <Link href={`/${locale}/tarifs`} className="btn-gold">
              {t('upgrade')}
            </Link>
          </div>

          {isDemo && (
            <p className="mt-6 text-center text-[12px] text-white/45">
              Configure MAMMOUTH_API_KEY or OPENAI_API_KEY env var to run real simulations.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
