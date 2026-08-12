import SectionIntro from "../ui/SectionIntro"
import TransformationDemo from "../ui/TransformationDemo"

export default function TransformationSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Transformaciones"
        title={<>Todo puede convertirse en una app</>}
        lead="Los procesos manuales de hoy pueden ser sistemas claros mañana. Estas son las transformaciones más comunes."
      />
      <div className="mt-14">
        <TransformationDemo />
      </div>
    </section>
  )
}
