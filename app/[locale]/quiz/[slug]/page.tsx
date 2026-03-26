import { QUIZZES } from '@/data/quizzes'
import QuizEngine from '@/components/QuizEngine'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const quiz = QUIZZES.find(q => q.slug === params.slug)
  if (!quiz) return {}
  return {
    title: `${quiz.title} | AI-DUE Quiz`,
    description: quiz.description,
    openGraph: { title: quiz.title, description: quiz.description, type: 'website' }
  }
}

export default function QuizPage({ params }: { params: { locale: string; slug: string } }) {
  const quiz = QUIZZES.find(q => q.slug === params.slug)
  if (!quiz) notFound()

  return (
    <main className="min-h-screen bg-[#030014] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">{quiz.icon}</div>
          <h1 className="text-3xl font-black text-white mb-3">{quiz.title}</h1>
          <p className="text-gray-400">{quiz.description}</p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": quiz.title,
              "description": quiz.description,
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
