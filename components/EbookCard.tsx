'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface EbookData {
  id: string
  title: string
  subtitle: string
  description: string
  chapters: string[]
  chapterCount: number
  pageCount: number
  tags: string[]
  crossLinks: { label: string; url: string }[]
  gradient: string
  icon: string
}

interface Props {
  ebook: EbookData
  index?: number
}

export default function EbookCard({ ebook, index = 0, locale = 'fr' }: Props & { locale?: string }) {
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ebook-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, ebookId: ebook.id }),
      })

      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      // Trigger direct PDF download
      if (data.downloadUrl) {
        const a = document.createElement('a')
        a.href = data.downloadUrl
        a.download = data.downloadUrl.split('/').pop() || 'ebook.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      setSuccess(true)
    } catch {
      setError('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
        className="group"
      >
        <div className="relative bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-[#DAA520]/40 hover:shadow-[0_0_40px_rgba(218,165,32,0.08)]">
          {/* Top gold gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Book cover mockup */}
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0" style={{ background: ebook.gradient }} />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-5xl">{ebook.icon}</span>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1f] to-transparent" />
            <div className="absolute bottom-4 left-6 flex gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <svg className="w-3.5 h-3.5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {ebook.chapterCount} chapitres
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <svg className="w-3.5 h-3.5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {ebook.pageCount} pages
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex gap-1.5 flex-wrap mb-4">
              {ebook.tags.map(tag => (
                <span key={tag} className="text-[11px] text-[#FFD700]/80 bg-[#FFD700]/[0.06] px-2.5 py-1 rounded-full border border-[#FFD700]/10 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
              {ebook.title}
            </h2>
            <p className="text-purple-400/70 text-sm font-medium mb-3">{ebook.subtitle}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{ebook.description}</p>

            {/* Expandable chapters */}
            <div className="mb-5">
              <button
                onClick={() => setChaptersOpen(!chaptersOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#FFD700] transition-colors w-full"
              >
                <svg className={`w-4 h-4 transition-transform duration-300 ${chaptersOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Table des matieres
                <span className="text-gray-600 text-xs">({ebook.chapters.length} chapitres)</span>
              </button>
              <AnimatePresence>
                {chaptersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-1.5 pl-6 border-l border-[#FFD700]/10">
                      {ebook.chapters.map((chapter, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="text-sm text-gray-500 flex items-start gap-2"
                        >
                          <span className="text-[#FFD700]/50 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                          {chapter}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cross-links */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ebook.crossLinks.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-purple-400/70 hover:text-purple-300 bg-purple-500/[0.06] px-2.5 py-1 rounded-full border border-purple-500/10 font-medium transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3 min-h-[48px] rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-[#FFD700]/10 to-[#DAA520]/10 text-[#FFD700] border border-[#FFD700]/20 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/15 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Telecharger le eBook
            </button>
          </div>
        </div>
      </motion.div>

      {/* Email capture modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => !loading && setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a1f] rounded-2xl border border-white/[0.08] p-5 sm:p-8 w-full max-w-md mx-4 sm:mx-0"
            >
              {success ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Email envoye !</h3>
                  <p className="text-gray-400 text-sm">Verifiez votre boite mail pour telecharger <strong className="text-white">{ebook.title}</strong></p>
                  <button
                    onClick={() => { setModalOpen(false); setSuccess(false); setEmail(''); setName('') }}
                    className="mt-6 px-6 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl" style={{ background: ebook.gradient }}>
                      {ebook.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{ebook.title}</h3>
                      <p className="text-gray-500 text-xs">{ebook.pageCount} pages — Gratuit</p>
                    </div>
                  </div>

                  <form onSubmit={handleDownload} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Votre prenom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Votre email *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-premium"
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 min-h-[48px] rounded-xl text-sm font-bold bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Envoi en cours...' : 'Recevoir le eBook par email'}
                    </button>
                    <p className="text-gray-600 text-xs text-center">Aucun spam. Desabonnement en un clic.</p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
