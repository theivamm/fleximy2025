import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ChevronRight } from "lucide-react"
import { Chrome, Status } from "../Primitives"

const CATEGORIAS = ["Platos", "Panadería", "Bebidas"]

const PRODUCTOS = [
  { id: "tortilla", nombre: "Tortilla de papas", precio: 5200, cat: "Platos" },
  { id: "empanada", nombre: "Empanada de carne", precio: 1450, cat: "Platos" },
  { id: "ciabatta", nombre: "Ciabatta artesanal", precio: 1800, cat: "Panadería" },
  { id: "medialuna", nombre: "Medialuna de manteca", precio: 650, cat: "Panadería" },
]

let comandaId = 0

export default function GastroScene({ mode, onAction }) {
  const [pedido, setPedido] = useState([])
  const [comandas, setComandas] = useState([])
  const [precios, setPrecios] = useState({})
  const [disponibilidad, setDisponibilidad] = useState({})

  const notificar = (accion) => onAction?.(accion)

  const precioDe = (p) => precios[p.id] ?? p.precio
  const disponibleDe = (p) => disponibilidad[p.id] !== false

  const agregar = (producto) => {
    if (!disponibleDe(producto)) return
    setPedido((p) => (p.includes(producto.id) ? p : [...p, producto.id]))
    const nuevo = {
      id: comandaId++,
      nombre: producto.nombre,
      precio: precioDe(producto),
      estado: "Nuevo",
    }
    setComandas((c) => [nuevo, ...c])
    notificar("agregar_plato")
  }

  const avanzar = (id) => {
    setComandas((c) =>
      c.map((cmd) =>
        cmd.id === id
          ? {
              ...cmd,
              estado:
                cmd.estado === "Nuevo"
                  ? "En preparación"
                  : cmd.estado === "En preparación"
                    ? "Listo"
                    : cmd.estado,
            }
          : cmd
      )
    )
    notificar("avanzar_pedido")
  }

  const modoEquipo = mode === "equipo"
  const mostrarAmbos = !mode

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
      {(!modoEquipo || mostrarAmbos) && (
        <MenuPhone
          pedido={pedido}
          agregar={agregar}
          precios={precios}
          precioDe={precioDe}
          disponibleDe={disponibleDe}
          notificar={notificar}
        />
      )}
      {(modoEquipo || mostrarAmbos) && (
        <Cocina
          comandas={comandas}
          avanzar={avanzar}
          controles={modoEquipo}
          productos={PRODUCTOS}
          setPrecios={setPrecios}
          setDisponibilidad={setDisponibilidad}
          precioDe={precioDe}
          disponibleDe={disponibleDe}
          notificar={notificar}
        />
      )}
    </div>
  )
}

