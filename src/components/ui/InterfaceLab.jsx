import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import BrowserWindow from "./BrowserWindow"
import StatusChip from "./StatusChip"
import CssChart from "./CssChart"
import CssCalendar from "./CssCalendar"
import CssKanban from "./CssKanban"
import CssTable from "./CssTable"

const MODES = [
  { id: "ecommerce", label: "Ecommerce", tone: "accent" },
  { id: "ventas", label: "Dashboard de ventas", tone: "primary" },
  { id: "turnos", label: "Agenda y turnos", tone: "secondary" },
  { id: "proyectos", label: "Gestión de proyectos", tone: "warning" },
  { id: "inmob", label: "Portal inmobiliario", tone: "blue" },
  { id: "educacion", label: "Plataforma educativa", tone: "accent" },
]

export default function InterfaceLab() {
  const [active, setActive] = useState("ecommerce")
  const mode = MODES.find((m) => m.id === active)

  return (
    <div className="container-wide flex flex-col gap-6">
      {/* Controles junto a la escena */}
      <div
        role="tablist"
        aria-label="Laboratorio de interfaces"
        className="flex flex-wrap gap-2"
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active === m.id}
            aria-controls={`lab-${m.id}`}
            onClick={() => setActive(m.id)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 ${
              active === m.id
                ? "border-transparent text-white"
                : "border-outline bg-surface-1/60 text-text-2 hover:border-outline-strong hover:text-text-1"
            }`}
            style={active === m.id ? { backgroundImage: "var(--gradient-primary)" } : undefined}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full"
              style={{ backgroundColor: active === m.id ? "#fff" : `var(--${m.tone})` }}
            />
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`lab-${active}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserWindow url={`app.fleximy.dev/${active}`} tone={mode.tone}>
              {active === "ecommerce" && <EcommerceScene />}
              {active === "ventas" && <VentasScene />}
              {active === "turnos" && <TurnosScene />}
              {active === "proyectos" && <ProyectosScene />}
              {active === "inmob" && <InmobScene />}
              {active === "educacion" && <EducacionScene />}
            </BrowserWindow>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden="true" className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-40 blur-2xl" style={{ backgroundImage: `var(--gradient-primary)` }} />
      </div>
    </div>
  )
}

/* ===== Escenas ===== */

function EcommerceScene() {
  const products = [
    { name: "Aurora Lámpara", price: "$89", tone: "accent" },
    { name: "Nómade Mochila", price: "$120", tone: "secondary" },
    { name: "Lumen Taza", price: "$24", tone: "warning" },
    { name: "Terreno Mesa", price: "$340", tone: "blue" },
  ]
  return (
    <div className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-text-1">Tienda</p>
          <p className="text-[11px] text-text-3">Catálogo en vivo</p>
        </div>
        <span className="relative rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="inline -mt-0.5 mr-1.5">
            <path d="M6 7h13l-1.5 8h-10L6 7Zm0 0 1-3h4M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          3
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {products.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-xl border border-outline bg-surface-1">
            <div className="flex h-16 items-center justify-center text-2xl" style={{ backgroundColor: `var(--${p.tone}-soft)` }} aria-hidden="true">
              <span className="rounded-lg bg-surface-1 px-2 py-1 font-mono text-[10px]" style={{ color: `var(--${p.tone})` }}>
                img
              </span>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-semibold leading-tight text-text-1">{p.name}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs font-bold text-text-1">{p.price}</span>
                <button
                  type="button"
                  className="grid size-6 place-items-center rounded-md text-[11px] text-white transition-transform hover:scale-110"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VentasScene() {
  const data = [
    { label: "L", value: 42, color: "var(--primary)" },
    { label: "M", value: 55, color: "var(--primary)" },
    { label: "M", value: 38, color: "var(--secondary)" },
    { label: "J", value: 66, color: "var(--secondary)" },
    { label: "V", value: 48, color: "var(--accent)" },
    { label: "S", value: 80, color: "var(--accent)" },
    { label: "D", value: 61, color: "var(--blue)" },
  ]
  const rows = [
    ["María L.", "Plan Pro", "12 may", "Pagado"],
    ["Café Central", "Sitio + turnos", "11 may", "Pagado"],
    ["Estudio Norte", "Dashboard", "10 may", "En proceso"],
    ["Club Ávila", "Plataforma", "09 may", "Pendiente"],
  ]
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1.2fr] sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { k: "Ingresos", v: "$48.2k", t: "success" },
            { k: "Pedidos", v: "1.204", t: "primary" },
          ].map((x) => (
            <div key={x.k} className="rounded-xl border border-outline bg-surface-1 p-3">
              <p className="text-[10px] uppercase tracking-wide text-text-3">{x.k}</p>
              <p className="mt-1 text-base font-bold text-text-1">{x.v}</p>
            </div>
          ))}
        </div>
        <CssChart data={data} label="Ventas semanales" height={110} />
      </div>
      <CssTable rows={rows} />
    </div>
  )
}

