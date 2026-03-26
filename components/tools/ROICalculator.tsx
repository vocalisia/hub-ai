'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const duration = 600
    const start = display
    const diff = value - start
    if (diff === 0) return
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <span>
      {prefix}{display.toLocaleString('fr-CH')}{suffix}
    </span>
  )
}

const SOLUTIONS = [
  { name: 'Vocalis AI', desc: 'Assistant vocal IA 24/7', url: 'https://vocalis.pro', color: 'from-purple-500 to-purple-700' },
  { name: 'Agents IA Pro', desc: 'Agents IA sur mesure', url: 'https://agents-ia.pro', color: 'from-cyan-500 to-blue-600' },
  { name: 'IA PME Suisse', desc: 'Conseil IA pour PME', url: 'https://iapmesuisse.ch', color: 'from-gold-accent to-amber-600' },
  { name: 'Master Seller', desc: 'Formation revendeurs IA', url: 'https://master-seller.fr', color: 'from-pink-500 to-rose-600' },
]

export default function ROICalculator() {
  const [employes, setEmployes] = useState(10)
  const [salaire, setSalaire] = useState(5000)
  const [heures, setHeures] = useState(10)
  const [coutIA, setCoutIA] = useState(500)

  const tauxHoraire = salaire / 160
  const economiesAnnuelles = heures * tauxHoraire * 52 * employes
  const coutAnnuelIA = coutIA * 12
  const economiesNettes = economiesAnnuelles - coutAnnuelIA
  const roi = coutAnnuelIA > 0 ? ((economiesAnnuelles - coutAnnuelIA) / coutAnnuelIA) * 100 : 0
  const paybackMonths = economiesAnnuelles > 0 ? Math.ceil((coutIA * 12) / (economiesAnnuelles / 12)) : 0

  const sliders = [
    { label: 'Nombre d\'employes', value: employes, set: setEmployes, min: 1, max: 500, step: 1, suffix: '' },
    { label: 'Salaire moyen mensuel', value: salaire, set: setSalaire, min: 2000, max: 15000, step: 100, suffix: ' CHF' },
    { label: 'Heures/semaine automatisables', value: heures, set: setHeures, min: 1, max: 40, step: 1, suffix: 'h' },
    { label: 'Cout outil IA / mois', value: coutIA, set: setCoutIA, min: 50, max: 5000, step: 50, suffix: ' CHF' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {sliders.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-300 text-sm font-medium">{s.label}</label>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-400 to-gold-accent bg-clip-text text-transparent">
                {s.value.toLocaleString('fr-CH')}{s.suffix}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-purple-500
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-gold-accent
                [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-purple-500 [&::-moz-range-thumb]:to-gold-accent
                [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>{s.min.toLocaleString('fr-CH')}{s.suffix}</span>
              <span>{s.max.toLocaleString('fr-CH')}{s.suffix}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-[#0a0a1f] to-[#110a2e] rounded-2xl border border-purple-500/20 p-8 mb-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        <h3 className="text-xl font-bold text-white mb-8 relative z-10">Resultats estimes</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          <div className="text-center p-4">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              <AnimatedCounter value={Math.round(economiesNettes)} suffix=" CHF" />
            </div>
            <p className="text-gray-400 text-sm">Economies nettes / an</p>
          </div>

          <div className="text-center p-4">
            <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${roi >= 0 ? 'from-purple-400 to-gold-accent' : 'from-red-400 to-red-500'} bg-clip-text text-transparent mb-2`}>
              <AnimatedCounter value={Math.round(roi)} suffix="%" />
            </div>
            <p className="text-gray-400 text-sm">ROI annuel</p>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              <AnimatedCounter value={paybackMonths} suffix=" mois" />
            </div>
            <p className="text-gray-400 text-sm">Delai de rentabilite</p>
          </div>
        </div>

        {/* Progress bar ROI */}
        <div className="mt-8 relative z-10">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Investissement IA</span>
            <span>Economies generees</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-400 to-gold-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.max((economiesAnnuelles / (economiesAnnuelles + coutAnnuelIA)) * 100, 5), 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Solutions recommandees */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Solutions recommandees</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOLUTIONS.map((sol, i) => (
            <motion.a
              key={sol.name}
              href={sol.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="group bg-[#0a0a1f]/80 rounded-xl border border-white/[0.06] p-5 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sol.color} flex items-center justify-center text-white text-sm font-bold mb-3 group-hover:scale-110 transition-transform`}>
                {sol.name[0]}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors">{sol.name}</h4>
              <p className="text-gray-500 text-xs">{sol.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
