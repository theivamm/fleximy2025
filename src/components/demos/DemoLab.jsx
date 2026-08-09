import { useLayoutEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, X, Play, ArrowLeft, ArrowRight } from "lucide-react"
import GastroScene from "../soluciones/scenes/GastroScene"
import TurnosScene from "../soluciones/scenes/TurnosScene"
import GestionScene from "../soluciones/scenes/GestionScene"
import ComercioScene from "../soluciones/scenes/ComercioScene"
import InmobScene from "../soluciones/scenes/InmobScene"
import EducacionScene from "../soluciones/scenes/EducacionScene"
import TalleresScene from "../soluciones/scenes/TalleresScene"
import { track } from "../../lib/analytics"

const SCENES = {
  gastronomia: GastroScene,
  turnos: TurnosScene,
  gestion: GestionScene,
  comercio: ComercioScene,
  inmobiliarias: InmobScene,
  educacion: EducacionScene,
  talleres: TalleresScene,
}

const ESTADO_BADGE = {
  disponible: { label: "Disponible", tone: "bg-accent text-ink" },
  guiado: { label: "Recorrido guiado", tone: "bg-cyan/15 text-cyan" },
  proximamente: { label: "Próximamente", tone: "bg-ink/10 text-muted" },
}

export default function DemoLab({ demo, onExit }) {
  const Scene = SCENES[demo.id]
  const surfRef = useRef(null)

  const [modo, setModo] = useState("cliente")
  const [reseteo, setReseteo] = useState(0)
  const [acciones, setAcciones] = useState([])
  const [guiado, setGuiado] = useState(false)
  const [guiadoPaso, setGuiadoPaso] = useState(0)
  const completada = useRef(false)

  const badge = ESTADO_BADGE[demo.estado] || ESTADO_BADGE.proximamente
  const pasos = demo.modal ? (modo === "cliente" ? demo.cliente.pasos : demo.equipo.pasos) : []
  const hechos = pasos.filter(([id]) => acciones.includes(id)).length
  const progreso = pasos.length ? Math.round((hechos / pasos.length) * 100) : 0

  useLayoutEffect(() => {
    if (progreso >= 100 && !completada.current && pasos.length) {
      completada.current = true
      track("demo_completada", { demo: demo.id })
    }
  }, [progreso, pasos.length, demo.id])

  const pasoGuia = demo.guiado ? demo.guia[guiadoPaso] : null

  const registrar = (accion) => {
    setAcciones((a) => (a.includes(accion) ? a : [...a, accion]))
  }

  const reiniciar = () => {
    setReseteo((r) => r + 1)
    setAcciones([])
    setGuiadoPaso(0)
    setModo("cliente")
    completada.current = false
  }

  const salir = () => {
    setGuiado(false)
    setGuiadoPaso(0)
    onExit?.()
  }

  const avanzarGuia = () => {
    if (guiadoPaso >= demo.guia.length - 1) {
      setGuiado(false)
      setGuiadoPaso(0)
      return
    }
    const siguiente = demo.guia[guiadoPaso + 1]
    setGuiadoPaso((p) => p + 1)
    setModo(siguiente.modo)
  }

  const retrocederGuia = () => {
    if (guiadoPaso <= 0) return
    const anterior = demo.guia[guiadoPaso - 1]
    setGuiadoPaso((p) => p - 1)
    setModo(anterior.modo)
  }

  useLayoutEffect(() => {
    const root = surfRef.current
    if (!root) return
    root.querySelectorAll("[data-guiado]").forEach((el) => el.classList.remove("demo-guia-active"))
    if (guiado && pasoGuia) {
      const el = root.querySelector(`[data-guiado="${pasoGuia.target}"]`)
      if (el) {
        el.classList.add("demo-guia-active")
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
      }
    }
  }, [guiado, guiadoPaso, reseteo, pasoGuia])

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 lg:px-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-micro text-muted">laboratorio Fleximy</span>
          <span className="font-mono text-micro text-text">{demo.rubro}</span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-micro ${badge.tone}`}>
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {demo.modal && (
            <div className="flex items-center rounded-full border border-line bg-paper p-1" role="tablist" aria-label="Modo de la demo">
              {["cliente", "equipo"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setModo(m)
                    track("vista_sitio_panel", { modo: m, demo: demo.id })
                  }}
                  role="tab"
                  aria-selected={modo === m}
                  className={`rounded-full px-3 py-1.5 font-mono text-micro transition-colors ${
                    modo === m ? "bg-ink text-text-invert" : "text-muted hover:text-text"
                  }`}
                >
                  {m === "cliente" ? "Cliente" : "Equipo"}
                </button>
              ))}
            </div>
          )}
          {demo.guiado && (
            <button
              onClick={() => {
                setGuiado(true)
                setGuiadoPaso(0)
                setModo(demo.guia[0].modo)
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line bg-paper px-3 font-mono text-micro text-text transition-colors hover:border-ink/30"
            >
              <Play className="size-3.5" />
              Recorrido guiado
            </button>
          )}
          <button
            onClick={reiniciar}
            className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line bg-paper px-3 font-mono text-micro text-text transition-colors hover:border-ink/30"
          >
            <RotateCcw className="size-3.5" />
            Reiniciar demo
          </button>
          <button
            onClick={salir}
            aria-label="Salir de la demo"
            className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line bg-paper px-3 font-mono text-micro text-text transition-colors hover:border-ink/30"
          >
            <X className="size-3.5" />
            Salir
          </button>
        </div>
      </div>

      <div className="border-b border-line px-4 py-3 lg:px-5">
        {demo.modal ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-small text-text">
                <span className="font-semibold">{modo === "cliente" ? demo.cliente.titulo : demo.equipo.titulo}</span>
                <span className="text-muted"> · {modo === "cliente" ? "mirada del cliente" : "panel de quien gestiona"}</span>
              </p>
              <span className="font-mono text-micro text-muted">
                {hechos} de {pasos.length} acciones
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                animate={{ width: `${progreso}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted">
              cada acción real de la demo cuenta un paso · el dato es el mismo en las dos vistas
            </p>
          </div>
        ) : (
          <p className="text-small text-text">
            <span className="font-semibold">{demo.rubro}</span>
            <span className="text-muted"> · vista integrada: cliente y equipo comparten el mismo dato</span>
          </p>
        )}
      </div>

      <div ref={surfRef} className="relative bg-paper-bright/60 p-4 lg:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Scene key={reseteo} mode={demo.modal ? modo : undefined} onAction={registrar} />
          </motion.div>
        </AnimatePresence>

        {guiado && demo.guia && pasoGuia && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center p-4 lg:items-start lg:justify-end lg:p-6">
            <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-line-dark bg-ink p-4 text-text-invert shadow-lift">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-micro text-accent">
                  Recorrido guiado · paso {guiadoPaso + 1} de {demo.guia.length}
                </p>
                <button
                  onClick={() => setGuiado(false)}
                  aria-label="Salir del recorrido guiado"
                  className="grid size-8 place-items-center rounded-full border border-line-dark text-text-invert/70 hover:text-text-invert"
                >
                  <X className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-small text-text-invert/90">{pasoGuia.texto}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  {demo.guia.map((g, i) => (
                    <span
                      key={g.target}
                      className={`h-1 rounded-full transition-all ${i === guiadoPaso ? "w-4 bg-accent" : "w-1.5 bg-ink-muted"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={retrocederGuia}
                    disabled={guiadoPaso === 0}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] border border-line-dark px-3 font-mono text-micro text-text-invert/80 hover:border-accent hover:text-text-invert disabled:opacity-40"
                  >
                    <ArrowLeft className="size-3.5" />
                    Anterior
                  </button>
                  <button
                    onClick={avanzarGuia}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-btn)] bg-accent px-3 font-mono text-micro font-semibold text-ink"
                  >
                    {guiadoPaso >= demo.guia.length - 1 ? "Terminar" : "Siguiente"}
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-line px-4 py-3 lg:px-5">
        <p className="font-mono text-micro text-muted">
          demo · datos ficticios e ilustrativos · no se genera una compra, reserva ni contratación real
        </p>
      </div>
    </div>
  )
}
