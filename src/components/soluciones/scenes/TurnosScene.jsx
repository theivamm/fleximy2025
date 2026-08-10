import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, CalendarDays, Clock, Lock, History, ArrowRightLeft } from "lucide-react"
import { Chrome, Status } from "../Primitives"

const SERVICIOS = [
  { id: "corte", nombre: "Corte de cabello", duracion: "45 min" },
  { id: "barba", nombre: "Barba", duracion: "30 min" },
  { id: "full", nombre: "Corte + barba", duracion: "75 min" },
]

const PROFESIONALES = [
  { id: "lucas", nombre: "Lucas" },
  { id: "maria", nombre: "María" },
]

const DIAS = [
  { id: "1", dia: "Lun", fecha: "10" },
  { id: "2", dia: "Mar", fecha: "11" },
  { id: "3", dia: "Mié", fecha: "12" },
  { id: "4", dia: "Jue", fecha: "13" },
]

const HORARIOS = ["09:00", "10:30", "12:00", "16:00", "17:30", "19:00"]

const HISTORIAL = [
  "Corte + barba · hace 45 días",
  "Corte · hace 90 días",
]

let reservaId = 0

export default function TurnosScene({ mode, onAction }) {
  const [dia, setDia] = useState("1")
  const [servicio, setServicio] = useState("corte")
  const [profesional, setProfesional] = useState("lucas")
  const [reservados, setReservados] = useState([])
  const [bloqueados, setBloqueados] = useState([])

  const notificar = (accion) => onAction?.(accion)

  const reservar = (hora) => {
    if (reservados.includes(hora) || bloqueados.includes(hora)) return
    setReservados((r) => [...r, hora])
    notificar("reservar_turno")
  }

  const bloquear = () => {
    const libre = HORARIOS.find((h) => !reservados.includes(h) && !bloqueados.includes(h))
    if (!libre) return
    setBloqueados((b) => [...b, libre])
    notificar("bloquear_horario")
  }

  const reprogramar = () => {
    if (reservados.length === 0) return
    const [, ...resto] = reservados
    const libre = HORARIOS.find((h) => !reservados.includes(h) && !bloqueados.includes(h))
    if (!libre) return
    setReservados([...resto, libre])
    notificar("reprogramar")
  }

  const mostrarAmbos = !mode

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)]">
      {mode !== "equipo" && (
        <ReservaCliente
          dia={dia}
          setDia={setDia}
          servicio={servicio}
          setServicio={setServicio}
          profesional={profesional}
          setProfesional={setProfesional}
          reservados={reservados}
          bloqueados={bloqueados}
          reservar={reservar}
          notificar={notificar}
        />
      )}
      {mode !== "cliente" && (
        <AgendaProfesional
          reservados={reservados}
          bloqueados={bloqueados}
          controles={mode === "equipo"}
          bloquear={bloquear}
          reprogramar={reprogramar}
          mostrarAmbos={mostrarAmbos}
          onAction={onAction}
        />
      )}
    </div>
  )
}

