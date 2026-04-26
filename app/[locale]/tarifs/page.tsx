'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

type Plan = {
  key: 'starter' | 'pro' | 'enterprise'
  price: string
  period: string
  featured?: boolean
  features: readonly string[]
}

const PLANS_EUR: readonly Plan[] = [
  { key: 'starter', price: '0€', period: 'mo', features: ['f1', 'f2', 'f3', 'f4'] },
  {
    key: 'pro',
    price: '49€',
    period: 'mo',
    featured: true,
    features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
  },
  {
    key: 'enterprise',
    price: '499€',
    period: 'mo',
    features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'],
  },
] as const

const PLANS_USD: readonly Plan[] = [
  { key: 'starter', price: '$0', period: 'mo', features: ['f1', 'f2', 'f3', 'f4'] },
  {
    key: 'pro',
    price: '$59',
    period: 'mo',
    featured: true,
    features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
  },
  {
    key: 'enterprise',
    price: '$599',
    period: 'mo',
    features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'],
  },
] as const

export default function TarifsPage() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const PLANS = locale === 'en' ? PLANS_USD : PLANS_EUR

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
          style={{ background: 'rgba(201,165,114,0.12)' }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="eyebrow mb-4">{t('kicker')}</div>
            <h1 className="text-[clamp(32px,5vw,54px)] font-extrabold tracking-[-0.5px] leading-[1.05]">
              {t('title_line_1')}{' '}
              <span className="gradient-text-luxury">{t('title_line_2')}</span>
            </h1>
            <p className="mt-5 text-[17px] text-white/75 max-w-2xl mx-auto leading-[1.7]">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-3xl p-8 md:p-10 flex flex-col"
                style={
                  plan.featured
                    ? {
                        border: '1.5px solid rgba(201,165,114,0.55)',
                        background:
                          'linear-gradient(180deg, rgba(201,165,114,0.10), rgba(201,165,114,0.02) 60%, rgba(10,15,46,0.6))',
                        boxShadow:
                          '0 0 80px rgba(201,165,114,0.18), 0 30px 60px rgba(0,0,0,0.4)',
                      }
                    : {
                        border: '1px solid rgba(201,165,114,0.15)',
                        background:
                          'linear-gradient(135deg, rgba(201,165,114,0.03), rgba(10,15,46,0.5))',
                      }
                }
              >
                {plan.featured && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[1.5px]"
                    style={{
                      background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
                      color: '#0a0f2e',
                      boxShadow: '0 10px 25px rgba(201,165,114,0.35)',
                    }}
                  >
                    ★ {t('popular')}
                  </div>
                )}

                <h3 className="text-[28px] font-extrabold mb-2 font-[Montserrat]">
                  {t(`${plan.key}_name`)}
                </h3>
                <p className="text-[14px] text-white/65 mb-6 min-h-[44px] leading-relaxed">
                  {t(`${plan.key}_desc`)}
                </p>

                <div className="mb-7 flex items-baseline">
                  <span
                    className="text-[56px] font-extrabold leading-none"
                    style={plan.featured ? { color: '#C9A572' } : { color: '#fff' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-white/50 ml-2 text-base">/ {t(plan.period)}</span>
                </div>

                <div
                  className="h-px mb-6"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(201,165,114,0.3), transparent)',
                  }}
                />

                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((fKey) => (
                    <li
                      key={fKey}
                      className="flex items-start gap-3 text-[14px] text-white/80"
                    >
                      <svg
                        className="w-5 h-5 shrink-0 mt-0.5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`${plan.key}_${fKey}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/paiement?plan=${plan.key}`}
                  className={plan.featured ? 'btn-gold w-full justify-center py-3.5' : 'btn-gold-outline w-full justify-center py-3'}
                >
                  {t(`${plan.key}_cta`)}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-[13px] text-white/50">
            {t('footer_note')}
          </div>
        </div>
      </section>
    </main>
  )
}
