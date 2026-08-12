import { useState } from "react"
import { Link } from "react-router-dom"
import { INDUSTRIES } from "../../data/industries"
import StatusChip from "./StatusChip"
import CssCalendar from "./CssCalendar"

const CONTENT = {
  gastronomia: {
    problema: "Menú impreso, reservas por teléfono y pedidos que se pierden en el apuro.",
    producto: "Web con menú digital, reservas y pedidos que llegan directo a la cocina.",
    features: ["Menú digital", "Reservas online", "Pedidos por mesa", "Reportes de venta"],
  },
  turnos: {
    problema: "Agenda manual, cancelaciones de último momento y clientes que no aparecen.",
    producto: "Reservas online, recordatorios automáticos y agenda siempre al día.",
    features: ["Reservas online", "Recordatorios", "Historial de clientes", "Gestión de agenda"],
  },
  pymes: {
    problema: "Clientes, tareas y seguimiento repartidos entre Excel, chats y notas.",
    producto: "Un solo lugar para clientes, proyectos, tareas y seguimiento.",
    features: ["CRM", "Proyectos", "Tareas", "Seguimiento"],
  },
  comercio: {
    problema: "Catálogo en PDF, stock mental y precios desactualizados.",
    producto: "Tienda con catálogo, stock y pedidos conectados entre sí.",
    features: ["Catálogo", "Stock", "Pedidos", "Pagos"],
  },
  inmobiliarias: {
    problema: "Propiedades en fotos sueltas, consultas sin seguimiento y agenda manual.",
    producto: "Portal con propiedades, consultas y CRM de visitas.",
    features: ["Propiedades", "Consultas", "CRM", "Agenda de visitas"],
  },
  educacion: {
    problema: "Inscripciones por formulario y seguimiento de estudiantes manual.",
    producto: "Plataforma con oferta académica e inscripciones digitales.",
    features: ["Oferta académica", "Inscripciones", "Seguimiento", "Comunicación"],
  },
  talleres: {
    problema: "Órdenes en papeles, presupuestos sin control y avisos tardíos.",
    producto: "Órdenes de trabajo digitales con estados y avisos automáticos.",
    features: ["Órdenes", "Presupuestos", "Estados", "Avisos"],
  },
}

