import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SectionIntro from "../ui/SectionIntro"
import DashboardShell from "../ui/DashboardShell"
import StatusChip from "../ui/StatusChip"
import ActivityFeed from "../ui/ActivityFeed"
import CssChart from "../ui/CssChart"
import CssKanban from "../ui/CssKanban"
import CssTable from "../ui/CssTable"

const VIEWS = [
  { id: "ventas", label: "Ventas", tone: "primary" },
  { id: "operaciones", label: "Operaciones", tone: "secondary" },
  { id: "clientes", label: "Clientes", tone: "accent" },
  { id: "proyectos", label: "Proyectos", tone: "blue" },
]

const FEED = {
  ventas: [
    { title: "Nuevo pago recibido", meta: "Plan Pro · $2.400", time: "12:04", tone: "success" },
    { title: "Cotización enviada", meta: "Café Central", time: "11:32", tone: "primary" },
    { title: "Cierre de venta", meta: "Estudio Norte", time: "10:15", tone: "accent" },
  ],
  operaciones: [
    { title: "Stock bajo", meta: "Aurora Lámpara", time: "12:10", tone: "warning" },
    { title: "Pedido despachado", meta: "Pedido #2041", time: "11:48", tone: "success" },
    { title: "Reposición sugerida", meta: "Nómade Mochila", time: "09:20", tone: "blue" },
  ],
  clientes: [
    { title: "Nuevo cliente", meta: "Lucía M. · Almacén", time: "12:01", tone: "success" },
    { title: "Ticket abierto", meta: "Soporte · Pago duplicado", time: "11:15", tone: "error" },
    { title: "Cumpleaños mañana", meta: "Ramiro P.", time: "10:40", tone: "accent" },
  ],
  proyectos: [
    { title: "Sprint terminado", meta: "App de reservas", time: "12:30", tone: "success" },
    { title: "Nueva tarea", meta: "Landing · SEO", time: "11:05", tone: "primary" },
    { title: "Revisión de diseño", meta: "Panel ventas", time: "09:55", tone: "warning" },
  ],
}

const KANBAN = {
  proyectos: [
    { title: "Por hacer", tone: "text-muted", cards: ["Brief", "Auditoría de datos"] },
    { title: "En curso", tone: "blue", cards: ["Diseño UI", "API turnos"] },
    { title: "Listo", tone: "success", cards: ["Wireframes", "Landing"] },
  ],
  operaciones: [
    { title: "Pendientes", tone: "warning", cards: ["Confirmar stock"] },
    { title: "En tránsito", tone: "blue", cards: ["Pedido #2041"] },
    { title: "Entregados", tone: "success", cards: ["Pedido #2038"] },
  ],
}

const TABLE_HEADERS = {
  ventas: ["Cliente", "Producto", "Fecha", "Estado"],
  operaciones: ["Pedido", "Producto", "Fecha", "Estado"],
  clientes: ["Cliente", "Rubro", "Alta", "Estado"],
  proyectos: ["Proyecto", "Rubro", "Avance", "Estado"],
}

