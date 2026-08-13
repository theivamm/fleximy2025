import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import CursorLayer from "./AnimatedCursor"
import { useMediaQuery, useTimeline, useVisibility } from "./hooks"

/* Interfaz de Café Nómada construida con los tokens del tema de Fleximy:
   superficies y textos propios de cada modo (dark/light) + acentos de marca. */
const C = {
  cream: "var(--color-surface-2)",
  creamSoft: "var(--color-surface-1)",
  creamDeep: "var(--color-surface-3)",
  espresso: "var(--color-text-1)",
  espressoSoft: "var(--color-text-2)",
  espressoMuted: "var(--color-text-3)",
  coral: "var(--color-accent)",
  sage: "var(--color-success)",
  sageSoft: "var(--color-success-soft)",
  line: "var(--color-outline)",
  lineStrong: "var(--color-outline-strong)",
}

const soft = (c) => `color-mix(in srgb, ${c} 15%, transparent)`

const NAV = [
  { key: "resumen", label: "Resumen" },
  { key: "pedidos", label: "Pedidos", badge: "84" },
  { key: "menu", label: "Menú" },
  { key: "inventario", label: "Inventario", badge: "3" },
  { key: "clientes", label: "Clientes" },
  { key: "sitio", label: "Sitio web" },
]

const HOURS = ["9", "10", "11", "12", "13", "14", "15", "16"]
const BARS = { before: [7, 9, 10, 12, 11, 13, 12, 10], after: [7, 9, 10, 12, 11, 13, 12, 11] }

const KPIS = [
  { label: "Ventas de hoy", before: "$476.400", after: "$486.200", delta: "+12%" },
  { label: "Pedidos", before: "83", after: "84", delta: "+6 hoy" },
  { label: "Ticket promedio", before: "$5.788", after: "$5.788", delta: "+3%" },
  { label: "Tiempo promedio", before: "8 min", after: "8 min", delta: "-12%" },
]

const RECENT = [
  { id: "#1083", name: "Martina G.", time: "14:18", items: 2, status: "Entregado", tone: C.sage },
  { id: "#1082", name: "Julián R.", time: "14:05", items: 3, status: "En preparación", tone: C.coral },
  { id: "#1081", name: "Sofía P.", time: "13:42", items: 1, status: "Entregado", tone: C.sage },
  { id: "#1080", name: "Diego M.", time: "13:20", items: 4, status: "Entregado", tone: C.sage },
]

const PRODUCTS = [
  { name: "Flat White", pct: 38, tone: C.coral },
  { name: "Croissant", pct: 24, tone: C.sage },
  { name: "Latte", pct: 18, tone: C.espresso },
  { name: "Tostado", pct: 12, tone: C.espressoSoft },
  { name: "Medialuna", pct: 8, tone: C.creamDeep },
]

const INVENTORY = [
  { name: "Café", before: "4.6", after: "4.4", unit: "kg", tag: "Bajo stock", tone: C.coral },
  { name: "Leche", before: "2.9", after: "2.6", unit: "L", tag: "Bajo stock", tone: C.coral },
  { name: "Croissant", before: "12", after: "11", unit: "uds", tag: "Quedan pocos", tone: C.sage },
]

const TEASER = [
  { name: "Flat White", price: "$4.500" },
  { name: "Latte", price: "$4.000" },
  { name: "Croissant", price: "$5.300" },
  { name: "Tostado", price: "$6.200" },
]

const MENU_ITEMS = [
  { name: "Flat White", desc: "Double shot · leche", price: "$4.500", tone: C.coral },
  { name: "Latte", desc: "Espresso · leche", price: "$4.000", tone: C.espressoSoft },
  { name: "Cortado", desc: "Short · poca leche", price: "$3.200", tone: C.espressoMuted },
  { name: "Croissant", desc: "Manteca · artesanal", price: "$5.300", tone: C.sage },
  { name: "Tostado", desc: "Palta · tomate", price: "$6.200", tone: C.coral },
  { name: "Medialuna", desc: "De manteca", price: "$2.800", tone: C.espresso },
]

const CLIENTS = [
  { name: "Martina G.", visits: 24, last: "14:18 hoy", tone: C.coral },
  { name: "Julián R.", visits: 17, last: "14:05 hoy", tone: C.sage },
  { name: "Sofía P.", visits: 31, last: "13:42 hoy", tone: C.espresso },
  { name: "Diego M.", visits: 9, last: "13:20 hoy", tone: C.espressoMuted },
]

