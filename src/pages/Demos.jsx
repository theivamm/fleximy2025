import { useState } from "react"
import { motion } from "framer-motion"
import { useLang } from "../context/LangContext"
import InteractiveBackground from "../components/InteractiveBackground"
import SectionWrapper from "../components/SectionWrapper"

const GASTRO_ITEMS = [
  { name: "Plato del Día", price: "$6.500", badge: "Recomendado", badgeColor: "bg-cyan-500/20 text-cyan-400" },
  { name: "Café Especialidad", price: "$2.800", badge: null, badgeColor: "" },
  { name: "Milanesa con Puré", price: "$7.200", badge: "Más Pedido", badgeColor: "bg-emerald-500/20 text-emerald-400" },
  { name: "Ensalada Caesar", price: "$5.400", badge: "Light", badgeColor: "bg-violet-500/20 text-violet-400" },
  { name: "Pizza Mozzarella", price: "$4.900", badge: null, badgeColor: "" },
  { name: "Flan Casero", price: "$3.200", badge: "Nuevo", badgeColor: "bg-cyan-500/20 text-cyan-400" },
]

const STOCK_ITEMS = [
  { name: "Milanesa con Puré", stock: true },
  { name: "Ensalada Caesar", stock: true },
  { name: "Pizza Mozzarella", stock: false },
  { name: "Flan Casero", stock: true },
  { name: "Café Especialidad", stock: true },
]

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
]

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

const KANBAN_TASKS = [
  { id: 1, title: "Diseñar landing", col: "todo" },
  { id: 2, title: "Redactar briefing", col: "todo" },
  { id: 3, title: "Wireframes mobile", col: "doing" },
  { id: 4, title: "Revisión copy", col: "doing" },
]

