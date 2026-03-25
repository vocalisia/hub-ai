'use client'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Footer() {
  const locale = useLocale()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#030014]">
      {/* Gradient divider */}
      <div className="gradient-divider" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm group-hover:scale-110 transition-transform">
                H
              </div>
              <span className="text-white font-bold text-lg">
                Hub <span className="text-purple-400">AI</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Global AI Ecosystem — Connecting AI innovation across Switzerland, Europe, Canada and USA.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {/* Twitter/X */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/[0.06] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/[0.06] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/[0.06] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/[0.06] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/carte`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  AI Map
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Regions</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/blog?geo=ch`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Suisse
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog?geo=eu`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Europe
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog?geo=ca`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Canada
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog?geo=us`} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  USA
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  AI Glossary
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs">
            {currentYear} Hub AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-700">
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
