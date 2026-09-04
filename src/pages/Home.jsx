import Hero from "../components/hero/Hero"
import Module02 from "../components/home/Module02/Module02"
import AccessiblePlatform from "../components/home/AccessiblePlatform"
import ModuleThreeProcess from "../components/home/ModuleThreeProcess/ModuleThreeProcess"
import IndustryRibbon from "../components/home/IndustryRibbon/IndustryRibbon"
import FAQ from "../components/home/FAQ/FAQ"

export default function Home() {
  return (
    <main className="text-text-1">
      <Hero />
      <Module02 />
      <AccessiblePlatform />
      <ModuleThreeProcess />
      <IndustryRibbon />
      <FAQ />
    </main>
  )
}
