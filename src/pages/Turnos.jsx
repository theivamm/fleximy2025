import { motion } from "framer-motion"
import InteractiveBackground from "../components/InteractiveBackground"
import PilaresTurnos from "../components/PilaresTurnos"
import SimuladorTurnos from "../components/SimuladorTurnos"
import GarantiasTurnos from "../components/GarantiasTurnos"
import PlanTurnos from "../components/PlanTurnos"
import FaqTurnos from "../components/FaqTurnos"

export default function Turnos() {
  return (
    <>
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pb-28 bg-[#0b0f19] overflow-hidden">
        <InteractiveBackground />

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)]">
                <span className="text-base leading-none">📅</span>
                TURNOS &amp; SERVICIOS PARA PYMES
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
                Reservas online. Agenda sincronizada. Clientes felices.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                Dejá de perder llamadas y mensajes perdidos. Unificá toda tu gestión de turnos en un solo lugar: web, WhatsApp y dashboard.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Probar Gestión de Turnos
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-cyan-400 bg-slate-800/60 border border-cyan-500/30 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Agendar Asesoramiento Express
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">🟢 Sincronizamos tu agenda en menos de 48 horas.</span>
              </div>
            </motion.div>

            {/* ── RIGHT: Calendar + Dashboard Mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-end min-h-[500px] lg:min-h-[600px]"
            >
              {/* Laptop (dashboard agenda view) */}
              <div className="absolute w-full max-w-[480px] h-[360px] bottom-4 left-0 lg:left-2 rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden origin-bottom-left"
                style={{ animation: "float-slow 6s ease-in-out infinite" }}
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Dashboard Turnos</span>
                  <div className="text-[9px] text-slate-500">Hoy • 15 turnos</div>
                </div>

                <div className="p-3">
                  {[
                    { hora: "09:00", cliente: "Clínica Dental Dra. Paz", servicio: "Mantenimiento Web", estado: "Confirmado", color: "text-emerald-400" },
                    { hora: "10:30", cliente: "Estética Liss", servicio: "Alta de Sistema", estado: "En curso", color: "text-cyan-400" },
                    { hora: "12:00", cliente: "Taller MG", servicio: "Capacitación", estado: "Pendiente", color: "text-amber-400" },
                    { hora: "14:30", cliente: "Dra. Lucía Méndez", servicio: "Soporte Técnico", estado: "Confirmado", color: "text-emerald-400" },
                    { hora: "16:00", cliente: "Estudio Ramos", servicio: "Demo Turnos", estado: "Pendiente", color: "text-amber-400" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] py-1.5 border-b border-slate-800/40 last:border-0">
                      <span className="text-slate-500 font-mono w-10">{t.hora}</span>
                      <div className="flex-1">
                        <span className="text-slate-300">{t.cliente}</span>
                        <span className="text-slate-600 ml-1">· {t.servicio}</span>
                      </div>
                      <span className={`${t.color} text-[8px] font-medium`}>{t.estado}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet (client booking view) */}
              <div className="relative w-[380px] h-[460px] rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden z-10 mr-0 lg:mr-4"
                style={{ animation: "float 5s ease-in-out infinite" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white">T</div>
                    <span className="text-[11px] font-semibold text-white">Reservá tu Turno</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-7 gap-1">
                    {["L","M","M","J","V","S","D"].map((d, i) => (
                      <div key={i} className="text-center text-[8px] text-slate-600 font-medium py-1">{d}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i}
                        className={`text-[10px] py-1.5 rounded text-center transition-colors ${
                          i === 14 ? "bg-cyan-500/30 text-cyan-400 font-bold" :
                          i === 15 || i === 16 ? "bg-slate-700/30 text-slate-500" :
                          "text-slate-400 hover:bg-slate-800/50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] text-slate-400 font-medium">Horarios disponibles — 15 Mar</div>
                    {["09:00","10:30","12:00","14:30","16:00","17:30"].map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] px-3 py-2 rounded bg-slate-800/40 border border-slate-700/30 hover:border-cyan-500/30 transition-colors cursor-pointer">
                        <span className="text-slate-300">{h}</span>
                        <span className="text-[8px] text-slate-500">Disponible</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PilaresTurnos />
      <SimuladorTurnos />
      <GarantiasTurnos />
      <PlanTurnos />
      <FaqTurnos />

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
      `}</style>
    </>
  )
}
