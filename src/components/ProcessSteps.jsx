import { motion } from "framer-motion"
import { Search, Code, Rocket } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const steps = [
  { key: "step1", icon: Search },
  { key: "step2", icon: Code },
  { key: "step3", icon: Rocket },
]

export default function ProcessSteps() {
  const { lang } = useLang()
  const t = translations.home

  return (
    <SectionWrapper>
      <SectionHeader title={t.processTitle[lang]} subtitle={t.processSub[lang]} />

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-24 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[2px] bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 dark:from-indigo-800/30 dark:via-purple-800/30 dark:to-cyan-800/30" />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-white/40 dark:border-white/10 shadow-lg flex items-center justify-center mb-6 group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon size={28} className="relative text-indigo-500" />
              </div>

              <div className="glass p-6 w-full flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {t[`${key}Title`][lang]}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t[`${key}Desc`][lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
