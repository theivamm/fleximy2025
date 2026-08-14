import { useEffect, useMemo, useRef, useState } from "react"
import { Armchair, Check, Headphones, Home, Lamp, LayoutGrid, Search, ShoppingBag, Sparkles, Tag, Watch, X } from "lucide-react"
import { Btn, GhostBtn, Kpi } from "../primitives"
import { toneSoft, toneVar } from "../industries"
import { useTimeline } from "../../hero/hooks"
import { useConceptFlow, HotspotLayer } from "../Hotspot"
import { useLabFrame } from "../BrowserFrame"
import { useToast } from "../useToast"
import MobileShell from "../MobileShell"

const CATEGORIES = ["Todas", "Iluminación", "Living", "Tecnología", "Accesorios"]
const PRODUCTS = [
  { id: "aurora", name: "Lámpara Aurora", cat: "Iluminación", price: "$89.900", old: "$112.000", stock: 12, tone: "acc-comercio", Icon: Lamp, color: "Blanco cálido" },
  { id: "nomade", name: "Sillón Nómade", cat: "Living", price: "$412.000", old: null, stock: 4, tone: "acc-inmob", Icon: Armchair, color: "Gris antracita" },
  { id: "sona", name: "Auriculares Sona", cat: "Tecnología", price: "$128.500", old: "$150.000", stock: 26, tone: "acc-educacion", Icon: Headphones, color: "Negro" },
  { id: "lumen", name: "Reloj Lumen", cat: "Accesorios", price: "$64.900", old: null, stock: 8, tone: "acc-gastro", Icon: Watch, color: "Cuerina tostada" },
]

