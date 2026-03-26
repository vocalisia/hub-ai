'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARDS_DATA = [
  { id: 'gpt', icon: '🤖', label: 'GPT-4' },
  { id: 'claude', icon: '🧠', label: 'Claude' },
  { id: 'gemini', icon: '💎', label: 'Gemini' },
  { id: 'mistral', icon: '🌪️', label: 'Mistral' },
  { id: 'rag', icon: '🔍', label: 'RAG' },
  { id: 'mlops', icon: '⚙️', label: 'MLOps' },
  { id: 'agent', icon: '🤝', label: 'Agent' },
  { id: 'vector', icon: '📊', label: 'Vector DB' },
]

const LINKS = [
  { label: 'Vocalis Blog', url: 'https://vocalis.blog', desc: 'Learn about AI models' },
  { label: 'Master Seller', url: 'https://master-seller.fr', desc: 'Become an AI reseller' },
  { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', desc: 'AI for Swiss SMEs' },
  { label: 'SEO True', url: 'https://seo-true.com', desc: 'AI-powered SEO' },
]

interface Card { id: string; pairId: string; icon: string; label: string; flipped: boolean; matched: boolean }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemoryIA() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const doubled = CARDS_DATA.flatMap(c => [
      { id: c.id + '_a', pairId: c.id, icon: c.icon, label: c.label, flipped: false, matched: false },
      { id: c.id + '_b', pairId: c.id, icon: c.icon, label: c.label, flipped: false, matched: false }
    ])
    setCards(shuffle(doubled))
  }, [])

  useEffect(() => {
    if (!started || gameOver) return
    const interval = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [started, gameOver])

  function handleCardClick(cardId: string) {
    if (gameOver) return
    if (flippedIds.length >= 2) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return

    if (!started) setStarted(true)

    const newCards = cards.map(c => c.id === cardId ? { ...c, flipped: true } : c)
    setCards(newCards)
    const newFlipped = [...flippedIds, cardId]
    setFlippedIds(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = newFlipped.map(id => newCards.find(c => c.id === id)!)

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, matched: true } : c))
          setMatches(m => {
            const newM = m + 1
            if (newM === CARDS_DATA.length) setGameOver(true)
            return newM
          })
          setFlippedIds([])
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c))
          setFlippedIds([])
        }, 1000)
      }
    }
  }

  function reset() {
    const doubled = CARDS_DATA.flatMap(c => [
      { id: c.id + '_a', pairId: c.id, icon: c.icon, label: c.label, flipped: false, matched: false },
      { id: c.id + '_b', pairId: c.id, icon: c.icon, label: c.label, flipped: false, matched: false }
    ])
    setCards(shuffle(doubled))
    setFlippedIds([])
    setMoves(0)
    setMatches(0)
    setGameOver(false)
    setTimer(0)
    setStarted(false)
  }

  const score = gameOver ? Math.max(200 - moves * 5 - timer * 2, 50) : 0

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-purple-400 font-bold">Moves: {moves}</div>
        <div className="text-gray-400 text-sm">{matches} / {CARDS_DATA.length} paires</div>
        <div className="text-[#FFD700] font-bold">{timer}s</div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
        {cards.map(card => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
            className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
              card.matched ? 'border-green-500/50 bg-green-500/10' :
              card.flipped ? 'border-[#FFD700]/50 bg-[#FFD700]/10' :
              'border-white/10 bg-white/[0.03] hover:border-purple-500/30 cursor-pointer'
            }`}
          >
            {card.flipped || card.matched ? (
              <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="text-center">
                <div className="text-2xl sm:text-3xl">{card.icon}</div>
                <div className="text-[10px] text-gray-400 font-bold mt-1">{card.label}</div>
              </motion.div>
            ) : (
              <div className="text-xl text-purple-500/30 font-bold">?</div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {gameOver && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <div className="text-center p-6 rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/5">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-black text-white mb-1">Toutes les paires trouvees !</h3>
              <p className="text-[#FFD700] font-bold text-2xl mb-1">Score: {score}</p>
              <p className="text-gray-500 text-sm mb-4">{moves} coups en {timer}s</p>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
