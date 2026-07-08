import { motion } from "framer-motion"
import { DollarSign, Clock, Layers, AlertTriangle } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const costs = [
  { key: "costSubs", icon: DollarSign, color: "from-rose-500 to-pink-500" },
  { key: "costHours", icon: Clock, color: "from-amber-500 to-orange-500" },
  { key: "costTools", icon: Layers, color: "from-indigo-500 to-purple-500" },
  { key: "costErrors", icon: AlertTriangle, color: "from-red-500 to-rose-500" },
]

export default function CostBreakdown() {
  const { lang } = useLang()
  const t = translations.whyUs

  return (
    <SectionWrapper>
      <SectionHeader title={t.costTitle[lang]} subtitle={t.costSub[lang]} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {costs.map(({ key, icon: Icon, color }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 text-center relative overflow-hidden group"
          >
            {/* Animated background glow */}
            <div
              className={`absolute -inset-20 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 blur-[40px] transition-opacity duration-500`}
            />

            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} bg-opacity-10 flex items-center justify-center mx-auto mb-4`}
              style={{ backgroundOpacity: 0.1 }}
            >
              <Icon size={22} className="text-white" />
            </div>

            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${color} bg-clip-text text-transparent mb-1`}>
              {t[`${key}Val`][lang]}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              {t[key][lang]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Solution message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          {t.costCTALabel[lang]}
        </p>
        <p className="text-sm text-indigo-500 mt-1">
          {t.costCTALabel2[lang]}
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
