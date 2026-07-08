import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"

export default function ManifestoBanner() {
  const { dark } = useTheme()
  const { lang } = useLang()
  const t = translations.whyUs

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Animated mesh background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${dark ? "mesh-bg-dark" : "mesh-bg"} animate-mesh`}
        />

        {/* Grid overlay */}
        <div
          className={`absolute inset-0 ${dark ? "grid-pattern-dark" : "grid-pattern"}`}
        />

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/10 animate-drift-slow blur-[80px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/15 to-indigo-400/10 animate-drift-medium blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400/15 to-pink-400/10 animate-drift-fast blur-[60px]" />

        {/* Animated morphing shape */}
        <div className="absolute bottom-1/4 left-[10%] w-32 h-32 border-2 border-indigo-400/20 animate-morph blur-[2px]" />
        <div className="absolute top-1/4 right-[15%] w-24 h-24 border-2 border-purple-400/20 animate-morph blur-[1px]" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Quote mark */}
          <div className="text-6xl font-serif text-indigo-300/50 dark:text-indigo-500/30 leading-none mb-6">
            &ldquo;
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
            {t.manifestoBannerTitle[lang]}
          </h2>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {t.manifestoBannerSub[lang]}
          </p>

          {/* Decorative line */}
          <div className="mt-10 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
