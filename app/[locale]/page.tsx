import SwarmHero from '@/components/SwarmHero'
import SwarmPress from '@/components/SwarmPress'
import SwarmBento from '@/components/SwarmBento'
import SwarmResults from '@/components/SwarmResults'
import SwarmShowcase from '@/components/SwarmShowcase'
import SwarmWorkflow from '@/components/SwarmWorkflow'
import SwarmTestimonials from '@/components/SwarmTestimonials'
import SwarmCTA from '@/components/SwarmCTA'

export default function HomePage() {
  return (
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
  )
}
