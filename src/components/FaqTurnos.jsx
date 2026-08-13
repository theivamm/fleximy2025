import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WHATSAPP_PLAIN_URL } from "../data/config"

const faqs = [
  {
    q: "¿Puedo tener varios profesionales o empleados usando el sistema a la vez?",
    a: "Sí, el plan incluye todos los profesionales y empleados que necesites sin costo adicional. Cada uno puede tener su propia agenda y horarios configurados.",
  },
  {
    q: "¿Los clientes necesitan registrarse o crear una cuenta para reservar?",
    a: "No, los clientes reservan directamente desde tu web o WhatsApp sin registro. Solo ingresan su nombre, contacto y eligen horario. Así reducimos la fricción al mínimo.",
  },
  {
    q: "¿Qué pasa si un cliente no se presenta o cancela a último momento?",
    a: "El sistema envía recordatorios automáticos 24h antes del turno para reducir ausencias. Si cancelan, podés configurar penalizaciones con seña online no reembolsable.",
  },
]

const AccordionItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-slate-800/60 last:border-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-5 text-left text-sm sm:text-base font-medium text-slate-200 hover:text-white transition-colors"
    >
      <span className="pr-4">{faq.q}</span>
      <div className={`shrink-0 w-5 h-5 flex items-center justify-center rounded border border-slate-700 transition-all duration-300 ${isOpen ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10" : "text-slate-500"}`}>
        <motion.svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default function FaqTurnos() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <>
      {/* FAQ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] mb-6">
              ❓ FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Preguntas frecuentes sobre turnos online
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800/60 bg-[#131b2e] px-6 sm:px-8">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 bg-[#0b0f19]">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#131b2e] via-[#162240] to-[#131b2e] p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-2xl" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                ¿Querés ver cómo funciona el calendario de turnos en tu negocio?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
                Te configuramos una demo en vivo con tus servicios, horarios y profesionales en 15 minutos.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={WHATSAPP_PLAIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  💬 Pedir Demo Turnos por WhatsApp
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-cyan-400 bg-slate-800/60 border border-cyan-500/30 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Agendar Videollamada
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