function MenuPhone({ pedido, agregar, precioDe, disponibleDe, notificar }) {
  const [cat, setCat] = useState("Platos")
  const items = PRODUCTOS.filter((p) => p.cat === cat)

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome url="fleximy.app/la-espiga/menu" right={<span className="font-mono text-micro text-muted">QR</span>} />
      <div className="flex-1 p-4">
        <p className="text-sm font-semibold text-text">Menú · La Espiga</p>
        <div className="mt-3 flex gap-1.5" data-guiado="filtrar_categoria">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c)
                notificar("filtrar_categoria")
              }}
              className={`rounded-full px-3 py-1.5 font-mono text-micro transition-colors ${
                cat === c ? "bg-dark-surface text-text-invert" : "bg-paper text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-4 grid gap-2">
          <AnimatePresence mode="popLayout">
            {items.map((p) => {
              const disponible = disponibleDe(p)
              return (
                <motion.li
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium text-text">{p.nombre}</p>
                    <p className="font-mono text-micro text-muted">
                      ${precioDe(p).toLocaleString("es-AR")}
                    </p>
                  </div>
                  {!disponible ? (
                    <Status tone="gris">Agotado</Status>
                  ) : pedido.includes(p.id) ? (
                    <span className="grid size-8 place-items-center rounded-full bg-dark-surface text-text-invert">
                      <CheckIcon />
                    </span>
                  ) : (
                    <button
                      onClick={() => agregar(p)}
                      aria-label={`Agregar ${p.nombre}`}
                      data-guiado="agregar_plato"
                      className="grid size-8 place-items-center rounded-full bg-accent text-on-accent"
                    >
                      <Plus className="size-4" />
                    </button>
                  )}
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        <div className="mt-4 rounded-xl border border-line bg-paper px-3 py-2.5">
          <p className="text-small font-medium text-text">
            {pedido.length} {pedido.length === 1 ? "producto seleccionado" : "productos seleccionados"}
          </p>
          <button
            disabled={pedido.length === 0}
            onClick={() => {
              setPedido([])
              notificar("enviar_pedido")
            }}
            data-guiado="enviar_pedido"
            className="mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent text-sm font-semibold text-on-accent disabled:opacity-40"
          >
            Enviar pedido
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Cocina({
  comandas,
  avanzar,
  controles,
  productos,
  setPrecios,
  setDisponibilidad,
  precioDe,
  disponibleDe,
  notificar,
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
      <Chrome
        dark
        url="panel · pantalla de cocina"
        right={<span className="font-mono text-micro text-cyan">{comandas.length} en cola</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Comandas</p>
          <span className="font-mono text-micro text-text-invert/50">demo · datos ilustrativos</span>
        </div>

        {comandas.length === 0 ? (
          <div className="mt-6 grid place-items-center rounded-xl border border-dashed border-line-dark py-10 text-center">
            <p className="text-small text-text-invert/50">
              Agregá un plato desde el menú
              <br />
              <span className="font-mono text-micro text-text-invert/35">la comanda aparece acá</span>
            </p>
          </div>
        ) : (
          <ul className="mt-4 grid gap-2">
            <AnimatePresence initial={false}>
              {comandas.map((cmd) => (
                <motion.li
                  layout
                  key={cmd.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-xl border border-line-dark bg-ink-soft px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{cmd.nombre}</p>
                      <p className="font-mono text-micro text-text-invert/50">
                        ${cmd.precio.toLocaleString("es-AR")} · mesa 4
                      </p>
                    </div>
                    <Status
                      tone={cmd.estado === "Listo" ? "listo" : cmd.estado === "En preparación" ? "activo" : "nueva"}
                      dark
                    >
                      {cmd.estado}
                    </Status>
                  </div>
                  {cmd.estado !== "Listo" && (
                    <button
                      onClick={() => avanzar(cmd.id)}
                      data-guiado="avanzar_pedido"
                      className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-dark px-3 font-mono text-micro text-text-invert/80 hover:border-accent hover:text-text-invert"
                    >
                      {cmd.estado === "Nuevo" ? "Pasar a preparación" : "Marcar listo"}
                      <ChevronRight className="size-3.5" />
                    </button>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {controles && (
          <div className="mt-5 rounded-xl border border-line-dark bg-ink-soft p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Control del menú</p>
              <span className="font-mono text-micro text-text-invert/50">se refleja en la web</span>
            </div>
            <ul className="mt-3 grid gap-2">
              {productos.map((p) => (
                <li key={p.id} className="rounded-lg border border-line-dark bg-ink-muted px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-small text-text-invert/85">{p.nombre}</p>
                    <button
                      onClick={() => {
                        setDisponibilidad((d) => ({ ...d, [p.id]: disponibleDe(p) ? false : true }))
                        notificar("cambiar_disponibilidad")
                      }}
                      role="switch"
                      aria-checked={disponibleDe(p)}
                      data-guiado="cambiar_disponibilidad"
                      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                        disponibleDe(p) ? "bg-accent" : "bg-dark-surface"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 size-4 rounded-full bg-dark-surface transition-all ${
                          disponibleDe(p) ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-mono text-micro text-text-invert/40">$</span>
                    <input
                      type="number"
                      value={precioDe(p)}
                      onChange={(e) => {
                        setPrecios((pr) => ({ ...pr, [p.id]: Number(e.target.value) || 0 }))
                        notificar("modificar_precio")
                      }}
                      data-guiado="modificar_precio"
                      className="w-full rounded-md border border-line-dark bg-ink-soft px-2 py-1 font-mono text-micro text-text-invert outline-none"
                      aria-label={`Precio de ${p.nombre}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