export default function Distrito({ demo }) {
  const [tab, setTab] = useState("catalogo")
  const [cat, setCat] = useState("Todas")
  const [oferta, setOferta] = useState(false)
  const [selected, setSelected] = useState(null)
  const [variant, setVariant] = useState("Natural")
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [shipped, setShipped] = useState(false)
  const [toast, setToast] = useToast()

  const { compact } = useLabFrame()

  const rootRef = useRef(null)
  const catTecnologiaRef = useRef(null)
  const cardSonaRef = useRef(null)
  const variantRef = useRef(null)
  const addRef = useRef(null)
  const selectedRef = useRef(null)
  selectedRef.current = selected

  const addToCart = () => {
    const s = selectedRef.current
    if (!s) return
    setCart((c) =>
      c.find((i) => i.id === s.id) ? c.map((i) => (i.id === s.id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...s, qty: 1, variant }]
    )
    setCartOpen(true)
    setToast(`${s.name} · ${variant} agregado`)
  }

  const openProduct = (id) => {
    setSelected(PRODUCTS.find((p) => p.id === id))
    setCartOpen(false)
  }

  const chooseCat = (c) => {
    setCat(c)
    setSelected(null)
    setCartOpen(false)
  }

  const handleOpen = (id) => {
    if (selected) return
    openProduct(id)
    if (id === "sona") flow.step(1)
  }

  const handleAdd = (id) => {
    if (id === "sona") flow.step(3)
    else addToCart()
  }

  const handleNav = (k) => {
    setTab(k)
    if (k === "ofertas") { setOferta(true); setCat("Todas") }
    else if (k === "catalogo") setOferta(false)
    setSelected(null)
    setCartOpen(false)
  }

  const steps = useMemo(
    () => [
      { label: "Filtrar por categoría", cue: () => catTecnologiaRef.current, run: () => chooseCat("Tecnología") },
      { label: "Abrir el producto", cue: () => cardSonaRef.current, run: () => openProduct("sona") },
      { label: "Elegir la variante", cue: () => variantRef.current, run: () => setVariant("Gris") },
      { label: "Agregar al carrito", cue: () => addRef.current, run: addToCart },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const flow = useConceptFlow({ steps, pause: demo.pause })

  const timeline = useMemo(
    () =>
      steps.map((s, i) => ({
        at: 500 + i * 2000,
        run: () => {
          const el = s.cue()
          if (el) demo.getCursor()?.moveTo(el, { wait: 80 })
          flow.storyStep(i)
        },
      })),
    [steps, flow, demo]
  )

  useTimeline({ active: demo.playing, cycle: demo.cycle, steps: timeline, hold: 2200, onComplete: demo.bump })

  useEffect(() => {
    setSelected(null)
    setVariant("Natural")
    setCart([])
    setCartOpen(false)
    setShipped(false)
    setCat("Todas")
    setOferta(false)
    setToast(null)
    setTab("catalogo")
    flow.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.cycle])

  const filtered = PRODUCTS.filter((p) => (cat === "Todas" ? true : p.cat === cat)).filter((p) => (oferta ? p.old : true))
  const cartCount = cart.reduce((n, i) => n + i.qty, 0)

  if (compact) {
    return (
      <div ref={rootRef} className="relative flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
        <MobileShell
          tone={demo.tone}
          icon={<ShoppingBag size="0.95em" />}
          brand="distrito."
          subtitle="Interiorismo & diseño"
          status={
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
              className="relative grid size-[2em] shrink-0 place-items-center rounded-[0.5em] text-text-1 transition-colors hover:bg-surface-2"
            >
              <ShoppingBag size="0.95em" />
              {cartCount > 0 && (
                <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.95em] place-items-center rounded-full text-[0.52em] font-bold text-white" style={{ backgroundColor: toneVar(demo.tone) }}>
                  {cartCount}
                </span>
              )}
            </button>
          }
          tabs={[
            { key: "inicio", label: "Inicio", Icon: Home },
            { key: "catalogo", label: "Catálogo", Icon: LayoutGrid },
            { key: "categorias", label: "Categorías", Icon: Tag },
            { key: "ofertas", label: "Ofertas", Icon: Sparkles },
          ]}
          tab={tab}
          onTab={handleNav}
          overlay={
            <>
              {toast && (
                <div aria-live="polite" className="absolute inset-x-0 bottom-[3.6em] z-40 flex justify-center px-[1em]">
                  <div className="flex animate-[fade-up_0.4s_var(--motion-ease)] items-center gap-[0.5em] rounded-full border border-outline-strong bg-surface-1 px-[1em] py-[0.5em] shadow-[var(--shadow-md)]">
                    <span className="grid size-[1.1em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                      <Check size="0.65em" />
                    </span>
                    <span className="text-[0.68em] font-semibold">{toast}</span>
                  </div>
                </div>
              )}
              {cartOpen && (
                <CartDrawer
                  items={cart}
                  tone={demo.tone}
                  onClose={() => setCartOpen(false)}
                  onShip={() => { setShipped(true); setToast("Pedido confirmado · envío gratis") }}
                  shipped={shipped}
                />
              )}
              <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
            </>
          }
        >
          <div className="grid grid-cols-2 gap-[0.55em]">
            <Kpi label="Ventas del mes" value="$3.2M" delta={18} />
            <Kpi label="Pedidos activos" value="47" delta={9} />
            <Kpi label="Ticket promedio" value="$84.200" delta={5} />
            <Kpi label="Conversión" value="3,8%" delta={-1} />
          </div>

          {(tab === "catalogo" || tab === "ofertas") && (
            <>
              {tab === "catalogo" && (
                <div className="mt-[0.65em] flex flex-wrap gap-[0.35em]">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      ref={c === "Tecnología" ? catTecnologiaRef : undefined}
                      onClick={() => chooseCat(c)}
                      className="rounded-full border px-[0.6em] py-[0.3em] text-[0.58em] font-semibold transition-colors"
                      style={{
                        borderColor: cat === c ? toneVar(demo.tone) : "var(--color-outline)",
                        backgroundColor: cat === c ? toneSoft(demo.tone) : "var(--color-surface-1)",
                        color: cat === c ? toneVar(demo.tone) : "var(--color-text-2)",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-[0.65em] grid grid-cols-2 gap-[0.7em]">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    selected={selected?.id === p.id}
                    variant={variant}
                    onOpen={() => handleOpen(p.id)}
                    onVariant={(c) => { setVariant(c); if (p.id === "sona" && c === "Gris") flow.step(2) }}
                    onAdd={() => handleAdd(p.id)}
                    cardRef={p.id === "sona" ? cardSonaRef : undefined}
                    variantRef={p.id === "sona" ? variantRef : undefined}
                    addRef={p.id === "sona" ? addRef : undefined}
                    tone={demo.tone}
                  />
                ))}
              </div>
              {filtered.length === 0 && <p className="py-[2em] text-center text-[0.66em] text-text-4">Sin productos para este filtro.</p>}
            </>
          )}
          {tab === "inicio" && <div className="mt-[0.65em]"><InicioView products={PRODUCTS} onOpen={(id) => { openProduct(id); setTab("catalogo") }} onShop={() => setTab("catalogo")} tone={demo.tone} /></div>}
          {tab === "categorias" && <div className="mt-[0.65em]"><CategoriasView onSelect={(c) => { chooseCat(c); setTab("catalogo") }} /></div>}
        </MobileShell>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative flex h-full flex-col bg-surface-2" style={{ color: "var(--color-text-1)" }}>
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} tone={demo.tone} onNav={handleNav} oferta={oferta} tab={tab} />

      <div className="relative flex min-h-0 flex-1">
        <aside className="hidden w-[13em] shrink-0 flex-col gap-[0.9em] border-r border-outline bg-surface-1 p-[1em] lg:block">
          <div>
            <p className="mb-[0.5em] font-mono text-[0.55em] uppercase tracking-[0.1em] text-text-3">Categorías</p>
            <div className="flex flex-col gap-[0.15em]">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  ref={c === "Tecnología" ? catTecnologiaRef : undefined}
                  onClick={() => chooseCat(c)}
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
            <div className="flex gap-[0.4em]">
              <button
                type="button"
                onClick={() => chooseCat("Todas")}
                className="flex-1 rounded-[0.4em] border px-[0.5em] py-[0.35em] text-[0.6em] font-semibold transition-colors"
                style={{ borderColor: !oferta ? toneVar(demo.tone) : "var(--color-outline)", color: !oferta ? toneVar(demo.tone) : "var(--color-text-2)" }}
              >
                Todas
              </button>
              <button
                type="button"
                onClick={() => { chooseCat("Todas"); setOferta(true) }}
                className="flex-1 rounded-[0.4em] border px-[0.5em] py-[0.35em] text-[0.6em] font-semibold transition-colors"
                style={{ borderColor: oferta ? toneVar(demo.tone) : "var(--color-outline)", color: oferta ? toneVar(demo.tone) : "var(--color-text-2)" }}
              >
                En oferta
              </button>
            </div>
            <p className="mt-[0.45em] text-[0.6em] text-text-3">$22.900 — $412.000</p>
          </div>
          <div>
            <p className="mb-[0.5em] font-mono text-[0.55em] uppercase tracking-[0.1em] text-text-3">Descuentos</p>
            <button
              type="button"
              role="switch"
              aria-checked={oferta}
              onClick={() => setOferta((o) => !o)}
              className="flex w-full items-center gap-[0.5em] rounded-[0.4em] px-[0.5em] py-[0.35em] text-left text-[0.68em] text-text-2 transition-colors hover:bg-surface-2"
            >
              <span className="relative h-[1.1em] w-[2em] rounded-full transition-colors" style={{ backgroundColor: oferta ? toneVar(demo.tone) : "var(--color-surface-3)" }}>
                <span className="absolute left-[0.12em] top-[0.12em] size-[0.85em] rounded-full bg-white transition-transform duration-200" style={{ transform: oferta ? "translateX(0.9em)" : "none" }} />
              </span>
              Solo en oferta
            </button>
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
            {(tab === "catalogo" || tab === "ofertas") && (
              <>
                <div className="grid grid-cols-2 gap-[0.7em] xl:grid-cols-4">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      selected={selected?.id === p.id}
                      variant={variant}
                      onOpen={() => handleOpen(p.id)}
                      onVariant={(c) => { setVariant(c); if (p.id === "sona" && c === "Gris") flow.step(2) }}
                      onAdd={() => handleAdd(p.id)}
                      cardRef={p.id === "sona" ? cardSonaRef : undefined}
                      variantRef={p.id === "sona" ? variantRef : undefined}
                      addRef={p.id === "sona" ? addRef : undefined}
                      tone={demo.tone}
                    />
                  ))}
                </div>
                {filtered.length === 0 && <p className="py-[2em] text-center text-[0.66em] text-text-4">Sin productos para este filtro.</p>}
              </>
            )}
            {tab === "inicio" && <InicioView products={PRODUCTS} onOpen={(id) => { openProduct(id); setTab("catalogo") }} onShop={() => setTab("catalogo")} tone={demo.tone} />}
            {tab === "categorias" && <CategoriasView onSelect={(c) => { chooseCat(c); setTab("catalogo") }} />}
          </div>
        </div>

        {toast && (
          <div aria-live="polite" className="absolute inset-x-0 bottom-[0.9em] z-40 flex justify-center px-[1em]">
            <div className="flex animate-[fade-up_0.4s_var(--motion-ease)] items-center gap-[0.5em] rounded-full border border-outline-strong bg-surface-1 px-[1em] py-[0.5em] shadow-[var(--shadow-md)]">
              <span className="grid size-[1.1em] place-items-center rounded-full text-white" style={{ backgroundColor: toneVar("acc-gestion") }}>
                <Check size="0.65em" />
              </span>
              <span className="text-[0.68em] font-semibold">{toast}</span>
            </div>
          </div>
        )}

        {cartOpen && (
          <CartDrawer
            items={cart}
            tone={demo.tone}
            onClose={() => setCartOpen(false)}
            onShip={() => { setShipped(true); setToast("Pedido confirmado · envío gratis") }}
            shipped={shipped}
          />
        )}
      </div>

      <HotspotLayer flow={flow} containerRef={rootRef} tone={demo.tone} resetDemo={demo.reset} next={demo.next} />
    </div>
  )
}

