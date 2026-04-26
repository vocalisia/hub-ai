import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum / Legal Notice | AI-DUE',
  description: 'Legal notice and company information for AI-DUE.',
  alternates: {
    canonical: 'https://ai-due.com/en/impressum',
    languages: {
      en: 'https://ai-due.com/en/impressum',
      fr: 'https://ai-due.com/fr/impressum',
      de: 'https://ai-due.com/de/impressum',
      it: 'https://ai-due.com/it/impressum',
    },
  },
}

export default function ImpressumPage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  const isFr = locale === 'fr'
  const isDe = locale === 'de'
  const isIt = locale === 'it'

  const content = isFr
    ? {
        title: 'Mentions légales',
        rows: [
          ['Éditeur du site', 'VAULT 369 LTD'],
          ['Marque', 'AI-DUE'],
          ['Directeur de publication', 'Laurent Duplat'],
          ['Email', 'contact@ai-due.com'],
          ['Régime fiscal', 'Franchise en base TVA — art. 293 B CGI (factures sans TVA)'],
          ['Hébergement', 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA'],
          ['Propriété intellectuelle', "L'ensemble du contenu (textes, images, logos, code) est protégé. Toute reproduction sans autorisation écrite est interdite."],
          ['Données personnelles', 'Voir notre Politique de confidentialité.'],
          ['Cookies', 'Consent Mode v2 actif. Bannière de gestion des préférences.'],
          ['Médiation', "En cas de litige, médiation possible auprès du Médiateur de la consommation. Plateforme européenne ODR : ec.europa.eu/consumers/odr"],
        ],
      }
    : isDe
    ? {
        title: 'Impressum',
        rows: [
          ['Anbieter', 'VAULT 369 LTD'],
          ['Marke', 'AI-DUE'],
          ['Verantwortlicher', 'Laurent Duplat'],
          ['E-Mail', 'contact@ai-due.com'],
          ['Steuerstatus', 'Kleinunternehmerregelung (Art. 293 B CGI) — Rechnungen ohne MwSt'],
          ['Hosting', 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA'],
          ['Urheberrecht', 'Alle Inhalte (Texte, Bilder, Logos, Code) sind geschützt. Reproduktion ohne schriftliche Genehmigung untersagt.'],
          ['Personenbezogene Daten', 'Siehe unsere Datenschutzerklärung.'],
          ['Cookies', 'Consent Mode v2 aktiv. Verwaltungsbanner verfügbar.'],
          ['Streitschlichtung', 'EU-Plattform für Online-Streitbeilegung: ec.europa.eu/consumers/odr'],
        ],
      }
    : isIt
    ? {
        title: 'Note legali',
        rows: [
          ['Editore', 'VAULT 369 LTD'],
          ['Marchio', 'AI-DUE'],
          ['Direttore della pubblicazione', 'Laurent Duplat'],
          ['Email', 'contact@ai-due.com'],
          ['Regime fiscale', 'Franchigia IVA — art. 293 B CGI (fatture senza IVA)'],
          ['Hosting', 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA'],
          ['Proprietà intellettuale', 'Tutti i contenuti (testi, immagini, loghi, codice) sono protetti. Riproduzione senza autorizzazione scritta vietata.'],
          ['Dati personali', 'Vedi la nostra Informativa sulla privacy.'],
          ['Cookie', 'Consent Mode v2 attivo. Banner di gestione delle preferenze.'],
          ['Mediazione', 'Piattaforma ODR europea: ec.europa.eu/consumers/odr'],
        ],
      }
    : {
        title: 'Legal Notice / Impressum',
        rows: [
          ['Publisher', 'VAULT 369 LTD'],
          ['Brand', 'AI-DUE'],
          ['Publication director', 'Laurent Duplat'],
          ['Email', 'contact@ai-due.com'],
          ['Tax regime', 'French small-business VAT exemption (art. 293 B CGI) — invoices without VAT'],
          ['Hosting', 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA'],
          ['Intellectual property', 'All content (text, images, logos, code) is protected. Reproduction without written authorization prohibited.'],
          ['Personal data', 'See our Privacy Policy.'],
          ['Cookies', 'Consent Mode v2 active. Preference management banner available.'],
          ['Dispute resolution', 'EU online dispute resolution platform: ec.europa.eu/consumers/odr'],
        ],
      }

  return (
    <main className="min-h-screen bg-[#0a0f2e] text-white">
      <section className="relative pt-24 pb-20 px-4 sm:px-6">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at top, #1a2560 0%, #0a0f2e 60%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="eyebrow mb-4">Legal</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 font-[Montserrat]">{content.title}</h1>
          <dl
            className="rounded-3xl p-6 sm:p-8"
            style={{
              border: '1px solid rgba(201,165,114,0.2)',
              background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
            }}
          >
            {content.rows.map(([k, v], i) => (
              <div
                key={k}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 py-3"
                style={{ borderBottom: i < content.rows.length - 1 ? '1px solid rgba(201,165,114,0.1)' : 'none' }}
              >
                <dt className="text-[12px] font-bold uppercase tracking-[1.5px] text-gold">{k}</dt>
                <dd className="text-white/85 text-[14px] leading-[1.6]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  )
}
