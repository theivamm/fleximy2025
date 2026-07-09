import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import Button from "../components/Button"
import SectionWrapper from "../components/SectionWrapper"
import InteractiveBackground from "../components/InteractiveBackground"
import EcosystemTabs from "../components/EcosystemTabs"
import StatsCounter from "../components/StatsCounter"
import ProcessSteps from "../components/ProcessSteps"
import CapabilitiesGrid from "../components/CapabilitiesGrid"
import TestimonialsCarousel from "../components/TestimonialsCarousel"
import PricingCards from "../components/PricingCards"
import FAQ from "../components/FAQ"
import FinalCTA from "../components/FinalCTA"
import heroMain from "../assets/images/img-01-hero.png"
import heroFloatLeft from "../assets/images/img-01-hero-float-left.png"
import heroFloatRight from "../assets/images/img-01-hero-float-right.png"

export default function Home() {
  const { lang } = useLang()
  const t = translations.home

  // ── Hero parallax ──
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden"
      >
        <InteractiveBackground />

        {/* Right image panel */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-3/5 h-full pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 right-0 w-full max-w-4xl">
              {/* Float — behind main image, top-left area */}
              <motion.img
                src={heroFloatLeft}
                alt=""
                initial={{ opacity: 0, y: -30, x: -30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="absolute top-4 left-6 w-auto h-auto max-w-[40%] animate-float"
              />

              {/* Main hero image — base aligned to hero container base */}
              <motion.img
                src={heroMain}
                alt="Hero"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full h-auto"
              />

              {/* Float — above main image, shifted up & left */}
              <motion.img
                src={heroFloatRight}
                alt=""
                initial={{ opacity: 0, y: 30, x: 30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-[100px] right-[100px] z-20 w-auto h-auto max-w-[30%] animate-float"
              />
            </div>
          </div>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto max-w-6xl w-full relative z-10"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400"
              >
                <Sparkles size={14} />
                {t.heroBadge[lang]}
              </motion.div>

              {/* Title with gradient */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                <span className="text-slate-900 dark:text-white">
                  {lang === "es"
                    ? "Tu web no es un folleto."
                    : "Your website is not a brochure."}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {lang === "es"
                    ? "Es el contenedor"
                    : "It's your business"}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {lang === "es"
                    ? "de tu negocio."
                    : "container."}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
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


            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════════
          STATS
      ════════════════════════════════════════════ */}
      <SectionWrapper>
        <StatsCounter />
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          PROCESS — How It Works
      ════════════════════════════════════════════ */}
      <ProcessSteps />

      {/* ═══════════════════════════════════════════
          CAPABILITIES — Everything You Need
      ════════════════════════════════════════════ */}
      <CapabilitiesGrid />

      {/* ═══════════════════════════════════════════
          ECOSYSTEM — Interactive Tabs
      ════════════════════════════════════════════ */}
      <SectionWrapper>
        <EcosystemTabs />
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <TestimonialsCarousel />

      {/* ═══════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════ */}
      <PricingCards />

      {/* ═══════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <FAQ />

      {/* ═══════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <FinalCTA />
    </>
  )
}
