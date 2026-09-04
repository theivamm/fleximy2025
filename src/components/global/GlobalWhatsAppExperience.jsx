import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { WHATSAPP_MESSAGES, whatsappUrl } from "../../data/config"
import { track } from "../../lib/analytics"
import "./global-whatsapp.css"

/* ==========================================================================
   GLOBAL WHATSAPP EXPERIENCE
   Módulo global de contacto por WhatsApp. Reemplaza los módulos genéricos
   de contacto del sitio. Es una pieza premium (no un banner verde) que
   parece una conversación que está empezando. Se renderiza por ruta y elige
   el mensaje y el copy correspondientes a cada página.
   ========================================================================== */

const ROUTE_VARIANTS = {
  fidelizacion: {
    eyebrow: "HABLEMOS DE TU NEGOCIO",
    title: "Contanos cómo compran tus clientes. Nosotros pensamos cómo hacer que vuelvan.",
    description:
      "Una conversación breve para entender tu negocio, definir una primera regla y mostrarte cómo podría funcionar la plataforma.",
    cta: "Hablar por WhatsApp",
    microcopy: "Respuesta personal · Sin compromiso · Sin tecnicismos",
    quickReplies: ["Premiar compras", "Recuperar clientes", "Todavía no lo sé"],
    final: "Conversemos por WhatsApp →",
    action: "click_whatsapp_fidelizacion",
    source: "fidelizacion",
  },
  nfc: {
    eyebrow: "CONVERSEMOS SOBRE TU NEGOCIO",
    title: "Contanos qué querés que pase después del toque.",
    description:
      "Reseñas, consultas, reservas, pagos o una idea completamente diferente. Contanos tu caso y pensemos juntos la solución.",
    cta: "Hablar por WhatsApp",
    microcopy: "Respuesta personal · Sin compromiso · Sin tecnicismos",
    quickReplies: ["Facilitar reseñas", "Recibir pedidos", "Otra idea"],
    final: "Conversemos por WhatsApp →",
    action: "click_whatsapp_nfc",
    source: "nfc",
  },
  default: {
    eyebrow: "HABLEMOS DE TU PROYECTO",
    title: "Contanos tu idea. Nosotros la pensamos con vos.",
    description:
      "Una conversación breve para entender tu negocio y mostrarte cómo Fleximy puede ayudarte a crecer.",
    cta: "Hablar por WhatsApp",
    microcopy: "Respuesta personal · Sin compromiso · Sin tecnicismos",
    quickReplies: ["Tengo una idea", "Necesito una web", "Todavía no lo sé"],
    final: "Conversemos por WhatsApp →",
    action: "click_whatsapp_site",
    source: "home",
  },
}

function resolveVariant(pathname) {
  if (pathname.startsWith("/soluciones/fidelizacion")) return ROUTE_VARIANTS.fidelizacion
  if (pathname.startsWith("/soluciones/nfc")) return ROUTE_VARIANTS.nfc
  return ROUTE_VARIANTS.default
}

/* Chat decorativo: burbujas que se revelan una por una al entrar en viewport */
function ChatSurface({ variant }) {
  const { quickReplies, final } = variant
  const lines = [
    { side: "them", text: "¿A qué se dedica tu negocio?" },
    { side: "me", text: "Tengo una cafetería y quiero premiar a quienes vienen seguido." },
    { side: "them", text: "Perfecto. Podemos empezar con una meta simple y un beneficio." },
  ]

  return (
    <div className="gw-chat" aria-hidden="true">
      <div className="gw-chat__head">
        <span className="gw-chat__brand"><span className="gw-chat__brand-mark">F</span>Fleximy</span>
        <span className="gw-chat__online"><span className="gw-chat__online-dot" />En línea</span>
      </div>
      <div className="gw-chat__body">
        {lines.map((l, i) => (
          <span key={i} className={`gw-bubble gw-bubble--${l.side}`}>{l.text}</span>
        ))}
        <div className="gw-chips">
          {quickReplies.map((r) => <span key={r} className="gw-chip">{r}</span>)}
        </div>
        <span className="gw-final">{final}</span>
      </div>
      <div className="gw-chat__foot"><span className="gw-chat__foot-dot" />Conversación inicial · demo</div>
    </div>
  )
}

