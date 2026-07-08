import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react"
import { useLang } from "../context/LangContext"
import { translations } from "../content/translations"
import InteractiveBackground from "../components/InteractiveBackground"
import Button from "../components/Button"
import SectionWrapper, { SectionHeader } from "../components/SectionWrapper"
import BlogCard from "../components/BlogCard"

export default function Blog() {
  const { lang } = useLang()
  const t = translations.blog
  const posts = t.posts

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      {/* ═════════════════════════════════════════════
          HERO — Blog
      ═════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden"
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
                {lang === "es" ? "Blog & Insights" : "Blog & Insights"}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
                <span className="text-slate-900 dark:text-white">
                  {lang === "es" ? "Conocimiento que" : "Knowledge that"}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {lang === "es" ? "transforma tu negocio" : "transforms your business"}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {t.sub[lang]}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" className="text-base px-8 py-4">
                  {lang === "es" ? "Leer Artículos" : "Read Articles"}
                  <ArrowRight size={18} />
                </Button>
              </div>

              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-xs text-slate-400 tracking-widest uppercase"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span>{lang === "es" ? "Artículos recientes" : "Latest articles"}</span>
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════
          CONTENT
      ═════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionHeader title={t.title[lang]} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
