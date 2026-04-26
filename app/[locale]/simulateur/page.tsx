'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SimulateurPage() {
  const t = useTranslations('simulator')
  const locale = useLocale()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!file && !prompt.trim()) {
      setError('Provide a document or a prompt to start.')
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('prompt', prompt)
      formData.append('locale', locale)

      const res = await fetch('/api/miro/start', { method: 'POST', body: formData })
      const data = await res.json() as { ok: boolean; simulationId?: string; error?: string; [k: string]: unknown }

      if (!data.ok) {
        setError(data.error ?? 'Simulation failed')
        return
      }

      const simId = data.simulationId ?? `sim-${Date.now()}`
      sessionStorage.setItem(`sim-${simId}`, JSON.stringify(data))
      router.push(`/${locale}/simulation/${simId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
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
          style={{
            background:
              'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute -top-1/2 left-0 right-0 h-[200%] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgba(201,165,114,0.10), transparent 50%), radial-gradient(circle at 70% 60%, rgba(201,165,114,0.06), transparent 50%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
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

          <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onSubmit={onSubmit}
              className="rounded-3xl p-8 md:p-12 space-y-7"
              style={{
                border: '1px solid rgba(201,165,114,0.2)',
                background:
                  'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
              }}
            >
              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">
                  {t('field_doc')}
                </label>
                <label
                  className="flex flex-col items-center justify-center px-6 py-12 rounded-2xl cursor-pointer transition-all"
                  style={{
                    border: '2px dashed rgba(201,165,114,0.3)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <svg
                    className="w-10 h-10 text-gold mb-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span className="text-[15px] text-white/85 font-medium">
                    {file ? file.name : t('upload_hint')}
                  </span>
                  <span className="mt-1 text-xs text-white/50">
                    PDF, DOCX, TXT · 20MB max
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={onFile}
                    accept=".pdf,.docx,.txt"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[13px] font-semibold uppercase tracking-[1.5px] text-gold mb-3">
                  {t('field_prompt')}
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t('prompt_placeholder')}
                  className="w-full rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors"
                  style={{
                    border: '1px solid rgba(201,165,114,0.2)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,165,114,0.55)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,165,114,0.2)'
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['agents', 'rounds', 'platforms'] as const).map((k, i) => (
                  <div
                    key={k}
                    className="p-5 rounded-2xl"
                    style={{
                      border: '1px solid rgba(201,165,114,0.18)',
                      background:
                        'linear-gradient(135deg, rgba(201,165,114,0.04), transparent)',
                    }}
                  >
                    <div className="text-[10px] text-gold uppercase tracking-[2px] font-semibold mb-1.5">
                      {t(`opt_${k}`)}
                    </div>
                    <div className="text-3xl font-extrabold text-white font-[Montserrat]">
                      {[250, 12, 3][i]}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('loading') || 'Running…' : t('submit')}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {error && (
                <div
                  className="rounded-xl p-3 text-sm text-center"
                  style={{
                    border: '1px solid rgba(239,68,68,0.3)',
                    background: 'rgba(239,68,68,0.08)',
                    color: '#fca5a5',
                  }}
                >
                  {error}
                </div>
              )}
              <p className="text-center text-xs text-white/50">{t('upgrade_note')}</p>
            </motion.form>
        </div>
      </section>
    </main>
  )
}
