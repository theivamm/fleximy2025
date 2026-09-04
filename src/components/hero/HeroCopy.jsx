import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { whatsappUrl } from "../../data/config"

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
    <motion.div variants={stagger} initial="hidden" animate="show" className="hero__copy max-w-[620px]">
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
        MÁS QUE UNA WEB
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className="mt-6 font-display font-bold text-text-1"
        style={{
          fontSize: "clamp(52px, 4.65vw, 82px)",
          maxInlineSize: "11.5ch",
          lineHeight: 0.96,
          letterSpacing: "-0.055em",
          textWrap: "balance",
        }}
      >
        Tu negocio merece mucho{" "}
        <span
style={{
              background: "linear-gradient(110deg, #7b61ff 0%, #5277ff 44%, #20c8df 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
        >
          más que una página web.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-6 text-text-2"
        style={{
          maxWidth: "560px",
          fontSize: "clamp(17px, 1.1vw, 20px)",
          lineHeight: 1.5,
        }}
      >
        Creamos el website de tu negocio y una aplicación de gestión a medida
        para administrar ventas, clientes y operaciones desde un solo lugar.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-3 text-sm font-medium text-text-3"
        style={{ maxWidth: "520px" }}
      >
        Website, aplicación y dashboard creados como una única plataforma,
        con una inversión inicial clara y acompañamiento continuo.
      </motion.p>

      <motion.div variants={fadeUp} className="hero__actions mt-7 flex flex-row flex-nowrap items-center gap-3">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-track="hero_cta_principal"
          className="inline-flex h-[52px] min-w-max items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(121,87,255,0.3)] transition-all duration-200 hover:shadow-[0_8px_40px_rgba(121,87,255,0.45)] hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #7957ff 0%, #5268ff 44%, #15cbea 100%)" }}
        >
          Contanos sobre tu negocio
          <ArrowRight size={16} />
        </a>
        <a
          href="#que-hacemos"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector("#que-hacemos")?.scrollIntoView({ behavior: "smooth" })
          }}
          className="inline-flex h-[52px] min-w-max items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-7 text-sm font-semibold text-text-1 transition-colors hover:bg-white/[0.05]"
        >
          Mirá cómo funciona
        </a>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-5 font-mono text-[11px] tracking-[0.12em]"
        style={{ color: "var(--text-muted)" }}
      >
        Website · App de gestión · Dashboard
      </motion.p>
    </motion.div>
  )
}