function ReservaCliente({
  dia,
  setDia,
  servicio,
  setServicio,
  profesional,
  setProfesional,
  reservados,
  bloqueados,
  reservar,
  notificar,
}) {
  const elegido = SERVICIOS.find((s) => s.id === servicio)
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome
        url="fleximy.app/tu-estudio/reservar"
        right={<span className="font-mono text-micro text-muted">reserva online</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text">Reservá tu turno</p>
          <span className="font-mono text-micro text-muted">paso 1 de 3</span>
        </div>

        <p className="mt-4 font-mono text-micro text-muted">Servicio</p>
        <div className="mt-2 flex flex-wrap gap-1.5" data-guiado="elegir_servicio">
          {SERVICIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setServicio(s.id)
                notificar("elegir_servicio")
              }}
              className={`rounded-full px-3 py-1.5 text-small transition-colors ${
                servicio === s.id ? "bg-dark-surface text-text-invert" : "border border-line bg-paper text-muted"
              }`}
            >
              {s.nombre} · {s.duracion}
            </button>
          ))}
        </div>

        <p className="mt-4 font-mono text-micro text-muted">Profesional</p>
        <div className="mt-2 flex gap-1.5" data-guiado="elegir_profesional">
          {PROFESIONALES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setProfesional(p.id)
                notificar("elegir_profesional")
              }}
              className={`rounded-full px-4 py-1.5 text-small transition-colors ${
                profesional === p.id ? "bg-dark-surface text-text-invert" : "border border-line bg-paper text-muted"
              }`}
            >
              {p.nombre}
            </button>
          ))}
        </div>

        <p className="mt-4 font-mono text-micro text-muted">Elegí el día</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {DIAS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDia(d.id)}
              className={`flex flex-col items-center rounded-xl border py-2 transition-colors ${
                dia === d.id ? "border-ink bg-dark-surface text-text-invert" : "border-line bg-paper text-muted"
              }`}
            >
              <span className="font-mono text-micro">{d.dia}</span>
              <span className="text-sm font-semibold">{d.fecha}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 font-mono text-micro text-muted">Horarios disponibles</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {HORARIOS.map((h) => {
            const ocupado = reservados.includes(h) || bloqueados.includes(h)
            return (
              <button
                key={h}
                disabled={ocupado}
                onClick={() => reservar(h)}
                data-guiado="reservar_turno"
                className={`rounded-lg border py-2 text-small transition-colors ${
                  ocupado
                    ? "cursor-not-allowed border-line bg-paper text-muted/40 line-through"
                    : "border-line bg-paper text-text hover:border-ink"
                }`}
              >
                {h}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-accent-soft px-3 py-2.5">
          <span className="text-small font-medium text-text">
            {elegido.nombre} · {PROFESIONALES.find((p) => p.id === profesional).nombre}
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-accent text-on-accent">
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

function AgendaProfesional({ reservados, bloqueados, controles, bloquear, reprogramar, mostrarAmbos, onAction }) {
  const [historial, setHistorial] = useState(false)
  const items = reservados.map((hora, i) => ({
    id: reservaId + i,
    hora,
    nombre: ["Camila S.", "Javier P.", "Mora L.", "Santiago R."][i % 4],
    estado: i === 0 ? "Confirmado" : "Agendado",
  }))
  const total = items.length + bloqueados.length

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-dark-surface text-text-invert shadow-lift">
      <Chrome
        dark
        url="panel · agenda profesional"
        right={<span className="font-mono text-micro text-cyan">{total} turnos</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Miércoles 12</p>
          <span className="font-mono text-micro text-text-invert/50">demo · datos ilustrativos</span>
        </div>

        {controles && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={bloquear}
              data-guiado="bloquear_horario"
              className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-dark px-3 font-mono text-micro text-text-invert/80 hover:border-accent hover:text-text-invert"
            >
              <Lock className="size-3.5" />
              Bloquear horario
            </button>
            <button
              onClick={reprogramar}
              disabled={reservados.length === 0}
              data-guiado="reprogramar"
              className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-dark px-3 font-mono text-micro text-text-invert/80 hover:border-accent hover:text-text-invert disabled:opacity-40"
            >
              <ArrowRightLeft className="size-3.5" />
              Reprogramar
            </button>
            <button
              onClick={() => {
                setHistorial((h) => !h)
                if (!historial) onAction?.("ver_historial")
              }}
              data-guiado="ver_historial"
              aria-expanded={historial}
              className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-dark px-3 font-mono text-micro text-text-invert/80 hover:border-accent hover:text-text-invert"
            >
              <History className="size-3.5" />
              Historial del cliente
            </button>
          </div>
        )}

        <AnimatePresence>
          {historial && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-xl border border-line-dark bg-ink-soft p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Camila S. · últimas visitas</p>
                  <Status tone="activo" dark>
                    4 visitas
                  </Status>
                </div>
                <ul className="mt-2 grid gap-1">
                  {HISTORIAL.map((h) => (
                    <li key={h} className="font-mono text-micro text-text-invert/60">
                      · {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="mt-4 grid gap-2">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                layout
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-line-dark bg-ink-soft px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-ink-muted text-cyan">
                    <Clock className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.nombre}</p>
                    <p className="font-mono text-micro text-text-invert/50">{item.hora} hs</p>
                  </div>
                </div>
                <Status tone={item.estado === "Confirmado" ? "activo" : "gris"} dark>
                  {item.estado}
                </Status>
              </motion.li>
            ))}
            {bloqueados.map((hora) => (
              <motion.li
                layout
                key={`bloq-${hora}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-line-dark bg-ink-muted px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-dark-surface text-text-invert/50">
                    <Lock className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-invert/60">Bloqueado</p>
                    <p className="font-mono text-micro text-text-invert/40">{hora} hs</p>
                  </div>
                </div>
                <Status tone="espera" dark>
                  No disponible
                </Status>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {total === 0 && (
          <div className="mt-6 grid place-items-center gap-2 rounded-xl border border-dashed border-line-dark py-10 text-center">
            <CalendarDays className="size-5 text-text-invert/40" />
            <p className="text-small text-text-invert/50">
              El horario que reserve el cliente
              <br />
              <span className="font-mono text-micro text-text-invert/35">se bloquea acá al instante</span>
            </p>
          </div>
        )}

        {mostrarAmbos && (
          <p className="mt-4 font-mono text-micro text-text-invert/40">
            cada reserva del cliente bloquea el horario en la agenda
          </p>
        )}
      </div>
    </div>
  )
}
