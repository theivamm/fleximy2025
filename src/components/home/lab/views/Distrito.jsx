import { useEffect, useMemo, useRef, useState } from "react"
import { Armchair, Check, Headphones, Lamp, Search, ShoppingBag, Sofa, Watch, X } from "lucide-react"
import { Btn, GhostBtn, Kpi, Pill, SectionHead } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useLabFrame } from "../BrowserFrame"
import { useTimeline } from "../../hero/hooks"

const CATEGORIES = ["Todas", "Iluminación", "Living", "Tecnología", "Accesorios"]
const PRODUCTS = [
  { id: "aurora", name: "Lámpara Aurora", cat: "Iluminación", price: "$89.900", old: "$112.000", stock: 12, tone: "acc-comercio", Icon: Lamp, color: "Blanco cálido" },
  { id: "nomade", name: "Sillón Nómade", cat: "Living", price: "$412.000", old: null, stock: 4, tone: "acc-inmob", Icon: Armchair, color: "Gris antracita" },
  { id: "sona", name: "Auriculares Sona", cat: "Tecnología", price: "$128.500", old: "$150.000", stock: 26, tone: "acc-educacion", Icon: Headphones, color: "Negro" },
  { id: "lumen", name: "Reloj Lumen", cat: "Accesorios", price: "$64.900", old: null, stock: 8, tone: "acc-gastro", Icon: Watch, color: "Cuerina tostada" },
]
const RECS = [
  { name: "Banco Tilo", price: "$98.000", tone: "acc-turnos", Icon: Sofa },
  { name: "Parpadeo", price: "$22.900", tone: "acc-gestion", Icon: Lamp },
  { name: "Faro Mini", price: "$39.500", tone: "acc-logistica", Icon: Armchair },
]

