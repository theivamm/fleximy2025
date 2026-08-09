import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react"
import Button from "../components/ui/Button"
import { CASOS, ESTRUCTURA_CASO_REAL } from "../data/confianza"

function WorkspaceAntes({ items }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
      <p className="font-mono text-micro text-muted">cómo operás hoy · información dispersa</p>
      <ul className="mt-4 grid gap-2">
        {items.map((tool) => (
          <li
            key={tool}
            className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-bright px-3 py-2"
          >
            <span className="text-small text-text">{tool}</span>
            <span className="shrink-0 rounded-full bg-ink/10 px-2 py-0.5 font-mono text-micro text-muted">
              sin conexión
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WorkspaceConectado({ items, acento }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-5">
      <p className="font-mono text-micro text-muted">con Fleximy · flujo conectado</p>
      <div className="mt-4 flex flex-col gap-1.5">
        {items.map((paso, i) => (
          <div key={paso} className="flex items-start gap-2">
            <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-small text-text">
              {paso}
            </div>
            <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: acento }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CasosDeUso() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".cu-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".cu-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  return (
    <main ref={root} className="bg-paper text-text">
      <section className="relative overflow-hidden pb-12 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="cu-fade kicker">Casos de uso</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cu-line-inner block">Cómo se adapta Fleximy</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cu-line-inner block">a operaciones reales.</span>
            </span>
          </h1>
          <p className="cu-fade mt-6 max-w-[52ch] text-lead text-muted">
            No todas las empresas necesitan lo mismo. Estos escenarios muestran cómo se pueden
            combinar módulos para resolver problemas concretos.
          </p>
          <p className="cu-fade mt-6 flex max-w-[62ch] items-start gap-3 rounded-xl border border-line bg-paper-bright px-4 py-3 text-small text-muted">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-ink" />
            Los siguientes ejemplos son escenarios ilustrativos. No representan clientes ni
            resultados comprobados salvo que se identifique expresamente lo contrario.
          </p>
        </div>
      </section>

      <section className="container-site pb-20 lg:pb-28">
        <div className="flex flex-col gap-16">
          {CASOS.map((caso, ci) => (
            <article key={caso.id} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-micro text-muted">{String(ci + 1).padStart(2, "0")}</span>
                  <h2 className="text-h2">{caso.nombre}</h2>
                </div>
                <Link
                  to={caso.cta.to}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-text underline-offset-4 hover:underline"
                >
                  {caso.cta.label}
                  <ArrowUpRight className="size-4 transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-6">
                  <p className="font-mono text-micro text-muted">situación</p>
                  <p className="mt-3 text-small text-text">{caso.situacion}</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-6">
                  <p className="font-mono text-micro text-muted">configuración</p>
                  <ul className="mt-3 grid gap-2">
                    {caso.configuracion.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-small text-text">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: caso.acento }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-6">
                  <p className="font-mono text-micro text-muted">indicadores a medir</p>
                  <ul className="mt-3 grid gap-2">
                    {caso.indicadores.map((ind) => (
                      <li key={ind} className="flex items-start gap-2 text-small text-muted">
                        <ArrowRight className="mt-0.5 size-3.5 shrink-0" style={{ color: caso.acento }} />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <WorkspaceAntes items={caso.disperso} />
                <WorkspaceConectado items={caso.configuracion} acento={caso.acento} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <p className="kicker">Casos reales</p>
            <h2 className="mt-4 text-h1">Cuando haya clientes autorizados</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-muted">
              Esta página evolucionará a “Casos de éxito” cuando existan implementaciones con
              autorización. Cada caso real incluirá:
            </p>
          </div>
          <ol className="grid gap-2.5">
            {ESTRUCTURA_CASO_REAL.map((paso, i) => (
              <li key={paso} className="flex items-start gap-4 rounded-xl border border-line bg-paper px-4 py-3">
                <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-small text-text">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
            Tu caso
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            Construyamos un caso basado en tu propia operación
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            Contanos tu situación actual y armamos una configuración posible de Fleximy para ese
            problema concreto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar diagnóstico
            </Button>
            <Button to="/soluciones" variant="secondary" size="lg">
              Explorar soluciones
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
