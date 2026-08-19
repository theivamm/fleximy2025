import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CONTACT } from "../../data/navigation"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroCopy() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[540px]">
      <motion.span variants={fadeUp} className="kicker">
        Diseno · Desarrollo · Producto digital
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="mt-5 font-display font-bold text-text-1"
        style={{
          fontSize: "clamp(2.75rem, 4.65vw, 5.375rem)",
          lineHeight: 0.96,
          letterSpacing: "-0.055em",
          textWrap: "balance",
          maxInlineSize: "11.5ch",
        }}
      >
        Disenamos{" "}
        <span className="text-gradient">productos digitales</span>{" "}
        que hacen avanzar negocios.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-[42ch] text-text-2"
        style={{ fontSize: "clamp(18px, 1.15vw, 21px)", lineHeight: 1.5 }}
      >
        Creamos webs, aplicaciones y dashboards a medida para vender, ordenar procesos
        y conectar cada parte de tu negocio.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href="/contacto"
          data-track="hero_cta_principal"
          className="inline-flex h-[52px] items-center gap-2.5 rounded-xl px-7 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(121,87,255,0.3)] transition-all duration-200 hover:shadow-[0_8px_40px_rgba(121,87,255,0.45)] hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #7957ff 0%, #5268ff 36%, #15cbea 70%, #f26db5 100%)" }}
        >
          {CONTACT.ctaPrimary}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#servicios"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
          }}
          className="inline-flex h-[52px] items-center gap-2 rounded-xl border border-white/20 bg-transparent px-7 text-sm font-semibold text-text-1 transition-colors hover:bg-white/[0.05]"
        >
          Ver lo que hacemos
        </a>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-5 font-mono text-[11px] tracking-[0.12em] text-text-3">
        Estrategia · UX/UI · Desarrollo · Automatizacion
      </motion.p>
    </motion.div>
  )
}
