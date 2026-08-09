import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, CalendarDays, Clock } from "lucide-react"
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

let reservaId = 0

export default function TurnosScene() {
  const [dia, setDia] = useState("1")
  const [servicio, setServicio] = useState("corte")
  const [profesional, setProfesional] = useState("lucas")
  const [reservados, setReservados] = useState([])

  const reservar = (hora) => {
    if (reservados.includes(hora)) return
    setReservados((r) => [...r, hora])
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)]">
      <ReservaCliente
        dia={dia}
        setDia={setDia}
        servicio={servicio}
        setServicio={setServicio}
        profesional={profesional}
        setProfesional={setProfesional}
        reservados={reservados}
        reservar={reservar}
      />
      <AgendaProfesional reservados={reservados} />
    </div>
  )
}

function ReservaCliente({ dia, setDia, servicio, setServicio, profesional, setProfesional, reservados, reservar }) {
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
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SERVICIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setServicio(s.id)}
              className={`rounded-full px-3 py-1.5 text-small transition-colors ${
                servicio === s.id ? "bg-ink text-text-invert" : "border border-line bg-paper text-muted"
              }`}
            >
              {s.nombre} · {s.duracion}
            </button>
          ))}
        </div>

        <p className="mt-4 font-mono text-micro text-muted">Profesional</p>
        <div className="mt-2 flex gap-1.5">
          {PROFESIONALES.map((p) => (
            <button
              key={p.id}
              onClick={() => setProfesional(p.id)}
              className={`rounded-full px-4 py-1.5 text-small transition-colors ${
                profesional === p.id ? "bg-ink text-text-invert" : "border border-line bg-paper text-muted"
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
                dia === d.id ? "border-ink bg-ink text-text-invert" : "border-line bg-paper text-muted"
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
            const ocupado = reservados.includes(h)
            return (
              <button
                key={h}
                disabled={ocupado}
                onClick={() => reservar(h)}
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
          <span className="grid size-7 place-items-center rounded-full bg-accent text-ink">
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

function AgendaProfesional({ reservados }) {
  const items = reservados.map((hora, i) => ({
    id: reservaId + i,
    hora,
    nombre: ["Camila S.", "Javier P.", "Mora L.", "Santiago R."][i % 4],
    estado: i === 0 ? "Confirmado" : "Agendado",
  }))

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-ink text-text-invert shadow-lift">
      <Chrome
        dark
        url="panel · agenda profesional"
        right={<span className="font-mono text-micro text-cyan">{items.length} turnos</span>}
      />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Miércoles 12</p>
          <span className="font-mono text-micro text-text-invert/50">demo · datos ilustrativos</span>
        </div>

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
          </AnimatePresence>
        </ul>

        {items.length === 0 && (
          <div className="mt-6 grid place-items-center gap-2 rounded-xl border border-dashed border-line-dark py-10 text-center">
            <CalendarDays className="size-5 text-text-invert/40" />
            <p className="text-small text-text-invert/50">
              El horario que reserve el cliente
              <br />
              <span className="font-mono text-micro text-text-invert/35">se bloquea acá al instante</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
