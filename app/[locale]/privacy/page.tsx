import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AI-DUE',
  description: 'AI-DUE privacy policy and GDPR compliance.',
  alternates: {
    canonical: 'https://ai-due.com/en/privacy',
    languages: {
      en: 'https://ai-due.com/en/privacy',
      fr: 'https://ai-due.com/fr/privacy',
      de: 'https://ai-due.com/de/privacy',
      it: 'https://ai-due.com/it/privacy',
    },
  },
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  const isFr = locale === 'fr'
  const isDe = locale === 'de'
  const isIt = locale === 'it'

  const content = isFr
    ? {
        title: 'Politique de confidentialité',
        last: 'Dernière mise à jour : 25 avril 2026',
        sections: [
          ['Responsable du traitement', 'VAULT 369 LTD, opérant la marque AI-DUE. Pour toute question : contact@ai-due.com'],
          ['Données collectées', 'Email, nom, entreprise (optionnel), informations de paiement (via Stripe), documents uploadés pour simulation, métriques d\'usage anonymisées.'],
          ['Finalités', 'Fourniture du service, facturation, support client, amélioration produit, communication marketing (avec opt-in).'],
          ['Base légale (RGPD)', 'Exécution contractuelle (service), intérêt légitime (analytics), consentement (cookies marketing, newsletter).'],
          ['Sous-traitants', 'Vercel (hébergement), Stripe (paiements), Mammouth/OpenAI (LLM simulation), Resend (emails), Google Analytics 4 (consent mode v2).'],
          ['Conservation', 'Comptes actifs : durée du contrat. Documents simulation : 30 jours. Logs : 12 mois. Facturation : 10 ans (obligation légale).'],
          ['Vos droits', 'Accès, rectification, effacement, portabilité, opposition, limitation. Contact : contact@ai-due.com. Réclamation auprès de la CNIL.'],
          ['Cookies', 'Consent Mode v2 actif. Bannière de gestion à votre disposition. Détails dans les paramètres cookies.'],
          ['Transferts hors UE', 'Stripe (USA — Standard Contractual Clauses), OpenAI (USA — DPA en place).'],
        ],
      }
    : isDe
    ? {
        title: 'Datenschutzerklärung',
        last: 'Letzte Aktualisierung: 25. April 2026',
        sections: [
          ['Verantwortlicher', 'VAULT 369 LTD, Betreiber der Marke AI-DUE. Anfragen: contact@ai-due.com'],
          ['Erhobene Daten', 'E-Mail, Name, Unternehmen (optional), Zahlungsinformationen (via Stripe), hochgeladene Dokumente für Simulationen, anonymisierte Nutzungsmetriken.'],
          ['Zwecke', 'Bereitstellung des Dienstes, Abrechnung, Kundensupport, Produktverbesserung, Marketing-Kommunikation (mit Opt-in).'],
          ['Rechtsgrundlage (DSGVO)', 'Vertragserfüllung (Dienst), berechtigtes Interesse (Analytics), Einwilligung (Marketing-Cookies, Newsletter).'],
          ['Auftragsverarbeiter', 'Vercel (Hosting), Stripe (Zahlungen), Mammouth/OpenAI (LLM), Resend (E-Mails), Google Analytics 4 (Consent Mode v2).'],
          ['Speicherdauer', 'Aktive Konten: Vertragsdauer. Simulationsdokumente: 30 Tage. Logs: 12 Monate. Rechnungen: 10 Jahre (gesetzlich).'],
          ['Ihre Rechte', 'Auskunft, Berichtigung, Löschung, Übertragbarkeit, Widerspruch, Einschränkung. Kontakt: contact@ai-due.com.'],
          ['Cookies', 'Consent Mode v2 aktiv. Verwaltungsbanner verfügbar. Details in den Cookie-Einstellungen.'],
          ['Drittlandtransfers', 'Stripe (USA — Standardvertragsklauseln), OpenAI (USA — DPA vorhanden).'],
        ],
      }
    : isIt
    ? {
        title: 'Politica sulla privacy',
        last: 'Ultimo aggiornamento: 25 aprile 2026',
        sections: [
          ['Titolare del trattamento', 'VAULT 369 LTD, operatore del marchio AI-DUE. Contatti: contact@ai-due.com'],
          ['Dati raccolti', 'Email, nome, azienda (facoltativo), informazioni di pagamento (tramite Stripe), documenti caricati per simulazioni, metriche di utilizzo anonimizzate.'],
          ['Finalità', 'Fornitura del servizio, fatturazione, assistenza clienti, miglioramento prodotto, comunicazione marketing (con opt-in).'],
          ['Base giuridica (GDPR)', 'Esecuzione contrattuale (servizio), legittimo interesse (analytics), consenso (cookie marketing, newsletter).'],
          ['Responsabili', 'Vercel (hosting), Stripe (pagamenti), Mammouth/OpenAI (LLM), Resend (email), Google Analytics 4 (consent mode v2).'],
          ['Conservazione', 'Account attivi: durata del contratto. Documenti simulazione: 30 giorni. Log: 12 mesi. Fatturazione: 10 anni (obbligo di legge).'],
          ['Tuoi diritti', 'Accesso, rettifica, cancellazione, portabilità, opposizione, limitazione. Contatto: contact@ai-due.com.'],
          ['Cookie', 'Consent Mode v2 attivo. Banner di gestione disponibile.'],
          ['Trasferimenti extra-UE', 'Stripe (USA — Clausole Contrattuali Standard), OpenAI (USA — DPA in essere).'],
        ],
      }
    : {
        title: 'Privacy Policy',
        last: 'Last updated: April 25, 2026',
        sections: [
          ['Data controller', 'VAULT 369 LTD, operating the AI-DUE brand. Inquiries: contact@ai-due.com'],
          ['Data collected', 'Email, name, company (optional), payment information (via Stripe), documents uploaded for simulations, anonymized usage metrics.'],
          ['Purposes', 'Service delivery, billing, customer support, product improvement, marketing communications (opt-in).'],
          ['Legal basis (GDPR)', 'Contract performance (service), legitimate interest (analytics), consent (marketing cookies, newsletter).'],
          ['Data processors', 'Vercel (hosting), Stripe (payments), Mammouth/OpenAI (LLM simulation), Resend (emails), Google Analytics 4 (consent mode v2).'],
          ['Retention', 'Active accounts: contract duration. Simulation documents: 30 days. Logs: 12 months. Invoices: 10 years (legal requirement).'],
          ['Your rights', 'Access, rectification, erasure, portability, objection, restriction. Contact: contact@ai-due.com. Complaint to your local DPA.'],
          ['Cookies', 'Consent Mode v2 active. Management banner available. Details in cookie settings.'],
          ['Non-EU transfers', 'Stripe (USA — Standard Contractual Clauses), OpenAI (USA — DPA in place).'],
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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 font-[Montserrat]">{content.title}</h1>
          <p className="text-white/55 text-sm mb-12">{content.last}</p>
          <div className="space-y-8">
            {content.sections.map(([heading, body]) => (
              <section key={heading}>
                <h2 className="text-lg font-bold text-gold mb-2 font-[Montserrat]">{heading}</h2>
                <p className="text-white/80 leading-[1.7] text-[15px]">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
