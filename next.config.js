/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp']
  },
  images: {
    domains: [
      'ai-due.com',
      'aiautomationsaas.com',
      'iapmesuisse.ch',
      'images.unsplash.com'
    ]
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' }
        ]
      },
      {
        source: '/:locale/blog/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' }
        ]
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
