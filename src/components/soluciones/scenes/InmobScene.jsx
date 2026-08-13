import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Chrome, Status } from "../Primitives"

const PROPIEDADES = [
  { id: "p1", nombre: "Depto 2 amb. · Palermo", precio: "USD 185.000", op: "Venta", zona: "Palermo", tipo: "Departamento" },
  { id: "p2", nombre: "Casa 3 dorm. · Villa Crespo", precio: "USD 310.000", op: "Venta", zona: "Villa Crespo", tipo: "Casa" },
  { id: "p3", nombre: "Oficina · Microcentro", precio: "USD 950 / mes", op: "Alquiler", zona: "Microcentro", tipo: "Oficina" },
  { id: "p4", nombre: "Local · Caballito", precio: "USD 1.400 / mes", op: "Alquiler", zona: "Caballito", tipo: "Local" },
]

const ZONAS = [
  { id: "Palermo", cx: "30%", cy: "26%" },
  { id: "Villa Crespo", cx: "52%", cy: "38%" },
  { id: "Microcentro", cx: "72%", cy: "22%" },
  { id: "Caballito", cx: "60%", cy: "68%" },
]

export default function InmobScene({ onAction }) {
  const [activa, setActiva] = useState("p1")
  const [lead, setLead] = useState(null)
  const prop = PROPIEDADES.find((p) => p.id === activa)

  const consultar = () => {
    setLead({
      nombre: "Nuevo interesado",
      prop: prop.nombre,
      op: prop.op,
      zona: prop.zona,
      estado: "Nuevo lead",
    })
    onAction?.("consultar_propiedad")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)]">
      <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
        <Chrome
          url="fleximy.app/tu-inmobiliaria"
          right={<span className="font-mono text-micro text-muted">buscador</span>}
        />
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text">Propiedades</p>
            <span className="font-mono text-micro text-muted">demo · datos ilustrativos</span>
          </div>

          <ul className="mt-4 grid gap-2">
            {PROPIEDADES.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setActiva(p.id)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    activa === p.id ? "border-ink bg-paper" : "border-line bg-paper-bright hover:border-ink/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text">{p.nombre}</p>
                      <p className="truncate font-mono text-micro text-muted">
                        {p.zona} · {p.tipo}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-micro text-text">{p.precio}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-accent-soft px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">{prop.nombre}</p>
              <p className="font-mono text-micro text-muted">{prop.zona} · {prop.op}</p>
            </div>
            <button
              onClick={consultar}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[var(--radius-btn)] bg-accent px-4 text-sm font-semibold text-on-accent"
            >
              Consultar
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
        <Chrome dark url="panel · crm" demo />
        <div className="flex-1 p-4">
          <p className="text-sm font-semibold">Mapa de la zona</p>
          <div className="mt-3 relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-soft">
            <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden="true">
              <g fill="none" stroke="rgba(244,243,238,0.14)" strokeWidth="0.4">
                <path d="M20 20 H80 V60 H20 Z" />
                <path d="M12 44 H34 V58 H12 Z" />
                <path d="M62 10 H88 V30 H62 Z" />
                <path d="M66 46 H88 V62 H66 Z" />
                <path d="M24 8 H44 V16 H24 Z" />
              </g>
              {ZONAS.map((z) => (
                <g key={z.id}>
                  <circle
                    cx={z.cx}
                    cy={z.cy}
                    r="3.2"
                    className={z.id === prop.zona ? "" : "opacity-0"}
                    fill="var(--color-acc-inmob)"
                  />
                  <circle
                    cx={z.cx}
                    cy={z.cy}
                    r={z.id === prop.zona ? "7" : "4"}
                    fill="none"
                    stroke={z.id === prop.zona ? "var(--color-acc-inmob)" : "rgba(244,243,238,0.3)"}
                    strokeWidth="0.6"
                    strokeDasharray={z.id === prop.zona ? "0" : "1.4 1.6"}
                  />
                </g>
              ))}
            </svg>
            <span className="absolute left-2 top-2 rounded-full bg-dark-surface/80 px-2 py-1 font-mono text-[10px] text-text-invert/70">
              {prop.zona}
            </span>
          </div>

          <div className="mt-4">
            <p className="font-mono text-micro text-text-invert/50">Lead en el CRM</p>
            <AnimatePresence mode="wait">
              {lead ? (
                <motion.div
                  key={lead.prop}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-xl border border-line-dark bg-ink-soft p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{lead.nombre}</p>
                    <Status tone="nueva" dark>
                      {lead.estado}
                    </Status>
                  </div>
                  <p className="mt-1 font-mono text-micro text-text-invert/60">{lead.prop}</p>
                  <p className="font-mono text-micro text-text-invert/50">
                    {lead.op} · {lead.zona} · próxima acción: contactar
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 rounded-xl border border-dashed border-line-dark px-3 py-4 text-center font-mono text-micro text-text-invert/40"
                >
                  Tocá "Consultar" en una propiedad para ver el lead
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
