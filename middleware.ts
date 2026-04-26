import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'fr', 'de', 'it'],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/', '/(en|fr|de|it)/:path*'],
}
