import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ChevronRight, RotateCcw } from "lucide-react"
import { Chrome, Status, Avatar } from "../Primitives"

const ETAPAS = ["Nueva", "En contacto", "Propuesta", "Proyecto"]

const CLIENTES = [
  { nombre: "Estudio Ríos", nota: "Sitio + reservas", inicial: "ER" },
  { nombre: "Vivero Alba", nota: "Catálogo + pedidos", inicial: "VA" },
  { nombre: "Clínica Sanar", nota: "Turnos online", inicial: "CS" },
]

let leadCounter = 0

export default function GestionScene() {
  const [lead, setLead] = useState({ ...CLIENTES[0], id: 0, etapa: 0 })
  const [tareas, setTareas] = useState([])
  const [actividad, setActividad] = useState(["Consulta ingresada desde el sitio"])

  const nuevaConsulta = () => {
    const c = CLIENTES[leadCounter % CLIENTES.length]
    leadCounter++
    setLead({ ...c, id: leadCounter, etapa: 0 })
    setTareas([])
    setActividad((a) => [`Consulta de ${c.nombre}`, ...a].slice(0, 3))
  }

  const avanzar = () => {
    setLead((l) => {
      const etapa = Math.min(l.etapa + 1, ETAPAS.length - 1)
      if (etapa === ETAPAS.length - 1 && l.etapa < ETAPAS.length - 1) {
        setTareas([
          { t: "Relevamiento de alcance", resp: "Valen", estado: "Pendiente" },
          { t: "Estructura del sitio", resp: "Nico", estado: "Pendiente" },
          { t: "Configuración del panel", resp: "Valen", estado: "Pendiente" },
        ])
        setActividad((a) => [`Proyecto creado para ${l.nombre}`, ...a].slice(0, 3))
      }
      return { ...l, etapa }
    })
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)]">
      <Pipeline lead={lead} avanzar={avanzar} nuevaConsulta={nuevaConsulta} actividad={actividad} />
      <Tablero lead={lead} tareas={tareas} />
    </div>
  )
}

function Pipeline({ lead, avanzar, nuevaConsulta, actividad }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome
        url="panel · oportunidades"
        right={
          <button
            onClick={nuevaConsulta}
            className="inline-flex h-7 items-center gap-1.5 rounded-full bg-accent px-3 font-mono text-micro font-semibold text-ink"
          >
            <Plus className="size-3.5" />
            Nueva consulta
          </button>
        }
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text">Oportunidades</p>
          <span className="font-mono text-micro text-muted">demo · datos ilustrativos</span>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-paper p-4">
          <div className="flex items-center gap-3">
            <Avatar label={lead.inicial} accent="var(--color-acc-gestion)" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text">{lead.nombre}</p>
              <p className="truncate font-mono text-micro text-muted">{lead.nota}</p>
            </div>
            <span className="ml-auto font-mono text-micro text-muted">etapa {lead.etapa + 1}/4</span>
          </div>

          <div className="mt-4 flex items-center gap-1">
            {ETAPAS.map((e, i) => (
              <div key={e} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={`h-1 rounded-full ${i <= lead.etapa ? "bg-[var(--color-acc-gestion)]" : "bg-ink/10"}`}
                />
                <span className={`hidden font-mono text-[10px] sm:block ${i <= lead.etapa ? "text-text" : "text-muted"}`}>
                  {e}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={avanzar}
              disabled={lead.etapa >= ETAPAS.length - 1}
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-ink text-sm font-semibold text-text-invert disabled:opacity-40"
            >
              Avanzar etapa
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={nuevaConsulta}
              aria-label="Reiniciar demo"
              className="grid size-9 place-items-center rounded-[var(--radius-btn)] border border-line text-muted hover:text-text"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-mono text-micro text-muted">Actividad</p>
          <ul className="mt-2 grid gap-1.5">
            {actividad.map((a, i) => (
              <li key={`${a}-${i}`} className="flex items-center gap-2 font-mono text-micro text-text">
                <span className="size-1.5 rounded-full bg-[var(--color-acc-gestion)]" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Tablero({ lead, tareas }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-ink text-text-invert shadow-lift">
      <Chrome dark url="panel · proyectos" />
      <div className="flex-1 p-4">
        <p className="text-sm font-semibold">Proyecto en curso</p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {ETAPAS.map((e, i) => (
            <div
              key={e}
              className={`rounded-xl border p-2 ${i === lead.etapa ? "border-[var(--color-acc-gestion)] bg-ink-soft" : "border-line-dark bg-ink-soft/60"}`}
            >
              <p className="truncate font-mono text-[10px] text-text-invert/50">{e}</p>
              <AnimatePresence>
                {i === lead.etapa && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 rounded-lg border border-line-dark bg-ink-muted px-2 py-2"
                  >
                    <p className="truncate text-[11px] font-medium">{lead.nombre}</p>
                    <p className="font-mono text-[10px] text-text-invert/45">{lead.nota}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-micro text-text-invert/50">Tareas del proyecto</p>
        <ul className="mt-2 grid gap-2">
          {tareas.length === 0 ? (
            <li className="rounded-xl border border-dashed border-line-dark px-3 py-4 text-center font-mono text-micro text-text-invert/40">
              Las tareas aparecen cuando la oportunidad se convierte en proyecto
            </li>
          ) : (
            tareas.map((t, i) => (
              <motion.li
                key={t.t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{t.t}</p>
                  <p className="font-mono text-micro text-text-invert/50">{t.resp} · vence viernes</p>
                </div>
                <Status tone="gris" dark>
                  {t.estado}
                </Status>
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
