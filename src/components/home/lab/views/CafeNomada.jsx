import { useEffect, useMemo, useRef, useState } from "react"
import { Bell, Coffee, Search, TrendingUp } from "lucide-react"
import { Bar, Kpi, MiniBars, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const NAV = [
  { key: "resumen", label: "Resumen" },
  { key: "pedidos", label: "Pedidos" },
  { key: "menu", label: "Menú" },
  { key: "inventario", label: "Inventario" },
  { key: "clientes", label: "Clientes" },
  { key: "sitio", label: "Sitio web" },
]

const HOURS = ["10", "11", "12", "13", "14", "15", "16", "17", "18"]
const SALES = [26, 38, 52, 61, 44, 58, 79, 88, 64]

const KPIS = [
  { label: "Ventas del día", value: "$486.200", delta: 12 },
  { label: "Pedidos activos", value: "14", delta: 6 },
  { label: "Ticket promedio", value: "$5.788", delta: 3 },
  { label: "Tiempo de prep.", value: "8 min", delta: -12 },
]

const ORDERS = [
  { id: "#1084", name: "Fede L.", time: "14:32", items: "1× Flat White", status: "nueva" },
  { id: "#1083", name: "Martina G.", time: "14:18", items: "2 ítems", status: "preparando" },
  { id: "#1082", name: "Julián R.", time: "14:05", items: "3 ítems", status: "preparando" },
  { id: "#1081", name: "Sofía P.", time: "13:42", items: "1× Croissant", status: "lista" },
  { id: "#1080", name: "Diego M.", time: "13:20", items: "4 ítems", status: "lista" },
]

const TOP = [
  { name: "Flat White", pct: 38 },
  { name: "Croissant", pct: 24 },
  { name: "Latte", pct: 18 },
  { name: "Medialuna", pct: 12 },
]

const STOCK = [
  { name: "Café", val: "4.4", unit: "kg", tone: "error", tag: "Bajo stock" },
  { name: "Leche", val: "2.6", unit: "L", tone: "error", tag: "Bajo stock" },
  { name: "Croissant", val: "11", unit: "uds", tone: "acc-gestion", tag: "Quedan pocos" },
]

const statusInfo = {
  nueva: { label: "Nueva", tone: "acc-gastro" },
  preparando: { label: "En preparación", tone: "warning" },
  lista: { label: "Lista", tone: "acc-gestion" },
}

export default function CafeNomada({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [tab, setTab] = useState("resumen")
  const [orders, setOrders] = useState(ORDERS)
  const [stock, setStock] = useState(STOCK)
  const [toast, setToast] = useState(false)
  const [lastBar, setLastBar] = useState(8)

  const rowRef = useRef(null)
  const chartRef = useRef(null)
  const kpiRef = useRef(null)

  const advance = () => {
    setOrders((rows) =>
      rows.map((r) => {
        if (r.id === "#1084" && r.status === "nueva") return { ...r, status: "preparando" }
        if (r.status === "nueva") return { ...r, status: "preparando" }
        return r
      })
    )
    setStock((rows) => rows.map((r) => ({ ...r, val: r.unit === "L" ? "2.6" : r.unit === "kg" ? "4.4" : "11" })))
    setLastBar(9)
    setToast(true)
  }

  const steps = useMemo(
    () => [
      { at: 500, run: () => demo.getCursor()?.moveTo(kpiRef.current, { wait: 260 }) },
      { at: 1500, run: () => demo.getCursor()?.moveTo(rowRef.current, { wait: 200 }) },
      { at: 2600, run: () => { demo.getCursor()?.click(rowRef.current); advance() } },
      { at: 4200, run: () => demo.getCursor()?.moveTo(chartRef.current, { wait: 220, dur: 620 }) },
      { at: 6400, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2400, onComplete: demo.bump })

  useEffect(() => {
    setOrders(ORDERS)
    setStock(STOCK)
    setToast(false)
    setLastBar(8)
  }, [demo.cycle])

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="font-display text-[0.95em] font-bold">Café Nómada</p>
          <Pill tone={demo.tone} dot>En vivo</Pill>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] px-[1.2em] py-[0.9em]">
          <Kpi label="Ventas del día" value="$486.2k" delta={12} />
          <Kpi label="Pedidos activos" value="14" delta={6} />
          <Kpi label="Ticket promedio" value="$5.788" delta={3} />
          <Kpi label="Tiempo prep." value="8 min" delta={-12} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-[1.2em] pb-[1em]">
          <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
            <SectionHead title="Pedidos por hora" extra={<MiniBars data={SALES} tone={demo.tone} h={3.2} last={lastBar} />} />
          </div>
          <div className="mt-[0.7em] flex flex-col gap-[0.5em]">
            {ORDERS.slice(0, 3).map((o) => {
              const s = statusInfo[o.status]
              return (
                <div key={o.id} className="flex items-center gap-[0.6em] rounded-[0.7em] border border-outline bg-surface-1 px-[0.8em] py-[0.5em]">
                  <span className="font-mono text-[0.6em] text-text-3">{o.id}</span>
                  <span className="min-w-0 flex-1 truncate text-[0.7em] text-text-1">{o.name}</span>
                  <Pill tone={s.tone} dot>{s.label}</Pill>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <Sidebar tone={demo.tone} tab={tab} setTab={setTab} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar tone={demo.tone} />
        {toast && (
          <div className="absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="size-[0.6em] rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
              <span className="text-[0.7em] font-semibold">Pedido #1084 · En preparación</span>
              <span className="font-mono text-[0.6em] uppercase tracking-wider text-text-3">Inventario actualizado</span>
            </div>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
            {KPIS.map((k, i) => (
              <span key={k.label} ref={i === 0 ? kpiRef : undefined} className="block">
                <Kpi {...k} />
              </span>
            ))}
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-[1.25fr_1fr]">
            <div ref={chartRef} className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead
                title="Pedidos por hora"
                icon={<TrendingUp size="0.85em" />}
                extra={<Pill tone="acc-gestion" dot>En vivo</Pill>}
              />
              <div className="mt-[0.8em] flex h-[9em] items-end gap-[0.4em]">
                {SALES.map((v, i) => (
                  <span key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-[0.3em]">
                    <span
                      className="w-full rounded-[0.2em] transition-all duration-500"
                      style={{
                        height: `${(v / Math.max(...SALES)) * 100}%`,
                        backgroundColor: i === lastBar ? toneVar(demo.tone) : toneVar("text-4"),
                        opacity: i === lastBar ? 1 : 0.4,
                      }}
                    />
                    <span className="text-[0.52em] text-text-3">{HOURS[i]}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead
                title="Órdenes del mostrador"
                extra={
                  <div className="flex gap-[0.4em]">
                    <Pill tone="acc-gastro">Nuevas 1</Pill>
                    <Pill tone="warning">Preparando 2</Pill>
                  </div>
                }
              />
              <div className="mt-[0.7em] flex flex-col gap-[0.5em]">
                {orders.map((o) => {
                  const s = statusInfo[o.status]
                  return (
                    <div
                      key={o.id}
                      ref={o.id === "#1084" ? rowRef : undefined}
                      className={`flex cursor-pointer items-center gap-[0.6em] rounded-[0.6em] border px-[0.7em] py-[0.45em] transition-colors hover:bg-surface-2 ${
                        o.id === "#1084" ? "border-primary bg-primary-soft" : "border-outline bg-surface-1"
                      }`}
                    >
                      <span className="w-[3.4em] shrink-0 font-mono text-[0.62em] font-semibold" style={{ color: o.id === "#1084" ? toneVar(demo.tone) : "var(--color-text-3)" }}>
                        {o.id}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.68em] font-medium">{o.name}</span>
                      <span className="hidden text-[0.58em] text-text-3 md:inline">{o.items}</span>
                      <Pill tone={s.tone} dot>{s.label}</Pill>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] xl:grid-cols-2">
            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Productos más vendidos" extra={<span className="text-[0.58em] text-text-3">Hoy</span>} />
              <div className="mt-[0.7em] flex flex-col gap-[0.55em]">
                {TOP.map((p) => (
                  <div key={p.name} className="flex items-center gap-[0.6em]">
                    <span className="w-[6.5em] shrink-0 truncate text-[0.66em] text-text-1">{p.name}</span>
                    <Bar value={p.pct * 2.4} tone={demo.tone} />
                    <span className="w-[2.4em] shrink-0 text-right font-mono text-[0.58em] text-text-3">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
              <SectionHead title="Alertas de stock" extra={<Pill tone="warning">3 activas</Pill>} />
              <div className="mt-[0.7em] flex flex-col gap-[0.5em]">
                {stock.map((s) => (
                  <div key={s.name} className="flex items-center gap-[0.6em]">
                    <span className="w-[6.5em] shrink-0 truncate text-[0.66em] text-text-1">{s.name}</span>
                    <span className="w-[4em] shrink-0 font-mono text-[0.62em] text-text-2">{s.val} {s.unit}</span>
                    <Pill tone={s.tone}>{s.tag}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ tone, tab, setTab }) {
  return (
    <aside className="hidden w-[11em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] md:flex">
      <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
        <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-[0.8em] text-white" style={{ backgroundColor: toneVar(tone) }}>
          <Coffee size="0.9em" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.8em] font-bold leading-none">Café Nómada</p>
          <p className="text-[0.55em] text-text-3">Sucursal Palermo</p>
        </div>
      </div>
      <nav className="flex flex-col gap-[0.25em]">
        {NAV.map((n) => {
          const active = tab === n.key
          return (
            <button
              key={n.key}
              type="button"
              onClick={() => setTab(n.key)}
              className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] transition-colors"
              style={{
                backgroundColor: active ? toneSoft(tone) : "transparent",
                color: active ? toneVar(tone) : "var(--color-text-2)",
                fontWeight: active ? 700 : 500,
              }}
            >
              <span className="size-[0.4em] rounded-full" style={{ backgroundColor: active ? toneVar(tone) : "var(--color-text-4)" }} />
              <span className="flex-1">{n.label}</span>
              {n.key === "pedidos" && <span className="font-mono text-[0.58em] text-text-3">84</span>}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(tone) }}>
        <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(tone) }}>Stock crítico</p>
        <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">3 productos · reponer hoy</p>
      </div>
    </aside>
  )
}

function Topbar({ tone }) {
  return (
    <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
      <div>
        <p className="text-[0.78em] font-bold leading-none">Resumen</p>
        <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Panel de gestión · 14:32</p>
      </div>
      <div className="flex items-center gap-[0.5em]">
        <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
          <Search size="0.8em" /> Buscar pedido, cliente o producto…
        </span>
        <span className="relative grid size-[1.8em] place-items-center rounded-[0.5em] border border-outline text-text-2">
          <Bell size="0.8em" />
          <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.85em] place-items-center rounded-full text-[0.5em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>3</span>
        </span>
        <span className="grid size-[1.8em] place-items-center rounded-full text-[0.62em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>N</span>
      </div>
    </div>
  )
}
