const guarantees = [
  {
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    title: "Seguridad y Roles",
    desc: "Control estricto de accesos para resguardar la información confidencial de tu empresa.",
  },
  {
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    title: "Cero Dependencia",
    desc: "Tu equipo aprende a usar el sistema en 30 minutos sin requerir un departamento de IT.",
  },
  {
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    title: "Escalabilidad",
    desc: "El sistema soporta el crecimiento de tu empresa sin cobros extra por usuario adicional.",
  },
  {
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    title: "Soporte Local",
    desc: "Asistencia directa por WhatsApp en horario laboral argentino para resolver cualquier duda.",
  },
]

export default function GarantiasGestionPymes() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_-4px_rgba(59,130,246,0.2)] mb-6">
            ✅ GARANTÍAS
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Operamos como nos gustaría que operen con nosotros
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guarantees.map((g, i) => (
            <div
              key={i}
              className="group rounded-xl border border-slate-800/60 bg-[#131b2e] p-6 sm:p-8 flex items-start gap-5 hover:border-blue-500/30 hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                {g.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">{g.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
