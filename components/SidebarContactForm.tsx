'use client'

import { useState } from 'react'

export default function SidebarContactForm({ locale }: { locale: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const labels = {
    name: locale === 'en' ? 'Name' : locale === 'de' ? 'Name' : locale === 'it' ? 'Nome' : 'Nom',
    email: 'Email',
    message: locale === 'en' ? 'Message' : locale === 'de' ? 'Nachricht' : locale === 'it' ? 'Messaggio' : 'Message',
    send: locale === 'en' ? 'Send' : locale === 'de' ? 'Senden' : locale === 'it' ? 'Invia' : 'Envoyer',
    sending: locale === 'en' ? 'Sending...' : locale === 'de' ? 'Wird gesendet...' : locale === 'it' ? 'Invio...' : 'Envoi...',
    sent: locale === 'en' ? 'Sent!' : locale === 'de' ? 'Gesendet!' : locale === 'it' ? 'Inviato!' : 'Envoye !',
    error: locale === 'en' ? 'Error - Try again' : locale === 'de' ? 'Fehler - Erneut versuchen' : locale === 'it' ? 'Errore - Riprova' : 'Erreur - Reessayez',
    title: locale === 'en' ? 'Send a message' : locale === 'de' ? 'Nachricht senden' : locale === 'it' ? 'Invia un messaggio' : 'Envoyer un message',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0ab0bb41-b3fc-46cd-9498-7007bb919de5',
          subject: `ai-due.com - Nouveau message de ${formData.name}`,
          from_site: 'ai-due.com',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Failed')
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors'

  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <h3 className="text-white font-semibold text-sm mb-4">{labels.title}</h3>
      {status === 'sent' ? (
        <p className="text-green-400 text-sm text-center py-4">{labels.sent}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.name}
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={labels.email}
            className={inputClass}
          />
          <textarea
            name="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder={labels.message}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
              status === 'error'
                ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-wait'
            }`}
          >
            {status === 'sending' ? labels.sending : status === 'error' ? labels.error : labels.send}
          </button>
        </form>
      )}
    </div>
  )
}
