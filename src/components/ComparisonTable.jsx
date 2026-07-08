import { motion } from "framer-motion"
import { X, Check } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const rowKeys = ["compRow1", "compRow2", "compRow3", "compRow4", "compRow5", "compRow6"]

export default function ComparisonTable() {
  const { lang } = useLang()
  const t = translations.whyUs

  return (
    <SectionWrapper>
      <SectionHeader title={t.comparisonTitle[lang]} subtitle={t.comparisonSub[lang]} />

      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/20 dark:border-white/5">
        {/* Header */}
        <div className="grid grid-cols-3 gap-0">
          <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold tracking-widest uppercase text-slate-400">
            {t.compFeature[lang]}
          </div>
          <div className="px-5 py-4 bg-red-50/50 dark:bg-red-950/20 text-xs font-semibold tracking-widest uppercase text-red-400 text-center">
            {t.compOldWay[lang]}
          </div>
          <div className="px-5 py-4 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs font-semibold tracking-widest uppercase text-indigo-500 text-center">
            {t.compVessel[lang]}
          </div>
        </div>

        {/* Rows */}
        {rowKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`grid grid-cols-3 gap-0 border-t border-slate-100 dark:border-slate-800/50 ${
              i % 2 === 0 ? "bg-white/30 dark:bg-slate-900/20" : "bg-transparent"
            }`}
          >
            <div className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
              {t[key][lang]}
            </div>
            <div className="px-5 py-4 text-sm text-slate-400 text-center flex items-center justify-center gap-2">
              <X size={14} className="text-red-400" />
              <span>{t[`${key}Old`][lang]}</span>
            </div>
            <div className="px-5 py-4 text-sm text-indigo-600 dark:text-indigo-400 text-center flex items-center justify-center gap-2 font-medium">
              <Check size={14} />
              <span>{t[`${key}New`][lang]}</span>
            </div>
          </motion.div>
        ))}

        {/* Total row */}
        <div className="grid grid-cols-3 gap-0 border-t-2 border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/20">
          <div className="px-5 py-5 text-sm font-bold text-slate-900 dark:text-white">
            {t.compTotal[lang]}
          </div>
          <div className="px-5 py-5 text-sm text-center text-red-500 font-semibold">
            {t.compTotalOld[lang]}
          </div>
          <div className="px-5 py-5 text-sm text-center text-indigo-600 dark:text-indigo-400 font-bold">
            {t.compTotalNew[lang]}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
