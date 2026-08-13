import { Link } from "react-router-dom"
import PrimaryCTA from "./PrimaryCTA"
import { CONTACT } from "../../data/navigation"

export default function CTABand({
  title = (
    <>
      ¿Tenés una idea? <span className="text-gradient">Hagamos que funcione.</span>
    </>
  ),
  lead,
  cta = "Contanos tu idea",
  to = "/contacto",
  meta,
}) {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-wide">
        <div
          className="relative overflow-hidden rounded-3xl border border-outline p-10 sm:p-16"
          style={{ backgroundImage: "var(--background-image-primary)" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-10 hidden rotate-6 rounded-xl border border-outline bg-surface-1/70 p-4 opacity-60 backdrop-blur lg:block"
          >
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-error" />
              <span className="size-2 rounded-full bg-warning" />
              <span className="size-2 rounded-full bg-success" />
            </div>
            <div className="mt-3 flex gap-2">
              <span className="h-6 w-20 rounded bg-primary/60" />
              <span className="h-6 w-14 rounded bg-secondary/50" />
              <span className="h-6 w-16 rounded bg-accent/50" />
            </div>
          </div>

          <div className="relative z-10 flex max-w-2xl flex-col items-start">
            <span className="kicker">Empecemos</span>
            <h2 className="h2-title mt-5 font-display text-text-1">{title}</h2>
            {lead && (
              <p className="lead-text mt-5 text-text-secondary">{lead}</p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA to={to} large>
                {cta}
              </PrimaryCTA>
              <Link
                to={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_whatsapp"
                className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/60 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
              >
                {CONTACT.whatsappText}
              </Link>
            </div>
            {meta && (
              <p className="mt-5 font-mono text-micro text-text-3">{meta}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