function Header({ cartCount, onCart, tone, onNav, oferta, tab }) {
  return (
    <div className="flex items-center gap-[1em] border-b border-outline bg-surface-1 px-[1.2em] py-[0.6em]">
      <p className="font-display text-[1.05em] font-black tracking-tight">distrito.</p>
      <nav className="hidden items-center gap-[0.9em] text-[0.68em] font-medium text-text-2 md:flex">
        {[
          ["inicio", "Inicio"],
          ["catalogo", "Catálogo"],
          ["categorias", "Categorías"],
          ["ofertas", "Ofertas"],
        ].map(([k, label]) => {
          const active = tab === k || (k === "ofertas" && oferta)
          return (
            <button
              key={k}
              type="button"
              onClick={() => onNav(k)}
              className="flex items-center gap-[0.3em] transition-colors hover:text-text-1"
              style={{ color: active ? toneVar(tone) : undefined, fontWeight: active ? 700 : 500 }}
            >
              {label}
              {k === "ofertas" && oferta && <Check size="0.7em" />}
            </button>
          )
        })}
      </nav>
      <span className="ml-auto hidden items-center gap-[0.4em] rounded-[0.5em] border border-outline bg-surface-2 px-[0.7em] py-[0.35em] text-[0.62em] text-text-3 md:flex lg:max-w-[18em]">
        <Search size="0.8em" /> Buscar productos…
      </span>
      <button
        type="button"
        onClick={onCart}
        className="relative ml-auto grid size-[2em] shrink-0 place-items-center rounded-[0.5em] text-text-1 transition-colors hover:bg-surface-2 md:ml-0"
        aria-label="Abrir carrito"
      >
        <ShoppingBag size="0.95em" />
        {cartCount > 0 && (
          <span className="absolute -right-[0.2em] -top-[0.2em] grid size-[0.95em] place-items-center rounded-full text-[0.52em] font-bold text-white" style={{ backgroundColor: toneVar(tone) }}>
            {cartCount}
          </span>
        )}
      </button>
      <Btn tone={tone} onClick={onCart}>Hacer pedido</Btn>
    </div>
  )
}

