import { motion } from "framer-motion"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const gradients = {
  gastronomy: "from-amber-500 to-orange-600",
  services: "from-cyan-500 to-blue-600",
  pymes: "from-violet-500 to-purple-600",
  retail: "from-emerald-500 to-teal-600",
  realty: "from-rose-500 to-pink-600",
  education: "from-indigo-500 to-blue-600",
  workshop: "from-slate-600 to-slate-800",
}

const lightBgs = {
  gastronomy: "bg-amber-50 dark:bg-amber-950/20",
  services: "bg-cyan-50 dark:bg-cyan-950/20",
  pymes: "bg-violet-50 dark:bg-violet-950/20",
  retail: "bg-emerald-50 dark:bg-emerald-950/20",
  realty: "bg-rose-50 dark:bg-rose-950/20",
  education: "bg-indigo-50 dark:bg-indigo-950/20",
  workshop: "bg-slate-100 dark:bg-slate-800/30",
}

function SimGastronomy() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Mesa 4 · Reservado</span>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-medium tracking-wide">QR Activo</div>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 border-b border-dashed border-slate-200 dark:border-slate-700 pb-2">
        <span>19:30hs</span>
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span>2 comensales</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "Milanesa Napolitana", price: "$8.500", badge: "🔥 Popular", qty: 2 },
          { name: "Pizza Mozzarella", price: "$6.200", badge: null, qty: 1 },
          { name: "Ensalada Caesar", price: "$5.800", badge: "Nuevo", qty: 1 },
          { name: "Flan con Crema", price: "$3.200", badge: null, qty: 2 },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 w-5">{item.qty}x</span>
              <span className="text-slate-700 dark:text-slate-200">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{item.price}</span>
              {item.badge && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium">{item.badge}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium">Agregar ítem</div>
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">Cerrar Mesa</div>
      </div>
    </div>
  )
}

