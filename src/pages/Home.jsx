import Hero from "../components/hero/Hero"
import ProductGallery from "../components/home/ProductGallery/ProductGallery"
import AccessiblePlatform from "../components/home/AccessiblePlatform"
import ModuleThreeProcess from "../components/home/ModuleThreeProcess/ModuleThreeProcess"
import IndustryRibbon from "../components/home/IndustryRibbon/IndustryRibbon"
import ContactSection from "../components/home/ContactSection/ContactSection"
import FAQ from "../components/home/FAQ/FAQ"

export default function Home() {
  return (
    <main className="text-text-1">
      <Hero />
      <ProductGallery />
      <AccessiblePlatform />
      <ModuleThreeProcess />
      <IndustryRibbon />
      <ContactSection />
      <FAQ />
    </main>
  )
}
