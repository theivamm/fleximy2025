import Hero from "../components/hero/Hero"
import Servicios from "../components/home/Servicios"
import QuienesSomos from "../components/home/QuienesSomos"
import PorQue from "../components/home/PorQue"
import CtaFinal from "../components/home/CtaFinal"

export default function Home() {
  return (
    <main className="text-text-1">
      <Hero />
      <Servicios />
      <QuienesSomos />
      <PorQue />
      <CtaFinal />
    </main>
  )
}
