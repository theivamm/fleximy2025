import Button from "../ui/Button"
import { CONTACT } from "../../data/navigation"

export default function CtaFinal() {
  return (
    <section className="bg-ink text-text-invert">
      <div className="container-narrow py-24 text-center lg:py-32">
        <p className="kicker justify-center" style={{ color: "rgba(244,243,238,0.55)" }}>
          Empecemos
        </p>
        <h2 className="mx-auto mt-4 max-w-[16ch] text-h1">
          Contanos cómo funciona hoy tu negocio
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lead text-text-invert/70">
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
        <p className="mt-4 font-mono text-micro text-text-invert/50">
          sin compromiso · si fleximy no te sirve, te lo decimos
        </p>
      </div>
    </section>
  )
}
