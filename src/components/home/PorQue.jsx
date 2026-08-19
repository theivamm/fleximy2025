const REASONS = [
  {
    num: "01",
    title: "Pensado para tu negocio",
    desc: "Cada proyecto parte de tus objetivos, usuarios y forma real de trabajar.",
  },
  {
    num: "02",
    title: "Un equipo de punta a punta",
    desc: "Estrategia, UX/UI y desarrollo avanzan juntos, sin perder la idea en el camino.",
  },
  {
    num: "03",
    title: "Proceso claro",
    desc: "Dividimos el proyecto en etapas concretas, con avances visibles y decisiones compartidas.",
  },
  {
    num: "04",
    title: "Preparado para crecer",
    desc: "Construimos una base sólida que puede evolucionar junto con tu negocio.",
  },
]

export default function PorQue() {
  return (
    <section id="por-que" className="section-space relative">
      <div className="container">
        <span className="kicker">Por qué Fleximy</span>
        <h2 className="h2-title mt-4 max-w-[28ch] text-text-1">
          No entregamos una plantilla. Construimos una solución.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="rounded-[var(--radius-card)] border border-outline bg-surface-1/30 p-6 transition-colors duration-300 hover:border-primary/25"
            >
              <span className="font-mono text-micro text-text-3">{r.num}</span>
              <h3 className="h3-title mt-3 text-text-1">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-2">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
