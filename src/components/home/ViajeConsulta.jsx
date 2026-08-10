const PASOS = [
  {
    n: "01",
    titulo: "La consulta entra",
    desc: "Cada mensaje de tu web —formulario, turno, pedido, WhatsApp— aterriza en un solo lugar: tu panel.",
    visual: "mensaje",
  },
  {
    n: "02",
    titulo: "Se estructura sola",
    desc: "Sin pasar en limpio ni tipear dos veces. Se clasifica, se etiqueta y se ordena por urgencia automáticamente.",
    visual: "clasifica",
  },
  {
    n: "03",
    titulo: "Se gestiona con estado",
    desc: "Turnos, pedidos o proyectos avanzan con estado y responsable visible. Tu equipo sabe qué hacer con cada caso.",
    visual: "kanban",
  },
  {
    n: "04",
    titulo: "Se convierte en resultado",
    desc: "Lo que se cierra se registra como dato: citas, ventas, clientes recurrentes. Y eso alimenta tus próximas decisiones.",
    visual: "metricas",
  },
]

function VisualMensaje() {
  return (
    <div className="grid gap-2.5">
      {[
        { t: "¿Tienen mesas libres mañana a las 19?", s: "2 min" },
        { t: "¿Hacen tortas sin TACC?", s: "10 min" },
        { t: "Quiero reservar un corte a las 15 hs", s: "24 min" },
      ].map((m) => (
        <div
          key={m.t}
          className="flex items-center gap-3 rounded-lg border border-outline bg-surface px-3.5 py-2.5 shadow-[var(--shadow-lift)]"
        >
          <span className="size-2 shrink-0 rounded-full bg-primary" />
          <p className="flex-1 truncate text-small text-ink-primary">{m.t}</p>
          <span className="font-mono text-micro text-ink-muted">{m.s}</span>
        </div>
      ))}
    </div>
  )
}

function VisualClasifica() {
  return (
    <div className="rounded-lg border border-outline bg-surface p-4 shadow-[var(--shadow-lift)]">
      <p className="truncate text-small text-ink-primary">¿Hacen tortas sin TACC?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { l: "nueva", c: "bg-primary text-white" },
          { l: "gastronomía", c: "bg-acc-gastro/15 text-acc-gastro" },
          { l: "consulta", c: "bg-bg-secondary text-ink-secondary" },
          { l: "se responde hoy", c: "bg-secondary-soft text-secondary-deep" },
        ].map((x) => (
          <span
            key={x.l}
            className={`rounded-full px-2.5 py-1 font-mono text-micro ${x.c}`}
          >
            {x.l}
          </span>
        ))}
      </div>
    </div>
  )
}

function VisualKanban() {
  const cols = [
    { t: "Nuevas", items: 2, dot: "bg-primary" },
    { t: "En proceso", items: 2, dot: "bg-secondary" },
    { t: "Cerradas", items: 2, dot: "bg-success" },
  ]
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {cols.map((c) => (
        <div key={c.t} className="rounded-lg border border-outline bg-bg-secondary p-2.5">
          <div className="flex items-center justify-between">
            <span className={`size-1.5 rounded-full ${c.dot}`} />
            <span className="font-mono text-micro text-ink-muted">{c.t}</span>
          </div>
          <div className="mt-2 grid gap-1.5">
            {Array.from({ length: c.items }).map((_, i) => (
              <span key={i} className="block h-6 rounded bg-surface shadow-[var(--shadow-lift)]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualMetricas() {
  const stats = [
    { n: "12", l: "citas confirmadas" },
    { n: "8", l: "pedidos cerrados" },
    { n: "96%", l: "respondidas en 24 h" },
  ]
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {stats.map((s) => (
        <div key={s.l} className="rounded-lg border border-outline bg-surface p-3 text-center shadow-[var(--shadow-lift)]">
          <p className="font-display text-2xl font-semibold text-ink-primary">{s.n}</p>
          <p className="mt-1 font-mono text-micro text-ink-muted">{s.l}</p>
        </div>
      ))}
    </div>
  )
}

export default function ViajeConsulta() {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">El sistema en acción</p>
            <h2 className="mt-5 text-h1">
              Una consulta entra, <span className="text-primary">un sistema</span> la ordena.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead text-ink-secondary">
              Desde que alguien te escribe hasta que el caso se cierra, todo pasa por un mismo
              flujo. Vos lo ves completo desde el panel.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-micro text-ink-muted">
              <span className="size-2 animate-pulse rounded-full bg-secondary" />
              flujo continuo · en tiempo real
            </div>
          </div>

          <ol className="grid gap-4">
            {PASOS.map((paso) => (
              <li
                key={paso.n}
                className="group grid gap-6 rounded-2xl border border-outline bg-surface p-6 shadow-[var(--shadow-lift)] md:grid-cols-[auto_1fr] md:gap-8 md:p-8"
              >
                <span className="font-display text-5xl font-semibold tracking-tight text-ink-muted/40 transition-colors duration-[var(--motion-base)] group-hover:text-primary md:text-6xl">
                  {paso.n}
                </span>
                <div>
                  <h3 className="text-h3 text-ink-primary">{paso.titulo}</h3>
                  <p className="mt-3 max-w-[52ch] text-body text-ink-secondary">{paso.desc}</p>
                  <div className="mt-6">
                    {paso.visual === "mensaje" && <VisualMensaje />}
                    {paso.visual === "clasifica" && <VisualClasifica />}
                    {paso.visual === "kanban" && <VisualKanban />}
                    {paso.visual === "metricas" && <VisualMetricas />}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
