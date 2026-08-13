import { WHATSAPP_PLAIN_URL } from "../data/config"

const features = [
  "Calendario online con disponibilidad en tiempo real",  "Recordatorios automáticos por WhatsApp a tus clientes",
  "Fichas de cliente con historial completo de visitas",
  "Múltiples profesionales y sucursales",
  "Pagos online con seña o pago completo",
  "Notificaciones por email y SMS",
  "Reportes de ingresos, ocupación y rendimiento",
  "Soporte directo por WhatsApp en horario laboral",
]

export default function PlanTurnos() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] mb-6">
            💎 PLAN TURNOS
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Una tarifa plana. Sin límite de turnos.
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-b from-[#131b2e] to-[#0f1729] p-8 sm:p-10 shadow-2xl hover:shadow-[0_0_40px_-12px_rgba(6,182,212,0.15)] transition-shadow duration-500">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                🚀 Todo incluido
              </div>
              <div className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                $150.000 <span className="text-lg sm:text-xl font-normal text-slate-400">ARS / mes</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">Abono fijo en pesos. Sin sorpresas.</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* Bonus */}
            <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20 p-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-xl">🎁</span>
                <div>
                  <div className="text-sm font-semibold text-cyan-400 mb-1">Migración sin dolor</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cargamos tus servicios, profesionales y primeros clientes. Empezás a operar el día uno.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_PLAIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Activar Gestión de Turnos
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