function MiniView({ slug }) {
  switch (slug) {
    case "gastronomia":
      return (
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-1">Pedidos · Mesa 4</span>
            <StatusChip label="En cocina" tone="warning" dot={false} />
          </div>
          {[
            { d: "Burrata + focaccia", q: "×2" },
            { d: "Risotto de hongos", q: "×1" },
            { d: "Flan casero", q: "×2" },
          ].map((i) => (
            <div key={i.d} className="flex items-center justify-between rounded-lg border border-outline bg-surface-1 px-3 py-2 text-xs text-text-2">
              {i.d} <span className="font-mono text-text-3">{i.q}</span>
            </div>
          ))}
          <span className="text-xs font-bold text-text-1">Total <span className="text-accent">$42.800</span></span>
        </div>
      )
    case "turnos":
      return (
        <div className="p-3">
          <CssCalendar month="Mayo" year={2026} events={[{ day: 12, tone: "secondary" }, { day: 18, tone: "accent" }]} />
        </div>
      )
    case "pymes":
      return (
        <div className="flex flex-col gap-2 p-3">
          <span className="text-xs font-bold text-text-1">Proyecto · Estudio Norte</span>
          {[
            { t: "Wireframes", p: 100, tone: "success" },
            { t: "Diseño UI", p: 60, tone: "primary" },
            { t: "Desarrollo", p: 25, tone: "accent" },
          ].map((r) => (
            <div key={r.t}>
              <div className="mb-1 flex justify-between text-[11px] text-text-2">
                {r.t} <span className="font-mono text-text-3">{r.p}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full" style={{ width: `${r.p}%`, backgroundColor: `var(--${r.tone})` }} />
              </div>
            </div>
          ))}
        </div>
      )
    case "comercio":
      return (
        <div className="grid grid-cols-3 gap-2 p-3">
          {["Aurora", "Lumen", "Nómade"].map((n) => (
            <div key={n} className="overflow-hidden rounded-lg border border-outline bg-surface-1">
              <div className="flex h-10 items-center justify-center text-xs" style={{ backgroundColor: "var(--warm-soft)" }} aria-hidden="true">▧</div>
              <div className="p-1.5">
                <p className="truncate text-[10px] font-semibold text-text-1">{n}</p>
                <p className="text-[10px] font-bold text-text-2">$89</p>
              </div>
            </div>
          ))}
        </div>
      )
    case "inmobiliarias":
      return (
        <div className="flex flex-col gap-2 p-3">
          {[
            { n: "Depto 2 amb. Recoleta", v: "$145.000", tone: "blue" },
            { n: "Casa Zona Norte", v: "$290.000", tone: "secondary" },
          ].map((p) => (
            <div key={p.n} className="flex items-center gap-2 rounded-lg border border-outline bg-surface-1 px-3 py-2">
              <span className="grid size-7 place-items-center rounded-md" style={{ backgroundColor: `var(--${p.tone}-soft)` }} aria-hidden="true">▤</span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-text-1">{p.n}</p>
                <p className="text-[10px] text-text-3">{p.v}</p>
              </div>
            </div>
          ))}
        </div>
      )
    case "educacion":
      return (
        <div className="flex flex-col gap-2 p-3">
          {[
            { n: "Introducción a UI/UX", p: 68, tone: "primary" },
            { n: "Producto digital", p: 91, tone: "accent" },
          ].map((c) => (
            <div key={c.n} className="rounded-lg border border-outline bg-surface-1 px-3 py-2">
              <div className="mb-1 flex justify-between text-[11px] text-text-2">
                {c.n} <span className="font-mono text-text-3">{c.p}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full" style={{ width: `${c.p}%`, backgroundColor: `var(--${c.tone})` }} />
              </div>
            </div>
          ))}
        </div>
      )
    case "talleres":
      return (
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-1">Órdenes de hoy</span>
            <StatusChip label="3 activas" tone="warning" dot={false} />
          </div>
          {[
            { d: "Cambio de frenos · Fiat Argo", s: "En taller", tone: "warning" },
            { d: "Alineación · VW Gol", s: "Listo", tone: "success" },
            { d: "Diagnóstico · Renault Kangoo", s: "Espera", tone: "info" },
          ].map((o) => (
            <div key={o.d} className="flex items-center justify-between gap-2 rounded-lg border border-outline bg-surface-1 px-3 py-2 text-[11px] text-text-2">
              <span className="truncate">{o.d}</span>
              <StatusChip label={o.s} tone={o.tone} dot={false} />
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

/**
 * Industrias como acordeón editorial estable. Sin stack ni sticky.
 */
export default function IndustryPreview() {
  const [open, setOpen] = useState("gastronomia")
  const industry = INDUSTRIES.find((i) => i.slug === open)
  const content = CONTENT[open]

  return (
    <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
      {/* Selector tipo acordeón */}
      <ul role="tablist" aria-label="Industrias" aria-orientation="vertical" className="flex flex-col gap-1">
        {INDUSTRIES.map((ind, idx) => {
          const active = open === ind.slug
          return (
            <li key={ind.slug}>
              <button
                type="button"
                role="tab"
                id={`ind-tab-${ind.slug}`}
                aria-selected={active}
                aria-controls={`ind-panel-${ind.slug}`}
                onClick={() => setOpen(ind.slug)}
                className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                  active
                    ? "border-transparent text-text-1 shadow-[var(--shadow-sm)]"
                    : "border-outline bg-surface-1/40 text-text-2 hover:border-outline-strong"
                }`}
                style={active ? { backgroundImage: "linear-gradient(120deg, var(--surface-elevated), var(--surface))", borderColor: ind.accent } : undefined}
              >
                <span className="font-mono text-xs text-text-4">{String(idx + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: ind.accent }} />
                <span className="flex-1">
                  <span className="block text-base font-semibold">{ind.label}</span>
                  <span className="block text-[13px] text-text-3">{ind.tagline}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-7 shrink-0 place-items-center rounded-full border border-outline text-text-2 transition-transform duration-300 ${active ? "rotate-90" : ""}`}
                >
                  ›
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Panel activo */}
      <div
        id={`ind-panel-${industry.slug}`}
        role="tabpanel"
        aria-labelledby={`ind-tab-${industry.slug}`}
        className="relative flex flex-col overflow-hidden rounded-3xl border border-outline bg-surface-1 shadow-[var(--shadow-md)]"
        key={industry.slug}
        style={{ borderTop: `3px solid ${industry.accent}` }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-outline px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-3">El problema</p>
            <p className="mt-1 max-w-md text-[15px] font-medium text-text-1">{content.problema}</p>
          </div>
          <span aria-hidden="true" className="hidden size-10 shrink-0 rounded-full opacity-20 sm:block" style={{ backgroundColor: industry.accent }} />
        </div>
        <div className="grid flex-1 gap-5 p-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-3">Producto posible</p>
            <p className="mt-2 text-sm leading-relaxed text-text-2">{content.producto}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.features.map((f) => (
                <li key={f} className="rounded-full border border-outline bg-surface-2/50 px-3 py-1 text-xs text-text-2">
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={industry.to}
              data-track={`industria_${industry.slug}`}
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Ver ejemplo
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-outline bg-surface-2/40">
            <div className="flex items-center gap-1.5 border-b border-outline px-3 py-2">
              <span className="size-2 rounded-full bg-[#ff747f]" />
              <span className="size-2 rounded-full bg-[#ffb45e]" />
              <span className="size-2 rounded-full bg-[#42d392]" />
              <span className="ml-2 font-mono text-[10px] text-text-4">vista CSS</span>
            </div>
            <MiniView slug={industry.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
