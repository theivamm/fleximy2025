import { motion } from "framer-motion"

const cards = [
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    title: "Gestor de Tareas tipo Kanban / Listas",
    desc: "Visualizá el estado de cada proyecto en tiempo real y asigná responsables con fechas límite.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold">En Desarrollo</span>
          <div className="flex -space-x-1.5">
            {["#f59e0b", "#3b82f6", "#a78bfa"].map((c, i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-[7px] font-bold text-white" style={{ background: c }}>{["M","L","C"][i]}</div>
            ))}
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    title: "Control de Tiempos y Horas (Time Tracking)",
    desc: "Medí cuánto tiempo invierte tu equipo en cada cliente o proyecto para calcular la rentabilidad real.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="text-cyan-400 font-mono text-lg font-bold">02:45:12</div>
            <div className="text-slate-500 text-[10px]">Tarea: Rediseño Web</div>
          </div>
          <div className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 cursor-pointer hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    title: "Portal de Clientes (Visor de Avances)",
    desc: "Compartí un acceso exclusivo a tus clientes para que vean el progreso de su proyecto sin tener que llamarte.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        <div className="text-xs text-slate-300">Tu proyecto está en un <span className="text-emerald-400 font-bold">80%</span> completado</div>
        <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
        </div>
        <div className="space-y-1">
          {["Brief aprobado", "Diseño UI entregado", "Maquetación en revisión"].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <div className={`w-2 h-2 rounded-full ${i < 2 ? "bg-emerald-500/50" : "bg-amber-500/50"}`} />
              {l}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>,
    title: "CRM de Ventas y Seguimiento de Leads",
    desc: "Organizá tus prospectos desde el primer contacto hasta el envío de presupuesto y cierre de contrato.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1.5">
        {[
          { label: "Contacto Inicial", color: "bg-slate-600/40" },
          { label: "Presupuesto Enviado ($450k)", color: "bg-blue-500/20 text-blue-400" },
          { label: "Ganado", color: "bg-emerald-500/20 text-emerald-400" },
        ].map((s, i) => (
          <div key={i} className={`text-[10px] px-2 py-1 rounded ${s.color} text-slate-300 flex items-center justify-between`}>
            <span>{s.label}</span>
            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    title: "Asignación de Roles y Permisos de Empleados",
    desc: "Configurá qué puede ver cada miembro del equipo (operativos, supervisores, administración).",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        {[
          { nombre: "Ana López", rol: "Diseñador", badge: "Acceso Limitado", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
          { nombre: "Martín Gil", rol: "Socio", badge: "Acceso Total", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
        ].map((u, i) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[7px] font-bold text-white">{u.nombre[0]}</div>
              <span className="text-slate-300">{u.nombre}</span>
              <span className="text-slate-600">({u.rol})</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded border text-[8px] font-medium ${u.color}`}>{u.badge}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    title: "Repositorio de Documentos y Entregables",
    desc: "Centralizá archivos, contratos, brief y carpetas importantes de cada cliente en un solo lugar seguro.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-1.5">
        {[
          { name: "Contrato_2026.pdf", type: "pdf", size: "2.3 MB" },
          { name: "Manual_Marca.zip", type: "zip", size: "8.1 MB" },
        ].map((f, i) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold ${f.type === "pdf" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"}`}>
                {f.type === "pdf" ? "PDF" : "ZIP"}
              </div>
              <span className="text-slate-300">{f.name}</span>
              <span className="text-slate-600">{f.size}</span>
            </div>
            <svg className="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
    title: "Notificaciones e Hitos de Proyecto",
    desc: "Recibí alertas automáticas cuando una tarea vence, se completa o requiere tu aprobación.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3">
        <div className="flex items-center gap-2 text-[10px] text-slate-300">
          <span className="text-base">🔔</span>
          <span>Laura completó la tarea: <span className="text-cyan-400 font-medium">Aprobación de Presupuesto</span></span>
          <span className="ml-auto text-slate-600">hace 2m</span>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    title: "Muro de Avisos y Chat de Equipo Interno",
    desc: "Centralizá la comunicación interna por proyectos evitando que las indicaciones se pierdan en chats personales.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3">
        <div className="flex gap-2 text-[10px]">
          <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center text-[8px] font-bold text-purple-400 shrink-0">P</div>
          <div>
            <span className="text-purple-400 font-medium">Pedro Ramos</span>
            <p className="text-slate-300 leading-relaxed mt-0.5">Materia prima recibida en depósito. Avanzamos hoy.</p>
            <span className="text-slate-600">hace 15m</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
    title: "Métricas de Productividad y Rentabilidad",
    desc: "Dashboards automáticos con horas trabajadas por empleado, proyectos entregados a tiempo y margen neto.",
    mockup: (
      <div className="mt-3 rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400">Rendimiento Mensual</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">+15% Eficiencia</span>
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 65, 50, 80, 70, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/60 to-cyan-500/40" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-slate-600">
          {["Ene","Feb","Mar","Abr","May","Jun"].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    ),
  },
]

export default function PilaresGestionPymes() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-[#0b0f19]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_-4px_rgba(59,130,246,0.2)] mb-6">
            MÓDULO OPERATIVO
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Los 9 pilares que necesita tu PyME
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Un sistema todo-en-uno reemplaza a 9 herramientas distintas. Todo integrado en un solo lugar.
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
              className="group relative rounded-xl border border-slate-800/60 bg-[#131b2e] p-6 sm:p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
