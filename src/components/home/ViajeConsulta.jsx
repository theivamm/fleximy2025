import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
          className="flex items-center gap-3 rounded-lg border border-outline bg-gradient-surface px-3.5 py-2.5 shadow-[var(--shadow-lift)]"
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
    <div className="rounded-lg border border-outline bg-gradient-surface p-4 shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" />
        <p className="truncate text-small text-ink-primary">¿Hacen tortas sin TACC?</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { l: "nueva", c: "bg-primary text-white" },
          { l: "gastronomía", c: "bg-acc-gastro/15 text-acc-gastro" },
          { l: "consulta", c: "bg-bg-secondary text-ink-secondary" },
          { l: "se responde hoy", c: "bg-secondary-soft text-secondary-deep" },
        ].map((x) => (
          <span key={x.l} className={`rounded-full px-2.5 py-1 font-mono text-micro ${x.c}`}>
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
        <div key={c.t} className="rounded-lg border border-outline bg-bg-secondary/70 p-2.5">
          <div className="flex items-center justify-between">
            <span className={`size-1.5 rounded-full ${c.dot}`} />
            <span className="font-mono text-micro text-ink-muted">{c.t}</span>
          </div>
          <div className="mt-2 grid gap-1.5">
            {Array.from({ length: c.items }).map((_, i) => (
              <span
                key={i}
                className="block h-6 rounded bg-gradient-surface shadow-[var(--shadow-lift)]"
              />
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
        <div
          key={s.l}
          className="rounded-lg border border-outline bg-gradient-surface p-3 text-center shadow-[var(--shadow-lift)]"
        >
          <p className="font-display text-2xl font-semibold text-ink-primary">{s.n}</p>
          <p className="mt-1 font-mono text-micro text-ink-muted">{s.l}</p>
        </div>
      ))}
    </div>
  )
}

export default function ViajeConsulta() {
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const [activo, setActivo] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const fill = fillRef.current
      if (!fill) return
      gsap.fromTo(
        fill,
        { height: "0%" },
        {
          height: "calc(100% - 0.5rem)",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 68%",
            end: "bottom 55%",
            scrub: 0.5,
            onUpdate: (self) => setActivo(Math.min(3, Math.floor(self.progress * 4))),
          },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">El sistema en acción</p>
            <h2 className="mt-4 text-h1">
              Una consulta entra, <span className="text-primary">un sistema</span> la ordena.
            </h2>
            <p className="mt-4 max-w-[46ch] text-lead text-ink-secondary">
              Desde que alguien te escribe hasta que el caso se cierra, todo pasa por un mismo
              flujo. Vos lo ves completo desde el panel.
            </p>

            {/* Rail de progreso del viaje */}
            <div className="mt-8 hidden lg:flex gap-6">
              <ol className="relative flex flex-col justify-between self-stretch py-1" aria-hidden="true">
                <span className="absolute left-[4px] top-1 bottom-1 w-px rounded-full bg-outline" />
                <span
                  ref={fillRef}
                  className="absolute left-[4px] top-1 h-0 w-px bg-gradient-to-b from-primary to-secondary shadow-[0_0_8px_rgba(79,94,232,0.6)]"
                />
                {PASOS.map((_, i) => (
                  <li key={i} className="flex items-center py-0.5">
                    <span
                      className={`block size-2.5 rounded-full transition-all duration-[var(--motion-fast)] ${
                        activo >= i
                          ? "bg-primary shadow-[0_0_0_4px_var(--color-primary-soft)]"
                          : "bg-outline-strong"
                      }`}
                    />
                  </li>
                ))}
              </ol>
              <ol className="flex flex-col justify-between py-1">
                {PASOS.map((p, i) => (
                  <li key={p.n} className="flex items-center py-0.5">
                    <span
                      className={`font-mono text-micro transition-colors duration-[var(--motion-fast)] ${
                        activo >= i ? "text-ink-primary" : "text-ink-muted"
                      }`}
                    >
                      {p.n} · {p.titulo}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol ref={trackRef} className="grid gap-4">
            {PASOS.map((paso) => (
              <li
                key={paso.n}
                className="group grid gap-5 rounded-2xl border border-outline bg-gradient-surface p-6 shadow-[var(--shadow-soft)] transition-shadow duration-[var(--motion-base)] hover:shadow-[var(--shadow-lift)] md:grid-cols-[auto_1fr] md:gap-7 md:p-7"
              >
                <span className="bg-gradient-ink-text bg-clip-text font-display text-5xl font-semibold tracking-tight text-transparent transition-all duration-[var(--motion-base)] group-hover:bg-none group-hover:text-primary md:text-6xl">
                  {paso.n}
                </span>
                <div>
                  <h3 className="text-h3 text-ink-primary">{paso.titulo}</h3>
                  <p className="mt-2 max-w-[52ch] text-body text-ink-secondary">{paso.desc}</p>
                  <div className="mt-5">
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
