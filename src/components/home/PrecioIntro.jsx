import Button from "../ui/Button"

const PUNTOS = [
  {
    titulo: "Diagnóstico gratuito",
    detalle: "Una conversación de 30 minutos para ver si Fleximy te sirve.",
  },
  {
    titulo: "Alcance definido",
    detalle: "Sabés qué incluye tu plan antes de empezar, sin sorpresas.",
  },
  {
    titulo: "Una cuota mensual",
    detalle: "Todo incluido: web, panel, mantenimiento y soporte.",
  },
  {
    titulo: "Sin permanencia",
    detalle: "Podés seguir solo si te sirve, y dejar cuando quieras.",
  },
]

export default function PrecioIntro() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card)*1.5)] border border-outline bg-gradient-surface px-8 py-12 shadow-[var(--shadow-lift)] lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-soft/50 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="kicker">Precios</p>
              <h2 className="mt-4 text-h1">
                Una base clara y un alcance definido{" "}
                <span className="text-primary">antes de comenzar</span>
              </h2>
              <p className="mt-4 max-w-[40ch] text-lead text-ink-secondary">
                Sabés qué se va a hacer y cuánto sale antes de empezar. Sin cargos ocultos ni
                permanencia.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/precios" size="lg">
                  Ver precios y planes
                </Button>
                <Button to="/contacto" variant="secondary" size="lg">
                  Solicitar diagnóstico gratuito
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PUNTOS.map((p) => (
                <div
                  key={p.titulo}
                  className="rounded-2xl border border-outline bg-bg-secondary/60 p-5 transition-transform duration-[var(--motion-base)] hover:-translate-y-0.5"
                >
                  <h3 className="text-h4 text-ink-primary">{p.titulo}</h3>
                  <p className="mt-2 text-small text-ink-secondary">{p.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
