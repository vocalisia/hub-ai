'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITES } from '@/data/sites'
import { useLocale } from 'next-intl'

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

export default function NetworkGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-xs font-medium uppercase tracking-[0.2em] mb-4 block">Architecture</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            AI Architecture Network
          </h2>
        </motion.div>

        <div className="relative bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl sm:rounded-3xl border border-white/5 p-3 sm:p-8 md:p-12 overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(rgba(139,92,246,0.5) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />

          <svg viewBox="0 0 1000 600" className="w-full h-auto relative z-10" preserveAspectRatio="xMidYMid meet">
            {/* Gradient defs */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Connections with animated dash */}
            {CONNECTIONS.map(([from, to]) => {
              const fromSite = SITES.find(s => s.id === from)
              const toSite = SITES.find(s => s.id === to)
              if (!fromSite || !toSite) return null
              const isActive = activeNode === from || activeNode === to
              return (
                <line
                  key={`${from}-${to}`}
                  x1={fromSite.position.x}
                  y1={fromSite.position.y}
                  x2={toSite.position.x}
                  y2={toSite.position.y}
                  stroke={isActive ? '#a855f7' : 'url(#lineGrad)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={isActive ? 'none' : '8,8'}
                  className="transition-all duration-500"
                >
                  {!isActive && (
                    <animate
                      attributeName="stroke-dashoffset"
                      values="16;0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              )
            })}

            {/* Nodes */}
            {SITES.map((site) => {
              const isHub = site.id === 'hub'
              const isActive = activeNode === site.id
              const r = isHub ? 32 : 22
              return (
                <g
                  key={site.id}
                  transform={`translate(${site.position.x}, ${site.position.y})`}
                  onClick={() => setActiveNode(site.id === activeNode ? null : site.id)}
                  className="cursor-pointer"
                >
                  {/* Outer pulse */}
                  <circle r={r + 15} fill={site.color} opacity={0.05}>
                    <animate attributeName="r" values={`${r + 10};${r + 25};${r + 10}`} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.08;0.02;0.08" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Main circle */}
                  <circle
                    r={r}
                    fill="rgba(10,10,30,0.8)"
                    stroke={isActive ? site.color : site.color + '60'}
                    strokeWidth={isActive ? 3 : 1.5}
                    filter={isActive ? 'url(#glow)' : ''}
                    className="transition-all duration-300"
                  />

                  {/* Inner glow */}
                  <circle r={r - 5} fill={site.color} opacity={isActive ? 0.2 : 0.08} />

                  {/* Icon/emoji */}
                  <text y={1} textAnchor="middle" fontSize={isHub ? '22' : '18'} dominantBaseline="central">
                    {site.geo.country === 'CH' ? '🇨🇭' :
                     site.geo.country === 'CA' ? '🇨🇦' :
                     site.geo.country === 'US' ? '🇺🇸' : '🇪🇺'}
                  </text>

                  {/* Label */}
                  <text
                    y={r + 18}
                    textAnchor="middle"
                    fill={isActive ? 'white' : '#9ca3af'}
                    fontSize="11"
                    fontWeight={isActive ? 'bold' : 'normal'}
                    className="transition-all duration-300"
                  >
                    {site.name}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Detail panel */}
          <AnimatePresence>
            {activeNode && (() => {
              const site = SITES.find(s => s.id === activeNode)
              if (!site) return null
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8"
                >
                  <div className="bg-black/80 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 border border-white/10">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="w-full sm:w-auto">
                        <h3 className="text-white font-bold text-base sm:text-lg mb-1">{site.name}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm mb-3">{site.description[locale]}</p>
                        <div className="flex gap-2 flex-wrap">
                          {site.topics.map(topic => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium"
                              style={{ background: site.color + '15', color: site.color }}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-full sm:w-auto text-center px-4 py-3 sm:py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        style={{ background: site.color }}
                      >
                        Visit
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
