import HomeHero from "../components/home/HomeHero"
import Franja from "../components/home/Franja"
import ViajeConsulta from "../components/home/ViajeConsulta"
import SelectorIndustrias from "../components/home/SelectorIndustrias"
import Transformacion from "../components/home/Transformacion"
import Proceso from "../components/home/Proceso"
import DemoSeccion from "../components/home/DemoSeccion"
import Confianza from "../components/home/Confianza"
import PrecioIntro from "../components/home/PrecioIntro"
import FaqBreve from "../components/home/FaqBreve"
import CtaFinal from "../components/home/CtaFinal"

export default function Home() {
  return (
    <main className="bg-gradient-page text-ink-primary">
      <HomeHero />
      <Franja />
      <ViajeConsulta />
      <SelectorIndustrias />
      <Transformacion />
      <Proceso />
      <DemoSeccion />
      <Confianza />
      <PrecioIntro />
      <FaqBreve />
      <CtaFinal />
    </main>
  )
}
