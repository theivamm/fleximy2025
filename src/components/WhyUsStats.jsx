import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const statKeys = ["stat1", "stat2", "stat3", "stat4"]

const statBgColors = [
  "from-indigo-500/10 via-purple-500/5 to-transparent",
  "from-emerald-500/10 via-teal-500/5 to-transparent",
  "from-amber-500/10 via-orange-500/5 to-transparent",
  "from-cyan-500/10 via-blue-500/5 to-transparent",
]

function AnimatedStatCard({ value, label, index, bgColor }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className={`glass p-8 text-center relative overflow-hidden group`}
    >
      {/* Animated gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Pulsing ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-20 rounded-full border border-indigo-200 dark:border-indigo-800/30 animate-pulse-ring" />
      </div>

      <div className="relative">
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
          {isInView ? value : "0"}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyUsStats() {
  const { lang } = useLang()
  const t = translations.whyUs

  return (
    <SectionWrapper>
      <SectionHeader title={t.statsTitle[lang]} subtitle={t.statsSub[lang]} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statKeys.map((key, i) => (
          <AnimatedStatCard
            key={key}
            value={t[key][lang]}
            label={t[`${key}Desc`][lang]}
            index={i}
            bgColor={statBgColors[i]}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
