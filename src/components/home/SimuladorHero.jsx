import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Check, MoveRight, Bell } from "lucide-react"

const BASE_ROWS = [
  { id: "lucas", name: "Lucas R.", msg: "¿Entregan a domicilio?", estado: "seguimiento" },
  { id: "josefina", name: "Josefina M.", msg: "Presupuesto para 50 porciones", estado: "asignada" },
]

const NUEVA_CONSULTA = {
  id: "camila",
  name: "Camila S.",
  msg: "¿Hacen tortas sin TACC?",
}

const estadoBadge = (estado) => {
  if (estado === "seguimiento") return { label: "En seguimiento", cls: "bg-cyan/15 text-cyan" }
  if (estado === "asignada") return { label: "Asignada", cls: "bg-ink-muted text-text-invert" }
  return { label: "Nueva", cls: "bg-accent text-on-accent" }
}

export default function SimuladorHero() {
  const [fase, setFase] = useState(0)

  useEffect(() => {
    const delays = { 0: 1400, 1: 2000, 2: 2000, 3: 1600 }
    const next = { 0: 1, 1: 2, 2: 3, 3: 0 }
    const t = setTimeout(() => setFase(next[fase]), delays[fase])
    return () => clearTimeout(t)
  }, [fase])

  const completa = fase >= 1
  const enviada = fase >= 2
  const asignada = fase >= 3

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-4">
      <WebPlane completa={completa} enviada={enviada} />
      <div className="flex items-center justify-center gap-2 text-ink lg:flex-col">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
          <MoveRight className="size-4 rotate-90 lg:rotate-0" />
        </span>
        <span className="font-mono text-micro text-muted">consulta → registro</span>
      </div>
      <PanelPlane enviada={enviada} asignada={asignada} />
    </div>
  )
}

function WebPlane({ completa, enviada }) {
  return (
    <div className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#e8a33d]" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="size-2.5 rounded-full bg-cyan" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper px-2 py-1 font-mono text-micro text-muted">
          fleximy.app/maria-panaderia
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-dark-surface font-mono text-sm text-text-invert">
            M
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">Panadería La Espiga</p>
            <p className="font-mono text-micro text-muted">tortas y facturas por encargo</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">Torta por encargo</p>
            <p className="truncate text-small text-muted">personalizada · consulta previa</p>
          </div>
          <span className="shrink-0 rounded-full bg-dark-surface px-3 py-1 text-small text-text-invert">
            Reservar
          </span>
        </div>

        {enviada ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 rounded-xl border border-accent bg-accent-soft px-4 py-3"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              <Check className="size-3.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">Consulta enviada</p>
              <p className="font-mono text-micro text-muted">te respondemos por el mismo canal</p>
            </div>
          </motion.div>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              readOnly
              value={completa ? "Camila S." : ""}
              placeholder="Tu nombre"
              className="h-10 rounded-[var(--radius-field)] border border-line bg-white px-3 text-sm text-text placeholder:text-muted/60"
            />
            <textarea
              readOnly
              value={completa ? "¿Hacen tortas sin TACC?" : ""}
              placeholder="Escribí tu consulta…"
              rows={2}
              className="resize-none rounded-[var(--radius-field)] border border-line bg-white px-3 py-2 text-sm text-text placeholder:text-muted/60"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-4 text-sm font-semibold text-on-accent"
            >
              Enviar consulta
              <Send className="size-3.5" />
            </button>
            {completa && (
              <span className="animate-pulse font-mono text-micro text-muted">enviando…</span>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

function PanelPlane({ enviada, asignada }) {
  const nuevaFila = enviada ? NUEVA_CONSULTA : null

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5">
        <p className="font-mono text-micro text-text-invert/70">panel interno · Fleximy</p>
        <span className="relative grid size-7 place-items-center rounded-full bg-ink-soft text-cyan">
          <Bell className="size-3.5" />
          {enviada && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-accent"
            />
          )}
        </span>
      </div>

      <div className="flex flex-1 gap-0">
        <div className="hidden w-24 flex-col gap-1 border-r border-line-dark p-3 font-mono text-micro text-text-invert/50 sm:flex lg:w-28">
          {["Consultas", "Agenda", "Clientes", "Pedidos"].map((item, i) => (
            <span
              key={item}
              className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-ink-muted text-text-invert" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Consultas</p>
            <span className="rounded-full bg-ink-soft px-2 py-0.5 font-mono text-micro text-cyan">
              {BASE_ROWS.length + (enviada ? 1 : 0)}
            </span>
          </div>

          {BASE_ROWS.map((row) => {
            const badge = estadoBadge(row.estado)
            return (
              <div
                key={row.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{row.name}</p>
                  <p className="truncate font-mono text-micro text-text-invert/50">{row.msg}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-micro ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            )
          })}

          <AnimatePresence>
            {nuevaFila && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between gap-2 rounded-xl border border-accent bg-ink-soft px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{nuevaFila.name}</p>
                  <p className="truncate font-mono text-micro text-text-invert/50">{nuevaFila.msg}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-micro ${
                    asignada ? "bg-cyan/15 text-cyan" : "bg-accent text-on-accent"
                  }`}
                >
                  {asignada ? "Asignada" : "Nueva"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className={`size-1.5 shrink-0 rounded-full ${asignada ? "bg-cyan" : "bg-accent"}`} />
            <p className="font-mono text-micro text-text-invert/50">
              {asignada
                ? "asignada → equipo fleximy"
                : "enviada desde tu web → se ordena sola"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
