import SwarmHero from '@/components/SwarmHero'
import SwarmPress from '@/components/SwarmPress'
import SwarmBento from '@/components/SwarmBento'
import SwarmResults from '@/components/SwarmResults'
import SwarmShowcase from '@/components/SwarmShowcase'
import SwarmWorkflow from '@/components/SwarmWorkflow'
import SwarmTestimonials from '@/components/SwarmTestimonials'
import SwarmCTA from '@/components/SwarmCTA'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI-Due?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due is a public opinion simulation engine powered by AI Swarm technology. It lets strategy teams upload any document and run synchronized simulations across social media and prediction markets in under 5 minutes, using a digital twin of public opinion."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI opinion simulation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due deploys 250 AI agents with distinct personas, running 12 simulation rounds across 3 platforms simultaneously. Each agent reacts to your scenario based on demographic, psychographic and behavioral profiles, producing a ReACT report with cited agent statements and a synthetic prediction market outcome."
      }
    },
    {
      "@type": "Question",
      "name": "What decisions can I stress-test with AI-Due?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-Due is used for product launch impact analysis, financial announcement sentiment testing, regulatory proposal modeling, crisis communications strategy, and multi-channel campaign optimization. It achieves 86% accuracy vs human analyst panels."
      }
    }
  ]
}

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://ai-due.com/#software",
  "name": "AI-Due Simulation Engine",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://ai-due.com",
  "description": "AI Swarm public opinion simulation engine — stress-test decisions before they happen with 250 AI agents and synthetic prediction markets.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://ai-due.com/#organization"
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([FAQ_SCHEMA, SOFTWARE_SCHEMA]) }}
      />
      <main className="min-h-screen bg-[#0a0f2e]">
        <SwarmHero />
        <SwarmPress />
        <SwarmBento />
        <SwarmResults />
        <SwarmShowcase />
        <SwarmWorkflow />
        <SwarmTestimonials />
        <SwarmCTA />
      </main>
    </>
  )
}
