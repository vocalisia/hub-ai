'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PipelineStep {
  id: string
  label: string
  icon: string
  correctPosition: number
}

const STEPS: PipelineStep[] = [
  { id: 'data', label: 'Data Ingestion', icon: '📥', correctPosition: 0 },
  { id: 'embed', label: 'Embedding', icon: '🔢', correctPosition: 1 },
  { id: 'vector', label: 'Vector DB', icon: '🗄️', correctPosition: 2 },
  { id: 'retrieval', label: 'Retrieval', icon: '🔍', correctPosition: 3 },
  { id: 'prompt', label: 'Prompt Assembly', icon: '📝', correctPosition: 4 },
  { id: 'llm', label: 'LLM Inference', icon: '🧠', correctPosition: 5 },
  { id: 'output', label: 'Response', icon: '💬', correctPosition: 6 },
]

const LINKS = [
  { label: 'Architecture RAG', url: 'https://ai-due.com/fr/blog/architecture-rag-retrieval', desc: 'Guide complet RAG' },
  { label: 'Agents IA Pro', url: 'https://agents-ia.pro', desc: 'Deployer des pipelines IA' },
  { label: 'Trustly AI', url: 'https://trustly-ai.com', desc: 'IA fiable en production' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PipelineChallenge() {
  const [pipeline, setPipeline] = useState<PipelineStep[]>(() => shuffle(STEPS))
  const [selected, setSelected] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')

  function handleClick(index: number) {
    if (gameOver) return

    if (selected === null) {
      setSelected(index)
      return
    }

    if (selected === index) {
      setSelected(null)
      return
    }

    // Swap
    const newPipeline = [...pipeline]
    ;[newPipeline[selected], newPipeline[index]] = [newPipeline[index], newPipeline[selected]]
    setPipeline(newPipeline)
    setSelected(null)
    setMoves(prev => prev + 1)

  }

  function validate() {
    const isCorrect = pipeline.every((step, i) => step.correctPosition === i)
    if (isCorrect) {
      setGameOver(true)
      const score = Math.max(100 - (moves * 5), 30)
      setMessage(`Pipeline RAG complete ! Score: ${score}`)
    } else {
      const correct = pipeline.filter((step, i) => step.correctPosition === i).length
      setMessage(`${correct}/${STEPS.length} etapes bien placees. Continuez !`)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  function reset() {
    setPipeline(shuffle(STEPS))
    setSelected(null)
    setMoves(0)
    setGameOver(false)
    setMessage('')
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-purple-400 font-bold">Moves: {moves}</div>
        <div className="text-gray-400 text-sm">Placez les etapes dans le bon ordre</div>
      </div>

      <div className="space-y-2 mb-4">
        {pipeline.map((step, i) => {
          const isCorrect = gameOver && step.correctPosition === i
          const isSelected = selected === i
          return (
            <motion.button
              key={step.id}
              layout
              onClick={() => handleClick(i)}
              className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all text-left min-h-[52px] ${
                isCorrect ? 'border-green-500/50 bg-green-500/10' :
                isSelected ? 'border-[#FFD700]/50 bg-[#FFD700]/10 scale-[1.02]' :
                'border-white/10 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5'
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">
                {i + 1}
              </span>
              <span className="text-2xl">{step.icon}</span>
              <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-white'}`}>{step.label}</span>
              {isCorrect && <span className="ml-auto text-green-400">✓</span>}
            </motion.button>
          )
        })}
      </div>

      <p className="text-gray-500 text-xs text-center mb-4">
        Cliquez sur deux elements pour les echanger. Reconstituez le pipeline RAG !
      </p>

      {/* Bouton Valider */}
      {!gameOver && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={validate}
            className="flex-1 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-purple-600 to-[#FFD700] text-white font-bold text-sm hover:scale-[1.02] transition-transform"
          >
            ✓ Valider l'ordre
          </button>
          <button onClick={reset} className="px-4 py-3 min-h-[44px] rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5">
            Melanger
          </button>
        </div>
      )}

      {message && !gameOver && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm font-bold mb-3 text-[#FFD700]">
          {message}
        </motion.div>
      )}

      <AnimatePresence>
        {gameOver && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <div className="text-center p-6 rounded-2xl border border-green-500/30 bg-green-500/5">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-black text-white mb-2">{message}</h3>
              <p className="text-gray-400 mb-4">en {moves} coups</p>
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
              <button onClick={reset} className="px-6 py-3 min-h-[44px] rounded-xl bg-purple-600 text-white font-bold text-sm w-full sm:w-auto">Rejouer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
