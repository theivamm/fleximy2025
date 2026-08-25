import Hero from "../components/hero/Hero"
import ConnectedBusinessStory from "../components/home/ConnectedBusinessStory/ConnectedBusinessStory"
import ModuleThreeProcess from "../components/home/ModuleThreeProcess/ModuleThreeProcess"
import Servicios from "../components/home/Servicios"
import QuienesSomos from "../components/home/QuienesSomos"
import PorQue from "../components/home/PorQue"
import CtaFinal from "../components/home/CtaFinal"

export default function Home() {
  return (
    <main className="text-text-1">
      <Hero />
      <ConnectedBusinessStory />
      <ModuleThreeProcess />
      <Servicios />
      <QuienesSomos />
      <PorQue />
      <CtaFinal />
    </main>
  )
}
