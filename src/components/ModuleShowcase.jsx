import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const moduleKeys = ["module1", "module2", "module3", "module4", "module5"]

const moduleColors = [
  { from: "from-emerald-500", to: "to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", line: "bg-emerald-200 dark:bg-emerald-800/50" },
  { from: "from-indigo-500", to: "to-purple-500", bg: "bg-indigo-50 dark:bg-indigo-950/30", line: "bg-indigo-200 dark:bg-indigo-800/50" },
  { from: "from-amber-500", to: "to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/30", line: "bg-amber-200 dark:bg-amber-800/50" },
  { from: "from-cyan-500", to: "to-blue-500", bg: "bg-cyan-50 dark:bg-cyan-950/30", line: "bg-cyan-200 dark:bg-cyan-800/50" },
  { from: "from-rose-500", to: "to-pink-500", bg: "bg-rose-50 dark:bg-rose-950/30", line: "bg-rose-200 dark:bg-rose-800/50" },
]

function DashboardMockup({ modIdx, features, accent }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-slate-800/80 border border-white/40 dark:border-white/10 shadow-xl">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan pointer-events-none" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${accent.from.replace("from-", "bg-")}`} />
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            Fleximy OS
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600" />
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600" />
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600" />
        </div>
      </div>

      {/* Mock content */}
      <div className="p-4 flex flex-col gap-3 h-[calc(100%-48px)]">
        {/* Header area */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-100 dark:bg-slate-700" />
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700" />
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="flex-1 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((col) => (
            <div key={col} className={`rounded-xl p-3 flex flex-col gap-2 ${accent.bg}`}>
              {/* Mini chart / bar */}
              <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-600" />
              {[0, 1, 2, 3].map((row) => (
                <div
                  key={row}
                  className={`h-2 rounded ${accent.line}`}
                  style={{ width: `${60 + Math.random() * 40}%` }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-8 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center">
              <div className="h-3 w-10 rounded bg-slate-100 dark:bg-slate-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[8px] font-bold tracking-wider uppercase text-white bg-gradient-to-r ${accent.from} ${accent.to} shadow-lg`}>
        Live
      </div>
    </div>
  )
}

export default function ModuleShowcase() {
  const { lang } = useLang()
  const t = translations.whyUs
  const [activeMod, setActiveMod] = useState(0)

  const modIdx = moduleKeys[activeMod]
  const accent = moduleColors[activeMod]
  const featureKeys = ["Feat1", "Feat2", "Feat3", "Feat4", "Feat5"]

  const goTo = (idx) => setActiveMod(idx)
  const prev = () => setActiveMod((a) => (a === 0 ? moduleKeys.length - 1 : a - 1))
  const next = () => setActiveMod((a) => (a === moduleKeys.length - 1 ? 0 : a + 1))

  return (
    <SectionWrapper>
      <SectionHeader title={t.modulesTitle[lang]} subtitle={t.modulesSub[lang]} />

      {/* Module tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {moduleKeys.map((key, i) => {
          const isActive = i === activeMod
          const c = moduleColors[i]
          return (
            <button
              key={key}
              onClick={() => goTo(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border-[0.5px] whitespace-nowrap ${
                isActive
                  ? `bg-gradient-to-r ${c.from} ${c.to} text-white shadow-lg border-transparent scale-105`
                  : "glass text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              {t[`${key}Title`][lang]}
            </button>
          )
        })}
      </div>

      {/* Module content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={modIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* Left: text */}
          <div>
            {/* Tag */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white bg-gradient-to-r ${accent.from} ${accent.to} mb-4`}
            >
              {t[`${modIdx}Tag`][lang]}
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4">
              {t[`${modIdx}Title`][lang]}
            </h3>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {t[`${modIdx}Desc`][lang]}
            </p>

            {/* Feature list */}
            <ul className="space-y-2.5">
              {featureKeys.map((fk) => (
                <li
                  key={fk}
                  className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${accent.from} ${accent.to} flex items-center justify-center shrink-0`}>
                    <Check size={10} className="text-white" />
                  </span>
                  {t[`${modIdx}${fk}`][lang]}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="relative">
            {/* Navigation arrows */}
            <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={next}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <DashboardMockup
              modIdx={modIdx}
              features={featureKeys}
              accent={accent}
            />

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {moduleKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeMod
                      ? "bg-indigo-500 w-6"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  )
}
