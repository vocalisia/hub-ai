import Link from 'next/link'
import { QUIZZES } from '@/data/quizzes'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale] || obj['fr'] || ''
}

export const metadata: Metadata = {
  title: 'Quiz IA — AI-DUE',
  description: 'Interactive AI quizzes: find the right AI for your business, test your knowledge, assess your AI maturity.'
}

const labels: Record<string, { badge: string; title: string; subtitle: string; cta: string }> = {
  fr: { badge: 'Quiz Interactifs', title: 'Quiz', subtitle: 'Testez vos connaissances, evaluez votre maturite et decouvrez les meilleures solutions IA.', cta: 'Commencer' },
  en: { badge: 'Interactive Quizzes', title: 'Quiz', subtitle: 'Test your knowledge, assess your maturity and discover the best AI solutions.', cta: 'Start' },
  de: { badge: 'Interaktive Quiz', title: 'Quiz', subtitle: 'Testen Sie Ihr Wissen, bewerten Sie Ihre Reife und entdecken Sie die besten KI-Losungen.', cta: 'Starten' },
  it: { badge: 'Quiz Interattivi', title: 'Quiz', subtitle: 'Testa le tue conoscenze, valuta la tua maturita e scopri le migliori soluzioni IA.', cta: 'Inizia' }
}

export default function QuizListPage({ params: { locale } }: { params: { locale: string } }) {
  const l = labels[locale] || labels.fr

  return (
    <main className="min-h-screen bg-[#030014] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-sm mb-6">
            {l.badge}
          </span>
          <h1 className="text-5xl font-black text-white mb-4">
            {l.title} <span className="bg-gradient-to-r from-purple-400 to-[#FFD700] bg-clip-text text-transparent">IA</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">{l.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUIZZES.map((quiz) => (
            <Link key={quiz.slug} href={`/${locale}/quiz/${quiz.slug}`}>
              <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all h-full">
                <div className="text-4xl mb-4">{quiz.icon}</div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {t(quiz.title, locale)}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{t(quiz.description, locale)}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{quiz.questionCount} questions</span>
                  <span>•</span>
                  <span>{quiz.estimatedTime}</span>
                </div>
                <div className="mt-4 text-purple-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                  {l.cta} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
