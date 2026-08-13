import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import { WHATSAPP_PLAIN_URL } from "../data/config"

const costItems = [
  { icon: "💻", labelEn: "Full-stack developer", labelEs: "Programador Backend + Frontend", cost: "$400.000" },
  { icon: "🎨", labelEn: "Web / UX designer", labelEs: "Diseñador Web / UX", cost: "$180.000" },
  { icon: "☁️", labelEn: "Cloud hosting + SSL", labelEs: "Hosting + Dominio + SSL", cost: "$25.000" },
  { icon: "📊", labelEn: "External CRM software", labelEs: "Software de Gestión externo", cost: "$60.000" },
  { icon: "✅", labelEn: "Task manager tool", labelEs: "Gestor de Tareas premium", cost: "$40.000" },
]

function Counter({ from = 0, to, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const step = (now) => {
      const pct = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      setVal(Math.floor(from + (to - from) * eased))
      if (pct < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, from, to, duration])

  return <span ref={ref}>{val.toLocaleString("es-AR")}</span>
}

export default function PlanAllInOne() {
  const { lang } = useLang()
  const t = translations.home
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0])
  const totalReveal = useTransform(scrollYProgress, [0.3, 0.55], [0, 1])

  return (
    <section id="plan" ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19] overflow-hidden">
      {/* Floating currency symbols background */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {["$", "₿", "$", "₿", "$", "₿", "$", "₿"].map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-slate-700/20 text-4xl font-bold select-none"
            style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 4) * 20}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            {s}
          </motion.div>
        ))}
      </motion.div>

      <div className="mx-auto max-w-5xl relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6 border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_-4px_rgba(34,197,94,0.25)]">
            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t.planBadge[lang]}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
            {t.planTitle[lang]}
          </h2>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">
            {t.planSub[lang]}
          </p>
        </motion.div>

        {/* ── Main visual: Cost cards (left) + Fleximy card (right) ── */}
        <div className="lg:grid lg:grid-cols-[1.2fr_0.1fr_1.2fr] lg:gap-6 items-start">
          {/* ── COL 1: Traditional cost stack ── */}
          <div className="relative">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest uppercase text-rose-400/70 mb-5 text-center lg:text-left"
            >
              {lang === "es" ? "✕ Costo tradicional" : "✕ Traditional cost"}
            </motion.p>

            <div className="space-y-3">
              {costItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -60, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.12,
                    type: "spring",
                    stiffness: 100,
                    damping: 18,
                  }}
                  className="relative group/cost"
                >
                  <div className="relative rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/20 border border-rose-500/15 p-4 flex items-center gap-3 hover:border-rose-500/30 transition-colors"
                    style={{
                      marginLeft: `${i % 2 === 0 ? 0 : 12}px`,
                      marginRight: `${i % 2 === 0 ? 12 : 0}px`,
                    }}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-lg group-hover/cost:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-400 truncate">
                        {lang === "es" ? item.labelEs : item.labelEn}
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {item.cost} <span className="text-[10px] font-normal text-slate-500">ARS/mes</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-rose-500/5 border border-rose-500/20 p-4 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-white">{t.planTableTotal[lang]}</span>
              <span className="text-lg font-bold text-rose-400">~$705.000 <span className="text-xs font-normal text-rose-400/70">ARS/mes</span></span>
            </motion.div>
          </div>

          {/* ── CENTER: VS divider ── */}
          <div className="hidden lg:flex flex-col items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.div>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-px bg-gradient-to-b from-indigo-500/50 to-cyan-500/50 min-h-[60px]"
            />
          </div>

          {/* Mobile vs badge */}
          <div className="lg:hidden flex justify-center my-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.div>
          </div>

          {/* ── COL 2: Fleximy card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 80, damping: 16 }}
            className="relative"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs font-semibold tracking-widest uppercase text-emerald-400/70 mb-5 text-center lg:text-left"
            >
              {lang === "es" ? "✓ Fleximy" : "✓ Fleximy"}
            </motion.p>

            <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-cyan-500/20 p-[1px] shadow-[0_0_40px_-8px_rgba(34,197,94,0.2)] group hover:shadow-[0_0_60px_-4px_rgba(34,197,94,0.35)] transition-all duration-500">
              <div className="rounded-[calc(1rem-1px)] bg-[#131b2e] p-6 lg:p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30">
                    {t.planIncluded[lang]}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    {t.planCurrency[lang]}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">$150.000</span>
                    <span className="text-sm font-medium text-emerald-400">ARS</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.planPriceSub[lang]}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-start gap-3 group/li">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/li:bg-emerald-500/30 transition-colors">
                        <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">{t[`planFeat${i}`][lang]}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP_PLAIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.planCTA[lang]}
                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── SAVINGS HIGHLIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 lg:mt-14 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">{t.planSavingsBadge[lang]}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-sm text-slate-400">{t.planSavingsText[lang]}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                $<Counter from={0} to={555000} duration={2} />+
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-400">ARS / mes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
