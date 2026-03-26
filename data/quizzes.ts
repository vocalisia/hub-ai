type L = Record<string, string>

export interface QuizQuestion {
  question: L
  answers: { text: L; category: string }[]
}

export interface QuizResult {
  id: string
  title: L
  description: L
  links: { label: string; url: string; description: L }[]
  icon: string
}

export interface Quiz {
  id: string
  slug: string
  title: L
  description: L
  icon: string
  questionCount: number
  estimatedTime: string
  questions: QuizQuestion[]
  results: QuizResult[]
  type: 'profile' | 'score'
}

export const QUIZZES: Quiz[] = [
  {
    id: '1',
    slug: 'quel-ia-pour-votre-entreprise',
    title: { fr: 'Quel type d\'IA est fait pour votre entreprise ?', en: 'Which AI type is right for your business?', de: 'Welcher KI-Typ passt zu Ihrem Unternehmen?', it: 'Quale tipo di IA e adatto alla tua azienda?' },
    description: { fr: 'Decouvrez en 8 questions quelle solution IA correspond le mieux a vos besoins.', en: 'Find out in 8 questions which AI solution best fits your needs.', de: 'Finden Sie in 8 Fragen heraus, welche KI-Losung am besten zu Ihnen passt.', it: 'Scopri in 8 domande quale soluzione IA si adatta meglio alle tue esigenze.' },
    icon: '🎯', questionCount: 8, estimatedTime: '3 min', type: 'profile',
    questions: [
      { question: { fr: 'Quel est votre secteur d\'activite ?', en: 'What is your industry?', de: 'In welcher Branche sind Sie tatig?', it: 'Qual e il vostro settore?' }, answers: [
        { text: { fr: 'Services / Conseil', en: 'Services / Consulting', de: 'Dienstleistungen / Beratung', it: 'Servizi / Consulenza' }, category: 'automation' },
        { text: { fr: 'Commerce / Retail', en: 'Commerce / Retail', de: 'Handel / Einzelhandel', it: 'Commercio / Retail' }, category: 'marketing' },
        { text: { fr: 'Industrie / Manufacturing', en: 'Industry / Manufacturing', de: 'Industrie / Fertigung', it: 'Industria / Manifattura' }, category: 'architecture' },
        { text: { fr: 'Tech / Digital', en: 'Tech / Digital', de: 'Tech / Digital', it: 'Tech / Digitale' }, category: 'architecture' }
      ]},
      { question: { fr: 'Combien d\'employes ?', en: 'How many employees?', de: 'Wie viele Mitarbeiter?', it: 'Quanti dipendenti?' }, answers: [
        { text: { fr: '1-10 (TPE)', en: '1-10 (Micro)', de: '1-10 (Kleinst)', it: '1-10 (Micro)' }, category: 'vocal' },
        { text: { fr: '10-50 (PME)', en: '10-50 (SME)', de: '10-50 (KMU)', it: '10-50 (PMI)' }, category: 'automation' },
        { text: { fr: '50-250 (ETI)', en: '50-250 (Mid)', de: '50-250 (Mittel)', it: '50-250 (Media)' }, category: 'architecture' },
        { text: { fr: '250+ (Grande)', en: '250+ (Large)', de: '250+ (Gross)', it: '250+ (Grande)' }, category: 'architecture' }
      ]},
      { question: { fr: 'Quel est votre principal defi ?', en: 'What is your main challenge?', de: 'Was ist Ihre grosste Herausforderung?', it: 'Qual e la vostra sfida principale?' }, answers: [
        { text: { fr: 'Productivite', en: 'Productivity', de: 'Produktivitat', it: 'Produttivita' }, category: 'automation' },
        { text: { fr: 'Service client', en: 'Customer service', de: 'Kundenservice', it: 'Servizio clienti' }, category: 'vocal' },
        { text: { fr: 'Ventes', en: 'Sales', de: 'Vertrieb', it: 'Vendite' }, category: 'marketing' },
        { text: { fr: 'Couts', en: 'Costs', de: 'Kosten', it: 'Costi' }, category: 'automation' }
      ]},
      { question: { fr: 'Experience en IA ?', en: 'AI experience?', de: 'KI-Erfahrung?', it: 'Esperienza IA?' }, answers: [
        { text: { fr: 'Jamais', en: 'Never', de: 'Nie', it: 'Mai' }, category: 'vocal' },
        { text: { fr: 'ChatGPT basique', en: 'Basic ChatGPT', de: 'Einfaches ChatGPT', it: 'ChatGPT base' }, category: 'automation' },
        { text: { fr: 'Plusieurs outils', en: 'Multiple tools', de: 'Mehrere Tools', it: 'Diversi strumenti' }, category: 'marketing' },
        { text: { fr: 'Expert', en: 'Expert', de: 'Experte', it: 'Esperto' }, category: 'architecture' }
      ]},
      { question: { fr: 'Budget mensuel IA ?', en: 'Monthly AI budget?', de: 'Monatliches KI-Budget?', it: 'Budget mensile IA?' }, answers: [
        { text: { fr: '< 100 CHF', en: '< 100 CHF', de: '< 100 CHF', it: '< 100 CHF' }, category: 'vocal' },
        { text: { fr: '100-500 CHF', en: '100-500 CHF', de: '100-500 CHF', it: '100-500 CHF' }, category: 'automation' },
        { text: { fr: '500-2000 CHF', en: '500-2000 CHF', de: '500-2000 CHF', it: '500-2000 CHF' }, category: 'marketing' },
        { text: { fr: '2000+ CHF', en: '2000+ CHF', de: '2000+ CHF', it: '2000+ CHF' }, category: 'architecture' }
      ]},
      { question: { fr: 'Tache la plus chronophage ?', en: 'Most time-consuming task?', de: 'Zeitaufwandigste Aufgabe?', it: 'Attivita piu dispendiosa?' }, answers: [
        { text: { fr: 'Emails', en: 'Emails', de: 'E-Mails', it: 'Email' }, category: 'automation' },
        { text: { fr: 'Appels', en: 'Calls', de: 'Anrufe', it: 'Chiamate' }, category: 'vocal' },
        { text: { fr: 'Documents', en: 'Documents', de: 'Dokumente', it: 'Documenti' }, category: 'automation' },
        { text: { fr: 'Analyse', en: 'Analysis', de: 'Analyse', it: 'Analisi' }, category: 'architecture' }
      ]},
      { question: { fr: 'Canal de contact client ?', en: 'Customer contact channel?', de: 'Kundenkontaktkanal?', it: 'Canale di contatto?' }, answers: [
        { text: { fr: 'Telephone', en: 'Phone', de: 'Telefon', it: 'Telefono' }, category: 'vocal' },
        { text: { fr: 'Email', en: 'Email', de: 'E-Mail', it: 'Email' }, category: 'automation' },
        { text: { fr: 'Chat / Reseaux', en: 'Chat / Social', de: 'Chat / Social', it: 'Chat / Social' }, category: 'marketing' },
        { text: { fr: 'Multi-canal', en: 'Multi-channel', de: 'Multi-Kanal', it: 'Multi-canale' }, category: 'architecture' }
      ]},
      { question: { fr: 'Priorite #1 ?', en: 'Priority #1?', de: 'Prioritat #1?', it: 'Priorita #1?' }, answers: [
        { text: { fr: 'Automatiser', en: 'Automate', de: 'Automatisieren', it: 'Automatizzare' }, category: 'automation' },
        { text: { fr: 'Innover', en: 'Innovate', de: 'Innovieren', it: 'Innovare' }, category: 'architecture' },
        { text: { fr: 'Reduire couts', en: 'Cut costs', de: 'Kosten senken', it: 'Ridurre costi' }, category: 'vocal' },
        { text: { fr: 'Croitre', en: 'Grow', de: 'Wachsen', it: 'Crescere' }, category: 'marketing' }
      ]}
    ],
    results: [
      { id: 'vocal', title: { fr: 'Agent Vocal IA', en: 'AI Voice Agent', de: 'KI-Sprachagent', it: 'Agente Vocale IA' }, description: { fr: 'Automatisez vos appels et offrez un support 24/7.', en: 'Automate your calls and offer 24/7 support.', de: 'Automatisieren Sie Anrufe und bieten Sie 24/7-Support.', it: 'Automatizza le chiamate e offri supporto 24/7.' }, icon: '📞', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Agent vocal IA', en: 'AI voice agent', de: 'KI-Sprachagent', it: 'Agente vocale IA' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Agents autonomes', en: 'Autonomous agents', de: 'Autonome Agenten', it: 'Agenti autonomi' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Accompagnement PME', en: 'SME support', de: 'KMU-Begleitung', it: 'Supporto PMI' } }
      ]},
      { id: 'automation', title: { fr: 'Automatisation Business', en: 'Business Automation', de: 'Geschaftsautomatisierung', it: 'Automazione Business' }, description: { fr: 'Automatisez les processus repetitifs.', en: 'Automate repetitive processes.', de: 'Automatisieren Sie repetitive Prozesse.', it: 'Automatizza i processi ripetitivi.' }, icon: '⚡', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Agents autonomes', en: 'Autonomous agents', de: 'Autonome Agenten', it: 'Agenti autonomi' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Solutions PME', en: 'SME solutions', de: 'KMU-Losungen', it: 'Soluzioni PMI' } },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Telephonie IA', en: 'AI telephony', de: 'KI-Telefonie', it: 'Telefonia IA' } }
      ]},
      { id: 'marketing', title: { fr: 'Marketing IA', en: 'AI Marketing', de: 'KI-Marketing', it: 'Marketing IA' }, description: { fr: 'SEO, contenu et acquisition par l\'IA.', en: 'SEO, content and AI-powered acquisition.', de: 'SEO, Inhalte und KI-Akquise.', it: 'SEO, contenuti e acquisizione con IA.' }, icon: '📈', links: [
        { label: 'SEO True', url: 'https://seo-true.com', description: { fr: 'SEO et IA', en: 'SEO and AI', de: 'SEO und KI', it: 'SEO e IA' } },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Strategie IA', en: 'AI strategy', de: 'KI-Strategie', it: 'Strategia IA' } },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: { fr: 'Revendeur IA', en: 'AI reseller', de: 'KI-Wiederverkaufer', it: 'Rivenditore IA' } }
      ]},
      { id: 'architecture', title: { fr: 'Architecture IA Avancee', en: 'Advanced AI Architecture', de: 'Fortgeschrittene KI-Architektur', it: 'Architettura IA Avanzata' }, description: { fr: 'LLM, MLOps, multi-agents et cloud.', en: 'LLM, MLOps, multi-agents and cloud.', de: 'LLM, MLOps, Multi-Agenten und Cloud.', it: 'LLM, MLOps, multi-agenti e cloud.' }, icon: '🏗️', links: [
        { label: 'AI-DUE', url: 'https://ai-due.com', description: { fr: 'Architecture IA', en: 'AI Architecture', de: 'KI-Architektur', it: 'Architettura IA' } },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: { fr: 'IA de confiance', en: 'Trusted AI', de: 'Vertrauenswurdige KI', it: 'IA affidabile' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Agents avances', en: 'Advanced agents', de: 'Fortgeschrittene Agenten', it: 'Agenti avanzati' } }
      ]}
    ]
  },
  {
    id: '2',
    slug: 'testez-connaissances-ia',
    title: { fr: 'Testez vos connaissances en IA', en: 'Test your AI knowledge', de: 'Testen Sie Ihr KI-Wissen', it: 'Testa le tue conoscenze IA' },
    description: { fr: '10 questions pour evaluer votre niveau.', en: '10 questions to assess your level.', de: '10 Fragen zur Bewertung Ihres Niveaus.', it: '10 domande per valutare il tuo livello.' },
    icon: '🧠', questionCount: 10, estimatedTime: '4 min', type: 'score',
    questions: [
      { question: { fr: 'Que signifie LLM ?', en: 'What does LLM stand for?', de: 'Wofur steht LLM?', it: 'Cosa significa LLM?' }, answers: [
        { text: { fr: 'Large Language Model', en: 'Large Language Model', de: 'Large Language Model', it: 'Large Language Model' }, category: 'correct' },
        { text: { fr: 'Linear Learning Machine', en: 'Linear Learning Machine', de: 'Linear Learning Machine', it: 'Linear Learning Machine' }, category: 'wrong' },
        { text: { fr: 'Logical Logic Module', en: 'Logical Logic Module', de: 'Logical Logic Module', it: 'Logical Logic Module' }, category: 'wrong' },
        { text: { fr: 'Local Language Manager', en: 'Local Language Manager', de: 'Local Language Manager', it: 'Local Language Manager' }, category: 'wrong' }
      ]},
      { question: { fr: 'Qui a cree ChatGPT ?', en: 'Who created ChatGPT?', de: 'Wer hat ChatGPT entwickelt?', it: 'Chi ha creato ChatGPT?' }, answers: [
        { text: { fr: 'Google', en: 'Google', de: 'Google', it: 'Google' }, category: 'wrong' },
        { text: { fr: 'OpenAI', en: 'OpenAI', de: 'OpenAI', it: 'OpenAI' }, category: 'correct' },
        { text: { fr: 'Meta', en: 'Meta', de: 'Meta', it: 'Meta' }, category: 'wrong' },
        { text: { fr: 'Microsoft', en: 'Microsoft', de: 'Microsoft', it: 'Microsoft' }, category: 'wrong' }
      ]},
      { question: { fr: 'Qu\'est-ce que le RAG ?', en: 'What is RAG?', de: 'Was ist RAG?', it: 'Cos\'e il RAG?' }, answers: [
        { text: { fr: 'Random Access Generation', en: 'Random Access Generation', de: 'Random Access Generation', it: 'Random Access Generation' }, category: 'wrong' },
        { text: { fr: 'Retrieval Augmented Generation', en: 'Retrieval Augmented Generation', de: 'Retrieval Augmented Generation', it: 'Retrieval Augmented Generation' }, category: 'correct' },
        { text: { fr: 'Rapid AI Gateway', en: 'Rapid AI Gateway', de: 'Rapid AI Gateway', it: 'Rapid AI Gateway' }, category: 'wrong' },
        { text: { fr: 'Real-time Analysis Grid', en: 'Real-time Analysis Grid', de: 'Real-time Analysis Grid', it: 'Real-time Analysis Grid' }, category: 'wrong' }
      ]},
      { question: { fr: 'Modele d\'Anthropic ?', en: 'Anthropic\'s model?', de: 'Anthropics Modell?', it: 'Modello di Anthropic?' }, answers: [
        { text: { fr: 'GPT-4', en: 'GPT-4', de: 'GPT-4', it: 'GPT-4' }, category: 'wrong' },
        { text: { fr: 'Gemini', en: 'Gemini', de: 'Gemini', it: 'Gemini' }, category: 'wrong' },
        { text: { fr: 'Claude', en: 'Claude', de: 'Claude', it: 'Claude' }, category: 'correct' },
        { text: { fr: 'Mistral', en: 'Mistral', de: 'Mistral', it: 'Mistral' }, category: 'wrong' }
      ]},
      { question: { fr: 'Un agent IA autonome fait quoi ?', en: 'What does an autonomous AI agent do?', de: 'Was macht ein autonomer KI-Agent?', it: 'Cosa fa un agente IA autonomo?' }, answers: [
        { text: { fr: 'Repond aux questions', en: 'Answers questions', de: 'Beantwortet Fragen', it: 'Risponde alle domande' }, category: 'wrong' },
        { text: { fr: 'Execute des taches seul', en: 'Executes tasks autonomously', de: 'Fuhrt Aufgaben autonom aus', it: 'Esegue compiti autonomamente' }, category: 'correct' },
        { text: { fr: 'Genere des images', en: 'Generates images', de: 'Erzeugt Bilder', it: 'Genera immagini' }, category: 'wrong' },
        { text: { fr: 'Traduit du texte', en: 'Translates text', de: 'Ubersetzt Text', it: 'Traduce testo' }, category: 'wrong' }
      ]},
      { question: { fr: 'L\'EU AI Act concerne ?', en: 'The EU AI Act is about?', de: 'Der EU AI Act betrifft?', it: 'L\'EU AI Act riguarda?' }, answers: [
        { text: { fr: 'Reglementation IA Europe', en: 'AI regulation in Europe', de: 'KI-Regulierung in Europa', it: 'Regolamentazione IA Europa' }, category: 'correct' },
        { text: { fr: 'Programme recherche', en: 'Research program', de: 'Forschungsprogramm', it: 'Programma ricerca' }, category: 'wrong' },
        { text: { fr: 'Concours startups', en: 'Startup contest', de: 'Startup-Wettbewerb', it: 'Concorso startup' }, category: 'wrong' },
        { text: { fr: 'Licence logicielle', en: 'Software license', de: 'Softwarelizenz', it: 'Licenza software' }, category: 'wrong' }
      ]},
      { question: { fr: 'Le fine-tuning c\'est ?', en: 'Fine-tuning is?', de: 'Fine-Tuning ist?', it: 'Il fine-tuning e?' }, answers: [
        { text: { fr: 'Creer de zero', en: 'Create from scratch', de: 'Von Grund auf erstellen', it: 'Creare da zero' }, category: 'wrong' },
        { text: { fr: 'Adapter un modele', en: 'Adapt a model', de: 'Ein Modell anpassen', it: 'Adattare un modello' }, category: 'correct' },
        { text: { fr: 'Supprimer', en: 'Delete', de: 'Loschen', it: 'Eliminare' }, category: 'wrong' },
        { text: { fr: 'Tester', en: 'Test', de: 'Testen', it: 'Testare' }, category: 'wrong' }
      ]},
      { question: { fr: 'Tesla utilise l\'IA pour ?', en: 'Tesla uses AI for?', de: 'Tesla nutzt KI fur?', it: 'Tesla usa l\'IA per?' }, answers: [
        { text: { fr: 'Marketing', en: 'Marketing', de: 'Marketing', it: 'Marketing' }, category: 'wrong' },
        { text: { fr: 'Comptabilite', en: 'Accounting', de: 'Buchhaltung', it: 'Contabilita' }, category: 'wrong' },
        { text: { fr: 'Conduite autonome', en: 'Self-driving', de: 'Autonomes Fahren', it: 'Guida autonoma' }, category: 'correct' },
        { text: { fr: 'Recrutement', en: 'Recruiting', de: 'Rekrutierung', it: 'Reclutamento' }, category: 'wrong' }
      ]},
      { question: { fr: 'L\'EPFL est a ?', en: 'EPFL is in?', de: 'Die EPFL ist in?', it: 'L\'EPFL si trova a?' }, answers: [
        { text: { fr: 'Zurich', en: 'Zurich', de: 'Zurich', it: 'Zurigo' }, category: 'wrong' },
        { text: { fr: 'Lausanne', en: 'Lausanne', de: 'Lausanne', it: 'Losanna' }, category: 'correct' },
        { text: { fr: 'Geneve', en: 'Geneva', de: 'Genf', it: 'Ginevra' }, category: 'wrong' },
        { text: { fr: 'Bern', en: 'Bern', de: 'Bern', it: 'Berna' }, category: 'wrong' }
      ]},
      { question: { fr: 'MLOps c\'est ?', en: 'MLOps is?', de: 'MLOps ist?', it: 'MLOps e?' }, answers: [
        { text: { fr: 'Un langage', en: 'A language', de: 'Eine Sprache', it: 'Un linguaggio' }, category: 'wrong' },
        { text: { fr: 'Un framework', en: 'A framework', de: 'Ein Framework', it: 'Un framework' }, category: 'wrong' },
        { text: { fr: 'ML en production', en: 'ML in production', de: 'ML in Produktion', it: 'ML in produzione' }, category: 'correct' },
        { text: { fr: 'Un reseau social', en: 'A social network', de: 'Ein soziales Netzwerk', it: 'Un social network' }, category: 'wrong' }
      ]}
    ],
    results: [
      { id: 'debutant', title: { fr: 'Debutant IA', en: 'AI Beginner', de: 'KI-Anfanger', it: 'Principiante IA' }, description: { fr: 'Vous decouvrez l\'IA !', en: 'You\'re discovering AI!', de: 'Sie entdecken KI!', it: 'Stai scoprendo l\'IA!' }, icon: '🌱', links: [
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Bases IA', en: 'AI basics', de: 'KI-Grundlagen', it: 'Basi IA' } },
        { label: 'eBooks AI-DUE', url: 'https://ai-due.com/fr/ebooks', description: { fr: 'Guides gratuits', en: 'Free guides', de: 'Kostenlose Anleitungen', it: 'Guide gratuite' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'IA accessible', en: 'Accessible AI', de: 'Zugangliche KI', it: 'IA accessibile' } }
      ]},
      { id: 'initie', title: { fr: 'Initie IA', en: 'AI Intermediate', de: 'KI-Fortgeschrittener', it: 'Intermedio IA' }, description: { fr: 'Bonnes bases ! Passez a l\'action.', en: 'Good foundation! Time to act.', de: 'Gute Grundlagen! Zeit zu handeln.', it: 'Buone basi! E ora di agire.' }, icon: '🚀', links: [
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Deployer l\'IA', en: 'Deploy AI', de: 'KI einsetzen', it: 'Implementare IA' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Premiers agents', en: 'First agents', de: 'Erste Agenten', it: 'Primi agenti' } },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: { fr: 'Formation IA', en: 'AI training', de: 'KI-Schulung', it: 'Formazione IA' } }
      ]},
      { id: 'expert', title: { fr: 'Expert IA', en: 'AI Expert', de: 'KI-Experte', it: 'Esperto IA' }, description: { fr: 'Impressionnant ! Monetisez vos competences.', en: 'Impressive! Monetize your skills.', de: 'Beeindruckend! Monetarisieren Sie Ihre Fahigkeiten.', it: 'Impressionante! Monetizza le tue competenze.' }, icon: '🏆', links: [
        { label: 'Master Seller', url: 'https://master-seller.fr', description: { fr: 'Revendeur IA', en: 'AI reseller', de: 'KI-Wiederverkaufer', it: 'Rivenditore IA' } },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: { fr: 'IA confiance', en: 'Trusted AI', de: 'Vertrauenswurdige KI', it: 'IA affidabile' } },
        { label: 'AI-DUE Blog', url: 'https://ai-due.com/fr/blog', description: { fr: 'Articles avances', en: 'Advanced articles', de: 'Fortgeschrittene Artikel', it: 'Articoli avanzati' } }
      ]},
      { id: 'genie', title: { fr: 'Genie IA', en: 'AI Genius', de: 'KI-Genie', it: 'Genio IA' }, description: { fr: 'Score parfait !', en: 'Perfect score!', de: 'Perfekte Punktzahl!', it: 'Punteggio perfetto!' }, icon: '👑', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Plateforme agents', en: 'Agent platform', de: 'Agenten-Plattform', it: 'Piattaforma agenti' } },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Voice AI', en: 'Voice AI', de: 'Voice AI', it: 'Voice AI' } },
        { label: 'Tesla-Mag', url: 'https://tesla-mag.ch', description: { fr: 'IA et mobilite', en: 'AI and mobility', de: 'KI und Mobilitat', it: 'IA e mobilita' } }
      ]}
    ]
  },
  {
    id: '3', slug: 'entreprise-prete-ia',
    title: { fr: 'Votre entreprise est-elle prete pour l\'IA ?', en: 'Is your company AI-ready?', de: 'Ist Ihr Unternehmen KI-bereit?', it: 'La tua azienda e pronta per l\'IA?' },
    description: { fr: 'Evaluez votre maturite IA en 8 questions.', en: 'Assess your AI maturity in 8 questions.', de: 'Bewerten Sie Ihre KI-Reife in 8 Fragen.', it: 'Valuta la maturita IA in 8 domande.' },
    icon: '📊', questionCount: 8, estimatedTime: '3 min', type: 'score',
    questions: [
      { question: { fr: 'Donnees structurees ?', en: 'Structured data?', de: 'Strukturierte Daten?', it: 'Dati strutturati?' }, answers: [{ text: { fr: 'Oui', en: 'Yes', de: 'Ja', it: 'Si' }, category: 'correct' }, { text: { fr: 'Partiellement', en: 'Partially', de: 'Teilweise', it: 'Parzialmente' }, category: 'half' }, { text: { fr: 'Non', en: 'No', de: 'Nein', it: 'No' }, category: 'wrong' }, { text: { fr: 'Je ne sais pas', en: 'I don\'t know', de: 'Weiss nicht', it: 'Non so' }, category: 'wrong' }]},
      { question: { fr: 'Avez-vous un CRM ?', en: 'Do you have a CRM?', de: 'Haben Sie ein CRM?', it: 'Avete un CRM?' }, answers: [{ text: { fr: 'Oui, bien utilise', en: 'Yes, well used', de: 'Ja, gut genutzt', it: 'Si, ben utilizzato' }, category: 'correct' }, { text: { fr: 'Sous-utilise', en: 'Underused', de: 'Untergenutzt', it: 'Sottoutilizzato' }, category: 'half' }, { text: { fr: 'Non', en: 'No', de: 'Nein', it: 'No' }, category: 'wrong' }, { text: { fr: 'C\'est quoi ?', en: 'What\'s that?', de: 'Was ist das?', it: 'Cos\'e?' }, category: 'wrong' }]},
      { question: { fr: 'Equipe formee au digital ?', en: 'Team digitally trained?', de: 'Team digital geschult?', it: 'Team formato al digitale?' }, answers: [{ text: { fr: 'Tres bien', en: 'Very well', de: 'Sehr gut', it: 'Molto bene' }, category: 'correct' }, { text: { fr: 'Moyennement', en: 'Moderately', de: 'Mittelmassig', it: 'Moderatamente' }, category: 'half' }, { text: { fr: 'Peu', en: 'Little', de: 'Wenig', it: 'Poco' }, category: 'wrong' }, { text: { fr: 'Pas du tout', en: 'Not at all', de: 'Gar nicht', it: 'Per niente' }, category: 'wrong' }]},
      { question: { fr: 'Budget IT annuel ?', en: 'Annual IT budget?', de: 'Jahrliches IT-Budget?', it: 'Budget IT annuale?' }, answers: [{ text: { fr: '> 50k CHF', en: '> 50k CHF', de: '> 50k CHF', it: '> 50k CHF' }, category: 'correct' }, { text: { fr: '10-50k CHF', en: '10-50k CHF', de: '10-50k CHF', it: '10-50k CHF' }, category: 'correct' }, { text: { fr: '1-10k CHF', en: '1-10k CHF', de: '1-10k CHF', it: '1-10k CHF' }, category: 'half' }, { text: { fr: '< 1k CHF', en: '< 1k CHF', de: '< 1k CHF', it: '< 1k CHF' }, category: 'wrong' }]},
      { question: { fr: 'Processus documentes ?', en: 'Documented processes?', de: 'Dokumentierte Prozesse?', it: 'Processi documentati?' }, answers: [{ text: { fr: 'Tous', en: 'All', de: 'Alle', it: 'Tutti' }, category: 'correct' }, { text: { fr: 'Principaux', en: 'Main ones', de: 'Die wichtigsten', it: 'I principali' }, category: 'half' }, { text: { fr: 'Quelques-uns', en: 'A few', de: 'Einige', it: 'Alcuni' }, category: 'wrong' }, { text: { fr: 'Non', en: 'No', de: 'Nein', it: 'No' }, category: 'wrong' }]},
      { question: { fr: 'Strategie digitale ?', en: 'Digital strategy?', de: 'Digitale Strategie?', it: 'Strategia digitale?' }, answers: [{ text: { fr: 'Claire', en: 'Clear', de: 'Klar', it: 'Chiara' }, category: 'correct' }, { text: { fr: 'En construction', en: 'Building', de: 'Im Aufbau', it: 'In costruzione' }, category: 'half' }, { text: { fr: 'Vague', en: 'Vague', de: 'Vage', it: 'Vaga' }, category: 'wrong' }, { text: { fr: 'Non', en: 'No', de: 'Nein', it: 'No' }, category: 'wrong' }]},
      { question: { fr: 'Conformite RGPD ?', en: 'GDPR compliance?', de: 'DSGVO-Konformitat?', it: 'Conformita GDPR?' }, answers: [{ text: { fr: 'Totale', en: 'Full', de: 'Vollstandig', it: 'Totale' }, category: 'correct' }, { text: { fr: 'Partielle', en: 'Partial', de: 'Teilweise', it: 'Parziale' }, category: 'half' }, { text: { fr: 'En cours', en: 'In progress', de: 'In Arbeit', it: 'In corso' }, category: 'wrong' }, { text: { fr: 'Non', en: 'No', de: 'Nein', it: 'No' }, category: 'wrong' }]},
      { question: { fr: 'Direction convaincue ?', en: 'Management convinced?', de: 'Management uberzeugt?', it: 'Direzione convinta?' }, answers: [{ text: { fr: 'Tres motivee', en: 'Very motivated', de: 'Sehr motiviert', it: 'Molto motivata' }, category: 'correct' }, { text: { fr: 'Curieuse', en: 'Curious', de: 'Neugierig', it: 'Curiosa' }, category: 'half' }, { text: { fr: 'Sceptique', en: 'Skeptical', de: 'Skeptisch', it: 'Scettica' }, category: 'wrong' }, { text: { fr: 'Contre', en: 'Against', de: 'Dagegen', it: 'Contraria' }, category: 'wrong' }]}
    ],
    results: [
      { id: 'ready', title: { fr: 'Pret a deployer !', en: 'Ready to deploy!', de: 'Bereit zum Einsatz!', it: 'Pronto al deploy!' }, description: { fr: 'Lancez-vous !', en: 'Go for it!', de: 'Los geht\'s!', it: 'Parti!' }, icon: '🟢', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Premier agent', en: 'First agent', de: 'Erster Agent', it: 'Primo agente' } },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Agent vocal', en: 'Voice agent', de: 'Sprachagent', it: 'Agente vocale' } },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: { fr: 'IA fiable', en: 'Reliable AI', de: 'Zuverlassige KI', it: 'IA affidabile' } }
      ]},
      { id: 'almost', title: { fr: 'Presque pret', en: 'Almost ready', de: 'Fast bereit', it: 'Quasi pronto' }, description: { fr: 'Quelques ajustements.', en: 'A few adjustments.', de: 'Einige Anpassungen.', it: 'Qualche aggiustamento.' }, icon: '🟡', links: [
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Accompagnement', en: 'Support', de: 'Begleitung', it: 'Supporto' } },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: { fr: 'Formation', en: 'Training', de: 'Schulung', it: 'Formazione' } },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Ressources', en: 'Resources', de: 'Ressourcen', it: 'Risorse' } }
      ]},
      { id: 'preparing', title: { fr: 'En preparation', en: 'In preparation', de: 'In Vorbereitung', it: 'In preparazione' }, description: { fr: 'Posez les fondations.', en: 'Build the foundations.', de: 'Legen Sie die Grundlagen.', it: 'Poni le basi.' }, icon: '🟠', links: [
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Bases IA', en: 'AI basics', de: 'KI-Grundlagen', it: 'Basi IA' } },
        { label: 'eBooks', url: 'https://ai-due.com/fr/ebooks', description: { fr: 'Guides', en: 'Guides', de: 'Anleitungen', it: 'Guide' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Premiers pas', en: 'First steps', de: 'Erste Schritte', it: 'Primi passi' } }
      ]},
      { id: 'starting', title: { fr: 'Premiers pas', en: 'First steps', de: 'Erste Schritte', it: 'Primi passi' }, description: { fr: 'Tout le monde commence quelque part !', en: 'Everyone starts somewhere!', de: 'Jeder fangt irgendwo an!', it: 'Tutti iniziano da qualche parte!' }, icon: '🔴', links: [
        { label: 'Blog AI-DUE', url: 'https://ai-due.com/fr/blog', description: { fr: 'Articles', en: 'Articles', de: 'Artikel', it: 'Articoli' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'Accompagnement', en: 'Support', de: 'Begleitung', it: 'Supporto' } },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Comprendre l\'IA', en: 'Understand AI', de: 'KI verstehen', it: 'Capire l\'IA' } }
      ]}
    ]
  },
  {
    id: '4', slug: 'quel-agent-ia-deployer',
    title: { fr: 'Quel agent IA deployer en premier ?', en: 'Which AI agent to deploy first?', de: 'Welchen KI-Agenten zuerst einsetzen?', it: 'Quale agente IA implementare per primo?' },
    description: { fr: 'Trouvez l\'agent ideal en 6 questions.', en: 'Find the ideal agent in 6 questions.', de: 'Finden Sie den idealen Agenten in 6 Fragen.', it: 'Trova l\'agente ideale in 6 domande.' },
    icon: '🤖', questionCount: 6, estimatedTime: '2 min', type: 'profile',
    questions: [
      { question: { fr: 'Volume d\'appels/jour ?', en: 'Daily call volume?', de: 'Tagliches Anrufvolumen?', it: 'Volume chiamate/giorno?' }, answers: [{ text: { fr: '< 10', en: '< 10', de: '< 10', it: '< 10' }, category: 'chatbot' }, { text: { fr: '10-50', en: '10-50', de: '10-50', it: '10-50' }, category: 'vocal' }, { text: { fr: '50-200', en: '50-200', de: '50-200', it: '50-200' }, category: 'vocal' }, { text: { fr: '200+', en: '200+', de: '200+', it: '200+' }, category: 'multi' }]},
      { question: { fr: 'Satisfaction client ?', en: 'Customer satisfaction?', de: 'Kundenzufriedenheit?', it: 'Soddisfazione cliente?' }, answers: [{ text: { fr: '> 90%', en: '> 90%', de: '> 90%', it: '> 90%' }, category: 'commercial' }, { text: { fr: '70-90%', en: '70-90%', de: '70-90%', it: '70-90%' }, category: 'chatbot' }, { text: { fr: '50-70%', en: '50-70%', de: '50-70%', it: '50-70%' }, category: 'vocal' }, { text: { fr: '< 50%', en: '< 50%', de: '< 50%', it: '< 50%' }, category: 'multi' }]},
      { question: { fr: 'Temps de reponse ?', en: 'Response time?', de: 'Antwortzeit?', it: 'Tempo di risposta?' }, answers: [{ text: { fr: '< 1h', en: '< 1h', de: '< 1h', it: '< 1h' }, category: 'commercial' }, { text: { fr: '1-4h', en: '1-4h', de: '1-4h', it: '1-4h' }, category: 'chatbot' }, { text: { fr: '4-24h', en: '4-24h', de: '4-24h', it: '4-24h' }, category: 'vocal' }, { text: { fr: '> 24h', en: '> 24h', de: '> 24h', it: '> 24h' }, category: 'multi' }]},
      { question: { fr: 'Canal principal ?', en: 'Main channel?', de: 'Hauptkanal?', it: 'Canale principale?' }, answers: [{ text: { fr: 'Telephone', en: 'Phone', de: 'Telefon', it: 'Telefono' }, category: 'vocal' }, { text: { fr: 'Email', en: 'Email', de: 'E-Mail', it: 'Email' }, category: 'chatbot' }, { text: { fr: 'Chat', en: 'Chat', de: 'Chat', it: 'Chat' }, category: 'chatbot' }, { text: { fr: 'Multi-canal', en: 'Multi-channel', de: 'Multi-Kanal', it: 'Multi-canale' }, category: 'multi' }]},
      { question: { fr: 'Objectif ?', en: 'Goal?', de: 'Ziel?', it: 'Obiettivo?' }, answers: [{ text: { fr: 'Temps reponse', en: 'Response time', de: 'Antwortzeit', it: 'Tempo risposta' }, category: 'chatbot' }, { text: { fr: 'Qualifier leads', en: 'Qualify leads', de: 'Leads qualifizieren', it: 'Qualificare lead' }, category: 'commercial' }, { text: { fr: 'Support 24/7', en: '24/7 support', de: '24/7-Support', it: 'Supporto 24/7' }, category: 'vocal' }, { text: { fr: 'Vendre plus', en: 'Sell more', de: 'Mehr verkaufen', it: 'Vendere di piu' }, category: 'commercial' }]},
      { question: { fr: 'Niveau technique ?', en: 'Technical level?', de: 'Technisches Niveau?', it: 'Livello tecnico?' }, answers: [{ text: { fr: 'Dev interne', en: 'In-house dev', de: 'Interne Entwicklung', it: 'Dev interno' }, category: 'multi' }, { text: { fr: 'IT basique', en: 'Basic IT', de: 'Basis-IT', it: 'IT base' }, category: 'chatbot' }, { text: { fr: 'Aucun', en: 'None', de: 'Keines', it: 'Nessuno' }, category: 'vocal' }, { text: { fr: 'Externalise', en: 'Outsourced', de: 'Ausgelagert', it: 'Esternalizzato' }, category: 'commercial' }]}
    ],
    results: [
      { id: 'vocal', title: { fr: 'Agent Vocal IA', en: 'AI Voice Agent', de: 'KI-Sprachagent', it: 'Agente Vocale IA' }, description: { fr: 'Gerez les appels 24/7.', en: 'Handle calls 24/7.', de: 'Anrufe 24/7 verwalten.', it: 'Gestisci chiamate 24/7.' }, icon: '📞', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Agent vocal', en: 'Voice agent', de: 'Sprachagent', it: 'Agente vocale' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Plateforme', en: 'Platform', de: 'Plattform', it: 'Piattaforma' } },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: { fr: 'IA fiable', en: 'Reliable AI', de: 'Zuverlassige KI', it: 'IA affidabile' } }
      ]},
      { id: 'chatbot', title: { fr: 'Agent Chatbot', en: 'Chatbot Agent', de: 'Chatbot-Agent', it: 'Agente Chatbot' }, description: { fr: 'Support instantane.', en: 'Instant support.', de: 'Sofortige Unterstutzung.', it: 'Supporto istantaneo.' }, icon: '💬', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Chatbot IA', en: 'AI chatbot', de: 'KI-Chatbot', it: 'Chatbot IA' } },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: { fr: 'Guides', en: 'Guides', de: 'Anleitungen', it: 'Guide' } },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: { fr: 'PME', en: 'SME', de: 'KMU', it: 'PMI' } }
      ]},
      { id: 'commercial', title: { fr: 'Agent Commercial', en: 'Sales Agent', de: 'Vertriebsagent', it: 'Agente Commerciale' }, description: { fr: 'Boostez vos ventes.', en: 'Boost your sales.', de: 'Steigern Sie Ihren Umsatz.', it: 'Aumenta le vendite.' }, icon: '💰', links: [
        { label: 'Master Seller', url: 'https://master-seller.fr', description: { fr: 'Formation vente', en: 'Sales training', de: 'Verkaufsschulung', it: 'Formazione vendite' } },
        { label: 'SEO True', url: 'https://seo-true.com', description: { fr: 'Acquisition', en: 'Acquisition', de: 'Akquise', it: 'Acquisizione' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Agent commercial', en: 'Sales agent', de: 'Vertriebsagent', it: 'Agente commerciale' } }
      ]},
      { id: 'multi', title: { fr: 'Agent Multi-canal', en: 'Multi-channel Agent', de: 'Multi-Kanal-Agent', it: 'Agente Multi-canale' }, description: { fr: 'Telephone + email + chat.', en: 'Phone + email + chat.', de: 'Telefon + E-Mail + Chat.', it: 'Telefono + email + chat.' }, icon: '🌐', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: { fr: 'Voice + Chat', en: 'Voice + Chat', de: 'Voice + Chat', it: 'Voice + Chat' } },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: { fr: 'Multi-canal', en: 'Multi-channel', de: 'Multi-Kanal', it: 'Multi-canale' } },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: { fr: 'IA securisee', en: 'Secure AI', de: 'Sichere KI', it: 'IA sicura' } }
      ]}
    ]
  }
]
