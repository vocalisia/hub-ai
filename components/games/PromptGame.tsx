'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Challenge {
  task: string
  keywords: string[]
  maxScore: number
  hint: string
}

const CHALLENGES: Challenge[] = [
  { task: 'Ecrivez un prompt pour generer un email professionnel de prospection B2B', keywords: ['professionnel', 'prospection', 'entreprise', 'client', 'offre', 'rendez-vous', 'valeur', 'personnalise'], maxScore: 80, hint: 'Incluez: ton, cible, objectif, CTA' },
  { task: 'Creez un prompt pour analyser les avis clients d\'un restaurant', keywords: ['analyser', 'avis', 'sentiment', 'positif', 'negatif', 'tendance', 'categorie', 'resume', 'recommandation'], maxScore: 90, hint: 'Pensez: structure, format sortie, criteres' },
  { task: 'Redigez un prompt pour creer un chatbot de support technique', keywords: ['support', 'technique', 'question', 'reponse', 'etape', 'solution', 'escalade', 'humain', 'polite', 'base de connaissances'], maxScore: 100, hint: 'N\'oubliez pas: ton, limites, escalade' },
]

const LINKS = [
  { label: 'Vocalis Pro', url: 'https://vocalis.pro', desc: 'IA vocale professionnelle' },
  { label: 'Agents IA Pro', url: 'https://agents-ia.pro', desc: 'Agents autonomes' },
  { label: 'Tesla-Mag', url: 'https://tesla-mag.ch', desc: 'IA et innovation' },
  { label: 'Trustly AI', url: 'https://trustly-ai.com', desc: 'IA de confiance' },
]

export default function PromptGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [foundKeywords, setFoundKeywords] = useState<string[]>([])

  const challenge = CHALLENGES[currentChallenge]

  function evaluate() {
    const lower = prompt.toLowerCase()
    const found = challenge.keywords.filter(kw => lower.includes(kw.toLowerCase()))
    setFoundKeywords(found)

    const lengthBonus = prompt.length > 100 ? 10 : prompt.length > 50 ? 5 : 0
    const kwScore = Math.round((found.length / challenge.keywords.length) * challenge.maxScore)
    const roundScore = kwScore + lengthBonus
    setScore(roundScore)
    setTotalScore(prev => prev + roundScore)
    setSubmitted(true)
  }

  function next() {
    if (currentChallenge + 1 >= CHALLENGES.length) {
      setGameOver(true)
    } else {
      setCurrentChallenge(prev => prev + 1)
      setPrompt('')
      setScore(0)
      setSubmitted(false)
      setFoundKeywords([])
    }
  }

  function reset() {
    setCurrentChallenge(0)
    setPrompt('')
    setScore(0)
    setTotalScore(0)
    setSubmitted(false)
    setGameOver(false)
    setFoundKeywords([])
  }

  if (gameOver) {
    const rating = totalScore >= 200 ? 'Expert Prompt Engineer' :
                   totalScore >= 120 ? 'Bon Prompteur' :
                   totalScore >= 60 ? 'Apprenti Prompteur' : 'Debutant'
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-6 rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/5">
        <div className="text-5xl mb-3">✍️</div>
        <h3 className="text-2xl font-black text-white mb-2">{rating}</h3>
        <p className="text-[#FFD700] font-bold text-3xl mb-1">Score: {totalScore}</p>
        <p className="text-gray-400 mb-6">sur {CHALLENGES.length} challenges</p>
        <div className="grid gap-2 mb-4">
          {LINKS.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/[0.03] hover:bg-[#FFD700]/10 transition-all">
              <div>
                <div className="text-[#FFD700] font-bold text-sm">{link.label}</div>
                <div className="text-gray-500 text-xs">{link.desc}</div>
              </div>
              <span className="text-[#FFD700]">→</span>
            </a>
          ))}
        </div>
        <button onClick={reset} className="px-6 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm">Rejouer</button>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-purple-400 font-bold">Challenge {currentChallenge + 1} / {CHALLENGES.length}</div>
        <div className="text-[#FFD700] font-bold">Total: {totalScore}</div>
      </div>

      <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-4">
        <h3 className="text-white font-bold mb-2">{challenge.task}</h3>
        <p className="text-purple-300 text-xs">Indice: {challenge.hint}</p>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={submitted}
        placeholder="Ecrivez votre prompt ici..."
        className="w-full h-40 rounded-xl bg-white/[0.03] border border-white/10 p-4 text-white text-sm placeholder-gray-600 focus:border-purple-500/50 focus:outline-none resize-none mb-4"
      />

      {!submitted ? (
        <button onClick={evaluate} disabled={prompt.length < 10}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-[#FFD700] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed">
          Evaluer mon prompt
        </button>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 mb-4">
              <div className="text-[#FFD700] font-bold text-xl mb-2">Score: {score} pts</div>
              <div className="text-sm text-gray-400 mb-2">Mots-cles trouves ({foundKeywords.length}/{challenge.keywords.length}):</div>
              <div className="flex gap-1 flex-wrap">
                {challenge.keywords.map(kw => (
                  <span key={kw} className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    foundKeywords.includes(kw) ? 'bg-green-500/20 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>{kw}</span>
                ))}
              </div>
            </div>
            <button onClick={next} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold">
              {currentChallenge + 1 < CHALLENGES.length ? 'Challenge suivant →' : 'Voir resultats'}
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
