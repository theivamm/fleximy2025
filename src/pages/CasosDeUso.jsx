import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
import { CASOS, ESTRUCTURA_CASO_REAL } from "../data/confianza"

function WorkspaceAntes({ items }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-5">
      <p className="font-mono text-micro text-text-3">cómo operás hoy · información dispersa</p>
      <ul className="mt-4 grid gap-2">
        {items.map((tool) => (
          <li
            key={tool}
            className="flex items-center justify-between gap-3 rounded-lg border border-outline bg-surface-2/50 px-3 py-2"
          >
            <span className="text-small text-text-1">{tool}</span>
            <span className="shrink-0 rounded-full bg-surface-3/60 px-2 py-0.5 font-mono text-micro text-text-3">
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
    <div className="rounded-[var(--radius-card)] border border-primary/40 bg-surface-1/60 p-5 shadow-[var(--shadow-sm)]">
      <p className="font-mono text-micro" style={{ color: acento }}>
        con Fleximy · flujo conectado
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        {items.map((paso, i) => (
          <div key={paso} className="flex items-start gap-2">
            <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 rounded-lg border border-outline bg-surface-2/50 px-3 py-2 text-small text-text-1">
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
  return (
    <main>
      <PageHero
        kicker="Casos de uso"
        title={
          <>
            Cómo se adapta Fleximy{" "}
            <span className="text-gradient">a operaciones reales.</span>
          </>
        }
        lead="No todas las empresas necesitan lo mismo. Estos escenarios muestran cómo se pueden combinar módulos para resolver problemas concretos."
        meta="Escenarios ilustrativos · no representan clientes comprobados"
      >
        <p className="flex max-w-[62ch] items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-small text-text-2">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
          Los siguientes ejemplos son escenarios ilustrativos. No representan clientes ni
          resultados comprobados salvo que se identifique expresamente lo contrario.
        </p>
      </PageHero>

      <section className="container-site pb-20 lg:pb-28">
        <div className="flex flex-col gap-16">
          {CASOS.map((caso, ci) => (
            <article key={caso.id} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-outline pt-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-micro text-text-3">{String(ci + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-h2 text-text-1">{caso.nombre}</h2>
                </div>
                <Link
                  to={caso.cta.to}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-strong"
                >
                  {caso.cta.label}
                  <ArrowUpRight className="size-4 transition-transform duration-[var(--motion-base)] ease-[var(--motion-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
                  <p className="font-mono text-micro text-text-3">situación</p>
                  <p className="mt-3 text-small text-text-1">{caso.situacion}</p>
                </div>
                <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
                  <p className="font-mono text-micro text-text-3">configuración</p>
                  <ul className="mt-3 grid gap-2">
                    {caso.configuracion.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-small text-text-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: caso.acento }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
                  <p className="font-mono text-micro text-text-3">indicadores a medir</p>
                  <ul className="mt-3 grid gap-2">
                    {caso.indicadores.map((ind) => (
                      <li key={ind} className="flex items-start gap-2 text-small text-text-3">
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

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div>
            <span className="kicker">Casos reales</span>
            <h2 className="font-display text-h2 mt-4 text-text-1">Cuando haya clientes autorizados</h2>
            <p className="lead-text mt-5 max-w-[48ch] text-text-2">
              Esta página evolucionará a “Casos de éxito” cuando existan implementaciones con
              autorización. Cada caso real incluirá:
            </p>
          </div>
          <ol className="grid gap-2.5">
            {ESTRUCTURA_CASO_REAL.map((paso, i) => (
              <li key={paso} className="flex items-start gap-4 rounded-xl border border-outline bg-surface-1/60 px-4 py-3">
                <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-small text-text-1">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16" style={{ backgroundImage: "var(--background-image-primary)" }}>
          <span className="kicker justify-center">Tu caso</span>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            Construyamos un caso basado en tu propia operación
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Contanos tu situación actual y armamos una configuración posible de Fleximy para ese
            problema concreto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar diagnóstico
            </PrimaryCTA>
            <OutlineCTA to="/soluciones" large>
              Explorar soluciones
            </OutlineCTA>
          </div>
        </div>
      </section>
    </main>
  )
}
