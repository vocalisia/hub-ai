'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TYPES = [
  { value: 'email', label: 'Email professionnel' },
  { value: 'article', label: 'Article de blog' },
  { value: 'social', label: 'Post social media' },
  { value: 'code', label: 'Code / Dev' },
  { value: 'analyse', label: 'Analyse de donnees' },
]

const TONS = [
  { value: 'professionnel', label: 'Professionnel' },
  { value: 'creatif', label: 'Creatif' },
  { value: 'technique', label: 'Technique' },
  { value: 'amical', label: 'Amical' },
]

const LONGUEURS = [
  { value: 'court', label: 'Court (50-100 mots)' },
  { value: 'moyen', label: 'Moyen (200-400 mots)' },
  { value: 'long', label: 'Long (500+ mots)' },
]

const LINKS = [
  { name: 'Vocalis Blog', desc: 'Articles IA & automation', url: 'https://vocalis.blog', color: 'from-purple-500 to-violet-600' },
  { name: 'SEO True', desc: 'SEO augmente par l\'IA', url: 'https://seo-true.com', color: 'from-cyan-500 to-teal-600' },
  { name: 'Agents IA Pro', desc: 'Agents IA sur mesure', url: 'https://agents-ia.pro', color: 'from-gold-accent to-amber-600' },
]

function generatePrompt(type: string, ton: string, longueur: string, sujet: string): string {
  const typeMap: Record<string, string> = {
    email: 'un email professionnel',
    article: 'un article de blog complet et structure',
    social: 'un post engageant pour les reseaux sociaux',
    code: 'du code propre et documente',
    analyse: 'une analyse detaillee de donnees',
  }

  const tonMap: Record<string, string> = {
    professionnel: 'professionnel et formel',
    creatif: 'creatif et original',
    technique: 'technique et precis',
    amical: 'amical et accessible',
  }

  const longueurMap: Record<string, string> = {
    court: 'Sois concis : 50 a 100 mots maximum.',
    moyen: 'Longueur moyenne : entre 200 et 400 mots.',
    long: 'Contenu detaille : 500 mots minimum avec sous-sections.',
  }

  const contextMap: Record<string, string> = {
    email: `\n\n**Structure attendue :**\n- Objet de l'email (clair et impactant)\n- Salutation adaptee\n- Corps du message (contexte + demande/proposition)\n- Call-to-action\n- Signature professionnelle`,
    article: `\n\n**Structure attendue :**\n- Titre H1 accrocheur (SEO-friendly)\n- Introduction avec hook\n- 3 a 5 sous-sections avec H2\n- Exemples concrets ou donnees\n- Conclusion avec call-to-action\n- Meta-description (155 caracteres)`,
    social: `\n\n**Structure attendue :**\n- Hook des la premiere ligne\n- Corps du message (valeur + storytelling)\n- Emojis pertinents (sans exces)\n- Call-to-action engageant\n- 3 a 5 hashtags strategiques`,
    code: `\n\n**Structure attendue :**\n- Description fonctionnelle\n- Code propre avec commentaires\n- Gestion des erreurs\n- Exemples d'utilisation\n- Documentation des parametres`,
    analyse: `\n\n**Structure attendue :**\n- Contexte et objectifs de l'analyse\n- Methodologie proposee\n- Points cles a examiner\n- Format de presentation des resultats\n- Recommandations actionnables`,
  }

  return `Tu es un expert en creation de contenu et communication. Redige ${typeMap[type] || 'du contenu'} sur le sujet suivant :

**Sujet :** ${sujet || '[Votre sujet ici]'}

**Ton :** Adopte un ton ${tonMap[ton] || 'professionnel'}.

**Longueur :** ${longueurMap[longueur] || longueurMap.moyen}
${contextMap[type] || ''}

**Consignes supplementaires :**
- Utilise un langage clair et impactant
- Integre des donnees ou exemples si pertinent
- Adapte le vocabulaire au public cible
- Assure une coherence dans le style du debut a la fin`
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    if (!text) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 8)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-purple-400 ml-0.5 animate-pulse align-middle" />}
    </span>
  )
}

export default function PromptGenerator() {
  const [type, setType] = useState('email')
  const [ton, setTon] = useState('professionnel')
  const [longueur, setLongueur] = useState('moyen')
  const [sujet, setSujet] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    const prompt = generatePrompt(type, ton, longueur, sujet)
    setOutput(prompt)
    setGenerated(true)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectClass = "w-full bg-[#0a0a1f] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 appearance-none cursor-pointer transition-all"

  return (
    <div className="max-w-4xl mx-auto">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-5"
        >
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Type de contenu</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-5"
        >
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Ton</label>
          <select value={ton} onChange={(e) => setTon(e.target.value)} className={selectClass}>
            {TONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-5"
        >
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Longueur</label>
          <select value={longueur} onChange={(e) => setLongueur(e.target.value)} className={selectClass}>
            {LONGUEURS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </motion.div>
      </div>

      {/* Topic input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#0a0a1f]/80 rounded-2xl border border-white/[0.06] p-5 mb-6"
      >
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Sujet / Theme</label>
        <input
          type="text"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
          placeholder="Ex: L'impact de l'IA sur la productivite des PME suisses..."
          className="w-full bg-transparent border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        />
      </motion.div>

      {/* Generate button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-center mb-10"
      >
        <button
          onClick={handleGenerate}
          className="relative px-10 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generer le prompt
          </span>
        </button>
      </motion.div>

      {/* Output */}
      <AnimatePresence>
        {generated && output && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#0a0a1f] to-[#110a2e] rounded-2xl border border-purple-500/20 p-6 mb-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">Votre prompt</h3>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copie !
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copier
                  </span>
                )}
              </button>
            </div>

            <div className="bg-black/30 rounded-xl p-5 border border-white/[0.04] font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              <TypewriterText text={output} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Ressources complementaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="group bg-[#0a0a1f]/80 rounded-xl border border-white/[0.06] p-5 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white text-sm font-bold mb-3 group-hover:scale-110 transition-transform`}>
                {link.name[0]}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors">{link.name}</h4>
              <p className="text-gray-500 text-xs">{link.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
