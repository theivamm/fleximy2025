import Button from "../ui/Button"
import { CONTACT } from "../../data/navigation"

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-night text-on-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40"
      />
      <div className="container-narrow relative py-24 text-center lg:py-32">
        <p className="kicker justify-center" style={{ color: "rgba(246,247,255,0.55)" }}>
          Empecemos
        </p>
        <h2 className="mx-auto mt-5 max-w-[16ch] text-h1">
          Contanos cómo funciona <span className="text-primary-on-dark">hoy</span> tu negocio
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lead text-on-night/70">
          En una conversación de 30 minutos vemos qué herramientas te sobran, cuáles faltan y si
          Fleximy es un buen punto de partida.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
