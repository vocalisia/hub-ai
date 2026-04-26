'use client'
import { useState } from 'react'

const LABELS = {
  fr: { title: 'Restez informé', sub: 'Les meilleures ressources IA chaque semaine, directement dans votre boîte mail.', placeholder: 'votre@email.com', btn: 'S\'abonner', ok: 'Merci ! Vérifiez votre email.', err: 'Une erreur est survenue.' },
  en: { title: 'Stay informed', sub: 'The best AI resources every week, straight to your inbox.', placeholder: 'your@email.com', btn: 'Subscribe', ok: 'Thanks! Check your email.', err: 'Something went wrong.' },
  de: { title: 'Informiert bleiben', sub: 'Die besten KI-Ressourcen jede Woche, direkt in Ihrem Posteingang.', placeholder: 'ihre@email.com', btn: 'Abonnieren', ok: 'Danke! Prüfen Sie Ihre E-Mail.', err: 'Ein Fehler ist aufgetreten.' },
  it: { title: 'Rimani aggiornato', sub: 'Le migliori risorse IA ogni settimana, direttamente nella tua casella di posta.', placeholder: 'tua@email.com', btn: 'Iscriviti', ok: 'Grazie! Controlla la tua email.', err: 'Si è verificato un errore.' },
}

export default function NewsletterBox({ locale }: { locale: string }) {
  const l = LABELS[locale as keyof typeof LABELS] || LABELS.fr
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const pubId = process.env.NEXT_PUBLIC_BEEHIIV_PUB_ID
      if (pubId) {
        await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, reactivate_existing: true, send_welcome_email: true }),
        })
      }
      setStatus('ok')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="my-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/10 border border-purple-500/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">{l.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{l.sub}</p>
          {status === 'ok' ? (
            <p className="text-green-400 text-sm font-medium">{l.ok}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={l.placeholder}
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : l.btn}
              </button>
            </form>
          )}
          {status === 'err' && <p className="text-red-400 text-xs mt-2">{l.err}</p>}
        </div>
      </div>
    </div>
  )
}
