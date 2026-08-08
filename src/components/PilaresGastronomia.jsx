import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  })
}

const baseCard = "group relative bg-[#131b2e] border border-[#1e293b] rounded-[18px] p-8 transition-all duration-500 hover:-translate-y-1.5"

export default function PilaresGastronomia() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
      <div className="mx-auto max-w-7xl w-full">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_-4px_rgba(251,191,36,0.2)]">
            CONTROL TOTAL EN TIEMPO REAL
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Diseñado para el ritmo real de tu salón y tu cocina
          </h2>

          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Olvidate de reimprimir cartas cada vez que aumentan los insumos o de perder clientes por reservas desorganizadas.
          </p>
        </motion.div>

        {/* ── 9 Card Grid: 3 cols lg, 2 md, 1 base ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* ═══════════════════════════════════════════
              Card 1 — Gestor de Carta Anti-Inflación
          ════════════════════════════════════════════ */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-amber-500/40 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
              Gestor de Carta Anti-Inflación
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Modificá el valor de cualquier plato, trago o combo desde tu celular. Poné en &apos;Agotado&apos; un insumo que se terminó para que nadie lo pida por error.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-amber-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Control Rápido</span>
                <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <span className="text-[10px] text-amber-400 font-bold">CD</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white group-hover:text-amber-300 transition-colors">Café Doble</div>
                    <div className="text-[9px] text-slate-500">Código: CAF-001</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">$2.500</span>
                  <svg className="w-3 h-3 text-emerald-400 group-hover:scale-125 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                <span className="text-[10px] text-slate-500 font-medium">Disponibilidad</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-medium text-emerald-400">Disponible</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-slate-600 rounded-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 2 — Panel de Reservas Automáticas
          ════════════════════════════════════════════ */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-cyan-500/40 hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
                <path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
              Panel de Reservas Automáticas
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Permití que tus clientes reserven su mesa online 24/7. Recibí alertas en tu panel, gestioná turnos (mediodía/noche) y confirmá por WhatsApp automático.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-cyan-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Próximas Reservas</span>
                <span className="text-[8px] text-slate-500 font-medium">Hoy</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-slate-700/30 rounded-lg px-3 py-2 group-hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-white w-14">21:00 hs</span>
                    <span className="text-slate-300">Mesa 4</span>
                    <span className="text-slate-500">(4 pers.)</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Confirmada</span>
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-700/30 rounded-lg px-3 py-2 group-hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-white w-14">21:30 hs</span>
                    <span className="text-slate-300">Mesa 2</span>
                    <span className="text-slate-500">(2 pers.)</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Pendiente</span>
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-700/30 rounded-lg px-3 py-2 group-hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-white w-14">22:00 hs</span>
                    <span className="text-slate-300">Mesa 7</span>
                    <span className="text-slate-500">(6 pers.)</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Confirmada</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-700/30 flex items-center justify-between">
                <span className="text-[9px] text-slate-500">Total: 3 reservas</span>
                <span className="text-[9px] text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">Ver todas &rarr;</span>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 3 — Take Away Directo (Sin Comisiones)
          ════════════════════════════════════════════ */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-emerald-500/40 hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
              Take Away Directo (Sin Comisiones)
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Ahorrate las comisiones abusivas de las apps de delivery. Tu cliente arma el pedido en tu web y la orden te llega directamente a tu chat de ventas.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-emerald-500/20 group-hover:bg-slate-800/70 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 flex justify-between px-2 -translate-y-1/2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0b0f19]" />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Comanda #1042</span>
                <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En preparación
                </span>
              </div>

              <div className="border-t border-dashed border-slate-700/50 pt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">2x Burger Bacon</span>
                  <span className="text-slate-400">$9.400</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">1x Papas Fritas Grandes</span>
                  <span className="text-slate-400">$2.800</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">2x Gaseosa</span>
                  <span className="text-slate-400">$2.200</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-700/50 pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Total</span>
                <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">$14.400</span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-600/25 group-hover:shadow-emerald-500/40">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Recibido &mdash; Enviar a WhatsApp
              </button>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 4 — Control de Stock & Insumos
          ════════════════════════════════════════════ */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-rose-500/40 hover:shadow-[0_0_40px_-8px_rgba(244,63,94,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
              Control de Stock &amp; Insumos
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Vinculá tus platos con la materia prima. El sistema descuenta insumos automáticamente con cada pedido y te alerta antes de quedarte sin stock clave.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-4 group-hover:border-rose-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Estado de Insumos</span>
                <span className="flex items-center gap-1 text-[8px] text-rose-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  1 alerta
                </span>
              </div>

              {/* Café en Grano */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Café en Grano</span>
                  <span className="text-rose-400 font-semibold">12%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-700 group-hover:animate-pulse" style={{ width: "12%" }} />
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span className="text-[9px] text-rose-400 font-medium">Alerta: Stock Bajo</span>
                </div>
              </div>

              {/* Leche Entera */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Leche Entera</span>
                  <span className="text-emerald-400 font-semibold">85%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700" style={{ width: "85%" }} />
                </div>
                <span className="text-[9px] text-emerald-400/70">Stock suficiente</span>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 5 — Comunicación Salón & Cocina
          ════════════════════════════════════════════ */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-violet-500/40 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors duration-300">
              Comunicación Salón &amp; Cocina
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Enviá avisos instantáneos entre mozos, cajeros y personal de cocina sin depender de gritos o papelitos que se pierden en el despacho.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-violet-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Chat Interno</span>
                <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En línea
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Bubble: Mozo */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[8px] text-amber-400 font-bold">M2</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-700/50 rounded-xl rounded-tl-sm px-3 py-2 text-xs">
                      <span className="font-semibold text-amber-400">Mozo 2:</span>
                      <span className="text-slate-300"> Platos de Mesa 5 demorados</span>
                    </div>
                    <span className="text-[8px] text-slate-600 mt-0.5 block">10:32 hs</span>
                  </div>
                </div>

                {/* Bubble: Cocina */}
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[8px] text-violet-400 font-bold">CK</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-violet-500/20 border border-violet-500/20 rounded-xl rounded-tr-sm px-3 py-2 text-xs">
                      <span className="font-semibold text-violet-400">Cocina:</span>
                      <span className="text-slate-300"> En marcha, salen en 2 min</span>
                    </div>
                    <span className="text-[8px] text-slate-600 mt-0.5 block text-right">10:33 hs</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-700/30">
                <div className="flex-1 h-7 rounded-lg bg-slate-700/50 flex items-center px-2.5">
                  <span className="text-[9px] text-slate-500">Escribí un mensaje...</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-violet-500/30 flex items-center justify-center group-hover:bg-violet-500/50 transition-colors">
                  <svg className="w-3 h-3 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 6 — Creador de Landing Page No-Code
          ════════════════════════════════════════════ */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-blue-500/40 hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              Tu Sitio Web en Minutos
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Diseñá y actualizá la landing page de tu restaurante desde tu panel administrativo. Editá fotos, banners de promociones y horarios de atención sin saber programar.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-blue-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Editor Visual</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-blue-500/30 border border-blue-500/50" />
                  <div className="w-4 h-4 rounded bg-amber-500/30 border border-amber-500/50" />
                  <div className="w-4 h-4 rounded bg-slate-600 border border-slate-500/50" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs bg-slate-700/30 rounded-lg px-3 py-2 border border-dashed border-blue-500/30 group-hover:border-blue-500/50 transition-colors">
                  <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="text-blue-400 font-medium">Agregar Banner Promocional</span>
                </div>

                <div className="flex items-center gap-2 text-xs bg-slate-700/30 rounded-lg px-3 py-2">
                  <div className="w-6 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[6px] text-amber-400 font-bold">IMG</div>
                  <span className="text-slate-300">Hero Principal</span>
                </div>

                <div className="flex items-center gap-2 text-xs bg-slate-700/30 rounded-lg px-3 py-2">
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <span className="text-slate-400">Horarios de Atención</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-700/30">
                <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Vista previa
                </span>
                <div className="ml-auto">
                  <button className="text-[9px] font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 active:scale-95">
                    Publicar Cambios
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 7 — Tareas de Apertura y Cierre
          ════════════════════════════════════════════ */}
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-orange-500/40 hover:shadow-[0_0_40px_-8px_rgba(249,115,22,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
              Tareas de Apertura y Cierre
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Asigná listas de tareas diarias a tus empleados (limpieza, conteo de caja, encendido de maquinarias) y verificá su cumplimiento desde tu celular.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-orange-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Checklist Diario</span>
                <span className="text-[8px] text-slate-500 font-medium">Apertura</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-xs group/check transition-colors">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center shrink-0 group-hover/check:scale-110 transition-transform">
                    <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-slate-300 group-hover/check:text-emerald-300 transition-colors">Conteo de Caja Inicial</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs group/check transition-colors">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center shrink-0 group-hover/check:scale-110 transition-transform">
                    <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-slate-300 group-hover/check:text-emerald-300 transition-colors">Sanitizar Mesas</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs group/check transition-colors">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-600 flex items-center justify-center shrink-0 group-hover/check:border-orange-400/50 transition-colors" />
                  <span className="text-slate-400 group-hover/check:text-slate-300 transition-colors">Apagar Cierre de Cocina</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/30 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[9px] text-slate-500">Progreso</span>
                  <span className="text-[9px] text-orange-400 font-medium">2/3 completadas</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700" style={{ width: "66%" }} />
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 8 — Pantalla de Comandas (KDS)
          ════════════════════════════════════════════ */}
          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-teal-500/40 hover:shadow-[0_0_40px_-8px_rgba(20,184,166,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
              Pantalla de Comandas (KDS)
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Digitalizá las comandas en una pantalla dentro de la cocina. Organizá los pedidos por tiempo de llegada y marcá el estado de preparación en tiempo real.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-3.5 space-y-3 group-hover:border-teal-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Comandas Activas</span>
                <span className="flex items-center gap-1 text-[8px] text-teal-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  2 en curso
                </span>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-700/30 rounded-xl px-3.5 py-2.5 space-y-1.5 group-hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Mesa 12</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">En Cocina</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-semibold">3 min</span>
                  </div>
                  <div className="text-xs text-slate-400">2x Milanesa Napolitana, 1x Ensalada</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[9px] text-amber-400/70">Esperando</span>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl px-3.5 py-2.5 space-y-1.5 group-hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Mesa 3</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">Listo</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">12 min</span>
                  </div>
                  <div className="text-xs text-slate-400">1x Pizza Mozzarella, 2x Gaseosa</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-emerald-400/70">Listo para servir</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-700/30 flex items-center justify-between">
                <span className="text-[9px] text-slate-500">Actualizado hace 30s</span>
                <span className="text-[9px] text-teal-400 font-medium group-hover:text-teal-300 transition-colors">Ver todas &rarr;</span>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 rounded-full" />
          </motion.div>

          {/* ═══════════════════════════════════════════
              Card 9 — Métricas de Ventas & Reportes
          ════════════════════════════════════════════ */}
          <motion.div
            custom={8}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`${baseCard} hover:border-yellow-500/40 hover:shadow-[0_0_40px_-8px_rgba(234,179,8,0.15)]`}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
              Reportes y Métricas en Tiempo Real
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Visualizá cuáles son tus platos más vendidos, horas pico de consumo y facturación diaria estimada sin tener que cerrar la caja manualmente.
            </p>

            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-4 space-y-4 group-hover:border-yellow-500/20 group-hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Facturación Diaria</span>
                <span className="flex items-center gap-1.5 text-[8px] font-medium text-emerald-400">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                  +18% ventas
                </span>
              </div>

              {/* Mini bar chart */}
              <div className="flex items-end justify-between gap-3 h-24">
                <div className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 font-medium">Vie</span>
                  <div className="w-full bg-slate-700/50 rounded-md overflow-hidden flex flex-col justify-end" style={{ height: "60%" }}>
                    <div className="bg-gradient-to-t from-yellow-500 to-amber-400 rounded-md transition-all duration-700 group-hover:brightness-125" style={{ height: "75%" }} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 font-medium">Sáb</span>
                  <div className="w-full bg-slate-700/50 rounded-md overflow-hidden flex flex-col justify-end" style={{ height: "80%" }}>
                    <div className="bg-gradient-to-t from-yellow-500 to-amber-400 rounded-md transition-all duration-700 group-hover:brightness-125" style={{ height: "90%" }} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 font-medium">Dom</span>
                  <div className="w-full bg-slate-700/50 rounded-md overflow-hidden flex flex-col justify-end relative" style={{ height: "100%" }}>
                    <div className="bg-gradient-to-t from-yellow-500 to-amber-400 rounded-md transition-all duration-700 group-hover:brightness-125 group-hover:animate-pulse" style={{ height: "100%" }} />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Total today */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                <div>
                  <div className="text-[9px] text-slate-500">$ Total Hoy</div>
                  <div className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors">$128.400</div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                  +18%
                </div>
              </div>
            </div>

            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