function ProductCard({ product: p, selected, variant, onOpen, onVariant, onAdd, cardRef, variantRef, addRef, tone }) {
  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      className="relative flex cursor-pointer flex-col overflow-hidden rounded-[0.8em] border border-outline bg-surface-1 transition-colors hover:border-outline-strong"
    >
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
                  onClick={(e) => { e.stopPropagation(); onVariant(c) }}
                  ref={c === "Gris" ? variantRef : undefined}
                  className="flex items-center gap-[0.3em] rounded-full border px-[0.5em] py-[0.2em] text-[0.56em] font-medium transition-colors"
                  style={{ borderColor: variant === c ? toneVar(tone) : "var(--color-outline)", color: variant === c ? toneVar(tone) : "var(--color-text-2)", backgroundColor: variant === c ? toneSoft(tone) : "transparent" }}
                >
                  {variant === c && <Check size="0.7em" />} {c}
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
            onClick={(e) => { e.stopPropagation(); onOpen() }}
            className="mt-auto inline-flex items-center gap-[0.3em] rounded-[0.5em] border border-outline-strong px-[0.7em] py-[0.3em] text-[0.58em] font-semibold text-text-2 transition-colors hover:text-text-1"
          >
            Elegir variante
          </button>
        )}
      </div>
    </div>
  )
}

