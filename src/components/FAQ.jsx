import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import SectionWrapper, { SectionHeader } from "./SectionWrapper"

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5"]

export default function FAQ() {
  const { lang } = useLang()
  const t = translations.home
  const [open, setOpen] = useState(null)

  return (
    <SectionWrapper>
      <SectionHeader title={t.faqTitle[lang]} subtitle={t.faqSub[lang]} />

      <div className="max-w-2xl mx-auto space-y-3">
        {faqKeys.map((key, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 pr-4">
                  {t[`${key}Q`][lang]}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown size={16} className="text-slate-400" />
                </motion.div>
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
                    <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t[`${key}A`][lang]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
