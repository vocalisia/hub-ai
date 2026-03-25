import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'en', 'de', 'it'],
  defaultLocale: 'fr',
  localeDetection: true
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
