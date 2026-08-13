import SectionIntro from "../ui/SectionIntro"
import IndustryLab from "./lab/IndustryLab"

export default function LabSection() {
  return (
    <section className="py-16 sm:py-20">
      <SectionIntro
        kicker="Laboratorio Fleximy"
        title={<>Ocho industrias. Ocho productos diseñados desde cero.</>}
        lead="Café Nómada, Distrito, Habitat, Áurea, Nexo, MotorLab, Ruta y Pulso: la misma idea de producto aplicada a rubros reales. Elegí una muestra, mirá el recorrido automático o entrá en modo demo para navegarla con tu cursor."
      />
      <div className="mt-10">
        <IndustryLab />
      </div>
    </section>
  )
}
