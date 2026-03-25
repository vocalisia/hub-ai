export const SITES = [
  {
    id: 'hub',
    name: 'Hub AI',
    url: 'https://sebastien-ia.com',
    description: {
      fr: 'Hub central de l\'ecosysteme IA',
      en: 'Central hub of the AI ecosystem',
      de: 'Zentraler Hub des KI-Okosystems',
      it: 'Hub centrale dell\'ecosistema IA'
    },
    category: 'hub',
    color: '#8B5CF6',
    position: { x: 500, y: 300 },
    geo: { lat: 46.2044, lng: 6.1432, city: 'Geneve', country: 'CH' },
    topics: ['IA', 'automatisation', 'ecosysteme', 'Suisse']
  },
  {
    id: 'automation-saas',
    name: 'AI Automation SaaS',
    url: 'https://aiautomationsaas.com',
    description: {
      fr: 'Solutions SaaS d\'automatisation IA',
      en: 'AI automation SaaS solutions',
      de: 'KI-Automatisierungs-SaaS-Losungen',
      it: 'Soluzioni SaaS automazione IA'
    },
    category: 'saas',
    color: '#06B6D4',
    position: { x: 200, y: 150 },
    geo: { lat: 46.5197, lng: 6.6323, city: 'Lausanne', country: 'CH' },
    topics: ['SaaS', 'automatisation', 'IA', 'business']
  },
  {
    id: 'ia-pme',
    name: 'IA PME Suisse',
    url: 'https://iapmesuisse.ch',
    description: {
      fr: 'IA adaptee aux PME suisses',
      en: 'AI adapted for Swiss SMEs',
      de: 'KI fur Schweizer KMU',
      it: 'IA per PMI svizzere'
    },
    category: 'pme',
    color: '#10B981',
    position: { x: 750, y: 180 },
    geo: { lat: 47.3769, lng: 8.5417, city: 'Zurich', country: 'CH' },
    topics: ['PME', 'Suisse', 'IA', 'transformation digitale']
  },
  {
    id: 'ia-canada',
    name: 'IA Canada Hub',
    url: 'https://sebastien-ia.com/en/canada',
    description: {
      fr: 'Ecosysteme IA canadien',
      en: 'Canadian AI ecosystem',
      de: 'Kanadisches KI-Okosystem',
      it: 'Ecosistema IA canadese'
    },
    category: 'geo',
    color: '#F59E0B',
    position: { x: 150, y: 420 },
    geo: { lat: 45.5017, lng: -73.5673, city: 'Montreal', country: 'CA' },
    topics: ['Canada', 'IA', 'Montreal', 'startups']
  },
  {
    id: 'ia-usa',
    name: 'IA USA Network',
    url: 'https://sebastien-ia.com/en/usa',
    description: {
      fr: 'Reseau IA americain',
      en: 'American AI network',
      de: 'Amerikanisches KI-Netzwerk',
      it: 'Rete IA americana'
    },
    category: 'geo',
    color: '#EF4444',
    position: { x: 300, y: 480 },
    geo: { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'US' },
    topics: ['USA', 'Silicon Valley', 'IA', 'innovation']
  },
  {
    id: 'ia-europe',
    name: 'IA Europe Network',
    url: 'https://sebastien-ia.com/fr/europe',
    description: {
      fr: 'Reseau IA europeen',
      en: 'European AI network',
      de: 'Europaisches KI-Netzwerk',
      it: 'Rete IA europea'
    },
    category: 'geo',
    color: '#6366F1',
    position: { x: 700, y: 420 },
    geo: { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'FR' },
    topics: ['Europe', 'IA', 'reglementation', 'innovation']
  }
]

export const GEO_MARKERS = [
  // SUISSE
  { id: 'geneve', lat: 46.2044, lng: 6.1432, city: 'Geneve', country: 'Suisse', flag: '🇨🇭', sites: ['hub'] },
  { id: 'zurich', lat: 47.3769, lng: 8.5417, city: 'Zurich', country: 'Suisse', flag: '🇨🇭', sites: ['ia-pme'] },
  { id: 'lausanne', lat: 46.5197, lng: 6.6323, city: 'Lausanne', country: 'Suisse', flag: '🇨🇭', sites: ['automation-saas'] },
  { id: 'bern', lat: 46.9480, lng: 7.4474, city: 'Bern', country: 'Suisse', flag: '🇨🇭', sites: [] },
  // EUROPE
  { id: 'paris', lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', flag: '🇫🇷', sites: ['ia-europe'] },
  { id: 'berlin', lat: 52.5200, lng: 13.4050, city: 'Berlin', country: 'Allemagne', flag: '🇩🇪', sites: [] },
  { id: 'london', lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK', flag: '🇬🇧', sites: [] },
  { id: 'amsterdam', lat: 52.3676, lng: 4.9041, city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', sites: [] },
  { id: 'stockholm', lat: 59.3293, lng: 18.0686, city: 'Stockholm', country: 'Sweden', flag: '🇸🇪', sites: [] },
  // CANADA
  { id: 'montreal', lat: 45.5017, lng: -73.5673, city: 'Montreal', country: 'Canada', flag: '🇨🇦', sites: ['ia-canada'] },
  { id: 'toronto', lat: 43.6532, lng: -79.3832, city: 'Toronto', country: 'Canada', flag: '🇨🇦', sites: [] },
  { id: 'vancouver', lat: 49.2827, lng: -123.1207, city: 'Vancouver', country: 'Canada', flag: '🇨🇦', sites: [] },
  // USA
  { id: 'sf', lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'USA', flag: '🇺🇸', sites: ['ia-usa'] },
  { id: 'nyc', lat: 40.7128, lng: -74.0060, city: 'New York', country: 'USA', flag: '🇺🇸', sites: [] },
  { id: 'boston', lat: 42.3601, lng: -71.0589, city: 'Boston', country: 'USA', flag: '🇺🇸', sites: [] },
  { id: 'seattle', lat: 47.6062, lng: -122.3321, city: 'Seattle', country: 'USA', flag: '🇺🇸', sites: [] }
]
