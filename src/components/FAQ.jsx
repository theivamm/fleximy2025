import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"]

export default function FAQ() {
  const { lang } = useLang()
  const t = translations.home
  const [open, setOpen] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0b0f19]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-6 border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(6,182,212,0.25)]">
            <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {t.faqBadge[lang]}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            {t.faqTitle[lang]}
          </h2>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">
            {t.faqSub[lang]}
          </p>
        </motion.div>

        {/* ── Desktop: split panel ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          <div className="space-y-2.5">
            {faqKeys.map((key, i) => {
              const isActive = open === i
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(isActive ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left cursor-pointer transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/15 via-indigo-500/5 to-transparent border border-indigo-500/25 shadow-[0_0_30px_-12px_rgba(99,102,241,0.3)]"
                      : "bg-[#131b2e]/50 border border-slate-800/50 hover:border-slate-700/50 hover:bg-[#131b2e]"
                  }`}
                >
                  <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800/50 text-slate-500 group-hover:text-slate-300"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className={`text-sm font-medium leading-snug transition-colors ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>
                    {t[`${key}Q`][lang]}
                  </span>
                  <div className="ml-auto shrink-0">
                    <svg className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? "text-indigo-400 rotate-45" : "text-slate-600 group-hover:text-slate-400"
                    }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="sticky top-28">
            <AnimatePresence mode="wait">
              {open !== null ? (
                <motion.div
                  key={open}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f1320] to-slate-900 border border-indigo-500/20 p-8"
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 rounded-full" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-white leading-snug">
                        {t[`${faqKeys[open]}Q`][lang]}
                      </h3>
                    </div>
                    <div className="pl-[3.25rem]">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {t[`${faqKeys[open]}A`][lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-slate-700/50 p-8 flex flex-col items-center justify-center text-center min-h-[200px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">
                    {lang === "es" ? "Seleccioná una pregunta para ver su respuesta" : "Select a question to see the answer"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile / Tablet: accordion ── */}
        <div className="lg:hidden space-y-2.5">
          {faqKeys.map((key, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-br from-slate-900 to-[#0f1320] border-indigo-500/30 shadow-[0_0_30px_-12px_rgba(99,102,241,0.25)]"
                    : "bg-[#131b2e]/50 border-slate-800/50 hover:border-slate-700/50"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left cursor-pointer"
                >
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-800/50 text-slate-500"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium leading-snug flex-1 pr-2 transition-colors ${
                    isOpen ? "text-white" : "text-slate-200"
                  }`}>
                    {t[`${key}Q`][lang]}
                  </span>
                  <svg className={`shrink-0 w-4 h-4 transition-all duration-300 ${
                    isOpen ? "text-indigo-400 rotate-45" : "text-slate-600"
                  }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-[3.25rem] text-sm text-slate-400 leading-relaxed border-t border-slate-700/30 pt-3 mt-0">
                        {t[`${key}A`][lang]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
