import { useRef, useState } from "react"
import { ArrowUpRight, MonitorPlay } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
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
  disponible: { label: "Interactiva", cls: "bg-accent text-accent-on" },
  guiado: { label: "Recorrido guiado", cls: "bg-cyan/15 text-cyan" },
  proximamente: { label: "Próximamente", cls: "bg-surface-3/60 text-text-3" },
}

export default function Demos() {
  const labRef = useRef(null)
  const [filtro, setFiltro] = useState("todas")

  const abrir = (id) => {
    if (id !== "todas") track("demo_iniciada", { demo: id })
    setFiltro(id)
    requestAnimationFrame(() => labRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  return (
    <main>
      <PageHero
        kicker="Demos interactivas"
        title={
          <>
            Probá Fleximy <span className="text-gradient">antes de imaginarlo.</span>
          </>
        }
        lead="Recorré una experiencia interactiva desde la mirada de un cliente y desde el panel de quien gestiona el negocio."
        meta="las demos usan información ficticia y muestran configuraciones de ejemplo · la solución final se adapta al alcance de cada proyecto"      />

      <section className="border-y border-outline bg-surface-2/40 py-12 lg:py-14">
        <div className="container-wide">
          <p className="kicker">Elegí una demo</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => abrir("todas")}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                filtro === "todas"
                  ? "bg-text-1 text-bg-0"
                  : "border border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
              }`}
            >
              Todas
            </button>
            {DEMOS.map((d) => (
              <button
                key={d.id}
                onClick={() => abrir(d.id)}
                className={`rounded-full px-4 py-2 text-small transition-colors ${
                  filtro === d.id
                    ? "bg-text-1 text-bg-0"
                    : "border border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
                }`}
              >
                {d.rubro}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={labRef} className="container-wide scroll-mt-28 py-16 lg:py-20">
        {filtro === "todas" ? (
          <>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="kicker">Catálogo</p>
                <h2 className="text-h2 mt-4 text-text-1">Demos interactivas basadas en escenarios de negocio</h2>
              </div>
              <span className="hidden font-mono text-micro text-text-3 sm:block">
                cada botón abre una interacción con datos ilustrativos
              </span>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((d, i) => {
                const badge = ESTADO_BADGE[d.estado]
                return (
                  <article
                    key={d.id}
                    className="group flex flex-col rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 transition-colors hover:border-ink/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-micro ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="text-h3 mt-4 text-text-1">{d.rubro}</h3>
                    <p className="mt-2 flex-1 text-small text-text-2">{d.descripcion}</p>
                    <button
                      onClick={() => abrir(d.id)}
                      className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-outline bg-surface-2/50 font-semibold text-text-1 transition-colors hover:border-ink/30"
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
          <div className="mx-auto w-full">
            <p className="kicker">Laboratorio Fleximy</p>
            <h2 className="text-h2 mt-4 text-text-1">{demoById(filtro).rubro}</h2>
            <div className="mt-8">
              <DemoLab key={filtro} demo={demoById(filtro)} onExit={() => setFiltro("todas")} />
            </div>
          </div>
        )}
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div className="grid items-center gap-10 rounded-[var(--radius-card)] border border-outline bg-surface-2/40 p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:p-12">
          <div className="max-w-2xl">
            <p className="kicker">Recorrido guiado</p>
            <h2 className="text-h2 mt-4 text-text-1">¿Preferís que te lo mostremos?</h2>
            <p className="lead-text mt-5 text-text-2">
              Reservá una videollamada breve. Tomamos un caso parecido a tu negocio y recorremos la
              experiencia completa, con tu propia operación en mente.
            </p>
            <div className="mt-8">
              <PrimaryCTA to="/contacto" large>
                Agendar demostración
                <ArrowUpRight className="size-4" />
              </PrimaryCTA>
            </div>
          </div>
          <div className="grid place-items-center rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-on">
              <MonitorPlay className="size-7" />
            </span>
            <p className="mt-4 font-mono text-micro text-text-3">20 minutos · sin compromiso</p>
            <p className="mt-2 font-mono text-micro text-text-3">caso parecido al tuyo</p>
          </div>
        </div>
      </section>

      <section className="container-wide pb-20 lg:pb-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">Demo personalizada</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            ¿Querés ver Fleximy con la lógica de tu negocio?
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Contanos tu rubro, las herramientas que usás hoy y tu principal problema operativo.
            Preparamos una demostración enfocada en tu caso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar demo personalizada
            </PrimaryCTA>
            <OutlineCTA to="/soluciones" large>
              Ver soluciones
            </OutlineCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
