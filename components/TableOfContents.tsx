'use client'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

const LABELS = {
  fr: 'Sommaire',
  en: 'Table of Contents',
  de: 'Inhaltsverzeichnis',
  it: 'Sommario',
}

export default function TableOfContents({ content, locale }: { content: string; locale: string }) {
  const [active, setActive] = useState('')
  const label = LABELS[locale as keyof typeof LABELS] || 'Contents'

  // Parse headings from markdown content
  const headings: Heading[] = []
  const lines = content.split('\n')
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)/)
    if (m) {
      const text = m[2].trim()
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
      headings.push({ id, text, level: m[1].length })
    }
  }

  if (headings.length < 3) return null

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    document.querySelectorAll('h2[id], h3[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">{label}</p>
      <ol className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : 0 }}>
            <a
              href={`#${h.id}`}
              className={`block text-sm leading-snug transition-colors ${
                active === h.id
                  ? 'text-purple-400 font-medium'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
