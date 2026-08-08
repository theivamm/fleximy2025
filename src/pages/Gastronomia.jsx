import { motion } from "framer-motion"
import { useLang } from "../context/LangContext"
import InteractiveBackground from "../components/InteractiveBackground"
import PilaresGastronomia from "../components/PilaresGastronomia"
import SimuladorGastronomia from "../components/SimuladorGastronomia"
import GarantiasGastronomia from "../components/GarantiasGastronomia"
import PlanGastronomico from "../components/PlanGastronomico"
import FaqGastronomia from "../components/FaqGastronomia"

export default function Gastronomia() {
  const { lang } = useLang()

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — GASTRONOMÍA
      ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pb-28 bg-[#0b0f19] overflow-hidden">
        <InteractiveBackground />

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── COLUMN 1: Text & Conversion ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_-4px_rgba(251,191,36,0.2)]">
                <span className="text-base leading-none">☕</span>
                {lang === "es" ? "GASTRONOMÍA & RESTAURACIÓN" : "GASTRONOMY & RESTAURATION"}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
                {lang === "es"
                  ? "Tu menú digital, tus reservas y el control de tu cocina. En un solo lugar."
                  : "Your digital menu, reservations, and kitchen control. In one place."}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                {lang === "es"
                  ? "Eliminá las cartas desactualizadas y las comisiones de terceros. Un sitio web moderno integrado con un panel de control para cambiar precios en vivo, gestionar mesas y organizar comandas."
                  : "Eliminate outdated menus and third-party commissions. A modern website integrated with a control panel to change prices live, manage tables, and organize orders."}
              </p>

              {/* Dual Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  {lang === "es" ? "Probar Demo Gastronómica" : "Try Gastronomy Demo"}
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-amber-400 bg-slate-800/60 border border-amber-500/30 hover:bg-slate-800/80 hover:border-amber-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {lang === "es" ? "Agendar Configuración Express" : "Schedule Express Setup"}
                </a>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">
                  {lang === "es" ? "🟢 Puesta en marcha en menos de 7 días hábiles." : "🟢 Up and running in less than 7 business days."}
                </span>
              </div>
            </motion.div>

            {/* ── COLUMN 2: Dual-Screen Mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-end min-h-[500px] lg:min-h-[600px]"
            >
              {/* Dashboard (laptop/tablet view) — behind phone, left side */}
              <div className="absolute w-full max-w-[440px] h-[340px] bottom-4 left-0 lg:left-2 rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden origin-bottom-left"
                style={{ animation: "float-slow 6s ease-in-out infinite" }}
              >
                {/* Dashboard header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[8px] text-amber-400 font-bold">G</div>
                    <span className="text-[10px] text-slate-400 font-medium">Dashboard</span>
                  </div>
                  <div className="w-16 h-4 rounded bg-slate-700/30" />
                </div>

                {/* Dashboard body */}
                <div className="p-3 space-y-2.5">
                  {/* Row 1: Two widgets */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Widget: Reservas */}
                    <div className="rounded-lg bg-slate-800/50 border border-slate-700/30 p-2.5 group/dash hover:border-amber-500/20 transition-colors">
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Reservas Hoy</div>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-bold text-white group-hover/dash:text-amber-400 transition-colors">12</span>
                        <span className="text-[10px] text-emerald-400 mb-0.5">Confirmadas</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[9px] text-amber-400/80">2 pendientes</span>
                      </div>
                    </div>

                    {/* Widget: Stock Toggle */}
                    <div className="rounded-lg bg-slate-800/50 border border-slate-700/30 p-2.5 group/dash hover:border-amber-500/20 transition-colors">
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Edición Rápida</div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="flex-1 h-5 rounded bg-slate-700/50 flex items-center px-2">
                          <span className="text-[8px] text-slate-400">Medialuna...</span>
                        </div>
                        <button className="h-5 px-2 rounded text-[8px] font-bold bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors">
                          Editar
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-[1px] bg-emerald-400" />
                          </div>
                          <span className="text-[8px] text-emerald-400">En Stock</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-40">
                          <div className="w-3 h-3 rounded-sm bg-slate-600/30 border border-slate-600/50" />
                          <span className="text-[8px] text-slate-500">Agotado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Live Order */}
                  <div className="rounded-lg bg-slate-800/50 border border-amber-500/15 p-2.5 group/dash hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Comanda en Vivo</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[8px] text-emerald-400">En Preparación</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-[10px] text-amber-400 font-bold">M8</div>
                      <div className="text-[10px] text-slate-300">
                        <span className="text-white font-medium">Mesa 8</span>
                        {" — "}2 Cafés, 1 Tostado
                      </div>
                    </div>
                    {/* Animated progress bar */}
                    <div className="mt-2 h-1 rounded-full bg-slate-700/50 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-[grow-width_2s_ease-out_infinite]" style={{ width: "60%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup — in front */}
              <div className="relative w-[260px] h-[520px] rounded-[2.5rem] border-[3px] border-slate-600 bg-slate-950 shadow-2xl shadow-amber-500/5 overflow-hidden z-10 mr-0 lg:mr-6"
                style={{ animation: "float 5s ease-in-out infinite" }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-slate-950 rounded-b-2xl z-20">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Phone screen */}
                <div className="h-full pt-6 pb-4 flex flex-col bg-slate-900">
                  {/* Header: cafe logo + name */}
                  <div className="px-4 py-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-amber-500/20">
                        C
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white leading-tight">Café Central</div>
                        <div className="text-[8px] text-slate-500">Menú Digital</div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="flex-1 overflow-hidden px-3 py-3 space-y-2">
                    {[
                      { name: "Flat White", price: "$4.200", badge: "Popular", badgeColor: "bg-amber-500/20 text-amber-400" },
                      { name: "Medialuna de Manteca", price: "$1.800", badge: null, badgeColor: "" },
                      { name: "Sándwich de Lomito", price: "$7.500", badge: "Más Pedido", badgeColor: "bg-emerald-500/20 text-emerald-400" },
                      { name: "Tostado Mixto", price: "$3.900", badge: null, badgeColor: "" },
                      { name: "Jugo de Naranja", price: "$2.500", badge: null, badgeColor: "" },
                      { name: "Porción de Tarta", price: "$3.200", badge: "Nuevo", badgeColor: "bg-cyan-500/20 text-cyan-400" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group/row flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-transparent hover:border-amber-500/20 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden group-hover/row:scale-110 transition-transform">
                            <div className={`w-4 h-4 rounded-full ${i === 0 ? "bg-amber-400" : i === 2 ? "bg-emerald-400" : "bg-slate-500"}`} style={{ clipPath: "circle(50%)" }} />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white group-hover/row:text-amber-400 transition-colors">{item.name}</div>
                            {item.badge && (
                              <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-300 group-hover/row:text-white group-hover/row:scale-105 transition-all">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Floating CTA */}
                  <div className="px-3 py-2 border-t border-slate-800/60">
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold tracking-wide text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 cursor-pointer active:scale-[0.97]">
                      Pedir a la Mesa 4
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MÓDULO 2 — PILARES OPERATIVOS
      ════════════════════════════════════════════ */}
      <PilaresGastronomia />

      {/* ═══════════════════════════════════════════
          MÓDULO 3 — SIMULADOR DE FLUJO EN VIVO
      ════════════════════════════════════════════ */}
      <SimuladorGastronomia />

      {/* ═══════════════════════════════════════════
          MÓDULO 4 — GARANTÍAS OPERATIVAS
      ════════════════════════════════════════════ */}
      <GarantiasGastronomia />

      {/* ═══════════════════════════════════════════
          MÓDULO 5 — PLAN GASTRONÓMICO
      ════════════════════════════════════════════ */}
      <PlanGastronomico />

      {/* ═══════════════════════════════════════════
          MÓDULO 6 — FAQ + CTA FINAL
      ════════════════════════════════════════════ */}
      <FaqGastronomia />

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
      `}</style>
    </>
  )
}
