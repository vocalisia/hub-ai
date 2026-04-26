export type Job = {
  id: string
  emoji: string
  title: string
  mission: string
  duties: readonly string[]
  must: readonly string[]
  comp: string
  remote: string
  growth: string
  nice: string
}

export type CareersUI = {
  hero_kicker: string
  hero_title_1: string
  hero_title_2: string
  hero_subtitle: string
  apply_now: string
  open_positions: string
  jobs_heading: string
  mission_label: string
  duties_label: string
  must_label: string
  comp_label: string
  remote_label: string
  growth_label: string
  nice_label: string
  send: string
  spontaneous_title: string
  spontaneous_desc: string
  spontaneous_cta: string
  modal_title: string
  modal_subtitle: string
  modal_name: string
  modal_email: string
  modal_phone: string
  modal_location: string
  modal_linkedin: string
  modal_cv: string
  modal_msg: string
  modal_loading: string
  modal_send: string
  modal_disclaimer: string
  modal_success_title: string
  modal_success_desc: string
  modal_close: string
}

export const UI: Record<'en' | 'fr' | 'de' | 'it', CareersUI> = {
  en: {
    hero_kicker: '🌍 CAREERS · AI SALES · FULL REMOTE',
    hero_title_1: 'Join the team',
    hero_title_2: 'redefining decision intelligence.',
    hero_subtitle:
      'AI-DUE recruits Sales Development Reps, Setters, Account Executives and Enterprise Closers. Operating across 14 countries. Full remote. Uncapped commission.',
    apply_now: 'Apply now',
    open_positions: 'Open positions',
    jobs_heading: 'Jobs',
    mission_label: 'MISSION',
    duties_label: 'A TYPICAL DAY',
    must_label: 'MUST-HAVE PROFILE',
    comp_label: 'COMPENSATION',
    remote_label: 'REMOTE',
    growth_label: 'GROWTH',
    nice_label: 'NICE TO HAVE',
    send: '📩 Apply now',
    spontaneous_title: "Don't see your role?",
    spontaneous_desc:
      "We're always looking for top-tier talent in AI sales, RevOps, and customer success.",
    spontaneous_cta: 'Spontaneous application',
    modal_title: 'Apply',
    modal_subtitle: 'We will reply within 48h.',
    modal_name: 'Full name *',
    modal_email: 'Email *',
    modal_phone: 'Phone',
    modal_location: 'Location / Timezone',
    modal_linkedin: 'LinkedIn URL',
    modal_cv: 'Attach CV (PDF / DOCX, 5MB max)',
    modal_msg: 'Why this role? Track record highlights...',
    modal_loading: 'Sending…',
    modal_send: 'Send Application →',
    modal_disclaimer: 'By submitting, you accept our privacy policy. We reply within 48h.',
    modal_success_title: 'Application sent',
    modal_success_desc: 'We will reply within 48h. Check your inbox.',
    modal_close: 'Close',
  },
  fr: {
    hero_kicker: '🌍 CARRIÈRES · AI SALES · FULL REMOTE',
    hero_title_1: 'Rejoins l\'équipe qui',
    hero_title_2: 'redéfinit l\'intelligence décisionnelle.',
    hero_subtitle:
      'AI-DUE recrute Business Developers, Setters, Commerciaux et Closers Enterprise. 14 pays, full remote, commission non plafonnée.',
    apply_now: 'Postuler',
    open_positions: 'Postes ouverts',
    jobs_heading: 'Offres',
    mission_label: 'MISSION',
    duties_label: 'TES JOURNÉES',
    must_label: 'PROFIL MUST-HAVE',
    comp_label: 'RÉMUNÉRATION',
    remote_label: 'REMOTE',
    growth_label: 'ÉVOLUTION',
    nice_label: 'NICE TO HAVE',
    send: '📩 Postuler maintenant',
    spontaneous_title: 'Pas de poste qui matche ?',
    spontaneous_desc:
      "On cherche en permanence des talents top-tier en AI sales, RevOps et customer success.",
    spontaneous_cta: 'Candidature spontanée',
    modal_title: 'Postuler',
    modal_subtitle: 'Réponse sous 48h.',
    modal_name: 'Nom complet *',
    modal_email: 'Email *',
    modal_phone: 'Téléphone',
    modal_location: 'Localisation / Fuseau',
    modal_linkedin: 'URL LinkedIn',
    modal_cv: 'Joindre CV (PDF / DOCX, 5MB max)',
    modal_msg: 'Pourquoi ce poste ? Tes meilleures réalisations...',
    modal_loading: 'Envoi…',
    modal_send: 'Envoyer la candidature →',
    modal_disclaimer:
      'En soumettant, tu acceptes notre politique de confidentialité. Réponse sous 48h.',
    modal_success_title: 'Candidature envoyée',
    modal_success_desc: 'Nous répondons sous 48h. Vérifie ta boîte mail.',
    modal_close: 'Fermer',
  },
  de: {
    hero_kicker: '🌍 KARRIERE · AI SALES · FULL REMOTE',
    hero_title_1: 'Werde Teil des Teams,',
    hero_title_2: 'das Entscheidungsintelligenz neu definiert.',
    hero_subtitle:
      'AI-DUE rekrutiert Sales Development Reps, Setter, Account Executives und Enterprise Closer. 14 Länder, Full Remote, unlimitierte Provision.',
    apply_now: 'Jetzt bewerben',
    open_positions: 'Offene Stellen',
    jobs_heading: 'Jobs',
    mission_label: 'MISSION',
    duties_label: 'DEIN ALLTAG',
    must_label: 'MUST-HAVE PROFIL',
    comp_label: 'VERGÜTUNG',
    remote_label: 'REMOTE',
    growth_label: 'ENTWICKLUNG',
    nice_label: 'NICE TO HAVE',
    send: '📩 Jetzt bewerben',
    spontaneous_title: 'Keine passende Stelle?',
    spontaneous_desc:
      'Wir suchen ständig Top-Talente in AI Sales, RevOps und Customer Success.',
    spontaneous_cta: 'Initiativbewerbung',
    modal_title: 'Bewerben',
    modal_subtitle: 'Antwort innerhalb 48h.',
    modal_name: 'Vollständiger Name *',
    modal_email: 'E-Mail *',
    modal_phone: 'Telefon',
    modal_location: 'Standort / Zeitzone',
    modal_linkedin: 'LinkedIn URL',
    modal_cv: 'Lebenslauf hochladen (PDF / DOCX, max. 5MB)',
    modal_msg: 'Warum diese Rolle? Track-Record-Highlights...',
    modal_loading: 'Senden…',
    modal_send: 'Bewerbung senden →',
    modal_disclaimer:
      'Mit dem Absenden akzeptierst du unsere Datenschutzerklärung. Antwort innerhalb 48h.',
    modal_success_title: 'Bewerbung gesendet',
    modal_success_desc: 'Wir antworten innerhalb 48h. Prüfe deinen Posteingang.',
    modal_close: 'Schließen',
  },
  it: {
    hero_kicker: '🌍 CARRIERE · AI SALES · FULL REMOTE',
    hero_title_1: "Unisciti al team che",
    hero_title_2: "ridefinisce l'intelligenza decisionale.",
    hero_subtitle:
      'AI-DUE assume Sales Development Rep, Setter, Account Executive e Enterprise Closer. 14 paesi, full remote, commissione illimitata.',
    apply_now: 'Candidati',
    open_positions: 'Posizioni aperte',
    jobs_heading: 'Lavori',
    mission_label: 'MISSIONE',
    duties_label: 'LA TUA GIORNATA',
    must_label: 'PROFILO MUST-HAVE',
    comp_label: 'RETRIBUZIONE',
    remote_label: 'REMOTE',
    growth_label: 'CRESCITA',
    nice_label: 'NICE TO HAVE',
    send: '📩 Candidati ora',
    spontaneous_title: 'Non vedi il tuo ruolo?',
    spontaneous_desc:
      'Cerchiamo sempre talenti top-tier in AI sales, RevOps e customer success.',
    spontaneous_cta: 'Candidatura spontanea',
    modal_title: 'Candidati',
    modal_subtitle: 'Risposta entro 48h.',
    modal_name: 'Nome completo *',
    modal_email: 'Email *',
    modal_phone: 'Telefono',
    modal_location: 'Località / Fuso orario',
    modal_linkedin: 'URL LinkedIn',
    modal_cv: 'Allega CV (PDF / DOCX, max 5MB)',
    modal_msg: 'Perché questo ruolo? Highlights del tuo track record...',
    modal_loading: 'Invio…',
    modal_send: 'Invia candidatura →',
    modal_disclaimer:
      "Inviando, accetti la nostra informativa sulla privacy. Risposta entro 48h.",
    modal_success_title: 'Candidatura inviata',
    modal_success_desc: 'Risponderemo entro 48h. Controlla la tua casella email.',
    modal_close: 'Chiudi',
  },
}

