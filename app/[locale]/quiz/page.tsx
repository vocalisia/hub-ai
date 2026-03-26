import Link from 'next/link'
import { QUIZZES } from '@/data/quizzes'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Quiz IA — Testez vos connaissances | AI-DUE',
  description: 'Quiz interactifs sur l\'intelligence artificielle : trouvez la bonne IA pour votre entreprise, testez vos connaissances, evaluez votre maturite IA.'
}

export default function QuizListPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-[#030014] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-sm mb-6">
            Quiz Interactifs
          </span>
          <h1 className="text-5xl font-black text-white mb-4">
            Quiz <span className="bg-gradient-to-r from-purple-400 to-[#FFD700] bg-clip-text text-transparent">IA</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Testez vos connaissances, evaluez votre maturite et decouvrez les meilleures solutions IA pour vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUIZZES.map((quiz) => (
            <Link key={quiz.slug} href={`/${locale}/quiz/${quiz.slug}`}>
              <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all h-full">
                <div className="text-4xl mb-4">{quiz.icon}</div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {quiz.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{quiz.questionCount} questions</span>
                  <span>•</span>
                  <span>{quiz.estimatedTime}</span>
                </div>
                <div className="mt-4 text-purple-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                  Commencer →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
