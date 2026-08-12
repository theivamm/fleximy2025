import SectionIntro from "../ui/SectionIntro"
import IndustryPreview from "../ui/IndustryPreview"

export default function IndustriesSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Industrias"
        title={<>Aplicado a tu rubro</>}
        lead="Cada industria tiene un problema distinto. Elegí la tuya y mirá qué producto posible resolvería su operación."
      />
      <div className="mt-14">
        <IndustryPreview />
      </div>
    </section>
  )
}
