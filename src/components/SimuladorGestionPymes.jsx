import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    step: 1,
    label: "Requerimiento",
    mobile: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          Solicitud recibida
        </div>
        <div className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-xs">
          <div className="text-slate-300 font-medium">Quiero un presupuesto para automatizar mi facturación</div>
          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span>María Fernández - Estudio Contable</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px]">Facturación</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px]">Automatización</span>
          </div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold">🔔 Nuevo Lead</span>
          <span className="text-slate-600">hace 2 min</span>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">María Fernández</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-medium">Caliente</span>
          </div>
          <div className="text-slate-400">Estudio Contable SF</div>
          <div className="text-slate-500">Requiere: Automatización de facturación electrónica con AFIP</div>
          <div className="flex items-center gap-2 mt-1 pt-2 border-t border-slate-700/30">
            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">Crear Proyecto</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Asignar</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: 2,
    label: "Ejecución",
    mobile: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="text-amber-400">⚙️</span>
          Proyecto en marcha
        </div>
        <div className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">Facturación Electrónica AFIP</span>
            <span className="text-cyan-400 font-semibold">65%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[6px] font-bold text-white">D</div>
            <span>Diego (Desarrollador) — Integration API AFIP</span>
          </div>
          <div className="text-slate-600">Entrega estimada: 72 hs</div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-400 font-semibold">⚡ Tablero Activo</span>
          <span className="text-slate-600">Tiempo: 14:23:10</span>
        </div>
        <div className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
          <div className="grid grid-cols-3 gap-1.5 text-[9px]">
            <div className="rounded bg-slate-700/30 p-1.5">
              <div className="text-slate-500 mb-1">Por Hacer</div>
              <div className="bg-slate-700/50 rounded px-1.5 py-1 text-slate-300">API AFIP Setup</div>
            </div>
            <div className="rounded bg-blue-500/10 p-1.5 border border-blue-500/20">
              <div className="text-blue-400 mb-1">En Proceso</div>
              <div className="bg-blue-500/20 rounded px-1.5 py-1 text-blue-300">Módulo Facturación</div>
              <div className="bg-blue-500/20 rounded px-1.5 py-1 text-blue-300 mt-1">Testing</div>
            </div>
            <div className="rounded bg-slate-700/30 p-1.5">
              <div className="text-slate-500 mb-1">Completado</div>
              <div className="bg-slate-700/50 rounded px-1.5 py-1 text-slate-500">Relevamiento</div>
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
          Proyecto Entregado
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center">
              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="text-emerald-400 font-semibold">Facturación Electrónica completada</span>
          </div>
          <div className="text-slate-400">Tu sistema ya está integrado con AFIP. Recibís facturación automática.</div>
          <div className="flex -space-x-1">
            {["👍","⭐","❤️"].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
          </div>
        </div>
      </div>
    ),
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-400 font-semibold">📊 Proyecto Finalizado</span>
          <span className="text-slate-600">hace 1h</span>
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Facturación Electrónica AFIP</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-medium">Entregado</span>
          </div>
          <div className="space-y-1 text-slate-400">
            <div className="flex justify-between"><span>Horas totales</span><span className="text-white">18h</span></div>
            <div className="flex justify-between"><span>Facturado</span><span className="text-emerald-400">$85.000</span></div>
            <div className="flex justify-between"><span>Margen</span><span className="text-emerald-400">68%</span></div>
          </div>
          <div className="pt-1.5 border-t border-emerald-500/20">
            <span className="text-[9px] text-slate-500">Cliente notificado automáticamente</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function SimuladorGestionPymes() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] mb-6">
            🎬 LIVE EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Mirá cómo fluye un proyecto de principio a fin
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Desde que el cliente envía su solicitud hasta que recibe la notificación de entrega.
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
