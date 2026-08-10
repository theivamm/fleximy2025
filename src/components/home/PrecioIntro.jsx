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
    <section className="container-site py-24 lg:py-32">
      <div className="rounded-[calc(var(--radius-card)*1.5)] border border-outline bg-surface px-8 py-14 shadow-[var(--shadow-lift)] lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">Precios</p>
            <h2 className="mt-5 text-h1">
              Una base clara y un alcance definido <span className="text-primary">antes de comenzar</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-lead text-ink-secondary">
              Sabés qué se va a hacer y cuánto sale antes de empezar. Sin cargos ocultos ni
              permanencia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
              <div key={p.titulo} className="rounded-2xl border border-outline bg-bg-secondary p-5">
                <h3 className="text-h4 text-ink-primary">{p.titulo}</h3>
                <p className="mt-2 text-small text-ink-secondary">{p.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