const ORDER_ROW = { id: "#1084", name: "Fede L.", time: "14:32", items: 2 }

export default function CafeNomadaApp() {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const bindCursor = useCallback((c) => {
    cursorRef.current = c
  }, [])

  const visible = useVisibility(containerRef)
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  const coarse = useMediaQuery("(pointer: coarse)")
  const isMd = useMediaQuery("(min-width: 768px)")

  /* La secuencia animada corre solo en desktop/touchpad fino y con motion normal.
     En mobile, touch o reduced-motion se muestra el estado final estático. */
  const canSequence = !reduced && !coarse && isMd
  const active = canSequence && visible
  const staticFinal = !canSequence

  const [phase, setPhase] = useState("landing")
  const [cart, setCart] = useState({ flatWhite: 0, croissant: 0 })
  const [confirming, setConfirming] = useState(false)
  const [orderReady, setOrderReady] = useState(false)
  const [orderStatus, setOrderStatus] = useState("nuevo")
  const [decremented, setDecremented] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [connected, setConnected] = useState(false)
  const [cycle, setCycle] = useState(0)

  const hacerPedidoRef = useRef(null)
  const flatWhiteRef = useRef(null)
  const croissantRef = useRef(null)
  const confirmarRef = useRef(null)
  const orderRowRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    setPhase("landing")
    setCart({ flatWhite: 0, croissant: 0 })
    setConfirming(false)
    setOrderReady(false)
    setOrderStatus("nuevo")
    setDecremented(false)
    setUpdated(false)
    setConnected(false)
  }, [cycle])

  const steps = useMemo(
    () => [
      { at: 700, run: () => cursorRef.current?.moveTo(hacerPedidoRef.current, { wait: 220 }) },
      { at: 1600, run: () => cursorRef.current?.click(hacerPedidoRef.current) },
      { at: 2400, run: () => setPhase("menu") },
      { at: 3000, run: () => cursorRef.current?.moveTo(flatWhiteRef.current, { wait: 160 }) },
      { at: 3800, run: () => { setCart((c) => ({ ...c, flatWhite: 1 })); cursorRef.current?.click(flatWhiteRef.current) } },
      { at: 4300, run: () => cursorRef.current?.moveTo(croissantRef.current, { wait: 160 }) },
      { at: 5100, run: () => { setCart((c) => ({ ...c, croissant: 1 })); cursorRef.current?.click(croissantRef.current) } },
      { at: 5700, run: () => cursorRef.current?.moveTo(confirmarRef.current, { wait: 220 }) },
      { at: 6500, run: () => { setConfirming(true); cursorRef.current?.click(confirmarRef.current) } },
      { at: 7300, run: () => { setPhase("panel"); setOrderReady(true); cursorRef.current?.fadeOut(240) } },
      { at: 8000, run: () => cursorRef.current?.moveTo(orderRowRef.current, { wait: 120, dur: 640 }) },
      { at: 8800, run: () => setOrderStatus("preparacion") },
      { at: 9600, run: () => cursorRef.current?.moveTo(chartRef.current, { wait: 120, dur: 640 }) },
      { at: 10400, run: () => setDecremented(true) },
      { at: 11000, run: () => setUpdated(true) },
      { at: 11800, run: () => setConnected(true) },
      { at: 13800, run: () => cursorRef.current?.fadeOut(420) },
    ],
    []
  )

  useTimeline({ active, cycle, steps, hold: 3200, onComplete: () => setCycle((c) => c + 1) })

  const showPhase = staticFinal ? "panel" : phase
  const showOrder = staticFinal || orderReady
  const showStatus = staticFinal ? "preparacion" : orderStatus
  const showUpdated = staticFinal || updated
  const showDecremented = staticFinal || decremented
  const showConnected = staticFinal || connected

  return (
    <div
      ref={containerRef}
      className="relative h-[min(620px,calc(100svh-190px))] min-h-[440px] overflow-hidden rounded-2xl border border-outline bg-surface-1 shadow-[var(--shadow-lg)]"
    >
      {/* Chrome de ventana (marco adaptado al tema, acento Fleximy) */}
      <div className="flex h-11 items-center gap-2 border-b border-outline bg-surface-1 px-4">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: C.coral }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: C.sage }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: C.espressoMuted }} />
        </span>
        <span className="ml-2 truncate text-xs font-semibold text-text-1">Café Nómada · Panel</span>
        <span
          className="ml-auto hidden shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-white sm:inline-block"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          Diseñado con Fleximy
        </span>
      </div>

      {/* Aplicación (interior crema, paleta de cafetería) */}
      <div className="relative h-[calc(100%-44px)] overflow-hidden" style={{ backgroundColor: C.cream }}>
        {showPhase === "landing" && (
          <Landing
            onOrder={() => setPhase("menu")}
            hacerPedidoRef={hacerPedidoRef}
          />
        )}
        {showPhase === "menu" && (
          <Ordering
            cart={cart}
            confirming={confirming}
            onAdd={(key) => setCart((c) => ({ ...c, [key]: 1 }))}
            onConfirm={() => setConfirming(true)}
            onBack={() => setPhase("landing")}
            flatWhiteRef={flatWhiteRef}
            croissantRef={croissantRef}
            confirmarRef={confirmarRef}
          />
        )}
        {showPhase === "panel" && (
          <Panel
            showOrder={showOrder}
            showStatus={showStatus}
            showUpdated={showUpdated}
            showDecremented={showDecremented}
            orderRowRef={orderRowRef}
            chartRef={chartRef}
            onOpenSite={() => setPhase("landing")}
          />
        )}

        {showConnected && <ConnectedToast />}
      </div>

      <CursorLayer
        containerRef={containerRef}
        bindController={bindCursor}
        className="hidden md:block"
      />
    </div>
  )
}

