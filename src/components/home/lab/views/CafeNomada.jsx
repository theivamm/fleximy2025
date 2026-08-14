import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bell,
  Check,
  CheckCircle2,
  Coffee,
  MapPin,
  Plus,
  Search,
  ShoppingBag,
  Timer,
  X,
} from "lucide-react"
import { Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

const MENU = [
  { id: "flat", name: "Flat White", price: 4500, desc: "Doble shot · leche texturizada", cat: "Café", tone: "acc-gastro", uses: [["cafe", 0.2], ["leche", 0.1]] },
  { id: "latte", name: "Latte", price: 4200, desc: "Suave · leche a vapor", cat: "Café", tone: "acc-turnos", uses: [["cafe", 0.2], ["leche", 0.1]] },
  { id: "croissant", name: "Croissant", price: 2800, desc: "Manteca · horneado al día", cat: "Panadería", tone: "acc-gestion", uses: [["croissant", 1]] },
  { id: "medialuna", name: "Medialuna", price: 1500, desc: "Dulce de leche opcional", cat: "Panadería", tone: "acc-logistica", uses: [["medialuna", 1]] },
  { id: "sandwich", name: "Sandwich caprese", price: 6500, desc: "Tomate · mozzarella · pesto", cat: "Tostados", tone: "acc-educacion", uses: [["sandwich", 1]] },
  { id: "matcha", name: "Matcha latte", price: 4900, desc: "Ceremonial · sin tacc", cat: "Bebidas", tone: "acc-inmob", uses: [["matcha", 1]] },
]

const fmt = (n) => `$${n.toLocaleString("es-AR")}`

const STOCK_SEED = [
  { id: "cafe", name: "Café", val: 4.4, unit: "kg", tone: "error", tag: "Bajo stock" },
  { id: "leche", name: "Leche", val: 2.6, unit: "L", tone: "error", tag: "Bajo stock" },
  { id: "croissant", name: "Croissant", val: 11, unit: "uds", tone: "acc-gestion", tag: "Quedan pocos" },
  { id: "medialuna", name: "Medialuna", val: 18, unit: "uds", tone: "acc-gestion", tag: "Stock OK" },
  { id: "sandwich", name: "Sandwich caprese", val: 9, unit: "uds", tone: "acc-gestion", tag: "Stock OK" },
  { id: "matcha", name: "Matcha", val: 14, unit: "uds", tone: "acc-gestion", tag: "Stock OK" },
]

const ORDERS_SEED = [
  { id: "#1083", name: "Martina G.", items: "2 ítems", status: "preparando", time: "14:18" },
  { id: "#1082", name: "Julián R.", items: "3 ítems", status: "preparando", time: "14:05" },
  { id: "#1081", name: "Sofía P.", items: "1× Croissant", status: "lista", time: "13:42" },
  { id: "#1080", name: "Diego M.", items: "4 ítems", status: "lista", time: "13:20" },
]

const statusInfo = {
  nueva: { label: "Nueva", tone: "acc-gastro" },
  preparando: { label: "En preparación", tone: "warning" },
  lista: { label: "Lista", tone: "acc-gestion" },
}

const NAV = [
  {
    group: "Cliente",
    items: [
      { key: "sitio", label: "Sitio web" },
      { key: "menu", label: "Menú" },
      { key: "carrito", label: "Carrito" },
      { key: "confirmacion", label: "Confirmación" },
    ],
  },
  {
    group: "Operación",
    items: [
      { key: "pedidos", label: "Pedidos" },
      { key: "inventario", label: "Inventario" },
    ],
  },
]

export default function CafeNomada({ demo }) {
  const { compact } = useLabFrame()
  const [tab, setTab] = useState("sitio")
  const [cart, setCart] = useState([])
  const [order, setOrder] = useState(null)
  const [orders, setOrders] = useState(ORDERS_SEED)
  const [stock, setStock] = useState(STOCK_SEED)
  const [sales, setSales] = useState(486200)
  const [activeOrders, setActiveOrders] = useState(14)
  const [lastBar, setLastBar] = useState(8)
  const [toast, setToast] = useToast()

  const cartRef = useRef(cart)
  cartRef.current = cart
  const ordersRef = useRef(orders)
  ordersRef.current = orders

  const menuBtnRef = useRef(null)
  const addFlatRef = useRef(null)
  const addCroissantRef = useRef(null)
  const addLatteRef = useRef(null)
  const carritoNavRef = useRef(null)
  const confirmRef = useRef(null)
  const verEstadoRef = useRef(null)
  const orderRef = useRef(null)
  const inventarioNavRef = useRef(null)

  const addToCart = (item) => {
    setCart((c) => {
      const found = c.find((i) => i.id === item.id)
      return found ? c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...item, qty: 1 }]
    })
    setToast(`${item.name} agregado · ${fmt(item.price)}`)
  }

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const cartTotal = cart.reduce((n, i) => n + i.price * i.qty, 0)

  const confirmOrder = () => {
    const items = cartRef.current
    if (items.length === 0) return
    const total = items.reduce((n, i) => n + i.price * i.qty, 0)
    const orderId = "#1084"
    setOrder({ id: orderId, items, total, status: "nueva", time: "14:32" })
    setOrders((rows) => [{ id: orderId, name: "Pedido online", items: `${items.reduce((n, i) => n + i.qty, 0)} ítems`, status: "nueva", time: "14:32" }, ...rows])
    setStock((rows) =>
      rows.map((r) => {
        const consumed = items.reduce((n, i) => {
          const use = i.uses.find(([id]) => id === r.id)
          return n + (use ? use[1] * i.qty : 0)
        }, 0)
        if (!consumed) return r
        const val = Math.round((r.val - consumed) * 10) / 10
        return { ...r, val, tag: val <= (r.id === "croissant" ? 10 : 3) ? (r.id === "croissant" ? "Quedan pocos" : "Bajo stock") : r.tag }
      })
    )
    setSales((s) => s + total)
    setActiveOrders((n) => n + 1)
    setCart([])
    setTab("confirmacion")
    setToast(`Pedido ${orderId} confirmado · total ${fmt(total)}`)
  }

  const advanceOrder = (id) => {
    const row = ordersRef.current.find((o) => o.id === id)
    if (!row) return
    const next = row.status === "nueva" ? "preparando" : row.status === "preparando" ? "lista" : null
    if (!next) return
    setOrders((rows) => rows.map((r) => (r.id === id ? { ...r, status: next } : r)))
    if (id === "#1084") setOrder((o) => (o ? { ...o, status: next } : o))
    setToast(`Pedido ${id} · ${statusInfo[next].label}`)
  }

  const resetAll = () => {
    setTab("sitio")
    setCart([])
    setOrder(null)
    setOrders(ORDERS_SEED)
    setStock(STOCK_SEED)
    setSales(486200)
    setActiveOrders(14)
    setLastBar(8)
    setToast(null)
  }
  useEffect(() => {
    resetAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  const timeline = useMemo(
    () => [
      { at: 500, run: () => click(menuBtnRef.current, () => setTab("menu")) },
      { at: 1700, run: () => click(addFlatRef.current, () => addToCart(MENU[0])) },
      { at: 3000, run: () => click(addCroissantRef.current, () => addToCart(MENU[2])) },
      { at: 4300, run: () => click(addLatteRef.current, () => addToCart(MENU[1])) },
      { at: 5700, run: () => click(carritoNavRef.current, () => setTab("carrito")) },
      { at: 7000, run: () => click(confirmRef.current, confirmOrder) },
      { at: 8600, run: () => click(verEstadoRef.current, () => setTab("pedidos")) },
      { at: 10100, run: () => click(orderRef.current, () => advanceOrder("#1084")) },
      { at: 11600, run: () => click(inventarioNavRef.current, () => setTab("inventario")) },
      { at: 13200, run: () => demo.getCursor()?.fadeOut(300) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  function click(el, fn) {
    demo.getCursor()?.moveTo(el, { wait: 100 })
    demo.getCursor()?.click(el)
    fn()
  }

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps: timeline, hold: 2400, onComplete: demo.bump })

  const titleFor = (t) => ({ sitio: "Sitio web", menu: "Menú", carrito: "Carrito", confirmacion: "Confirmación", pedidos: "Pedidos", inventario: "Inventario" }[t])

  const onNav = (key) => {
    if (key === "carrito" && cartCount === 0) return
    demo.pause()
    setTab(key)
  }

  const body = (
    <>
      {tab === "sitio" && <Sitio tone={demo.tone} onMenu={() => setTab("menu")} menuBtnRef={menuBtnRef} />}
      {tab === "menu" && (
        <Menu tone={demo.tone} onAdd={addToCart} addFlatRef={addFlatRef} addCroissantRef={addCroissantRef} addLatteRef={addLatteRef} />
      )}
      {tab === "carrito" && (
        <Carrito
          tone={demo.tone}
          cart={cart}
          total={cartTotal}
          onRemove={removeFromCart}
          onConfirm={confirmOrder}
          confirmRef={confirmRef}
          onMenu={() => setTab("menu")}
        />
      )}
      {tab === "confirmacion" && (
        <Confirmacion tone={demo.tone} order={order} onStatus={() => setTab("pedidos")} onMenu={() => setTab("menu")} verEstadoRef={verEstadoRef} />
      )}
      {tab === "pedidos" && (
        <Pedidos
          tone={demo.tone}
          orders={orders}
          onAdvance={advanceOrder}
          orderRef={orderRef}
          sales={sales}
          activeOrders={activeOrders}
          lastBar={lastBar}
        />
      )}
      {tab === "inventario" && <Inventario stock={stock} sales={sales} activeOrders={activeOrders} />}
    </>
  )

  if (compact) {
    return (
      <div className="relative flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<Coffee size="0.95em" />}
          brand="Café Nómada"
          subtitle="Sucursal Palermo"
          status={<Pill tone={demo.tone} dot>Abierto 08–20</Pill>}
          tabs={[
            { key: "sitio", label: "Inicio", Icon: Coffee },
            { key: "menu", label: "Menú", Icon: Plus },
            { key: "carrito", label: "Carrito", Icon: ShoppingBag, badge: cartCount, ref: carritoNavRef },
            { key: "pedidos", label: "Pedidos", Icon: Timer, badge: orders.filter((o) => o.status !== "lista").length },
            { key: "inventario", label: "Stock", Icon: CheckCircle2, ref: inventarioNavRef },
          ]}
          tab={tab}
          onTab={onNav}
          overlay={
            <>
              {toast && (
                <div className="pointer-events-none absolute inset-x-0 bottom-[3.6em] z-30 flex justify-center px-[1em]">
                  <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
                    <span className="size-[0.6em] rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
                    <span className="text-[0.7em] font-semibold">{toast}</span>
                  </div>
                </div>
              )}
            </>
          }
        >
          {body}
        </MobileShell>
      </div>
    )
  }

  return (
    <div className="relative flex h-full bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <Sidebar tone={demo.tone} tab={tab} setTab={setTab} cartCount={cartCount} carritoNavRef={carritoNavRef} inventarioNavRef={inventarioNavRef} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar tone={demo.tone} title={titleFor(tab)} cartCount={cartCount} onOpenCart={() => setTab("carrito")} />

        {toast && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[0.8em] z-30 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.5s_var(--motion-ease)] items-center gap-[0.6em] rounded-full border border-outline-strong bg-surface-1 px-[1.1em] py-[0.55em] shadow-[var(--shadow-md)]">
              <span className="size-[0.6em] rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
              <span className="text-[0.7em] font-semibold">{toast}</span>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
          {body}
        </div>
      </div>
    </div>
  )
}

function Sidebar({ tone, tab, setTab, cartCount, carritoNavRef, inventarioNavRef }) {
  const onNav = (key) => {
    if (key === "carrito" && cartCount === 0) return
    setTab(key)
  }
  return (
    <aside className="hidden w-[11.5em] shrink-0 flex-col border-r border-outline bg-surface-1 p-[0.8em] md:flex">
      <div className="flex items-center gap-[0.5em] px-[0.3em] pb-[0.9em]">
        <span className="grid size-[1.6em] place-items-center rounded-[0.5em] text-[0.8em] text-white" style={{ backgroundColor: toneVar(tone) }}>
          <Coffee size="0.9em" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.8em] font-bold leading-none">Café Nómada</p>
          <p className="text-[0.55em] text-text-3">Sucursal Palermo</p>
        </div>
      </div>
      {NAV.map((g) => (
        <div key={g.group} className="mb-[0.5em]">
          <p className="px-[0.6em] pb-[0.35em] font-mono text-[0.52em] uppercase tracking-[0.12em] text-text-4">{g.group}</p>
          <nav className="flex flex-col gap-[0.25em]">
            {g.items.map((n) => {
              const active = tab === n.key
              const disabled = n.key === "carrito" && cartCount === 0
              return (
                <button
                  key={n.key}
                  type="button"
                  ref={n.key === "carrito" ? carritoNavRef : n.key === "inventario" ? inventarioNavRef : undefined}
                  onClick={() => onNav(n.key)}
                  className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.42em] text-left text-[0.68em] transition-colors"
                  style={{
                    backgroundColor: active ? toneSoft(tone) : "transparent",
                    color: active ? toneVar(tone) : "var(--color-text-2)",
                    fontWeight: active ? 700 : 500,
                    opacity: disabled ? 0.45 : 1,
                  }}
                >
                  <span className="size-[0.4em] rounded-full" style={{ backgroundColor: active ? toneVar(tone) : "var(--color-text-4)" }} />
                  <span className="flex-1">{n.label}</span>
                  {n.key === "carrito" && cartCount > 0 && (
                    <span className="grid min-w-[1.3em] place-items-center rounded-full px-[0.3em] py-[0.05em] font-mono text-[0.55em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      ))}
      <div className="mt-auto rounded-[0.6em] p-[0.7em]" style={{ backgroundColor: toneSoft(tone) }}>
        <p className="font-mono text-[0.55em] uppercase tracking-wider" style={{ color: toneVar(tone) }}>Hoy</p>
        <p className="mt-[0.2em] text-[0.62em] font-semibold text-text-1">Abierto 08:00 – 20:00</p>
      </div>
    </aside>
  )
}

function Topbar({ tone, title, cartCount, onOpenCart }) {
  return (
    <div className="flex items-center justify-between gap-[0.8em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
      <div className="min-w-0">
        <p className="truncate text-[0.78em] font-bold leading-none">{title}</p>
        <p className="mt-[0.15em] font-mono text-[0.55em] uppercase tracking-wider text-text-3">Café Nómada · Palermo</p>
      </div>
      <div className="flex shrink-0 items-center gap-[0.5em]">
        <span className="hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 sm:flex">
          <Search size="0.8em" /> Buscar en el menú…
        </span>
        {cartCount > 0 && (
          <button
            type="button"
            onClick={onOpenCart}
            className="relative grid size-[2em] place-items-center rounded-[0.5em] text-text-2 transition-colors hover:bg-surface-2 hover:text-text-1"
            aria-label={`Ver carrito, ${cartCount} productos`}
          >
            <ShoppingBag size="0.9em" />
            <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.9em] place-items-center rounded-full text-[0.5em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
              {cartCount}
            </span>
          </button>
        )}
        <span className="relative grid size-[1.8em] place-items-center rounded-[0.5em] border border-outline text-text-2">
          <Bell size="0.8em" />
          <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.85em] place-items-center rounded-full text-[0.5em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>3</span>
        </span>
      </div>
    </div>
  )
}

function Sitio({ tone, onMenu, menuBtnRef }) {
  return (
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="relative flex-1 overflow-hidden rounded-[0.9em] border border-outline" style={{ backgroundColor: toneSoft(tone) }}>
        <div className="p-[1.1em]">
          <Pill tone={tone} dot>Pedido online · listo en 8 min</Pill>
          <p className="mt-[0.7em] font-display text-[1.3em] font-black leading-tight text-text-1">Café de especialidad,</p>
          <p className="font-display text-[1.3em] font-black leading-tight" style={{ color: toneVar(tone) }}>para llevar o para vos.</p>
          <p className="mt-[0.4em] max-w-[24em] text-[0.66em] leading-relaxed text-text-2">
            Elegí tu menú, confirmá el pedido y seguí su estado desde la cocina hasta que esté listo.
          </p>
          <div className="mt-[0.9em] flex flex-wrap gap-[0.5em]">
            <button
              ref={menuBtnRef}
              type="button"
              onClick={onMenu}
              className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] px-[1em] text-[0.72em] font-bold text-white transition-transform active:scale-[0.97]"
              style={{ backgroundColor: toneVar(tone) }}
            >
              Ver menú
            </button>
            <button
              type="button"
              onClick={onMenu}
              className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[1em] text-[0.72em] font-semibold text-text-2 transition-colors hover:text-text-1"
            >
              Pedir ahora
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[0.6em]">
        {[
          { t: "Elegí", d: "Agregá al carrito" },
          { t: "Confirmá", d: "Recibís tu número" },
          { t: "Seguilo", d: "Listo en minutos" },
        ].map((s, i) => (
          <div key={s.t} className="rounded-[0.7em] border border-outline bg-surface-1 p-[0.7em]">
            <p className="font-mono text-[0.52em]" style={{ color: toneVar(tone) }}>PASO {i + 1}</p>
            <p className="mt-[0.25em] text-[0.68em] font-semibold text-text-1">{s.t}</p>
            <p className="text-[0.56em] text-text-3">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-[0.6em] rounded-[0.7em] border border-outline bg-surface-1 px-[0.9em] py-[0.6em]">
        <span className="grid size-[1.6em] place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(tone), color: toneVar(tone) }}>
          <MapPin size="0.8em" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.64em] font-semibold text-text-1">Gorriti 4470 · Palermo</p>
          <p className="flex items-center gap-[0.3em] text-[0.56em] text-text-3"><Timer size="0.6em" /> Take away 08:00 – 20:00</p>
        </div>
        <Pill tone="acc-gestion" dot>Abierto</Pill>
      </div>
    </div>
  )
}

function Menu({ tone, onAdd, addFlatRef, addCroissantRef, addLatteRef }) {
  const refFor = (id) => (id === "flat" ? addFlatRef : id === "croissant" ? addCroissantRef : id === "latte" ? addLatteRef : undefined)
  return (
    <div>
      <div className="flex items-center justify-between gap-[0.6em]">
        <div>
          <p className="text-[0.8em] font-bold text-text-1">Menú</p>
          <p className="font-mono text-[0.55em] uppercase tracking-wider text-text-3">6 productos · recargados hoy</p>
        </div>
        <Pill tone={tone} dot>En vivo</Pill>
      </div>
      <div className="mt-[0.7em] grid grid-cols-2 gap-[0.6em] xl:grid-cols-3">
        {MENU.map((p) => (
          <div key={p.id} className="flex flex-col rounded-[0.8em] border border-outline bg-surface-1 p-[0.75em]">
            <div className="flex items-start justify-between gap-[0.5em]">
              <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(p.tone), color: toneVar(p.tone) }}>
                <Coffee size="0.85em" />
              </span>
              <Pill tone={p.tone}>{p.cat}</Pill>
            </div>
            <p className="mt-[0.5em] text-[0.72em] font-semibold text-text-1">{p.name}</p>
            <p className="mt-[0.15em] text-[0.56em] text-text-3">{p.desc}</p>
            <div className="mt-auto flex items-center justify-between gap-[0.5em] pt-[0.55em]">
              <span className="text-[0.8em] font-bold text-text-1">{fmt(p.price)}</span>
              <button
                ref={refFor(p.id)}
                type="button"
                onClick={() => onAdd(p)}
                className="inline-flex min-h-[2.2em] items-center gap-[0.3em] rounded-[0.5em] px-[0.7em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.96]"
                style={{ backgroundColor: toneVar(tone) }}
              >
                <Plus size="0.75em" /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Carrito({ tone, cart, total, onRemove, onConfirm, confirmRef, onMenu }) {
  if (cart.length === 0) {
    return (
      <div className="grid h-full place-items-center">
        <div className="max-w-[22em] text-center">
          <span className="mx-auto grid size-[3em] place-items-center rounded-full" style={{ backgroundColor: toneSoft(tone), color: toneVar(tone) }}>
            <ShoppingBag size="1.4em" />
          </span>
          <p className="mt-[0.8em] text-[0.85em] font-bold text-text-1">Tu carrito está vacío</p>
          <p className="mt-[0.2em] text-[0.62em] text-text-3">Sumá productos del menú para empezar tu pedido.</p>
          <button
            type="button"
            onClick={onMenu}
            className="mt-[0.9em] inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] px-[1.1em] text-[0.72em] font-bold text-white transition-transform active:scale-[0.97]"
            style={{ backgroundColor: toneVar(tone) }}
          >
            Ver menú
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-[30em]">
      <div className="flex flex-col gap-[0.55em]">
        {cart.map((i) => (
          <div key={i.id} className="flex items-center gap-[0.6em] rounded-[0.7em] border border-outline bg-surface-1 p-[0.6em]">
            <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(i.tone), color: toneVar(i.tone) }}>
              <Coffee size="0.85em" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.68em] font-semibold text-text-1">{i.name}</p>
              <p className="text-[0.56em] text-text-3">×{i.qty} · {fmt(i.price * i.qty)}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(i.id)}
              className="grid size-[1.7em] place-items-center rounded-[0.4em] text-text-3 transition-colors hover:bg-surface-2 hover:text-error"
              aria-label={`Quitar ${i.name}`}
            >
              <X size="0.8em" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-[0.8em] rounded-[0.7em] border border-outline bg-surface-1 p-[0.8em]">
        <div className="flex items-center justify-between text-[0.72em]">
          <span className="text-text-3">Subtotal</span>
          <span className="font-bold text-text-1">{fmt(total)}</span>
        </div>
        <div className="mt-[0.3em] h-[0.35em] overflow-hidden rounded-full bg-surface-3">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((total / 20000) * 100, 100)}%`, backgroundColor: toneVar(tone) }} />
        </div>
        <p className="mt-[0.3em] text-[0.56em] text-text-3">Sin cargo por delivery · listo en 8 min</p>
        <button
          ref={confirmRef}
          type="button"
          onClick={onConfirm}
          className="mt-[0.7em] inline-flex min-h-[2.4em] w-full items-center justify-center gap-[0.4em] rounded-[0.6em] text-[0.72em] font-bold text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: toneVar(tone) }}
        >
          Confirmar pedido · {fmt(total)}
        </button>
      </div>
    </div>
  )
}

function Confirmacion({ tone, order, onStatus, onMenu, verEstadoRef }) {
  const items = order?.items ?? []
  return (
    <div className="mx-auto grid h-full max-w-[26em] place-items-center">
      <div className="w-full rounded-[0.9em] border border-outline bg-surface-1 p-[1.1em] text-center">
        <span className="mx-auto grid size-[2.8em] place-items-center rounded-full" style={{ backgroundColor: toneVar("acc-gestion") }}>
          <CheckCircle2 size="1.4em" className="text-white" />
        </span>
        <p className="mt-[0.7em] text-[0.9em] font-bold text-text-1">Pedido {order?.id ?? "#1084"} confirmado</p>
        <p className="mt-[0.2em] text-[0.62em] text-text-3">Recibimos tu pedido · listo en 8 minutos</p>
        <div className="mt-[0.8em] rounded-[0.7em] border border-outline bg-surface-2/50 p-[0.7em] text-left">
          {items.map((i) => (
            <div key={i.id} className="flex items-center justify-between gap-[0.5em] py-[0.2em]">
              <span className="truncate text-[0.62em] text-text-2">{i.qty}× {i.name}</span>
              <span className="shrink-0 font-mono text-[0.58em] text-text-3">{fmt(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="mt-[0.4em] flex items-center justify-between gap-[0.5em] border-t border-outline pt-[0.5em]">
            <span className="text-[0.62em] font-semibold text-text-2">Total</span>
            <span className="text-[0.72em] font-bold" style={{ color: toneVar(tone) }}>{fmt(order?.total ?? 0)}</span>
          </div>
        </div>
        <div className="mt-[0.8em] flex flex-wrap justify-center gap-[0.5em]">
          <button
            ref={verEstadoRef}
            type="button"
            onClick={onStatus}
            className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] px-[1em] text-[0.72em] font-bold text-white transition-transform active:scale-[0.97]"
            style={{ backgroundColor: toneVar(tone) }}
          >
            Ver estado del pedido
          </button>
          <button
            type="button"
            onClick={onMenu}
            className="inline-flex min-h-[2.4em] items-center gap-[0.4em] rounded-[0.6em] border border-outline-strong bg-surface-1 px-[1em] text-[0.72em] font-semibold text-text-2 transition-colors hover:text-text-1"
          >
            Volver al menú
          </button>
        </div>
      </div>
    </div>
  )
}

function Pedidos({ tone, orders, onAdvance, orderRef, sales, activeOrders, lastBar }) {
  const count = (s) => orders.filter((o) => o.status === s).length
  return (
    <div>
      <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
        <Kpi label="Ventas del día" value={fmt(sales)} delta={sales > 486200 ? 2 : 0} />
        <Kpi label="Pedidos activos" value={activeOrders} delta={activeOrders > 14 ? 7 : 0} />
        <Kpi label="Ticket promedio" value="$5.980" delta={3} />
        <Kpi label="Tiempo de prep." value="8 min" delta={-12} />
      </div>

      <div className="mt-[0.7em] flex flex-wrap gap-[0.4em]">
        <Pill tone="acc-gastro">{count("nueva")} nuevas</Pill>
        <Pill tone="warning">{count("preparando")} preparando</Pill>
        <Pill tone="acc-gestion">{count("lista")} listas</Pill>
      </div>

      <div className="mt-[0.7em] flex flex-col gap-[0.55em]">
        <SectionHead title="Cola de pedidos" extra={<Pill tone={tone}>{orders.length} en pantalla</Pill>} />
        {orders.map((o) => {
          const s = statusInfo[o.status]
          const active = o.status !== "lista"
          return (
            <button
              key={o.id}
              type="button"
              ref={o.id === "#1084" ? orderRef : undefined}
              onClick={() => onAdvance(o.id)}
              disabled={!active}
              className="flex items-center gap-[0.6em] rounded-[0.6em] border px-[0.7em] py-[0.5em] text-left transition-colors"
              style={{
                borderColor: o.id === "#1084" ? toneVar(tone) : "var(--color-outline)",
                backgroundColor: o.id === "#1084" ? toneSoft(tone) : "var(--color-surface-1)",
                opacity: active ? 1 : 0.55,
              }}
            >
              <span className="w-[3.4em] shrink-0 font-mono text-[0.62em] font-semibold" style={{ color: o.id === "#1084" ? toneVar(tone) : "var(--color-text-3)" }}>
                {o.id}
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.68em] font-medium text-text-1">{o.name}</span>
              <span className="hidden text-[0.58em] text-text-3 md:inline">{o.items}</span>
              <Pill tone={s.tone} dot>{s.label}</Pill>
              {active && <span className="hidden text-[0.55em] text-text-4 lg:inline">{o.time}</span>}
            </button>
          )
        })}
      </div>

      <div className="mt-[0.7em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Pedidos por hora" extra={<span className="font-mono text-[0.55em] text-text-3">14:00 – 19:00</span>} />
        <div className="mt-[0.6em] flex h-[5.5em] items-end gap-[0.4em]">
          {[26, 38, 52, 61, 44, 58, 79, 88, 64].map((v, i) => (
            <span key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-[0.3em]">
              <span
                className="w-full rounded-[0.2em] transition-all duration-500"
                style={{ height: `${(v / 88) * 100}%`, backgroundColor: i === lastBar ? toneVar(tone) : toneVar("text-4"), opacity: i === lastBar ? 1 : 0.4 }}
              />
              <span className="text-[0.5em] text-text-3">{["14", "15", "16", "17", "18", "19", "20", "21", "22"][i]}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Inventario({ stock, sales, activeOrders }) {
  const critical = stock.filter((s) => s.tag !== "Stock OK").length
  return (
    <div>
      <div className="grid grid-cols-2 gap-[0.6em] xl:grid-cols-4">
        <Kpi label="Ventas del día" value={fmt(sales)} delta={sales > 486200 ? 2 : 0} />
        <Kpi label="Pedidos activos" value={activeOrders} delta={activeOrders > 14 ? 7 : 0} />
        <Kpi label="Alertas de stock" value={critical} delta={0} sub={`${critical} productos por reponer`} />
        <Kpi label="Mermas hoy" value="0,8%" delta={-2} />
      </div>

      <div className="mt-[0.7em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em]">
        <SectionHead title="Inventario en vivo" extra={<Pill tone={critical > 0 ? "warning" : "acc-gestion"}>{critical} alertas</Pill>} />
        <div className="mt-[0.6em] flex flex-col gap-[0.45em]">
          {stock.map((s) => (
            <div key={s.id} className="flex items-center gap-[0.6em] rounded-[0.5em] px-[0.4em] py-[0.3em]">
              <span className="w-[10em] shrink-0 truncate text-[0.64em] font-medium text-text-1">{s.name}</span>
              <span className="w-[5em] shrink-0 font-mono text-[0.6em] text-text-2">{s.val} {s.unit}</span>
              <div className="h-[0.35em] min-w-0 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((s.val / 20) * 100, 100)}%`, backgroundColor: toneVar(s.tone) }} />
              </div>
              <Pill tone={s.tone}>{s.tag}</Pill>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[0.7em] rounded-[0.7em] border border-outline bg-surface-1 p-[0.8em]">
        <div className="flex items-center gap-[0.5em]">
          <span className="grid size-[1.6em] place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft("acc-gestion"), color: toneVar("acc-gestion") }}>
            <Check size="0.8em" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.66em] font-semibold text-text-1">Stock descontado al confirmar cada pedido</p>
            <p className="text-[0.56em] text-text-3">Café, leche y croissants se actualizan en tiempo real.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
