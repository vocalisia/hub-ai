import NetworkGraph from '@/components/NetworkGraph'
import HeroSection from '@/components/HeroSection'
import ArchitectureSchema from '@/components/ArchitectureSchema'
import NeuralFeatures from '@/components/NeuralFeatures'
import BlogPreview from '@/components/BlogPreview'
import GeoSection from '@/components/GeoSection'

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#030014]">
      <HeroSection />
      <ArchitectureSchema />
      <NeuralFeatures />
      <NetworkGraph />
      <GeoSection />
      <BlogPreview />
    </main>
  )
}
