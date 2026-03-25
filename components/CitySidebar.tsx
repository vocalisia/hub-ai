'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REGIONS = {
  all: 'All',
  ch: 'Suisse',
  eu: 'Europe',
  ca: 'Canada',
  us: 'USA'
}

interface City {
  name: string
  country: string
  region: string
  active: boolean
}

const CITIES: City[] = [
  // Suisse
  { name: 'Geneve', country: 'CH', region: 'ch', active: true },
  { name: 'Zurich', country: 'CH', region: 'ch', active: true },
  { name: 'Lausanne', country: 'CH', region: 'ch', active: true },
  { name: 'Bern', country: 'CH', region: 'ch', active: false },
  { name: 'Basel', country: 'CH', region: 'ch', active: false },
  { name: 'Lugano', country: 'CH', region: 'ch', active: false },
  // Europe
  { name: 'Paris', country: 'FR', region: 'eu', active: true },
  { name: 'Lyon', country: 'FR', region: 'eu', active: false },
  { name: 'Marseille', country: 'FR', region: 'eu', active: false },
  { name: 'London', country: 'GB', region: 'eu', active: true },
  { name: 'Manchester', country: 'GB', region: 'eu', active: false },
  { name: 'Berlin', country: 'DE', region: 'eu', active: true },
  { name: 'Munich', country: 'DE', region: 'eu', active: false },
  { name: 'Amsterdam', country: 'NL', region: 'eu', active: true },
  { name: 'Stockholm', country: 'SE', region: 'eu', active: true },
  { name: 'Brussels', country: 'BE', region: 'eu', active: false },
  { name: 'Copenhagen', country: 'DK', region: 'eu', active: false },
  { name: 'Madrid', country: 'ES', region: 'eu', active: false },
  { name: 'Barcelona', country: 'ES', region: 'eu', active: false },
  { name: 'Milan', country: 'IT', region: 'eu', active: false },
  { name: 'Rome', country: 'IT', region: 'eu', active: false },
  { name: 'Vienna', country: 'AT', region: 'eu', active: false },
  { name: 'Dublin', country: 'IE', region: 'eu', active: false },
  // Canada
  { name: 'Montreal', country: 'CA', region: 'ca', active: true },
  { name: 'Toronto', country: 'CA', region: 'ca', active: true },
  { name: 'Vancouver', country: 'CA', region: 'ca', active: true },
  { name: 'Ottawa', country: 'CA', region: 'ca', active: false },
  { name: 'Calgary', country: 'CA', region: 'ca', active: false },
  { name: 'Quebec City', country: 'CA', region: 'ca', active: false },
  // USA
  { name: 'San Francisco', country: 'US', region: 'us', active: true },
  { name: 'New York', country: 'US', region: 'us', active: true },
  { name: 'Boston', country: 'US', region: 'us', active: false },
  { name: 'Seattle', country: 'US', region: 'us', active: false },
  { name: 'Los Angeles', country: 'US', region: 'us', active: false },
  { name: 'Austin', country: 'US', region: 'us', active: false },
  { name: 'Chicago', country: 'US', region: 'us', active: false },
  { name: 'Washington', country: 'US', region: 'us', active: false },
]

const COUNTRY_FLAGS: Record<string, string> = {
  CH: '🇨🇭', FR: '🇫🇷', GB: '🇬🇧', DE: '🇩🇪', NL: '🇳🇱', SE: '🇸🇪',
  BE: '🇧🇪', DK: '🇩🇰', ES: '🇪🇸', IT: '🇮🇹', AT: '🇦🇹', IE: '🇮🇪',
  CA: '🇨🇦', US: '🇺🇸'
}

export default function CitySidebar() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCities = CITIES.filter(city => {
    const matchesRegion = activeTab === 'all' || city.region === activeTab
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const activeCount = filteredCities.filter(c => c.active).length
  const totalCount = filteredCities.length

  return (
    <div className="lg:w-[340px] bg-white/[0.015] rounded-3xl border border-white/[0.05] p-5 flex flex-col max-h-[750px]">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-white font-bold text-lg mb-1">Network Nodes</h3>
        <p className="text-gray-600 text-xs">
          <span className="text-purple-400 font-semibold">{activeCount}</span> active / {totalCount} cities
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {Object.entries(REGIONS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === key
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] border border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* City list */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {filteredCities.map((city) => (
            <motion.div
              key={city.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-default ${
                city.active
                  ? 'hover:bg-purple-500/[0.06] border border-transparent hover:border-purple-500/10'
                  : 'hover:bg-white/[0.02] opacity-50'
              }`}
            >
              {/* Status dot */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                city.active
                  ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)]'
                  : 'bg-gray-700'
              }`} />

              {/* Flag */}
              <span className="text-sm flex-shrink-0">{COUNTRY_FLAGS[city.country] || '🌍'}</span>

              {/* City info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${city.active ? 'text-white' : 'text-gray-500'}`}>
                  {city.name}
                </p>
              </div>

              {/* Country code */}
              <span className={`text-[10px] font-mono flex-shrink-0 ${city.active ? 'text-gray-500' : 'text-gray-700'}`}>
                {city.country}
              </span>

              {/* Active badge */}
              {city.active && (
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded flex-shrink-0">
                  LIVE
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-sm">No cities found</p>
          </div>
        )}
      </div>
    </div>
  )
}
