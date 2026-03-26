'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Node {
  id: string
  x: number
  y: number
  type: 'input' | 'hidden' | 'output'
  label: string
  active: boolean
}

interface Connection {
  from: string
  to: string
}

const INITIAL_NODES: Node[] = [
  { id: 'i1', x: 80, y: 80, type: 'input', label: 'Data', active: false },
  { id: 'i2', x: 80, y: 180, type: 'input', label: 'Features', active: false },
  { id: 'i3', x: 80, y: 280, type: 'input', label: 'Context', active: false },
  { id: 'h1', x: 250, y: 60, type: 'hidden', label: 'Embed', active: false },
  { id: 'h2', x: 250, y: 150, type: 'hidden', label: 'Attention', active: false },
  { id: 'h3', x: 250, y: 240, type: 'hidden', label: 'Transform', active: false },
  { id: 'h4', x: 250, y: 330, type: 'hidden', label: 'Dense', active: false },
  { id: 'o1', x: 420, y: 120, type: 'output', label: 'Predict', active: false },
  { id: 'o2', x: 420, y: 240, type: 'output', label: 'Generate', active: false },
]

const VALID_CONNECTIONS: [string, string][] = [
  ['i1', 'h1'], ['i1', 'h2'], ['i2', 'h2'], ['i2', 'h3'],
  ['i3', 'h3'], ['i3', 'h4'], ['h1', 'h2'], ['h2', 'h3'],
  ['h3', 'h4'], ['h1', 'o1'], ['h2', 'o1'], ['h3', 'o2'], ['h4', 'o2']
]

const REQUIRED_CONNECTIONS = 6

const LINKS = [
  { label: 'Agents IA Pro', url: 'https://agents-ia.pro', desc: 'Deploy AI agents' },
  { label: 'AI-DUE Architecture', url: 'https://ai-due.com/fr/blog/architecture-ia-fondamentaux', desc: 'Learn AI architecture' },
  { label: 'Vocalis Pro', url: 'https://vocalis.pro', desc: 'Voice AI systems' },
]

