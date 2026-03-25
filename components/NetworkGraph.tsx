'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SITES } from '@/data/sites'
import { useLocale } from 'next-intl'

export default function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  const CONNECTIONS = [
    ['hub', 'automation-saas'],
    ['hub', 'ia-pme'],
    ['hub', 'ia-canada'],
    ['hub', 'ia-usa'],
    ['hub', 'ia-europe'],
    ['ia-europe', 'ia-pme'],
    ['ia-canada', 'ia-usa'],
    ['automation-saas', 'ia-pme']
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4">
            Reseau IA Connecte
          </h2>
          <p className="text-gray-400">Cliquez sur un noeud pour explorer</p>
        </motion.div>

        <div className="relative bg-[#0D0D1F] rounded-3xl border border-purple-500/20 p-8 overflow-hidden">
          {/* SVG Network */}
          <svg
            ref={svgRef}
            viewBox="0 0 1000 600"
            className="w-full h-auto"
          >
            {/* Connexions */}
            {CONNECTIONS.map(([from, to]) => {
              const fromSite = SITES.find(s => s.id === from)
              const toSite = SITES.find(s => s.id === to)
              if (!fromSite || !toSite) return null
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={fromSite.position.x}
                  y1={fromSite.position.y}
                  x2={toSite.position.x}
                  y2={toSite.position.y}
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
              )
            })}

            {/* Noeuds */}
            {SITES.map((site) => (
              <g
                key={site.id}
                transform={`translate(${site.position.x}, ${site.position.y})`}
                onClick={() => setActiveNode(site.id === activeNode ? null : site.id)}
                className="cursor-pointer"
              >
                {/* Halo pulsant */}
                <motion.circle
                  r={site.id === 'hub' ? 50 : 35}
                  fill={site.color}
                  opacity={0.15}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Cercle principal */}
                <circle
                  r={site.id === 'hub' ? 35 : 25}
                  fill={site.color}
                  opacity={activeNode === site.id ? 1 : 0.8}
                  filter="url(#glow)"
                />
                {/* Label */}
                <text
                  y={site.id === 'hub' ? 55 : 45}
                  textAnchor="middle"
                  fill="white"
                  fontSize={site.id === 'hub' ? '14' : '11'}
                  fontWeight="bold"
                >
                  {site.name.split(' ').slice(0, 2).join(' ')}
                </text>
                {/* Flag pays */}
                <text y={-40} textAnchor="middle" fontSize="20">
                  {site.geo.country === 'CH' ? '🇨🇭' :
                   site.geo.country === 'CA' ? '🇨🇦' :
                   site.geo.country === 'US' ? '🇺🇸' : '🇪🇺'}
                </text>
              </g>
            ))}

            {/* Filtre glow */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Info panel */}
          {activeNode && (() => {
            const site = SITES.find(s => s.id === activeNode)
            if (!site) return null
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{site.name}</h3>
                    <p className="text-gray-400 mb-3">{site.description[locale]}</p>
                    <div className="flex gap-2 flex-wrap">
                      {site.topics.map(topic => (
                        <span key={topic} className="px-2 py-1 rounded-full text-xs" style={{ background: site.color + '30', color: site.color }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-white text-sm font-bold whitespace-nowrap"
                    style={{ background: site.color }}
                  >
                    Visiter
                  </a>
                </div>
              </motion.div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
