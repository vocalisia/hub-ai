'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'

const Logo3D = dynamic(() => import('./Logo3D'), { ssr: false })

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const LANGS = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
  ]

  const NAV = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/simulateur`, label: t('simulator') },
    { href: `/${locale}/tarifs`, label: t('pricing') },
    { href: `/${locale}/architecture`, label: t('ecosystem') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/careers`, label: t('careers') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(path)
    setLangOpen(false)
    setMobileOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(15,15,35,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(249,115,22,0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="flex items-center justify-between h-[68px] gap-4">
          {/* Logo — DS 2026 minimalist brain glyph */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl grid place-items-center transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #F97316 0%, #9333EA 100%)', boxShadow: '0 8px 22px rgba(147,51,234,0.35)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              AI-<span style={{ background: 'linear-gradient(90deg, #F97316, #9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DUE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-white/82 hover:text-gold'
                  }`}
                  style={{ color: isActive ? '#F97316' : 'rgba(255,255,255,0.82)' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(173,125,78,0.35)',
                  color: '#F97316',
                }}
              >
                {locale.toUpperCase()}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                    style={{
                      background: '#0f1648',
                      border: '1px solid rgba(173,125,78,0.3)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.45)',
                      minWidth: '130px',
                    }}
                  >
                    {LANGS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className={`block w-full px-4 py-2.5 text-sm text-left transition-all ${
                          locale === lang.code
                            ? 'text-gold bg-[rgba(173,125,78,0.15)]'
                            : 'text-white/85 hover:text-gold hover:bg-[rgba(173,125,78,0.1)]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button desktop */}
            <Link
              href={`/${locale}/tarifs`}
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full text-[13px] font-bold transition-opacity hover:opacity-90"
              style={{ background: '#F97316', color: '#0F0F23' }}
            >
              {t('pricing')}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label="Menu"
            >
              <span
                className="block w-6 h-[2.5px] rounded-sm transition-all duration-300"
                style={{
                  background: '#F97316',
                  transform: mobileOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-6 h-[2.5px] rounded-sm transition-all duration-300"
                style={{ background: '#F97316', opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-[2.5px] rounded-sm transition-all duration-300"
                style={{
                  background: '#F97316',
                  transform: mobileOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1" style={{ borderTop: '1px solid rgba(173,125,78,0.18)' }}>
                {NAV.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'text-gold bg-[rgba(173,125,78,0.1)]'
                          : 'text-white/82 hover:text-gold hover:bg-[rgba(173,125,78,0.08)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
