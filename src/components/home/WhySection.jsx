import SectionIntro from "../ui/SectionIntro"
import ReactiveBackground from "../ui/ReactiveBackground"

const POINTS = [
  { n: "01", t: "Diseño y desarrollo integrados", d: "Un solo equipo para que la idea llegue entera hasta el producto." },
  { n: "02", t: "Producto adaptado", d: "Nada de plantillas: cada sistema se construye para tu operación." },
  { n: "03", t: "Acompañamiento real", d: "Estamos cerca durante todo el proyecto, no solo al inicio." },
  { n: "04", t: "Escalabilidad", d: "Tu producto crece sin cambiar de tecnología ni empezar de cero." },
  { n: "05", t: "Soporte", d: "Seguimos cuidando el sistema después del lanzamiento." },
  { n: "06", t: "Iteración constante", d: "Medimos resultados y mejoramos en ciclos cortos." },
  { n: "07", t: "Visión comercial", d: "Diseñamos para que el producto venda, no solo para que se vea bien." },
  { n: "08", t: "Atención humana", d: "Personas que entienden tu negocio y te responden claro." },
]

export default function WhySection() {
  return (
    <section className="py-20 sm:py-28">
      <ReactiveBackground className="container-site">
        <div className="overflow-hidden rounded-3xl border border-outline" style={{ backgroundImage: "var(--background-image-surface)" }}>
          <div className="p-8 sm:p-12">
            <SectionIntro
              kicker="Por qué Fleximy"
              title={<>Una agencia con cabeza de producto</>}
              lead="No vendemos un entregable: construimos una relación de trabajo en la que tu negocio gana."
              align="left"
            />
          </div>

          <div className="grid gap-px bg-outline/40 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((p) => (
              <div key={p.n} className="group bg-surface-1/90 p-7 transition-colors duration-300 hover:bg-surface-elevated/90">
                <span className="font-mono text-xs text-primary">{p.n}</span>
                <h3 className="mt-3 text-base font-bold text-text-1">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </ReactiveBackground>
    </section>
  )
}
