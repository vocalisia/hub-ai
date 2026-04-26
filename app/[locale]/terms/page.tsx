import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AI-DUE',
  description: 'AI-DUE terms of service.',
  alternates: {
    canonical: 'https://ai-due.com/en/terms',
    languages: {
      en: 'https://ai-due.com/en/terms',
      fr: 'https://ai-due.com/fr/terms',
      de: 'https://ai-due.com/de/terms',
      it: 'https://ai-due.com/it/terms',
    },
  },
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  const isFr = locale === 'fr'
  const isDe = locale === 'de'
  const isIt = locale === 'it'

  const content = isFr
    ? {
        title: "Conditions d'utilisation",
        last: 'Dernière mise à jour : 25 avril 2026',
        sections: [
          ['Objet', "AI-DUE est un moteur de simulation d'opinion publique multi-agents opéré par VAULT 369 LTD. Ces conditions régissent l'usage du service."],
          ['Acceptation', "En créant un compte ou en utilisant le service, vous acceptez ces conditions sans réserve."],
          ['Comptes', "Vous êtes responsable de la confidentialité de vos identifiants. Un compte par utilisateur. Comptes professionnels uniquement."],
          ['Abonnements et paiement', "Plans Starter (gratuit), Pro et Enterprise. Facturation mensuelle via Stripe. Renouvellement automatique. Annulation à tout moment, prend effet à la fin de la période payée. Pas de remboursement prorata."],
          ['Franchise TVA', "VAULT 369 LTD bénéficie de la franchise en base (art. 293 B CGI). Les factures sont émises sans TVA."],
          ['Usage acceptable', "Interdit : contenu illégal, harcèlement, spam, atteinte aux droits de tiers, reverse-engineering, scraping massif, usage à des fins de désinformation organisée."],
          ['Propriété intellectuelle', "AI-DUE conserve la propriété du service. Vous conservez les droits sur vos documents uploadés. Vous nous accordez une licence limitée d'usage pour fournir le service (pas de revente, pas d'entraînement de modèles)."],
          ['Disponibilité', "Plan Pro : 99,5% uptime cible. Plan Enterprise : SLA 99,9% contractualisé."],
          ['Limitation de responsabilité', "Le service est fourni 'tel quel'. Responsabilité limitée au montant payé sur les 12 derniers mois. Pas de responsabilité pour pertes indirectes."],
          ['Résiliation', "Nous pouvons suspendre ou clôturer un compte en cas de violation manifeste. Vous pouvez résilier à tout moment depuis votre dashboard."],
          ['Droit applicable', "Droit français (siège opérationnel). Litige : tribunaux compétents du ressort de Paris, France."],
          ['Contact', "contact@ai-due.com"],
        ],
      }
    : isDe
    ? {
        title: 'Nutzungsbedingungen',
        last: 'Letzte Aktualisierung: 25. April 2026',
        sections: [
          ['Gegenstand', 'AI-DUE ist eine Multi-Agenten-Simulationsplattform für öffentliche Meinung, betrieben von VAULT 369 LTD.'],
          ['Annahme', 'Durch Kontoerstellung oder Nutzung akzeptieren Sie diese Bedingungen vollständig.'],
          ['Konten', 'Vertraulichkeit der Zugangsdaten obliegt Ihnen. Ein Konto pro Nutzer. Nur geschäftliche Konten.'],
          ['Abonnements und Zahlung', 'Pläne: Starter (kostenlos), Pro, Enterprise. Monatliche Abrechnung via Stripe. Automatische Verlängerung. Kündigung jederzeit zum Periodenende. Keine anteiligen Rückerstattungen.'],
          ['MwSt-Befreiung', 'VAULT 369 LTD nutzt die Kleinunternehmerregelung (Art. 293 B CGI). Rechnungen werden ohne MwSt ausgestellt.'],
          ['Akzeptable Nutzung', 'Verboten: illegale Inhalte, Belästigung, Spam, Rechteverletzungen Dritter, Reverse-Engineering, massives Scraping, organisierte Desinformation.'],
          ['Geistiges Eigentum', 'AI-DUE bleibt Eigentum des Anbieters. Hochgeladene Dokumente bleiben Ihr Eigentum. Sie gewähren uns eine eingeschränkte Lizenz zur Diensterbringung (kein Weiterverkauf, kein Modelltraining).'],
          ['Verfügbarkeit', 'Pro: 99,5% Ziel-Uptime. Enterprise: 99,9% SLA vertraglich.'],
          ['Haftungsbeschränkung', 'Service wie besehen. Haftung begrenzt auf in den letzten 12 Monaten gezahlte Beträge. Keine Haftung für indirekte Schäden.'],
          ['Kündigung', 'Wir können bei Verstößen sperren. Sie können jederzeit über Ihr Dashboard kündigen.'],
          ['Anwendbares Recht', 'Französisches Recht. Gerichtsstand Paris, Frankreich.'],
          ['Kontakt', 'contact@ai-due.com'],
        ],
      }
    : isIt
    ? {
        title: "Condizioni d'uso",
        last: 'Ultimo aggiornamento: 25 aprile 2026',
        sections: [
          ['Oggetto', 'AI-DUE è un motore di simulazione multi-agente per opinione pubblica gestito da VAULT 369 LTD.'],
          ['Accettazione', "Creando un account o utilizzando il servizio, accetti integralmente queste condizioni."],
          ['Account', 'La riservatezza delle credenziali è tua responsabilità. Un account per utente. Solo account professionali.'],
          ['Abbonamenti e pagamento', 'Piani Starter (gratuito), Pro, Enterprise. Fatturazione mensile via Stripe. Rinnovo automatico. Disdetta in qualsiasi momento, effettiva a fine periodo. No rimborsi pro-rata.'],
          ['Esenzione IVA', 'VAULT 369 LTD usufruisce del regime di franchigia (art. 293 B CGI). Fatture emesse senza IVA.'],
          ['Uso accettabile', 'Vietato: contenuti illegali, molestie, spam, violazioni diritti terzi, reverse engineering, scraping massivo, disinformazione organizzata.'],
          ['Proprietà intellettuale', 'AI-DUE rimane di proprietà del fornitore. I documenti caricati restano tuoi. Ci concedi una licenza limitata per erogare il servizio (no rivendita, no training).'],
          ['Disponibilità', 'Pro: 99,5% uptime target. Enterprise: SLA 99,9% contrattuale.'],
          ['Limitazione di responsabilità', 'Servizio "as-is". Responsabilità limitata agli importi pagati negli ultimi 12 mesi. Nessuna responsabilità per danni indiretti.'],
          ['Risoluzione', 'Possiamo sospendere in caso di violazione. Puoi disdire in qualsiasi momento dalla dashboard.'],
          ['Legge applicabile', 'Legge francese. Foro competente: Parigi, Francia.'],
          ['Contatto', 'contact@ai-due.com'],
        ],
      }
    : {
        title: 'Terms of Service',
        last: 'Last updated: April 25, 2026',
        sections: [
          ['Service', 'AI-DUE is a multi-agent public opinion simulation engine operated by VAULT 369 LTD. These terms govern use of the service.'],
          ['Acceptance', 'By creating an account or using the service, you accept these terms in full.'],
          ['Accounts', 'You are responsible for credential confidentiality. One account per user. Business accounts only.'],
          ['Subscriptions and billing', 'Starter (free), Pro, Enterprise plans. Monthly billing via Stripe. Auto-renewal. Cancel anytime, effective end of paid period. No pro-rata refunds.'],
          ['VAT exemption', 'VAULT 369 LTD operates under French small-business VAT exemption (art. 293 B CGI). Invoices issued without VAT.'],
          ['Acceptable use', 'Prohibited: illegal content, harassment, spam, infringement of third-party rights, reverse-engineering, mass scraping, organized disinformation.'],
          ['Intellectual property', 'AI-DUE retains ownership of the service. You retain rights on uploaded documents. You grant us a limited license to provide the service (no resale, no model training).'],
          ['Availability', 'Pro plan: 99.5% uptime target. Enterprise: contractual 99.9% SLA.'],
          ['Liability limitation', 'Service provided "as-is". Liability capped at amounts paid in the last 12 months. No liability for indirect damages.'],
          ['Termination', 'We may suspend or terminate accounts for clear violations. You may terminate anytime from your dashboard.'],
          ['Governing law', 'French law. Jurisdiction: Paris courts, France.'],
          ['Contact', 'contact@ai-due.com'],
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
