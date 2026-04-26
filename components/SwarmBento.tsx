'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ============ MINI VISUALIZATIONS ============
function GraphViz() {
  const nodes = [
    { x: 30, y: 40, r: 7, d: 0 },
    { x: 90, y: 25, r: 5, d: 0.3 },
    { x: 150, y: 50, r: 8, d: 0.6 },
    { x: 50, y: 90, r: 6, d: 0.9 },
    { x: 120, y: 95, r: 5, d: 1.2 },
    { x: 170, y: 100, r: 4, d: 1.5 },
  ]
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      {nodes.slice(1).map((n, i) => {
        const p = nodes[i]
        return (
          <motion.line
            key={`l${i}`}
            x1={p.x}
            y1={p.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(201,165,114,0.5)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, delay: n.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="#C9A572"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, delay: n.d, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${n.x}px ${n.y}px`, filter: 'drop-shadow(0 0 5px #AD7D4E)' }}
        />
      ))}
    </svg>
  )
}

function AgentsViz() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <motion.circle
        cx="100"
        cy="60"
        r="10"
        fill="#AD7D4E"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '100px 60px', filter: 'drop-shadow(0 0 10px #C9A572)' }}
      />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2
        const r = 38
        return (
          <motion.circle
            key={i}
            r={3}
            fill="#C9A572"
            initial={{ cx: 100 + Math.cos(a) * r, cy: 60 + Math.sin(a) * r }}
            animate={{
              cx: [100 + Math.cos(a) * r, 100 + Math.cos(a + 1) * r, 100 + Math.cos(a + 2) * r],
              cy: [60 + Math.sin(a) * r, 60 + Math.sin(a + 1) * r, 60 + Math.sin(a + 2) * r],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 6, delay: i * 0.15, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
    </svg>
  )
}

function MarketViz() {
  const points = '0,80 20,70 40,75 60,55 80,60 100,40 120,45 140,30 160,35 180,15 200,20'
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="mg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C9A572" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#AD7D4E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polyline
        points={points}
        fill="none"
        stroke="#C9A572"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.polygon
        points={`${points} 200,120 0,120`}
        fill="url(#mg)"
        animate={{ opacity: [0, 0.8, 0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="180"
        cy="15"
        r="4"
        fill="#C9A572"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{ transformOrigin: '180px 15px', filter: 'drop-shadow(0 0 8px #C9A572)' }}
      />
    </svg>
  )
}

function ReactReportViz() {
  const [text, setText] = useState('')
  const fullText =
    '> Analyzing 247 agents...\n> Top stance: SUPPORT (62%)\n> Risks detected: 3\n> Compiling report...\n> Done.'
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i))
        i++
      } else {
        i = 0
      }
    }, 55)
    return () => clearInterval(id)
  }, [])
  return (
    <pre className="text-[10px] sm:text-[11px] text-gold/85 font-mono leading-[1.6] whitespace-pre-wrap">
      {text}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
        ▊
      </motion.span>
    </pre>
  )
}

function ChatViz() {
  return (
    <div className="space-y-1.5 text-[9px] w-full">
      {[
        { side: 'l', text: "What's the impact?" },
        { side: 'r', text: 'Investors: 62% positive' },
        { side: 'l', text: 'Top concern?' },
        { side: 'r', text: 'Tax implications' },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: m.side === 'l' ? -10 : 10 }}
          animate={{ opacity: [0, 1, 1, 0], x: 0 }}
          transition={{ duration: 4, delay: i * 0.7, repeat: Infinity }}
          className={`flex ${m.side === 'r' ? 'justify-end' : 'justify-start'}`}
        >
          <span
            className="px-2 py-1 rounded-lg max-w-[80%]"
            style={{
              background:
                m.side === 'r' ? 'linear-gradient(135deg, #C9A572, #AD7D4E)' : 'rgba(201,165,114,0.1)',
              color: m.side === 'r' ? '#0a0f2e' : '#fff',
              border: m.side === 'r' ? 'none' : '1px solid rgba(201,165,114,0.2)',
            }}
          >
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function I18nViz() {
  const langs = [
    { flag: '🇬🇧', label: 'EN', word: 'Hello' },
    { flag: '🇫🇷', label: 'FR', word: 'Bonjour' },
    { flag: '🇩🇪', label: 'DE', word: 'Hallo' },
    { flag: '🇮🇹', label: 'IT', word: 'Ciao' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % langs.length), 1500)
    return () => clearInterval(id)
  }, [langs.length])
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="text-3xl mb-1">{langs[idx].flag}</div>
        <div className="text-[10px] text-gold uppercase tracking-[2px] font-bold">{langs[idx].label}</div>
        <div className="text-sm text-white/85 font-medium mt-1">{langs[idx].word}</div>
      </motion.div>
    </div>
  )
}

// ============ ICONS ============
const icons = {
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M9 6h6M6 9v6M18 9v6M9 18h6M9 9l6 6M15 9l-6 6" />
    </svg>
  ),
  graph: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    </svg>
  ),
  market: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 4 4 5-5" />
    </svg>
  ),
  report: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12a9 9 0 1 1-3.5-7.1L21 3v6h-6" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
}

export default function SwarmBento() {
  const t = useTranslations('swarm.bento')
  const tp = useTranslations('pricing')
  const locale = useLocale()

  const cards = [
    { key: 'graph', icon: icons.brain, viz: <GraphViz />, span: 'md:col-span-2 md:row-span-2' },
    { key: 'agents', icon: icons.graph, viz: <AgentsViz />, span: '' },
    { key: 'market', icon: icons.market, viz: <MarketViz />, span: '' },
    { key: 'report', icon: icons.report, viz: <ReactReportViz />, span: 'md:col-span-2' },
    { key: 'chat', icon: icons.chat, viz: <ChatViz />, span: '' },
    { key: 'i18n', icon: icons.globe, viz: <I18nViz />, span: '' },
  ]

  const plans =
    locale === 'en'
      ? [
          { key: 'starter', price: '$0', label: tp('starter_name') },
          { key: 'pro', price: '$59', label: tp('pro_name'), featured: true },
          { key: 'enterprise', price: '$599', label: tp('enterprise_name') },
        ]
      : [
          { key: 'starter', price: '0€', label: tp('starter_name') },
          { key: 'pro', price: '49€', label: tp('pro_name'), featured: true },
          { key: 'enterprise', price: '499€', label: tp('enterprise_name') },
        ]

  return (
    <section id="features" className="relative py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(201,165,114,0.02), transparent)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="eyebrow mb-4">{t('kicker')}</div>
          <h2 className="text-[clamp(26px,3.8vw,42px)] font-extrabold leading-[1.2] mb-3">
            {t('title')} <em className="not-italic gradient-text-luxury">{t('title_em')}</em>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base">{t('subtitle_optional')}</p>

        </motion.div>

        {/* Mini pricing cards (compact version of pricing page) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto mb-10 md:mb-14"
        >
          {plans.map((p) => (
            <Link
              key={p.key}
              href={`/${locale}/paiement?plan=${p.key}`}
              className="group relative rounded-2xl p-3 sm:p-4 md:p-5 transition-all hover:-translate-y-1"
              style={
                p.featured
                  ? {
                      border: '1.5px solid rgba(201,165,114,0.55)',
                      background:
                        'linear-gradient(180deg, rgba(201,165,114,0.10), rgba(10,15,46,0.7))',
                      boxShadow:
                        '0 0 40px rgba(201,165,114,0.15), 0 15px 40px rgba(0,0,0,0.3)',
                    }
                  : {
                      border: '1px solid rgba(201,165,114,0.18)',
                      background:
                        'linear-gradient(135deg, rgba(201,165,114,0.03), rgba(10,15,46,0.5))',
                    }
              }
            >
              {p.featured && (
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[1.5px] whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
                    color: '#0a0f2e',
                    boxShadow: '0 6px 15px rgba(201,165,114,0.3)',
                  }}
                >
                  ★ Most popular
                </div>
              )}
              <div className="text-[13px] sm:text-base font-bold mb-0.5 sm:mb-1 font-[Montserrat]">{p.label}</div>
              <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                <span
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-none font-[Montserrat]"
                  style={p.featured ? { color: '#C9A572' } : { color: '#fff' }}
                >
                  {p.price}
                </span>
                <span className="text-[9px] sm:text-[11px] text-white/45">/mo</span>
              </div>
              <div
                className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[12px] font-semibold ${p.featured ? 'text-gold' : 'text-white/65'} group-hover:text-gold transition-colors`}
              >
                {p.key === 'starter' ? 'Start free' : p.key === 'pro' ? 'Go Pro' : 'Subscribe'}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 md:auto-rows-[280px]">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`luxury-card p-5 sm:p-6 flex flex-col overflow-hidden relative group ${card.span}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(201,165,114,0.3)] bg-[rgba(201,165,114,0.05)] text-gold">
                  {card.icon}
                </div>
                <div
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#22c55e',
                  }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 mr-1 align-middle animate-pulse" />
                  Live
                </div>
              </div>

              <h3 className="text-[17px] sm:text-lg font-bold text-white mb-2 font-[Montserrat]">
                {t(`${card.key}_title`)}
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-white/65 leading-[1.55] mb-3">
                {t(`${card.key}_desc`)}
              </p>

              <div
                className="flex-1 relative rounded-xl overflow-hidden flex items-center justify-center min-h-[100px] p-3"
                style={{
                  background: 'linear-gradient(180deg, rgba(10,15,46,0.4), rgba(10,15,46,0.85))',
                  border: '1px solid rgba(201,165,114,0.1)',
                }}
              >
                {card.viz}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
