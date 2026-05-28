'use client'
// SceneAI-style 4-column explainer — what each AI model does
// Branch: redesign-2026-v2
import { useLocale } from 'next-intl'

const MODELS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    titles: { fr: 'Persona Engine', en: 'Persona Engine', de: 'Persona Engine', it: 'Persona Engine' },
    descs: {
      fr: '250 agents IA avec profils démographiques, psychographiques et comportementaux distincts. Chaque agent réagit selon son persona à votre scénario.',
      en: '250 AI agents with distinct demographic, psychographic and behavioral profiles. Each agent reacts to your scenario based on its persona.',
      de: '250 KI-Agenten mit unterschiedlichen demografischen, psychografischen und Verhaltensprofilen. Jeder Agent reagiert basierend auf seinem Persona.',
      it: '250 agenti AI con profili demografici, psicografici e comportamentali distinti. Ogni agente reagisce in base al suo persona.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
        <circle cx="20" cy="9" r="1.5" fill="currentColor" />
      </svg>
    ),
    titles: { fr: 'Prediction Markets', en: 'Prediction Markets', de: 'Prognosemärkte', it: 'Mercati di Previsione' },
    descs: {
      fr: 'Simule un marché de prédiction synthétique sur 3 plateformes en parallèle. Chaque tour donne une probabilité chiffrée d\'outcome.',
      en: 'Simulates a synthetic prediction market across 3 platforms in parallel. Each round yields a quantified outcome probability.',
      de: 'Simuliert einen synthetischen Prognosemarkt über 3 Plattformen parallel. Jede Runde liefert eine quantifizierte Ergebniswahrscheinlichkeit.',
      it: 'Simula un mercato di previsione sintetico su 3 piattaforme in parallelo. Ogni round produce una probabilità quantificata.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M9 10h.01M12 10h.01M15 10h.01" />
      </svg>
    ),
    titles: { fr: 'Sentiment Analyzer', en: 'Sentiment Analyzer', de: 'Sentiment-Analyse', it: 'Analizzatore Sentiment' },
    descs: {
      fr: 'Détecte les changements de sentiment en temps réel sur Twitter, Reddit et forums spécialisés via NLP fine-tuné multi-langue.',
      en: 'Detects sentiment shifts in real-time across Twitter, Reddit and specialized forums via multi-language fine-tuned NLP.',
      de: 'Erkennt Sentiment-Verschiebungen in Echtzeit auf Twitter, Reddit und Fachforen via mehrsprachig feinabgestimmtem NLP.',
      it: 'Rileva cambiamenti di sentiment in tempo reale su Twitter, Reddit e forum specializzati via NLP multilingua fine-tuned.',
    },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    titles: { fr: 'ReACT Synthesizer', en: 'ReACT Synthesizer', de: 'ReACT-Synthese', it: 'ReACT Sintetizzatore' },
    descs: {
      fr: 'Combine sentiment + prédictions + personas en un rapport ReACT structuré avec citations d\'agents et recommandations actionnables.',
      en: 'Combines sentiment + predictions + personas into a structured ReACT report with agent citations and actionable recommendations.',
      de: 'Kombiniert Sentiment + Prognosen + Personas zu einem strukturierten ReACT-Bericht mit Agenten-Zitaten und Handlungsempfehlungen.',
      it: 'Combina sentiment + previsioni + personas in un report ReACT strutturato con citazioni di agenti e raccomandazioni azionabili.',
    },
  },
] as const

const EYEBROW: Record<string, string> = {
  fr: 'Les 4 modèles qui font tourner AI-Due',
  en: '4 Models that power AI-Due',
  de: '4 Modelle, die AI-Due antreiben',
  it: '4 Modelli che alimentano AI-Due',
}

const TITLE: Record<string, string> = {
  fr: 'Que font nos agents IA ?',
  en: 'What do our AI agents do?',
  de: 'Was machen unsere KI-Agenten?',
  it: 'Cosa fanno i nostri agenti AI?',
}

export default function ModelsExplainer() {
  const locale = useLocale() as 'fr' | 'en' | 'de' | 'it'

  return (
    <section className="alumica-section relative bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="alumica-badge inline-block px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] text-white/90 font-medium mb-5">
            {EYEBROW[locale] ?? EYEBROW.en}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            <span className="alumica-grad-text">{TITLE[locale] ?? TITLE.en}</span>
          </h2>
        </div>

        {/* 4 columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODELS.map((m, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-7 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(255,138,0,0.15), rgba(234,88,12,0.05))' }}
              />
              {/* Icon */}
              <div className="relative w-12 h-12 mb-5 rounded-xl grid place-items-center bg-gradient-to-br from-[#ff8a00]/20 to-[#ea580c]/10 text-[#ff8a00]">
                <div className="w-6 h-6">{m.icon}</div>
              </div>
              {/* Title */}
              <h3 className="relative text-lg font-semibold text-white mb-3 tracking-tight">
                {m.titles[locale] ?? m.titles.en}
              </h3>
              {/* Description */}
              <p className="relative text-sm text-white/60 leading-relaxed">
                {m.descs[locale] ?? m.descs.en}
              </p>
              {/* Number badge */}
              <div className="relative absolute top-5 right-5 text-[10px] font-mono text-white/30 tracking-wider">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
