import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#030014',
        'purple-accent': '#8b5cf6',
        'gold-accent': '#FFD700',
        'gold-dark': '#DAA520',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#a78bfa',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-code': '#c4b5fd',
            '--tw-prose-quotes': '#c4b5fd',
            '--tw-prose-quote-borders': '#8b5cf6',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
