'use client'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    icon: '🧠',
    title: 'LLM Orchestration',
    description: 'GPT-4, Claude, Mistral, Gemini — routage intelligent entre modeles selon le cas d\'usage, le cout et la latence.',
    stats: '4 LLMs',
    color: '#8B5CF6',
    link: 'https://agents-ia.pro',
  },
  {
    icon: '🔗',
    title: 'RAG Pipeline',
    description: 'Retrieval Augmented Generation avec vector search, chunking semantique et reranking pour des reponses contextuelles.',
    stats: '99.2% precision',
    color: '#FFD700',
    link: 'https://ai-due.com/fr/blog/architecture-rag-retrieval',
  },
  {
    icon: '🤖',
    title: 'Multi-Agent Systems',
    description: 'Orchestration d\'agents autonomes avec memoire partagee, tool calling et delegation de taches complexes.',
    stats: '∞ agents',
    color: '#06B6D4',
    link: 'https://agents-ia.pro',
  },
  {
    icon: '📞',
    title: 'Voice AI Engine',
    description: 'Telephonie IA temps reel : STT, NLU, dialogue management, TTS avec latence < 300ms.',
    stats: '<300ms',
    color: '#10B981',
    link: 'https://vocalis.pro',
  },
  {
    icon: '⚡',
    title: 'Edge Inference',
    description: 'Deploiement de modeles sur edge devices, TinyML et inference locale pour IoT et applications embarquees.',
    stats: '10x faster',
    color: '#F59E0B',
    link: 'https://ai-due.com/fr/blog/architecture-ia-edge-iot',
  },
  {
    icon: '🔒',
    title: 'AI Security',
    description: 'Red teaming, prompt injection defense, guardrails et monitoring de la conformite EU AI Act.',
    stats: 'EU compliant',
    color: '#EF4444',
    link: 'https://trustly-ai.com',
  },
]

export default function NeuralFeatures() {
  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Neural background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,215,0,0.04),transparent_60%)]" />
        {/* Circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50h40M60 50h40M50 0v40M50 60v40" stroke="#FFD700" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="3" fill="none" stroke="#FFD700" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="1" fill="#FFD700" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-bold mb-4 tracking-wider uppercase">
            Neural Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Core <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Components</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Les composants fondamentaux de notre architecture IA, concus pour la performance, la fiabilite et la scalabilite.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.a
              key={feature.title}
              href={feature.link}
              target={feature.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${feature.color}08, transparent 70%)` }}
              />

              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}50, transparent)` }}
              />

              <div className="relative">
                {/* Icon + Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: feature.color + '12' }}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: feature.color + '12', color: feature.color }}
                  >
                    {feature.stats}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                  style={{ color: feature.color }}
                >
                  Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '<100ms', label: 'Latence inference', color: '#FFD700' },
            { value: '99.9%', label: 'Uptime garanti', color: '#10B981' },
            { value: '5 LLMs', label: 'Modeles integres', color: '#8B5CF6' },
            { value: 'EU AI Act', label: 'Conforme', color: '#06B6D4' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="text-xl sm:text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-gray-600 text-[10px] sm:text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