export default function Distrito({ demo }) {
  const { compact, immersive } = useLabFrame()
  const [cat, setCat] = useState("Todas")
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [shipped, setShipped] = useState(false)

  const productRef = useRef(null)
  const variantRef = useRef(null)
  const addRef = useRef(null)
  const cartBtnRef = useRef(null)

  const openProduct = (id) => setSelected(PRODUCTS.find((p) => p.id === id))
  const selectVariant = () => setSelected((p) => p && { ...p })
  const addToCart = () => {
    if (!selected) return
    setCart((c) => (c.find((i) => i.id === selected.id) ? c : [...c, { ...selected, qty: 1 }]))
    setCartOpen(true)
  }

  const steps = useMemo(
    () => [
      { at: 400, run: () => demo.getCursor()?.moveTo(productRef.current, { wait: 260 }) },
      { at: 1500, run: () => { demo.getCursor()?.click(productRef.current); openProduct("sona") } },
      { at: 3300, run: () => demo.getCursor()?.moveTo(variantRef.current, { wait: 200 }) },
      { at: 4400, run: () => { demo.getCursor()?.click(variantRef.current); selectVariant() } },
      { at: 5500, run: () => demo.getCursor()?.moveTo(addRef.current, { wait: 180 }) },
      { at: 6600, run: () => { demo.getCursor()?.click(addRef.current); addToCart() } },
      { at: 8200, run: () => { demo.getCursor()?.moveTo(cartBtnRef.current, { wait: 160, dur: 480 }); demo.getCursor()?.fadeOut(300) } },
    ],
    []
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps, hold: 2400, onComplete: demo.bump })

  useEffect(() => {
    setSelected(null)
    setCart([])
    setCartOpen(false)
    setShipped(false)
  }, [demo.cycle])

  const filtered = cat === "Todas" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)
  const cartCount = cart.reduce((n, i) => n + i.qty, 0)

  if (compact && !immersive) {
    return (
      <div className="flex h-full flex-col bg-surface-2">
        <div className="flex items-center justify-between border-b border-outline px-[1.2em] py-[0.7em]">
          <p className="font-display text-[1em] font-black tracking-tight">distrito.</p>
          <span className="inline-flex items-center gap-[0.4em] rounded-full px-[0.8em] py-[0.3em] text-[0.68em] font-bold text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
            <ShoppingBag size="0.85em" /> {cartCount} · {cart.length ? "$128.500" : "Carrito"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-[0.7em] px-[1.2em] py-[0.9em]">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="overflow-hidden rounded-[0.8em] border border-outline bg-surface-1">
              <div className="grid h-[5em] place-items-center" style={{ backgroundColor: toneSoft(p.tone) }}>
                <p.Icon size="2.2em" style={{ color: toneVar(p.tone) }} />
              </div>
              <div className="p-[0.7em]">
                <p className="truncate text-[0.72em] font-semibold">{p.name}</p>
                <p className="mt-[0.2em] text-[0.72em] font-bold">{p.price}</p>
                <p className="text-[0.58em] text-text-3">{p.stock} disponibles</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto px-[1.2em] pb-[1em]">
          <div className="rounded-[0.7em] border border-outline bg-surface-1 px-[0.9em] py-[0.6em]">
            <SectionHead title="Recomendado para vos" extra={<Pill tone="acc-gestion">Envío gratis</Pill>} />
            <div className="mt-[0.5em] flex flex-col gap-[0.45em]">
              {RECS.map((r) => (
                <div key={r.name} className="flex items-center gap-[0.6em]">
                  <span className="grid size-[1.6em] place-items-center rounded-[0.4em]" style={{ backgroundColor: toneSoft(r.tone), color: toneVar(r.tone) }}>
                    <r.Icon size="0.85em" />
                  </span>
                  <span className="flex-1 text-[0.66em] font-medium">{r.name}</span>
                  <span className="text-[0.62em] font-bold">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <Header cartCount={cartCount} cartBtnRef={cartBtnRef} onClickCart={() => setCartOpen(true)} tone={demo.tone} />

      <div className="relative flex min-h-0 flex-1">
        <aside className="hidden w-[13em] shrink-0 flex-col gap-[0.9em] border-r border-outline bg-surface-1 p-[1em] lg:block">
          <div>
            <p className="mb-[0.5em] font-mono text-[0.55em] uppercase tracking-[0.1em] text-text-3">Categorías</p>
            <div className="flex flex-col gap-[0.15em]">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className="flex items-center gap-[0.5em] rounded-[0.4em] px-[0.5em] py-[0.35em] text-left text-[0.68em] transition-colors"
                  style={{
                    backgroundColor: cat === c ? toneSoft(demo.tone) : "transparent",
                    color: cat === c ? toneVar(demo.tone) : "var(--color-text-2)",
                    fontWeight: cat === c ? 700 : 500,
                  }}
                >
                  <span className="size-[0.4em] rounded-full" style={{ backgroundColor: cat === c ? toneVar(demo.tone) : "var(--color-text-4)" }} />
                  {c}
                  <span className="ml-auto font-mono text-[0.58em] text-text-4">{c === "Todas" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-[0.5em] font-mono text-[0.55em] uppercase tracking-[0.1em] text-text-3">Precio</p>
            <div className="relative h-[0.4em] rounded-full bg-surface-3">
              <div className="absolute inset-y-0 left-[10%] w-[70%] rounded-full" style={{ backgroundColor: toneVar(demo.tone) }} />
              <span className="absolute -top-[0.25em] left-[10%] size-[0.9em] rounded-full border-2 border-surface-1" style={{ backgroundColor: toneVar(demo.tone) }} />
              <span className="absolute -top-[0.25em] left-[80%] size-[0.9em] rounded-full border-2 border-surface-1" style={{ backgroundColor: toneVar(demo.tone) }} />
            </div>
            <p className="mt-[0.45em] text-[0.6em] text-text-3">$22.900 — $412.000</p>
          </div>
          <div>
            <p className="mb-[0.5em] font-mono text-[0.55em] uppercase tracking-[0.1em] text-text-3">Stock</p>
            <label className="flex cursor-pointer items-center gap-[0.5em] text-[0.68em] text-text-2">
              <span className="relative h-[1.2em] w-[2.1em] rounded-full bg-surface-3">
                <span className="absolute left-[0.15em] top-[0.15em] size-[0.9em] rounded-full bg-text-3 transition-transform duration-200" style={{ transform: "translateX(0.9em)", backgroundColor: toneVar(demo.tone) }} />
              </span>
              Solo con stock
            </label>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="grid grid-cols-2 gap-[0.6em] px-[1em] pt-[1em] xl:grid-cols-4">
            <Kpi label="Ventas del mes" value="$3.2M" delta={18} />
            <Kpi label="Pedidos activos" value="47" delta={9} />
            <Kpi label="Ticket promedio" value="$84.200" delta={5} />
            <Kpi label="Conversión" value="3,8%" delta={-1} />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[1em]">
            <div className="grid grid-cols-2 gap-[0.7em] xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  selectedId={selected?.id}
                  onOpen={() => openProduct(p.id)}
                  onVariant={selectVariant}
                  onAdd={addToCart}
                  variantRef={selected?.id === p.id ? variantRef : undefined}
                  addRef={selected?.id === p.id ? addRef : undefined}
                  cardRef={p.id === "sona" ? productRef : undefined}
                  tone={demo.tone}
                />
              ))}
            </div>
          </div>
        </div>

        {cartOpen && (
          <CartDrawer
            items={cart}
            tone={demo.tone}
            onClose={() => setCartOpen(false)}
            onShip={() => setShipped(true)}
            shipped={shipped}
          />
        )}
      </div>
    </div>
  )
}

function Header({ cartCount, cartBtnRef, onClickCart, tone }) {
  return (
    <div className="flex items-center gap-[1em] border-b border-outline bg-surface-1 px-[1.2em] py-[0.6em]">
      <p className="font-display text-[1.05em] font-black tracking-tight">distrito.</p>
      <nav className="hidden items-center gap-[0.9em] text-[0.68em] font-medium text-text-2 md:flex">
        <span className="text-text-1">Inicio</span>
        <span>Catálogo</span>
        <span>Categorías</span>
        <span>Ofertas</span>
      </nav>
      <span className="ml-auto flex min-w-0 flex-1 items-center gap-[0.4em] rounded-[0.5em] border border-outline bg-surface-2 px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 md:max-w-[18em]">
        <Search size="0.8em" /> Buscar productos…
      </span>
      <button
        type="button"
        ref={cartBtnRef}
        onClick={onClickCart}
        className="relative grid size-[2em] shrink-0 place-items-center rounded-[0.5em] text-text-1 transition-colors hover:bg-surface-2"
      >
        <ShoppingBag size="0.95em" />
        {cartCount > 0 && (
          <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.95em] place-items-center rounded-full text-[0.52em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
            {cartCount}
          </span>
        )}
      </button>
      <Btn tone={tone}>Hacer pedido</Btn>
    </div>
  )
}

function ProductCard({ product: p, selectedId, onOpen, onVariant, onAdd, variantRef, addRef, cardRef, tone }) {
  const selected = selectedId === p.id
  return (
    <div ref={cardRef} className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[0.8em] border border-outline bg-surface-1 transition-colors hover:border-outline-strong">
      <div className="grid h-[6em] place-items-center" style={{ backgroundColor: selected ? toneSoft(tone) : toneSoft(p.tone) }}>
        <p.Icon size="2.4em" style={{ color: selected ? toneVar(tone) : toneVar(p.tone) }} />
        {p.old && (
          <span className="absolute left-[0.6em] top-[0.6em] rounded-full px-[0.55em] py-[0.15em] text-[0.52em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
            -{Math.round((1 - parseFloat(p.price.replace(/\D/g, "")) / parseFloat(p.old.replace(/\D/g, ""))) * 100)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-[0.7em]">
        <p className="truncate text-[0.7em] font-semibold">{p.name}</p>
        <p className="mt-[0.1em] text-[0.56em] text-text-3">{p.cat} · {p.color}</p>
        <div className="mt-[0.3em] flex items-baseline gap-[0.5em]">
          <span className="text-[0.82em] font-bold">{p.price}</span>
          {p.old && <span className="text-[0.56em] text-text-4 line-through">{p.old}</span>}
        </div>
        {selected ? (
          <div className="mt-[0.55em] flex flex-col gap-[0.4em]">
            <div className="flex items-center gap-[0.35em]">
              {["Natural", "Gris", "Tostado"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={onVariant}
                  ref={c === "Gris" ? variantRef : undefined}
                  className="flex items-center gap-[0.3em] rounded-full border px-[0.5em] py-[0.2em] text-[0.56em] font-medium transition-colors"
                  style={{ borderColor: toneVar(tone), color: toneVar(tone), backgroundColor: toneSoft(tone) }}
                >
                  {c === "Gris" && <Check size="0.7em" />} {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-[0.5em]">
              <span className="text-[0.56em] text-text-3">Stock: {p.stock} uds</span>
              <button
                type="button"
                ref={addRef}
                onClick={(e) => { e.stopPropagation(); onAdd() }}
                className="ml-auto inline-flex items-center gap-[0.3em] rounded-[0.5em] px-[0.8em] py-[0.35em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.96]"
                style={{ backgroundColor: toneVar(tone) }}
              >
                <ShoppingBag size="0.8em" /> Agregar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="mt-auto inline-flex items-center gap-[0.3em] rounded-[0.5em] border border-outline-strong px-[0.7em] py-[0.3em] text-[0.58em] font-semibold text-text-2 transition-colors hover:text-text-1"
          >
            Elegir variante
          </button>
        )}
      </div>
    </div>
  )
}

function CartDrawer({ items, tone, onClose, onShip, shipped }) {
  const subtotal = items.reduce((n, i) => n + parseFloat(i.price.replace(/\D/g, "")), 0)
  return (
    <div className="absolute inset-y-0 right-0 z-20 w-[19em] max-w-[80%] animate-[fade-up_0.4s_var(--motion-ease)] border-l border-outline bg-surface-1 shadow-[var(--shadow-lg)]">
      <div className="flex items-center justify-between border-b border-outline px-[1em] py-[0.7em]">
        <p className="text-[0.78em] font-bold">Tu carrito</p>
        <button type="button" onClick={onClose} aria-label="Cerrar carrito" className="grid size-[1.7em] place-items-center rounded-[0.4em] text-text-3 hover:bg-surface-2">
          <X size="0.85em" />
        </button>
      </div>
      <div className="flex flex-col gap-[0.6em] overflow-y-auto p-[1em]" style={{ maxHeight: "22em" }}>
        {items.length === 0 && (
          <p className="text-[0.68em] text-text-3">El carrito está vacío.</p>
        )}
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-[0.6em] rounded-[0.7em] border border-outline p-[0.6em]">
            <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.5em]" style={{ backgroundColor: toneSoft(i.tone), color: toneVar(i.tone) }}>
              <i.Icon size="1em" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.68em] font-semibold">{i.name}</p>
              <p className="text-[0.56em] text-text-3">{i.color} · Gris</p>
            </div>
            <span className="font-mono text-[0.62em] font-semibold">{i.price}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-outline px-[1em] py-[0.7em]">
        <div className="flex items-center justify-between text-[0.7em]">
          <span className="text-text-3">Subtotal</span>
          <span className="font-bold">${subtotal.toLocaleString("es-AR")}</span>
        </div>
        <div className="mt-[0.3em] h-[0.35em] overflow-hidden rounded-full bg-surface-3">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: shipped ? "100%" : `${Math.min((subtotal / 400000) * 100, 92)}%`, backgroundColor: toneVar(tone) }} />
        </div>
        <p className="mt-[0.3em] text-[0.58em] text-text-3">{shipped ? "Envío gratis aplicado" : "Faltan $180.000 para envío gratis"}</p>
        <div className="mt-[0.6em] flex items-center gap-[0.5em]">
          <Btn tone={tone} className="flex-1 justify-center" onClick={onShip}>Finalizar compra</Btn>
          <GhostBtn onClick={onClose}>Seguir</GhostBtn>
        </div>
        {shipped && (
          <p className="mt-[0.5em] animate-[fade-pop_0.4s_var(--motion-ease)] text-center text-[0.58em] font-semibold" style={{ color: toneVar("acc-gestion") }}>
            Pedido confirmado · Entrega mañana 10-14h
          </p>
        )}
      </div>
    </div>
  )
}
