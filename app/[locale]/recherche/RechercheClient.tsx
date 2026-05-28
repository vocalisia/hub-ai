'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

const SECTORS = [
  { value: 'saas', labelFr: 'SaaS / Tech', labelEn: 'SaaS / Tech' },
  { value: 'ecommerce', labelFr: 'E-commerce / Retail', labelEn: 'E-commerce / Retail' },
  { value: 'marketing', labelFr: 'Marketing / Publicité', labelEn: 'Marketing / Advertising' },
  { value: 'finance', labelFr: 'Finance / Fintech', labelEn: 'Finance / Fintech' },
  { value: 'sante', labelFr: 'Santé / MedTech', labelEn: 'Health / MedTech' },
  { value: 'rh', labelFr: 'RH / Formation', labelEn: 'HR / Training' },
  { value: 'immobilier', labelFr: 'Immobilier / PropTech', labelEn: 'Real Estate / PropTech' },
  { value: 'industrie', labelFr: 'Industrie / Logistique', labelEn: 'Industry / Logistics' },
  { value: 'autre', labelFr: 'Autre', labelEn: 'Other' },
]

const i18n: Record<string, Record<string, string>> = {
  fr: {
    kicker: 'SIMULATEUR DE MARCHÉ IA',
    title1: 'Testez votre produit sur',
    title2: '10 000 Français IA',
    subtitle: 'Obtenez les réactions d\'acheteurs français simulés en quelques minutes. Remplacez études à 50 000 € par une simulation IA précise basée sur les données INSEE.',
    label_product: 'Votre produit / campagne',
    placeholder_product: 'Décrivez votre produit, service ou campagne marketing. Ex: "Un SaaS de facturation automatique pour PME françaises, abonnement mensuel, interface en français, conforme RGPD, intégration Pennylane..."',
    label_audience: 'Audience cible',
    placeholder_audience: 'Ex: Dirigeants PME 10-50 salariés, secteur IT, budget annuel 5-20K€...',
    label_sector: 'Secteur',
    label_buyer: 'Type d\'acheteur',
    b2b: 'B2B',
    b2c: 'B2C',
    both: 'B2B + B2C',
    label_count: 'Acheteurs simulés',
    btn_simulate: 'Lancer la simulation',
    btn_loading: 'Simulation en cours…',
    trust: '86% de corrélation avec études réelles · Basé sur données INSEE · RGPD by design',
    stat1_val: '< 5 min',
    stat1_label: 'vs 6 semaines',
    stat2_val: '× 10',
    stat2_label: 'moins cher',
    stat3_val: '10–15',
    stat3_label: 'personas FR réels',
    stat4_val: '86%',
    stat4_label: 'corrélation',
    placeholder_note: 'Plus votre description est précise, plus la simulation est précise.',
  },
  en: {
    kicker: 'AI MARKET RESEARCH SIMULATOR',
    title1: 'Test your product on',
    title2: '10,000 AI French buyers',
    subtitle: 'Get reactions from simulated French buyers in minutes. Replace €50,000 studies with precise AI simulation based on INSEE data.',
    label_product: 'Your product / campaign',
    placeholder_product: 'Describe your product, service or marketing campaign. E.g: "An automated billing SaaS for French SMEs, monthly subscription, French interface, GDPR compliant, Pennylane integration..."',
    label_audience: 'Target audience',
    placeholder_audience: 'E.g: SME owners 10-50 employees, IT sector, annual budget 5-20K€...',
    label_sector: 'Sector',
    label_buyer: 'Buyer type',
    b2b: 'B2B',
    b2c: 'B2C',
    both: 'B2B + B2C',
    label_count: 'Simulated buyers',
    btn_simulate: 'Launch simulation',
    btn_loading: 'Simulating…',
    trust: '86% correlation with real studies · Based on INSEE data · GDPR by design',
    stat1_val: '< 5 min',
    stat1_label: 'vs 6 weeks',
    stat2_val: '× 10',
    stat2_label: 'cheaper',
    stat3_val: '10–15',
    stat3_label: 'real FR personas',
    stat4_val: '86%',
    stat4_label: 'correlation',
    placeholder_note: 'The more precise your description, the more accurate the simulation.',
  },
  de: {
    kicker: 'KI-MARKTFORSCHUNGS-SIMULATOR',
    title1: 'Testen Sie Ihr Produkt bei',
    title2: '10.000 KI-Franzosen',
    subtitle: 'Erhalten Sie Reaktionen simulierter französischer Käufer in Minuten. Ersetzen Sie 50.000 € Studien durch präzise KI-Simulation.',
    label_product: 'Ihr Produkt / Kampagne',
    placeholder_product: 'Beschreiben Sie Ihr Produkt, Dienstleistung oder Marketingkampagne...',
    label_audience: 'Zielgruppe',
    placeholder_audience: 'Z.B: KMU-Inhaber 10-50 Mitarbeiter, IT-Sektor...',
    label_sector: 'Sektor',
    label_buyer: 'Käufertyp',
    b2b: 'B2B',
    b2c: 'B2C',
    both: 'B2B + B2C',
    label_count: 'Simulierte Käufer',
    btn_simulate: 'Simulation starten',
    btn_loading: 'Simulation läuft…',
    trust: '86% Korrelation mit realen Studien · Basierend auf INSEE-Daten',
    stat1_val: '< 5 Min',
    stat1_label: 'vs 6 Wochen',
    stat2_val: '× 10',
    stat2_label: 'günstiger',
    stat3_val: '10–15',
    stat3_label: 'FR-Personas',
    stat4_val: '86%',
    stat4_label: 'Korrelation',
    placeholder_note: 'Je präziser Ihre Beschreibung, desto genauer die Simulation.',
  },
  it: {
    kicker: 'SIMULATORE DI RICERCA DI MERCATO IA',
    title1: 'Testa il tuo prodotto su',
    title2: '10.000 francesi IA',
    subtitle: 'Ottieni le reazioni di acquirenti francesi simulati in pochi minuti. Sostituisci studi da 50.000 € con simulazioni IA precise.',
    label_product: 'Il tuo prodotto / campagna',
    placeholder_product: 'Descrivi il tuo prodotto, servizio o campagna marketing...',
    label_audience: 'Pubblico target',
    placeholder_audience: 'Es: Proprietari PMI 10-50 dipendenti, settore IT...',
    label_sector: 'Settore',
    label_buyer: 'Tipo di acquirente',
    b2b: 'B2B',
    b2c: 'B2C',
    both: 'B2B + B2C',
    label_count: 'Acquirenti simulati',
    btn_simulate: 'Avvia simulazione',
    btn_loading: 'Simulazione in corso…',
    trust: '86% correlazione con studi reali · Basato su dati INSEE',
    stat1_val: '< 5 min',
    stat1_label: 'vs 6 settimane',
    stat2_val: '× 10',
    stat2_label: 'più economico',
    stat3_val: '10–15',
    stat3_label: 'personas FR reali',
    stat4_val: '86%',
    stat4_label: 'correlazione',
    placeholder_note: 'Più precisa è la descrizione, più accurata è la simulazione.',
  },
}