/* ================= Landing ================= */

function Landing({ onOrder, hacerPedidoRef }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5 sm:px-5" style={{ borderColor: C.line }}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg text-primary-on" style={{ backgroundColor: "var(--color-primary)" }}>
            <CupMark />
          </span>
          <span className="truncate font-display text-[13px] font-bold tracking-tight" style={{ color: C.espresso }}>
            Café Nómada
          </span>
        </div>
        <nav className="hidden items-center gap-3.5 text-[10px] font-medium sm:flex" style={{ color: C.espressoSoft }}>
          <span>Menú</span>
          <span>Nosotros</span>
          <span>Sucursales</span>
        </nav>
        <button
          type="button"
          className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold text-accent-on"
          style={{ backgroundColor: C.coral }}
        >
          Hacer pedido
        </button>
      </div>

      <div className="grid gap-3 px-4 py-4 sm:grid-cols-[1.15fr_1fr] sm:items-center sm:px-5 sm:py-5">
        <div className="flex flex-col gap-2.5">
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider"
            style={{ borderColor: C.lineStrong, color: C.espressoSoft }}
          >
            <span className="size-1 rounded-full" style={{ backgroundColor: C.sage }} />
            Café de especialidad
          </span>
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight sm:text-[22px]" style={{ color: C.espresso }}>
            Tu café de especialidad, al ritmo de tu día.
          </h3>
          <p className="text-[11px] leading-relaxed sm:text-[12px]" style={{ color: C.espressoSoft }}>
            Granos de origen, tostados en casa. Pedí en línea y retirá sin filas.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              ref={hacerPedidoRef}
              type="button"
              onClick={onOrder}
              className="rounded-full px-3.5 py-1.5 text-[11px] font-bold text-accent-on transition-transform duration-150 active:scale-[0.97]"
              style={{ backgroundColor: C.coral }}
            >
              Hacer pedido
            </button>
            <span className="rounded-full border px-3.5 py-1.5 text-[11px] font-semibold" style={{ borderColor: C.lineStrong, color: C.espresso }}>
              Ver menú
            </span>
          </div>
        </div>
        <div className="relative hidden h-44 items-center justify-center sm:flex">
          <CoffeeCup className="w-36" />
          <FloatChip className="left-0 top-1" name="Flat White" price="$4.500" tone={C.coral} />
          <FloatChip className="bottom-2 right-0" name="Croissant" price="$5.300" tone={C.sage} />
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 px-4 pb-4 sm:grid-cols-4 sm:px-5">
        {TEASER.map((t) => (
          <div key={t.name} className="flex items-center justify-between gap-1 rounded-lg border px-2.5 py-2" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
            <span className="truncate text-[10px] font-semibold" style={{ color: C.espresso }}>{t.name}</span>
            <span className="shrink-0 font-mono text-[9px]" style={{ color: C.espressoMuted }}>{t.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================= Pedido ================= */

function Ordering({ cart, confirming, onAdd, onConfirm, onBack, flatWhiteRef, croissantRef, confirmarRef }) {
  const lines = []
  if (cart.flatWhite) lines.push("1× Flat White")
  if (cart.croissant) lines.push("1× Croissant")
  const hasItems = cart.flatWhite || cart.croissant

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5 sm:px-5" style={{ borderColor: C.line }}>
        <button type="button" onClick={onBack} className="rounded-full px-2 py-1 text-[10px] font-semibold transition-colors" style={{ color: C.espressoSoft }}>
          ← Volver
        </button>
        <span className="font-display text-[13px] font-bold tracking-tight" style={{ color: C.espresso }}>
          Arma tu pedido
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>
          Retiro · 14:32
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
          {MENU_ITEMS.map((item) => (
            <MenuItemCard
              key={item.name}
              item={item}
              added={item.name === "Flat White" ? cart.flatWhite : item.name === "Croissant" ? cart.croissant : false}
              onAdd={() => {
                if (item.name === "Flat White") onAdd("flatWhite")
                if (item.name === "Croissant") onAdd("croissant")
              }}
              innerRef={item.name === "Flat White" ? flatWhiteRef : item.name === "Croissant" ? croissantRef : undefined}
            />
          ))}
        </div>
      </div>

      <div className="border-t px-4 py-3 sm:px-5" style={{ borderColor: C.line }}>
        {hasItems ? (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold" style={{ color: C.espresso }}>Tu pedido</p>
              <p className="truncate text-[10px]" style={{ color: C.espressoSoft }}>{lines.join(" · ")} · <span className="font-mono font-semibold" style={{ color: C.espresso }}>$9.800</span></p>
            </div>
            <button
              ref={confirmarRef}
              type="button"
              onClick={onConfirm}
              className="shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold text-accent-on transition-transform duration-150 active:scale-[0.97]"
              style={{ backgroundColor: C.coral }}
            >
              Confirmar · $9.800
            </button>
          </div>
        ) : (
          <p className="text-center text-[11px]" style={{ color: C.espressoMuted }}>
            Tu pedido está vacío · elegí algo del menú
          </p>
        )}
      </div>

      {confirming && <ConfirmOverlay />}
    </div>
  )
}

function ConfirmOverlay() {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center p-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-1) 94%, transparent)" }}>
      <div className="flex animate-[scale-in_0.4s_var(--motion-ease)] flex-col items-center gap-2 text-center">
        <span className="grid size-12 place-items-center rounded-full text-success-on" style={{ backgroundColor: "var(--color-success)" }}>
          <CheckSvg size={20} />
        </span>
        <p className="font-display text-base font-bold" style={{ color: C.espresso }}>¡Pedido #1084 confirmado!</p>
        <p className="text-[11px]" style={{ color: C.espressoSoft }}>
          Flat White + Croissant · $9.800 · Retiro 14:45
        </p>
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.sage }}>
          Preparando tu café…
        </p>
      </div>
    </div>
  )
}