export const JOBS_BY_LOCALE: Record<'en' | 'fr' | 'de' | 'it', readonly Job[]> = {
  en: [
    {
      id: 'sdr',
      emoji: '🚀',
      title: 'Sales Development Representative',
      mission:
        'You are the engine of pipeline growth at AI-DUE. You identify target accounts (consulting firms, corporate comms teams, IR departments, policy think tanks), prospect multichannel (cold call, LinkedIn, email), and generate qualified meetings for our Account Executives.',
      duties: [
        'Significant volume of outbound calls/day to priority accounts',
        'Personalized LinkedIn prospecting (Sales Navigator)',
        'BANT qualification on 15-min discovery calls',
        'Hand-off warm leads to AE via CRM',
        'Competitive intel watch (Synthesia, Persado, Brandwatch, Sprinklr)',
        'Weekly KPI reporting: dials, connect rate, meetings, show rate',
      ],
      must: [
        '2+ years SDR/BDR experience in B2B SaaS (AI, analytics, research tech)',
        'Resilience to no and voicemail — pure hunter mindset',
        'Mastery of HubSpot/Pipedrive, Lusha/Apollo, LinkedIn Sales Navigator',
        'Excellent diction, phone confidence, 30-second pitch',
        'English native + French/German/Italian professional (B2 minimum)',
      ],
      comp:
        'Attractive package: base + variable on qualified meetings + recurring commission on MRR. Fast progression based on performance.',
      remote:
        'Full remote — work from anywhere (UTC-1 to UTC+3). Quarterly team meetups. Home office budget provided.',
      growth:
        'Natural promotion to Account Executive after 12-18 months. Alternative: BDR Team Lead after 18-24 months.',
      nice:
        'Experience selling AI/research/insights tools · MEDDIC, Sandler, Challenger Sale training · Second European language',
    },
    {
      id: 'setter',
      emoji: '📞',
      title: 'Inbound Setter',
      mission:
        'First human point of contact between inbound/outbound leads and the sales team. Mission: rapidly qualify each lead and book qualified meetings. You filter the noise, eliminate cold leads, and only deliver buy-ready prospects to AEs.',
      duties: [
        'Mixed inbound calls + call-to-meeting on warm leads',
        'Fast qualification in 5-8 min: industry, use case, pain points',
        'Booking via Calendly/iClosed with full context brief',
        'No-show management: rebook, email + call sequence',
        'CRM enrichment: notes, vertical tags, intent score',
        'Marketing feedback on lead quality by source',
      ],
      must: [
        '1+ year experience in telemarketing, SDR, B2B inbound',
        'Speed to qualify: right questions in 30 seconds',
        'Phone = your favorite weapon (no fear of picking up)',
        'Organization and rigor: never a missed callback',
        'English fluent + basic French/Italian/German',
      ],
      comp:
        'Balanced compensation: base + variable on booked meetings + quality bonus. Fast track to BDR possible.',
      remote: 'Full remote with 9am-6pm local availability. Pro USB headset reimbursed. Minimum 50Mbps fiber required.',
      growth:
        'BDR promotion after 12 months, Senior Setter/Team Lead after 18 months. Structured AI-DUE Sales Academy program.',
      nice:
        'High-volume inbound call center experience · Knowledge of Dialpad, Aircall, Ringover, Twilio Flex · SaaS, fintech, regulated industries',
    },
    {
      id: 'ae',
      emoji: '💼',
      title: 'Account Executive',
      mission:
        'You own the full sales cycle on SMB and mid-market accounts. From demo to signature, you transform qualified meetings into recurring customers. Goal: consistent closing with high pipeline-to-close conversion.',
      duties: [
        '4-6 personalized demos/day with vertical scenarios',
        'Build proposals with ROI calculator + live simulation demo',
        'Negotiate SLA, GDPR/AI Act clauses with C-level (CMO, CCO, Head of Insights)',
        'Pipedrive pipeline management: stages, next steps, closing probability',
        'Collaboration with Customer Success on post-signature handoff',
        'Upsell existing accounts: usage extension, multi-region',
      ],
      must: [
        '3-5 years AE experience in B2B SaaS',
        'Mastery of MEDDIC, Command of the Message, SPIN',
        'Capacity to deliver technical demo with pedagogy',
        'Verifiable track record: 90%+ recurring quota attainment',
        'English native + second European language fluent',
      ],
      comp:
        'Competitive package: base + variable on ARR quota + accelerated commission past quota. Stock options after 12 months.',
      remote: 'Full remote + client mobility for strategic meetings. 3 offsites/year.',
      growth:
        'Senior AE after 18 months (enterprise accounts) or Team Lead / Sales Manager after 24 months.',
      nice:
        'Technical background or AI/LLM/research tech sales · Established network in consulting, finance, communications',
    },
    {
      id: 'closer',
      emoji: '🎯',
      title: 'Enterprise Closer',
      mission:
        'Senior hunter-farmer on strategic enterprise deals (long cycles, high ACV). You handle top-tier accounts (CAC40, SBF120, Fortune 500 EMEA). Goal: a few high-impact deals per year.',
      duties: [
        'Multi-stakeholder cycle orchestration (CIO/CPO/CISO/Procurement/Legal)',
        'C-level discovery: ROI business case, strategic fit',
        'Contract negotiation: 99.9% SLA, penalties, multi-entity',
        'Pre-sales engineer coordination for technical POCs',
        'RFP/RFI management with proposal team',
        'Internal client lobbying: nurturing + stakeholder alignment',
      ],
      must: [
        '7+ years experience closing enterprise SaaS (>6 month cycles)',
        'Demonstrated history on major deals: verifiable references',
        'Mastery of complex sales (Challenger, Force Management)',
        'Comfort in C-level boardroom and executive committee',
        'English native + minimum 2 European languages',
      ],
      comp:
        'Top-tier package: high base + uncapped commission + significant equity. RSU vesting 4 years.',
      remote: 'Full remote + heavy client travel (40-60%). Premium offsites. Personal executive assistant.',
      growth: 'VP Sales / Chief Revenue Officer after 24-36 months. Founding team trajectory possible.',
      nice:
        'Network in Big 4 / strategy consulting · Direct experience with C-suite buying processes · MBA or equivalent',
    },
  ],
  fr: [
    {
      id: 'sdr',
      emoji: '🚀',
      title: 'Business Developer (SDR)',
      mission:
        "Tu es le moteur de la croissance pipeline chez AI-DUE. Tu identifies les comptes cibles (cabinets de conseil, équipes corporate comms, IR, think tanks), tu démarches en multicanal (cold call, LinkedIn, email), et tu génères des RDV qualifiés pour nos AE.",
      duties: [
        "Volume significatif d'appels sortants/jour vers comptes prioritaires",
        'Prospection LinkedIn personnalisée (Sales Navigator)',
        'Qualification BANT en call découverte 15 min',
        'Transmission leads chauds à l\'AE via CRM',
        'Veille concurrentielle (Synthesia, Persado, Brandwatch, Sprinklr)',
        'Reporting hebdo KPIs : appels, connect rate, RDV, show rate',
      ],
      must: [
        '2+ ans expérience SDR/BDR B2B SaaS (IA, analytics, research tech)',
        'Résilience au no et au voicemail — mentalité hunter pure',
        'Maîtrise HubSpot/Pipedrive, Lusha/Apollo, LinkedIn Sales Navigator',
        'Excellente élocution, aisance téléphonique, pitch 30 secondes',
        'Français natif + anglais professionnel (B2 minimum)',
      ],
      comp:
        'Package attractif : base fixe + variable sur RDV qualifiés + commission récurrente sur MRR. Progression rapide selon performance.',
      remote:
        "Full remote — travaille d'où tu veux (UTC-1 à UTC+3). Team meetups trimestriels. Budget home office fourni.",
      growth:
        'Promotion naturelle vers AE après 12-18 mois de performance soutenue. Alternative : Team Lead BDR après 18-24 mois.',
      nice:
        'Expérience vente IA générative, voice AI ou research tech · Formation Sandler, MEDDIC, Challenger Sale · Seconde langue (DE, ES, IT, NL)',
    },
    {
      id: 'setter',
      emoji: '📞',
      title: 'Setter',
      mission:
        "Premier point de contact humain entre leads inbound/outbound et équipe commerciale. Mission : qualifier rapidement chaque lead et booker des RDV qualifiés. Tu fais le tri, tu élimines le bruit, tu livres aux commerciaux uniquement des prospects prêts à acheter.",
      duties: [
        "Volume d'appels mixte inbound + call-to-meeting sur leads chauds",
        'Qualification rapide en 5-8 min : secteur, volume, pain points',
        'Booking RDV via Calendly/iClosed avec brief contexte',
        'Gestion no-show : rebook, séquence email + call',
        'Enrichissement CRM : notes, tags sectoriels, score chaleur',
        'Feedback marketing sur qualité leads par source',
      ],
      must: [
        '1+ an expérience telemarketing, SDR, standardiste B2B',
        'Rapidité à qualifier : bonnes questions en 30 secondes',
        'Téléphone = ton arme préférée (pas peur de décrocher)',
        'Organisation et rigueur : jamais un callback raté',
        'Français natif + bonne compréhension anglais écrit',
      ],
      comp:
        'Rémunération équilibrée : base + variable sur RDV bookés + bonus qualité (show rate, conversion). Évolution rapide vers BDR possible.',
      remote: 'Full remote avec disponibilité 9h-18h fuseau local. Casque USB pro remboursé. Fibre minimum 50Mbps requise.',
      growth:
        'Promotion BDR après 12 mois + Senior Setter/Team Lead après 18 mois. Parcours interne structuré AI-DUE Sales Academy.',
      nice:
        'Expérience call center inbound haute volumétrie · Connaissance Dialpad, Aircall, Ringover, Twilio Flex · SaaS, fintech, secteur régulé',
    },
    {
      id: 'ae',
      emoji: '💼',
      title: 'Commercial / Account Executive',
      mission:
        "Tu portes le cycle de vente complet sur comptes PME et mid-market ETI. De la démo à la signature, tu transformes les RDV qualifiés en clients récurrents. Objectif : closing régulier avec conversion pipeline-to-close élevée.",
      duties: [
        '4-6 démos personnalisées/jour avec scénarios sectoriels',
        'Build propositions avec ROI calculator + simulation démo live',
        'Négociation SLA, clauses RGPD/AI Act avec C-level (CMO, CCO, Head of Insights)',
        'Suivi pipeline Pipedrive : stages, next steps, closing probability',
        'Collaboration Customer Success pour handover post-signature',
        'Upsell comptes existants : extension usage, multi-pays',
      ],
      must: [
        '3-5 ans expérience Account Executive SaaS B2B',
        'Maîtrise méthodologie MEDDIC, Command of the Message, SPIN',
        'Capacité à porter une démo technique avec pédagogie',
        'Track record vérifiable : atteinte/dépassement quota 90%+ récurrent',
        'Français natif + anglais courant (démos/nego internationales)',
      ],
      comp:
        'Package compétitif : base + variable sur quota ARR + commission accélérée au-delà du quota. Stock-options après 12 mois.',
      remote: 'Full remote + mobilité clients pour meetings stratégiques. 3 offsites/an.',
      growth:
        "Senior AE après 18 mois (comptes enterprise) ou Team Lead / Sales Manager après 24 mois. Relocation internationale possible.",
      nice:
        'Background technique ou vente produit IA/LLM/research tech · Réseau établi conseil, finance, communications · Seconde langue européenne',
    },
    {
      id: 'closer',
      emoji: '🎯',
      title: 'Closer Solution IA',
      mission:
        "Fermier-hunter senior sur deals enterprise stratégiques (cycles longs, ACV élevés). Tu interviens sur comptes top-tier (CAC40, SBF120, Fortune 500 EMEA). Objectif : quelques deals par an à fort impact ARR.",
      duties: [
        'Orchestration cycles multi-stakeholders (DSI/CPO/RSSI/Achats/Legal)',
        'Discovery C-level : ROI business case, strategic fit',
        'Négociation contrats : SLA 99,9%, pénalités, multi-entity',
        'Coordination pre-sales engineer pour POC techniques',
        "Gestion appels d'offres (RFP, RFI) avec équipe proposal",
        'Lobbying interne client : nurturing + stakeholder alignment',
      ],
      must: [
        '7+ ans expérience closing enterprise SaaS (cycles >6 mois)',
        'Historique démontré sur deals majeurs : références vérifiables',
        'Maîtrise vente complexe (Challenger, Force Management)',
        'Aisance C-level boardroom et comité exécutif',
        'Français natif + minimum 2 langues européennes',
      ],
      comp:
        'Package top-tier : base élevée + commission non plafonnée + equity significative. RSU vesting 4 ans.',
      remote: 'Full remote + heavy client travel (40-60%). Premium offsites. Executive assistant personnel.',
      growth: 'VP Sales / Chief Revenue Officer après 24-36 mois de performance. Trajectoire founding team possible.',
      nice:
        'Réseau Big 4 / strategy consulting · Expérience directe avec processus achat C-suite · MBA ou équivalent',
    },
  ],
  de: [
    {
      id: 'sdr',
      emoji: '🚀',
      title: 'Sales Development Representative',
      mission:
        'Du bist der Motor des Pipeline-Wachstums bei AI-DUE. Du identifizierst Zielkunden (Beratungen, Corporate Comms, IR-Abteilungen, Policy Think Tanks), prospektierst multichannel (Cold Call, LinkedIn, E-Mail) und generierst qualifizierte Meetings für unsere Account Executives.',
      duties: [
        'Hohes Volumen täglicher Outbound-Calls zu Priority-Accounts',
        'Personalisierte LinkedIn-Prospektion (Sales Navigator)',
        'BANT-Qualifizierung in 15-Min-Discovery-Calls',
        'Übergabe warmer Leads an AE via CRM',
        'Wettbewerbs-Monitoring (Synthesia, Persado, Brandwatch, Sprinklr)',
        'Wöchentliches KPI-Reporting: Calls, Connect Rate, Meetings, Show Rate',
      ],
      must: [
        '2+ Jahre SDR/BDR-Erfahrung in B2B SaaS (KI, Analytics, Research Tech)',
        'Resilienz gegenüber Ablehnung und Voicemail — Hunter-Mentalität',
        'Beherrschung von HubSpot/Pipedrive, Lusha/Apollo, LinkedIn Sales Navigator',
        'Hervorragende Ausdrucksweise, Telefon-Sicherheit, 30-Sekunden-Pitch',
        'Deutsch Muttersprache + Englisch berufsfähig (B2 Minimum)',
      ],
      comp:
        'Attraktives Paket: Fixum + variabel auf qualifizierte Meetings + wiederkehrende Provision auf MRR.',
      remote: 'Full Remote — arbeite von überall (UTC-1 bis UTC+3). Quartalsweise Team-Meetups. Home-Office-Budget.',
      growth: 'Beförderung zum AE nach 12-18 Monaten. Alternative: BDR Team Lead nach 18-24 Monaten.',
      nice:
        'Erfahrung mit Verkauf von KI/Research/Insights-Tools · MEDDIC-, Sandler-, Challenger-Sale-Training · Zweite europäische Sprache',
    },
    {
      id: 'setter',
      emoji: '📞',
      title: 'Inbound Setter',
      mission:
        'Erster menschlicher Kontaktpunkt zwischen Inbound/Outbound-Leads und Sales-Team. Mission: schnell jeden Lead qualifizieren und qualifizierte Meetings buchen.',
      duties: [
        'Mix aus Inbound-Calls + Call-to-Meeting auf warmen Leads',
        'Schnelle Qualifizierung in 5-8 Min: Branche, Use Case, Pain Points',
        'Buchung über Calendly/iClosed mit vollständigem Kontext-Brief',
        'No-Show-Management: Rebook, E-Mail + Call-Sequenz',
        'CRM-Anreicherung: Notizen, Vertical-Tags, Intent-Score',
        'Marketing-Feedback zur Lead-Qualität nach Quelle',
      ],
      must: [
        '1+ Jahr Erfahrung in Telemarketing, SDR, B2B Inbound',
        'Schnelligkeit beim Qualifizieren: richtige Fragen in 30 Sekunden',
        'Telefon = deine Lieblingswaffe',
        'Organisation und Genauigkeit: nie ein verpasster Rückruf',
        'Deutsch fließend + Grundkenntnisse Englisch',
      ],
      comp: 'Ausgewogene Vergütung: Fixum + variabel auf gebuchte Meetings + Quality-Bonus.',
      remote: 'Full Remote mit 9-18 Uhr lokaler Verfügbarkeit. USB-Pro-Headset erstattet. Mindestens 50 Mbps Glasfaser.',
      growth: 'BDR-Promotion nach 12 Monaten, Senior Setter/Team Lead nach 18 Monaten.',
      nice:
        'Hochvolumige Inbound-Call-Center-Erfahrung · Kenntnisse von Dialpad, Aircall, Ringover, Twilio Flex',
    },
    {
      id: 'ae',
      emoji: '💼',
      title: 'Account Executive',
      mission:
        'Du verantwortest den vollständigen Sales-Zyklus bei SMB- und Mid-Market-Accounts. Von der Demo zur Unterschrift transformierst du qualifizierte Meetings in wiederkehrende Kunden.',
      duties: [
        '4-6 personalisierte Demos/Tag mit Branchen-Szenarien',
        'Erstellung von Angeboten mit ROI-Kalkulator + Live-Simulation-Demo',
        'Verhandlung SLA, DSGVO/AI-Act-Klauseln mit C-Level',
        'Pipedrive-Pipeline-Management: Stages, Next Steps, Closing Probability',
        'Zusammenarbeit mit Customer Success für Post-Signature-Übergabe',
        'Upsell bestehender Accounts: Nutzungserweiterung, Multi-Region',
      ],
      must: [
        '3-5 Jahre AE-Erfahrung in B2B SaaS',
        'Beherrschung von MEDDIC, Command of the Message, SPIN',
        'Fähigkeit, eine technische Demo pädagogisch zu liefern',
        'Nachweisbare Erfolge: 90%+ wiederkehrende Quotenerreichung',
        'Deutsch Muttersprache + zweite europäische Sprache fließend',
      ],
      comp: 'Wettbewerbsfähiges Paket: Fixum + variabel auf ARR-Quote + beschleunigte Provision oberhalb der Quote.',
      remote: 'Full Remote + Kunden-Mobilität für strategische Meetings. 3 Offsites/Jahr.',
      growth: 'Senior AE nach 18 Monaten oder Team Lead / Sales Manager nach 24 Monaten.',
      nice:
        'Technischer Hintergrund oder Verkauf von KI/LLM/Research-Tech · Etabliertes Netzwerk in Beratung, Finanzen, Kommunikation',
    },
    {
      id: 'closer',
      emoji: '🎯',
      title: 'Enterprise Closer',
      mission:
        'Senior Hunter-Farmer für strategische Enterprise-Deals (lange Zyklen, hohe ACV). Du betreust Top-Tier-Accounts (DAX, MDAX, Fortune 500 EMEA).',
      duties: [
        'Multi-Stakeholder-Zyklus-Orchestrierung (CIO/CPO/CISO/Einkauf/Legal)',
        'C-Level-Discovery: ROI Business Case, Strategic Fit',
        'Vertragsverhandlung: 99,9% SLA, Strafen, Multi-Entity',
        'Pre-Sales-Engineer-Koordination für technische POCs',
        'RFP/RFI-Management mit Proposal-Team',
        'Internes Client-Lobbying: Nurturing + Stakeholder-Alignment',
      ],
      must: [
        '7+ Jahre Erfahrung mit Enterprise-SaaS-Closing (>6 Monate Zyklen)',
        'Nachweisbare Historie bei Major Deals: verifizierbare Referenzen',
        'Beherrschung komplexer Verkaufsmethodiken (Challenger, Force Management)',
        'Sicherheit im C-Level-Boardroom und Executive Committee',
        'Deutsch Muttersprache + mindestens 2 europäische Sprachen',
      ],
      comp: 'Top-Tier-Paket: hohe Basis + uncapped Provision + signifikante Equity. RSU-Vesting 4 Jahre.',
      remote: 'Full Remote + intensive Kundenreisen (40-60%). Premium-Offsites. Persönlicher Executive Assistant.',
      growth: 'VP Sales / Chief Revenue Officer nach 24-36 Monaten. Founding-Team-Trajektorie möglich.',
      nice:
        'Netzwerk in Big 4 / Strategy Consulting · Direkte Erfahrung mit C-Suite-Einkaufsprozessen · MBA oder gleichwertig',
    },
  ],
  it: [
    {
      id: 'sdr',
      emoji: '🚀',
      title: 'Sales Development Representative',
      mission:
        "Sei il motore della crescita pipeline di AI-DUE. Identifichi gli account target (società di consulenza, team comms aziendali, IR, think tank), prospetti multichannel (cold call, LinkedIn, email) e generi meeting qualificati per i nostri Account Executive.",
      duties: [
        'Volume significativo di chiamate outbound/giorno verso account prioritari',
        'Prospezione LinkedIn personalizzata (Sales Navigator)',
        'Qualificazione BANT in discovery call di 15 min',
        "Passaggio lead caldi all'AE via CRM",
        'Monitoraggio competitivo (Synthesia, Persado, Brandwatch, Sprinklr)',
        'Reporting KPI settimanale: chiamate, connect rate, meeting, show rate',
      ],
      must: [
        '2+ anni di esperienza SDR/BDR in B2B SaaS (IA, analytics, research tech)',
        'Resilienza al no e voicemail — mentalità hunter pura',
        'Padronanza di HubSpot/Pipedrive, Lusha/Apollo, LinkedIn Sales Navigator',
        'Eccellente dizione, sicurezza al telefono, pitch di 30 secondi',
        'Italiano madrelingua + inglese professionale (B2 minimo)',
      ],
      comp: 'Pacchetto attraente: fisso + variabile sui meeting qualificati + commissione ricorrente su MRR.',
      remote: 'Full remote — lavora ovunque (UTC-1 a UTC+3). Team meetup trimestrali. Budget home office.',
      growth: 'Promozione naturale a AE dopo 12-18 mesi. Alternativa: BDR Team Lead dopo 18-24 mesi.',
      nice:
        'Esperienza nella vendita di tool IA/research/insights · Formazione MEDDIC, Sandler, Challenger Sale · Seconda lingua europea',
    },
    {
      id: 'setter',
      emoji: '📞',
      title: 'Inbound Setter',
      mission:
        'Primo punto di contatto umano tra lead inbound/outbound e team commerciale. Missione: qualificare rapidamente ogni lead e prenotare meeting qualificati.',
      duties: [
        'Mix di chiamate inbound + call-to-meeting su lead caldi',
        'Qualificazione rapida in 5-8 min: settore, use case, pain point',
        'Booking via Calendly/iClosed con brief contesto completo',
        'Gestione no-show: rebook, sequenza email + call',
        'Arricchimento CRM: note, tag verticali, intent score',
        'Feedback marketing sulla qualità dei lead per fonte',
      ],
      must: [
        "1+ anno di esperienza in telemarketing, SDR, B2B inbound",
        'Velocità nel qualificare: domande giuste in 30 secondi',
        'Telefono = la tua arma preferita',
        'Organizzazione e rigore: mai una callback persa',
        'Italiano madrelingua + buona comprensione inglese scritto',
      ],
      comp: 'Retribuzione equilibrata: fisso + variabile sui meeting prenotati + bonus qualità.',
      remote: 'Full remote con disponibilità 9-18 fuso locale. Cuffia USB pro rimborsata. Minimo 50Mbps fibra.',
      growth: 'Promozione BDR dopo 12 mesi, Senior Setter/Team Lead dopo 18 mesi.',
      nice:
        'Esperienza call center inbound ad alto volume · Conoscenza Dialpad, Aircall, Ringover, Twilio Flex',
    },
    {
      id: 'ae',
      emoji: '💼',
      title: 'Account Executive',
      mission:
        "Possiedi l'intero ciclo di vendita su account SMB e mid-market. Dalla demo alla firma, trasformi i meeting qualificati in clienti ricorrenti.",
      duties: [
        '4-6 demo personalizzate/giorno con scenari verticali',
        'Costruzione proposte con ROI calculator + demo simulazione live',
        'Negoziazione SLA, clausole GDPR/AI Act con C-level',
        'Gestione pipeline Pipedrive: stage, next step, closing probability',
        'Collaborazione con Customer Success per handover post-firma',
        'Upsell account esistenti: estensione utilizzo, multi-region',
      ],
      must: [
        '3-5 anni di esperienza AE in B2B SaaS',
        'Padronanza di MEDDIC, Command of the Message, SPIN',
        'Capacità di gestire una demo tecnica con pedagogia',
        'Track record verificabile: 90%+ raggiungimento quota ricorrente',
        'Italiano madrelingua + seconda lingua europea fluente',
      ],
      comp: 'Pacchetto competitivo: fisso + variabile su quota ARR + commissione accelerata oltre quota.',
      remote: 'Full remote + mobilità clienti per meeting strategici. 3 offsite/anno.',
      growth: 'Senior AE dopo 18 mesi o Team Lead / Sales Manager dopo 24 mesi.',
      nice:
        'Background tecnico o vendita prodotti IA/LLM/research tech · Network consolidato in consulenza, finanza, comunicazioni',
    },
    {
      id: 'closer',
      emoji: '🎯',
      title: 'Enterprise Closer',
      mission:
        'Senior hunter-farmer su deal enterprise strategici (cicli lunghi, ACV elevati). Gestisci account top-tier (FTSE MIB, Fortune 500 EMEA).',
      duties: [
        'Orchestrazione cicli multi-stakeholder (CIO/CPO/CISO/Acquisti/Legal)',
        'Discovery C-level: ROI business case, strategic fit',
        'Negoziazione contratti: SLA 99,9%, penalità, multi-entity',
        'Coordinamento pre-sales engineer per POC tecnici',
        'Gestione gare (RFP, RFI) con team proposal',
        'Lobbying interno cliente: nurturing + stakeholder alignment',
      ],
      must: [
        '7+ anni di esperienza closing enterprise SaaS (cicli >6 mesi)',
        'Storia documentata su deal importanti: referenze verificabili',
        'Padronanza vendita complessa (Challenger, Force Management)',
        'Padronanza in C-level boardroom e comitato esecutivo',
        'Italiano madrelingua + minimo 2 lingue europee',
      ],
      comp: 'Pacchetto top-tier: base alta + commissione illimitata + equity significativo. RSU vesting 4 anni.',
      remote: 'Full remote + frequenti viaggi clienti (40-60%). Offsite premium. Executive assistant personale.',
      growth: 'VP Sales / Chief Revenue Officer dopo 24-36 mesi. Possibile traiettoria founding team.',
      nice:
        'Network in Big 4 / strategy consulting · Esperienza diretta con processi di acquisto C-suite · MBA o equivalente',
    },
  ],
}
