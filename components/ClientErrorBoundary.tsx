'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
  name?: string
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
    console.error(`AI-Due client render recovered${this.props.name ? ` in ${this.props.name}` : ''}`, error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return this.props.fallback ?? null
  }
}
