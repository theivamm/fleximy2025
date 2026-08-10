import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, Send } from "lucide-react"

const SECUENCIA = [
  ["typing", 1600],
  ["enviando", 700],
  ["nuevo", 1500],
  ["asignado", 1800],
]

function Chromebar({ url, dark = false, right }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 ${
        dark ? "border-outline-night" : "border-outline"
      }`}
    >
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className={`size-2 rounded-full ${dark ? "bg-on-night/20" : "bg-outline-strong"}`} />
        <span className={`size-2 rounded-full ${dark ? "bg-on-night/20" : "bg-outline-strong"}`} />
        <span className={`size-2 rounded-full ${dark ? "bg-on-night/20" : "bg-outline-strong"}`} />
      </div>
      <span
        className={`rounded-md px-2 py-0.5 font-mono text-micro ${
          dark ? "bg-night-mid text-on-night/60" : "bg-bg-secondary text-ink-muted"
        }`}
      >
        {url}
      </span>
      {right}
    </div>
  )
}

export default function SistemaVivo() {
  const reduce = useReducedMotion()
  const [fase, setFase] = useState("typing")

  useEffect(() => {
    if (reduce) {
      setFase("asignado")
      return
    }
    let idx = 0
    let timer
    const step = () => {
      setFase(SECUENCIA[idx][0])
      timer = setTimeout(step, SECUENCIA[idx][1])
      idx = (idx + 1) % SECUENCIA.length
    }
    step()
    return () => clearTimeout(timer)
  }, [reduce])

  const conectado = fase === "enviando"
  const llegando = fase === "nuevo" || fase === "asignado"
  const asignado = fase === "asignado"

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-b from-primary-soft/50 via-transparent to-transparent blur-2xl"
      />

      <div className="relative grid gap-4 lg:grid-cols-2 lg:gap-0">
        {/* Conexión horizontal (desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <div className="relative flex w-40 items-center">
            <span className="h-px flex-1 bg-primary/40" />
            <motion.span
              key={fase}
              animate={{ x: conectado ? 52 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 size-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(79,94,232,0.9)]"
            />
          </div>
        </div>

        {/* Sitio público */}
        <div className="relative overflow-hidden rounded-2xl border border-outline bg-surface shadow-[var(--shadow-lift)]">
          <Chromebar
            url="tunegocio.ar"
            right={
              <span className="hidden font-mono text-micro text-ink-muted sm:block">
                sitio público
              </span>
            }
          />
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-micro text-ink-muted">café de barrio</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-primary sm:text-xl">
                  Un café para tu tarde
                </p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-micro text-primary-deep">
                catálogo
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              {["Espresso", "Cortado", "Medialunas"].map((p) => (
                <span
                  key={p}
                  className="rounded-lg border border-outline bg-bg-secondary px-2.5 py-1.5 font-mono text-micro text-ink-secondary"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Consulta */}
            <div className="mt-5 rounded-xl border border-outline bg-bg-secondary p-3">
              <AnimatePresence mode="wait" initial={false}>
                {fase === "typing" && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="size-2 animate-pulse rounded-full bg-secondary" />
                    <span className="font-mono text-micro text-ink-secondary">
                      escribiendo consulta…
                    </span>
                    <span className="ml-auto font-mono text-micro text-ink-muted">Valentina</span>
                  </motion.div>
                )}
                {fase !== "typing" && (
                  <motion.div
                    key="enviada"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start justify-between gap-3"
                  >
                    <p className="text-small text-ink-primary">
                      ¿Tienen mesas libres mañana a las 19 para dos personas?
                    </p>
                    <span className="mt-1 shrink-0">
                      {conectado ? (
                        <motion.span
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="grid size-5 place-items-center rounded-full bg-primary text-white"
                        >
                          <Send size={10} />
                        </motion.span>
                      ) : (
                        <span className="grid size-5 place-items-center rounded-full bg-success text-white">
                          <Check size={10} />
                        </span>
                      )}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Panel interno */}
        <div className="relative overflow-hidden rounded-2xl border border-outline-night bg-night shadow-[var(--shadow-night)]">
          <Chromebar
            dark
            url="panel · operación"
            right={<span className="font-mono text-micro text-secondary">en vivo</span>}
          />
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-micro text-on-night/50">consultas recientes</p>
              <span className="font-mono text-micro text-on-night/50">hoy · 14</span>
            </div>
            <div className="mt-4 grid gap-2">
              {llegando && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${
                    asignado ? "border-outline-night-strong bg-night-elevated" : "border-outline-night bg-night-mid"
                  }`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                    VS
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-small font-medium text-on-night">Valentina S.</span>
                    <span className="block truncate font-mono text-micro text-on-night/50">
                      ¿Tienen mesas libres mañana a las 19?
                    </span>
                  </span>
                  <motion.span
                    animate={asignado ? { opacity: 1 } : { opacity: 0.85 }}
                    className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-micro ${
                      asignado ? "bg-secondary-soft text-secondary-deep" : "bg-primary text-white"
                    }`}
                  >
                    {asignado ? "Asignada" : "Nueva"}
                  </motion.span>
                </motion.div>
              )}
              {!llegando && (
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-outline-night px-3.5 py-3">
                  <span className="size-9 shrink-0 rounded-full bg-night-mid" />
                  <div className="flex-1 space-y-1.5">
                    <span className="block h-2 w-2/3 rounded bg-on-night/10" />
                    <span className="block h-2 w-1/2 rounded bg-on-night/10" />
                  </div>
                </div>
              )}
            </div>
            <p className="mt-4 font-mono text-micro text-on-night/40">
              demo · datos ilustrativos
            </p>
          </div>
        </div>

        {/* Conexión mobile */}
        <div aria-hidden="true" className="relative flex h-8 items-center justify-center lg:hidden">
          <span className="absolute top-0 bottom-0 w-px bg-primary/40" />
          <motion.span
            key={fase}
            animate={{ y: conectado ? 18 : -18 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute size-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(79,94,232,0.9)]"
          />
        </div>
      </div>

      {/* Leyenda inferior */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
        {[
          { label: "entra por la web", done: true },
          { label: "se estructura", done: conectado || llegando },
          { label: "llega al panel", done: llegando },
          { label: "se asigna", done: asignado },
        ].map((s) => (
          <span key={s.label} className="flex items-center gap-2">
            <span
              className={`size-1.5 rounded-full transition-colors duration-[var(--motion-base)] ${
                s.done ? "bg-primary" : "bg-outline-strong"
              }`}
            />
            <span
              className={`font-mono text-micro transition-colors duration-[var(--motion-base)] ${
                s.done ? "text-ink-primary" : "text-ink-muted"
              }`}
            >
              {s.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
