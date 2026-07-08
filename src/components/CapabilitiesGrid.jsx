import { motion } from "framer-motion"
import { Globe, LayoutDashboard, Smartphone, CreditCard, BarChart3, Cloud } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const caps = [
  { key: "capWeb", icon: Globe },
  { key: "capDashboard", icon: LayoutDashboard },
  { key: "capMobile", icon: Smartphone },
  { key: "capPayments", icon: CreditCard },
  { key: "capAnalytics", icon: BarChart3 },
  { key: "capCloud", icon: Cloud },
]

const hoverColors = [
  "hover:shadow-indigo-500/10",
  "hover:shadow-purple-500/10",
  "hover:shadow-cyan-500/10",
  "hover:shadow-emerald-500/10",
  "hover:shadow-amber-500/10",
  "hover:shadow-rose-500/10",
]

export default function CapabilitiesGrid() {
  const { lang } = useLang()
  const t = translations.home

  return (
    <SectionWrapper>
      <SectionHeader title={t.capsTitle[lang]} subtitle={t.capsSub[lang]} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {caps.map(({ key, icon: Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className={`glass p-6 group cursor-default transition-shadow duration-300 ${hoverColors[i]}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Icon size={24} className="text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {t[`${key}`][lang]}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t[`${key}Desc`][lang]}
            </p>

            {/* Shimmer line on hover */}
            <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
