import { motion } from "framer-motion"
import { WHATSAPP_PLAIN_URL } from "../data/config"

const benefits = [
  "Menú Digital QR ilimitado",
  "Panel de Control (KDS + Stock + Ventas)",
  "Gestor de Reservas Online 24/7",
  "Take Away sin comisiones",
  "Actualización de precios en vivo",
  "Soporte en hora pico (Jueves a Dom hasta 02:00 hs)",
  "Backups automáticos en la nube",
  "Carga inicial de menú sin costo",
]

export default function PlanGastronomico() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
      <div className="mx-auto max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#131b2e] border border-amber-500/30 rounded-[24px] p-8 md:p-12 text-center shadow-[0_0_60px_-12px_rgba(251,191,36,0.12)] hover:shadow-[0_0_80px_-12px_rgba(251,191,36,0.2)] transition-shadow duration-500"
        >
          {/* Glow orbs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-amber-400 border-2 border-amber-500/40 bg-amber-500/10 shadow-[0_0_30px_-6px_rgba(251,191,36,0.3)]">
            PLAN GASTRONÓMICO INTEGRAL
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
              $150.000 <span className="text-xl sm:text-2xl font-semibold text-slate-400">ARS / mes</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Sin comisiones por venta · Sin permanencia</p>
          </div>

          {/* Divider */}
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 rounded-full" />

          {/* Checklist */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left mb-8 max-w-2xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-sm group">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-slate-300">{b}</span>
              </div>
            ))}
          </div>

          {/* Promo sub-box */}
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl px-5 py-3 mb-8 text-sm text-slate-200">
            <span className="text-base">🎁</span>
            <span><strong className="text-amber-400">Carga Inicial Gratis:</strong> Nos enviás tu carta y nosotros la subimos por vos en la puesta en marcha.</span>
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_PLAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-base font-bold tracking-wide text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Comenzar con mi Restaurante
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