export default function PlaygroundSection() {
  const [view, setView] = useState("ventas")

  const kpis = {
    ventas: [
      { k: "Ingresos", v: "$48.2k", t: "success" },
      { k: "Pedidos", v: "1.204", t: "primary" },
      { k: "Ticket medio", v: "$62", t: "accent" },
    ],
    operaciones: [
      { k: "En tránsito", v: "18", t: "blue" },
      { k: "Stock bajo", v: "6", t: "warning" },
      { k: "Entregas hoy", v: "23", t: "success" },
    ],
    clientes: [
      { k: "Activos", v: "486", t: "primary" },
      { k: "Nuevos (30d)", v: "52", t: "success" },
      { k: "Churn", v: "1.2%", t: "warning" },
    ],
    proyectos: [
      { k: "En curso", v: "7", t: "accent" },
      { k: "Completados", v: "34", t: "success" },
      { k: "Horas", v: "182", t: "blue" },
    ],
  }

  const chartData = {
    ventas: [
      { label: "L", value: 42, color: "var(--primary)" },
      { label: "M", value: 55, color: "var(--primary)" },
      { label: "M", value: 38, color: "var(--secondary)" },
      { label: "J", value: 66, color: "var(--secondary)" },
      { label: "V", value: 48, color: "var(--accent)" },
      { label: "S", value: 80, color: "var(--accent)" },
      { label: "D", value: 61, color: "var(--blue)" },
    ],
    operaciones: [
      { label: "L", value: 30, color: "var(--secondary)" },
      { label: "M", value: 44, color: "var(--secondary)" },
      { label: "M", value: 39, color: "var(--blue)" },
      { label: "J", value: 58, color: "var(--blue)" },
      { label: "V", value: 47, color: "var(--warning)" },
      { label: "S", value: 70, color: "var(--warning)" },
      { label: "D", value: 55, color: "var(--success)" },
    ],
    clientes: [
      { label: "L", value: 24, color: "var(--accent)" },
      { label: "M", value: 31, color: "var(--accent)" },
      { label: "M", value: 40, color: "var(--primary)" },
      { label: "J", value: 36, color: "var(--primary)" },
      { label: "V", value: 52, color: "var(--secondary)" },
      { label: "S", value: 45, color: "var(--secondary)" },
      { label: "D", value: 38, color: "var(--blue)" },
    ],
    proyectos: [
      { label: "L", value: 18, color: "var(--blue)" },
      { label: "M", value: 26, color: "var(--blue)" },
      { label: "M", value: 34, color: "var(--primary)" },
      { label: "J", value: 29, color: "var(--primary)" },
      { label: "V", value: 46, color: "var(--accent)" },
      { label: "S", value: 40, color: "var(--accent)" },
      { label: "D", value: 33, color: "var(--secondary)" },
    ],
  }

  const tableData = {
    ventas: [
      ["María L.", "Plan Pro", "12 may", "Pagado"],
      ["Café Central", "Sitio + turnos", "11 may", "Pagado"],
      ["Estudio Norte", "Dashboard", "10 may", "En proceso"],
    ],
    operaciones: [
      ["Pedido #2041", "Nómade", "Hoy", "En tránsito"],
      ["Pedido #2040", "Aurora", "Hoy", "Preparado"],
      ["Pedido #2039", "Terreno", "Ayer", "Entregado"],
    ],
    clientes: [
      ["Lucía M.", "Almacén", "12 may", "Nuevo"],
      ["Ramiro P.", "Estudio", "11 may", "Activo"],
      ["Club Ávila", "Club", "09 may", "Renovó"],
    ],
    proyectos: [
      ["App de reservas", "Comercio", "72%", "En curso"],
      ["Landing estudio", "PyMEs", "45%", "En curso"],
      ["Panel de ventas", "Retail", "88%", "Casi listo"],
    ],
  }

  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Dashboard playground"
        title={<>Probá un panel como el que podríamos construir para vos</>}
        lead="Cuatro vistas del mismo sistema de gestión. Cambiá de vista y mirá cómo se reorganizan los datos, los gráficos y las tablas."
      />

      <div className="container-wide mt-12">
        <div role="tablist" aria-label="Vistas del playground" className="mb-5 flex flex-wrap gap-2">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              aria-controls={`play-${v.id}`}
              onClick={() => setView(v.id)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 ${
                view === v.id ? "border-transparent text-white" : "border-outline bg-surface-1/60 text-text-2 hover:text-text-1"
              }`}
              style={view === v.id ? { backgroundColor: `var(--${v.tone})` } : undefined}
            >
              {v.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            id={`play-${view}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardShell title={`Vista · ${VIEWS.find((v) => v.id === view).label}`} kpi="Demo">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    {kpis[view].map((x) => (
                      <div key={x.k} className="rounded-xl border border-outline bg-surface-1 p-3">
                        <p className="text-[10px] uppercase tracking-wide text-text-3">{x.k}</p>
                        <p className="mt-1 text-base font-bold text-text-1">{x.v}</p>
                      </div>
                    ))}
                  </div>
                  <CssChart label={VIEWS.find((v) => v.id === view).label} height={120} data={chartData[view]} />
                  {view === "proyectos" || view === "operaciones" ? (
                    <div className="rounded-xl border border-outline bg-surface-1 p-2">
                      <CssKanban columns={KANBAN[view]} />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-outline bg-surface-1 overflow-hidden">
                      <CssTable rows={tableData[view]} headers={TABLE_HEADERS[view]} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl border border-outline bg-surface-1 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-3">Actividad</span>
                      <StatusChip label="En vivo" tone="success" />
                    </div>
                    <ActivityFeed items={FEED[view]} />
                  </div>
                </div>
              </div>
            </DashboardShell>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
