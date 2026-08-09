import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowLeft, BookOpen, TrendingUp, FileText } from "lucide-react"
import { Chrome, Status } from "../Primitives"

const UNIDADES = [
  { id: "u1", nombre: "Fundamentos de la web", lista: true },
  { id: "u2", nombre: "Estructura y contenido", lista: true },
  { id: "u3", nombre: "Estilo y marca", lista: true },
  { id: "u4", nombre: "Formularios y datos", lista: false },
  { id: "u5", nombre: "Panel de gestión", lista: false },
  { id: "u6", nombre: "Publicación", lista: false },
  { id: "u7", nombre: "Optimización", lista: false },
  { id: "u8", nombre: "Entrega final", lista: false },
]

const TABS = [
  { id: "contenido", label: "Contenido", icon: BookOpen },
  { id: "progreso", label: "Progreso", icon: TrendingUp },
  { id: "tarea", label: "Tarea", icon: FileText },
]

export default function EducacionScene({ onAction }) {
  const [vista, setVista] = useState("curso")
  const [tab, setTab] = useState("contenido")
  const [entregada, setEntregada] = useState(false)

  const inscribirse = () => {
    setVista("portal")
    onAction?.("inscribirse")
  }

  const entregar = () => {
    setEntregada(true)
    onAction?.("entregar_tarea")
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-bright shadow-lift">
      <Chrome url="fleximy.app/tu-academia" />
      <div className="p-4">
        <AnimatePresence mode="wait">
          {vista === "curso" ? (
            <motion.div
              key="curso"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-micro text-muted">Formación en vivo · docente Valen</p>
                  <h3 className="mt-1 text-h3 text-text">Diseño Web — Nivel 1</h3>
                  <p className="mt-2 max-w-[38ch] text-small text-muted">
                    8 unidades · miércoles 19 hs · con certificado al aprobar la entrega final.
                  </p>
                </div>
                <span className="rounded-full bg-paper px-3 py-1 font-mono text-micro text-muted">cupos: 4</span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-accent-soft px-4 py-3">
                <p className="text-sm font-semibold text-text">¿Arrancás en este curso?</p>
                <button
                  onClick={inscribirse}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-4 text-sm font-semibold text-ink"
                >
                  Inscribirme
                  <ArrowRightMini />
                </button>
              </div>
              <p className="mt-3 font-mono text-micro text-muted">demo · datos ilustrativos</p>
            </motion.div>
          ) : (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setVista("curso")}
                  className="inline-flex items-center gap-1.5 text-small font-semibold text-muted hover:text-text"
                >
                  <ArrowLeft className="size-4" />
                  Volver al curso
                </button>
                <Status tone="activo">Inscripto</Status>
              </div>

              <p className="mt-3 text-h4 text-text">Diseño Web — Nivel 1</p>

              <div className="mt-3 flex gap-1.5">
                {TABS.map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-small transition-colors ${
                        tab === t.id ? "bg-ink text-text-invert" : "border border-line bg-paper text-muted"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      {t.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 min-h-[220px]">
                {tab === "contenido" && (
                  <ul className="grid gap-1.5">
                    {UNIDADES.map((u) => (
                      <li
                        key={u.id}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                          u.lista ? "border-line bg-paper" : "border-dashed border-line bg-paper-bright"
                        }`}
                      >
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-full ${
                            u.lista ? "bg-accent text-ink" : "bg-paper text-muted"
                          }`}
                        >
                          {u.lista ? <Check className="size-3.5" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-ink/30" />}
                        </span>
                        <span className={`text-small ${u.lista ? "text-text" : "text-muted"}`}>{u.nombre}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === "progreso" && (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-small text-muted">Progreso del curso</p>
                      <span className="font-mono text-micro text-text">3 de 8 unidades</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-paper">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "37%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <p className="mt-3 text-small text-muted">
                      Próximo: <span className="font-medium text-text">Formularios y datos</span> · miércoles 19 hs
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {UNIDADES.map((u, i) => (
                        <div key={u.id} className="flex flex-col items-center gap-1 rounded-xl border border-line bg-paper py-2">
                          <span
                            className={`size-2 rounded-full ${u.lista ? "bg-accent" : "bg-ink/15"}`}
                          />
                          <span className="font-mono text-[10px] text-muted">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "tarea" && (
                  <div className="rounded-xl border border-line bg-paper p-4">
                    <p className="font-mono text-micro text-muted">Entrega 1 · vence domingo</p>
                    <p className="mt-2 text-h4 text-text">Estructura del sitio propio</p>
                    <p className="mt-2 text-small text-muted">
                      Subí un documento con el mapa del sitio y los contenidos de tu proyecto.
                    </p>
                    <button
                      onClick={entregar}
                      disabled={entregada}
                      className={`mt-4 inline-flex h-10 items-center gap-2 rounded-[var(--radius-btn)] px-4 text-sm font-semibold ${
                        entregada ? "bg-ink-muted text-text-invert" : "bg-accent text-ink"
                      }`}
                    >
                      {entregada ? (
                        <>
                          <Check className="size-4" /> Entregada
                        </>
                      ) : (
                        "Entregar trabajo"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ArrowRightMini() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
