'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import type { Quiz } from '@/data/quizzes'

function t(obj: Record<string, string> | string, locale: string): string {
  if (typeof obj === 'string') return obj
  return obj[locale] || obj['fr'] || Object.values(obj)[0] || ''
}

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const locale = useLocale()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const progress = ((current) / quiz.questions.length) * 100

  function handleAnswer(category: string) {
    const newAnswers = [...answers, category]
    setAnswers(newAnswers)
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
    }
  }

  function getResult() {
    if (quiz.type === 'score') {
      const score = answers.filter(a => a === 'correct').length
      const half = answers.filter(a => a === 'half').length
      const total = score + half * 0.5
      const pct = (total / quiz.questions.length) * 100
      if (pct >= 90) return quiz.results[3] || quiz.results[quiz.results.length - 1]
      if (pct >= 60) return quiz.results[2] || quiz.results[quiz.results.length - 1]
      if (pct >= 30) return quiz.results[1]
      return quiz.results[0]
    }
    const counts: Record<string, number> = {}
    answers.forEach(a => { counts[a] = (counts[a] || 0) + 1 })
    const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
    return quiz.results.find(r => r.id === topCategory) || quiz.results[0]
  }

  function restart() {
    setCurrent(0)
    setAnswers([])
    setShowResult(false)
  }

  const result = showResult ? getResult() : null
  const labels = {
    fr: { question: 'Question', score: 'Score', resources: 'Ressources recommandees', copy: 'Copier le lien', restart: 'Recommencer', others: 'Decouvrez nos autres quiz', seeAll: 'Voir tous les quiz' },
    en: { question: 'Question', score: 'Score', resources: 'Recommended resources', copy: 'Copy link', restart: 'Start over', others: 'Discover our other quizzes', seeAll: 'See all quizzes' },
    de: { question: 'Frage', score: 'Ergebnis', resources: 'Empfohlene Ressourcen', copy: 'Link kopieren', restart: 'Neu starten', others: 'Entdecken Sie unsere anderen Quiz', seeAll: 'Alle Quiz ansehen' },
    it: { question: 'Domanda', score: 'Punteggio', resources: 'Risorse consigliate', copy: 'Copia link', restart: 'Ricominciare', others: 'Scopri i nostri altri quiz', seeAll: 'Vedi tutti i quiz' }
  }
  const l = labels[locale as keyof typeof labels] || labels.fr

  return (
    <div className="max-w-2xl mx-auto">
      {!showResult && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{l.question} {current + 1} / {quiz.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-purple-600 to-[#FFD700] rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-white mb-8">{t(quiz.questions[current].question, locale)}</h2>
            <div className="grid gap-3">
              {quiz.questions[current].answers.map((answer, i) => (
                <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(answer.category)} className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-purple-500/10 hover:border-purple-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm font-bold group-hover:bg-purple-500/20">{String.fromCharCode(65 + i)}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{t(answer.text, locale)}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{result.icon}</div>
              <h2 className="text-3xl font-black text-white mb-3">{t(result.title, locale)}</h2>
              {quiz.type === 'score' && (
                <div className="text-[#FFD700] font-bold text-lg mb-2">{l.score} : {answers.filter(a => a === 'correct').length} / {quiz.questions.length}</div>
              )}
              <p className="text-gray-400 text-lg max-w-lg mx-auto">{t(result.description, locale)}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4 text-center">{l.resources}</h3>
              <div className="grid gap-3">
                {result.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/[0.03] hover:bg-[#FFD700]/[0.08] hover:border-[#FFD700]/40 transition-all group">
                    <div>
                      <div className="text-[#FFD700] font-bold group-hover:text-yellow-300">{link.label}</div>
                      <div className="text-gray-500 text-sm">{t(link.description, locale)}</div>
                    </div>
                    <span className="text-[#FFD700] text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="px-6 py-3 rounded-xl border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all text-sm font-bold">{l.copy}</button>
              <button onClick={restart} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-[#FFD700] text-white font-bold text-sm hover:opacity-90 transition-opacity">{l.restart}</button>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-gray-500 text-sm mb-3">{l.others}</p>
              <a href={`/${locale}/quiz`} className="text-purple-400 hover:text-purple-300 font-bold text-sm">{l.seeAll} →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
