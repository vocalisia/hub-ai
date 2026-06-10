'use client'
// Hero based on SceneAI "Alumica" blueprint.
// Background video loads immediately. No poster image fallback to avoid
// visible swap on slow connections. Black background acts as natural
// placeholder while video buffers (~1-2s on 4G).
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'

const HERO_VIDEO = 'https://cdn.sceneai.art/backgrounds/5443dc2c-dd3e-4de2-8725-6cc65c48bff8.mp4'

export default function AlumicaHero() {
  const t = useTranslations('swarm.hero')
  const locale = useLocale()

  return (
    <section className="alumica-section relative w-full overflow-hidden bg-black min-h-screen flex items-center">

      {/* Layer 1: Background video (loads immediately, black bg while buffering) */}
      <video
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2: 40% black overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden />

      {/* Content wrapper */}
      <div className="alumica-section relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="alumica-fade inline-block alumica-badge px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] text-white/90 font-medium mb-7"
          style={{ animationDelay: '0.1s' }}
        >
          {locale === 'fr' ? 'Best Intelligence Layer 2026' : locale === 'de' ? 'Best Intelligence Layer 2026' : locale === 'it' ? 'Best Intelligence Layer 2026' : 'Best Intelligence Layer 2026'}
        </div>

        {/* Heading top line */}
        <h1 className="alumica-fade text-[40px] sm:text-[60px] md:text-[78px] lg:text-[92px] font-medium leading-[1.05] tracking-tight mb-1"
          style={{ animationDelay: '0.25s' }}
        >
          <span className="alumica-grad-text">
            {locale === 'fr' ? "Redéfinir l'avenir de" : locale === 'de' ? 'Die Zukunft von' : locale === 'it' ? "Ridefinire il futuro dell'" : 'Redefining the Future of'}
          </span>
        </h1>

        {/* Heading bottom line — orange gradient */}
        <div className="alumica-fade text-[40px] sm:text-[60px] md:text-[78px] lg:text-[92px] font-medium leading-[1.05] tracking-tight mb-7"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="alumica-grad-orange">
            {locale === 'fr' ? "l'Architecture IA" : locale === 'de' ? 'KI-Architektur neu definieren' : locale === 'it' ? 'Architettura AI' : 'AI Architecture'}
          </span>
        </div>

        {/* Sub-headline */}
        <p className="alumica-fade text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ animationDelay: '0.55s' }}
        >
          {locale === 'fr'
            ? "Architecture IA & systèmes intelligents pour entreprises en Suisse, Europe, Canada et USA. 250 agents IA, simulation d'opinion, livré en moins de 5 minutes."
            : locale === 'de'
              ? 'KI-Architektur & intelligente Systeme für Unternehmen in der Schweiz, Europa, Kanada und USA. 250 KI-Agenten, Meinungssimulation, geliefert in unter 5 Minuten.'
              : locale === 'it'
                ? "Architettura AI & sistemi intelligenti per aziende in Svizzera, Europa, Canada e USA. 250 agenti AI, simulazione d'opinione, consegnato in meno di 5 minuti."
                : 'AI Architecture & intelligent systems for businesses in Switzerland, Europe, Canada and USA. 250 AI agents, opinion simulation, delivered in under 5 minutes.'}
        </p>

        {/* Primary CTA — Alumica style */}
        <div className="alumica-fade flex items-center justify-center" style={{ animationDelay: '0.7s' }}>
          <Link
            href={`/${locale}/paiement?plan=pro`}
            className="alumica-cta inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-7 py-3.5 rounded-full text-white font-medium text-[15px] hover:bg-white/10 transition-all duration-300"
          >
            <span className="relative z-10">
              {locale === 'fr' ? 'Démarrer maintenant' : locale === 'de' ? 'Jetzt starten' : locale === 'it' ? 'Inizia ora' : 'Join Today'}
            </span>
            <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#ff8a00] to-[#ea580c]">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Avatar group bottom */}
        <div className="alumica-fade mt-12 flex flex-col items-center gap-2"
          style={{ animationDelay: '0.85s' }}
        >
          <div className="flex -space-x-2.5">
            {[44, 32, 68, 12, 47].map((seed, i) => (
              <Image
                key={seed}
                src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${seed}.jpg`}
                alt={`Member ${i + 1}`}
                className="h-8 w-8 rounded-full border-2 border-black object-cover"
                width={32}
                height={32}
                loading="lazy"
                style={{ filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.55))' }}
              />
            ))}
            <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-black bg-white/10 backdrop-blur-md text-[10px] font-bold text-white">
              +500
            </div>
          </div>
          <p className="text-white/55 text-xs tracking-wide">
            {locale === 'fr' ? 'Rejoint par 500+ équipes' : locale === 'de' ? 'Von 500+ Teams gewählt' : locale === 'it' ? 'Scelto da 500+ team' : 'Trusted by 500+ teams'}
          </p>
        </div>
      </div>
    </section>
  )
}
