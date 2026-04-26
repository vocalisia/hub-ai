'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

const CONSENT_KEY = 'hub_cookies'

const TEXT = {
  en: {
    msg: 'We use analytics cookies to improve your experience and measure site performance. You can accept or decline.',
    learn: 'Learn more',
    accept: 'Accept',
    decline: 'Decline',
  },
  fr: {
    msg: "Nous utilisons des cookies analytiques pour ameliorer votre experience et mesurer les performances du site. Vous pouvez accepter ou refuser.",
    learn: 'En savoir plus',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  de: {
    msg: 'Wir verwenden Analyse-Cookies, um Ihre Erfahrung zu verbessern und die Website-Leistung zu messen. Sie koennen akzeptieren oder ablehnen.',
    learn: 'Mehr erfahren',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  it: {
    msg: 'Utilizziamo cookie analitici per migliorare la tua esperienza e misurare le prestazioni del sito. Puoi accettare o rifiutare.',
    learn: 'Scopri di piu',
    accept: 'Accetta',
    decline: 'Rifiuta',
  },
} as const

type LocaleKey = keyof typeof TEXT

export default function CookieBanner() {
  const locale = useLocale()
  const [visible, setVisible] = useState(false)
  const t = TEXT[(locale as LocaleKey) in TEXT ? (locale as LocaleKey) : 'en']

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function updateConsent(analytics: 'granted' | 'denied') {
    type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }
    if (typeof window === 'undefined') return
    const w = window as GtagWindow
    if (typeof w.gtag === 'function') {
      w.gtag('consent', 'update', {
        analytics_storage: analytics,
        ad_storage: 'denied',
      })
    }
  }

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    updateConsent('granted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    updateConsent('denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6"
      style={{
        background: 'rgba(10,15,46,0.96)',
        borderTop: '1px solid rgba(201,165,114,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-[13px] sm:text-sm text-white/80 leading-relaxed">
          {t.msg}{' '}
          <a href={`/${locale}/privacy`} className="underline text-gold hover:opacity-80">
            {t.learn}
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded-full px-5 py-2 text-[13px] font-semibold text-white/85 transition-colors"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full px-5 py-2 text-[13px] font-bold transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #C9A572, #AD7D4E)',
              color: '#0a0f2e',
            }}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
