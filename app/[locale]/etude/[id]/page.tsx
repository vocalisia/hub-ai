'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import type { MarketResearchResult, Persona } from '@/app/api/market-research/route'

const i18n: Record<string, Record<string, string>> = {
  fr: {
    badge: 'ÉTUDE DE MARCHÉ IA',
    title: 'Résultats de simulation',
    intent_label: 'Intention d\'achat moyenne',
    would_buy: 'achèteraient',
    price_sens_label: 'Sensibilité prix',
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
    top_segment: 'Segment prioritaire',
    objections_title: 'Principales objections',
    resonators_title: 'Ce qui résonne le plus',
    personas_title: 'Acheteurs simulés',
    high_intent: 'Intention haute',
    med_intent: 'Intention moyenne',
    low_intent: 'Intention faible',
    no_intent: 'Pas intéressé',
    decision_maker: 'Décideur',
    not_dm: 'Non-décideur',
    report_title: 'Analyse exécutive',
    price_range_title: 'Fourchette de prix recommandée',
    tips_title: 'Conseils go-to-market',
    roi_title: 'ROI vs étude traditionnelle',
    new_study: 'Nouvelle simulation',
    contact_cta: 'Obtenir un accompagnement',
    demo_note: 'Mode démo — configurez ANTHROPIC_API_KEY pour des résultats réels',
    loading: 'Chargement…',
  },
  en: {
    badge: 'AI MARKET RESEARCH',
    title: 'Simulation Results',
    intent_label: 'Average purchase intent',
    would_buy: 'would buy',
    price_sens_label: 'Price sensitivity',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    top_segment: 'Priority segment',
    objections_title: 'Top objections',
    resonators_title: 'What resonates most',
    personas_title: 'Simulated buyers',
    high_intent: 'High intent',
    med_intent: 'Medium intent',
    low_intent: 'Low intent',
    no_intent: 'Not interested',
    decision_maker: 'Decision maker',
    not_dm: 'Non-decision maker',
    report_title: 'Executive analysis',
    price_range_title: 'Recommended price range',
    tips_title: 'Go-to-market tips',
    roi_title: 'ROI vs traditional study',
    new_study: 'New simulation',
    contact_cta: 'Get expert guidance',
    demo_note: 'Demo mode — configure ANTHROPIC_API_KEY for real results',
    loading: 'Loading…',
  },
  de: {
    badge: 'KI-MARKTFORSCHUNG',
    title: 'Simulationsergebnisse',
    intent_label: 'Durchschnittliche Kaufabsicht',
    would_buy: 'würden kaufen',
    price_sens_label: 'Preissensitivität',
    low: 'Gering',
    medium: 'Mittel',
    high: 'Hoch',
    top_segment: 'Prioritätssegment',
    objections_title: 'Haupteinwände',
    resonators_title: 'Was am meisten resoniert',
    personas_title: 'Simulierte Käufer',
    high_intent: 'Hohe Absicht',
    med_intent: 'Mittlere Absicht',
    low_intent: 'Geringe Absicht',
    no_intent: 'Kein Interesse',
    decision_maker: 'Entscheider',
    not_dm: 'Kein Entscheider',
    report_title: 'Führungsanalyse',
    price_range_title: 'Empfohlene Preisspanne',
    tips_title: 'Go-to-Market-Tipps',
    roi_title: 'ROI vs. traditionelle Studie',
    new_study: 'Neue Simulation',
    contact_cta: 'Expertenberatung anfragen',
    demo_note: 'Demo-Modus — konfigurieren Sie ANTHROPIC_API_KEY für echte Ergebnisse',
    loading: 'Laden…',
  },
  it: {
    badge: 'RICERCA DI MERCATO IA',
    title: 'Risultati della simulazione',
    intent_label: 'Intenzione d\'acquisto media',
    would_buy: 'comprerebbero',
    price_sens_label: 'Sensibilità al prezzo',
    low: 'Bassa',
    medium: 'Media',
    high: 'Alta',
    top_segment: 'Segmento prioritario',
    objections_title: 'Principali obiezioni',
    resonators_title: 'Cosa risuona di più',
    personas_title: 'Acquirenti simulati',
    high_intent: 'Alta intenzione',
    med_intent: 'Media intenzione',
    low_intent: 'Bassa intenzione',
    no_intent: 'Non interessato',
    decision_maker: 'Decisore',
    not_dm: 'Non-decisore',
    report_title: 'Analisi esecutiva',
    price_range_title: 'Fascia di prezzo consigliata',
    tips_title: 'Consigli go-to-market',
    roi_title: 'ROI vs studio tradizionale',
    new_study: 'Nuova simulazione',
    contact_cta: 'Ottieni supporto esperto',
    demo_note: 'Modalità demo — configura ANTHROPIC_API_KEY per risultati reali',
    loading: 'Caricamento…',
  },
}

