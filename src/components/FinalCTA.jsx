import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import Button from "./Button"

export default function FinalCTA() {
  const { lang } = useLang()
  const t = translations.home

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-28">
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl glass p-10 md:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative corner orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />

        <Sparkles size={32} className="text-indigo-500 mx-auto mb-6" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
          {t.ctaTitle[lang]}
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto">
          {t.ctaSub[lang]}
        </p>

        <Button variant="primary" className="text-base px-10 py-4 mx-auto">
          {t.ctaBtn[lang]}
          <ArrowRight size={18} />
        </Button>
      </motion.div>
    </section>
  )
}
