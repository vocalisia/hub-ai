'use client'
import { motion } from 'framer-motion'

const LAYERS = [
  {
    id: 'data',
    label: 'Data Layer',
    color: '#06B6D4',
    items: ['Data Lakes', 'ETL Pipelines', 'Feature Store', 'Data Catalog'],
    icon: '📥',
  },
  {
    id: 'ml',
    label: 'ML / Training Layer',
    color: '#8B5CF6',
    items: ['Model Training', 'Fine-Tuning', 'Hyperparameter Tuning', 'Experiment Tracking'],
    icon: '🧪',
  },
  {
    id: 'inference',
    label: 'Inference Layer',
    color: '#FFD700',
    items: ['LLM Gateway', 'RAG Engine', 'Vector Search', 'Prompt Router'],
    icon: '🧠',
  },
  {
    id: 'agents',
    label: 'Agent Layer',
    color: '#F59E0B',
    items: ['Orchestrator', 'Tool Calling', 'Memory Store', 'Multi-Agent'],
    icon: '🤖',
  },
  {
    id: 'app',
    label: 'Application Layer',
    color: '#10B981',
    items: ['Voice AI', 'Chatbots', 'Automation', 'Analytics'],
    icon: '🚀',
  },
]

const CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 0, to: 2 },
  { from: 2, to: 4 },
]

export default function ArchitectureSchema() {
  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-xs font-bold mb-4 tracking-wider uppercase">
            Architecture Reference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            AI Architecture <span className="bg-gradient-to-r from-[#FFD700] to-[#DAA520] bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Les 5 couches fondamentales d'une architecture IA moderne, du data lake aux agents autonomes.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* Vertical connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-green-500/30 hidden sm:block" />

          <div className="space-y-4 sm:space-y-6">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 sm:gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="flex-1 group">
                  <div
                    className="relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: layer.color + '25',
                      background: layer.color + '08',
                    }}
                  >
                    {/* Top line accent */}
                    <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${layer.color}60, transparent)` }} />

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                        style={{ background: layer.color + '15' }}
                      >
                        {layer.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: layer.color + '20', color: layer.color }}>
                            L{i + 1}
                          </span>
                          <h3 className="text-white font-bold text-sm sm:text-base">{layer.label}</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.items.map(item => (
                            <span
                              key={item}
                              className="text-[10px] sm:text-xs px-2 py-1 rounded-lg border font-medium"
                              style={{ borderColor: layer.color + '20', color: layer.color + 'CC' }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden sm:flex w-4 h-4 rounded-full border-2 shrink-0 z-10" style={{ borderColor: layer.color, background: layer.color + '30' }}>
                  <div className="w-full h-full rounded-full animate-pulse" style={{ background: layer.color + '40' }} />
                </div>

                {/* Spacer for alternating */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flow arrows mobile */}
        <div className="flex justify-center mt-8 sm:hidden">
          <div className="flex flex-col items-center gap-1 text-gray-600 text-xs">
            <span>Data → ML → Inference → Agents → App</span>
          </div>
        </div>
      </div>
    </section>
  )
}
