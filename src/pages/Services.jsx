import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, ChevronDown, Globe, LayoutDashboard, Cloud, Database, BarChart3, CreditCard, Zap, Store, Search } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import InteractiveBackground from "../components/InteractiveBackground"
import Button from "../components/Button"
import SectionWrapper, { SectionHeader } from "../components/SectionWrapper"
import GlassCard from "../components/GlassCard"

const levelCards = [
  { key: "web", icon: Globe },
  { key: "dashboard", icon: LayoutDashboard },
  { key: "infra", icon: Cloud },
]

const featureIcons = {
  realtimeDB: Database,
  analytics: BarChart3,
  payments: CreditCard,
  automation: Zap,
  multi: Store,
  seo: Search,
}

export default function Services() {
  const { lang } = useLang()
  const s = translations.services

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      {/* ═════════════════════════════════════════════
          HERO — Services
      ═════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden"
      >
        <InteractiveBackground />

        <motion.div style={{ y: heroY }} className="mx-auto max-w-6xl w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                <Sparkles size={14} />
                {lang === "es" ? "Nuestros Servicios" : "Our Services"}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
                <span className="text-slate-900 dark:text-white">
                  {lang === "es" ? "Todo lo que necesitas" : "Everything you need"}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {lang === "es" ? "en un solo sistema" : "in one system"}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {s.sub[lang]}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" className="text-base px-8 py-4">
                  {lang === "es" ? "Ver Servicios" : "View Services"}
                  <ArrowRight size={18} />
                </Button>
              </div>

              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-xs text-slate-400 tracking-widest uppercase"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span>{lang === "es" ? "Explora" : "Explore"}</span>
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════
          CONTENT
      ═════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionHeader title={s.title[lang]} />

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {levelCards.map(({ key, icon: Icon }, i) => (
            <GlassCard key={key} className="p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {s[`${key}Title`][lang]}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s[`${key}Desc`][lang]}
                </p>
              </motion.div>
            </GlassCard>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(s.features).map(([key, val], i) => {
            const Icon = featureIcons[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                  {Icon && <Icon size={18} className="text-indigo-500" />}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {val[lang]}
                </span>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>
    </>
  )
}
