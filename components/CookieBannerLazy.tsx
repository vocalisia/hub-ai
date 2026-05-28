'use client'

import dynamic from 'next/dynamic'

// Lazy load CookieBanner — modal-style component, no SEO content,
// shown only after user has not yet consented. ssr:false safe here.
const CookieBanner = dynamic(() => import('./CookieBanner'), {
  ssr: false,
  loading: () => null,
})

export default function CookieBannerLazy() {
  return <CookieBanner />
}