/* ================= Panel ================= */

const TAB_TITLES = {
  resumen: ["Resumen", "Panel de gestión"],
  pedidos: ["Pedidos", "84 hoy"],
  menu: ["Menú", "6 productos"],
  inventario: ["Inventario", "3 alertas"],
  clientes: ["Clientes", "Fidelizados"],
  sitio: ["Sitio web", "Café Nómada"],
}

function Panel({ showOrder, showStatus, showUpdated, showDecremented, orderRowRef, chartRef, onOpenSite }) {
  const [tab, setTab] = useState("resumen")
  return (
    <div className="flex h-full">
      <SidebarNav tab={tab} setTab={setTab} className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <PanelTopbar title={TAB_TITLES[tab][0]} sub={TAB_TITLES[tab][1]} />
        <TabChips tab={tab} setTab={setTab} className="md:hidden" />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          {tab === "resumen" && (
            <ResumenView
              showUpdated={showUpdated}
              showDecremented={showDecremented}
              showOrder={showOrder}
              showStatus={showStatus}
              orderRowRef={orderRowRef}
              chartRef={chartRef}
            />
          )}
          {tab === "pedidos" && <PedidosView showOrder={showOrder} showStatus={showStatus} orderRowRef={orderRowRef} />}
          {tab === "menu" && <MenuView />}
          {tab === "inventario" && <InventarioView decremented={showDecremented} />}
          {tab === "clientes" && <ClientesView />}
          {tab === "sitio" && <SitioView onOpenSite={onOpenSite} />}
        </div>
      </div>
    </div>
  )
}