function FeaturedCard({ product: p, onOpen }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[0.8em] border border-outline bg-surface-1 transition-colors hover:border-outline-strong">
      <div className="grid h-[6em] place-items-center" style={{ backgroundColor: toneSoft(p.tone) }}>
        <p.Icon size="2.4em" style={{ color: toneVar(p.tone) }} />
      </div>
      <div className="flex flex-1 flex-col p-[0.7em]">
        <p className="truncate text-[0.7em] font-semibold">{p.name}</p>
        <p className="mt-[0.1em] text-[0.56em] text-text-3">{p.cat} · {p.color}</p>
        <div className="mt-[0.3em] flex items-baseline gap-[0.5em]">
          <span className="text-[0.82em] font-bold">{p.price}</span>
          {p.old && <span className="text-[0.56em] text-text-4 line-through">{p.old}</span>}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="mt-[0.6em] inline-flex items-center justify-center gap-[0.3em] rounded-[0.5em] border border-outline-strong px-[0.7em] py-[0.3em] text-[0.58em] font-semibold text-text-2 transition-colors hover:text-text-1"
        >
          Ver producto
        </button>
      </div>
    </div>
  )
}

function InicioView({ products, onOpen, onShop, tone }) {
  const featured = [products[0], products[2], products[1]]
  return (
    <div className="flex flex-col gap-[0.9em]">
      <div className="relative overflow-hidden rounded-[0.9em] border border-outline p-[1.2em]" style={{ backgroundColor: toneSoft(tone) }}>
        <p className="font-display text-[1.15em] font-black" style={{ color: toneVar(tone) }}>Nueva colección · Interiorismo que vive</p>
        <p className="mt-[0.3em] max-w-[26em] text-[0.66em] leading-relaxed text-text-2">Piezas seleccionadas para tu espacio: lámparas cálidas, sillones modulares y accesorios con identidad.</p>
        <button
          type="button"
          onClick={onShop}
          className="mt-[0.8em] rounded-[0.5em] px-[0.9em] py-[0.45em] text-[0.62em] font-bold text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: toneVar(tone) }}
        >
          Ver catálogo
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[0.72em] font-bold">Destacados</p>
          <button type="button" onClick={onShop} className="text-[0.58em] font-semibold" style={{ color: toneVar(tone) }}>Ver todo</button>
        </div>
        <div className="mt-[0.6em] grid grid-cols-2 gap-[0.7em] xl:grid-cols-4">
          {featured.map((p) => (
            <FeaturedCard key={p.id} product={p} onOpen={() => onOpen(p.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoriasView({ onSelect }) {
  const cats = [
    ["Iluminación", Lamp],
    ["Living", Armchair],
    ["Tecnología", Headphones],
    ["Accesorios", Watch],
  ]
  return (
    <div className="grid grid-cols-2 gap-[0.7em] xl:grid-cols-4">
      {cats.map(([c, Icon]) => {
        const p = PRODUCTS.find((x) => x.cat === c)
        const n = PRODUCTS.filter((x) => x.cat === c).length
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            className="group flex flex-col items-start gap-[0.6em] rounded-[0.8em] border border-outline bg-surface-1 p-[0.9em] text-left transition-all hover:border-outline-strong"
          >
            <span className="grid size-[2.2em] place-items-center rounded-[0.6em]" style={{ backgroundColor: toneSoft(p.tone), color: toneVar(p.tone) }}>
              <Icon size="1em" />
            </span>
            <span>
              <p className="text-[0.72em] font-bold">{c}</p>
              <p className="mt-[0.1em] font-mono text-[0.54em] text-text-3">{n} productos</p>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function CartDrawer({ items, tone, onClose, onShip, shipped }) {
  const subtotal = items.reduce((n, i) => n + parseInt(i.price.replace(/\D/g, "")), 0)
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
              <p className="text-[0.56em] text-text-3">{i.variant}</p>
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
