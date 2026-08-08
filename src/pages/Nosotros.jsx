import { motion } from "framer-motion"
import { Shield, Zap, MessageCircle, Server, CheckCircle } from "lucide-react"
import InteractiveBackground from "../components/InteractiveBackground"
import SectionWrapper, { SectionHeader } from "../components/SectionWrapper"
import Button from "../components/Button"

const PILLARS = [
  {
    icon: MessageCircle,
    title: "Diseñado para la Realidad Local",
    desc: "Precios transparentes en pesos argentinos, actualizaciones inmediatas de precios ante la inflación e integración nativa con herramientas como WhatsApp y Mercado Pago.",
  },
  {
    icon: Zap,
    title: "Simplicidad ante todo (Zero Friction)",
    desc: "Si un panel de control requiere semanas de capacitación, está mal diseñado. Nuestras interfaces son tan intuitivas que vos y tu equipo aprenden a usarlas en 30 minutos.",
  },
  {
    icon: Shield,
    title: "Acompañamiento y Soporte Real",
    desc: "No somos una plataforma en el extranjero que responde tickets en inglés 5 días después. Tenés un canal directo por WhatsApp con nuestro equipo para lo que necesites.",
  },
  {
    icon: Server,
    title: "Infraestructura & Evolución Continua",
    desc: "Nos encargamos de los servidores, la seguridad, las copias de respaldo y el mantenimiento para que vos te enfoques exclusivamente en hacer crecer tu PyME.",
  },
]

const INFRA_BADGES = [
  { icon: "🟢", label: "Servidores Cloud con 99.9% Uptime" },
  { icon: "🔒", label: "Cifrado de Datos SSL & Backups Diarios" },
  { icon: "⚡", label: "Carga Ultra Rápida Optimizada para Móviles" },
]

export default function Nosotros() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          MODULE 1 — HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
        <InteractiveBackground />
        <div className="mx-auto max-w-6xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-500/40 bg-blue-500/10 shadow-[0_0_20px_-4px_rgba(37,99,235,0.15)]">
              <span>🚀</span>
              NUESTRO COMPROMISO CON LAS PYMES
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-white">
                Creamos sitios web que{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                operan tu negocio
              </span>
              <span className="text-white">
                , no solo que decoran internet.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Nacimos con una misión clara: eliminar la brecha entre los sitios web estáticos inservibles y los sistemas de gestión ultra complejos. Ofrecemos herramientas digitales simples que ordenan el día a día de las empresas argentinas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODULE 2 — MANIFIESTO
      ════════════════════════════════════════════ */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-blue-500/20 bg-[#131b2e] p-8 sm:p-12 md:p-14"
          style={{ boxShadow: "0 0 40px -12px rgba(37,99,235,0.10)" }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
              El problema del desarrollo web tradicional en Argentina
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-slate-400 leading-relaxed">
              <p className="pl-6 border-l-2 border-slate-700/50 italic text-slate-300">
                "Durante años, las PyMEs pagaron fortunas por sitios web que terminaron siendo folletos digitales abandonados."
              </p>

              <p className="pl-6 border-l-2 border-slate-700/50 italic text-slate-300">
                "Por otro lado, los sistemas de gestión tradicionales son difíciles de usar, caros y pensados para multinacionales, obligando a los dueños a manejar su negocio en decenas de planillas de Excel desordenadas."
              </p>

              <p className="pl-6 border-l-2 border-blue-500/50 italic text-white font-medium">
                "Nosotros unificamos ambos mundos: tu presencia pública online unida a tu centro de mando operativo interno en una sola plataforma fluida."
              </p>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 3 — 4 PILARES (2x2 Grid)
      ════════════════════════════════════════════ */}
      <SectionWrapper className="!pt-0">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Los 4 Pilares de Nuestra Plataforma
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            const iconColors = [
              "bg-blue-500/15 text-blue-400 border-blue-500/30",
              "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
              "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
              "bg-violet-500/15 text-violet-400 border-violet-500/30",
            ]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-[#1e293b] bg-[#131b2e] p-6 sm:p-8 hover:border-blue-500/20 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${iconColors[i]} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          MODULE 4 — INFRAESTRUCTURA TÉCNICA
      ════════════════════════════════════════════ */}
      <SectionWrapper className="!pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Infraestructura Técnica
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Todo el poder técnico para que no tengas que preocuparte por nada.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {INFRA_BADGES.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#1e293b] bg-[#131b2e] hover:border-cyan-500/20 hover:bg-[#1a2540] transition-all duration-300"
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium text-slate-300">{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Extra infra details */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Tiempo de actividad", value: "99.9% Uptime SLA" },
              { label: "Backups", value: "Automáticos diarios" },
              { label: "Seguridad", value: "SSL / Cifrado AES-256" },
            ].map((item, i) => (
              <div key={i} className="text-center px-4 py-3 rounded-lg bg-slate-800/30 border border-[#1e293b]">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-sm font-semibold text-cyan-400 mt-1">{item.value}</div>
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
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
                ¿Querés formar parte de las empresas que ya simplificaron su operación?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
                Conversemos sin compromiso sobre cómo podemos ayudarte a ordenar tu negocio.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/541111111111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  💬 Hablar con el Equipo por WhatsApp
                </a>
                <a
                  href="/demos"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-cyan-400 bg-slate-800/60 border border-cyan-500/30 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all duration-300 active:scale-[0.98]"
                >
                  🎮 Probar las Demos Interactivas
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
