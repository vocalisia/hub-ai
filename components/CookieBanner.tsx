'use client'

import { useEffect, useState } from 'react'

const CONSENT_KEY = 'hub_cookies'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'update', { analytics_storage: 'granted' })
    }
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a1a] border-t border-white/10 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-gray-300 leading-relaxed">
          We use analytics cookies to improve your experience and measure site performance.
          You can accept or decline their use.{' '}
          <a href="/privacy" className="underline text-white hover:text-gray-100">
            Learn more
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded px-4 py-2 text-sm font-medium bg-white/10 text-gray-200 hover:bg-white/20 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
