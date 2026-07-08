import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import Button from "../components/Button"
import InteractiveBackground from "../components/InteractiveBackground"
import ManifestoBanner from "../components/ManifestoBanner"
import CostBreakdown from "../components/CostBreakdown"
import ModuleShowcase from "../components/ModuleShowcase"
import ComparisonTable from "../components/ComparisonTable"
import WhyUsStats from "../components/WhyUsStats"
import WhyUsProcess from "../components/WhyUsProcess"

export default function WhyUs() {
  const { lang } = useLang()
  const t = translations.whyUs

  // Hero parallax
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      {/* ═════════════════════════════════════════════
          HERO — Why Us
      ═════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden"
      >
        <InteractiveBackground />

        <motion.div style={{ y: heroY }} className="mx-auto max-w-6xl w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                <Sparkles size={14} />
                {t.heroTag[lang]}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
                <span className="text-slate-900 dark:text-white">
                  {t.heroTitle[lang].split(" ").slice(0, -1).join(" ")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {t.heroTitle[lang].split(" ").slice(-1)}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {t.heroSub[lang]}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" className="text-base px-8 py-4">
                  {t.heroCTA[lang]}
                  <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" className="text-base px-8 py-4">
                  {t.heroCTA2[lang]}
                </Button>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-xs text-slate-400 tracking-widest uppercase"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span>{lang === "es" ? "Explora" : "Explore"}</span>
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════
          FRAGMENTATION PROBLEM
      ═════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Animated large quote mark */}
            <div className="relative mb-8">
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-8 text-[120px] font-serif text-indigo-200/30 dark:text-indigo-500/20 select-none leading-none animate-float"
                style={{ animationDuration: "7s" }}
              >
                &ldquo;
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight relative">
                {t.manifestoTitle[lang]}
              </h2>
            </div>

            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mt-6 max-w-2xl mx-auto">
              {t.manifestoSub[lang]}
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 mx-auto w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500"
            />

            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-8">
              {t.manifestoSolution[lang]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          COST OF FRAGMENTATION
      ═════════════════════════════════════════════ */}
      <CostBreakdown />

      {/* ═════════════════════════════════════════════
          MANIFESTO BANNER — Full-width animated
      ═════════════════════════════════════════════ */}
      <ManifestoBanner />

      {/* ═════════════════════════════════════════════
          MODULES SHOWCASE
      ═════════════════════════════════════════════ */}
      <ModuleShowcase />

      {/* ═════════════════════════════════════════════
          COMPARISON TABLE
      ═════════════════════════════════════════════ */}
      <ComparisonTable />

      {/* ═════════════════════════════════════════════
          STATS
      ═════════════════════════════════════════════ */}
      <WhyUsStats />

      {/* ═════════════════════════════════════════════
          PROCESS
      ═════════════════════════════════════════════ */}
      <WhyUsProcess />

      {/* ═════════════════════════════════════════════
          FINAL CTA
      ═════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
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
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight mb-8">
            {t.ctaTitle[lang]}
          </h2>

          <Button variant="primary" className="text-base px-10 py-4 mx-auto">
            {t.ctaBtn[lang]}
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      </section>
    </>
  )
}
