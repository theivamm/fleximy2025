import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, FileText, ListChecks, Scale, ArrowRight } from "lucide-react"
import Button from "../components/ui/Button"
import { RECURSOS_CATEGORIAS, RECURSOS, DESCARGABLES, NEWSLETTER } from "../data/confianza"

const FORMATO = {
  Guía: { icon: FileText, label: "Guía" },
  Checklist: { icon: ListChecks, label: "Checklist" },
  Comparativa: { icon: Scale, label: "Comparativa" },
}

export default function Recursos() {
  const root = useRef(null)
  const [filtro, setFiltro] = useState("todas")

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".rc-line-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.13, ease: "power4.out" }
        )
        .fromTo(
          ".rc-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45"
        )
    })
    return () => mm.revert()
  }, [])

  const destacado = RECURSOS.find((r) => r.destacado)
  const resto = RECURSOS.filter((r) => !r.destacado).filter(
    (r) => filtro === "todas" || r.categoria === filtro
  )
  const FormatoDestacado = FORMATO[destacado.formato].icon

  return (
    <main ref={root} className="bg-paper text-text">
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="container-site">
          <p className="rc-fade kicker">Recursos para PyMEs</p>
          <h1 className="mt-6 max-w-[18ch] text-hero text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rc-line-inner block">Ideas prácticas para digitalizar</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rc-line-inner block">tu negocio con criterio.</span>
            </span>
          </h1>
          <p className="rc-fade mt-6 max-w-[52ch] text-lead text-muted">
            Contenido para tomar mejores decisiones sobre sitios web, gestión, automatización y
            experiencia del cliente.
          </p>
        </div>
      </section>

      <section className="container-site pb-16 lg:pb-20">
        <article className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-14">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-ink">
                <FormatoDestacado className="size-4" />
              </span>
              <span className="font-mono text-micro text-muted">recurso destacado · {destacado.categoria}</span>
            </div>
            <h2 className="max-w-[22ch] text-h1">{destacado.titulo}</h2>
            <p className="max-w-[48ch] text-lead text-muted">{destacado.descripcion}</p>
            <div className="mt-2 flex items-center gap-3 font-mono text-micro text-muted">
              <span>lectura {destacado.lectura}</span>
              <span className="size-1 rounded-full bg-ink/20" />
              <span>en preparación</span>
            </div>
          </div>
          <div className="grid place-items-center border-t border-line bg-ink p-8 text-text-invert lg:border-l lg:border-t-0">
            <div className="text-center">
              <p className="font-mono text-micro text-text-invert/60">próximamente</p>
              <p className="mt-3 max-w-[24ch] text-h4">
                Los materiales se publican a medida que se completan y se validan.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="border-y border-line bg-paper-bright py-16 lg:py-20">
        <div className="container-site">
          <p className="kicker">Biblioteca</p>
          <h2 className="mt-4 text-h1">Guías, checklists y comparativas</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFiltro("todas")}
              className={`rounded-full px-4 py-2 text-small transition-colors ${
                filtro === "todas" ? "bg-ink text-text-invert" : "border border-line bg-paper text-muted hover:text-text"
              }`}
            >
              Todas
            </button>
            {RECURSOS_CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`rounded-full px-4 py-2 text-small transition-colors ${
                  filtro === cat ? "bg-ink text-text-invert" : "border border-line bg-paper text-muted hover:text-text"
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
                      className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6 transition-colors hover:border-ink/30"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-bright px-3 py-1 font-mono text-micro text-muted">
                          <Meta className="size-3.5" />
                          {r.formato}
                        </span>
                        <span className="font-mono text-micro text-muted">{r.categoria}</span>
                      </div>
                      <h3 className="mt-4 text-h4">{r.titulo}</h3>
                      <p className="mt-2 flex-1 text-small text-muted">{r.descripcion}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-micro text-muted">lectura {r.lectura}</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-micro text-cyan-deep">
                          <span className="size-1.5 rounded-full bg-cyan" />
                          en preparación
                        </span>
                      </div>
                    </article>
                  )
                })}
                {resto.length === 0 && (
                  <p className="col-span-full rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center text-small text-muted">
                    Todavía no hay materiales publicados en esta categoría.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-text-invert lg:py-28">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <p className="kicker" style={{ color: "rgba(244,243,238,0.55)" }}>
              Casos de uso
            </p>
            <h2 className="mt-4 max-w-[16ch] text-h1">La teoría puesta en una operación concreta</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-text-invert/70">
              Escenarios ilustrativos que muestran cómo se combinan módulos según el rubro y el
              problema a resolver.
            </p>
            <div className="mt-8">
              <Button to="/casos-de-uso" size="lg">
                Ver casos de uso
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="grid place-items-center rounded-[var(--radius-card)] border border-line-dark bg-ink-soft p-8 text-center">
            <p className="font-mono text-micro text-text-invert/60">escenarios ilustrativos</p>
            <p className="mt-3 text-h4 text-accent">no representan clientes reales</p>
            <p className="mt-3 font-mono text-micro text-text-invert/60">salvo identificación expresa</p>
          </div>
        </div>
      </section>

      <section className="container-site py-20 lg:py-28">
        <p className="kicker">Descargables</p>
        <h2 className="mt-4 max-w-[16ch] text-h1">Plantillas listas para usar</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESCARGABLES.map((d) => (
            <article key={d.titulo} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper-bright p-6">
              <span className="font-mono text-micro text-muted">{d.formato}</span>
              <h3 className="mt-3 flex-1 text-h4">{d.titulo}</h3>
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-micro text-cyan-deep">
                <span className="size-1.5 rounded-full bg-cyan" />
                en preparación
              </span>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-[56ch] font-mono text-micro text-muted">
          los descargables pueden solicitar email solo cuando aportan valor real; acceso inmediato y
          consentimiento incluido
        </p>
      </section>

      <section className="border-y border-line bg-paper-bright py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">Newsletter</p>
            <h2 className="mt-4 text-h1">{NEWSLETTER.titulo}</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-muted">{NEWSLETTER.promesa}</p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-6">
            <p className="text-small text-muted">Suscribite cuando esté disponible</p>
            <span className="rounded-full bg-ink px-4 py-2 font-mono text-micro text-text-invert">
              próximo lanzamiento
            </span>
          </div>
        </div>
      </section>

      <section className="bg-ink text-text-invert">
        <div className="container-site py-24 text-center lg:py-32">
          <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
            Aplicar una idea
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-h1">
            ¿Querés llevar una de estas ideas a tu negocio?
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
            Contanos qué parte de tu operación querés ordenar y definimos un primer paso concreto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contacto" size="lg">
              Solicitar diagnóstico
              <ArrowRight className="size-4" />
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
