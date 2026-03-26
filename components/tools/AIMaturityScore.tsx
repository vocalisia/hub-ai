'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CRITERIA = [
  { id: 'outils', label: 'Utilisation outils IA', desc: 'ChatGPT, Copilot, outils no-code...' },
  { id: 'donnees', label: 'Donnees structurees', desc: 'CRM, bases de donnees, data lakes...' },
  { id: 'budget', label: 'Budget innovation', desc: 'Investissement R&D et transformation...' },
  { id: 'formation', label: 'Formation digitale', desc: 'Competences IA de vos equipes...' },
  { id: 'automatisation', label: 'Automatisation processus', desc: 'Workflows, API, integrations...' },
  { id: 'strategie', label: 'Strategie IA definie', desc: 'Roadmap, KPIs, gouvernance...' },
]

interface Level {
  name: string
  min: number
  max: number
  color: string
  gradient: string
  description: string
  recommendations: { text: string; url: string }[]
}

const LEVELS: Level[] = [
  {
    name: 'Novice',
    min: 0,
    max: 25,
    color: 'text-red-400',
    gradient: 'from-red-500 to-orange-500',
    description: 'Votre entreprise debute dans l\'IA. Il est temps de poser les fondations avec des outils simples et une strategie claire.',
    recommendations: [
      { text: 'Decouvrir les bases de l\'IA pour PME', url: 'https://iapmesuisse.ch' },
      { text: 'Formation revendeur IA', url: 'https://master-seller.fr' },
      { text: 'Lire nos articles IA', url: 'https://vocalis.blog' },
    ],
  },
  {
    name: 'Explorateur',
    min: 26,
    max: 50,
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-yellow-500',
    description: 'Vous experimentez avec l\'IA. Structurez votre approche pour maximiser le retour sur investissement.',
    recommendations: [
      { text: 'Calculer votre ROI avec notre outil', url: '#roi' },
      { text: 'Automatiser votre accueil avec Vocalis', url: 'https://vocalis.pro' },
      { text: 'Optimiser votre SEO avec l\'IA', url: 'https://seo-true.com' },
    ],
  },
  {
    name: 'Adopteur',
    min: 51,
    max: 75,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-violet-500',
    description: 'L\'IA fait partie de vos operations. Passez au niveau superieur avec des agents IA avances et une strategie data-driven.',
    recommendations: [
      { text: 'Deployer des agents IA sur mesure', url: 'https://agents-ia.pro' },
      { text: 'Intelligence artificielle pour PME', url: 'https://iapmesuisse.ch' },
      { text: 'Assistant vocal professionnel', url: 'https://vocalis.pro' },
    ],
  },
  {
    name: 'Leader',
    min: 76,
    max: 100,
    color: 'text-emerald-400',
    gradient: 'from-emerald-400 to-cyan-400',
    description: 'Vous etes a la pointe de l\'IA. Continuez a innover et partagez votre expertise.',
    recommendations: [
      { text: 'Devenir revendeur de solutions IA', url: 'https://master-seller.fr' },
      { text: 'Solutions IA enterprise', url: 'https://agents-ia.pro' },
      { text: 'Trustly AI - IA de confiance', url: 'https://trustly-ai.com' },
    ],
  },
]

function CircularGauge({ score, level }: { score: number; level: Level }) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-56 h-56 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-black text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {score}
        </motion.span>
        <span className="text-gray-500 text-sm mt-1">/ 100</span>
      </div>
    </div>
  )
}

export default function AIMaturityScore() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(CRITERIA.map(c => [c.id, 5]))
  )

  const totalScore = Math.round(
    (Object.values(scores).reduce((sum, v) => sum + v, 0) / (CRITERIA.length * 10)) * 100
  )

  const currentLevel = LEVELS.find(l => totalScore >= l.min && totalScore <= l.max) || LEVELS[0]

  const updateScore = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {CRITERIA.map((criterion, i) => (
          <motion.div
            key={criterion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-5"
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <label className="text-white text-sm font-semibold">{criterion.label}</label>
                <p className="text-gray-600 text-xs mt-0.5">{criterion.desc}</p>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-gold-accent bg-clip-text text-transparent min-w-[2.5rem] text-right">
                {scores[criterion.id]}/10
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={scores[criterion.id]}
              onChange={(e) => updateScore(criterion.id, Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 mt-3
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-gold-accent
                [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-purple-500 [&::-moz-range-thumb]:to-gold-accent
                [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            {/* Tick marks */}
            <div className="flex justify-between mt-1.5 px-0.5">
              {Array.from({ length: 11 }, (_, n) => (
                <span
                  key={n}
                  className={`text-[9px] ${scores[criterion.id] >= n ? 'text-purple-400/60' : 'text-gray-700'} transition-colors`}
                >
                  {n}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#0a0a1f] to-[#110a2e] rounded-2xl border border-purple-500/20 p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-8 text-center">Votre Score de Maturite IA</h3>

          <CircularGauge score={totalScore} level={currentLevel} />

          {/* Level badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLevel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-8"
            >
              <span className={`inline-block px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${currentLevel.gradient} text-white shadow-lg`}>
                {currentLevel.name}
              </span>
              <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                {currentLevel.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Level bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              {LEVELS.map(l => (
                <span
                  key={l.name}
                  className={`text-[10px] font-medium transition-colors ${currentLevel.name === l.name ? l.color : 'text-gray-700'}`}
                >
                  {l.name}
                </span>
              ))}
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden flex">
              {LEVELS.map((l, i) => (
                <div key={l.name} className="flex-1 relative">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${l.gradient}`}
                    initial={{ opacity: 0.1 }}
                    animate={{
                      opacity: totalScore >= l.min ? (totalScore <= l.max ? 0.9 : 0.5) : 0.1
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Recommandations -{' '}
            <span className={currentLevel.color}>{currentLevel.name}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentLevel.recommendations.map((rec, i) => (
              <motion.a
                key={rec.text}
                href={rec.url}
                target={rec.url.startsWith('#') ? undefined : '_blank'}
                rel={rec.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-[#0a0a1f]/80 rounded-xl border border-white/[0.06] p-5 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentLevel.gradient} flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition-transform`}>
                  {i === 0 ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  ) : i === 1 ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  )}
                </div>
                <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{rec.text}</p>
                <div className="flex items-center gap-1 mt-2 text-gray-600 text-xs group-hover:text-purple-400/60 transition-colors">
                  <span>Decouvrir</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