function SidebarNav({ tab, setTab, className = "" }) {
  return (
    <aside className={`w-36 shrink-0 flex-col border-r p-3 ${className}`} style={{ borderColor: C.line, backgroundColor: C.creamDeep }}>
      <div className="flex items-center gap-2 px-1 py-1">
        <span className="grid size-6 place-items-center rounded-lg text-primary-on" style={{ backgroundColor: "var(--color-primary)" }}>
          <CupMark />
        </span>
        <span className="font-display text-[11px] font-bold tracking-tight" style={{ color: C.espresso }}>Café Nómada</span>
      </div>
      <nav className="mt-2 flex flex-col gap-0.5">
        {NAV.map((item) => {
          const active = tab === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] transition-colors"
              style={{
                color: active ? C.espresso : C.espressoMuted,
                backgroundColor: active ? C.cream : "transparent",
                fontWeight: active ? 700 : 500,
                boxShadow: active ? `inset 0 0 0 1px ${C.line}` : "none",
              }}
            >
              <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.key === "resumen" ? C.coral : item.key === "pedidos" ? C.sage : C.espressoMuted }} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full px-1.5 py-0.5 font-mono text-[9px] font-semibold" style={{ backgroundColor: C.sageSoft, color: C.sage }}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto rounded-xl p-2.5" style={{ backgroundColor: C.sageSoft }}>
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.sage }}>Sucursal Palermo</p>
        <p className="text-[11px] font-semibold" style={{ color: C.espresso }}>Hoy · 14:32</p>
      </div>
    </aside>
  )
}

function TabChips({ tab, setTab, className = "" }) {
  return (
    <div className={`flex gap-1.5 overflow-x-auto px-4 py-2 ${className}`} style={{ backgroundColor: C.creamDeep }}>
      {NAV.map((item) => {
        const active = tab === item.key
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors"
            style={{
              color: active ? C.espresso : C.espressoMuted,
              backgroundColor: active ? C.cream : "transparent",
              boxShadow: active ? `inset 0 0 0 1px ${C.line}` : "none",
            }}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function PanelTopbar({ title, sub }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5" style={{ borderColor: C.line }}>
      <div className="min-w-0">
        <p className="font-display text-[13px] font-bold tracking-tight" style={{ color: C.espresso }}>{title}</p>
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>{sub}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] sm:flex" style={{ borderColor: C.line, color: C.espressoMuted }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Buscar…
        </span>
        <span className="grid size-7 place-items-center rounded-full text-[10px] font-bold text-accent-on" style={{ backgroundColor: C.coral }}>
          N
        </span>
      </div>
    </div>
  )
}

function ResumenView({ showUpdated, showDecremented, showOrder, showStatus, orderRowRef, chartRef }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} label={k.label} value={showUpdated ? k.after : k.before} delta={k.delta} />
        ))}
      </div>

      <ChartCard updated={showUpdated} chartRef={chartRef} />

      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-2">
        <OrdersCard showOrder={showOrder} status={showStatus} orderRowRef={orderRowRef} />
        <ProductsCard />
      </div>

      <InventoryCard decremented={showDecremented} />
    </>
  )
}

