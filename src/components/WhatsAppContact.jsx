import { useEffect, useRef, useState } from "react"
import { MessageCircle, ArrowUpRight, Zap } from "lucide-react"
import { whatsappUrl } from "../data/config"
import "./whatsapp-contact.css"

export default function WhatsAppContact() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
          } else if (e.boundingClientRect.top > 0) {
            setInView(false)
          }
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    if (mq.matches) setInView(true)
    return () => io.disconnect()
  }, [])

  return (
    <section id="contacto" ref={ref} className={`wa ${inView ? "is-in" : ""}`}>
      <div className="container">
        <div className="wa-card">
          <div className="wa-card__spark" aria-hidden="true" />

          <div className="wa-copy">
            <p className="wa-eyebrow">
              <span className="wa-eyebrow__dot" aria-hidden="true" />
              Contacto directo
            </p>
            <h2 className="wa-title font-display">
              Hablemos de tu proyecto{" "}
              <span className="wa-title__accent">en un minuto.</span>
            </h2>
            <p className="wa-bajada">
              Contanos tu idea o pregunta y te respondemos personalmente, sin
              compromiso y sin tecnicismos. Es el canal más rápido.
            </p>

            <ul className="wa-benefits" aria-label="Ventajas del contacto por WhatsApp">
              <li><Zap size={15} aria-hidden="true" /> Respuesta directa del equipo</li>
              <li><Zap size={15} aria-hidden="true" /> Sin formularios, sin demoras</li>
              <li><Zap size={15} aria-hidden="true" /> Conversación real y sin compromiso</li>
            </ul>
          </div>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-cta"
            data-track="click_whatsapp_contact"
          >
            <span className="wa-cta__icon" aria-hidden="true">
              <MessageCircle size={22} />
            </span>
            <span className="wa-cta__label">
              <span className="wa-cta__top">Escribinos por WhatsApp</span>
              <span className="wa-cta__sub">Te respondemos hoy</span>
            </span>
            <ArrowUpRight size={18} className="wa-cta__arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
