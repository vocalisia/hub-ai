import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export { }
export const revalidate = 0

const NeuralNetworkBuilder = dynamic(() => import('@/components/games/NeuralNetworkBuilder'), { ssr: false })
const PipelineChallenge = dynamic(() => import('@/components/games/PipelineChallenge'), { ssr: false })
const MemoryIA = dynamic(() => import('@/components/games/MemoryIA'), { ssr: false })
const PromptGame = dynamic(() => import('@/components/games/PromptGame'), { ssr: false })

const GAMES: Record<string, { component: any; title: string; description: string; icon: string }> = {
  'neural-network': { component: NeuralNetworkBuilder, title: 'Neural Network Builder', description: 'Construisez un reseau de neurones en connectant les noeuds', icon: '🧠' },
  'pipeline-rag': { component: PipelineChallenge, title: 'Pipeline RAG Challenge', description: 'Assemblez les composants d\'une architecture RAG', icon: '🔧' },
  'memory-ia': { component: MemoryIA, title: 'Memory IA', description: 'Retrouvez les paires de concepts IA', icon: '🃏' },
  'prompt-engineering': { component: PromptGame, title: 'Prompt Engineering Game', description: 'Ecrivez le meilleur prompt pour chaque defi', icon: '✍️' },
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const game = GAMES[params.slug]
  if (!game) return {}
  const slug = params.slug
  return {
    title: `${game.title} | AI-DUE Games`,
    description: game.description,
    alternates: {
      canonical: `https://ai-due.com/${params.locale}/games/${slug}`,
      languages: {
        en: `https://ai-due.com/en/games/${slug}`,
        fr: `https://ai-due.com/fr/games/${slug}`,
        de: `https://ai-due.com/de/games/${slug}`,
        it: `https://ai-due.com/it/games/${slug}`,
        'x-default': `https://ai-due.com/en/games/${slug}`,
      },
    },
  }
}

export default function GamePage({ params }: { params: { locale: string; slug: string } }) {
  const game = GAMES[params.slug]
  if (!game) notFound()

  const GameComponent = game.component

  return (
    <main className="min-h-screen bg-[#030014] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">{game.icon}</div>
          <h1 className="text-3xl font-black text-white mb-3">{game.title}</h1>
          <p className="text-gray-400">{game.description}</p>
        </div>

        <GameComponent />
      </div>
    </main>
  )
}
