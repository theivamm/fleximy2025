import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  Utensils,
  CalendarClock,
  LayoutDashboard,
  ShoppingCart,
  Building2,
  GraduationCap,
  Wrench,
} from "lucide-react"
import { INDUSTRIES } from "../../data/industries"

const ICONS = {
  gastronomia: Utensils,
  turnos: CalendarClock,
  pymes: LayoutDashboard,
  comercio: ShoppingCart,
  inmobiliarias: Building2,
  educacion: GraduationCap,
  talleres: Wrench,
}

const FEATURES = [
  "Web pública con tu información",
  "Consultas que llegan al panel",
  "Contenido que editás desde el panel",
]

export default function SelectorIndustrias() {
  const [activo, setActivo] = useState(0)
  const ind = INDUSTRIES[activo]
  const Icon = ICONS[ind.slug]

  return (
    <section className="bg-dark-surface py-20 text-text-invert lg:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="kicker" style={{ color: "rgba(245,246,255,0.55)" }}>
            Soluciones por rubro
          </p>
          <h2 className="mt-4 text-h1">Una base diseñada para tu tipo de negocio</h2>
          <p className="mt-5 max-w-[44ch] text-lead text-text-invert/70">
            Elegí el rubro y mirá cómo se ve la propuesta: web + panel pensados para esa operación.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div className="flex flex-col gap-1">
            {INDUSTRIES.map((item, i) => {
              const active = i === activo
              return (
                <button
                  key={item.slug}
                  aria-pressed={active}
                  onClick={() => setActivo(i)}
                  className={`flex items-start gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                    active
                      ? "border-line-dark bg-ink-soft"
                      : "border-transparent hover:bg-ink-soft/60"
                  }`}
                >
                  <span className="font-mono text-micro text-text-invert/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-h4">{item.label}</span>
                    <span className="mt-1 hidden text-small text-text-invert/55 lg:block">
                      {item.tagline}
                    </span>
                  </span>
                  {active && (
                    <span
                      className="mt-1.5 size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            <div
              aria-live="polite"
              className="overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-paper-bright text-text shadow-lift"
            >
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-dark-surface/15" />
                <span className="size-2.5 rounded-full bg-dark-surface/15" />
                <span className="size-2.5 rounded-full bg-dark-surface/15" />
                <span className="ml-2 flex-1 truncate rounded-md bg-paper px-2 py-1 font-mono text-micro text-muted">
                  fleximy.app/{ind.slug}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl"
                    style={{ backgroundColor: ind.accent, color: "var(--color-ink)" }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-micro text-muted">solución {ind.label}</p>
                    <h3 className="text-h3">{ind.label}</h3>
                  </div>
                </div>
                <p className="mt-4 text-body text-muted">{ind.tagline}</p>

                <div className="mt-5 grid gap-2">
                  {FEATURES.map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5"
                    >
                      <span className="text-small">{f}</span>
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: ind.accent }}
                      />
                    </div>
                  ))}
                </div>

                <Link
                  to={ind.to}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
                >
                  Ver solución para {ind.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
