import { motion } from "framer-motion"
import { ClipboardList, GitBranch, Rocket, RefreshCw } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const steps = [
  { key: "process1", icon: ClipboardList },
  { key: "process2", icon: GitBranch },
  { key: "process3", icon: Rocket },
  { key: "process4", icon: RefreshCw },
]

export default function WhyUsProcess() {
  const { lang } = useLang()
  const t = translations.whyUs

  return (
    <SectionWrapper>
      <SectionHeader title={t.processTitle[lang]} subtitle={t.processSub[lang]} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(({ key, icon: Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 relative group"
          >
            {/* Step number */}
            <div className="text-5xl font-bold text-slate-100 dark:text-slate-800/50 absolute top-3 right-4 leading-none select-none">
              0{i + 1}
            </div>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon size={22} className="text-indigo-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative">
              {t[`${key}Title`][lang]}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative">
              {t[`${key}Desc`][lang]}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
