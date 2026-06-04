'use client'

import Link from 'next/link'
import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  locale: string
}

type State = {
  hasError: boolean
}

export default class ClientErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AI-Due client render recovered', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const locale = ['fr', 'en', 'de', 'it'].includes(this.props.locale)
      ? this.props.locale
      : 'fr'

    const copy = locale === 'en'
      ? {
          title: 'AI-Due is loading in safe mode',
          text: 'A browser extension or cached script blocked part of the interactive page. You can continue from the main sections below.',
          home: 'Reload homepage',
          contact: 'Contact',
          blog: 'Blog',
        }
      : {
          title: 'AI-Due charge en mode sécurisé',
          text: "Une extension navigateur ou un script en cache a bloqué une partie de la page interactive. Vous pouvez continuer avec les accès principaux ci-dessous.",
          home: "Recharger l'accueil",
          contact: 'Contact',
          blog: 'Blog',
        }

    return (
      <main className="min-h-screen bg-[#0a0f2e] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d9b76f]">AI-Due</p>
          <h1 className="mt-4 text-3xl font-black">{copy.title}</h1>
          <p className="mt-4 text-white/75">{copy.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#d9b76f] px-5 py-3 text-sm font-bold text-[#0a0f2e]"
            >
              {copy.home}
            </button>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
            >
              {copy.contact}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
            >
              {copy.blog}
            </Link>
          </div>
        </div>
      </main>
    )
  }
}