const intentColor: Record<Persona['purchase_intent'], string> = {
  high: '#22c55e',
  medium: '#f59e0b',
  low: '#94a3b8',
  none: '#ef4444',
}

const sensColor = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' }

export default function EtudePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ?? ''
  const locale = useLocale()
  const t = i18n[locale] ?? i18n.fr

  const [data, setData] = useState<MarketResearchResult | null>(null)

  useEffect(() => {
    if (!id) return
    const cached = sessionStorage.getItem(`study-${id}`)
    if (cached) {
      try {
        setData(JSON.parse(cached) as MarketResearchResult)
        return
      } catch {}
    }
    setData(null)
  }, [id])

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0a0f2e] text-white flex items-center justify-center">
        <div className="text-white/60 text-sm">{t.loading}</div>
      </main>
    )
  }

  const isDemo = data.personas.length === 0
  const intentBarWidth = data.avg_purchase_intent
  const wouldBuyWidth = data.would_buy_pct

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)' }} />
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(201,165,114,0.08)' }} />

        <div className="relative max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <div className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.badge}
            </div>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.5px] mb-3 font-[Montserrat]">{t.title}</h1>
            <p className="text-white/60 text-sm font-mono mb-2">{id}</p>
            {data.product_summary && <p className="text-white/75 max-w-2xl mx-auto">{data.product_summary}</p>}
          </motion.div>

          {/* KPIs top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Purchase intent */}
            <div className="col-span-2 rounded-3xl p-6" style={{ border: '1px solid rgba(201,165,114,0.22)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">{t.intent_label}</div>
              <div className="text-5xl font-extrabold gradient-text-luxury font-[Montserrat] leading-none mb-3">
                {data.avg_purchase_intent}<span className="text-2xl">/100</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #C9A572, #22c55e)' }} initial={{ width: 0 }} animate={{ width: `${intentBarWidth}%` }} transition={{ duration: 1.2 }} />
              </div>
              <div className="text-sm text-white/70">
                <span className="text-emerald-400 font-bold text-xl">{data.would_buy_pct}%</span>
                {' '}{t.would_buy}
              </div>
              <div className="h-2 rounded-full overflow-hidden mt-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full bg-emerald-400" initial={{ width: 0 }} animate={{ width: `${wouldBuyWidth}%` }} transition={{ duration: 1.2, delay: 0.3 }} />
              </div>
            </div>

            {/* Price sensitivity */}
            <div className="rounded-3xl p-5 flex flex-col justify-between" style={{ border: '1px solid rgba(201,165,114,0.22)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">{t.price_sens_label}</div>
              <div className="text-3xl font-extrabold font-[Montserrat]" style={{ color: sensColor[data.price_sensitivity] }}>
                {t[data.price_sensitivity]}
              </div>
              <div className="text-xs text-white/50 mt-1">{data.recommended_price_range}</div>
            </div>

            {/* Top segment */}
            <div className="rounded-3xl p-5 flex flex-col justify-between" style={{ border: '1px solid rgba(201,165,114,0.22)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">{t.top_segment}</div>
              <p className="text-sm text-white/85 leading-snug">{data.top_segment}</p>
            </div>
          </motion.div>

          {/* Objections + Resonators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="rounded-3xl p-6" style={{ border: '1px solid rgba(239,68,68,0.2)', background: 'linear-gradient(135deg, rgba(239,68,68,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#ef4444' }}>⚠ {t.objections_title}</div>
              <div className="space-y-2">
                {data.top_objections.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.04)' }}>
                    <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>{i + 1}</span>
                    <span className="text-sm text-white/85">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-6" style={{ border: '1px solid rgba(34,197,94,0.2)', background: 'linear-gradient(135deg, rgba(34,197,94,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#22c55e' }}>✓ {t.resonators_title}</div>
              <div className="space-y-2">
                {data.top_resonators.map((res, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ border: '1px solid rgba(34,197,94,0.15)', background: 'rgba(34,197,94,0.04)' }}>
                    <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>{i + 1}</span>
                    <span className="text-sm text-white/85">{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Personas */}
          {data.personas.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-3xl p-6 sm:p-8" style={{ border: '1px solid rgba(201,165,114,0.22)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-5">{t.personas_title} ({data.personas.length})</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.personas.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="p-4 rounded-2xl"
                    style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs" style={{ background: 'linear-gradient(135deg, #C9A572, #AD7D4E)', color: '#0a0f2e' }}>
                          {p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">{p.name}, {p.age} ans</div>
                          <div className="text-[11px] text-white/55">{p.role} · {p.location}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ background: `${intentColor[p.purchase_intent]}20`, color: intentColor[p.purchase_intent] }}>
                          {t[`${p.purchase_intent}_intent` as keyof typeof t] ?? p.purchase_intent}
                        </span>
                        <span className="text-[10px] font-bold text-gold">{p.intent_score}/100</span>
                      </div>
                    </div>
                    {p.company_size && <div className="text-[11px] text-white/45 mb-2">{p.company_size} · {p.budget_range}</div>}
                    <p className="text-[13px] text-white/75 italic leading-snug mb-2">"{p.quote}"</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-[11px] p-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
                        <span className="text-[#ef4444] font-semibold">⚠ </span>
                        <span className="text-white/60">{p.key_objection}</span>
                      </div>
                      <div className="text-[11px] p-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                        <span className="text-emerald-400 font-semibold">✓ </span>
                        <span className="text-white/60">{p.what_resonates}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Executive report */}
          {data.executive_summary && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="rounded-3xl p-6 sm:p-8" style={{ border: '1px solid rgba(201,165,114,0.3)', background: 'linear-gradient(135deg, rgba(201,165,114,0.06), rgba(10,15,46,0.7))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-4">{t.report_title}</div>
              <div className="text-[15px] text-white/85 leading-[1.75] whitespace-pre-line">{data.executive_summary}</div>
            </motion.div>
          )}

          {/* GTM Tips */}
          {data.go_to_market_tips?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="rounded-3xl p-6 sm:p-8" style={{ border: '1px solid rgba(201,165,114,0.22)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))' }}>
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-4">🚀 {t.tips_title}</div>
              <div className="space-y-3">
                {data.go_to_market_tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-[#0a0f2e]" style={{ background: 'linear-gradient(135deg, #C9A572, #AD7D4E)' }}>{i + 1}</span>
                    <span className="text-sm text-white/85 pt-0.5">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ROI */}
          {data.roi_vs_traditional && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="rounded-3xl p-5 flex items-center gap-4" style={{ border: '1px solid rgba(201,165,114,0.2)', background: 'rgba(201,165,114,0.04)' }}>
              <span className="text-3xl shrink-0">💰</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-1">{t.roi_title}</div>
                <p className="text-sm text-white/85">{data.roi_vs_traditional}</p>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Link href={`/${locale}/recherche`} className="btn-gold-outline">{t.new_study}</Link>
            <Link href={`/${locale}/contact`} className="btn-gold">{t.contact_cta}</Link>
          </div>

          {isDemo && (
            <p className="text-center text-[12px] text-white/40 mt-4">{t.demo_note}</p>
          )}
        </div>
      </section>
    </main>
  )
}
