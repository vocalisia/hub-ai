export interface QuizQuestion {
  question: string
  answers: { text: string; category: string }[]
}

export interface QuizResult {
  id: string
  title: string
  description: string
  links: { label: string; url: string; description: string }[]
  icon: string
}

export interface Quiz {
  id: string
  slug: string
  title: string
  description: string
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
    title: 'Quel type d\'IA est fait pour votre entreprise ?',
    description: 'Decouvrez en 8 questions quelle solution IA correspond le mieux a vos besoins.',
    icon: '🎯',
    questionCount: 8,
    estimatedTime: '3 min',
    type: 'profile',
    questions: [
      { question: 'Quel est votre secteur d\'activite ?', answers: [
        { text: 'Services / Conseil', category: 'automation' },
        { text: 'Commerce / Retail', category: 'marketing' },
        { text: 'Industrie / Manufacturing', category: 'architecture' },
        { text: 'Tech / Digital', category: 'architecture' }
      ]},
      { question: 'Combien d\'employes dans votre entreprise ?', answers: [
        { text: '1-10 (TPE)', category: 'vocal' },
        { text: '10-50 (PME)', category: 'automation' },
        { text: '50-250 (ETI)', category: 'architecture' },
        { text: '250+ (Grande entreprise)', category: 'architecture' }
      ]},
      { question: 'Quel est votre principal defi ?', answers: [
        { text: 'Productivite et efficacite', category: 'automation' },
        { text: 'Service client et satisfaction', category: 'vocal' },
        { text: 'Ventes et acquisition', category: 'marketing' },
        { text: 'Reduction des couts', category: 'automation' }
      ]},
      { question: 'Avez-vous deja utilise des outils IA ?', answers: [
        { text: 'Jamais', category: 'vocal' },
        { text: 'ChatGPT basique', category: 'automation' },
        { text: 'Plusieurs outils', category: 'marketing' },
        { text: 'Expert / Dev IA', category: 'architecture' }
      ]},
      { question: 'Quel budget mensuel pour l\'IA ?', answers: [
        { text: 'Moins de 100 CHF', category: 'vocal' },
        { text: '100-500 CHF', category: 'automation' },
        { text: '500-2000 CHF', category: 'marketing' },
        { text: '2000+ CHF', category: 'architecture' }
      ]},
      { question: 'Quelle tache prend le plus de temps ?', answers: [
        { text: 'Emails et messages', category: 'automation' },
        { text: 'Appels telephoniques', category: 'vocal' },
        { text: 'Documents et rapports', category: 'automation' },
        { text: 'Analyse de donnees', category: 'architecture' }
      ]},
      { question: 'Vos clients vous contactent par ?', answers: [
        { text: 'Telephone', category: 'vocal' },
        { text: 'Email', category: 'automation' },
        { text: 'Chat / Reseaux sociaux', category: 'marketing' },
        { text: 'Multi-canal', category: 'architecture' }
      ]},
      { question: 'Votre priorite #1 ?', answers: [
        { text: 'Automatiser les taches repetitives', category: 'automation' },
        { text: 'Innover et se differencier', category: 'architecture' },
        { text: 'Reduire les couts operationnels', category: 'vocal' },
        { text: 'Croitre et scaler', category: 'marketing' }
      ]}
    ],
    results: [
      { id: 'vocal', title: 'Agent Vocal IA', description: 'Votre entreprise beneficierait d\'un agent vocal IA. Automatisez vos appels et offrez un support 24/7.', icon: '📞', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Agent vocal IA' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Agents autonomes' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Accompagnement PME' }
      ]},
      { id: 'automation', title: 'Automatisation Business', description: 'Priorite : automatiser les processus repetitifs avec des workflows et agents autonomes.', icon: '⚡', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Agents autonomes' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Solutions PME' },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Telephonie IA' }
      ]},
      { id: 'marketing', title: 'Marketing IA', description: 'Croissance par le marketing automatise : SEO, contenu et acquisition amplifies par l\'IA.', icon: '📈', links: [
        { label: 'SEO True', url: 'https://seo-true.com', description: 'SEO et IA' },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Strategie IA' },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: 'Revendeur IA' }
      ]},
      { id: 'architecture', title: 'Architecture IA Avancee', description: 'Architecture IA sur mesure : LLM, MLOps, multi-agents et infrastructure cloud.', icon: '🏗️', links: [
        { label: 'AI-DUE', url: 'https://ai-due.com', description: 'Architecture IA' },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: 'IA de confiance' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Agents avances' }
      ]}
    ]
  },
  {
    id: '2',
    slug: 'testez-connaissances-ia',
    title: 'Testez vos connaissances en IA',
    description: '10 questions pour evaluer votre niveau en intelligence artificielle.',
    icon: '🧠',
    questionCount: 10,
    estimatedTime: '4 min',
    type: 'score',
    questions: [
      { question: 'Que signifie LLM ?', answers: [{ text: 'Large Language Model', category: 'correct' }, { text: 'Linear Learning Machine', category: 'wrong' }, { text: 'Logical Logic Module', category: 'wrong' }, { text: 'Local Language Manager', category: 'wrong' }]},
      { question: 'Qui a cree ChatGPT ?', answers: [{ text: 'Google', category: 'wrong' }, { text: 'OpenAI', category: 'correct' }, { text: 'Meta', category: 'wrong' }, { text: 'Microsoft', category: 'wrong' }]},
      { question: 'Qu\'est-ce que le RAG ?', answers: [{ text: 'Random Access Generation', category: 'wrong' }, { text: 'Retrieval Augmented Generation', category: 'correct' }, { text: 'Rapid AI Gateway', category: 'wrong' }, { text: 'Real-time Analysis Grid', category: 'wrong' }]},
      { question: 'Quel modele est developpe par Anthropic ?', answers: [{ text: 'GPT-4', category: 'wrong' }, { text: 'Gemini', category: 'wrong' }, { text: 'Claude', category: 'correct' }, { text: 'Mistral', category: 'wrong' }]},
      { question: 'Que fait un agent IA autonome ?', answers: [{ text: 'Il repond aux questions', category: 'wrong' }, { text: 'Il execute des taches de maniere autonome', category: 'correct' }, { text: 'Il genere des images', category: 'wrong' }, { text: 'Il traduit du texte', category: 'wrong' }]},
      { question: 'L\'EU AI Act concerne ?', answers: [{ text: 'La reglementation IA en Europe', category: 'correct' }, { text: 'Un programme de recherche', category: 'wrong' }, { text: 'Un concours de startups', category: 'wrong' }, { text: 'Une licence logicielle', category: 'wrong' }]},
      { question: 'Qu\'est-ce que le fine-tuning ?', answers: [{ text: 'Creer un modele de zero', category: 'wrong' }, { text: 'Adapter un modele pre-entraine', category: 'correct' }, { text: 'Supprimer un modele', category: 'wrong' }, { text: 'Tester un modele', category: 'wrong' }]},
      { question: 'Tesla utilise l\'IA pour ?', answers: [{ text: 'Le marketing', category: 'wrong' }, { text: 'La comptabilite', category: 'wrong' }, { text: 'La conduite autonome', category: 'correct' }, { text: 'Le recrutement', category: 'wrong' }]},
      { question: 'L\'EPFL se trouve a ?', answers: [{ text: 'Zurich', category: 'wrong' }, { text: 'Lausanne', category: 'correct' }, { text: 'Geneve', category: 'wrong' }, { text: 'Bern', category: 'wrong' }]},
      { question: 'Qu\'est-ce que MLOps ?', answers: [{ text: 'Un langage de programmation', category: 'wrong' }, { text: 'Un framework frontend', category: 'wrong' }, { text: 'Operations ML en production', category: 'correct' }, { text: 'Un reseau social', category: 'wrong' }]}
    ],
    results: [
      { id: 'debutant', title: 'Debutant IA', description: 'Vous decouvrez l\'IA ! Nos ressources vont vous aider.', icon: '🌱', links: [
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Bases de l\'IA' },
        { label: 'eBooks AI-DUE', url: 'https://ai-due.com/fr/ebooks', description: 'Guides gratuits' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'IA accessible' }
      ]},
      { id: 'initie', title: 'Initie IA', description: 'Bonnes bases ! Passez a l\'action.', icon: '🚀', links: [
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Deployer l\'IA' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Premiers agents' },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: 'Formation IA' }
      ]},
      { id: 'expert', title: 'Expert IA', description: 'Impressionnant ! Monetisez vos competences.', icon: '🏆', links: [
        { label: 'Master Seller', url: 'https://master-seller.fr', description: 'Revendeur IA' },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: 'IA confiance' },
        { label: 'AI-DUE Blog', url: 'https://ai-due.com/fr/blog', description: 'Articles avances' }
      ]},
      { id: 'genie', title: 'Genie IA', description: 'Score parfait ! Rejoignez notre ecosysteme.', icon: '👑', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Plateforme agents' },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Voice AI' },
        { label: 'Tesla-Mag', url: 'https://tesla-mag.ch', description: 'IA et mobilite' }
      ]}
    ]
  },
  {
    id: '3',
    slug: 'entreprise-prete-ia',
    title: 'Votre entreprise est-elle prete pour l\'IA ?',
    description: 'Evaluez la maturite IA de votre organisation en 8 questions.',
    icon: '📊',
    questionCount: 8,
    estimatedTime: '3 min',
    type: 'score',
    questions: [
      { question: 'Vos donnees sont-elles structurees ?', answers: [{ text: 'Oui, bien organisees', category: 'correct' }, { text: 'Partiellement', category: 'half' }, { text: 'Non', category: 'wrong' }, { text: 'Je ne sais pas', category: 'wrong' }]},
      { question: 'Avez-vous un CRM ?', answers: [{ text: 'Oui, bien utilise', category: 'correct' }, { text: 'Oui, sous-utilise', category: 'half' }, { text: 'Non', category: 'wrong' }, { text: 'C\'est quoi ?', category: 'wrong' }]},
      { question: 'Equipe formee au digital ?', answers: [{ text: 'Tres bien', category: 'correct' }, { text: 'Moyennement', category: 'half' }, { text: 'Peu', category: 'wrong' }, { text: 'Pas du tout', category: 'wrong' }]},
      { question: 'Budget IT annuel ?', answers: [{ text: '> 50k CHF', category: 'correct' }, { text: '10-50k CHF', category: 'correct' }, { text: '1-10k CHF', category: 'half' }, { text: '< 1k CHF', category: 'wrong' }]},
      { question: 'Processus documentes ?', answers: [{ text: 'Oui, tous', category: 'correct' }, { text: 'Les principaux', category: 'half' }, { text: 'Quelques-uns', category: 'wrong' }, { text: 'Non', category: 'wrong' }]},
      { question: 'Strategie digitale ?', answers: [{ text: 'Claire et suivie', category: 'correct' }, { text: 'En construction', category: 'half' }, { text: 'Vague', category: 'wrong' }, { text: 'Non', category: 'wrong' }]},
      { question: 'Conformite RGPD ?', answers: [{ text: 'Totale', category: 'correct' }, { text: 'Partielle', category: 'half' }, { text: 'En cours', category: 'wrong' }, { text: 'Non', category: 'wrong' }]},
      { question: 'Direction convaincue par l\'IA ?', answers: [{ text: 'Tres motivee', category: 'correct' }, { text: 'Curieuse', category: 'half' }, { text: 'Sceptique', category: 'wrong' }, { text: 'Contre', category: 'wrong' }]}
    ],
    results: [
      { id: 'ready', title: 'Pret a deployer !', description: 'Votre entreprise est prete. Lancez-vous !', icon: '🟢', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Premier agent' },
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Agent vocal' },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: 'IA fiable' }
      ]},
      { id: 'almost', title: 'Presque pret', description: 'Quelques ajustements et c\'est bon.', icon: '🟡', links: [
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Accompagnement' },
        { label: 'Master Seller', url: 'https://master-seller.fr', description: 'Formation' },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Ressources' }
      ]},
      { id: 'preparing', title: 'En preparation', description: 'Posez les fondations d\'abord.', icon: '🟠', links: [
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Bases IA' },
        { label: 'eBooks AI-DUE', url: 'https://ai-due.com/fr/ebooks', description: 'Guides' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Premiers pas' }
      ]},
      { id: 'starting', title: 'Premiers pas', description: 'Tout le monde commence quelque part !', icon: '🔴', links: [
        { label: 'Blog AI-DUE', url: 'https://ai-due.com/fr/blog', description: 'Articles' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Accompagnement' },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Comprendre l\'IA' }
      ]}
    ]
  },
  {
    id: '4',
    slug: 'quel-agent-ia-deployer',
    title: 'Quel agent IA deployer en premier ?',
    description: 'Trouvez l\'agent IA ideal en 6 questions.',
    icon: '🤖',
    questionCount: 6,
    estimatedTime: '2 min',
    type: 'profile',
    questions: [
      { question: 'Volume d\'appels par jour ?', answers: [{ text: 'Moins de 10', category: 'chatbot' }, { text: '10-50', category: 'vocal' }, { text: '50-200', category: 'vocal' }, { text: '200+', category: 'multi' }]},
      { question: 'Satisfaction client actuelle ?', answers: [{ text: '> 90%', category: 'commercial' }, { text: '70-90%', category: 'chatbot' }, { text: '50-70%', category: 'vocal' }, { text: '< 50%', category: 'multi' }]},
      { question: 'Temps de reponse moyen ?', answers: [{ text: '< 1h', category: 'commercial' }, { text: '1-4h', category: 'chatbot' }, { text: '4-24h', category: 'vocal' }, { text: '> 24h', category: 'multi' }]},
      { question: 'Canal principal ?', answers: [{ text: 'Telephone', category: 'vocal' }, { text: 'Email', category: 'chatbot' }, { text: 'Chat en ligne', category: 'chatbot' }, { text: 'Multi-canal', category: 'multi' }]},
      { question: 'Objectif principal ?', answers: [{ text: 'Reduire temps reponse', category: 'chatbot' }, { text: 'Qualifier les leads', category: 'commercial' }, { text: 'Support 24/7', category: 'vocal' }, { text: 'Vendre plus', category: 'commercial' }]},
      { question: 'Niveau technique equipe ?', answers: [{ text: 'Dev interne', category: 'multi' }, { text: 'IT basique', category: 'chatbot' }, { text: 'Aucun', category: 'vocal' }, { text: 'On externalise', category: 'commercial' }]}
    ],
    results: [
      { id: 'vocal', title: 'Agent Vocal IA', description: 'Agent vocal pour gerer les appels 24/7.', icon: '📞', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Agent vocal cle en main' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Plateforme agents' },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: 'IA fiable' }
      ]},
      { id: 'chatbot', title: 'Agent Chatbot', description: 'Chatbot IA pour support instantane.', icon: '💬', links: [
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Chatbot IA' },
        { label: 'Vocalis Blog', url: 'https://vocalis.blog', description: 'Guides chatbot' },
        { label: 'IA PME Suisse', url: 'https://iapmesuisse.ch', description: 'Solutions PME' }
      ]},
      { id: 'commercial', title: 'Agent Commercial IA', description: 'Agent commercial pour booster les ventes.', icon: '💰', links: [
        { label: 'Master Seller', url: 'https://master-seller.fr', description: 'Formation vente IA' },
        { label: 'SEO True', url: 'https://seo-true.com', description: 'Acquisition digitale' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Agent commercial' }
      ]},
      { id: 'multi', title: 'Agent Multi-canal', description: 'Agent unifie telephone + email + chat.', icon: '🌐', links: [
        { label: 'Vocalis Pro', url: 'https://vocalis.pro', description: 'Voice + Chat' },
        { label: 'Agents IA Pro', url: 'https://agents-ia.pro', description: 'Multi-canal' },
        { label: 'Trustly AI', url: 'https://trustly-ai.com', description: 'IA securisee' }
      ]}
    ]
  }
]
