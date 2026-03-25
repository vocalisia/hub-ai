'use client'
import { useEffect, useRef, useState } from 'react'
import { GEO_MARKERS } from '@/data/sites'

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<'all' | 'ch' | 'eu' | 'ca' | 'us'>('all')

  useEffect(() => {
    if (!mapRef.current) return

    let map: any = null

    const initMap = async () => {
      const maplibregl = (await import('maplibre-gl')).default

      map = new maplibregl.Map({
        container: mapRef.current!,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256
            }
          },
          layers: [{
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }]
        },
        center: [10, 30],
        zoom: 2,
        attributionControl: false
      })

      map.on('load', () => {
        const filteredMarkers = GEO_MARKERS.filter(m => {
          if (filter === 'all') return true
          if (filter === 'ch') return m.country === 'Suisse'
          if (filter === 'eu') return ['France', 'Allemagne', 'UK', 'Netherlands', 'Sweden'].includes(m.country)
          if (filter === 'ca') return m.country === 'Canada'
          if (filter === 'us') return m.country === 'USA'
          return true
        })

        filteredMarkers.forEach(marker => {
          const el = document.createElement('div')
          el.className = 'map-marker'
          el.innerHTML = `
            <div style="
              width: ${marker.sites.length > 0 ? '50px' : '36px'};
              height: ${marker.sites.length > 0 ? '50px' : '36px'};
              background: ${marker.sites.length > 0 ? 'rgba(139,92,246,0.9)' : 'rgba(30,30,50,0.8)'};
              border: 2px solid ${marker.sites.length > 0 ? '#8B5CF6' : 'rgba(139,92,246,0.3)'};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${marker.sites.length > 0 ? '24px' : '16px'};
              cursor: pointer;
              box-shadow: ${marker.sites.length > 0 ? '0 0 20px rgba(139,92,246,0.5)' : 'none'};
              transition: transform 0.2s;
            " title="${marker.city}">
              ${marker.flag}
            </div>
          `

          el.addEventListener('mouseenter', () => {
            el.querySelector('div')!.style.transform = 'scale(1.2)'
          })
          el.addEventListener('mouseleave', () => {
            el.querySelector('div')!.style.transform = 'scale(1)'
          })

          new maplibregl.Marker({ element: el })
            .setLngLat([marker.lng, marker.lat])
            .setPopup(
              new maplibregl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="background:#1A1A2E;color:white;padding:12px;border-radius:12px;min-width:160px;">
                    <div style="font-size:24px;margin-bottom:8px;">${marker.flag}</div>
                    <div style="font-weight:bold;font-size:16px;">${marker.city}</div>
                    <div style="color:#9CA3AF;font-size:12px;">${marker.country}</div>
                    ${marker.sites.length > 0 ? `<div style="margin-top:8px;color:#8B5CF6;font-size:12px;">Site IA actif</div>` : ''}
                  </div>
                `)
            )
            .addTo(map)
        })
      })
    }

    initMap()

    return () => { if (map) map.remove() }
  }, [filter])

  const FILTERS = [
    { key: 'all', label: 'Tous' },
    { key: 'ch', label: '🇨🇭 Suisse' },
    { key: 'eu', label: '🇪🇺 Europe' },
    { key: 'ca', label: '🇨🇦 Canada' },
    { key: 'us', label: '🇺🇸 USA' }
  ]

  return (
    <div className="relative">
      {/* Filtres */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f.key
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Carte */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden border border-purple-500/20"
        style={{ height: '500px' }}
      />
    </div>
  )
}
