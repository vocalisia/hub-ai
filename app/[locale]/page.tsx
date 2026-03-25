import NetworkGraph from '@/components/NetworkGraph'
import HeroSection from '@/components/HeroSection'
import BlogPreview from '@/components/BlogPreview'
import GeoSection from '@/components/GeoSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A1A]">
      <HeroSection />
      <NetworkGraph />
      <GeoSection />
      <BlogPreview />
    </main>
  )
}
