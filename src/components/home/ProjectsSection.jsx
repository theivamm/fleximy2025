import { Link } from "react-router-dom"
import SectionIntro from "../ui/SectionIntro"
import { DEMOS } from "../../data/demos"

export default function ProjectsSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Demos y proyectos"
        title={<>Interactuá con lo que hacemos</>}
        lead="Estas son demos interactivas y conceptos de producto, no casos de clientes reales. Probalas y mirá cómo cambia cada estado."
      />

      <div className="container-site mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d, i) => (
          <Link
            key={d.id}
            to="/demos"
            data-track={`demo_home_${d.id}`}
            className={`group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-outline bg-surface-1 p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-outline-strong hover:shadow-[var(--shadow-md)] ${
              i % 3 === 1 ? "lg:translate-y-6" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-3">
                {String(i + 1).padStart(2, "0")} · {d.rubro}
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wider" style={{ backgroundColor: "var(--success-soft)", color: "var(--success)" }}>
                <span className="size-1 rounded-full bg-current" />
                Demo
              </span>
            </div>
            <p className="text-[15px] font-medium leading-relaxed text-text-1">{d.descripcion}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Probar demo
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}

        <Link
          to="/contacto"
          data-track="proyecto_idea"
          className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 text-white shadow-[var(--shadow-md)] transition-transform duration-300 hover:-translate-y-1"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider opacity-80">Tu proyecto</span>
          <p className="text-xl font-bold leading-snug">¿Tenés una idea en mente? Contanos y la convertimos en la próxima demo.</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            Contanos tu idea
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
