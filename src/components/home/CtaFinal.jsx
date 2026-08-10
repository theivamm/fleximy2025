import Button from "../ui/Button"
import { CONTACT } from "../../data/navigation"

export default function CtaFinal() {
  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-gradient-night py-20 text-on-night lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="container-narrow relative py-4 text-center">
        <p className="kicker justify-center" style={{ color: "rgba(246,247,255,0.55)" }}>
          Empecemos
        </p>
        <h2 className="mx-auto mt-4 max-w-[16ch] text-h1">
          Contanos cómo funciona <span className="text-primary-on-dark">hoy</span> tu negocio
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lead text-on-night/70">
          En una conversación de 30 minutos vemos qué herramientas te sobran, cuáles faltan y si
          Fleximy es un buen punto de partida.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button to="/contacto" size="lg" data-track="cta_diagnostico">
            {CONTACT.ctaPrimary}
          </Button>
          <Button href={CONTACT.whatsapp} variant="secondary" size="lg">
            {CONTACT.whatsappText}
          </Button>
        </div>
        <p className="mt-4 font-mono text-micro text-on-night/50">
          sin compromiso · si fleximy no te sirve, te lo decimos
        </p>
      </div>
    </section>
  )
}
