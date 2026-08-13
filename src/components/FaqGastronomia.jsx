import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WHATSAPP_PLAIN_URL } from "../data/config"

const faqs = [
  {
    q: "¿Cómo hago para cargar mi menú inicial? ¿Tengo que hacerlo yo?",
    a: "No necesitás hacer nada. Nos enviás tu carta en PDF, fotos o Word y nuestro equipo la carga completa en la plataforma durante la puesta en marcha. Incluye precios, fotos de platos y categorías. Si después querés modificarla, podés hacerlo desde el panel en 2 clics.",
  },
  {
    q: "¿Puedo tener precios diferenciados para salón y take away?",
    a: "Sí. El sistema permite configurar listas de precios independientes para salón, take away y delivery. Podés asignar un porcentaje de recargo automático o precios fijos distintos por canal sin duplicar productos.",
  },
  {
    q: "¿Necesito comprar una impresora especial o una tablet para la cocina?",
    a: "No es necesario. El KDS (pantalla de comandas) funciona en cualquier dispositivo con un navegador web: tablets, monitores o incluso un televisor smart. Si ya tenés una impresora térmica Epson o Star, la integramos sin cargo. Caso contrario, todo el flujo es 100% digital.",
  },
]

export default function FaqGastronomia() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <>
      {/* ═══════════════════════════════════════════
          FAQ GASTRONÓMICO
      ════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
        <div className="mx-auto max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.25)]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              PREGUNTAS FRECUENTES
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-3xl mx-auto">
              Todo lo que necesitás saber antes de arrancar
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-[#131b2e] border-cyan-500/30 shadow-[0_0_30px_-12px_rgba(6,182,212,0.2)]"
                      : "bg-[#131b2e]/50 border-[#1e293b] hover:border-slate-600/50"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer"
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                        : "bg-slate-800/50 text-slate-500"
                    }`}>
                      0{i + 1}
                    </div>
                    <span className={`text-sm md:text-base font-medium leading-snug flex-1 pr-2 transition-colors ${
                      isOpen ? "text-white" : "text-slate-200"
                    }`}>
                      {faq.q}
                    </span>
                    <svg className={`shrink-0 w-5 h-5 transition-all duration-300 ${
                      isOpen ? "text-cyan-400 rotate-45" : "text-slate-600"
                    }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[3.25rem] md:pl-[4.25rem] text-sm text-slate-400 leading-relaxed border-t border-slate-700/30 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL — CONVERSIÓN
      ════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl bg-[#131b2e] border border-amber-500/20 rounded-[24px] p-8 md:p-14 text-center shadow-xl"
        >
          {/* Corner decorations */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-lg" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-lg" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight mb-4">
            ¿Querés ver cómo queda la carta y el panel de tu local?
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
            Te preparamos una demo personalizada con el logo de tu negocio en 15 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_PLAIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-[#25D366] hover:brightness-110 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pedir Demo Personalizada por WhatsApp
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="#"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-amber-400 bg-slate-800/60 border border-amber-500/30 hover:bg-slate-800/80 hover:border-amber-400/50 transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agendar Videollamada
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