function PedidosView({ showOrder, showStatus, orderRowRef }) {
  const allOrders = []
  if (showOrder) allOrders.push({ ...ORDER_ROW, isNew: true })
  allOrders.push(...RECENT)
  allOrders.push({ id: "#1079", name: "Ana L.", time: "12:55", items: 2, status: "Entregado", tone: C.sage })
  allOrders.push({ id: "#1078", name: "Pedro C.", time: "12:31", items: 1, status: "Entregado", tone: C.sage })
  return (
    <div className="flex flex-col gap-1.5">
      {allOrders.map((row) => {
        const isNew = row.isNew
        const rowStatus = isNew ? showStatus : row.status
        const rowTone = isNew ? (showStatus === "preparacion" ? C.coral : C.espressoMuted) : row.tone
        return (
          <div
            key={row.id}
            ref={isNew ? orderRowRef : undefined}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${isNew ? "animate-[fade-up_0.5s_var(--motion-ease)]" : ""}`}
            style={{ borderColor: isNew ? "var(--color-primary)" : C.line, backgroundColor: isNew ? "var(--color-primary-soft)" : C.creamSoft }}
          >
            <span className="w-10 shrink-0 font-mono text-[10px] font-semibold" style={{ color: isNew ? C.coral : C.espressoMuted }}>{row.id}</span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-medium" style={{ color: C.espresso }}>{row.name}</span>
            <span className="font-mono text-[10px]" style={{ color: C.espressoMuted }}>{row.time}</span>
            <span className="hidden font-mono text-[10px] sm:inline" style={{ color: C.espressoMuted }}>{row.items} ítems</span>
            <OrderPill status={rowStatus} tone={rowTone} pulse={isNew} />
          </div>
        )
      })}
    </div>
  )
}

function MenuView() {
  return (
    <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
      {MENU_ITEMS.map((item) => (
        <MenuItemCard key={item.name} item={item} />
      ))}
    </div>
  )
}

function InventarioView({ decremented }) {
  return (
    <div className="flex flex-col gap-1.5">
      {INVENTORY.map((item) => {
        const value = decremented ? item.after : item.before
        return (
          <div key={item.name} className="flex items-center gap-3 rounded-lg border px-3 py-2.5" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
            <span className="w-24 shrink-0 truncate text-[11px] font-semibold" style={{ color: C.espresso }}>{item.name}</span>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: C.creamDeep }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: decremented ? "28%" : "34%", backgroundColor: item.tone }} />
            </div>
            <span className="w-16 shrink-0 text-right font-mono text-[10px]" style={{ color: C.espresso }}>
              <span key={value} className="inline-block animate-[fade-pop_0.45s_var(--motion-ease)]">{value}</span> {item.unit}
            </span>
            <span className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold" style={{ backgroundColor: soft(item.tone), color: item.tone }}>
              {item.tag}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ClientesView() {
  return (
    <div className="flex flex-col gap-1.5">
      {CLIENTS.map((c) => (
        <div key={c.name} className="flex items-center gap-3 rounded-lg border px-3 py-2.5" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
          <span className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-text-inverse" style={{ backgroundColor: c.tone }}>
            {c.name[0]}
          </span>
          <span className="min-w-0 flex-1 truncate text-[11px] font-medium" style={{ color: C.espresso }}>{c.name}</span>
          <span className="hidden font-mono text-[10px] sm:inline" style={{ color: C.espressoMuted }}>{c.visits} visitas</span>
          <span className="font-mono text-[10px]" style={{ color: C.espressoMuted }}>{c.last}</span>
        </div>
      ))}
    </div>
  )
}

function SitioView({ onOpenSite }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border px-4 py-4" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg text-primary-on" style={{ backgroundColor: "var(--color-primary)" }}>
            <CupMark />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-bold" style={{ color: C.espresso }}>Café Nómada</p>
            <p className="font-mono text-[9px]" style={{ color: C.espressoMuted }}>cafenomada.com.ar · online</p>
          </div>
          <span className="ml-auto rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold" style={{ backgroundColor: C.sageSoft, color: C.sage }}>
            En vivo
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed" style={{ color: C.espressoSoft }}>
          Sitio, carta digital y pedidos online conectados al panel de gestión. Un cambio en el menú se refleja al instante en la web.
        </p>
        <button
          type="button"
          onClick={onOpenSite}
          className="mt-3 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-accent-on transition-transform duration-150 active:scale-[0.97]"
          style={{ backgroundColor: C.coral }}
        >
          Abrir sitio
        </button>
      </div>
      <div className="rounded-xl border px-4 py-3" style={{ borderColor: C.line, backgroundColor: C.sageSoft }}>
        <p className="text-[11px] font-semibold" style={{ color: C.espresso }}>Lo que ve el cliente y lo que ves vos</p>
        <p className="mt-1 text-[10px] leading-relaxed" style={{ color: C.espressoSoft }}>
          El pedido que hace un cliente en la web aparece en tiempo real en este panel: esa es la conexión entre experiencia y operación.
        </p>
      </div>
    </div>
  )
}

function KpiCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border px-3 py-2.5" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
      <p className="text-[9px] font-medium uppercase tracking-wider" style={{ color: C.espressoMuted }}>{label}</p>
      <p className="mt-1 font-display text-lg font-bold tracking-tight" style={{ color: C.espresso }}>
        <span key={value} className="inline-block animate-[fade-pop_0.45s_var(--motion-ease)]">{value}</span>
      </p>
      <p className="mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-semibold" style={{ backgroundColor: C.sageSoft, color: C.sage }}>
        <span className="size-1 rounded-full" style={{ backgroundColor: C.sage }} />
        {delta}
      </p>
    </div>
  )
}

function ChartCard({ updated, chartRef }) {
  const bars = updated ? BARS.after : BARS.before
  const max = Math.max(...BARS.after)
  return (
    <div ref={chartRef} className="mt-2.5 rounded-xl border px-3.5 py-3" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: C.espresso }}>Pedidos por hora</span>
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>Hoy</span>
      </div>
      <div className="flex items-end gap-1.5" style={{ height: 92 }} role="img" aria-label="Gráfico de pedidos por hora">
        {HOURS.map((h, i) => {
          const isLast = i === HOURS.length - 1
          return (
            <div key={h} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className="w-full rounded-md transition-all duration-700"
                style={{
                  height: `${Math.max((bars[i] / max) * 100, 8)}%`,
                  backgroundColor: isLast ? C.coral : C.sage,
                  opacity: isLast && updated ? 1 : 0.75,
                }}
              />
              <span className="font-mono text-[8px]" style={{ color: C.espressoMuted }}>{h}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OrdersCard({ showOrder, status, orderRowRef }) {
  const rows = []
  if (showOrder) {
    rows.push({ ...ORDER_ROW, isNew: true })
  }
  rows.push(...RECENT)
  return (
    <div className="rounded-xl border px-3.5 py-3" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: C.espresso }}>Pedidos recientes</span>
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>Ver todos</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((row) => {
          const isNew = row.isNew
          const rowStatus = isNew ? status : row.status
          const rowTone = isNew ? (status === "preparacion" ? C.coral : C.espressoMuted) : row.tone
          return (
            <div
              key={row.id}
              ref={isNew ? orderRowRef : undefined}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${isNew ? "animate-[fade-up_0.5s_var(--motion-ease)]" : ""}`}
              style={{
                borderColor: isNew ? "var(--color-primary)" : C.line,
                backgroundColor: isNew ? "var(--color-primary-soft)" : "transparent",
              }}
            >
              <span className="w-9 shrink-0 font-mono text-[9px] font-semibold" style={{ color: isNew ? C.coral : C.espressoMuted }}>
                {row.id}
              </span>
              <span className="min-w-0 flex-1 truncate text-[10px] font-medium" style={{ color: C.espresso }}>{row.name}</span>
              <span className="hidden font-mono text-[9px] sm:inline" style={{ color: C.espressoMuted }}>{row.time}</span>
              <OrderPill status={rowStatus} tone={rowTone} pulse={isNew} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProductsCard() {
  return (
    <div className="rounded-xl border px-3.5 py-3" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: C.espresso }}>Productos más vendidos</span>
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>Hoy</span>
      </div>
      <div className="flex flex-col gap-2">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-16 shrink-0 truncate text-[10px] font-medium" style={{ color: C.espresso }}>{p.name}</span>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: C.creamDeep }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${p.pct * 2.4}%`, backgroundColor: p.tone }}
              />
            </div>
            <span className="w-7 shrink-0 text-right font-mono text-[9px]" style={{ color: C.espressoMuted }}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function InventoryCard({ decremented }) {
  return (
    <div className="mt-2.5 rounded-xl border px-3.5 py-3" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: C.espresso }}>Alertas de inventario</span>
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.espressoMuted }}>3 activas</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {INVENTORY.map((item) => {
          const value = decremented ? item.after : item.before
          return (
            <div key={item.name} className="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2" style={{ borderColor: C.line, backgroundColor: C.creamSoft }}>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold" style={{ color: C.espresso }}>{item.name}</p>
                <p className="font-mono text-[9px]" style={{ color: C.espressoMuted }}>
                  <span key={value} className="inline-block animate-[fade-pop_0.45s_var(--motion-ease)]">{value}</span> {item.unit}
                </p>
              </div>
              <span className="shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] font-semibold" style={{ backgroundColor: soft(item.tone), color: item.tone }}>
                {item.tag}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ConnectedToast() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 px-3">
      <div
        className="mx-auto flex w-fit max-w-full animate-[fade-up_0.6s_var(--motion-ease)] items-center gap-2.5 rounded-full border px-4 py-2 shadow-[var(--shadow-md)]"
        style={{ backgroundColor: "var(--color-surface-1)", borderColor: C.lineStrong }}
      >
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
        <span className="text-[11px] font-semibold" style={{ color: C.espresso }}>
          Un pedido. Todo el negocio conectado.
        </span>
        <span className="hidden font-mono text-[9px] uppercase tracking-wider sm:inline" style={{ color: C.espressoMuted }}>
          Fleximy
        </span>
      </div>
    </div>
  )
}

/* ================= Piezas pequeñas ================= */

function MenuItemCard({ item, added = false, onAdd, innerRef }) {
  return (
    <button
      type="button"
      ref={innerRef}
      onClick={onAdd}
      className="flex flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        backgroundColor: added ? C.sageSoft : C.creamSoft,
        borderColor: added ? C.sage : C.line,
      }}
    >
      <span className="flex w-full items-center justify-between gap-1">
        <span className="truncate text-[11px] font-semibold" style={{ color: C.espresso }}>{item.name}</span>
        <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.tone }} />
      </span>
      <span className="text-[9px]" style={{ color: C.espressoMuted }}>{item.desc}</span>
      <span className="mt-0.5 flex w-full items-center justify-between gap-1">
        <span className="font-mono text-[10px] font-semibold" style={{ color: C.espresso }}>{item.price}</span>
        {added ? (
          <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide" style={{ color: C.sage }}>
            <CheckSvg size={10} /> Agregado
          </span>
        ) : (
          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-text-inverse" style={{ backgroundColor: item.tone }}>
            Agregar
          </span>
        )}
      </span>
    </button>
  )
}

function OrderPill({ status, tone, pulse = false }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[9px] font-medium"
      style={{ backgroundColor: soft(tone), color: tone }}
    >
      {pulse && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ backgroundColor: tone }} />
          <span className="relative inline-flex size-1.5 rounded-full" style={{ backgroundColor: tone }} />
        </span>
      )}
      {status}
    </span>
  )
}

