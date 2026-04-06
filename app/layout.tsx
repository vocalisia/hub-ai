import Script from 'next/script';

const GA_ID = 'G-PE4BF17GKG';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="consent-init" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        var _c = (typeof localStorage !== 'undefined') ? localStorage.getItem('hub_cookies') : null;
        gtag('consent', 'default', { analytics_storage: _c === 'accepted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-config" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
      {children}
    </>
  );
}
