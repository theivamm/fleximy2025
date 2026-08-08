import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
}

export default function GarantiasGastronomia() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
      <div className="mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_-4px_rgba(251,191,36,0.2)]">
            INFRAESTRUCTURA &amp; SOPORTE
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Diseñado para aguantar la hora pico sin caerse
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Card 1 — Soporte Nocturno */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative bg-[#131b2e] border border-[#1e293b] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.15)]"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
              Soporte Nocturno
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Atención prioritaria durante los horarios de mayor movimiento del rubro gastronómico.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 flex items-center gap-3 group-hover:border-amber-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs text-slate-300">
                Soporte activo de Jueves a Dom hasta las <span className="font-semibold text-emerald-400">02:00 hs</span>
              </span>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* Card 2 — Modo Offline */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative bg-[#131b2e] border border-[#1e293b] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.15)]"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
              Modo Offline
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              El sistema nunca se detiene. Si se corta Internet, seguís operando con normalidad.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 flex items-center gap-3 group-hover:border-cyan-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <span className="text-xs text-emerald-400 font-semibold">Estado: Conexión Guardada Localmente</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span className="text-[9px] text-slate-500">Sincronizado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* Card 3 — Multi-hardware */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative bg-[#131b2e] border border-[#1e293b] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.15)]"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors duration-300">
              Multi-hardware
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Funciona en celulares, tablets y computadoras. Sin inversión en equipos costosos.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 flex items-center gap-4 group-hover:border-violet-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded-sm bg-slate-700/60 border border-slate-600/50 flex items-center justify-center group-hover:border-violet-400/30 transition-colors">
                  <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div className="w-9 h-6 rounded-sm bg-slate-700/60 border border-slate-600/50 flex items-center justify-center group-hover:border-violet-400/30 transition-colors">
                  <svg className="w-4 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                  </svg>
                </div>
                <div className="w-10 h-6 rounded-sm bg-slate-700/60 border border-slate-600/50 flex items-center justify-center group-hover:border-violet-400/30 transition-colors">
                  <svg className="w-4 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-slate-300">Sin hardware obligatorio</span>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* Card 4 — Backups en la Nube */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative bg-[#131b2e] border border-[#1e293b] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.15)]"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
              Backups en la Nube
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Toda tu información está respaldada automáticamente en la nube con cifrado seguro.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 flex items-center gap-3 group-hover:border-emerald-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-semibold">Copia de Seguridad: Hace 1 min</span>
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
