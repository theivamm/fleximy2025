import SectionIntro from "../ui/SectionIntro"
import IndustryLab from "./lab/IndustryLab"

export default function LabSection() {
  return (
    <section className="py-16 sm:py-20">
      <SectionIntro
        kicker="Laboratorio Fleximy"
        title={<>Ocho industrias. Ocho formas de convertir una idea en producto.</>}
        lead="Explorá conceptos creados para distintos negocios. Probá sus recorridos principales y descubrí cómo una aplicación puede conectar clientes, equipos y operaciones."
      />
      <div className="mt-10">
        <IndustryLab />
      </div>
    </section>
  )
}
