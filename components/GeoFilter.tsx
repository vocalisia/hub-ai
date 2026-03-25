'use client'
import { useRouter } from 'next/navigation'

const FILTERS = [
  { key: '', label: 'Tous' },
  { key: 'ch', label: '🇨🇭 Suisse' },
  { key: 'eu', label: '🇪🇺 Europe' },
  { key: 'ca', label: '🇨🇦 Canada' },
  { key: 'us', label: '🇺🇸 USA' }
]

export default function GeoFilter({ locale, activeFilter }: { locale: string, activeFilter?: string }) {
  const router = useRouter()

  return (
    <div className="flex gap-2 mb-8 flex-wrap justify-center">
      {FILTERS.map(f => (
        <button
          key={f.key}
          onClick={() => router.push(f.key ? `/${locale}/blog?geo=${f.key}` : `/${locale}/blog`)}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
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
