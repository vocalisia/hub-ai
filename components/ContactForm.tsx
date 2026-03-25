'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate form submission - replace with actual API endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
            className="input-premium"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@email.com"
            className="input-premium"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="input-premium appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-[#0a0a1f]">Choisir un sujet</option>
          <option value="partnership" className="bg-[#0a0a1f]">Partenariat</option>
          <option value="project" className="bg-[#0a0a1f]">Projet IA</option>
          <option value="consulting" className="bg-[#0a0a1f]">Consulting</option>
          <option value="press" className="bg-[#0a0a1f]">Presse / Media</option>
          <option value="other" className="bg-[#0a0a1f]">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Decrivez votre projet ou votre question..."
          className="input-premium resize-none"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full py-4 rounded-xl font-semibold text-sm transition-all relative overflow-hidden ${
          status === 'sending'
            ? 'bg-purple-600/50 text-purple-200 cursor-wait'
            : status === 'sent'
            ? 'bg-green-600/20 text-green-400 border border-green-500/30'
            : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5'
        }`}
      >
        {status === 'idle' && (
          <span className="flex items-center justify-center gap-2">
            Envoyer le message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}
        {status === 'sending' && (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </span>
        )}
        {status === 'sent' && (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Message envoye !
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center justify-center gap-2 text-red-400">
            Erreur - Reessayez
          </span>
        )}
      </button>

      {status === 'sent' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-400/80 text-sm"
        >
          Merci pour votre message. Nous vous repondrons sous 24h.
        </motion.p>
      )}
    </motion.form>
  )
}
