/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp']
  },
  images: {
    domains: [
      'sebastien-ia.com',
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
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'Cache-Control', value: 'public, max-age=3600' }
        ]
      }
    ]
  }
}

module.exports = nextConfig