export default function RechercheClient() {
  const locale = useLocale()
  const router = useRouter()
  const t = i18n[locale] ?? i18n.fr
  const isFr = locale === 'fr'

  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [sector, setSector] = useState('saas')
  const [buyerType, setBuyerType] = useState<'b2b' | 'b2c' | 'both'>('b2b')
  const [count] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (product.trim().length < 10) {
      setError(isFr ? 'Décrivez votre produit (min 10 caractères)' : 'Describe your product (min 10 chars)')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/market-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, audience, sector, buyer_type: buyerType, count, locale }),
      })
      const data = await res.json() as { ok: boolean; studyId?: string; error?: string }
      if (!data.ok) {
        setError(data.error ?? 'Simulation failed')
        return
      }
      const sid = data.studyId ?? `study-${Date.now()}`
      sessionStorage.setItem(`study-${sid}`, JSON.stringify(data))
      router.push(`/${locale}/etude/${sid}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { val: t.stat1_val, label: t.stat1_label },
    { val: t.stat2_val, label: t.stat2_label },
    { val: t.stat3_val, label: t.stat3_label },
    { val: t.stat4_val, label: t.stat4_label },
  ]

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-28 px-4 sm:px-6 overflow-hidden">
        {/* Background */}
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)' }} />
        <div aria-hidden className="absolute -top-1/2 left-0 right-0 h-[200%] pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(201,165,114,0.10), transparent 50%), radial-gradient(circle at 70% 60%, rgba(201,165,114,0.06), transparent 50%)' }} />

        {/* Particles */}
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: '#AD7D4E',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <div className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t.kicker}
            </div>
            <h1 className="text-[clamp(30px,5vw,54px)] font-extrabold tracking-[-0.5px] leading-[1.05] mb-5">
              {t.title1}{' '}
              <span className="gradient-text-luxury">{t.title2}</span>
            </h1>
            <p className="text-[17px] text-white/75 max-w-2xl mx-auto leading-[1.7]">{t.subtitle}</p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center rounded-2xl py-4 px-3" style={{ border: '1px solid rgba(201,165,114,0.18)', background: 'linear-gradient(135deg, rgba(201,165,114,0.05), transparent)' }}>
                <div className="text-[clamp(22px,3vw,32px)] font-extrabold gradient-text-luxury font-[Montserrat] leading-none mb-1">{s.val}</div>
                <div className="text-[10px] text-white/55 uppercase tracking-[1.5px] font-semibold">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={onSubmit}
            className="rounded-3xl p-8 md:p-12 space-y-7"
            style={{ border: '1px solid rgba(201,165,114,0.2)', background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))', backdropFilter: 'blur(12px)', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}
          >
            {/* Product */}
            <div>
              <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">{t.label_product}</label>
              <textarea
                rows={5}
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder={t.placeholder_product}
                className="w-full rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors"
                style={{ border: '1px solid rgba(201,165,114,0.2)', background: 'rgba(255,255,255,0.02)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,114,0.55)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,114,0.2)' }}
              />
              <p className="mt-2 text-[12px] text-white/40">{t.placeholder_note}</p>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">{t.label_audience}</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder={t.placeholder_audience}
                className="w-full rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors"
                style={{ border: '1px solid rgba(201,165,114,0.2)', background: 'rgba(255,255,255,0.02)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,114,0.55)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,114,0.2)' }}
              />
            </div>

            {/* Sector + Buyer type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">{t.label_sector}</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{ border: '1px solid rgba(201,165,114,0.2)', background: 'rgba(10,15,46,0.8)' }}
                >
                  {SECTORS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {locale === 'fr' ? s.labelFr : s.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">{t.label_buyer}</label>
                <div className="flex rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,165,114,0.2)' }}>
                  {(['b2b', 'b2c', 'both'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setBuyerType(v)}
                      className="flex-1 py-3 text-sm font-semibold transition-all"
                      style={{
                        background: buyerType === v ? 'linear-gradient(135deg, #C9A572, #AD7D4E)' : 'rgba(255,255,255,0.02)',
                        color: buyerType === v ? '#0a0f2e' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {t[v as 'b2b' | 'b2c' | 'both']}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t.btn_loading}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {t.btn_simulate}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>

            {error && (
              <div className="rounded-xl p-3 text-sm text-center" style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <p className="text-center text-xs text-white/45">{t.trust}</p>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