function SimAgenda() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"]
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Semana del 15 Jul</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-slate-400">6 turnos</span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <div key={i} className="text-center">
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mb-1 font-medium">{d}</div>
            <div className={`text-sm font-semibold rounded-lg py-2 ${i === 2 ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/30" : "text-slate-500 dark:text-slate-400"}`}>
              {15 + i}
            </div>
            {i === 1 && <div className="mt-0.5 flex justify-center gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /></div>}
            {i === 2 && <div className="mt-0.5 text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">10:30</div>}
            {i === 3 && <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 mx-auto" />}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { time: "10:30", client: "María L.", service: "Corte + Peinado", status: "bg-emerald-400" },
          { time: "11:00", client: "Carlos G.", service: "Consulta general", status: "bg-cyan-400" },
          { time: "15:30", client: "Ana P.", service: "Manicuría", status: "bg-emerald-400" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-700/30 rounded-lg px-3 py-2">
            <div className={`w-1.5 h-1.5 rounded-full ${t.status} animate-pulse`} />
            <span className="font-semibold text-slate-600 dark:text-slate-300 w-12">{t.time}</span>
            <span className="text-slate-700 dark:text-slate-200 flex-1 truncate">{t.client}</span>
            <span className="text-slate-400 dark:text-slate-500 hidden md:inline">{t.service}</span>
            <div className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-medium">Confirmado</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimKanban() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Proyecto: Rediseño Web</span>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {["bg-indigo-400", "bg-cyan-400", "bg-amber-400"].map((c, i) => (
              <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white dark:border-slate-700`} />
            ))}
          </div>
          <span className="text-xs text-slate-400">+2</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Por hacer", color: "bg-slate-100 dark:bg-slate-700/50", tasks: ["Landing Page", "SEO", "Wireframes"], active: null },
          { label: "En curso", color: "bg-indigo-100 dark:bg-indigo-900/30", tasks: ["Dashboard", "API"], active: 0 },
          { label: "Hecho", color: "bg-emerald-100 dark:bg-emerald-900/30", tasks: ["Research"], active: null },
        ].map((col, ci) => (
          <div key={ci} className={`${col.color} rounded-lg p-2.5 space-y-2`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{col.label}</span>
              <span className="text-[11px] text-slate-400">{col.tasks.length}</span>
            </div>
            {col.tasks.map((task, ti) => (
              <div key={ti} className={`bg-white dark:bg-slate-700 rounded-md px-3 py-2 text-xs text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200/50 dark:border-white/5 ${col.active === ti ? "ring-1 ring-indigo-500/40" : ""}`}>
                <div className="flex items-center justify-between">
                  <span>{task}</span>
                  {col.active === ti && <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function SimRetail() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-sm">P</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">Pantalón Cargo Premium</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium">Nuevo</span>
          </div>
          <div className="text-xs text-slate-400">SKU: #P-3847 · Categoría: Indumentaria</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Precio</div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">$18.900</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 mb-0.5">Stock</div>
          <div className="flex items-center justify-end gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">12 uni.</span>
          </div>
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 text-xs text-center py-2.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 hover:bg-emerald-500/25 transition-colors cursor-pointer">Editar Producto</div>
        <div className="flex-1 text-xs text-center py-2.5 rounded-lg bg-emerald-600 text-white font-medium flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </div>
      </div>
    </div>
  )
}

function SimRealty() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Buscador de Propiedades</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Tipo</div>
        <div className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Ubicación</div>
        <div className="flex-1 text-xs px-3 py-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium">Precio</div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 h-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-300 dark:text-slate-600">🏠</div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Vista previa del inmueble</div>
        </div>
        <div className="absolute top-2 right-2 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/30">Disponible</div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Departamento 2 Amb.</span>
          <span className="text-sm font-bold text-slate-800 dark:text-white">$185.000</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>70 m²</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>2 dorm.</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>1 baño</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 font-medium border border-rose-500/20 cursor-pointer">Agendar Visita</div>
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-500/20 cursor-pointer">Ver Ficha</div>
      </div>
    </div>
  )
}

function SimEducation() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">M</div>
          <div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">María García</div>
            <div className="text-[11px] text-slate-400">Curso: Marketing Digital</div>
          </div>
        </div>
        <div className="text-[11px] px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">Activo</div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Progreso del curso</span>
          <span className="font-medium text-slate-600 dark:text-slate-300">68%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-[shimmer_2s_ease-in-out_infinite]" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">Clase 12: SEO Avanzado</div>
          <div className="text-[11px] text-slate-400">45 min restantes</div>
        </div>
        <div className="text-[11px] px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">Reproducir</div>
      </div>
      <div className="space-y-1.5">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Tareas pendientes</div>
        {[{ name: "Ejercicio de keywords", done: false }, { name: "Análisis de competencia", done: false }, { name: "Trabajo práctico final", done: true }].map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${t.done ? "bg-emerald-400 border-emerald-400" : "border-slate-300 dark:border-slate-600"}`}>
              {t.done && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span className={t.done ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-300"}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimWorkshop() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">OT #2847</div>
            <div className="text-[11px] text-slate-400">Ingreso: 12/07/2026</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          En Reparación
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Datos del vehículo</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span className="text-slate-400">Vehículo:</span>
          <span className="text-slate-700 dark:text-slate-200 font-medium">VW Gol Trend 1.6</span>
          <span className="text-slate-400">Patente:</span>
          <span className="text-slate-700 dark:text-slate-200 font-medium">AB 123 CD</span>
          <span className="text-slate-400">Cliente:</span>
          <span className="text-slate-700 dark:text-slate-200 font-medium">López, Juan</span>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Repuestos</span>
          <span className="text-slate-400">Presupuesto: $124.500</span>
        </div>
        {[{ name: "Filtro de aceite", ok: true }, { name: "Pastillas de freno", ok: true }, { name: "Correa de distribución", ok: false }, { name: "Aceite 20w50", ok: true }].map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className={`w-3 h-3 rounded-sm flex items-center justify-center ${p.ok ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-600"}`}>
              {p.ok && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span className={p.ok ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>{p.name}</span>
            {!p.ok && <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Pendiente</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-slate-500/15 text-slate-600 dark:text-slate-400 font-medium cursor-pointer">Actualizar Estado</div>
        <div className="flex-1 text-xs text-center py-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">Notificar Cliente</div>
      </div>
    </div>
  )
}

const allKeys = ["gastronomy", "services", "pymes", "retail", "realty", "education", "workshop"]
const simMap = {
  gastronomy: SimGastronomy,
  services: SimAgenda,
  pymes: SimKanban,
  retail: SimRetail,
  realty: SimRealty,
  education: SimEducation,
  workshop: SimWorkshop,
}

function Card({ keyId, lang }) {
  const t = translations.home
  const data = t.industries[keyId]
  const SimComponent = simMap[keyId]
  const grad = gradients[keyId]
  const lbg = lightBgs[keyId]

  return (
    <div className="group w-[520px] flex-shrink-0 glass overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 flex flex-col">
      <div className={`bg-gradient-to-r ${grad} px-6 py-3`}>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-white tracking-wide">{data.label[lang]}</span>
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
        </div>
      </div>
      <div className={`${lbg} px-5 py-5 border-b border-white/10 dark:border-white/5`}>
        <SimComponent />
      </div>
      <div className="p-6 flex-1 flex flex-col bg-white dark:bg-slate-900/40">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1 leading-snug">{data.title[lang]}</h3>
        <ul className="space-y-2 mt-3 flex-1">
          {data.features[lang].map((feat, fi) => (
            <li key={fi} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {feat}
            </li>
          ))}
        </ul>
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all cursor-pointer group/link">
            {data.cta[lang]}
            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function IndustryCards() {
  const { lang } = useLang()
  const t = translations.home

  const cardKeys = [...allKeys, ...allKeys]

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl mb-12">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            {t.industryBadge[lang]}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl">
            {t.industryTitle[lang]}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {t.industrySub[lang]}
          </p>
        </div>
      </div>

      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div
          className="flex gap-6 py-4 animate-[marquee-scroll_80s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {cardKeys.map((keyId, i) => (
            <Card key={`${keyId}-${i}`} keyId={keyId} lang={lang} />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fafc] dark:from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8fafc] dark:from-slate-950 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
