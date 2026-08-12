import HeroSection from "../components/home/HeroSection"
import CapabilitiesMarquee from "../components/home/CapabilitiesMarquee"
import ManifestoSection from "../components/home/ManifestoSection"
import CapabilitiesSection from "../components/home/CapabilitiesSection"
import LabSection from "../components/home/LabSection"
import PlaygroundSection from "../components/home/PlaygroundSection"
import ProcessSection from "../components/home/ProcessSection"
import IndustriesSection from "../components/home/IndustriesSection"
import TransformationSection from "../components/home/TransformationSection"
import ProjectsSection from "../components/home/ProjectsSection"
import WhySection from "../components/home/WhySection"
import FinalCtaSection from "../components/home/FinalCtaSection"

export default function Home() {
  return (
    <main className="text-text-1">
      <HeroSection />
      <CapabilitiesMarquee />
      <ManifestoSection />
      <CapabilitiesSection />
      <LabSection />
      <PlaygroundSection />
      <ProcessSection />
      <IndustriesSection />
      <TransformationSection />
      <ProjectsSection />
      <WhySection />
      <FinalCtaSection />
    </main>
  )
}
