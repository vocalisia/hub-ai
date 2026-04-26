'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { JOBS_BY_LOCALE, UI, type Job, type CareersUI } from '@/lib/careers-data'

type LocaleKey = keyof typeof UI

function pickLocale(loc: string): LocaleKey {
  return (['en', 'fr', 'de', 'it'] as LocaleKey[]).includes(loc as LocaleKey)
    ? (loc as LocaleKey)
    : 'en'
}

function ApplyModal({
  jobTitle,
  ui,
  onClose,
}: {
  jobTitle: string
  ui: CareersUI
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cvName, setCvName] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const form = e.target as HTMLFormElement
      const data = new FormData(form)
      data.append('job', jobTitle)
      const res = await fetch('/api/careers/apply', { method: 'POST', body: data })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!json.ok) {
        setError(json.error ?? 'Submission failed')
        return
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #1a2560, #0a0f2e)',
          border: '1px solid rgba(201,165,114,0.3)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-white/60 hover:text-white text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="eyebrow mb-2">{ui.modal_title}</div>
        <h3 className="text-2xl font-extrabold mb-1 font-[Montserrat]">{jobTitle}</h3>
        <p className="text-sm text-white/60 mb-6">{ui.modal_subtitle}</p>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C9A572, #AD7D4E)' }}
            >
              <svg
                className="w-8 h-8 text-[#0a0f2e]"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2 font-[Montserrat]">{ui.modal_success_title}</h4>
            <p className="text-sm text-white/70">{ui.modal_success_desc}</p>
            <button onClick={onClose} className="btn-gold-outline mt-5 inline-flex">
              {ui.modal_close}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3" encType="multipart/form-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                name="name"
                placeholder={ui.modal_name}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,165,114,0.2)',
                }}
              />
              <input
                required
                name="email"
                type="email"
                placeholder={ui.modal_email}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,165,114,0.2)',
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="phone"
                type="tel"
                placeholder={ui.modal_phone}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,165,114,0.2)',
                }}
              />
              <input
                name="location"
                placeholder={ui.modal_location}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,165,114,0.2)',
                }}
              />
            </div>
            <input
              name="linkedin"
              placeholder={ui.modal_linkedin}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-[14px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,165,114,0.2)',
              }}
            />
            <label
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:border-gold/40"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px dashed rgba(201,165,114,0.35)',
              }}
            >
              <svg
                className="w-5 h-5 text-gold shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                />
              </svg>
              <span className={`text-[14px] truncate ${cvName ? 'text-white' : 'text-white/45'}`}>
                {cvName ?? ui.modal_cv}
              </span>
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx,.txt,application/pdf"
                className="hidden"
                onChange={(e) => setCvName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder={ui.modal_msg}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 resize-none text-[14px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,165,114,0.2)',
              }}
            />
            {error && (
              <div
                className="text-[13px] text-center py-2 px-3 rounded-lg"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#fca5a5',
                }}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? ui.modal_loading : ui.modal_send}
            </button>
            <p className="text-[10px] text-white/40 text-center">{ui.modal_disclaimer}</p>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default function CareersPage() {
  const localeRaw = useLocale()
  const locale = pickLocale(localeRaw)
  const ui = UI[locale]
  const jobs = JOBS_BY_LOCALE[locale]
  const [active, setActive] = useState<Job | null>(null)

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
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

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow mb-4">{ui.hero_kicker}</div>
            <h1 className="text-[clamp(28px,5.5vw,60px)] font-extrabold tracking-[-0.5px] leading-[1.05] mb-6">
              {ui.hero_title_1}{' '}
              <span className="gradient-text-luxury">{ui.hero_title_2}</span>
            </h1>
            <p className="text-[15px] sm:text-[17px] text-white/75 max-w-2xl mx-auto mb-8 leading-[1.65]">
              {ui.hero_subtitle}
            </p>
            <button onClick={() => setActive(jobs[0])} className="btn-gold">
              {ui.apply_now}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow text-center mb-3">{ui.open_positions}</div>
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-12 font-[Montserrat]">
            {ui.jobs_heading}
          </h2>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl p-6 sm:p-8"
                style={{
                  border: '1px solid rgba(201,165,114,0.2)',
                  background:
                    'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
                }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{
                      background: 'rgba(201,165,114,0.1)',
                      border: '1px solid rgba(201,165,114,0.3)',
                    }}
                  >
                    {job.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-[Montserrat]">
                      {job.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-5 text-[14px] leading-[1.7]">
                  <Block emoji="🎯" label={ui.mission_label}>
                    <p className="text-white/80">{job.mission}</p>
                  </Block>

                  <Block emoji="⚡" label={ui.duties_label}>
                    <ul className="space-y-2">
                      {job.duties.map((d) => (
                        <li key={d} className="flex gap-2 text-white/80">
                          <span className="text-gold">▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Block>

                  <Block emoji="✅" label={ui.must_label}>
                    <ul className="space-y-2">
                      {job.must.map((m) => (
                        <li key={m} className="flex gap-2 text-white/80">
                          <span className="text-gold">▸</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </Block>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Block emoji="💰" label={ui.comp_label}>
                      <p className="text-white/80">{job.comp}</p>
                    </Block>
                    <Block emoji="🌍" label={ui.remote_label}>
                      <p className="text-white/80">{job.remote}</p>
                    </Block>
                    <Block emoji="📈" label={ui.growth_label}>
                      <p className="text-white/80">{job.growth}</p>
                    </Block>
                    <Block emoji="🌟" label={ui.nice_label}>
                      <p className="text-white/80">{job.nice}</p>
                    </Block>
                  </div>
                </div>

                <button
                  onClick={() => setActive(job)}
                  className="btn-gold mt-6 w-full sm:w-auto justify-center"
                >
                  {ui.send}
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-[Montserrat]">
            {ui.spontaneous_title}
          </h2>
          <p className="text-white/70 mb-8">{ui.spontaneous_desc}</p>
          <Link href={`/${locale}/contact`} className="btn-gold-outline">
            {ui.spontaneous_cta}
          </Link>
        </div>
      </section>

      {active && <ApplyModal jobTitle={active.title} ui={ui} onClose={() => setActive(null)} />}
    </main>
  )
}

function Block({
  emoji,
  label,
  children,
}: {
  emoji: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">
        {emoji} {label}
      </div>
      <div className="text-white/85">{children}</div>
    </div>
  )
}
