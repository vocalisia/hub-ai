'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

type PlanKey = 'starter' | 'pro' | 'enterprise'

const PLAN_PRICES_EUR: Record<PlanKey, { amount: string; label: string }> = {
  starter: { amount: '0€', label: 'Starter' },
  pro: { amount: '49€', label: 'Pro' },
  enterprise: { amount: '499€', label: 'Enterprise' },
}

const PLAN_PRICES_USD: Record<PlanKey, { amount: string; label: string }> = {
  starter: { amount: '$0', label: 'Starter' },
  pro: { amount: '$59', label: 'Pro' },
  enterprise: { amount: '$599', label: 'Enterprise' },
}

export default function PaiementPage() {
  const t = useTranslations('checkout')
  const locale = useLocale()
  const params = useSearchParams()
  const planParam = (params?.get('plan') ?? 'pro') as PlanKey
  const PLAN_PRICES = locale === 'en' ? PLAN_PRICES_USD : PLAN_PRICES_EUR
  const plan = PLAN_PRICES[planParam] ? planParam : 'pro'
  const [loading, setLoading] = useState(false)

  async function onCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, locale }),
      })
      const data: { url?: string; error?: string } = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? t('error_generic'))
      }
    } catch {
      alert(t('error_generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-24 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)' }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'rgba(201,165,114,0.10)' }}
        />

        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="eyebrow mb-4">{t('kicker')}</div>
            <h1 className="text-[clamp(30px,4.5vw,46px)] font-extrabold tracking-[-0.5px] leading-[1.05]">
              {t('title')}
            </h1>
            <p className="mt-4 text-white/70 text-[16px] leading-relaxed">{t('subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl p-8"
            style={{
              border: '1px solid rgba(201,165,114,0.22)',
              background:
                'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div
              className="flex items-center justify-between pb-6"
              style={{ borderBottom: '1px solid rgba(201,165,114,0.15)' }}
            >
              <div>
                <div className="text-[11px] text-gold uppercase tracking-[1.5px] font-semibold mb-1">
                  {t('plan')}
                </div>
                <div className="text-2xl font-bold font-[Montserrat]">
                  {PLAN_PRICES[plan].label}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-gold uppercase tracking-[1.5px] font-semibold mb-1">
                  {t('price')}
                </div>
                <div className="text-[32px] font-extrabold leading-none">
                  <span className="gradient-text-luxury">{PLAN_PRICES[plan].amount}</span>
                  <span className="text-sm text-white/50 ml-1 font-normal">/mo</span>
                </div>
              </div>
            </div>

            <div className="py-6 space-y-3 text-[14px] text-white/80">
              {(['feat_secure', 'feat_cancel', 'feat_invoice'] as const).map((k) => (
                <div key={k} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t(k)}
                </div>
              ))}
            </div>

            <button
              onClick={onCheckout}
              disabled={loading || plan === 'starter'}
              className="btn-gold w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('loading') : plan === 'starter' ? t('free_plan') : t('checkout_stripe')}
            </button>

            <p className="mt-4 text-[11px] text-white/45 text-center uppercase tracking-wider">
              {t('powered_by')}
            </p>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/tarifs`}
              className="text-[14px] text-white/55 hover:text-gold transition-colors"
            >
              ← {t('back')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
