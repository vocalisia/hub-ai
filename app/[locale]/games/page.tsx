import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mini-Jeux IA — AI-DUE',
  description: 'Mini-jeux interactifs sur l\'architecture IA : construisez des reseaux de neurones, assemblez des pipelines RAG, testez votre memoire IA.'
}

const GAMES = [
  { slug: 'neural-network', icon: '🧠', title: { fr: 'Neural Network Builder', en: 'Neural Network Builder', de: 'Neuronales Netz bauen', it: 'Costruttore Rete Neurale' }, desc: { fr: 'Connectez les neurones pour construire un reseau fonctionnel', en: 'Connect neurons to build a working network', de: 'Verbinden Sie Neuronen zu einem funktionierenden Netzwerk', it: 'Collega i neuroni per costruire una rete funzionante' }, time: '3 min', difficulty: 'Medium' },
  { slug: 'pipeline-rag', icon: '🔧', title: { fr: 'Pipeline RAG Challenge', en: 'RAG Pipeline Challenge', de: 'RAG-Pipeline-Challenge', it: 'Sfida Pipeline RAG' }, desc: { fr: 'Placez les composants d\'une architecture RAG dans le bon ordre', en: 'Place RAG architecture components in the right order', de: 'Ordnen Sie RAG-Architekturkomponenten richtig an', it: 'Metti i componenti RAG nell\'ordine giusto' }, time: '2 min', difficulty: 'Easy' },
  { slug: 'memory-ia', icon: '🃏', title: { fr: 'Memory IA', en: 'AI Memory', de: 'KI-Memory', it: 'Memory IA' }, desc: { fr: 'Retrouvez les paires de concepts IA le plus vite possible', en: 'Find AI concept pairs as fast as possible', de: 'Finden Sie KI-Konzeptpaare so schnell wie moglich', it: 'Trova le coppie di concetti IA il piu velocemente possibile' }, time: '2 min', difficulty: 'Easy' },
  { slug: 'prompt-engineering', icon: '✍️', title: { fr: 'Prompt Engineering Game', en: 'Prompt Engineering Game', de: 'Prompt Engineering Spiel', it: 'Gioco Prompt Engineering' }, desc: { fr: 'Ecrivez le meilleur prompt possible pour chaque defi', en: 'Write the best possible prompt for each challenge', de: 'Schreiben Sie den bestmoglichen Prompt fur jede Herausforderung', it: 'Scrivi il miglior prompt possibile per ogni sfida' }, time: '5 min', difficulty: 'Hard' },
]

export default function GamesPage({ params: { locale } }: { params: { locale: string } }) {
  const labels = {
    fr: { badge: 'Mini-Jeux IA', title: 'Jeux', subtitle: 'Apprenez l\'architecture IA en jouant. Chaque jeu teste vos connaissances et vous recommande des ressources.', play: 'Jouer' },
    en: { badge: 'AI Mini-Games', title: 'Games', subtitle: 'Learn AI architecture by playing. Each game tests your knowledge and recommends resources.', play: 'Play' },
    de: { badge: 'KI-Minispiele', title: 'Spiele', subtitle: 'Lernen Sie KI-Architektur spielerisch. Jedes Spiel testet Ihr Wissen.', play: 'Spielen' },
    it: { badge: 'Mini-Giochi IA', title: 'Giochi', subtitle: 'Impara l\'architettura IA giocando. Ogni gioco testa le tue conoscenze.', play: 'Gioca' }
  }
  const l = labels[locale as keyof typeof labels] || labels.fr

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
          {GAMES.map(game => (
            <Link key={game.slug} href={`/${locale}/games/${game.slug}`}>
              <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#FFD700]/30 hover:bg-[#FFD700]/[0.02] transition-all h-full">
                <div className="text-5xl mb-4">{game.icon}</div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {game.title[locale as keyof typeof game.title] || game.title.fr}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {game.desc[locale as keyof typeof game.desc] || game.desc.fr}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{game.time}</span>
                  <span>•</span>
                  <span>{game.difficulty}</span>
                </div>
                <div className="mt-4 text-[#FFD700] text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                  {l.play} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
