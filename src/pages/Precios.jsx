import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import InteractiveBackground from "../components/InteractiveBackground"
import SectionWrapper from "../components/SectionWrapper"

const BENEFITS = [
  "Sitio Web Profesional & Adaptado a Celulares (Gastronomía, Turnos o PyMEs).",
  "Panel Administrativo / Dashboard Personalizado para tu Rubro.",
  "Hosting Cloud de Alta Velocidad + Certificado SSL de Seguridad.",
  "Actualizaciones Ilimitadas de Precios, Menúes, Productos o Servicios.",
  "Integración con WhatsApp Business y Mercado Pago.",
  "Soporte Técnico Directo y Mantenimiento Continuo.",
]

const SAVINGS_ROWS = [
  { service: "Mantenimiento y Desarrollo Web", cost: "~$120.000 ARS / mes" },
  { service: "Hosting Cloud + Servidores + SSL", cost: "~$25.000 ARS / mes" },
  { service: "Gestor de Turnos / Menú QR / CRM", cost: "~$45.000 ARS / mes" },
  { service: "Gestor de Proyectos / Tareas (SaaS)", cost: "~$30.000 ARS / mes" },
]

const FAQS = [
  {
    q: "¿El precio de $150.000 ARS/mes está en pesos argentinos?",
    a: "Sí, 100% en ARS, sin impuestos PAIS/tarjeta ni variaciones en dólares. El precio es fijo en moneda local para que puedas presupuestar sin sobresaltos.",
  },
  {
    q: "¿Hay un costo inicial de configuración (Setup)?",
    a: "La puesta en marcha estándar está incluida en la activación inicial junto a la carga de tus primeros datos. No hay costos de setup ocultos ni cargos de instalación.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos transferencia bancaria, CBU/CVU, débito automático y Mercado Pago. Te emitimos factura electrónica todos los meses.",
  },
]

export default function Precios() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      {/* ═══════════════════════════════════════════
          MODULE 1 — HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
        <InteractiveBackground />
        <div className="mx-auto max-w-6xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_-4px_rgba(34,197,94,0.15)]">
              <span>💳</span>
              INVERSIÓN TRANSPARENTE EN PESOS
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-white">
                Un solo plan con todo lo que tu negocio{" "}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                necesita para operar
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Sin costos ocultos, sin comisiones por venta ni sorpresas en dólares. Centralizá tu sitio web y tu sistema de gestión en un abono fijo y predecible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODULE 2 — PLAN CARD
      ════════════════════════════════════════════ */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#131b2e] p-8 sm:p-12 md:p-14 text-center"
          style={{ boxShadow: "0 0 40px -8px rgba(34,197,94,0.15), 0 0 80px -16px rgba(6,182,212,0.08)" }}
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 mb-6">
              TODO INCLUIDO • ALL-IN-ONE
            </div>

            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">$150.000</span>
              <span className="text-lg sm:text-xl text-emerald-400 font-semibold">ARS</span>
            </div>
            <div className="text-sm text-slate-500 mt-1">/ mes</div>

            <p className="mt-6 text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              Incluye puesta en marcha, hosting cloud, sistema administrativo a medida y soporte técnico directo.
            </p>

            <div className="mt-10 space-y-3 text-left max-w-lg mx-auto">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-300">{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="https://wa.me/541111111111"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-base font-bold tracking-wide text-white bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 active:scale-[0.98]"
              >
                💬 Empezar Ahora por WhatsApp
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Sin contratos de atadura. Cancelás cuando quieras.
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 3 — SAVINGS TABLE
      ════════════════════════════════════════════ */}
      <SectionWrapper className="!pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
              ¿Cuánto te ahorrás por mes?
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Compará el costo de herramientas separadas vs. nuestro plan todo incluido.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#1e293b] bg-[#131b2e]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-0 text-sm">
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 bg-slate-800/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Servicio / Herramienta por Separado
              </div>
              <div className="px-4 sm:px-6 py-4 bg-slate-800/40 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                Costo Estimado
              </div>
              <div className="px-4 sm:px-6 py-4 bg-slate-800/40 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                Con Nosotros
              </div>

              {/* Rows */}
              {SAVINGS_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={`contents ${
                    i < SAVINGS_ROWS.length - 1 ? "border-b border-[#1e293b]" : ""
                  }`}
                >
                  <div className="px-4 sm:px-6 py-4 text-sm text-slate-300">{row.service}</div>
                  <div className="px-4 sm:px-6 py-4 text-sm text-slate-400 text-right whitespace-nowrap">{row.cost}</div>
                  <div className="px-4 sm:px-6 py-4 text-sm font-bold text-emerald-400 text-right">INCLUIDO</div>
                </div>
              ))}

              {/* Total */}
              <div className="col-span-3 border-t border-[#1e293b] bg-slate-800/30">
                <div className="grid grid-cols-[1fr_auto_auto]">
                  <div className="px-4 sm:px-6 py-4 text-sm font-bold text-white">COSTO TOTAL SEPARADO:</div>
                  <div className="px-4 sm:px-6 py-4 text-sm font-bold text-rose-400 text-right whitespace-nowrap">~$220.000 ARS / mes</div>
                  <div className="px-4 sm:px-6 py-4 text-sm font-bold text-emerald-400 text-right">$150.000 ARS / mes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/30 text-center"
            style={{ boxShadow: "0 0 30px -8px rgba(34,197,94,0.12)" }}
          >
            <span className="text-sm sm:text-base font-semibold text-emerald-400">
              Te ahorrás más de <strong className="text-white">$70.000 ARS/mes</strong> y tenés un solo proveedor para todo.
            </span>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 4 — FAQ ACCORDION
      ════════════════════════════════════════════ */}
      <SectionWrapper className="!pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center tracking-tight mb-10">
            Preguntas Frecuentes Financieras
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#1e293b] bg-[#131b2e] overflow-hidden transition-colors hover:border-emerald-500/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium text-slate-200 hover:text-white transition-colors text-left cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-[#1e293b] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 5 — CTA BANNER
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
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
                ¿Tenés dudas sobre cómo se adapta la plataforma a tu negocio?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
                Hablemos 10 minutos por WhatsApp y te mostramos cómo funciona.
              </p>
              <div className="mt-8">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-base font-bold tracking-wide text-white bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 active:scale-[0.98]"
                >
                  💬 Hablar con un Asesor Financiero/Comercial
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
