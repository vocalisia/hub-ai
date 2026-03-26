'use client'
import { useRouter } from 'next/navigation'

const FILTERS: Record<string, { key: string; label: string }[]> = {
  fr: [
    { key: '', label: 'Tous' },
    { key: 'ch', label: '🇨🇭 Suisse' },
    { key: 'eu', label: '🇪🇺 Europe' },
    { key: 'ca', label: '🇨🇦 Canada' },
    { key: 'us', label: '🇺🇸 USA' }
  ],
  en: [
    { key: '', label: 'All' },
    { key: 'ch', label: '🇨🇭 Switzerland' },
    { key: 'eu', label: '🇪🇺 Europe' },
    { key: 'ca', label: '🇨🇦 Canada' },
    { key: 'us', label: '🇺🇸 USA' }
  ],
  de: [
    { key: '', label: 'Alle' },
    { key: 'ch', label: '🇨🇭 Schweiz' },
    { key: 'eu', label: '🇪🇺 Europa' },
    { key: 'ca', label: '🇨🇦 Kanada' },
    { key: 'us', label: '🇺🇸 USA' }
  ],
  it: [
    { key: '', label: 'Tutti' },
    { key: 'ch', label: '🇨🇭 Svizzera' },
    { key: 'eu', label: '🇪🇺 Europa' },
    { key: 'ca', label: '🇨🇦 Canada' },
    { key: 'us', label: '🇺🇸 USA' }
  ],
}

export default function GeoFilter({ locale, activeFilter }: { locale: string, activeFilter?: string }) {
  const router = useRouter()
  const filters = FILTERS[locale] || FILTERS.fr

  return (
    <div className="flex gap-2 mb-8 justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => router.push(f.key ? `/${locale}/blog?geo=${f.key}` : `/${locale}/blog`)}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex-shrink-0 min-h-[44px] ${
            (activeFilter || '') === f.key
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
