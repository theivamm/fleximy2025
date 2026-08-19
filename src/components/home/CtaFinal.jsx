import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { CONTACT } from "../../data/navigation"

export default function CtaFinal() {
  return (
    <section className="section-space relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 20% 30%, rgba(124, 108, 255, 0.25), transparent 60%),
              radial-gradient(ellipse 50% 45% at 80% 60%, rgba(32, 213, 199, 0.18), transparent 55%),
              linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 50%, var(--bg) 100%)
            `,
          }}
        />
      </div>

      <div className="container text-center">
        <h2 className="h2-title mx-auto max-w-[28ch] text-text-1">
          ¿Tenés una idea o un proceso que necesita funcionar mejor?
        </h2>
        <p className="lead-text mx-auto mt-5 max-w-[52ch] text-text-2">
          Contanos qué querés crear, mejorar o automatizar. Te ayudamos a convertirlo
          en una solución digital concreta.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contacto"
            data-track="cta_final_principal"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            {CONTACT.ctaPrimary}
            <ArrowRight size={16} />
          </Link>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
          >
            <MessageCircle size={16} />
            {CONTACT.whatsappText}
          </a>
        </div>
      </div>
    </section>
  )
}
