import { QUIZZES } from '@/data/quizzes'
import QuizEngine from '@/components/QuizEngine'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

function t(obj: Record<string, string>, locale: string): string {
  return obj[locale] || obj['fr'] || ''
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const quiz = QUIZZES.find(q => q.slug === params.slug)
  if (!quiz) return {}
  const title = t(quiz.title, params.locale)
  const desc = t(quiz.description, params.locale)
  return {
    title: `${title} | AI-DUE Quiz`,
    description: desc,
    openGraph: { title, description: desc, type: 'website' }
  }
}

export default function QuizPage({ params }: { params: { locale: string; slug: string } }) {
  const quiz = QUIZZES.find(q => q.slug === params.slug)
  if (!quiz) notFound()

  const title = t(quiz.title, params.locale)
  const desc = t(quiz.description, params.locale)

  return (
    <main className="min-h-screen bg-[#030014] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">{quiz.icon}</div>
          <h1 className="text-3xl font-black text-white mb-3">{title}</h1>
          <p className="text-gray-400">{desc}</p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": title,
              "description": desc,
              "educationalLevel": "beginner",
              "about": { "@type": "Thing", "name": "Intelligence Artificielle" },
              "provider": { "@type": "Organization", "name": "AI-DUE", "url": "https://ai-due.com" }
            })
          }}
        />

        <QuizEngine quiz={quiz} />
      </div>
    </main>
  )
}
