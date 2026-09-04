import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "../data/config"
import "./whatsapp-contact.css"

export default function WhatsAppContact() {
  return (
    <section id="contacto" className="wa-block">
      <div className="container wa-inner">
        <div className="wa-glow wa-glow--a" aria-hidden="true" />
        <div className="wa-glow wa-glow--b" aria-hidden="true" />

        <div className="wa-card">
          <div className="wa-body">
            <p className="wa-eyebrow">Contacto</p>
            <h2 className="wa-title font-display">Hablemos de tu proyecto.</h2>
            <p className="wa-bajada">
              Contanos tu idea o pregunta y te respondemos personalmente.
              Sin compromiso y sin tecnicismos.
            </p>
          </div>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-cta"
            data-track="click_whatsapp_contact"
          >
            <MessageCircle size={20} aria-hidden="true" />
            <span>Escribinos por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
