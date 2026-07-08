import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const testKeys = ["test1", "test2", "test3"]

export default function TestimonialsCarousel() {
  const { lang } = useLang()
  const t = translations.home
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? testKeys.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testKeys.length - 1 ? 0 : a + 1))

  const key = testKeys[active]

  return (
    <SectionWrapper>
      <SectionHeader title={t.testTitle[lang]} subtitle={t.testSub[lang]} />

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="glass p-8 md:p-10 relative"
          >
            <Quote size={32} className="text-indigo-200 dark:text-indigo-800/50 mb-4" />

            <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 italic">
              &ldquo;{t[`${key}Quote`][lang]}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              {/* Avatar placeholder — gradient circle */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                {t[`${key}Name`][lang].split(" ").map((w) => w[0]).join("")}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">
                  {t[`${key}Name`][lang]}
                </div>
                <div className="text-xs text-slate-400">{t[`${key}Role`][lang]}</div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? "bg-indigo-500 w-6"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={prev}
                className="pointer-events-auto w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
