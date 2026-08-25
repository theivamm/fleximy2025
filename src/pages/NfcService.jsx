import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function NfcService() {
  return (
    <main className="section-space pt-28">
      <div className="container max-w-[560px] text-center">
        <p
          className="inline-flex items-center gap-2 rounded-full border border-outline px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-2"
        >
          NFC Service
        </p>
        <h1 className="h1-title mt-6 text-text-1" style={{ letterSpacing: "-0.04em" }}>
          Estamos preparando{" "}
          <span
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            algo nuevo.
          </span>
        </h1>
        <p className="lead-text mt-5 text-text-2">
          Muy pronto vas a encontrar acá nuestro servicio de tarjetas y soluciones NFC.
          Mientras tanto, conocé más sobre Fleximy o escribinos.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Volver al inicio
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/50 px-7 text-sm font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70"
          >
            Contacto
          </Link>
        </div>
      </div>
    </main>
  )
}
