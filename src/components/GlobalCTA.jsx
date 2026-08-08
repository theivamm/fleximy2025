import { useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLang } from "../context/LangContext"
import ParticlesBackground from "./ParticlesBackground"
import InteractiveBackground from "./InteractiveBackground"
import Button from "./Button"

function Letter({ char, i }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: i * 0.03,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      className="inline-block"
      style={{ perspective: 800 }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}

export default function GlobalCTA() {
  const { lang } = useLang()

  const line1 = lang === "es" ? "Tu negocio merece" : "Your business deserves"
  const line2 = lang === "es" ? "un Fleximy" : "a Fleximy"

  const letters1 = useMemo(() => line1.split(""), [line1])
  const letters2 = useMemo(() => line2.split(""), [line2])

  const subtitle =
    lang === "es"
      ? "Deja de manejar herramientas sueltas. Unifica todo en un solo sistema operativo digital."
      : "Stop juggling scattered tools. Unify everything in one digital operating system."

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <InteractiveBackground />
      <ParticlesBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 via-indigo-500 via-purple-500 to-cyan-500 dark:from-white dark:via-slate-300 dark:via-indigo-300 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            <div>
              {letters1.map((char, i) => (
                <Letter key={`l1-${char}-${i}`} char={char} i={i} />
              ))}
            </div>
            <div>
              {letters2.map((char, i) => (
                <Letter key={`l2-${char}-${i}`} char={char} i={letters1.length + i} />
              ))}
            </div>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button
              variant="primary"
              className="text-base sm:text-lg px-10 py-4 sm:px-12 sm:py-5 mx-auto"
            >
              {lang === "es" ? "Agenda Tu Consultoría Gratis" : "Book Your Free Consultation"}
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
