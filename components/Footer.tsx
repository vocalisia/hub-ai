'use client'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Footer() {
  const locale = useLocale()

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-xs">
              H
            </div>
            <span className="text-gray-500 text-sm">
              Hub <span className="text-gray-400">AI</span> — Global AI Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-gray-400 transition-colors">Home</Link>
            <Link href={`/${locale}/carte`} className="hover:text-gray-400 transition-colors">Map</Link>
            <Link href={`/${locale}/blog`} className="hover:text-gray-400 transition-colors">Blog</Link>
          </div>

          <div className="text-gray-700 text-xs">
            2025 Hub AI
          </div>
        </div>
      </div>
    </footer>
  )
}
