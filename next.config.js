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
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' }
        ]
      },
      {
        // Static assets: cache 1h
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        // Dynamic blog pages: no CDN cache (force-dynamic pages)
        source: '/:locale/blog/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' }
        ]
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
