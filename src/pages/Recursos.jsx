import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, FileText, ListChecks, Scale, ArrowRight } from "lucide-react"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import OutlineCTA from "../components/ui/OutlineCTA"
import { RECURSOS_CATEGORIAS, RECURSOS, DESCARGABLES, NEWSLETTER } from "../data/confianza"

const FORMATO = {
  Guía: { icon: FileText, label: "Guía" },
  Checklist: { icon: ListChecks, label: "Checklist" },
  Comparativa: { icon: Scale, label: "Comparativa" },
}

export default function Recursos() {
  const [filtro, setFiltro] = useState("todas")

  const destacado = RECURSOS.find((r) => r.destacado)
  const resto = RECURSOS.filter((r) => !r.destacado).filter(
    (r) => filtro === "todas" || r.categoria === filtro
  )
  const FormatoDestacado = FORMATO[destacado.formato].icon

  return (
    <main>
      <PageHero
        kicker="Recursos para PyMEs"
        title={
          <>
            Ideas prácticas para digitalizar tu negocio{" "}
            <span className="text-gradient">con criterio.</span>
          </>
        }
        lead="Contenido para tomar mejores decisiones sobre sitios web, gestión, automatización y experiencia del cliente."
      />

      <section className="container-wide pb-16 lg:pb-20">
        <article className="grid overflow-hidden rounded-[var(--radius-card)] border border-outline bg-surface-1/60 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-14">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-on">
                <FormatoDestacado className="size-4" />
              </span>
              <span className="font-mono text-micro text-text-3">recurso destacado · {destacado.categoria}</span>
            </div>
            <h2 className="text-h2 max-w-[22ch] text-text-1">{destacado.titulo}</h2>
            <p className="lead-text max-w-[48ch] text-text-2">{destacado.descripcion}</p>
            <div className="mt-2 flex items-center gap-3 font-mono text-micro text-text-3">
              <span>lectura {destacado.lectura}</span>
              <span className="size-1 rounded-full bg-surface-3/70" />
              <span>en preparación</span>
            </div>
          </div>
          <div
            className="grid place-items-center border-t border-outline p-8 text-white lg:border-l lg:border-t-0"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <div className="text-center">
              <p className="font-mono text-micro text-white/70">próximamente</p>
              <p className="text-h4 mt-3 max-w-[24ch]">
                Los materiales se publican a medida que se completan y se validan.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-16 lg:py-20">
        <div className="container-wide">
          <p className="kicker">Biblioteca</p>
          <h2 className="text-h2 mt-4 text-text-1">Guías, checklists y comparativas</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFiltro("todas")}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                filtro === "todas"
                  ? "bg-text-1 text-bg-0"
                  : "border border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
              }`}
            >
              Todas
            </button>
            {RECURSOS_CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`rounded-full px-4 py-2 text-small transition-colors ${
                  filtro === cat
                    ? "bg-text-1 text-bg-0"
                    : "border border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={filtro}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {resto.map((r) => {
                  const Meta = FORMATO[r.formato].icon
                  return (
                    <article
                      key={r.titulo}
                      className="group flex flex-col rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 transition-colors hover:border-ink/30"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-outline bg-surface-2/40 px-3 py-1 font-mono text-micro text-text-3">
                          <Meta className="size-3.5" />
                          {r.formato}
                        </span>
                        <span className="font-mono text-micro text-text-3">{r.categoria}</span>
                      </div>
                      <h3 className="text-h4 mt-4 text-text-1">{r.titulo}</h3>
                      <p className="mt-2 flex-1 text-small text-text-2">{r.descripcion}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-outline pt-4">
                        <span className="font-mono text-micro text-text-3">lectura {r.lectura}</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-micro text-cyan">
                          <span className="size-1.5 rounded-full bg-cyan" />
                          en preparación
                        </span>
                      </div>
                    </article>
                  )
                })}
                {resto.length === 0 && (
                  <p className="col-span-full rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-8 text-center text-small text-text-2">
                    Todavía no hay materiales publicados en esta categoría.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div className="grid items-center gap-10 rounded-[var(--radius-card)] border border-outline bg-surface-2/40 p-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:p-12">
          <div>
            <p className="kicker">Casos de uso</p>
            <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">La teoría puesta en una operación concreta</h2>
            <p className="lead-text mt-5 max-w-[48ch] text-text-2">
              Escenarios ilustrativos que muestran cómo se combinan módulos según el rubro y el
              problema a resolver.
            </p>
            <div className="mt-8">
              <PrimaryCTA to="/casos-de-uso" large>
                Ver casos de uso
                <ArrowUpRight className="size-4" />
              </PrimaryCTA>
            </div>
          </div>
          <div className="grid place-items-center rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-8 text-center">
            <p className="font-mono text-micro text-text-3">escenarios ilustrativos</p>
            <p className="text-h4 mt-3 text-primary">no representan clientes reales</p>
            <p className="mt-3 font-mono text-micro text-text-3">salvo identificación expresa</p>
          </div>
        </div>
      </section>

      <section className="container-wide pb-20 lg:pb-28">
        <p className="kicker">Descargables</p>
        <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">Plantillas listas para usar</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESCARGABLES.map((d) => (
            <article key={d.titulo} className="flex flex-col rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
              <span className="font-mono text-micro text-text-3">{d.formato}</span>
              <h3 className="text-h4 mt-3 flex-1 text-text-1">{d.titulo}</h3>
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-micro text-cyan">
                <span className="size-1.5 rounded-full bg-cyan" />
                en preparación
              </span>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-[56ch] font-mono text-micro text-text-3">
          los descargables pueden solicitar email solo cuando aportan valor real; acceso inmediato y
          consentimiento incluido
        </p>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">Newsletter</p>
            <h2 className="text-h2 mt-4 text-text-1">{NEWSLETTER.titulo}</h2>
            <p className="lead-text mt-5 max-w-[48ch] text-text-2">{NEWSLETTER.promesa}</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
            <p className="text-small text-text-2">Suscribite cuando esté disponible</p>
            <span className="rounded-full bg-text-1 px-4 py-2 font-mono text-micro text-bg-0">
              próximo lanzamiento
            </span>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 lg:py-28">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 text-center sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <p className="kicker justify-center">Aplicar una idea</p>
          <h2 className="font-display h2-title mx-auto mt-4 max-w-[18ch] text-text-1">
            ¿Querés llevar una de estas ideas a tu negocio?
          </h2>
          <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
            Contanos qué parte de tu operación querés ordenar y definimos un primer paso concreto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryCTA to="/contacto" large>
              Solicitar diagnóstico
              <ArrowRight className="size-4" />
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
