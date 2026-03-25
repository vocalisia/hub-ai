import NetworkGraph from '@/components/NetworkGraph'
import HeroSection from '@/components/HeroSection'
import BlogPreview from '@/components/BlogPreview'
import GeoSection from '@/components/GeoSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030014]">
      <HeroSection />
      <NetworkGraph />
      <GeoSection />
      <BlogPreview />
      <Footer />
    </main>
  )
}
