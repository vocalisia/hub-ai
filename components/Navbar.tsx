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
        background: 'rgba(10,15,46,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,165,114,0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="flex items-center justify-between h-[68px] gap-4">
          {/* Logo with 3D */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-11 h-11 group-hover:scale-110 transition-transform">
              <Logo3D size="small" />
            </div>
            <span className="text-white font-bold text-lg font-[Montserrat] tracking-tight">
              AI-<span className="gradient-text-luxury">DUE</span>
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
                  style={{ color: isActive ? '#AD7D4E' : 'rgba(255,255,255,0.82)' }}
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
                  color: '#AD7D4E',
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
              style={{ background: '#AD7D4E', color: '#0a0f2e' }}
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
                  background: '#AD7D4E',
                  transform: mobileOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-6 h-[2.5px] rounded-sm transition-all duration-300"
                style={{ background: '#AD7D4E', opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-[2.5px] rounded-sm transition-all duration-300"
                style={{
                  background: '#AD7D4E',
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
