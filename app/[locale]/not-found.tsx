import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-violet-900/8 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="text-8xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Page introuvable
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          La page que vous cherchez n&apos;existe pas ou a ete deplacee.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour a l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
