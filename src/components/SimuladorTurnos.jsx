import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    step: 1,
    label: "Reserva",
    mobile: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          Reserva confirmada
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">M</div>
            <div>
              <div className="text-white font-medium">Martina Ruiz</div>
              <div className="text-slate-400">Depilación Láser · 45 min</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <span>Martes 18 Mar · 14:30 hs</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-emerald-400">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            Seña abonada: $2.500
          </div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold">🆕 Nuevo Turno</span>
          <span className="text-slate-600">hace 3 min</span>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Martina Ruiz</span>
          </div>
          <div className="text-slate-400">Servicio: Depilación Láser (45 min)</div>
          <div className="text-slate-400">Fecha: Mar 18 Mar · 14:30 hs</div>
          <div className="text-slate-400">Profesional: Dra. Paz</div>
          <div className="flex items-center gap-2 mt-1 pt-2 border-t border-slate-700/30">
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Seña cobrada</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">Confirmar</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: 2,
    label: "Atención",
    mobile: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="text-amber-400">⚙️</span>
          Turno en curso
        </div>
        <div className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">M</div>
              <span className="text-slate-300 font-medium">Martina Ruiz</span>
            </div>
            <span className="text-emerald-400 font-semibold">En atención</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
            <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>⏱️ Tiempo transcurrido: 24 min / 45 min</span>
          </div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-400 font-semibold">⚡ Turno Activo</span>
          <span className="text-slate-600">Tiempo: 24:12</span>
        </div>
        <div className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-xs">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="rounded bg-slate-700/30 p-2">
              <div className="text-slate-500 text-[9px] mb-1">Pendientes</div>
              <div className="text-slate-400">1 turno</div>
            </div>
            <div className="rounded bg-cyan-500/10 p-2 border border-cyan-500/20">
              <div className="text-cyan-400 text-[9px] mb-1">En Curso</div>
              <div className="text-cyan-400 font-bold">Martina R.</div>
            </div>
            <div className="rounded bg-slate-700/30 p-2">
              <div className="text-slate-500 text-[9px] mb-1">Completados</div>
              <div className="text-slate-400">3 turnos</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: 3,
    label: "Cierre",
    mobile: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="text-emerald-400">✅</span>
          Servicio completado
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center">
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="text-emerald-400 font-semibold">¡Gracias por tu visita!</span>
          </div>
          <div className="text-slate-400">Tu turno de Depilación Láser finalizó. Te esperamos pronto.</div>
          <div className="flex items-center gap-1 text-slate-500">
            {[1,2,3,4,5].map(i => <span key={i} className={`text-sm ${i <= 4 ? "" : "opacity-30"}`}>⭐</span>)}
            <span className="ml-1">Calificá tu experiencia</span>
          </div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-400 font-semibold">📊 Turno Finalizado</span>
          <span className="text-slate-600">hace 5 min</span>
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Martina Ruiz — Depilación Láser</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-medium">Completado</span>
          </div>
          <div className="space-y-1 text-slate-400">
            <div className="flex justify-between"><span>Duración real</span><span className="text-white">42 min</span></div>
            <div className="flex justify-between"><span>Cobrado</span><span className="text-emerald-400">$8.500</span></div>
            <div className="flex justify-between"><span>Seña</span><span className="text-emerald-400">$2.500</span></div>
          </div>
          <div className="pt-1.5 border-t border-emerald-500/20">
            <span className="text-[9px] text-slate-500">Recordatorio automático enviado para próxima visita</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function SimuladorTurnos() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] mb-6">
            🎬 LIVE EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Seguí el ciclo completo de un turno
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Desde que el cliente reserva hasta que recibe la encuesta de satisfacción.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-16">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex items-center gap-2 group"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i === current
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-110"
                    : i < current
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-500 border border-slate-700/50 group-hover:border-slate-600"
                }`}
              >
                {i < current ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  s.step
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline transition-colors ${
                  i === current ? "text-cyan-400" : "text-slate-500"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`hidden sm:block w-8 h-px ${
                  i < current ? "bg-emerald-500/50" : "bg-slate-700"
                }`} />
              )}
            </button>
          ))}
        </div>

        {/* Split Screen */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${current}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-slate-700/50 bg-[#131b2e] p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-slate-700/50 flex items-center justify-center text-[9px] text-slate-400">M</div>
                <span className="text-xs text-slate-400 font-medium">Vista Cliente / Web</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-3 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
              {steps[current].mobile}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${current}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-slate-700/50 bg-[#131b2e] p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[9px] font-bold text-white">P</div>
                <span className="text-xs text-cyan-400 font-medium">Panel de Gestión</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
              {steps[current].panel}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-10">
          {current > 0 && (
            <button
              onClick={() => setCurrent(current - 1)}
              className="px-5 py-2 rounded-lg text-xs font-medium text-slate-400 border border-slate-700/50 hover:bg-slate-800/50 transition-colors"
            >
              ← Anterior
            </button>
          )}
          {current < steps.length - 1 && (
            <button
              onClick={() => setCurrent(current + 1)}
              className="group relative px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20 transition-all duration-300"
            >
              Siguiente Paso →
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
