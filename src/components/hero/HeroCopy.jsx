import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CONTACT } from "../../data/navigation"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroCopy() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[590px]">
      <motion.span
        variants={fadeUp}
        className="inline-block"
        style={{
          marginTop: "clamp(72px, 8vh, 96px)",
          fontSize: "clamp(11px, 0.7vw, 12px)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Diseno · Desarrollo · Producto digital
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="mt-6 font-display font-bold text-text-1"
        style={{
          fontSize: "clamp(42px, 4.5vw, 74px)",
          maxInlineSize: "13.5ch",
          lineHeight: 0.98,
          letterSpacing: "-0.052em",
          textWrap: "balance",
        }}
      >
        Disenamos{" "}
        <span
          style={{
            background: "linear-gradient(110deg, #7b61ff 0%, #5277ff 38%, #20c8df 76%, #dd78b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          productos digitales
        </span>{" "}
        para hacer avanzar negocios.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-text-2"
        style={{
          maxWidth: "560px",
          fontSize: "clamp(18px, 1.1vw, 20px)",
          lineHeight: 1.5,
        }}
      >
        Creamos webs, aplicaciones y dashboards a medida para vender, ordenar procesos
        y conectar cada parte de tu negocio.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-7 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <a
          href="/contacto"
          data-track="hero_cta_principal"
          className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(121,87,255,0.3)] transition-all duration-200 hover:shadow-[0_8px_40px_rgba(121,87,255,0.45)] hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #7957ff 0%, #5268ff 36%, #15cbea 70%, #f26db5 100%)" }}
        >
          {CONTACT.ctaPrimary}
          <ArrowRight size={16} />
        </a>
        <a
          href="#servicios"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
          }}
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-7 text-sm font-semibold text-text-1 transition-colors hover:bg-white/[0.05]"
        >
          Ver lo que hacemos
        </a>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-5 font-mono text-[11px] tracking-[0.12em]"
        style={{ color: "var(--text-muted)" }}
      >
        Estrategia · UX/UI · Desarrollo · Automatizacion
      </motion.p>
    </motion.div>
  )
}