function TurnosScene() {
  const events = [
    { day: 3, tone: "secondary" },
    { day: 12, tone: "accent" },
    { day: 18, tone: "warning" },
    { day: 27, tone: "blue" },
  ]
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
      <CssCalendar month="Mayo" year={2026} events={events} />
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-text-2">Próximos turnos</p>
        {[
          { who: "Sofía G.", what: "Corte + peinado", when: "Hoy 16:30", tone: "success" },
          { who: "Ramiro P.", what: "Pulido de uñas", when: "Hoy 18:00", tone: "warning" },
          { who: "Lucía M.", what: "Tinte balayage", when: "Mañana 10:00", tone: "info" },
        ].map((t) => (
          <div key={t.who} className="flex items-center gap-3 rounded-xl border border-outline bg-surface-1 p-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: `var(--${t.tone})` }}>
              {t.who[0]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-text-1">{t.who}</p>
              <p className="truncate text-[11px] text-text-3">{t.what} · {t.when}</p>
            </div>
            <StatusChip label="Confirmado" tone={t.tone} dot={false} />
          </div>
        ))}
        <button type="button" className="mt-auto h-10 rounded-lg text-xs font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
          + Nuevo turno
        </button>
      </div>
    </div>
  )
}

function ProyectosScene() {
  const cols = [
    { title: "Por hacer", tone: "text-muted", cards: ["Brief del cliente", "Auditoría de datos"] },
    { title: "En curso", tone: "blue", cards: ["Diseño UI", "API de turnos"] },
    { title: "Listo", tone: "success", cards: ["Wireframes", "Landing"] },
  ]
  const proj = [
    { name: "Panel de ventas", pct: 72, tone: "primary" },
    { name: "Landing estudio", pct: 45, tone: "secondary" },
    { name: "App de reservas", pct: 88, tone: "accent" },
  ]
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5">
      <div className="flex flex-col gap-2">
        {proj.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-xs font-medium text-text-2">{p.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: `var(--${p.tone})`, animation: reduced ? undefined : "grow-bar 0.8s var(--motion-ease)" }} />
            </div>
            <span className="w-8 text-right font-mono text-[11px] text-text-3">{p.pct}%</span>
          </div>
        ))}
      </div>
      <CssKanban columns={cols} />
    </div>
  )
}

function InmobScene() {
  const props = [
    { name: "Depto 2 amb. Recoleta", price: "$145.000", tone: "blue", tag: "Destacado" },
    { name: "Casa 4 dorm. Zona Norte", price: "$290.000", tone: "secondary", tag: "Nuevo" },
  ]
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
      {props.map((p) => (
        <div key={p.name} className="overflow-hidden rounded-xl border border-outline bg-surface-1">
          <div className="relative flex h-20 items-center justify-center" style={{ backgroundColor: `var(--${p.tone}-soft)` }} aria-hidden="true">
            <span className="rounded-lg bg-surface-1 px-2 py-1 font-mono text-[10px]" style={{ color: `var(--${p.tone})` }}>foto</span>
            <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white" style={{ backgroundColor: `var(--${p.tone})` }}>
              {p.tag}
            </span>
          </div>
          <div className="p-3">
            <p className="text-xs font-semibold leading-tight text-text-1">{p.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-text-1">{p.price}</span>
              <button type="button" className="h-8 rounded-lg px-3 text-[11px] font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
                Consultar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EducacionScene() {
  const courses = [
    { name: "Introducción a UI/UX", pct: 68, tone: "primary" },
    { name: "Diseño de sistemas", pct: 34, tone: "secondary" },
    { name: "Producto digital", pct: 91, tone: "accent" },
  ]
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-text-1">Mis cursos</p>
        <StatusChip label="2 certificados" tone="success" dot={false} />
      </div>
      {courses.map((c) => (
        <div key={c.name} className="flex items-center gap-3 rounded-xl border border-outline bg-surface-1 p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg text-sm" style={{ backgroundColor: `var(--${c.tone}-soft)`, color: `var(--${c.tone})` }}>
            ▤
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between">
              <p className="truncate text-xs font-semibold text-text-1">{c.name}</p>
              <span className="font-mono text-[11px] text-text-3">{c.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: `var(--${c.tone})` }} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="h-10 rounded-lg text-xs font-semibold text-white" style={{ backgroundImage: "var(--gradient-primary)" }}>
        Explorar catálogo
      </button>
    </div>
  )
}

const reduced =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
