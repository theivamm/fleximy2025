import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ChevronRight, RotateCcw, Send, FileText, FolderOpen, UserRound } from "lucide-react"
import { Chrome, Status, Avatar } from "../Primitives"

const ETAPAS = ["Nueva", "En contacto", "Propuesta", "Proyecto"]

const CLIENTES = [
  { nombre: "Estudio Ríos", nota: "Sitio + reservas", inicial: "ER" },
  { nombre: "Vivero Alba", nota: "Catálogo + pedidos", inicial: "VA" },
  { nombre: "Clínica Sanar", nota: "Turnos online", inicial: "CS" },
]

const ARCHIVOS = [
  { nombre: "briefing-proyecto.pdf", peso: "1,2 MB" },
  { nombre: "estructura-del-sitio.pdf", peso: "840 KB" },
]

let leadCounter = 0

export default function GestionScene({ mode, onAction }) {
  const [lead, setLead] = useState({ ...CLIENTES[0], id: 0, etapa: 0 })
  const [tareas, setTareas] = useState([])
  const [actividad, setActividad] = useState(["Consulta ingresada desde el sitio"])

  const notificar = (accion) => onAction?.(accion)

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
          { t: "Relevamiento de alcance", resp: "Valen", estado: "Pendiente", vence: "viernes" },
          { t: "Estructura del sitio", resp: "Nico", estado: "Pendiente", vence: "viernes" },
          { t: "Configuración del panel", resp: "Valen", estado: "Pendiente", vence: "miércoles" },
        ])
        setActividad((a) => [`Proyecto creado para ${l.nombre}`, ...a].slice(0, 3))
      }
      return { ...l, etapa }
    })
    notificar("avanzar_etapa")
  }

  const moverTarea = (i) => {
    setTareas((ts) =>
      ts.map((t, idx) =>
        idx === i
          ? { ...t, estado: t.estado === "Pendiente" ? "En curso" : t.estado === "En curso" ? "Hecha" : "Pendiente" }
          : t
      )
    )
    notificar("mover_tarea")
  }

  const asignar = (i) => {
    setTareas((ts) =>
      ts.map((t, idx) =>
        idx === i ? { ...t, resp: t.resp === "Valen" ? "Nico" : "Valen" } : t
      )
    )
    notificar("asignar_responsable")
  }

  const cambiarFecha = (i) => {
    setTareas((ts) =>
      ts.map((t, idx) => (idx === i ? { ...t, vence: t.vence === "viernes" ? "miércoles" : "viernes" } : t))
    )
    notificar("cambiar_fecha")
  }

  if (mode === "cliente") {
    return (
      <PortalCliente
        lead={lead}
        tareas={tareas}
        actividad={actividad}
        notificar={notificar}
      />
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)]">
      <Pipeline lead={lead} avanzar={avanzar} nuevaConsulta={nuevaConsulta} actividad={actividad} />
      <Tablero lead={lead} tareas={tareas} moverTarea={moverTarea} asignar={asignar} cambiarFecha={cambiarFecha} controles={mode === "equipo"} />
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
            className="inline-flex h-7 items-center gap-1.5 rounded-full bg-accent px-3 font-mono text-micro font-semibold text-on-accent"
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
                  className={`h-1 rounded-full ${i <= lead.etapa ? "bg-[var(--color-acc-gestion)]" : "bg-dark-surface/10"}`}
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
              data-guiado="avanzar_etapa"
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-dark-surface text-sm font-semibold text-text-invert disabled:opacity-40"
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

