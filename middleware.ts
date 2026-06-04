import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'fr', 'de', 'it'],
  defaultLocale: 'fr',
  localeDetection: false,
})

export const config = {
  matcher: ['/', '/(en|fr|de|it)/:path*'],
}
