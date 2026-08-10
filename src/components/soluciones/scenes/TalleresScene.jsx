import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Wrench } from "lucide-react"
import { Chrome, Status } from "../Primitives"

const ESTADOS = [
  "Recibido",
  "En diagnóstico",
  "Presupuesto enviado",
  "Aprobado",
  "En reparación",
  "Listo para retirar",
  "Entregado",
]

const REPUESTOS = [
  { codigo: "R-0012", nombre: "Aceite sintético 5W30", cantidad: 1, estado: "En pedido" },
  { codigo: "R-0340", nombre: "Filtro de aceite", cantidad: 1, estado: "En pedido" },
]

export default function TalleresScene({ onAction }) {
  const [estado, setEstado] = useState(0)

  const actual = ESTADOS[estado]

  const avanzar = () => {
    setEstado((e) => Math.min(e + 1, ESTADOS.length - 1))
    onAction?.("avanzar_estado")
  }
  const reiniciar = () => {
    setEstado(0)
    onAction?.("reiniciar_demo")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)]">
      <OrdenTrabajo actual={estado} avanzar={avanzar} reiniciar={reiniciar} />
      <ConsultaCliente actual={actual} />
    </div>
  )
}

function OrdenTrabajo({ actual, avanzar, reiniciar }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
      <Chrome
        dark
        url="panel · orden de trabajo #1042"
        right={<span className="font-mono text-micro text-cyan">OT #1042</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Gonzalo T. — Peugeot 208</p>
            <p className="font-mono text-micro text-text-invert/50">ingreso: lunes · motivo: ruido en dirección</p>
          </div>
          <Status tone={actual === "Entregado" ? "listo" : actual === "En reparación" ? "activo" : "nueva"} dark>
            {actual}
          </Status>
        </div>

        <div className="mt-5 flex items-center gap-1 overflow-x-auto pb-1">
          {ESTADOS.map((e, i) => (
            <div key={e} className="flex shrink-0 items-center gap-1">
              <span
                className={`grid size-6 place-items-center rounded-full font-mono text-[10px] ${
                  i < actual ? "bg-accent text-on-accent" : i === actual ? "border border-cyan text-cyan" : "bg-ink-muted text-text-invert/40"
                }`}
              >
                {i < actual ? "✓" : i + 1}
              </span>
              {i < ESTADOS.length - 1 && (
                <span className={`h-px w-6 ${i < actual ? "bg-accent" : "bg-line-dark"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-micro text-text-invert/50">Diagnóstico y presupuesto</p>
            <ul className="mt-2 grid gap-1.5">
              {[
                { t: "Verificación de dirección", precio: "$18.000" },
                { t: "Reemplazo bieleta", precio: "$22.500" },
              ].map((linea) => (
                <li key={linea.t} className="flex items-center justify-between gap-2 rounded-lg border border-line-dark bg-ink-soft px-3 py-2 font-mono text-micro">
                  <span className="truncate text-text-invert/80">{linea.t}</span>
                  <span className="shrink-0 text-cyan">{linea.precio}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-micro text-text-invert/50">Repuestos asociados</p>
            <ul className="mt-2 grid gap-1.5">
              {REPUESTOS.map((r) => (
                <li key={r.codigo} className="flex items-center justify-between gap-2 rounded-lg border border-line-dark bg-ink-soft px-3 py-2 font-mono text-micro">
                  <span className="min-w-0">
                    <span className="block truncate text-text-invert/80">{r.nombre}</span>
                    <span className="block text-text-invert/40">{r.codigo} · x{r.cantidad}</span>
                  </span>
                  <Status tone="espera" dark>
                    {r.estado}
                  </Status>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={avanzar}
            disabled={actual >= ESTADOS.length - 1}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent text-sm font-semibold text-on-accent disabled:opacity-40"
          >
            Avanzar estado
            <ChevronRight className="size-4" />
          </button>
          <button
            onClick={reiniciar}
            className="grid size-10 place-items-center rounded-[var(--radius-btn)] border border-line-dark text-text-invert/60 hover:text-text-invert"
            aria-label="Reiniciar demo"
          >
            <Wrench className="size-4" />
          </button>
        </div>
        <p className="mt-3 font-mono text-micro text-text-invert/40">demo · datos ilustrativos</p>
      </div>
    </div>
  )
}

function ConsultaCliente({ actual }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome url="tu-taller.com.ar/estado" right={<span className="font-mono text-micro text-muted">cliente</span>} />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-text">Seguimiento de tu trabajo</p>
        <p className="mt-1 font-mono text-micro text-muted">OT #1042 · Peugeot 208</p>

        <div className="mt-4 rounded-xl bg-dark-surface p-4 text-text-invert">
          <p className="font-mono text-micro text-text-invert/50">Estado actual</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={actual}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-h4"
            >
              {actual}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 font-mono text-micro text-text-invert/50">
            última actualización: hace 25 min
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-paper p-4">
          <p className="font-mono text-micro text-muted">Presupuesto</p>
          <p className="mt-1 text-h3 text-text">$40.500</p>
          <p className="font-mono text-micro text-muted">vigente hasta el domingo</p>
        </div>

        <p className="mt-auto pt-4 font-mono text-micro text-muted">
          sin llamadas para saber el estado: el cliente ve el avance acá
        </p>
      </div>
    </div>
  )
}