export default function NeuralNetworkBuilder() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES)
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')

  const handleNodeClick = useCallback((nodeId: string) => {
    if (gameOver) return

    if (!selectedNode) {
      setSelectedNode(nodeId)
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, active: true } : n))
      return
    }

    if (selectedNode === nodeId) {
      setSelectedNode(null)
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, active: false } : n))
      return
    }

    const exists = connections.some(c =>
      (c.from === selectedNode && c.to === nodeId) || (c.from === nodeId && c.to === selectedNode)
    )

    if (exists) {
      setSelectedNode(null)
      setNodes(prev => prev.map(n => ({ ...n, active: false })))
      setMessage('Deja connecte !')
      setTimeout(() => setMessage(''), 1500)
      return
    }

    const isValid = VALID_CONNECTIONS.some(([a, b]) =>
      (a === selectedNode && b === nodeId) || (a === nodeId && b === selectedNode)
    )

    if (isValid) {
      const newConn = { from: selectedNode, to: nodeId }
      const newConns = [...connections, newConn]
      setConnections(newConns)
      setScore(prev => prev + 10)
      setMessage('+10 points !')

      if (newConns.length >= REQUIRED_CONNECTIONS) {
        setGameOver(true)
        setScore(prev => prev + 50)
        setMessage('Reseau complete ! +50 bonus')
      }
    } else {
      setScore(prev => Math.max(0, prev - 5))
      setMessage('Connection invalide ! -5')
    }

    setSelectedNode(null)
    setNodes(prev => prev.map(n => ({ ...n, active: false })))
    setTimeout(() => setMessage(''), 2000)
  }, [selectedNode, connections, gameOver])

  const reset = () => {
    setNodes(INITIAL_NODES)
    setConnections([])
    setSelectedNode(null)
    setScore(0)
    setGameOver(false)
    setMessage('')
  }

  const colors = { input: '#8B5CF6', hidden: '#FFD700', output: '#10B981' }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[#FFD700] font-bold text-lg">Score: {score}</div>
        <div className="text-gray-400 text-sm">{connections.length} / {REQUIRED_CONNECTIONS} connections</div>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-bold mb-3 text-[#FFD700]">
          {message}
        </motion.div>
      )}

      <div className="relative bg-[#0a0a1f] rounded-2xl border border-purple-500/20 overflow-hidden" style={{ minHeight: '300px' }}>
        <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet" className="touch-none">
          {/* Connections */}
          {connections.map((c, i) => {
            const from = nodes.find(n => n.id === c.from)
            const to = nodes.find(n => n.id === c.to)
            if (!from || !to) return null
            return (
              <motion.line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="#FFD700" strokeWidth="2" opacity={0.6}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            )
          })}

          {/* Selected line preview */}
          {selectedNode && (
            <circle cx={nodes.find(n => n.id === selectedNode)?.x} cy={nodes.find(n => n.id === selectedNode)?.y}
              r="30" fill="none" stroke="#FFD700" strokeWidth="2" opacity={0.4}
              strokeDasharray="4,4">
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${nodes.find(n => n.id === selectedNode)?.x} ${nodes.find(n => n.id === selectedNode)?.y}`}
                to={`360 ${nodes.find(n => n.id === selectedNode)?.x} ${nodes.find(n => n.id === selectedNode)?.y}`}
                dur="3s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id} onClick={() => handleNodeClick(node.id)} className="cursor-pointer">
              {/* Invisible larger touch target */}
              <circle cx={node.x} cy={node.y} r="35" fill="transparent" />
              <circle cx={node.x} cy={node.y} r={node.active ? 24 : 20}
                fill={colors[node.type]} opacity={node.active ? 1 : 0.7}
                stroke={node.active ? '#fff' : 'transparent'} strokeWidth="2"
              />
              <circle cx={node.x} cy={node.y} r="28" fill={colors[node.type]} opacity={0.1} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                {node.label}
              </text>
            </g>
          ))}

          {/* Legend */}
          <g transform="translate(10, 370)">
            {[
              { color: '#8B5CF6', label: 'Input' },
              { color: '#FFD700', label: 'Hidden' },
              { color: '#10B981', label: 'Output' }
            ].map((item, i) => (
              <g key={i} transform={`translate(${i * 100}, 0)`}>
                <circle cx="6" cy="0" r="5" fill={item.color} />
                <text x="16" y="4" fill="gray" fontSize="10">{item.label}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <p className="text-gray-500 text-xs mt-3 text-center">
        Cliquez sur deux noeuds pour les connecter. Construisez un reseau fonctionnel !
      </p>

      {/* Bouton Valider */}
      {!gameOver && connections.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={() => {
              if (connections.length >= REQUIRED_CONNECTIONS) {
                setGameOver(true)
                setScore(prev => prev + 50)
                setMessage('Reseau valide ! +50 bonus')
              } else {
                setMessage(`Il manque ${REQUIRED_CONNECTIONS - connections.length} connexion(s) !`)
                setTimeout(() => setMessage(''), 2500)
              }
            }}
            className="flex-1 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-black font-bold text-sm hover:scale-[1.02] transition-transform"
          >
            ✓ Valider mon reseau ({connections.length}/{REQUIRED_CONNECTIONS})
          </button>
          <button onClick={reset} className="px-4 py-3 min-h-[44px] rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5">
            Recommencer
          </button>
        </div>
      )}

      <AnimatePresence>
        {gameOver && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="text-center p-6 rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/5">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-black text-white mb-2">Reseau Complete !</h3>
              <p className="text-[#FFD700] font-bold text-2xl mb-4">Score: {score}</p>
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
              <button onClick={reset} className="px-6 py-3 min-h-[44px] rounded-xl bg-purple-600 text-white font-bold text-sm w-full sm:w-auto">Rejouer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
