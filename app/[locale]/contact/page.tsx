import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Contact | AI-DUE',
    description: 'Contactez AI-DUE - Architecture IA & Systemes Intelligents. Suisse, Europe, Canada, USA.',
  }
}

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <main className="min-h-screen bg-[#030014] relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-violet-900/8 rounded-full blur-[180px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-purple-400 text-xs font-semibold uppercase tracking-[0.25em] mb-5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Contact{' '}
              <span className="bg-gradient-to-r from-purple-400 to-[#FFD700] bg-clip-text text-transparent">AI-DUE</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {locale === 'en' ? 'Book a call to discuss your AI project.' :
               locale === 'de' ? 'Buchen Sie einen Termin fur Ihr KI-Projekt.' :
               locale === 'it' ? 'Prenota una chiamata per il tuo progetto IA.' :
               'Reservez un appel pour discuter de votre projet IA.'}
            </p>
            <div className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* iClosed embed */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden">
                <iframe
                  src="https://app.iclosed.io/e/sebastien-ai"
                  style={{ width: '100%', height: '650px', border: 'none', borderRadius: '12px' }}
                  title="Book a call"
                  allow="camera;microphone"
                />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { city: 'Geneve', country: 'Suisse', flag: '🇨🇭', status: 'HQ' },
                { city: 'Montreal', country: 'Canada', flag: '🇨🇦', status: 'Office' },
                { city: 'Paris', country: 'France', flag: '🇫🇷', status: 'Office' },
              ].map((loc) => (
                <div key={loc.city} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      {loc.flag}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm">{loc.city}</h3>
                        <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">{loc.status}</span>
                      </div>
                      <p className="text-gray-600 text-xs">{loc.country}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-white font-semibold text-sm mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm">ai-due.com</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/[0.06] to-transparent border border-purple-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Active</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {locale === 'en' ? 'Average response time:' :
                   locale === 'de' ? 'Durchschnittliche Antwortzeit:' :
                   locale === 'it' ? 'Tempo di risposta medio:' :
                   'Temps de reponse moyen :'}{' '}
                  <span className="text-white font-semibold">
                    {locale === 'en' ? 'under 24h' :
                     locale === 'de' ? 'unter 24h' :
                     locale === 'it' ? 'meno di 24h' :
                     'moins de 24h'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
