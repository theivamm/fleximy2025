import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

const statKeys = ["stat1", "stat2", "stat3", "stat4"]

function AnimatedStat({ value, label, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass p-6 md:p-8 text-center"
    >
      <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
        {isInView ? value : "0"}
      </span>
      <span className="block mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
    </motion.div>
  )
}

export default function StatsCounter() {
  const { lang } = useLang()
  const t = translations.home

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statKeys.map((key, i) => (
        <AnimatedStat
          key={key}
          value={t[key][lang]}
          label={t[`${key}Desc`][lang]}
          index={i}
        />
      ))}
    </div>
  )
}
