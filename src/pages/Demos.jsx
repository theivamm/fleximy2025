import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ArrowUpRight, MonitorPlay } from "lucide-react"
import Button from "../components/ui/Button"
import DemoLab from "../components/demos/DemoLab"
import { DEMOS, demoById } from "../data/demos"
import { track } from "../lib/analytics"

const ACCENTS = {
  gastronomia: "var(--color-acc-gastro)",
  turnos: "var(--color-acc-turnos)",
  gestion: "var(--color-acc-gestion)",
  comercio: "var(--color-acc-comercio)",
  inmobiliarias: "var(--color-acc-inmob)",
  educacion: "var(--color-acc-educacion)",
  talleres: "var(--color-acc-talleres)",
}

const ESTADO_BADGE = {
  disponible: { label: "Disponible", cls: "bg-accent text-on-accent" },
  guiado: { label: "Recorrido guiado", cls: "bg-cyan/15 text-cyan-deep" },
  proximamente: { label: "Próximamente", cls: "bg-dark-surface/10 text-muted" },
}

export default function Demos() {
  const root = useRef(null)
  const labRef = useRef(null)
  const [filtro, setFiltro] = useState("todas")

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".demo-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".demo-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  const abrir = (id) => {
    if (id !== "todas") track("demo_iniciada", { demo: id })
    setFiltro(id)
    requestAnimationFrame(() => labRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  return (
    <main className="bg-paper text-text">
      <section ref={root} className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="demo-fade kicker">Demos interactivas</p>
          <h1 className="mt-6 max-w-[16ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="demo-line-inner block">Probá Fleximy</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="demo-line-inner block">antes de imaginarlo.</span>
            </span>
          </h1>
          <p className="demo-fade mt-6 max-w-[52ch] text-lead text-muted">
            Recorré una experiencia realista desde la mirada de un cliente y desde el panel de quien
            gestiona el negocio.
          </p>
          <p className="demo-fade mt-4 max-w-[52ch] font-mono text-micro text-muted">
            las demos usan información ficticia y muestran configuraciones de ejemplo · la solución
            final se adapta al alcance de cada proyecto
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-12 lg:py-14">
        <div className="container-site">
          <p className="kicker">Elegí una demo</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => abrir("todas")}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                filtro === "todas" ? "bg-dark-surface text-text-invert" : "border border-line bg-paper text-muted hover:text-text"
              }`}
            >
              Todas
            </button>
            {DEMOS.map((d) => (
              <button
                key={d.id}
                onClick={() => abrir(d.id)}
                className={`rounded-full px-4 py-2 text-small transition-colors ${
                  filtro === d.id ? "bg-dark-surface text-text-invert" : "border border-line bg-paper text-muted hover:text-text"
                }`}
              >
                {d.rubro}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={labRef} className="container-site scroll-mt-28 py-16 lg:py-20">
        {filtro === "todas" ? (
          <>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="kicker">Catálogo</p>
                <h2 className="mt-4 text-h1">Siete demos funcionando, sin registro</h2>
              </div>
              <span className="hidden font-mono text-micro text-muted sm:block">
                cada botón abre una interacción real
              </span>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((d, i) => {
                const badge = ESTADO_BADGE[d.estado]
                return (
                  <article
                    key={d.id}
                    className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-paper-bright p-6 transition-colors hover:border-ink/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-micro ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-h3">{d.rubro}</h3>
                    <p className="mt-2 flex-1 text-small text-muted">{d.descripcion}</p>
                    <button
                      onClick={() => abrir(d.id)}
                      className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-line bg-paper font-semibold text-text transition-colors hover:border-ink/30"
                    >
                      <span className="size-2 rounded-full" style={{ backgroundColor: ACCENTS[d.id] }} />
                      Abrir demo
                      <ArrowUpRight className="size-4" />
                    </button>
                  </article>
                )
              })}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-5xl">
            <p className="kicker">Laboratorio Fleximy</p>
            <h2 className="mt-4 text-h1">{demoById(filtro).rubro}</h2>
            <div className="mt-8">
              <DemoLab key={filtro} demo={demoById(filtro)} onExit={() => setFiltro("todas")} />
            </div>
          </div>
        )}
      </section>

      <section className="bg-dark-surface py-20 text-text-invert lg:py-28">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div className="max-w-2xl">
            <p className="kicker" style={{ color: "rgba(245,246,255,0.55)" }}>
              Recorrido guiado
            </p>
            <h2 className="mt-4 text-h1">¿Preferís que te lo mostremos?</h2>
            <p className="mt-5 text-lead text-text-invert/70">
              Reservá una videollamada breve. Tomamos un caso parecido a tu negocio y recorremos la
              experiencia completa, con tu propia operación en mente.
            </p>
            <div className="mt-8">
              <Button to="/contacto" size="lg">
                Agendar demostración
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="grid place-items-center rounded-[var(--radius-card)] border border-line-dark bg-ink-soft p-8 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-accent text-on-accent">
              <MonitorPlay className="size-7" />
            </span>
            <p className="mt-4 font-mono text-micro text-text-invert/60">20 minutos · sin compromiso</p>
            <p className="mt-2 font-mono text-micro text-text-invert/60">caso parecido al tuyo</p>
          </div>
        </div>
      </section>

      <section className="bg-dark-surface text-text-invert">
        <div className="container-site border-t border-line-dark py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(245,246,255,0.55)" }}>
            Demo personalizada
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            ¿Querés ver Fleximy con la lógica de tu negocio?
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            Contanos tu rubro, las herramientas que usás hoy y tu principal problema operativo.
            Preparamos una demostración enfocada en tu caso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar demo personalizada
            </Button>
            <Button to="/soluciones" variant="secondary" size="lg">
              Ver soluciones
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
