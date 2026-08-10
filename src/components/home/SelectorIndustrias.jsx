import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"
import { INDUSTRIES } from "../../data/industries"

const CONSULTA = {
  gastronomia: "¿Tienen mesas libres mañana a las 19?",
  turnos: "Quiero turno para el jueves a las 15 hs",
  pymes: "Necesito una cotización para el nuevo proyecto",
  comercio: "¿Cuánto sale el modelo Y con envío?",
  inmobiliarias: "¿La propiedad sigue disponible para visitar?",
  educacion: "Quiero info sobre la inscripción 2026",
  talleres: "¿Pueden arreglar el equipo esta semana?",
}

const FEATURES = [
  "Web pública con tu información",
  "Consultas que llegan al panel",
  "Contenido que editás desde el panel",
]

export default function SelectorIndustrias() {
  const [activo, setActivo] = useState(0)
  const ind = INDUSTRIES[activo]

  return (
    <section className="relative py-16 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-40 size-[30rem] rounded-full bg-primary-soft/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[24rem] rounded-full bg-secondary-soft/40 blur-3xl" />
      </div>

      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="kicker">Soluciones por rubro</p>
            <h2 className="mt-4 text-h1">
              Una base diseñada para tu <span className="text-primary">tipo de negocio</span>
            </h2>
            <p className="mt-4 max-w-[44ch] text-lead text-ink-secondary">
              Elegí el rubro y mirá cómo se ve: la misma web, la misma consulta, el mismo panel.
              Cambia el acento, cambia la operación.
            </p>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-outline bg-gradient-primary-soft/60 shadow-[var(--shadow-lift)]">
              <div className="flex items-center gap-2 border-b border-outline bg-gradient-surface px-4 py-2.5">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-outline-strong" />
                <span aria-hidden="true" className="size-2.5 rounded-full bg-outline-strong" />
                <span aria-hidden="true" className="size-2.5 rounded-full bg-outline-strong" />
                <span className="ml-2 flex-1 truncate rounded-md bg-bg-secondary px-2 py-1 font-mono text-micro text-ink-muted">
                  tunegocio.ar · solución {ind.slug}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-full shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
                      style={{ backgroundColor: ind.accent }}
                    />
                    <p className="font-mono text-micro text-ink-muted">
                      {ind.label} · {ind.tagline}
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-outline bg-gradient-surface p-4 shadow-[var(--shadow-soft)]">
                    <div className="flex items-center gap-2">
                      <span className="size-2 shrink-0 animate-pulse rounded-full bg-primary" />
                      <p className="text-small text-ink-primary">{CONSULTA[ind.slug]}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-micro text-white">
                        nueva
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 font-mono text-micro text-white"
                        style={{ backgroundColor: ind.accent }}
                      >
                        {ind.label}
                      </span>
                      <span className="rounded-full bg-bg-secondary px-2.5 py-1 font-mono text-micro text-ink-secondary">
                        se asigna
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {FEATURES.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 rounded-xl border border-outline bg-gradient-surface px-3.5 py-2.5"
                      >
                        <span
                          className="grid size-5 shrink-0 place-items-center rounded-full"
                          style={{ backgroundColor: ind.accent }}
                        >
                          <Check className="size-3 text-ink-primary" />
                        </span>
                        <span className="text-small text-ink-primary">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={ind.to}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-primary hover:text-primary transition-colors"
                  >
                    Ver solución para {ind.label}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Índice editorial */}
        <div className="mt-12 grid gap-0.5 lg:mt-16">
          {INDUSTRIES.map((item, i) => {
            const active = i === activo
            return (
              <button
                key={item.slug}
                aria-pressed={active}
                onClick={() => setActivo(i)}
                className={`group relative flex items-baseline gap-5 border-t border-outline px-2 py-4 text-left transition-colors duration-[var(--motion-fast)] last:border-b md:gap-8 md:px-4 ${
                  active ? "bg-bg-secondary/60" : "hover:bg-bg-secondary/40"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 left-0 w-0.5 rounded-full transition-opacity duration-[var(--motion-base)] ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundColor: item.accent }}
                />
                <span
                  className={`font-mono text-micro transition-colors duration-[var(--motion-fast)] ${
                    active ? "text-primary" : "text-ink-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 font-display text-h3 tracking-tight transition-colors duration-[var(--motion-fast)] ${
                    active ? "text-primary" : "text-ink-primary"
                  }`}
                >
                  {item.label}
                </span>
                <span className="hidden flex-[1.2] text-body text-ink-secondary md:block">
                  {item.tagline}
                </span>
                <span
                  aria-hidden="true"
                  className={`hidden size-2 shrink-0 rounded-full transition-transform duration-[var(--motion-base)] group-hover:scale-125 md:block ${
                    active ? "" : "opacity-0"
                  }`}
                  style={{ backgroundColor: item.accent }}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
