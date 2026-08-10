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
    <section aria-label="Lo que ordena el sistema" className="border-y border-outline bg-surface py-4">
      <div className="fx-marquee">
        <div className="fx-marquee-track">
          {fila.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex shrink-0 items-center gap-6 pr-6 font-mono text-micro uppercase tracking-[0.14em] text-ink-muted"
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
