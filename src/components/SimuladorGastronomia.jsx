import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  { id: 1, label: "Cliente escanea y pide" },
  { id: 2, label: "Cocina marcha la comanda" },
  { id: 3, label: "Cobro y liberación de mesa" },
]

const phoneVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

const dashVariants = {
  enter: () => ({ opacity: 0, y: 20 }),
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function SimuladorGastronomia() {
  const [activeStep, setActiveStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const goToStep = (id) => {
    setDirection(id > activeStep ? 1 : -1)
    setActiveStep(id)
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
      <div className="mx-auto max-w-7xl w-full">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            EXPERIENCIA EN VIVO
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Así funciona tu restaurante en un viernes a la noche
          </h2>

          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Descubrí la sincronización en tiempo real entre lo que ve tu cliente en la mesa y lo que pasa en tu cocina.
          </p>
        </motion.div>

        {/* ── Stepper ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {steps.map((s) => {
            const isActive = s.id === activeStep
            const isPast = s.id < activeStep
            return (
              <button
                key={s.id}
                onClick={() => goToStep(s.id)}
                className={`group relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-400 cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/30 scale-105"
                    : isPast
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/25"
                      : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800/80 hover:text-slate-300"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition-all ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isPast
                        ? "bg-emerald-500/30 text-emerald-400"
                        : "bg-slate-700/50 text-slate-500"
                  }`}
                >
                  {isPast ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    `0${s.id}`
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="inline sm:hidden">{s.label.replace(/^\d+\.\s*/, "")}</span>
              </button>
            )
          })}
        </div>

        {/* ── Split Screen: Phone (left) + Dashboard (right) ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* ─── Phone Mockup ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[260px] h-[540px] rounded-[2.5rem] border-[3px] border-slate-600 bg-slate-950 shadow-2xl shadow-cyan-500/5 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-slate-950 rounded-b-2xl z-20">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800" />
              </div>

              <div className="h-full pt-7 pb-4 flex flex-col bg-slate-900">
                {/* Phone header */}
                <div className="px-4 py-2.5 border-b border-slate-800/60 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white shadow-lg shadow-cyan-500/20">
                    CC
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold text-white leading-tight">Café Central</div>
                    <div className="text-[7px] text-slate-500">Mesa 4 · Menú Digital</div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Phone body */}
                <div className="flex-1 relative">
                  <AnimatePresence mode="wait" custom={direction}>
                    {activeStep === 1 && (
                      <motion.div
                        key="step1-phone"
                        custom={direction}
                        variants={phoneVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col"
                      >
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
                          {[
                            { name: "Hamburguesa Clásica", price: "$6.500", q: 2 },
                            { name: "Papas Fritas Grandes", price: "$2.800", q: 1 },
                            { name: "Cerveza Artesanal", price: "$3.200", q: 2 },
                            { name: "Ensalada Caesar", price: "$4.500", q: 1 },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-cyan-500/30 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-[9px] font-bold text-cyan-400 w-4 shrink-0">{item.q}x</span>
                                <span className="text-[11px] text-slate-200 truncate">{item.name}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-slate-300 shrink-0 ml-2">{item.price}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <span className="text-xs font-bold text-white">Total</span>
                            <span className="text-sm font-bold text-cyan-400">$21.700</span>
                          </div>
                        </div>
                        <div className="px-3 py-2 border-t border-slate-800/60">
                          <button className="w-full py-2.5 rounded-xl text-[10px] font-bold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-[0.97] cursor-pointer">
                            Confirmar Pedido Mesa 4
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step2-phone"
                        custom={direction}
                        variants={phoneVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center mb-5">
                          <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 17v1" />
                          </svg>
                        </div>
                        <div className="text-base font-semibold text-white mb-1">Pedido Confirmado</div>
                        <div className="text-xs text-slate-400 mb-6">Mesa 4 · 2 comensales</div>
                        <div className="flex items-center gap-2 text-sm text-amber-400 font-medium mb-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          Preparando tu hamburguesa...
                        </div>
                        {/* Animated progress */}
                        <div className="w-44 h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-[grow-width_3s_ease-out_infinite]" style={{ width: "45%" }} />
                        </div>
                        <span className="text-[9px] text-slate-600 mt-2">Tiempo estimado: 12 min</span>
                      </motion.div>
                    )}

                    {activeStep === 3 && (
                      <motion.div
                        key="step3-phone"
                        custom={direction}
                        variants={phoneVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mb-5">
                          <svg className="w-9 h-9 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="text-lg font-bold text-white mb-1">¡Pago Exitoso!</div>
                        <div className="text-xs text-slate-400 mb-2">Mesa 4 · Total $21.700</div>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-6">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Cobro confirmado
                        </div>
                        <div className="flex gap-2 w-full px-4">
                          <button className="flex-1 py-2.5 rounded-xl text-[10px] font-bold tracking-wide text-white bg-slate-700/60 hover:bg-slate-700/80 border border-slate-600/50 transition-all duration-300 active:scale-[0.97] cursor-pointer">
                            Pedir Factura
                          </button>
                          <button className="flex-1 py-2.5 rounded-xl text-[10px] font-bold tracking-wide text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 transition-all duration-300 active:scale-[0.97] cursor-pointer">
                            Salir
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Dashboard Mockup ─── */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Dashboard header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium ml-2">Dashboard · Cocina</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Sync
                  </span>
                  <span className="text-[9px] text-slate-500">Mesa 4</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-5 min-h-[240px] relative">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step1-dash"
                      variants={dashVariants}
                      custom={direction}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      {/* New order notification */}
                      <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/25 rounded-xl px-4 py-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-cyan-400">Nueva comanda ingresada</div>
                          <div className="text-xs text-slate-400">Mesa 4 · 4 ítems · $21.700</div>
                        </div>
                        <span className="text-[9px] text-slate-500">hace 10s</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3.5">
                          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Mesas Ocupadas</div>
                          <div className="text-2xl font-bold text-white">6<span className="text-sm font-normal text-slate-500">/12</span></div>
                          <div className="text-[9px] text-emerald-400 mt-1">+1 ahora</div>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3.5">
                          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Comandas Pendientes</div>
                          <div className="text-2xl font-bold text-white">4</div>
                          <div className="text-[9px] text-amber-400 mt-1">2 en cocina</div>
                        </div>
                      </div>

                      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">M4</div>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-white">Mesa 4 — Recién Ingresada</div>
                            <div className="text-[10px] text-slate-400">2x Hamburguesa · 1x Papas · 2x Cerveza</div>
                          </div>
                          <span className="text-[9px] px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium">Nuevo</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step2-dash"
                      variants={dashVariants}
                      custom={direction}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      {/* Kitchen ticket */}
                      <div className="bg-slate-800/40 border border-amber-500/20 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">M4</div>
                            <div>
                              <div className="text-sm font-semibold text-white">Mesa 4</div>
                              <div className="text-[9px] text-slate-500">Comanda #1042</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[9px] text-amber-400 font-medium">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span className="font-semibold">8:42</span>
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-slate-700/50 pt-3 space-y-1.5">
                          {[
                            { item: "2x Hamburguesa Clásica", note: "Sin cebolla" },
                            { item: "1x Papas Fritas Grandes", note: "" },
                            { item: "2x Cerveza Artesanal", note: "Bien fría" },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">{row.item}</span>
                              {row.note && <span className="text-[9px] text-amber-400/70 italic">{row.note}</span>}
                            </div>
                          ))}
                        </div>

                        <button className="w-full py-2.5 rounded-xl text-[10px] font-bold tracking-wide text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-[0.97] cursor-pointer">
                          Marcar como Listo
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-800/20 rounded-xl px-4 py-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="flex-1">Cocinando: 2 comandas en preparación</span>
                        <span className="text-amber-400 font-medium">Tiempo prom.: 8 min</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step3-dash"
                      variants={dashVariants}
                      custom={direction}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      {/* Billing widget */}
                      <div className="bg-slate-800/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white">M4</div>
                            <div>
                              <div className="text-sm font-semibold text-white">Mesa 4 — Cobrada</div>
                              <div className="flex items-center gap-1.5 text-[9px] text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Liberada
                              </div>
                            </div>
                          </div>
                          <span className="text-[9px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">Disponible</span>
                        </div>

                        <div className="border-t border-dashed border-slate-700/50 pt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Subtotal</span>
                            <span className="text-slate-300">$18.700</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Cubiertos (x2)</span>
                            <span className="text-slate-300">$1.000</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Servicio (10%)</span>
                            <span className="text-slate-300">$2.000</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-700/30 pt-2">
                            <span className="text-sm font-bold text-white">Total Cobrado</span>
                            <span className="text-lg font-bold text-emerald-400">$21.700</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3.5">
                          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Cierre del Día</div>
                          <div className="text-lg font-bold text-white">$284.600</div>
                          <div className="text-[9px] text-emerald-400 mt-1">+18% vs ayer</div>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3.5">
                          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Mesas Hoy</div>
                          <div className="text-lg font-bold text-white">42</div>
                          <div className="text-[9px] text-emerald-400 mt-1">Rotación: 3.5</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
