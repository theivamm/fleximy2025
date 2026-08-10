const TERMINOS = [
  "consultas",
  "turnos",
  "pedidos",
  "stock",
  "presupuestos",
  "clientes",
  "seguimiento",
  "recordatorios",
  "propiedades",
  "inscripciones",
  "órdenes de trabajo",
  "reservas",
]

export default function Franja() {
  const fila = [...TERMINOS, ...TERMINOS]
  return (
    <section
      aria-label="Lo que ordena el sistema"
      className="relative border-y border-outline bg-gradient-primary-soft py-3.5"
    >
      <div className="container-site mb-3 flex items-center justify-between">
        <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink-muted">
          lo que ordena el sistema
        </span>
        <span className="hidden font-mono text-micro text-ink-muted sm:block">
          en tiempo real · datos ilustrativos
        </span>
      </div>
      <div className="fx-marquee">
        <div className="fx-marquee-track">
          {fila.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex shrink-0 items-center gap-6 pr-6 font-mono text-micro uppercase tracking-[0.14em] text-ink-secondary"
            >
              {t}
              <span aria-hidden="true" className="size-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
