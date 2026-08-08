import { motion } from "framer-motion"
import InteractiveBackground from "../components/InteractiveBackground"
import PilaresGestionPymes from "../components/PilaresGestionPymes"
import SimuladorGestionPymes from "../components/SimuladorGestionPymes"
import GarantiasGestionPymes from "../components/GarantiasGestionPymes"
import PlanGestionPymes from "../components/PlanGestionPymes"
import FaqGestionPymes from "../components/FaqGestionPymes"

export default function GestionPymes() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — GESTIÓN PYMES
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
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_-4px_rgba(59,130,246,0.2)]">
                <span className="text-base leading-none">📊</span>
                GESTIÓN OPERATIVA &amp; PROYECTOS PARA PYMES
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
                Tu empresa ordenada. Tus proyectos a tiempo. Tu equipo sincronizado.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                Reemplazá las planillas de Excel desordenadas y los grupos de WhatsApp caóticos.
                Un sitio web corporativo conectado con tu propio gestor de proyectos y tareas a medida.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Probar Demo de Gestión
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-blue-400 bg-slate-800/60 border border-blue-500/30 hover:bg-slate-800/80 hover:border-blue-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Agendar Asesoramiento Express
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">🟢 Puesta en marcha en menos de 7 días hábiles.</span>
              </div>
            </motion.div>

            {/* ── COLUMN 2: Dual-Screen Mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-end min-h-[500px] lg:min-h-[600px]"
            >
              {/* Laptop (dashboard view) */}
              <div className="absolute w-full max-w-[480px] h-[360px] bottom-4 left-0 lg:left-2 rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden origin-bottom-left"
                style={{ animation: "float-slow 6s ease-in-out infinite" }}
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Dashboard</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center text-[7px] text-blue-400 font-bold">P</div>
                    <span className="text-[9px] text-slate-500">Proyectos</span>
                  </div>
                </div>

                <div className="p-3 space-y-2.5">
                  {/* Kanban columns */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { title: "Por Hacer", items: ["Landing Page", "SEO Técnico"], color: "border-slate-600/50" },
                      { title: "En Proceso", items: ["Dashboard", "API REST"], color: "border-blue-500/40" },
                      { title: "Entregado", items: ["Research UX"], color: "border-emerald-500/40" },
                    ].map((col, ci) => (
                      <div key={ci} className="rounded-lg bg-slate-800/40 border border-slate-700/30 p-2">
                        <div className="text-[8px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{col.title}</div>
                        {col.items.map((item, ii) => (
                          <div key={ii} className={`text-[9px] bg-slate-700/50 rounded px-2 py-1.5 mb-1 border-l-2 ${col.color} text-slate-300`}>
                            <div className="flex items-center justify-between">
                              <span>{item}</span>
                              {ci === 1 && <span className="w-3 h-3 rounded-full bg-blue-400/30 flex items-center justify-center text-[6px] text-blue-400 font-bold">M</span>}
                              {ci === 0 && <span className="text-[7px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-400">Alta</span>}
                              {ci === 2 && <span className="text-[7px] text-emerald-400">✓</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet (client view) */}
              <div className="relative w-[380px] h-[460px] rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden z-10 mr-0 lg:mr-4"
                style={{ animation: "float 5s ease-in-out infinite" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-[9px] font-bold text-white">N</div>
                    <span className="text-[11px] font-semibold text-white">Nexo Studio</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] text-slate-500">Portal Cliente</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Proyecto: Rediseño Integral Web</div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-blue-400 font-semibold">Progreso</span>
                      <span className="text-emerald-400 font-semibold">75%</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Wireframes Aprobados", done: true },
                      { name: "Diseño UI/Branding", done: true },
                      { name: "Desarrollo Frontend", done: false },
                      { name: "Integración Backend", done: false },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${t.done ? "bg-emerald-500/30 text-emerald-400" : "border border-slate-600"}`}>
                          {t.done && <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <span className={t.done ? "text-slate-300" : "text-slate-500"}>{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PilaresGestionPymes />
      <SimuladorGestionPymes />
      <GarantiasGestionPymes />
      <PlanGestionPymes />
      <FaqGestionPymes />

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
      `}</style>
    </>
  )
}