function Orbits() {
  return (
    <svg className="gw-orbits" viewBox="0 0 600 420" fill="none" aria-hidden="true">
      <ellipse className="gw-orbit gw-orbit--a" cx="300" cy="210" rx="270" ry="150" />
      <ellipse className="gw-orbit gw-orbit--b" cx="300" cy="210" rx="190" ry="220" />
      <circle className="gw-orbit-node" cx="300" cy="60" r="6" />
      <circle className="gw-orbit-node" cx="120" cy="210" r="5" />
      <circle className="gw-orbit-node" cx="480" cy="210" r="8" />
    </svg>
  )
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.44 2 11.95c0 1.75.46 3.42 1.34 4.9L2 22l4.26-1.3a10 10 0 0 0 5.74 1.8c5.52 0 10-4.44 10-9.95S17.52 2 12 2zm0 18.2a8.4 8.4 0 0 1-4.4-1.22l-.32-.19-2.52.77.8-2.44-.21-.33a8.3 8.3 0 0 1-1.35-4.44c0-4.56 3.86-8.1 9-8.1 4.9 0 8.5 3.54 8.5 8.1s-3.6 8.35-8.5 8.35zm4.4-6.1c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.55.12s-.63.78-.77.94c-.14.16-.28.18-.52.06a6.5 6.5 0 0 1-1.91-1.18 7.2 7.2 0 0 1-1.32-1.64c-.14-.24-.02-.37.1-.49l.38-.43c.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42l-.74-1.76c-.19-.47-.4-.4-.55-.41l-.47-.01c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.74 2.65 4.22 3.72 1.55.67 2.16.73 2.93.61.45-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  )
}

export default function GlobalWhatsAppExperience() {
  const { pathname } = useLocation()
  const variant = resolveVariant(pathname)
  const message = WHATSAPP_MESSAGES[variant.source] || variant.source
  const url = useMemo(() => whatsappUrl(message), [message])

  const rootRef = useRef(null)
  const [inView, setInView] = useState(false)

  /* Reveal cuando el módulo entra en viewport */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (e) => { e.forEach((x) => { if (x.isIntersecting) setInView(true) }) },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    )
    io.observe(el)
    if (mq.matches) setInView(true)
    return () => io.disconnect()
  }, [])

  /* Halo reactivo al mouse (solo desktop + sin reduced motion), vía rAF */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width) * 100
        const y = ((e.clientY - r.top) / r.height) * 100
        el.style.setProperty("--gw-mx", `${x}%`)
        el.style.setProperty("--gw-my", `${y}%`)
        raf = 0
      })
    }
    el.addEventListener("mousemove", onMove)
    return () => {
      el.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const handleClick = () => track(variant.action)

  return (
    <section
      id="contacto"
      className={`gw ${inView ? "gw--in" : ""}`}
      ref={rootRef}
    >
      <div className="loyalty-container gw__inner">
        <div className="gw-card">
          <Orbits />
          <div className="gw-card__grad" aria-hidden="true" />

          <div className="gw-copy">
            <p className="gw-eyebrow">
              <span className="gw-eyebrow__dot" aria-hidden="true" />
              {variant.eyebrow}
            </p>
            <h2 className="gw-title font-display">
              {variant.title}
            </h2>
            <p className="gw-desc">{variant.description}</p>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Hablar con Fleximy por WhatsApp. ${variant.cta}`}
              className="gw-cta"
              data-track={variant.action}
              onClick={handleClick}
            >
              <span className="gw-cta__icon"><WhatsAppGlyph /></span>
              <span className="gw-cta__label">{variant.cta}</span>
              <ArrowRight size={18} className="gw-cta__arrow" aria-hidden="true" />
            </a>

            <p className="gw-micro">{variant.microcopy}</p>
          </div>

          <div className="gw-chat-wrap">
            <ChatSurface variant={variant} />
          </div>
        </div>
      </div>
    </section>
  )
}
