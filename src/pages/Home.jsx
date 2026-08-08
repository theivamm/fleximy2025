import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import Button from "../components/Button"
import InteractiveBackground from "../components/InteractiveBackground"

import ProcessSteps from "../components/ProcessSteps"
import ComparisonTable from "../components/ComparisonTable"
import PlanAllInOne from "../components/PlanAllInOne"
import IndustryCards from "../components/IndustryCards"
import FAQ from "../components/FAQ"

export default function Home() {
  const { lang } = useLang()
  const t = translations.home

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [screenIdx, setScreenIdx] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setScreenIdx((i) => (i + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-40 md:pt-52 pb-24 md:pb-32"
      >
        <InteractiveBackground />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto max-w-6xl w-full relative z-10"
        >
          <div className="flex flex-col items-center text-center">
            {/* ── Centered Text + CTAs ── */}
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400"
              >
                <Sparkles size={14} />
                {t.heroBadge[lang]}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
              >
                {lang === "es" ? (
                  <>
                    <span className="text-slate-900 dark:text-white">
                      Transformamos tu sitio web en el{" "}
                    </span>
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      centro de control de tu negocio.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-900 dark:text-white">
                      Turn your website into the{" "}
                    </span>
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      control center of your business.
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-4 text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto"
              >
                {t.heroSub[lang]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 flex flex-wrap gap-4 justify-center"
              >
                <Button variant="primary" className="text-sm px-6 py-3">
                  {t.heroCTA[lang]}
                  <ArrowRight size={16} />
                </Button>
                <Button variant="secondary" className="text-sm px-6 py-3">
                  {t.heroCTA2[lang]}
                </Button>
              </motion.div>
            </div>

            {/* ── Dashboard Mockup (centered below text) ── */}
            <div className="max-w-5xl w-full mt-10 md:mt-14">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="glass rounded-2xl overflow-hidden animate-float">
                  {/* ── Title bar ── */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 dark:border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                  <div className="flex items-center gap-1.5">
                    {[
                      { label: "Analytics", c: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
                      { label: "CRM", c: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
                      { label: "AI Chat", c: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20" },
                      { label: "Inventory", c: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
                      { label: "Reports", c: "bg-rose-500/15 text-rose-400 border-rose-500/20" },
                    ].map((pill, i) => (
                      <div
                        key={i}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                          i === screenIdx
                            ? "bg-indigo-500/25 text-indigo-400 border-indigo-500/40"
                            : pill.c
                        }`}
                      >
                        {pill.label}
                      </div>
                    ))}
                  </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-500/20" />
                      <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/20" />
                    </div>
                  </div>

                  {/* ── Body ── */}
                  <div className="flex relative h-[520px] overflow-hidden">
                    {/* Animated mouse cursor */}
                    <div className="absolute w-[18px] h-[18px] pointer-events-none z-20 hidden md:block animate-mouse-path">
                      <div className="w-full h-full rounded-full bg-white/90 shadow-lg shadow-indigo-500/30 border border-indigo-300/60" />
                      <div className="absolute top-[3px] left-[3px] w-[5px] h-[5px] rounded-full bg-indigo-600" />
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute right-2 top-4 bottom-4 w-1 rounded-full bg-white/5 overflow-hidden z-10">
                      <div className="w-full h-14 rounded-full bg-white/20 animate-scroll-indicator" />
                    </div>

                    {/* Sidebar */}
                    <div className="w-14 border-r border-white/10 dark:border-white/5 py-4 flex flex-col items-center gap-3 flex-shrink-0">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            i === screenIdx
                              ? "bg-indigo-500/25 border border-indigo-500/20 shadow-sm shadow-indigo-500/10"
                              : "bg-white/5 dark:bg-white/[0.03] hover:bg-white/10"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-sm transition-colors duration-300 ${
                              i === screenIdx
                                ? "bg-indigo-400"
                                : "bg-white/20 dark:bg-white/10"
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Main content — cycles between screens */}
                    <div className="flex-1 p-5 pr-4">
                      <AnimatePresence mode="wait">
                        {/* ── Screen 0: Dashboard ── */}
                        {screenIdx === 0 && (
                          <motion.div
                            key="screen-dash"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Panel de Control</div>
                                <div className="text-xs text-slate-400">Cooperativa La Esperanza Ltda.</div>
                              </div>
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/20 shadow-md" />
                            </div>

                            {/* 6 KPIs */}
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { label: "Ingresos", value: "$89.2k", delta: "+12%", pct: 78, barColor: "from-indigo-500 to-indigo-600", dotColor: "bg-indigo-400" },
                                { label: "Socios", value: "2,847", delta: "+8%", pct: 62, barColor: "from-cyan-500 to-cyan-600", dotColor: "bg-cyan-400" },
                                { label: "Operaciones", value: "1,432", delta: "+24%", pct: 91, barColor: "from-emerald-500 to-emerald-600", dotColor: "bg-emerald-400" },
                                { label: "Crecimiento", value: "+32%", delta: "vs trim.", pct: 85, barColor: "from-violet-500 to-violet-600", dotColor: "bg-violet-400" },
                                { label: "Ahorro", value: "$12.4k", delta: "-18%", pct: 55, barColor: "from-amber-500 to-amber-600", dotColor: "bg-amber-400" },
                                { label: "Productividad", value: "94%", delta: "+5%", pct: 94, barColor: "from-rose-500 to-rose-600", dotColor: "bg-rose-400" },
                              ].map((kpi, i) => (
                                <div
                                  key={i}
                                  className="bg-white/5 dark:bg-white/[0.03] rounded-xl p-3.5 animate-[fade-slide-up_0.5s_ease-out_both] hover:bg-white/[0.07] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                                  style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-xs text-slate-400 dark:text-slate-500">{kpi.label}</div>
                                    <div className={`w-2 h-2 rounded-full ${kpi.dotColor} animate-[dot-pulse_2s_ease-in-out_infinite]`} />
                                  </div>
                                  <div className="flex items-baseline gap-1.5">
                                    <div className="text-lg font-bold text-slate-800 dark:text-white">{kpi.value}</div>
                                    <div className={`text-[11px] font-medium ${kpi.delta.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>{kpi.delta}</div>
                                  </div>
                                  <div className="mt-2.5 h-1.5 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full bg-gradient-to-r ${kpi.barColor} animate-[grow-width_1.2s_ease-out_both]`}
                                      style={{ width: `${kpi.pct}%`, animationDelay: `${0.3 + i * 0.08}s` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Two-column charts */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/5 dark:bg-white/[0.03] rounded-xl p-4">
                                <div className="text-xs text-slate-400 dark:text-slate-500 mb-3">Ingresos Mensuales</div>
                                <div className="flex items-end gap-2 h-24">
                                  {[45, 70, 50, 85, 60, 95, 75, 55, 90, 65, 80, 100].map((h, i) => (
                                    <div
                                      key={i}
                                      className="flex-1 rounded-t bg-gradient-to-t from-indigo-500 to-purple-400 dark:from-indigo-400 dark:to-purple-400 origin-bottom animate-[grow-bar_1s_ease-out_both] hover:opacity-80 transition-opacity"
                                      style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.04}s` }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="bg-white/5 dark:bg-white/[0.03] rounded-xl p-4">
                                <div className="text-xs text-slate-400 dark:text-slate-500 mb-3">Distribución por Área</div>
                                {[
                                  { area: "Ventas", pct: 35, color: "bg-indigo-500" },
                                  { area: "Operaciones", pct: 28, color: "bg-cyan-500" },
                                  { area: "Admin.", pct: 20, color: "bg-emerald-500" },
                                  { area: "Logística", pct: 17, color: "bg-amber-500" },
                                ].map((d, i) => (
                                  <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                                    <div className={`w-1.5 h-1.5 rounded-full ${d.color}`} />
                                    <div className="text-[11px] text-slate-400 flex-1">{d.area}</div>
                                    <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{d.pct}%</div>
                                    <div className="w-16 h-1 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                                      <div className={`h-full rounded-full ${d.color} animate-[grow-width_1s_ease-out_both]`} style={{ width: `${d.pct}%`, animationDelay: `${0.6 + i * 0.1}s` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Recent activity */}
                            <div className="bg-white/5 dark:bg-white/[0.03] rounded-xl p-4">
                              <div className="text-xs text-slate-400 dark:text-slate-500 mb-3">Actividad Reciente</div>
                              <div className="space-y-3">
                                {[
                                  { user: "María G.", action: "registró un nuevo socio", time: "hace 12 min" },
                                  { user: "Carlos P.", action: "actualizó el inventario", time: "hace 43 min" },
                                  { user: "Laura D.", action: "aprobó una operación", time: "hace 1 h" },
                                  { user: "Diego R.", action: "generó reporte mensual", time: "hace 2 h" },
                                ].map((act, i) => (
                                  <div key={i} className="flex items-center gap-3 animate-[fade-slide-up_0.4s_ease-out_both]" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                                        <span className="font-medium">{act.user}</span> {act.action}
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* ── Screen 1: Chat ── */}
                        {screenIdx === 1 && (
                          <motion.div
                            key="screen-chat"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2 pb-3 border-b border-white/10 dark:border-white/5">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-[dot-pulse_2s_ease-in-out_infinite]" />
                              <div className="text-xs text-slate-400 dark:text-slate-500">4 miembros en línea</div>
                            </div>
                            {[
                              { me: false, name: "Coop. La Esperanza", role: "Admin", w: "w-36", lines: 2 },
                              { me: true, w: "w-28", lines: 1 },
                              { me: false, name: "Cooperativa El Progreso", role: "Socio", w: "w-40", lines: 2 },
                              { me: true, w: "w-24", lines: 1 },
                              { me: false, name: "Coop. San Martín", role: "Socio", w: "w-20", lines: 1 },
                              { me: false, name: "Coop. Los Andes", role: "Socio", w: "w-32", lines: 2 },
                            ].map((msg, i) => (
                              <div
                                key={i}
                                className={`flex gap-2.5 items-end ${msg.me ? "justify-end" : ""} animate-[fade-slide-up_0.4s_ease-out_both]`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                              >
                                {!msg.me && (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0" />
                                )}
                                <div className={`rounded-xl px-3.5 py-2 ${msg.me ? "bg-indigo-500/30 rounded-br-sm" : "bg-white/10 dark:bg-white/5 rounded-bl-sm"}`}>
                                  {!msg.me && (
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <div className="text-xs font-medium text-cyan-400">{msg.name}</div>
                                      <div className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">{msg.role}</div>
                                    </div>
                                  )}
                                  {Array.from({ length: msg.lines }).map((_, j) => (
                                    <div key={j} className={`h-2 ${j === 0 ? msg.w : "w-16"} rounded bg-white/${msg.me ? "30" : "15"} ${j < msg.lines - 1 ? "mb-1.5" : ""}`} />
                                  ))}
                                </div>
                                {msg.me && (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                            <div className="flex items-center gap-2 pt-3 border-t border-white/10 dark:border-white/5">
                              <div className="flex-1 h-9 rounded-lg bg-white/5 dark:bg-white/[0.03] px-3 flex items-center">
                                <div className="h-1.5 w-20 rounded bg-white/10 animate-[blink_1.2s_step-end_infinite]" />
                              </div>
                              <div className="w-9 h-9 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                                <ArrowRight size={14} className="text-indigo-400" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* ── Screen 2: Inventory ── */}
                        {screenIdx === 2 && (
                          <motion.div
                            key="screen-inv"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10 dark:border-white/5">
                              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Inventario General</div>
                              <div className="flex gap-1">
                                <div className="w-5 h-5 rounded bg-white/10" />
                                <div className="w-5 h-5 rounded bg-indigo-500/25" />
                              </div>
                            </div>
                            <div className="grid grid-cols-[1fr_55px_50px_40px] gap-2 text-[11px] text-slate-400 dark:text-slate-500 px-1">
                              <div>Producto</div>
                              <div className="text-right">Stock</div>
                              <div className="text-right">Precio</div>
                              <div className="text-right">Estado</div>
                            </div>
                            {[
                              { name: "Fertilizante Orgánico", stock: "845", price: "$28", ok: true },
                              { name: "Semillas de Maíz", stock: "234", price: "$15", ok: true },
                              { name: "Herramientas de Labranza", stock: "12", price: "$89", ok: false },
                              { name: "Sistema de Riego", stock: "45", price: "$245", ok: true },
                              { name: "Alimento Balanceado", stock: "567", price: "$22", ok: true },
                              { name: "Fungicida Líquido", stock: "0", price: "$34", ok: false },
                              { name: "Cercos Eléctricos", stock: "28", price: "$120", ok: true },
                              { name: "Tanque de Agua 500L", stock: "6", price: "$180", ok: true },
                            ].map((item, i) => (
                              <div
                                key={i}
                                className="grid grid-cols-[1fr_55px_50px_40px] gap-2 items-center text-xs bg-white/[0.02] hover:bg-white/5 dark:hover:bg-white/[0.04] rounded-lg px-2 py-1.5 transition-colors animate-[fade-slide-up_0.4s_ease-out_both]"
                                style={{ animationDelay: `${i * 0.05}s` }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded bg-white/10 dark:bg-white/5" />
                                  <span className="text-slate-700 dark:text-slate-200 truncate">{item.name}</span>
                                </div>
                                <div className={`text-right font-medium ${item.stock === "0" ? "text-red-400" : item.stock < "20" ? "text-yellow-400" : "text-slate-600 dark:text-slate-300"}`}>{item.stock}</div>
                                <div className="text-right text-slate-500 dark:text-slate-400">{item.price}</div>
                                <div className="flex justify-end">
                                  <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-emerald-400" : "bg-red-400 animate-[dot-pulse_2s_ease-in-out_infinite]"}`} />
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {/* ── Screen 3: Orders Cards ── */}
                        {screenIdx === 3 && (
                          <motion.div
                            key="screen-orders"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Órdenes Recientes</div>
                              <div className="h-1.5 w-14 rounded bg-white/10" />
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                              {[
                                { id: "#O-1024", client: "Coop. La Esperanza", amt: "$12,400", status: "Completado", sc: "bg-emerald-400", scText: "text-emerald-400" },
                                { id: "#O-1025", client: "Cooperativa El Progreso", amt: "$4,890", status: "Pendiente", sc: "bg-yellow-400", scText: "text-yellow-400" },
                                { id: "#O-1026", client: "Coop. San Martín", amt: "$8,120", status: "Procesando", sc: "bg-indigo-400", scText: "text-indigo-400" },
                                { id: "#O-1027", client: "Coop. Los Andes", amt: "$3,750", status: "Entregado", sc: "bg-emerald-400", scText: "text-emerald-400" },
                                { id: "#O-1028", client: "Coop. del Valle", amt: "$6,200", status: "Pendiente", sc: "bg-yellow-400", scText: "text-yellow-400" },
                                { id: "#O-1029", client: "Coop. Agro Unida", amt: "$2,670", status: "Completado", sc: "bg-emerald-400", scText: "text-emerald-400" },
                                { id: "#O-1030", client: "Cooperativa Norte Grande", amt: "$15,300", status: "Procesando", sc: "bg-indigo-400", scText: "text-indigo-400" },
                                { id: "#O-1031", client: "Coop. La Frontera", amt: "$1,890", status: "Completado", sc: "bg-emerald-400", scText: "text-emerald-400" },
                              ].map((order, i) => (
                                <div
                                  key={i}
                                  className="bg-white/[0.03] hover:bg-white/5 dark:hover:bg-white/[0.05] rounded-xl p-3 transition-colors animate-[fade-slide-up_0.4s_ease-out_both]"
                                  style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                  <div className="flex items-center justify-between mb-1.5">
                                    <div className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">{order.id}</div>
                                    <div className={`w-1.5 h-1.5 rounded-full ${order.sc} animate-[dot-pulse_2s_ease-in-out_infinite]`} />
                                  </div>
                                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 truncate">{order.client}</div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-bold text-slate-800 dark:text-white">{order.amt}</div>
                                    <div className={`text-[8px] px-1.5 py-0.5 rounded-full ${order.sc}/20 ${order.scText}`}>{order.status}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Screen indicator dots */}
                  <div className="flex justify-center gap-2 pb-3 mt-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === screenIdx ? "w-6 bg-indigo-500" : "w-2 bg-white/20 dark:bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRY CARDS
      ════════════════════════════════════════════ */}
      <IndustryCards />

      {/* ═══════════════════════════════════════════
          PROCESS — How It Works
      ════════════════════════════════════════════ */}
      <ProcessSteps />

      {/* ═══════════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════════════ */}
      <ComparisonTable />

      {/* ═══════════════════════════════════════════
          PLAN ALL-IN-ONE + SAVINGS TABLE
      ════════════════════════════════════════════ */}
      <PlanAllInOne />

      {/* ═══════════════════════════════════════════
          FAQ + CTA BANNER
      ════════════════════════════════════════════ */}
      <FAQ />
    </>
  )
}