export default function Demos() {
  const { lang } = useLang()

  const [gastroView, setGastroView] = useState("cliente")
  const [turnosView, setTurnosView] = useState("cliente")
  const [pymeView, setPymeView] = useState("dashboard")

  const [stock, setStock] = useState(STOCK_ITEMS.map(() => true))
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [turnosCount] = useState(3)
  const [tasks, setTasks] = useState(KANBAN_TASKS)

  const toggleStock = (idx) => {
    setStock((prev) => {
      const next = [...prev]
      next[idx] = !next[idx]
      return next
    })
  }

  const moveTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, col: t.col === "todo" ? "doing" : "todo" } : t
      )
    )
  }

  const is = (v) => v === "cliente" || v === "dashboard"

  return (
    <>
      <style>{`
        @keyframes glow-cyan { 0%,100% { box-shadow: 0 0 12px rgba(6,182,212,0.15); } 50% { box-shadow: 0 0 24px rgba(6,182,212,0.35); } }
        @keyframes glow-green { 0%,100% { box-shadow: 0 0 12px rgba(34,197,94,0.15); } 50% { box-shadow: 0 0 24px rgba(34,197,94,0.35); } }
        @keyframes glow-violet { 0%,100% { box-shadow: 0 0 12px rgba(139,92,246,0.15); } 50% { box-shadow: 0 0 24px rgba(139,92,246,0.35); } }
        .glow-cyan { animation: glow-cyan 3s ease-in-out infinite; }
        .glow-green { animation: glow-green 3s ease-in-out infinite; }
        .glow-violet { animation: glow-violet 3s ease-in-out infinite; }
        .glow-border-cyan { border-color: rgba(6,182,212,0.4); }
        .glow-border-green { border-color: rgba(34,197,94,0.4); }
        .glow-border-violet { border-color: rgba(139,92,246,0.4); }
      `}</style>

      {/* ═══════════════════════════════════════════
          MODULE 1 — HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
        <InteractiveBackground />
        <div className="mx-auto max-w-6xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/40 bg-cyan-500/10 glow-cyan">
              <span>🎮</span>
              PROBADOR EN TIEMPO REAL
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-white">
                Experimentá la simplicidad de{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
                nuestros sistemas en vivo
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Sin registros, sin descargas y sin rodeos. Seleccioná tu rubro y probá la experiencia tanto desde la perspectiva de tu cliente como desde tu panel de control.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">3 Demos interactivas listas para probar.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODULE 2 — SHOWROOM DE DEMOS
      ════════════════════════════════════════════ */}
      <SectionWrapper>
        <div className="space-y-16 md:space-y-24">

          {/* ────────────────────────────────────
              TARJETA 1 — GASTRONOMÍA
          ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center bg-[#131b2e] rounded-2xl border border-[#1e293b] p-6 sm:p-8 lg:p-10"
          >
            {/* Left: info */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10">
                <span>☕</span> GASTRONOMÍA
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Sistema de Menú QR, Reservas y Comandas
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Probá cómo tus clientes ven la carta desde el celular y cómo vos editás precios o recibís comandas al instante.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setGastroView("cliente")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    gastroView === "cliente"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  📱 Probar Menú QR (Vista Cliente)
                </button>
                <button
                  onClick={() => setGastroView("dashboard")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    gastroView === "dashboard"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  💻 Entrar al Dashboard de Cocina
                </button>
              </div>
            </div>

            {/* Right: preview */}
            <div className="relative min-h-[360px] rounded-xl bg-[#0b0f19] border border-[#1e293b] overflow-hidden">
              {gastroView === "cliente" ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">C</div>
                      <div>
                        <div className="text-xs font-semibold text-white">Café Central</div>
                        <div className="text-[9px] text-slate-500">Menú Digital</div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-6 h-4 rounded bg-cyan-500/20 flex items-center justify-center text-[7px] text-cyan-400 font-bold">QR</div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {GASTRO_ITEMS.map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 border border-transparent hover:border-cyan-500/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center">
                            <div className={`w-3.5 h-3.5 rounded-full ${i === 0 ? "bg-cyan-400" : i === 2 ? "bg-emerald-400" : i === 3 ? "bg-violet-400" : i === 5 ? "bg-cyan-400" : "bg-slate-500"}`} />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white group-hover:text-cyan-400 transition-colors">{item.name}</div>
                            {item.badge && (
                              <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white">{item.price}</span>
                          <button className="text-[9px] px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-bold cursor-pointer">
                            + Sumar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-[#1e293b] bg-[#131b2e]/80">
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer active:scale-[0.97]">
                      Enviar Pedido
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold text-white">Dashboard Cocina</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Edición Rápida de Carta</div>
                    <div className="space-y-2">
                      {STOCK_ITEMS.map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/40 border border-[#1e293b] hover:border-cyan-500/20 transition-all">
                          <span className="text-xs text-slate-300">{item.name}</span>
                          <button
                            onClick={() => toggleStock(i)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
                              stock[i] ? "bg-emerald-500" : "bg-slate-700"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow ${
                                stock[i] ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-slate-800/40 border border-emerald-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Comanda en Vivo</span>
                        <span className="text-[8px] text-emerald-400 font-semibold">🟢 En Preparación</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-[9px] text-cyan-400 font-bold">M3</div>
                        <span className="text-xs text-slate-300">Mesa 3 — 2 Cafés, 1 Tostado</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-slate-700/50 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 animate-[grow-width_2s_ease-out_infinite]" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ────────────────────────────────────
              TARJETA 2 — TURNOS & SERVICIOS
          ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center bg-[#131b2e] rounded-2xl border border-[#1e293b] p-6 sm:p-8 lg:p-10"
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest text-cyan-400 border border-cyan-500/30 bg-cyan-500/10">
                <span>📅</span> SERVICIOS & TURNOS
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Portal de Reservas 24/7 y Agenda Interactiva
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Experimentá la agilidad con la que un cliente agenda su turno y cómo el profesional organiza su semana.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setTurnosView("cliente")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    turnosView === "cliente"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  📱 Probar Portal de Reservas
                </button>
                <button
                  onClick={() => setTurnosView("dashboard")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    turnosView === "dashboard"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  💻 Entrar a la Agenda del Profesional
                </button>
              </div>
            </div>

            <div className="relative min-h-[360px] rounded-xl bg-[#0b0f19] border border-[#1e293b] overflow-hidden">
              {turnosView === "cliente" ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <span className="text-xs font-semibold text-white">Reservá tu Turno</span>
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-[8px] text-cyan-400">⬅</div>
                      <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-[8px] text-cyan-400">➡</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((d, i) => (
                        <div key={i} className="text-center text-[9px] text-slate-500 font-semibold py-1">{d}</div>
                      ))}
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 3
                        const isToday = day === 15
                        const isPast = day < 15
                        return (
                          <div
                            key={i}
                            className={`text-center text-[10px] py-1.5 rounded-lg transition-colors ${
                              isToday
                                ? "bg-cyan-500/30 text-cyan-400 font-bold"
                                : isPast || day < 1 || day > 30
                                ? "text-slate-700"
                                : "text-slate-300 hover:bg-slate-800/40 cursor-pointer"
                            }`}
                          >
                            {day >= 1 && day <= 30 ? day : ""}
                          </div>
                        )
                      })}
                    </div>
                    <div className="border-t border-[#1e293b] pt-3">
                      <div className="text-[10px] font-semibold text-slate-500 mb-2">Horarios Disponibles — 16 Jul</div>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.slice(0, 8).map((slot) => {
                          const isBooked = slot === "16:00"
                          const isSelected = selectedSlot === slot
                          return (
                            <button
                              key={slot}
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                                isBooked
                                  ? "bg-rose-500/20 text-rose-400 line-through cursor-not-allowed"
                                  : isSelected
                                  ? "bg-cyan-500 text-white"
                                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-[#1e293b]"
                              }`}
                            >
                              {slot}
                              {isBooked && <span className="block text-[7px] font-normal">Reservado</span>}
                            </button>
                          )
                        })}
                      </div>
                      {selectedSlot && (
                        <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                          <span className="text-[10px] text-emerald-400 font-semibold">✓ Turno {selectedSlot} seleccionado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-white">Agenda Semanal</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Semana 29</span>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-6 gap-2 h-full">
                      {WEEK_DAYS.map((day, i) => {
                        const isToday = i === 3
                        const blocks = [
                          { h: "09:00", busy: i === 0 },
                          { h: "10:00", busy: i === 1 || i === 3 },
                          { h: "11:00", busy: i === 2 },
                          { h: "12:00", busy: false },
                          { h: "16:00", busy: i === 3 },
                          { h: "17:00", busy: i === 3 },
                          { h: "18:00", busy: i === 4 },
                        ]
                        return (
                          <div key={i} className="flex flex-col">
                            <div className={`text-center text-[10px] font-semibold py-1.5 rounded-lg mb-2 ${
                              isToday ? "bg-cyan-500/20 text-cyan-400" : "text-slate-500"
                            }`}>{day}</div>
                            <div className="flex-1 space-y-1">
                              {blocks.map((b, j) => (
                                <div
                                  key={j}
                                  className={`text-[8px] px-1.5 py-1 rounded text-center font-medium ${
                                    b.busy
                                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
                                      : "bg-slate-800/30 text-slate-600 border border-[#1e293b]"
                                  }`}
                                >
                                  {b.h}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[10px] text-emerald-400 font-semibold">🟢 {turnosCount} Turnos Confirmados para Hoy</span>
                      <span className="text-[9px] text-slate-500">+2 pendientes</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ────────────────────────────────────
              TARJETA 3 — GESTIÓN PyME
          ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center bg-[#131b2e] rounded-2xl border border-[#1e293b] p-6 sm:p-8 lg:p-10"
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                <span>📊</span> GESTIÓN & PROYECTOS
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Tablero Kanban, Tareas y Portal de Clientes
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Comprobá la facilidad para asignar tareas a tu equipo y darle visibilidad a tus clientes sobre sus entregables.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setPymeView("cliente")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    pymeView === "cliente"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  📱 Probar Portal del Cliente
                </button>
                <button
                  onClick={() => setPymeView("dashboard")}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.97] ${
                    pymeView === "dashboard"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60"
                  }`}
                >
                  💻 Entrar al Gestor de Proyectos
                </button>
              </div>
            </div>

            <div className="relative min-h-[360px] rounded-xl bg-[#0b0f19] border border-[#1e293b] overflow-hidden">
              {pymeView === "cliente" ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">P</div>
                      <span className="text-xs font-semibold text-white">Portal Cliente</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-700/50 border border-slate-600/50" />
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="p-3 rounded-lg bg-slate-800/40 border border-emerald-500/20">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1">Proyecto: Landing Rediseño</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-500">Avance</span>
                        <span className="text-[9px] text-slate-400">65%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                        <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/40 border border-[#1e293b]">
                      <div className="text-[10px] text-slate-400 font-semibold mb-2">Entregables</div>
                      <div className="space-y-2">
                        {[{ n: "Wireframes", ok: true }, { n: "Mockups", ok: true }, { n: "Desarrollo", ok: false }].map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px]">
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${d.ok ? "bg-emerald-500/30" : "bg-slate-700/50"}`}>
                              {d.ok && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                            </div>
                            <span className={d.ok ? "text-slate-300" : "text-slate-600"}>{d.n}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <span className="text-[10px] text-cyan-400 font-semibold">💬 3 mensajes nuevos del equipo</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#131b2e]/80">
                    <span className="text-xs font-semibold text-white">Tablero Kanban</span>
                    <span className="text-[9px] text-slate-500">Proyecto Activo</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 p-4">
                    {/* To Do */}
                    <div className="flex flex-col rounded-lg bg-slate-800/30 border border-[#1e293b] overflow-hidden">
                      <div className="px-3 py-2 bg-slate-800/50 border-b border-[#1e293b]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-400">Por Hacer</span>
                          <span className="text-[9px] text-slate-600">{tasks.filter((t) => t.col === "todo").length}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-2 space-y-2">
                        {tasks.filter((t) => t.col === "todo").map((task) => (
                          <div
                            key={task.id}
                            onClick={() => moveTask(task.id)}
                            className="p-2.5 rounded-lg bg-slate-800/60 border border-[#1e293b] hover:border-emerald-500/30 cursor-pointer transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-[11px] text-slate-300 group-hover:text-white transition-colors">{task.title}</span>
                              <span className="text-[8px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* In Progress */}
                    <div className="flex flex-col rounded-lg bg-slate-800/30 border border-[#1e293b] overflow-hidden">
                      <div className="px-3 py-2 bg-slate-800/50 border-b border-[#1e293b]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-emerald-400">En Proceso</span>
                          <span className="text-[9px] text-slate-600">{tasks.filter((t) => t.col === "doing").length}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-2 space-y-2">
                        {tasks.filter((t) => t.col === "doing").map((task) => (
                          <div
                            key={task.id}
                            onClick={() => moveTask(task.id)}
                            className="p-2.5 rounded-lg bg-slate-800/60 border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-[11px] text-slate-300 group-hover:text-white transition-colors">{task.title}</span>
                              <span className="text-[8px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">←</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-[#1e293b] bg-[#131b2e]/80">
                    <span className="text-[9px] text-slate-500">💡 Hacé clic en una tarea para moverla de columna</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 3 — CTA BANNER
      ════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#131b2e] via-[#1a2540] to-[#131b2e] border border-[#1e293b] p-8 sm:p-12 md:p-16 text-center"
          >
            {/* Glow effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                ¿Te gustó cómo funciona el sistema?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Te preparamos esta misma plataforma configurada con tu logo, tus colores y tus datos iniciales cargados en menos de 7 días hábiles por <strong className="text-white">$150.000 ARS/mes</strong>.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 active:scale-[0.98]"
                >
                  💬 Solicitar Puesta en Marcha por WhatsApp
                </a>
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-cyan-400 bg-slate-800/60 border border-cyan-500/30 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  📅 Agendar Videollamada de 15 min
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