function FloatChip({ className, name, price, tone }) {
  return (
    <div className={`absolute flex items-center gap-1.5 rounded-full border bg-surface-1 px-2.5 py-1 shadow-sm ${className}`} style={{ borderColor: C.lineStrong }}>
      <span className="size-1.5 rounded-full" style={{ backgroundColor: tone }} />
      <span className="text-[9px] font-semibold" style={{ color: C.espresso }}>{name}</span>
      <span className="font-mono text-[9px]" style={{ color: C.espressoMuted }}>{price}</span>
    </div>
  )
}

function CoffeeCup({ className = "" }) {
  return (
    <svg viewBox="0 0 200 180" className={className} fill="none" aria-hidden="true">
      <circle cx="100" cy="88" r="84" fill={C.creamDeep} />
      <path d="M76 42c-3-9 3-14 0-24" stroke={C.espressoSoft} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <path d="M98 38c-3-9 3-14 0-24" stroke={C.espressoSoft} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M120 44c-3-9 3-14 0-24" stroke={C.espressoSoft} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M64 78h72c4 22-10 44-36 44s-40-22-36-44Z" fill={C.coral} />
      <ellipse cx="100" cy="78" rx="36" ry="9" fill={C.espresso} />
      <ellipse cx="100" cy="78" rx="36" ry="9" fill={C.cream} opacity="0.18" />
      <circle cx="100" cy="78" r="3" fill={C.cream} opacity="0.55" />
      <path d="M134 86c16 0 22 10 22 20s-8 18-20 18" stroke={C.coral} strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="100" cy="132" rx="52" ry="8" fill={C.sage} />
      <ellipse cx="100" cy="132" rx="52" ry="8" fill={C.cream} opacity="0.2" />
    </svg>
  )
}

function CupMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M4 9h11v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 10h2.5a2.5 2.5 0 0 1 0 5H15" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 5.5c0-1 1-1 1-2m4 2c0-1 1-1 1-2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckSvg({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
