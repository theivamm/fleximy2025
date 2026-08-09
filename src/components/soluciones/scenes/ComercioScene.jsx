import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, Check, ShoppingCart } from "lucide-react"
import { Chrome, Status } from "../Primitives"

export default function ComercioScene() {
  const [precio, setPrecio] = useState(189900)
  const [stock, setStock] = useState(4)
  const [agotado, setAgotado] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const guardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 1400)
  }

  const disponible = !agotado && stock > 0

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FichaPublica precio={precio} disponible={disponible} stock={stock} />
      <PanelEdicion
        precio={precio}
        setPrecio={setPrecio}
        stock={stock}
        setStock={setStock}
        agotado={agotado}
        setAgotado={setAgotado}
        guardar={guardar}
        guardado={guardado}
      />
    </div>
  )
}

function FichaPublica({ precio, disponible, stock }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome
        url="fleximy.app/tu-tienda/urbana-26"
        right={<span className="font-mono text-micro text-muted">web pública</span>}
      />
      <div className="flex flex-1 gap-4 p-4">
        <div className="grid aspect-square w-28 shrink-0 place-items-center rounded-2xl bg-paper">
          <BiciGeometrica />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-mono text-micro text-muted">Bicicletas Alba</p>
          <h3 className="mt-1 text-h4 text-text">Bicicleta urbana — Rodado 26</h3>
          <div className="mt-2 flex items-center gap-2">
            <Status tone={disponible ? "activo" : "gris"}>{disponible ? "En stock" : "Sin stock"}</Status>
            {disponible && <span className="font-mono text-micro text-muted">{stock} disponibles</span>}
          </div>
          <motion.p
            key={precio}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto text-h3 text-text"
          >
            ${precio.toLocaleString("es-AR")}
          </motion.p>
          <button
            disabled={!disponible}
            className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent text-sm font-semibold text-ink disabled:opacity-40"
          >
            <ShoppingCart className="size-4" />
            Consultar / Comprar
          </button>
        </div>
      </div>
      <div className="border-t border-line px-4 py-2.5">
        <p className="font-mono text-micro text-muted">demo · datos ilustrativos</p>
      </div>
    </div>
  )
}

function BiciGeometrica() {
  return (
    <svg viewBox="0 0 96 96" className="size-16" aria-hidden="true">
      <circle cx="36" cy="62" r="16" fill="none" stroke="var(--color-acc-comercio)" strokeWidth="4" />
      <circle cx="64" cy="62" r="16" fill="none" stroke="var(--color-ink)" strokeWidth="4" />
      <path
        d="M36 46 L52 28 L64 46 M52 28 L58 46 M36 46 L64 46 M36 46 L40 62 M64 46 L58 62"
        stroke="var(--color-ink)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PanelEdicion({ precio, setPrecio, stock, setStock, agotado, setAgotado, guardar, guardado }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-ink text-text-invert shadow-lift">
      <Chrome
        dark
        url="panel · editar producto"
        right={
          guardado ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1 font-mono text-micro text-cyan"
            >
              <Check className="size-3.5" />
              guardado
            </motion.span>
          ) : undefined
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Ficha del producto</p>
          <span className="font-mono text-micro text-text-invert/50">panel interno</span>
        </div>

        <label className="grid gap-1.5">
          <span className="font-mono text-micro text-text-invert/60">Precio</span>
          <div className="flex items-center gap-2 rounded-xl border border-line-dark bg-ink-soft px-3 py-2">
            <span className="font-mono text-micro text-text-invert/50">$</span>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value) || 0)}
              className="w-full bg-transparent font-mono text-lg text-text-invert outline-none"
              aria-label="Precio del producto"
            />
          </div>
          <p className="font-mono text-[10px] text-text-invert/40">se actualiza en la web al instante</p>
        </label>

        <div className="grid gap-1.5">
          <span className="font-mono text-micro text-text-invert/60">Stock</span>
          <div className="flex items-center justify-between rounded-xl border border-line-dark bg-ink-soft px-3 py-2">
            <button
              onClick={() => setStock((s) => Math.max(0, s - 1))}
              aria-label="Quitar stock"
              className="grid size-8 place-items-center rounded-lg bg-ink-muted text-text-invert"
            >
              <Minus className="size-4" />
            </button>
            <span className="font-mono text-lg">{stock}</span>
            <button
              onClick={() => setStock((s) => s + 1)}
              aria-label="Sumar stock"
              className="grid size-8 place-items-center rounded-lg bg-ink-muted text-text-invert"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <label className="flex items-center justify-between rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5">
          <span className="text-small">Marcar como agotado</span>
          <button
            onClick={() => setAgotado((a) => !a)}
            role="switch"
            aria-checked={agotado}
            className={`relative h-6 w-11 rounded-full transition-colors ${agotado ? "bg-accent" : "bg-ink-muted"}`}
          >
            <span
              className={`absolute top-1 size-4 rounded-full bg-ink transition-all ${agotado ? "left-6" : "left-1"}`}
            />
          </button>
        </label>

        <button
          onClick={guardar}
          className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent font-semibold text-ink"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
