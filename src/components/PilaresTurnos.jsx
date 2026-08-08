import { motion } from "framer-motion"

const cards = [
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    title: "Calendario Interactivo Online",
    desc: "Tus clientes ven la disponibilidad en tiempo real y eligen el día y horario que mejor les queda.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1.5">
        <div className="grid grid-cols-7 gap-0.5 text-[8px] text-center text-slate-600 font-medium">
          {["L","M","M","J","V","S","D"].map(d => <span key={d}>{d}</span>)}
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} className={`py-1 rounded ${i === 7 ? "bg-cyan-500/30 text-cyan-400" : "text-slate-500"}`}>{i + 8}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    title: "Ficha de Cliente con Historial",
    desc: "Cada cliente guarda su historial de visitas, servicios contratados y preferencias en un solo perfil.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">L</div>
          <div>
            <div className="text-slate-300 font-medium">Laura Méndez</div>
            <div className="text-slate-600">12 visitas · 3 servicios</div>
          </div>
        </div>
        <div className="space-y-1 text-slate-500">
          <div className="flex justify-between"><span>Última visita</span><span className="text-slate-400">Hace 7 días</span></div>
          <div className="flex justify-between"><span>Servicio favorito</span><span className="text-cyan-400">Depilación Láser</span></div>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
    title: "Recordatorios Automáticos WhatsApp",
    desc: "El sistema envía recordatorios automáticos 24h antes del turno. Reducí las ausencias un 80%.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3">
        <div className="flex items-start gap-2 text-[10px]">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px]">💬</div>
          <div>
            <div className="text-emerald-400 text-[9px] font-medium">WhatsApp enviado</div>
            <p className="text-slate-400 mt-0.5">Recordatorio: Tenés turno mañana a las 10:30 con Estética Liss.</p>
            <div className="text-slate-600 mt-1">✓ Entregado · hace 2m</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    title: "Pagos Online con Reserva",
    desc: "El cliente abona una seña o el total al reservar. Recibís el pago antes de que llegue al local.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Servicio: Depilación Láser</span>
          <span className="text-cyan-400 font-semibold">$8.500</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          <span className="text-emerald-400">Seña confirmada ($2.500)</span>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    title: "Gestión de Horarios y Profesionales",
    desc: "Asigná turnos según disponibilidad real de cada profesional. Evitá superposición de horarios.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        {[
          { name: "Dra. Paz", horario: "09:00 - 14:00", color: "from-cyan-500 to-blue-600" },
          { name: "Dr. López", horario: "14:00 - 20:00", color: "from-purple-500 to-pink-500" },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-[7px] font-bold text-white`}>{p.name[0]}</div>
              <span className="text-slate-300">{p.name}</span>
            </div>
            <span className="text-slate-500">{p.horario}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    title: "Reportes y Estadísticas",
    desc: "Medí turnos cancelados, ingresos por servicio, horas pico y rendimiento del equipo.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Turnos esta semana</span>
          <span className="text-cyan-400 font-bold">47</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          {[70, 90, 50, 80, 60, 30, 20].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/60 to-blue-500/40" style={{ height: `${h}%` }}>
              <div className="text-[6px] text-center text-slate-500 mt-auto">{(i + 1) % 7 === 0 ? "Do" : "LM"[(i) % 2]}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></svg>,
    title: "Notificaciones por Email y SMS",
    desc: "Confirmaciones, cambios de horario y cancelaciones se comunican al instante sin que hagas nada.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1">
        {[
          { tipo: "Confirmación", icon: "✅", color: "text-emerald-400" },
          { tipo: "Recordatorio", icon: "🔔", color: "text-amber-400" },
        ].map((n, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>{n.icon}</span>
            <span>Turno <span className={n.color}>{n.tipo}</span> — Estética Liss</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    title: "Multi-sucursal y Equipos",
    desc: "Administrá turnos de varias sucursales o locales desde un mismo panel centralizado.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1.5">
        {[
          { suc: "Sucursal Centro", turnos: 12, color: "text-cyan-400" },
          { suc: "Sucursal Norte", turnos: 8, color: "text-purple-400" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <span className="text-slate-300">{s.suc}</span>
            <span className={s.color}>{s.turnos} turnos hoy</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    title: "Personalización de Servicios y Duración",
    desc: "Configurá cada servicio con su duración, precio y recursos necesarios. El sistema agenda automáticamente.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1.5 text-[10px]">
        {[
          { servicio: "Corte + Peinado", duracion: "45 min", precio: "$5.500" },
          { servicio: "Depilación Láser", duracion: "30 min", precio: "$8.500" },
          { servicio: "Masaje Descontracturante", duracion: "60 min", precio: "$12.000" },
        ].map((sv, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-slate-300">{sv.servicio}</span>
            <div className="flex gap-2 text-slate-500">
              <span>{sv.duracion}</span>
              <span className="text-cyan-400">{sv.precio}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

export default function PilaresTurnos() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.2)] mb-6">
            MÓDULO TURNOS
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Todo lo que necesitás para gestionar turnos
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Desde la reserva online hasta el historial del cliente. Un ecosistema completo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-xl border border-slate-800/60 bg-[#131b2e] p-6 sm:p-8 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">{card.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              {card.mockup}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