function Tablero({ lead, tareas, moverTarea, asignar, cambiarFecha, controles }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
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
                className="rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{t.t}</p>
                    <p className="font-mono text-micro text-text-invert/50">
                      {t.resp} · vence {t.vence}
                    </p>
                  </div>
                  <Status tone={t.estado === "Hecha" ? "listo" : t.estado === "En curso" ? "activo" : "gris"} dark>
                    {t.estado}
                  </Status>
                </div>
                {controles && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <button
                      onClick={() => moverTarea(i)}
                      data-guiado="mover_tarea"
                      className="inline-flex h-7 items-center gap-1 rounded-[var(--radius-btn)] border border-line-dark px-2.5 font-mono text-micro text-text-invert/75 hover:border-accent hover:text-text-invert"
                    >
                      {t.estado === "Pendiente" ? "Iniciar" : t.estado === "En curso" ? "Completar" : "Reabrir"}
                    </button>
                    <button
                      onClick={() => asignar(i)}
                      data-guiado="asignar_responsable"
                      className="inline-flex h-7 items-center gap-1 rounded-[var(--radius-btn)] border border-line-dark px-2.5 font-mono text-micro text-text-invert/75 hover:border-accent hover:text-text-invert"
                    >
                      <UserRound className="size-3" />
                      {t.resp === "Valen" ? "Asignar a Nico" : "Asignar a Valen"}
                    </button>
                    <button
                      onClick={() => cambiarFecha(i)}
                      data-guiado="cambiar_fecha"
                      className="inline-flex h-7 items-center gap-1 rounded-[var(--radius-btn)] border border-line-dark px-2.5 font-mono text-micro text-text-invert/75 hover:border-accent hover:text-text-invert"
                    >
                      Vence {t.vence}
                    </button>
                  </div>
                )}
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function PortalCliente({ lead, tareas, actividad, notificar }) {
  const [comentario, setComentario] = useState("")
  const enviar = () => {
    if (!comentario.trim()) return
    notificar("dejar_comentario")
    setComentario("")
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome
        url={`portal · ${lead.nombre}`}
        right={<span className="font-mono text-micro text-muted">vista cliente</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar label={lead.inicial} accent="var(--color-acc-gestion)" />
            <div>
              <p className="text-sm font-semibold text-text">Hola, {lead.nombre}</p>
              <p className="font-mono text-micro text-muted">{lead.nota}</p>
            </div>
          </div>
          <Status tone="activo">Consulta en curso</Status>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-paper p-4" data-guiado="ver_avances">
          <div className="flex items-center justify-between">
            <p className="font-mono text-micro text-muted">Avance de tu consulta</p>
            <span className="font-mono text-micro text-text">
              etapa {lead.etapa + 1} de {ETAPAS.length}
            </span>
          </div>
          <p className="mt-2 text-h4 text-text">{ETAPAS[lead.etapa]}</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-dark-surface/10">
            <motion.div
              animate={{ width: `${((lead.etapa + 1) / ETAPAS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-[var(--color-acc-gestion)]"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-mono text-micro text-muted">Próximas entregas</p>
          <ul className="mt-2 grid gap-1.5">
            {tareas.length === 0 ? (
              <li className="rounded-xl border border-dashed border-line bg-paper px-3 py-3 text-center font-mono text-micro text-muted">
                Cuando el proyecto arranque vas a ver las entregas acá
              </li>
            ) : (
              tareas.map((t, i) => (
                <motion.li
                  key={t.t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-guiado="ver_entregas"
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-on-accent-soft">
                      <FileText className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-small font-medium text-text">{t.t}</p>
                      <p className="font-mono text-micro text-muted">
                        {t.resp} · vence {t.vence}
                      </p>
                    </div>
                  </div>
                  <Status tone={t.estado === "Hecha" ? "listo" : t.estado === "En curso" ? "activo" : "gris"}>
                    {t.estado}
                  </Status>
                </motion.li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-4">
          <p className="font-mono text-micro text-muted">Archivos</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {ARCHIVOS.map((f) => (
              <li key={f.nombre} className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5">
                <FolderOpen className="size-4 text-muted" />
                <div className="min-w-0">
                  <p className="truncate text-small text-text">{f.nombre}</p>
                  <p className="font-mono text-micro text-muted">{f.peso} · demo</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-paper p-3">
          <p className="font-mono text-micro text-muted">Dejanos un comentario</p>
          <div className="mt-2 flex gap-2">
            <input
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviar()}
              placeholder="Escribí un mensaje simulado…"
              className="h-9 flex-1 rounded-[var(--radius-btn)] border border-line bg-paper-bright px-3 text-small text-text outline-none placeholder:text-muted/60 focus:border-ink/40"
              aria-label="Comentario del cliente"
            />
            <button
              onClick={enviar}
              disabled={!comentario.trim()}
              data-guiado="dejar_comentario"
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[var(--radius-btn)] bg-accent px-4 text-sm font-semibold text-on-accent disabled:opacity-40"
            >
              <Send className="size-3.5" />
              Enviar
            </button>
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted">
            {actividad.length > 1
              ? `último mensaje registrado: ${actividad[1].toLowerCase()}`
              : "no se registró ninguna compra ni contratación real"}
          </p>
        </div>
      </div>
    </div>
  )
}
