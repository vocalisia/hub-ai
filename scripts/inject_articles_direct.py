"""
Injecte 30 articles MDX dans hub-ai/content/blog/
FR + EN + DE + IT — aucune API externe nécessaire
Traductions intégrées directement dans ce script
"""
import re, yaml
from pathlib import Path

SRC = Path("C:/Users/cohen.000/cocon-semantique-project/content-generator/output/ai-due-30-articles")
BLOG = Path("C:/Users/cohen.000/hub-ai/content/blog")
BLOG.mkdir(parents=True, exist_ok=True)
for lang in ["en","de","it"]:
    (BLOG / lang).mkdir(exist_ok=True)

# ── Traductions des 30 articles (title + excerpt) ─────────────────────────────
TRANSLATIONS = {
    "guide-agents-ia-autonomes-2026": {
        "en": {
            "title": "Complete Guide to Autonomous AI Agents in 2026",
            "excerpt": "Discover what autonomous AI agents are, how they work, and how to adopt them in your business in 2026. Expert complete guide.",
            "h1": "Autonomous AI Agents in 2026: The Complete Guide for Understanding and Adopting This Revolution"
        },
        "de": {
            "title": "Vollständiger Leitfaden zu autonomen KI-Agenten 2026",
            "excerpt": "Entdecken Sie, was autonome KI-Agenten sind, wie sie funktionieren und wie Sie sie 2026 in Ihrem Unternehmen einsetzen können.",
            "h1": "Autonome KI-Agenten 2026: Der vollständige Leitfaden zum Verstehen und Einführen dieser Revolution"
        },
        "it": {
            "title": "Guida completa agli agenti IA autonomi nel 2026",
            "excerpt": "Scoprite cosa sono gli agenti IA autonomi, come funzionano e come adottarli nella vostra azienda nel 2026. Guida esperta completa.",
            "h1": "Agenti IA Autonomi nel 2026: La guida completa per comprendere e adottare questa rivoluzione"
        }
    },
    "agent-whatsapp-ia-communication-client": {
        "en": {
            "title": "WhatsApp AI Agent: Transform Your Customer Communication in 2026",
            "excerpt": "A WhatsApp AI agent automates your customer interactions, generates leads and boosts your conversions. Real ROI cases and practical implementation.",
            "h1": "WhatsApp AI Agent: How to Transform Your Customer Communication in 2026"
        },
        "de": {
            "title": "WhatsApp-KI-Agent: Kundenkommunikation 2026 transformieren",
            "excerpt": "Ein WhatsApp-KI-Agent automatisiert Ihre Kundeninteraktionen, generiert Leads und steigert Ihre Conversions.",
            "h1": "WhatsApp-KI-Agent: Wie Sie Ihre Kundenkommunikation 2026 transformieren"
        },
        "it": {
            "title": "Agente IA WhatsApp: trasformare la comunicazione con i clienti nel 2026",
            "excerpt": "Un agente IA WhatsApp automatizza le interazioni con i clienti, genera lead e aumenta le conversioni.",
            "h1": "Agente IA WhatsApp: come trasformare la comunicazione con i clienti nel 2026"
        }
    },
    "agent-vocal-ia-automatisation-appels": {
        "en": {
            "title": "Vocal AI Agent: Revolutionize Your Inbound and Outbound Call Management",
            "excerpt": "The vocal AI agent transforms your call centers: reception, appointment booking, automated prospecting. Real ROI and deployment guide.",
            "h1": "Vocal AI Agent: How to Revolutionize Your Business Phone Calls in 2026"
        },
        "de": {
            "title": "Sprach-KI-Agent: Eingehende und ausgehende Anrufe revolutionieren",
            "excerpt": "Der Sprach-KI-Agent transformiert Ihre Callcenter: Empfang, Terminvereinbarung, automatisierte Akquise.",
            "h1": "Sprach-KI-Agent: Wie Sie Ihre Anrufverwaltung 2026 revolutionieren"
        },
        "it": {
            "title": "Agente vocale IA: rivoluzionare la gestione delle chiamate in entrata e in uscita",
            "excerpt": "L'agente vocale IA trasforma i call center: ricezione, prenotazione appuntamenti, prospezione automatizzata.",
            "h1": "Agente Vocale IA: come rivoluzionare la gestione delle telefonate aziendali nel 2026"
        }
    },
    "generation-leads-ia-methodes-2026": {
        "en": {
            "title": "AI Lead Generation: 5 Methods That Convert in 2026",
            "excerpt": "Discover the 5 best AI lead generation methods in 2026: chatbot, vocal, email, WhatsApp, AI SEO. Cost/effectiveness comparison included.",
            "h1": "AI Lead Generation: The 5 Methods That Convert Best in 2026"
        },
        "de": {
            "title": "KI-Lead-Generierung: 5 Methoden die 2026 konvertieren",
            "excerpt": "Die 5 besten KI-Methoden zur Lead-Generierung 2026: Chatbot, Sprach-, E-Mail-, WhatsApp-, KI-SEO.",
            "h1": "KI-Lead-Generierung: Die 5 Methoden mit der besten Konversionsrate 2026"
        },
        "it": {
            "title": "Generazione di lead con IA: 5 metodi che convertono nel 2026",
            "excerpt": "Scoprite i 5 migliori metodi di generazione di lead con IA nel 2026: chatbot, vocale, email, WhatsApp, SEO IA.",
            "h1": "Generazione Lead con IA: i 5 Metodi che Convertono Meglio nel 2026"
        }
    },
    "agents-ia-vs-chatbots-comparaison": {
        "en": {
            "title": "Autonomous AI Agents vs Traditional Chatbots: Complete 2026 Comparison",
            "excerpt": "AI agents vs classic chatbots: autonomy, cost, integration, use cases. Complete comparison table to choose the right solution in 2026.",
            "h1": "AI Agents vs Traditional Chatbots: The Complete Comparison You've Been Waiting For in 2026"
        },
        "de": {
            "title": "Autonome KI-Agenten vs. traditionelle Chatbots: Vollständiger Vergleich 2026",
            "excerpt": "KI-Agenten vs. klassische Chatbots: Autonomie, Kosten, Integration, Anwendungsfälle. Vollständige Vergleichstabelle.",
            "h1": "KI-Agenten vs. Traditionelle Chatbots: Der vollständige Vergleich 2026"
        },
        "it": {
            "title": "Agenti IA autonomi vs chatbot tradizionali: confronto completo 2026",
            "excerpt": "Agenti IA vs chatbot classici: autonomia, costi, integrazione, casi d'uso. Tabella comparativa completa.",
            "h1": "Agenti IA vs Chatbot Tradizionali: Il Confronto Completo che Aspettavate nel 2026"
        }
    },
    "ia-agentique-revolution-business": {
        "en": {
            "title": "Agentic AI: The Silent Revolution Transforming Digital Business",
            "excerpt": "Agentic AI is deeply changing digital business. Definition, differences from LLMs, multi-agent orchestration and concrete use cases in 2026.",
            "h1": "Agentic AI: The Silent Revolution That Is Transforming Digital Business"
        },
        "de": {
            "title": "Agentische KI: Die stille Revolution, die das digitale Business transformiert",
            "excerpt": "Agentische KI verändert das digitale Business grundlegend. Definition, Unterschiede zu LLMs, Multi-Agenten-Orchestrierung.",
            "h1": "Agentische KI: Die stille Revolution, die das digitale Business transformiert"
        },
        "it": {
            "title": "IA agentica: la rivoluzione silenziosa che trasforma il business digitale",
            "excerpt": "L'IA agentica sta cambiando profondamente il business digitale. Definizione, differenze con gli LLM, orchestrazione multi-agente.",
            "h1": "IA Agentica: la Rivoluzione Silenziosa che Trasforma il Business Digitale"
        }
    },
    "automatisation-prospection-commerciale-ia": {
        "en": {
            "title": "Automate Your Sales Prospecting with AI: Practical Guide 2026",
            "excerpt": "Complete guide to automating B2B and B2C prospecting with AI in 2026: tools, sequences, scripts and KPIs to maximize your pipeline.",
            "h1": "Automate Your Sales Prospecting with AI: The Complete Practical Guide 2026"
        },
        "de": {
            "title": "Vertriebsakquise mit KI automatisieren: Praxisleitfaden 2026",
            "excerpt": "Vollständiger Leitfaden zur Automatisierung der B2B- und B2C-Akquise mit KI 2026: Tools, Sequenzen, Skripte und KPIs.",
            "h1": "Vertriebsakquise mit KI Automatisieren: Der vollständige Praxisleitfaden 2026"
        },
        "it": {
            "title": "Automatizzare la prospezione commerciale con l'IA: guida pratica 2026",
            "excerpt": "Guida completa per automatizzare la prospezione B2B e B2C con l'IA nel 2026: strumenti, sequenze, script e metriche.",
            "h1": "Automatizzare la Prospezione Commerciale con l'IA: La Guida Pratica Completa 2026"
        }
    },
    "cas-usage-agents-ia-entreprise": {
        "en": {
            "title": "10 Concrete AI Agent Use Cases in Business (With Real Results)",
            "excerpt": "Discover 10 real AI agent use cases in business: customer service, HR, sales, support, marketing. Quantified results and concrete lessons.",
            "h1": "10 Concrete AI Agent Use Cases in Business: Real Results Included"
        },
        "de": {
            "title": "10 konkrete Anwendungsfälle von KI-Agenten in Unternehmen (mit echten Ergebnissen)",
            "excerpt": "10 reale Anwendungsfälle von KI-Agenten in Unternehmen: Kundenservice, HR, Vertrieb, Support, Marketing.",
            "h1": "10 Konkrete KI-Agenten-Anwendungsfälle in Unternehmen: Echte Ergebnisse Inklusive"
        },
        "it": {
            "title": "10 casi d'uso concreti degli agenti IA in azienda (con risultati reali)",
            "excerpt": "10 casi reali di agenti IA in azienda: servizio clienti, HR, vendite, supporto, marketing. Risultati quantificati.",
            "h1": "10 Casi d'Uso Concreti degli Agenti IA in Azienda: Risultati Reali Inclusi"
        }
    },
    "seo-ia-2026-guide-complet": {
        "en": {
            "title": "AI SEO 2026: Complete Guide to Ranking in ChatGPT, Perplexity and Google",
            "excerpt": "Discover AI SEO 2026: GEO strategies to appear in ChatGPT, Perplexity and Gemini. Complete guide with actionable techniques for entrepreneurs.",
            "h1": "AI SEO 2026: The Complete Guide to Ranking in ChatGPT, Perplexity and Google"
        },
        "de": {
            "title": "KI-SEO 2026: Vollständiger Leitfaden für Rankings in ChatGPT, Perplexity und Google",
            "excerpt": "KI-SEO 2026: GEO-Strategien, um in ChatGPT, Perplexity und Gemini zu erscheinen.",
            "h1": "KI-SEO 2026: Der vollständige Leitfaden für Rankings in ChatGPT, Perplexity und Google"
        },
        "it": {
            "title": "SEO IA 2026: guida completa per posizionarsi su ChatGPT, Perplexity e Google",
            "excerpt": "SEO IA 2026: strategie GEO per apparire in ChatGPT, Perplexity e Gemini. Guida completa con tecniche applicabili.",
            "h1": "SEO IA 2026: La Guida Completa per Posizionarsi su ChatGPT, Perplexity e Google"
        }
    },
    "geo-vs-seo-strategie-2026": {
        "en": {
            "title": "GEO vs SEO: Which Strategy to Adopt to Dominate Search Engines in 2026?",
            "excerpt": "GEO vs SEO 2026: understand the differences, complementarities and optimal strategy to maximize your visibility on Google and generative AI.",
            "h1": "GEO vs SEO 2026: Which Strategy to Adopt to Dominate Search Engines?"
        },
        "de": {
            "title": "GEO vs. SEO: Welche Strategie für 2026 wählen?",
            "excerpt": "GEO vs. SEO 2026: Unterschiede, Komplementarität und optimale Strategie für maximale Sichtbarkeit.",
            "h1": "GEO vs. SEO 2026: Welche Strategie Wählen, um Suchmaschinen zu Dominieren?"
        },
        "it": {
            "title": "GEO vs SEO: quale strategia adottare per dominare i motori di ricerca nel 2026?",
            "excerpt": "GEO vs SEO 2026: differenze, complementarità e strategia ottimale per massimizzare la visibilità.",
            "h1": "GEO vs SEO 2026: Quale Strategia Adottare per Dominare i Motori di Ricerca?"
        }
    },
    "recherche-vocale-optimisation-voice-search": {
        "en": {
            "title": "Voice Search 2026: How to Optimize Your Site for Voice Search",
            "excerpt": "Complete strategy to optimize your site for voice search in 2026: long-tail, featured snippets, schema markup and conversational content.",
            "h1": "Voice Search 2026: The Complete Guide to Optimize Your Site"
        },
        "de": {
            "title": "Sprachsuche 2026: Wie Sie Ihre Website für Voice Search optimieren",
            "excerpt": "Vollständige Strategie zur Optimierung für Sprachsuche 2026: Long-Tail, Featured Snippets, Schema Markup.",
            "h1": "Sprachsuche 2026: Der vollständige Leitfaden zur Optimierung Ihrer Website"
        },
        "it": {
            "title": "Ricerca vocale 2026: come ottimizzare il vostro sito per la voice search",
            "excerpt": "Strategia completa per ottimizzare il sito per la ricerca vocale nel 2026: coda lunga, featured snippet, schema markup.",
            "h1": "Ricerca Vocale 2026: La Guida Completa per Ottimizzare il Vostro Sito"
        }
    },
    "marketing-digital-ia-pme-outils": {
        "en": {
            "title": "AI Digital Marketing for SMEs: Essential Tools in 2026",
            "excerpt": "Discover the best AI tools for SME digital marketing in 2026: SEO, advertising, content, email and social networks. Budget-adapted selection.",
            "h1": "AI Digital Marketing for SMEs: The Essential Tools in 2026"
        },
        "de": {
            "title": "KI-Digitalmarketing für KMU: unverzichtbare Tools 2026",
            "excerpt": "Die besten KI-Tools für das Digitalmarketing von KMU 2026: SEO, Werbung, Content, E-Mail und Social Media.",
            "h1": "KI-Digitalmarketing für KMU: Die Unverzichtbaren Tools 2026"
        },
        "it": {
            "title": "Marketing digitale IA per PMI: strumenti indispensabili nel 2026",
            "excerpt": "I migliori strumenti IA per il marketing digitale delle PMI nel 2026: SEO, pubblicità, contenuti, email e social.",
            "h1": "Marketing Digitale IA per PMI: Gli Strumenti Indispensabili nel 2026"
        }
    },
    "ia-transforme-referencement-naturel-2026": {
        "en": {
            "title": "How Artificial Intelligence Transforms SEO in 2026",
            "excerpt": "Complete analysis of AI's impact on SEO in 2026: AI content, Google algorithms, SGE, reinforced E-E-A-T. Adaptation strategies to stay visible.",
            "h1": "How Artificial Intelligence Is Transforming SEO in 2026"
        },
        "de": {
            "title": "Wie künstliche Intelligenz SEO 2026 transformiert",
            "excerpt": "Vollständige Analyse der KI-Auswirkungen auf SEO 2026: KI-Inhalte, Google-Algorithmen, SGE, verstärktes E-E-A-T.",
            "h1": "Wie Künstliche Intelligenz das SEO 2026 Transformiert"
        },
        "it": {
            "title": "Come l'intelligenza artificiale trasforma il SEO nel 2026",
            "excerpt": "Analisi completa degli impatti dell'IA sul SEO nel 2026: contenuti IA, algoritmi Google, SGE, E-E-A-T rafforzato.",
            "h1": "Come l'Intelligenza Artificiale Sta Trasformando il SEO nel 2026"
        }
    },
    "seo-ia-pme-suisses-strategie-locale": {
        "en": {
            "title": "AI SEO for Swiss SMEs: Strategy and Tools to Dominate Your Local Market",
            "excerpt": "Complete AI SEO guide for Swiss SMEs: Swiss market specifics, multilingualism, Google.ch and recommended AI tools for local dominance.",
            "h1": "AI SEO for Swiss SMEs: Strategy and Tools to Dominate Your Local Market"
        },
        "de": {
            "title": "KI-SEO für Schweizer KMU: Strategie und Tools für lokale Dominanz",
            "excerpt": "Vollständiger KI-SEO-Leitfaden für Schweizer KMU: Besonderheiten des Schweizer Markts, Mehrsprachigkeit, Google.ch.",
            "h1": "KI-SEO für Schweizer KMU: Strategie und Tools zur Lokalen Dominanz"
        },
        "it": {
            "title": "SEO IA per PMI svizzere: strategia e strumenti per dominare il mercato locale",
            "excerpt": "Guida SEO IA completa per PMI svizzere: particolarità del mercato elvetico, multilinguismo, Google.ch.",
            "h1": "SEO IA per PMI Svizzere: Strategia e Strumenti per Dominare il Mercato Locale"
        }
    },
    "contenu-vocal-ia-blog-audio-seo": {
        "en": {
            "title": "Vocal Content and AI Audio Blog: Create Content Optimized for Voice Search",
            "excerpt": "Complete guide to create SEO-optimized vocal content in 2026: AI audio blog, podcast differences, transcription tools and vocal strategy.",
            "h1": "Vocal Content and AI Audio Blog: The Complete Guide for Voice Search SEO"
        },
        "de": {
            "title": "Sprachinhalte und KI-Audio-Blog: SEO-optimierte Inhalte für Sprachsuche erstellen",
            "excerpt": "Vollständiger Leitfaden zur Erstellung von SEO-optimierten Sprachinhalten 2026: KI-Audioblog, Podcast-Unterschiede.",
            "h1": "Sprachinhalte und KI-Audio-Blog: Der vollständige Leitfaden für Voice-Search-SEO"
        },
        "it": {
            "title": "Contenuto vocale e blog audio IA: creare contenuto ottimizzato per la ricerca vocale",
            "excerpt": "Guida completa per creare contenuto vocale ottimizzato SEO nel 2026: blog audio IA, differenze con il podcast.",
            "h1": "Contenuto Vocale e Blog Audio IA: La Guida Completa per il SEO della Ricerca Vocale"
        }
    },
    "eeat-google-2026-ia-autorite": {
        "en": {
            "title": "E-E-A-T Google 2026: How AI Boosts Your Authority and Ranking",
            "excerpt": "Complete breakdown of E-E-A-T Google 2026 and how AI boosts each dimension. Actionable checklist to strengthen your authority and improve your ranking.",
            "h1": "E-E-A-T Google 2026: How AI Reinforces Your Authority and Your Rankings"
        },
        "de": {
            "title": "E-E-A-T Google 2026: Wie KI Ihre Autorität und Ihr Ranking stärkt",
            "excerpt": "Vollständige Analyse von E-E-A-T Google 2026 und wie KI jede Dimension stärkt. Actionable Checkliste.",
            "h1": "E-E-A-T Google 2026: Wie KI Ihre Autorität und Ihre Rankings Stärkt"
        },
        "it": {
            "title": "E-E-A-T Google 2026: come l'IA rafforza la vostra autorità e il vostro posizionamento",
            "excerpt": "Analisi completa di E-E-A-T Google 2026 e come l'IA potenzia ogni dimensione. Checklist applicabile.",
            "h1": "E-E-A-T Google 2026: Come l'IA Rafforza la Vostra Autorità e il Posizionamento"
        }
    },
    "vendre-en-ligne-2026-strategies-ia": {
        "en": {
            "title": "Selling Online in 2026: AI Strategies of Top-Performing Sellers",
            "excerpt": "Discover the AI strategies adopted by the best online sellers in 2026: product sheets, dynamic pricing, chatbots, reputation. Complete guide.",
            "h1": "Selling Online in 2026: The AI Strategies of Top Performers"
        },
        "de": {
            "title": "Online verkaufen 2026: KI-Strategien der erfolgreichsten Händler",
            "excerpt": "Die KI-Strategien der besten Online-Händler 2026: Produktblätter, dynamische Preisgestaltung, Chatbots, Reputation.",
            "h1": "Online Verkaufen 2026: Die KI-Strategien der Erfolgreichsten Händler"
        },
        "it": {
            "title": "Vendere online nel 2026: le strategie IA dei venditori di successo",
            "excerpt": "Scoprite le strategie IA adottate dai migliori venditori online nel 2026: schede prodotto, pricing dinamico, chatbot.",
            "h1": "Vendere Online nel 2026: Le Strategie IA dei Venditori di Maggior Successo"
        }
    },
    "securite-marketplace-ia-protection": {
        "en": {
            "title": "Marketplace Security and AI: How to Protect Buyers and Sellers in 2026",
            "excerpt": "Fraud, scams, fake reviews: AI revolutionizes marketplace security in 2026. Discover how to protect your business and customers effectively.",
            "h1": "Marketplace Security and AI: How to Protect Buyers and Sellers in 2026"
        },
        "de": {
            "title": "Marketplace-Sicherheit und KI: Käufer und Verkäufer 2026 schützen",
            "excerpt": "Betrug, Fake-Bewertungen: KI revolutioniert die Marketplace-Sicherheit 2026. So schützen Sie Ihr Business.",
            "h1": "Marketplace-Sicherheit und KI: Wie Sie Käufer und Verkäufer 2026 Schützen"
        },
        "it": {
            "title": "Sicurezza marketplace e IA: come proteggere acquirenti e venditori nel 2026",
            "excerpt": "Frodi, truffe, recensioni false: l'IA rivoluziona la sicurezza dei marketplace nel 2026.",
            "h1": "Sicurezza Marketplace e IA: Come Proteggere Acquirenti e Venditori nel 2026"
        }
    },
    "confiance-client-ia-conversion-ecommerce": {
        "en": {
            "title": "Customer Trust and AI: The New E-Commerce Conversion Pillar in 2026",
            "excerpt": "How AI analyzes and strengthens online trust signals to boost your e-commerce conversions in 2026. Psychology, E-E-A-T, reviews, transparency.",
            "h1": "Customer Trust and AI: The New Pillar of E-Commerce Conversion in 2026"
        },
        "de": {
            "title": "Kundenvertrauen und KI: Der neue Konversionspfeiler im E-Commerce 2026",
            "excerpt": "Wie KI Online-Vertrauenssignale analysiert und stärkt, um Ihre E-Commerce-Konversionen 2026 zu steigern.",
            "h1": "Kundenvertrauen und KI: Der Neue Konversionspfeiler im E-Commerce 2026"
        },
        "it": {
            "title": "Fiducia del cliente e IA: il nuovo pilastro della conversione e-commerce nel 2026",
            "excerpt": "Come l'IA analizza e rafforza i segnali di fiducia online per aumentare le conversioni e-commerce nel 2026.",
            "h1": "Fiducia del Cliente e IA: Il Nuovo Pilastro della Conversione E-commerce nel 2026"
        }
    },
    "dropshipping-ia-2026-methode-complete": {
        "en": {
            "title": "AI Dropshipping in 2026: Complete Method to Launch and Scale Your Business",
            "excerpt": "Complete guide to AI-powered dropshipping in 2026: product selection, reliable suppliers, AI product sheets, automated customer service.",
            "h1": "AI Dropshipping in 2026: The Complete Method to Launch and Scale Your Business"
        },
        "de": {
            "title": "KI-Dropshipping 2026: Vollständige Methode zum Starten und Skalieren Ihres Business",
            "excerpt": "Vollständiger Leitfaden für KI-gestütztes Dropshipping 2026: Produktauswahl, zuverlässige Lieferanten, KI-Produktblätter.",
            "h1": "KI-Dropshipping 2026: Die Vollständige Methode zum Starten und Skalieren"
        },
        "it": {
            "title": "Dropshipping IA nel 2026: metodo completo per lanciare e scalare il vostro business",
            "excerpt": "Guida completa al dropshipping potenziato dall'IA nel 2026: selezione prodotti, fornitori affidabili, schede IA.",
            "h1": "Dropshipping IA nel 2026: Il Metodo Completo per Lanciare e Scalare il Business"
        }
    },
    "reputation-digitale-ia-ecommerçants": {
        "en": {
            "title": "Digital Reputation and AI: The Complete Guide for E-Commerce 2026",
            "excerpt": "Manage your online reputation with AI in 2026: review monitoring, automated responses, seller personal branding, crisis recovery.",
            "h1": "Digital Reputation and AI: The Complete Guide for E-Commerce Sellers in 2026"
        },
        "de": {
            "title": "Digitale Reputation und KI: Der vollständige Leitfaden für E-Commerce 2026",
            "excerpt": "Online-Reputation mit KI verwalten 2026: Bewertungsmonitoring, automatische Antworten, persönliches Branding.",
            "h1": "Digitale Reputation und KI: Der Vollständige Leitfaden für E-Commerce 2026"
        },
        "it": {
            "title": "Reputazione digitale e IA: la guida completa per gli e-commerce nel 2026",
            "excerpt": "Gestite la vostra reputazione online con l'IA nel 2026: monitoraggio recensioni, risposte automatiche, personal branding.",
            "h1": "Reputazione Digitale e IA: La Guida Completa per gli E-Commerce nel 2026"
        }
    },
    "certifications-ia-booster-conversions-ecommerce": {
        "en": {
            "title": "AI Certifications and Labels That Boost Your E-Commerce Conversions in 2026",
            "excerpt": "Complete overview of e-commerce certifications in 2026: SSL, PCI DSS, Trusted Shops, AI transparency labels. Impact on buyer trust and conversions.",
            "h1": "AI Certifications and Labels That Boost Your E-Commerce Conversions in 2026"
        },
        "de": {
            "title": "KI-Zertifizierungen und Labels, die Ihre E-Commerce-Konversionen 2026 steigern",
            "excerpt": "Überblick über E-Commerce-Zertifizierungen 2026: SSL, PCI DSS, Trusted Shops, KI-Transparenz-Labels.",
            "h1": "KI-Zertifizierungen und Labels für Mehr E-Commerce-Konversionen 2026"
        },
        "it": {
            "title": "Certificazioni e label IA che aumentano le conversioni e-commerce nel 2026",
            "excerpt": "Panoramica completa delle certificazioni e-commerce nel 2026: SSL, PCI DSS, Trusted Shops, label IA trasparenza.",
            "h1": "Certificazioni e Label IA che Aumentano le Conversioni E-commerce nel 2026"
        }
    },
    "tesla-ia-2026-innovation-technologique": {
        "en": {
            "title": "Tesla and Artificial Intelligence in 2026: Where Does Innovation Stand?",
            "excerpt": "Complete analysis of Tesla's AI strategy in 2026: Autopilot, FSD, Dojo, Optimus. How Tesla sets AI standards for the global tech industry.",
            "h1": "Tesla and Artificial Intelligence in 2026: A Complete Innovation Analysis"
        },
        "de": {
            "title": "Tesla und künstliche Intelligenz 2026: Wo steht die Innovation?",
            "excerpt": "Vollständige Analyse der KI-Strategie von Tesla 2026: Autopilot, FSD, Dojo, Optimus. Tesla setzt KI-Standards.",
            "h1": "Tesla und KI 2026: Eine vollständige Innovationsanalyse"
        },
        "it": {
            "title": "Tesla e l'intelligenza artificiale nel 2026: dove si trova l'innovazione?",
            "excerpt": "Analisi completa della strategia IA di Tesla nel 2026: Autopilot, FSD, Dojo, Optimus.",
            "h1": "Tesla e l'Intelligenza Artificiale nel 2026: Un'Analisi Completa dell'Innovazione"
        }
    },
    "innovations-tech-ia-business-digital-2026": {
        "en": {
            "title": "Tech AI Innovations Revolutionizing Digital Business in 2026",
            "excerpt": "The 10 most impactful AI innovations for entrepreneurs in 2026: autonomous agents, multimodal AI, edge AI, AI robots. Concrete business opportunities.",
            "h1": "Tech AI Innovations That Are Revolutionizing Digital Business in 2026"
        },
        "de": {
            "title": "Tech-KI-Innovationen, die das digitale Business 2026 revolutionieren",
            "excerpt": "Die 10 wirkungsvollsten KI-Innovationen für Unternehmer 2026: autonome Agenten, multimodale KI, Edge-KI.",
            "h1": "Tech-KI-Innovationen die das Digitale Business 2026 Revolutionieren"
        },
        "it": {
            "title": "Innovazioni tech IA che rivoluzionano il business digitale nel 2026",
            "excerpt": "Le 10 innovazioni IA più impattanti per gli imprenditori nel 2026: agenti autonomi, IA multimodale, edge AI.",
            "h1": "Innovazioni Tech IA che Rivoluzionano il Business Digitale nel 2026"
        }
    },
    "tendances-ia-2026-entrepreneurs": {
        "en": {
            "title": "AI Trends 2026: What Will Transform Your Way of Working and Entrepreneuring",
            "excerpt": "Discover the 8 major AI trends 2026 that transform entrepreneurs' daily lives: agentic AI, multimodal, vocal, GEO and much more.",
            "h1": "AI Trends 2026: What Will Transform Your Way of Working and Doing Business"
        },
        "de": {
            "title": "KI-Trends 2026: Was Ihre Arbeits- und Unternehmerweise transformieren wird",
            "excerpt": "Die 8 großen KI-Trends 2026, die den Unternehmeralltag transformieren: agentische KI, multimodal, Sprach-, GEO.",
            "h1": "KI-Trends 2026: Was Ihre Arbeitsweise und Ihr Unternehmertum Transformieren Wird"
        },
        "it": {
            "title": "Tendenze IA 2026: cosa trasformerà il vostro modo di lavorare e fare impresa",
            "excerpt": "Scoprite le 8 grandi tendenze IA 2026 che trasformano il quotidiano degli imprenditori: IA agentica, multimodale, vocale.",
            "h1": "Tendenze IA 2026: Cosa Trasformerà il Vostro Modo di Lavorare e Fare Impresa"
        }
    },
    "entrepreneurs-adoptent-ia-competitivite-2026": {
        "en": {
            "title": "How Entrepreneurs Adopt AI to Stay Competitive in 2026",
            "excerpt": "Real feedback from entrepreneurs who adopted AI in 2026: measurable results, obstacles overcome and practical roadmap for SMEs.",
            "h1": "How Entrepreneurs Are Adopting AI to Stay Competitive in 2026"
        },
        "de": {
            "title": "Wie Unternehmer KI einsetzen, um 2026 wettbewerbsfähig zu bleiben",
            "excerpt": "Erfahrungsberichte von Unternehmern, die KI 2026 eingeführt haben: messbare Ergebnisse, überwundene Hindernisse.",
            "h1": "Wie Unternehmer KI Einsetzen, um 2026 Wettbewerbsfähig zu Bleiben"
        },
        "it": {
            "title": "Come gli imprenditori adottano l'IA per restare competitivi nel 2026",
            "excerpt": "Feedback reali di imprenditori che hanno adottato l'IA nel 2026: risultati misurabili, ostacoli superati.",
            "h1": "Come gli Imprenditori Adottano l'IA per Restare Competitivi nel 2026"
        }
    },
    "intelligence-artificielle-business-guide-complet": {
        "en": {
            "title": "Artificial Intelligence and Business: The Complete Guide for Entrepreneurs in 2026",
            "excerpt": "Complete AI and business guide 2026: definitions, AI types, use cases by department, expected ROI and steps to get started.",
            "h1": "Artificial Intelligence and Business: The Complete Guide for Entrepreneurs in 2026"
        },
        "de": {
            "title": "Künstliche Intelligenz und Business: Der vollständige Leitfaden für Unternehmer 2026",
            "excerpt": "Vollständiger KI- und Business-Leitfaden 2026: Definitionen, KI-Typen, Anwendungsfälle nach Abteilung, erwarteter ROI.",
            "h1": "Künstliche Intelligenz und Business: Der Vollständige Leitfaden für Unternehmer 2026"
        },
        "it": {
            "title": "Intelligenza artificiale e business: la guida completa per imprenditori nel 2026",
            "excerpt": "Guida completa IA e business 2026: definizioni, tipi di IA, casi d'uso per dipartimento, ROI atteso.",
            "h1": "Intelligenza Artificiale e Business: La Guida Completa per Imprenditori nel 2026"
        }
    },
    "reseau-sites-ia-ressources-digital": {
        "en": {
            "title": "Our Network of 11 AI Sites: The Best Resources to Master Digital",
            "excerpt": "Discover the ai-due.com network: 11 specialized AI sites to cover all your digital needs. Agents, SEO, vocal, leads, security, innovation and more.",
            "h1": "Our Network of 11 AI Sites: The Best Resources to Master Digital"
        },
        "de": {
            "title": "Unser Netzwerk von 11 KI-Websites: Die besten Ressourcen für Ihre digitale Meisterschaft",
            "excerpt": "Entdecken Sie das ai-due.com-Netzwerk: 11 spezialisierte KI-Sites für alle Ihre digitalen Bedürfnisse.",
            "h1": "Unser Netzwerk von 11 KI-Websites: Die Besten Ressourcen für Ihre Digitale Meisterschaft"
        },
        "it": {
            "title": "La nostra rete di 11 siti IA: le migliori risorse per padroneggiare il digitale",
            "excerpt": "Scoprite la rete ai-due.com: 11 siti specializzati in IA per coprire tutte le vostre esigenze digitali.",
            "h1": "La Nostra Rete di 11 Siti IA: Le Migliori Risorse per Padroneggiare il Digitale"
        }
    },
    "11-outils-ia-indispensables-entreprises-2026": {
        "en": {
            "title": "11 Essential AI Tools for Businesses in 2026 (Tested and Approved)",
            "excerpt": "Selection of the 11 best AI tools for businesses in 2026, organized by need: autonomous agents, WhatsApp, vocal, SEO, leads, trust and sales.",
            "h1": "11 Essential AI Tools for Businesses in 2026: Tested and Approved"
        },
        "de": {
            "title": "11 unverzichtbare KI-Tools für Unternehmen 2026 (getestet und bewährt)",
            "excerpt": "Auswahl der 11 besten KI-Tools für Unternehmen 2026, nach Bedarf: autonome Agenten, WhatsApp, Sprache, SEO.",
            "h1": "11 Unverzichtbare KI-Tools für Unternehmen 2026: Getestet und Bewährt"
        },
        "it": {
            "title": "11 strumenti IA indispensabili per le aziende nel 2026 (testati e approvati)",
            "excerpt": "Selezione degli 11 migliori strumenti IA per aziende nel 2026, organizzati per esigenza: agenti, WhatsApp, vocale, SEO.",
            "h1": "11 Strumenti IA Indispensabili per le Aziende nel 2026: Testati e Approvati"
        }
    },
    "transformer-entreprise-ia-2026-guide": {
        "en": {
            "title": "Transform Your Business with AI in 2026: Where to Start and How to Succeed",
            "excerpt": "AI transformation guide for business leaders: 5 steps to integrate AI in your company, with concrete examples by sector.",
            "h1": "Transform Your Business with AI in 2026: Where to Start and How to Succeed"
        },
        "de": {
            "title": "Ihr Unternehmen mit KI 2026 transformieren: Wo anfangen und wie gelingt es?",
            "excerpt": "KI-Transformationsleitfaden für Führungskräfte: 5 Schritte zur KI-Integration mit konkreten Branchenbeispielen.",
            "h1": "Ihr Unternehmen mit KI 2026 Transformieren: Wo Anfangen und Wie Gelingt es?"
        },
        "it": {
            "title": "Trasformare la propria azienda con l'IA nel 2026: da dove iniziare e come riuscirci",
            "excerpt": "Guida alla trasformazione IA per dirigenti: 5 passi per integrare l'IA in azienda con esempi concreti per settore.",
            "h1": "Trasformare la Propria Azienda con l'IA nel 2026: Da Dove Iniziare e Come Riuscirci"
        }
    },
}

