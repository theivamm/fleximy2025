import SectionIntro from "../ui/SectionIntro"
import InterfaceLab from "../ui/InterfaceLab"

export default function LabSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Laboratorio Fleximy"
        title={<>Una idea, seis productos distintos</>}
        lead="Elegí una muestra y mirá cómo cambia el producto completo: layout, colores, datos y acciones. Los controles están junto a la interfaz que modifican."
      />
      <div className="mt-12">
        <InterfaceLab />
      </div>
    </section>
  )
}
