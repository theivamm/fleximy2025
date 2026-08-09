const BENEFICIOS = [
  "Menos tareas manuales",
  "Consultas que no se pierden",
  "Una web que trabaja por vos",
  "Historial por cliente",
  "Un solo lugar para operar",
]

export default function Franja() {
  return (
    <section className="bg-ink text-text-invert">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-[34ch] text-h3">
            Si hoy tu negocio depende de{" "}
            <span className="text-cyan">WhatsApp, Excel y tareas manuales</span>, Fleximy puede
            ayudarte.
          </h2>
          <ul className="grid gap-2.5 lg:max-w-sm">
            {BENEFICIOS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-small text-text-invert/80">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