CLUSTER_CATS = {
    "agents-ia-automatisation": "Agents IA & Automatisation",
    "seo-ia-visibilite":        "SEO IA & Visibilité",
    "confiance-eeat":           "Confiance & E-E-A-T",
    "tech-innovation":          "Tech & Innovation",
    "hub-cross-reseau":         "Intelligence Artificielle",
}

SITES_NETWORK = {
    "vocalis.pro":        "https://vocalis.pro",
    "vocalis.blog":       "https://vocalis.blog",
    "tesla-mag.ch":       "https://tesla-mag.ch",
    "master-seller.fr":   "https://master-seller.fr",
    "iapmesuisse.ch":     "https://iapmesuisse.ch",
    "seo-true.com":       "https://seo-true.com",
    "trustly-ai.com":     "https://trustly-ai.com",
    "trust-vault.com":    "https://trust-vault.com",
    "agents-ia.pro":      "https://agents-ia.pro",
    "agentic-whatsup.com":"https://agentic-whatsup.com",
    "lead-gene.com":      "https://lead-gene.com",
    "vocalis-ai.org":     "https://vocalis-ai.org",
    "woman-cute.com":     "https://woman-cute.com",
}

def parse_fm(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if m:
        return yaml.safe_load(m.group(1)), text[m.end():]
    return {}, text

def guess_cluster(meta, fname):
    c = meta.get("cluster","")
    if c: return c
    f = fname.lower()
    if any(k in f for k in ["agent","whatsapp","vocal","lead","automatisa","prospection","cas-usage"]): return "agents-ia-automatisation"
    if any(k in f for k in ["seo","voice","recherche","suisse","pme","geo","referencement","contenu-vocal","marketing"]): return "seo-ia-visibilite"
    if any(k in f for k in ["confiance","eeat","trust","certif","reputation","securite","marketplace","dropshipping","vendre"]): return "confiance-eeat"
    if any(k in f for k in ["tesla","tech","innovation","tendance","entrepreneurs"]): return "tech-innovation"
    return "hub-cross-reseau"

def network_footer():
    lines = ["---", "", "## Notre Réseau IA — Ressources Complémentaires", ""]
    links = {
        "🤖 [agents-ia.pro](https://agents-ia.pro)": "Agents IA autonomes & IA agentique",
        "💬 [agentic-whatsup.com](https://agentic-whatsup.com)": "Agents WhatsApp IA & marketing conversationnel",
        "🎙️ [vocalis.pro](https://vocalis.pro)": "Agent vocal IA & automatisation des appels",
        "🔊 [vocalis-ai.org](https://vocalis-ai.org)": "Plateforme IA vocale & assistant vocal professionnel",
        "🎯 [lead-gene.com](https://lead-gene.com)": "Génération de leads par intelligence artificielle",
        "🔍 [seo-true.com](https://seo-true.com)": "SEO IA & référencement génératif",
        "📝 [vocalis.blog](https://vocalis.blog)": "Blog SEO vocal & contenu audio IA",
        "🇨🇭 [iapmesuisse.ch](https://iapmesuisse.ch)": "Marketing IA pour PME suisses",
        "✅ [trustly-ai.com](https://trustly-ai.com)": "Confiance digitale & E-E-A-T",
        "🔐 [trust-vault.com](https://trust-vault.com)": "Sécurité marketplace & protection IA",
        "📦 [master-seller.fr](https://master-seller.fr)": "Formation vente en ligne & dropshipping IA",
        "🚗 [tesla-mag.ch](https://tesla-mag.ch)": "Innovation tech & IA automobile",
        "🌸 [woman-cute.com](https://woman-cute.com)": "Beauté & lifestyle augmentés par l'IA",
    }
    for link, desc in links.items():
        lines.append(f"- {link} — *{desc}*")
    return "\n".join(lines)

def build_mdx_fr(meta, body, fname, slug):
    cluster  = guess_cluster(meta, fname)
    category = CLUSTER_CATS.get(cluster, "Intelligence Artificielle")
    title    = meta.get("title","")
    excerpt  = meta.get("meta_description", "")[:250]
    kw       = meta.get("focus_keyword","")
    liens    = meta.get("liens_externes") or []
    read_t   = max(4, len(body.split()) // 200)
    tags     = list(dict.fromkeys([kw] + [d.replace(".com","").replace(".pro","") for d in (liens or [])]))[:6]

    # titleXX pour fallback i18n inline
    tr = TRANSLATIONS.get(slug, {})
    fm_data = {
        "title":         title,
        "slug":          slug,
        "date":          "2026-04-11",
        "author":        "AI-DUE Editorial",
        "category":      category,
        "tags":          tags,
        "geo":           {"city":"Paris","region":"Île-de-France","country":"FR","lat":48.8566,"lng":2.3522,"continent":"Europe"},
        "coverImage":    f"/images/blog/{slug}.jpg",
        "readTime":      read_t,
        "excerpt":       excerpt,
        "focus_keyword": kw,
        "schema":        {"type":"Article","datePublished":"2026-04-11","keywords":", ".join(tags[:4])},
        "year":          2026,
    }
    # Ajouter titleEN/DE/IT et excerptEN/DE/IT si traductions dispo
    for lang in ["en","de","it"]:
        ltr = tr.get(lang, {})
        if ltr.get("title"):
            fm_data[f"title{lang.upper()}"] = ltr["title"]
        if ltr.get("excerpt"):
            fm_data[f"excerpt{lang.upper()}"] = ltr["excerpt"]

    fm_str = yaml.dump(fm_data, allow_unicode=True, default_flow_style=False, sort_keys=False)
    footer = network_footer()
    return f"---\n{fm_str}---\n\n{body.rstrip()}\n\n{footer}\n"

def build_mdx_locale(body_fr, slug, lang):
    """Construit une version locale :
    - Frontmatter 100% traduit (title, excerpt, lang)
    - H1 traduit dans le corps
    - Corps FR sans le # H1 (le composant affiche post.title comme H1)
    """
    tr = TRANSLATIONS.get(slug, {}).get(lang, {})
    if not tr:
        return None

    # Supprime le H1 du corps (composant le gère déjà via post.title)
    body_no_h1 = re.sub(r"^# .+\n?", "", body_fr, count=1, flags=re.MULTILINE).lstrip()

    meta_translated = {
        "title":         tr.get("title", ""),
        "slug":          slug,
        "date":          "2026-04-11",
        "author":        "AI-DUE Editorial",
        "excerpt":       tr.get("excerpt", ""),
        "lang":          lang,
        "year":          2026,
    }

    # Footer localisé avec tous les sites
    footer_headers = {
        "en": "## Our AI Network — Complementary Resources",
        "de": "## Unser KI-Netzwerk — Ergänzende Ressourcen",
        "it": "## La Nostra Rete IA — Risorse Complementari",
    }
    footer_lines = ["---", "", footer_headers.get(lang, "## AI Network"), ""]
    network_links = {
        "en": {
            "agents-ia.pro":       ("🤖 [agents-ia.pro](https://agents-ia.pro)", "Autonomous AI Agents & Agentic AI"),
            "agentic-whatsup.com": ("💬 [agentic-whatsup.com](https://agentic-whatsup.com)", "WhatsApp AI Agents & conversational marketing"),
            "vocalis.pro":         ("🎙️ [vocalis.pro](https://vocalis.pro)", "Vocal AI Agent & call automation"),
            "vocalis-ai.org":      ("🔊 [vocalis-ai.org](https://vocalis-ai.org)", "Professional AI vocal platform"),
            "lead-gene.com":       ("🎯 [lead-gene.com](https://lead-gene.com)", "AI lead generation"),
            "seo-true.com":        ("🔍 [seo-true.com](https://seo-true.com)", "AI SEO & generative search ranking"),
            "vocalis.blog":        ("📝 [vocalis.blog](https://vocalis.blog)", "Voice SEO blog & AI audio content"),
            "iapmesuisse.ch":      ("🇨🇭 [iapmesuisse.ch](https://iapmesuisse.ch)", "AI marketing for Swiss SMEs"),
            "trustly-ai.com":      ("✅ [trustly-ai.com](https://trustly-ai.com)", "Digital trust & E-E-A-T"),
            "trust-vault.com":     ("🔐 [trust-vault.com](https://trust-vault.com)", "Marketplace security & AI protection"),
            "master-seller.fr":    ("📦 [master-seller.fr](https://master-seller.fr)", "Online selling training & AI dropshipping"),
            "tesla-mag.ch":        ("🚗 [tesla-mag.ch](https://tesla-mag.ch)", "Tech innovation & automotive AI"),
            "woman-cute.com":      ("🌸 [woman-cute.com](https://woman-cute.com)", "Beauty & lifestyle powered by AI"),
        },
        "de": {
            "agents-ia.pro":       ("🤖 [agents-ia.pro](https://agents-ia.pro)", "Autonome KI-Agenten & agentische KI"),
            "agentic-whatsup.com": ("💬 [agentic-whatsup.com](https://agentic-whatsup.com)", "WhatsApp-KI-Agenten & Konversationsmarketing"),
            "vocalis.pro":         ("🎙️ [vocalis.pro](https://vocalis.pro)", "Sprach-KI-Agent & Anrufautomatisierung"),
            "vocalis-ai.org":      ("🔊 [vocalis-ai.org](https://vocalis-ai.org)", "Professionelle KI-Sprachplattform"),
            "lead-gene.com":       ("🎯 [lead-gene.com](https://lead-gene.com)", "KI-Lead-Generierung"),
            "seo-true.com":        ("🔍 [seo-true.com](https://seo-true.com)", "KI-SEO & generatives Suchmaschinenranking"),
            "vocalis.blog":        ("📝 [vocalis.blog](https://vocalis.blog)", "Voice-SEO-Blog & KI-Audioinhalte"),
            "iapmesuisse.ch":      ("🇨🇭 [iapmesuisse.ch](https://iapmesuisse.ch)", "KI-Marketing für Schweizer KMU"),
            "trustly-ai.com":      ("✅ [trustly-ai.com](https://trustly-ai.com)", "Digitales Vertrauen & E-E-A-T"),
            "trust-vault.com":     ("🔐 [trust-vault.com](https://trust-vault.com)", "Marketplace-Sicherheit & KI-Schutz"),
            "master-seller.fr":    ("📦 [master-seller.fr](https://master-seller.fr)", "Online-Verkaufstraining & KI-Dropshipping"),
            "tesla-mag.ch":        ("🚗 [tesla-mag.ch](https://tesla-mag.ch)", "Tech-Innovation & Automobil-KI"),
            "woman-cute.com":      ("🌸 [woman-cute.com](https://woman-cute.com)", "Beauty & Lifestyle mit KI"),
        },
        "it": {
            "agents-ia.pro":       ("🤖 [agents-ia.pro](https://agents-ia.pro)", "Agenti IA autonomi & IA agentica"),
            "agentic-whatsup.com": ("💬 [agentic-whatsup.com](https://agentic-whatsup.com)", "Agenti IA WhatsApp & marketing conversazionale"),
            "vocalis.pro":         ("🎙️ [vocalis.pro](https://vocalis.pro)", "Agente vocale IA & automazione chiamate"),
            "vocalis-ai.org":      ("🔊 [vocalis-ai.org](https://vocalis-ai.org)", "Piattaforma vocale IA professionale"),
            "lead-gene.com":       ("🎯 [lead-gene.com](https://lead-gene.com)", "Generazione lead con IA"),
            "seo-true.com":        ("🔍 [seo-true.com](https://seo-true.com)", "SEO IA & posizionamento generativo"),
            "vocalis.blog":        ("📝 [vocalis.blog](https://vocalis.blog)", "Blog SEO vocale & contenuto audio IA"),
            "iapmesuisse.ch":      ("🇨🇭 [iapmesuisse.ch](https://iapmesuisse.ch)", "Marketing IA per PMI svizzere"),
            "trustly-ai.com":      ("✅ [trustly-ai.com](https://trustly-ai.com)", "Fiducia digitale & E-E-A-T"),
            "trust-vault.com":     ("🔐 [trust-vault.com](https://trust-vault.com)", "Sicurezza marketplace & protezione IA"),
            "master-seller.fr":    ("📦 [master-seller.fr](https://master-seller.fr)", "Formazione vendita online & dropshipping IA"),
            "tesla-mag.ch":        ("🚗 [tesla-mag.ch](https://tesla-mag.ch)", "Innovazione tech & IA automobilistica"),
            "woman-cute.com":      ("🌸 [woman-cute.com](https://woman-cute.com)", "Bellezza & lifestyle con l'IA"),
        },
    }
    lang_links = network_links.get(lang, network_links["en"])
    for domain, (link_md, desc) in lang_links.items():
        footer_lines.append(f"- {link_md} — *{desc}*")

    fm_str = yaml.dump(meta_translated, allow_unicode=True, default_flow_style=False, sort_keys=False)
    footer = "\n".join(footer_lines)
    return f"---\n{fm_str}---\n\n{body_no_h1.rstrip()}\n\n{footer}\n"


def main():
    articles = sorted(SRC.glob("article-*.md"))
    print(f"📚 {len(articles)} articles trouvés\n")

    created = 0
    for i, fp in enumerate(articles, 1):
        raw = fp.read_text(encoding="utf-8")
        meta, body = parse_fm(raw)
        slug = (meta.get("slug","") or "").strip("/") or re.sub(r"^article-\d+-","", fp.stem)
        out_name = slug + ".mdx"

        # ── FR ──────────────────────────────────────────────────────
        fr_path = BLOG / out_name
        mdx_fr = build_mdx_fr(meta, body, fp.name, slug)
        fr_path.write_text(mdx_fr, encoding="utf-8")
        print(f"[{i:02d}] ✅ FR  → {out_name}")

        # ── EN / DE / IT ─────────────────────────────────────────────
        for lang in ["en","de","it"]:
            lpath = BLOG / lang / out_name
            result = build_mdx_locale(body, slug, lang)
            if result:
                lpath.write_text(result, encoding="utf-8")
                print(f"      ✅ {lang.upper()} → {lang}/{out_name}")
            else:
                print(f"      ⚠  {lang.upper()} — pas de traduction pour {slug}")

        created += 1
        print()

    print("=" * 60)
    print(f"✅ {created} articles × 4 langues injectés dans hub-ai/content/blog/")
    print("🚀 Lance : vercel --prod  dans C:/Users/cohen.000/hub-ai/")

if __name__ == "__main__":
    main()
