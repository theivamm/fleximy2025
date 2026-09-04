import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  MessageCircle,
  Star,
  Menu,
  Calendar,
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { whatsappUrl } from "../data/config"
import { NFC_CONFIG, NFC_BUSINESS_CASES } from "../data/nfcConfig"
import { track } from "../lib/analytics"

/* ==========================================================================
   FLEXIMY NFC — LANDING DE SOLUCIONES NFC (ruta /soluciones/nfc)
   Rework visual y técnico definitivo.
   ========================================================================== */

export default function NfcSolution() {
  const { theme } = useTheme()
  const dark = theme !== "light"
  const [dest, setDest] = useState("review")
  const configRef = useRef(null)

  useEffect(() => {
    track("view_nfc_page")
  }, [])

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }
    const id = "nfc-faq-jsonld"
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement("script")
      el.id = id
      el.type = "application/ld+json"
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
    return () => { if (el) el.remove() }
  }, [])

  const pickDestination = (id) => {
    setDest(id)
    track("select_nfc_use_case", { use_case: id })
    configRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="nfc" style={vars(dark)}>
      <style>{css(dark)}</style>

      <Hero onPrimary={() => track("click_nfc_primary_cta", { cta: "hero" })} />

      <Friction />

      <Possibilities onPick={pickDestination} />

      <HowItWorks />

      <ConfigurableDestination activeDest={dest} setDest={setDest} sectionRef={configRef} />

      <Applications />

      <Scale />

      <Trust />

      <LeadForm />

      <Faq />
    </div>
  )
}

/* ==========================================================================
   MÓDULO 01 — HERO
   ========================================================================== */

const HERO_DESTINATIONS = [
  { id: "review", label: "Reseña de Google", verb: "RESEÑAS", icon: <Star size={14} fill="currentColor" />, screen: <ReviewScreen /> },
  { id: "whatsapp", label: "WhatsApp", verb: "PEDIDOS", icon: <MessageCircle size={14} />, screen: <WhatsappScreen /> },
  { id: "menu", label: "Menú digital", verb: "MENÚ", icon: <Menu size={20} />, screen: <MenuScreen /> },
  { id: "booking", label: "Reservar turno", verb: "RESERVAS", icon: <Calendar size={20} />, screen: <BookingScreen /> },
]

function Hero({ onPrimary }) {
  const [destIdx, setDestIdx] = useState(0)
  const [phase, setPhase] = useState("approach")
  const [moved, setMoved] = useState({ x: 0, y: 0 })
  const visualRef = useRef(null)
  const dest = HERO_DESTINATIONS[destIdx]

  useEffect(() => {
    const id = setInterval(() => {
      setDestIdx((i) => (i + 1) % HERO_DESTINATIONS.length)
      setPhase("approach")
    }, 3600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tap"), 700)
    const t2 = setTimeout(() => setPhase("opened"), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [destIdx])

  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      setMoved({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [])

  const scrollToForm = (e) => {
    e.preventDefault()
    document.querySelector("#nfc-form")?.scrollIntoView({ behavior: "smooth" })
    onPrimary()
  }

  return (
    <section className="nfc-hero">
      <div className="nfc-container--wide nfc-hero__grid">
        <div className="nfc-hero__copy">
          <p className="kicker">FLEXIMY NFC · DEL MUNDO FÍSICO AL DIGITAL</p>
          <h1 className="nfc-display nfc-hero__title font-display">
            Un toque. <span className="text-gradient">La acción que tu negocio necesita.</span>
          </h1>
          <p className="nfc-lead-para nfc-hero__desc">
            Tus clientes acercan el celular y llegan directo a tu reseña de Google,
            WhatsApp, menú, reservas, pagos o cualquier enlace que quieras activar.
          </p>
          <p className="nfc-hero__refuerzo">Sin aplicaciones. Sin buscar links. Sin explicar pasos.</p>
          <div className="nfc-hero__ctas">
            <a href="#nfc-form" onClick={scrollToForm} className="nfc-btn nfc-btn--primary">
              Quiero mi solución NFC <ArrowRight size={17} />
            </a>
            <a
              href="#nfc-posibilidades"
              onClick={(e) => { e.preventDefault(); document.querySelector("#nfc-posibilidades")?.scrollIntoView({ behavior: "smooth" }) }}
              className="nfc-btn nfc-btn--ghost"
            >
              Descubrir posibilidades
            </a>
          </div>
          <p className="nfc-hero__micro">NFC + QR · · Configurable · · Listo para usar</p>
        </div>

        <div className="nfc-hero__visual" ref={visualRef}>
          <div
            className="nfc-hero__scene"
            style={{ transform: `perspective(1200px) rotateX(${(moved.y - 0.5) * 3}deg) rotateY(${(moved.x - 0.5) * 3}deg)` }}
          >
            <div className="nfc-hero__glow" style={{ left: `${moved.x * 100}%`, top: `${moved.y * 100}%` }} aria-hidden="true" />
            <NfcPhysicalTag />
            <NfcPhone phase={phase} label={dest.label} icon={dest.icon}>{dest.screen}</NfcPhone>
          </div>
          <DestinationRotator verbs={HERO_DESTINATIONS.map((d) => d.verb)} />
        </div>
      </div>
    </section>
  )
}

function NfcPhysicalTag() {
  return (
    <div className="nfc-tag">
      <div className="nfc-tag__glow" aria-hidden="true" />
      <div className="nfc-tag__logo" aria-hidden="true">F</div>
      <div className="nfc-tag__text">
        <span>FLEXIMY</span>
        <strong>ACERCÁ TU CELULAR</strong>
      </div>
      <div className="nfc-tag__qr" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
          <rect x="13" y="13" width="3.5" height="3.5" rx="1" fill="currentColor" />
          <rect x="17.5" y="13" width="3.5" height="3.5" rx="1" fill="currentColor" />
          <rect x="13" y="17.5" width="3.5" height="3.5" rx="1" fill="currentColor" />
          <rect x="17.5" y="17.5" width="3.5" height="3.5" rx="1" fill="currentColor" />
        </svg>
      </div>
      <div className="nfc-tag__base" aria-hidden="true" />
    </div>
  )
}

function NfcPhone({ phase, label, icon, children }) {
  return (
    <div className={`nfc-phone nfc-phone--${phase}`}>
      <div className="nfc-waves" aria-hidden="true">
        <span className="nfc-wave nfc-wave--1" />
        <span className="nfc-wave nfc-wave--2" />
        <span className="nfc-wave nfc-wave--3" />
      </div>
      <div className="nfc-phone__frame">
        <div className="nfc-phone__notch" aria-hidden="true" />
        <div className="nfc-phone__screen">
          {phase === "opened" ? (
            <div className="nfc-phone__content">
              <div className="nfc-phone__confirm"><span className="nfc-phone__confirm-dot" />Enlace abierto</div>
              {children}
            </div>
          ) : (
            <div className="nfc-phone__idle"><span className="nfc-phone__idle-label">{icon}</span><span>{label}</span></div>
          )}
        </div>
        <div className="nfc-phone__home" aria-hidden="true" />
      </div>
    </div>
  )
}

function ReviewScreen() {
  return (
    <div className="mini mini--review">
      <div className="mini__head">
        <div className="mini__brand"><span className="mini__brand-logo">B</span><span className="mini__brand-name">BRUMA</span></div>
        <div className="mini__stars"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
      </div>
      <div className="mini__body">
        <div className="mini__rating">★★★★★</div>
        <div className="mini__field"><span className="mini__field-line">Muy buena atención y un café excelente.</span></div>
        <div className="mini__btn">Publicar reseña</div>
        <div className="mini__thank"><span className="mini__check">✓</span>Gracias por compartir tu experiencia</div>
      </div>
    </div>
  )
}

function WhatsappScreen() {
  return (
    <div className="mini mini--wa">
      <div className="mini__contact"><span className="mini__contact-ava" /><span className="mini__contact-name">Café BRUMA</span></div>
      <div className="mini__bubble">Hola, quiero hacer un pedido…</div>
      <div className="mini__bubble mini__bubble--reply">¡Hola! ¿Qué te ofrecemos hoy?</div>
      <div className="mini__btn mini__btn--wa"><MessageCircle size={11} />Iniciar conversación</div>
    </div>
  )
}

function MenuScreen() {
  return (
    <div className="mini mini--menu">
      <div className="mini__head">Menú del día</div>
      <div className="mini__dish"><span className="mini__dish-thumb" /><i><b>Flat White</b><em>Bebidas</em></i><span className="mini__dish-price">$2.900</span></div>
      <div className="mini__dish"><span className="mini__dish-thumb" /><i><b>Croissant</b><em>Bollería</em></i><span className="mini__dish-price">$3.800</span></div>
      <div className="mini__dish"><span className="mini__dish-thumb" /><i><b>Iced Matcha</b><em>Bebidas</em></i><span className="mini__dish-price">$3.500</span></div>
    </div>
  )
}

function BookingScreen() {
  return (
    <div className="mini mini--book">
      <div className="mini__head">Reservar turno</div>
      <div className="mini__cal">
        {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
          <span key={d} className={`mini__cal-d ${i === 4 ? "on" : ""} ${i === 3 ? "off" : ""}`}>{i === 3 ? "" : d}</span>
        ))}
      </div>
      <div className="mini__slots">
        <span className="mini__slot on">19:30</span>
        <span className="mini__slot">21:00</span>
      </div>
      <div className="mini__btn">Confirmar turno</div>
    </div>
  )
}

function DestinationRotator({ verbs }) {
  return (
    <p className="nfc-rotator font-mono" aria-hidden="true">
      Un toque para <span className="nfc-rotator__wrap"><span className="nfc-rotator__inner">{verbs.join(" · ")}  ·  </span></span>
    </p>
  )
}

/* ==========================================================================
   MÓDULO 02 — MENOS PASOS (fricción)
   ========================================================================== */

function Friction() {
  return (
    <section className="nfc-sec nfc-friction">
      <div className="nfc-container">
        <div className="nfc-friction__header">
          <h2 className="nfc-section-title font-display">Si es difícil encontrarlo, probablemente no suceda.</h2>
          <p className="nfc-lead-para nfc-friction__lead">
            Buscar el negocio, encontrar el WhatsApp, escribir o pedir el menú agrega pasos.
            Fleximy NFC convierte el momento exacto en una acción directa.
          </p>
        </div>

        <div className="nfc-friction__comp">
          <div className="nfc-path nfc-path--long" aria-label="Experiencia con pasos de sobra">
            <span className="nfc-path__tag font-mono">Demasiados pasos</span>
            <div className="nfc-path__steps">
              <span>Buscar</span><i className="nfc-path__sep">→</i>
              <span>Escribir</span><i className="nfc-path__sep">→</i>
              <span>Elegir</span><i className="nfc-path__sep">→</i>
              <span>Encontrar</span><i className="nfc-path__sep">→</i>
              <span>Actuar</span>
            </div>
          </div>
          <div className="nfc-path nfc-path--nfc" aria-label="Experiencia Fleximy NFC">
            <span className="nfc-path__tag font-mono">Una acción directa</span>
            <div className="nfc-path__steps nfc-path__steps--nfc">
              <span className="nfc-path__tap">Acercar</span>
              <i className="nfc-path__sep">→</i>
              <span className="nfc-path__done">Listo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULOS 03 + 04 — POSIBILIDADES + CASOS PRINCIPALES (misma sección)
   ========================================================================== */

const SECONDARY_ACTIONS = [
  "Pagos", "Promociones", "Redes sociales", "Wi-Fi", "Formularios",
  "Encuestas", "Eventos", "Contacto digital", "Catálogo PDF", "Fidelización",
]

const CASES = [
  {
    n: "01",
    eyebrow: "CASO 01",
    title: "Reseñas de Google",
    text: "Llevá a tus clientes directo al lugar donde pueden compartir su experiencia.",
    micro: "Más fácil de encontrar. Más fácil de completar.",
    dest: "review",
    demo: <ReviewCase />,
  },
  {
    n: "02",
    eyebrow: "CASO 02",
    title: "WhatsApp",
    text: "Abrí una conversación con un mensaje inicial preparado.",
    micro: "Consultas, pedidos o soporte.",
    dest: "whatsapp",
    demo: <WhatsappCase />,
  },
  {
    n: "03",
    eyebrow: "CASO 03",
    title: "Menú o catálogo",
    text: "Mostrá productos, servicios, precios o disponibilidad sin imprimir de nuevo.",
    micro: "Siempre actualizado.",
    dest: "menu",
    demo: <MenuCase />,
  },
  {
    n: "04",
    eyebrow: "CASO 04",
    title: "Turnos y reservas",
    text: "Llevá al cliente directamente al calendario o sistema de reservas.",
    micro: "Del interés al turno.",
    dest: "booking",
    demo: <BookingCase />,
  },
]

function Possibilities({ onPick }) {
  return (
    <section id="nfc-posibilidades" className="nfc-sec nfc-pos">
      <div className="nfc-container">
        <header className="nfc-pos__head">
          <p className="kicker">UN MISMO PRODUCTO. MUCHAS POSIBILIDADES.</p>
          <h2 className="nfc-section-title nfc-pos__title font-display">
            Hoy abre tus reseñas. Mañana, lo que necesites.
          </h2>
          <p className="nfc-lead-para nfc-pos__lead">
            El destino es configurable. Podés cambiarlo sin reemplazar el soporte NFC y
            adaptarlo a cada campaña, local o momento de tu negocio.
          </p>
          <p className="nfc-pos__claim font-mono">Cambia el enlace. El producto sigue siendo el mismo.</p>
        </header>

        <div className="nfc-cases">
          {CASES.map((c) => (
            <article key={c.n} className="nfc-case">
              <div className="nfc-case__top">
                <span className="nfc-case__num font-mono">{c.n}</span>
                <span className="nfc-case__eyebrow font-mono">{c.eyebrow}</span>
              </div>
              <h3 className="nfc-subsection-title nfc-case__title font-display">{c.title}</h3>
              <div className="nfc-case__body">
                <p className="nfc-case__text">{c.text}</p>
                <p className="nfc-case__micro">{c.micro}</p>
                {c.demo}
              </div>
              <button type="button" className="nfc-case__cta" onClick={() => onPick(c.dest)}>
                Ver función en vivo <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>

        <div className="nfc-more">
          <p className="nfc-more__label font-mono">También puede abrir</p>
          <ul className="nfc-more__list">
            {SECONDARY_ACTIONS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* --- Microinterfaces de los casos --- */
function ReviewCase() {
  return (
    <div className="demo demo--review" aria-hidden="true">
      <div className="demo__stars">★★★★★</div>
      <div className="demo__field"><span>Muy buena atención y un café excelente.</span></div>
      <div className="demo__btn">Publicar reseña</div>
      <div className="demo__ok"><span className="demo__check">✓</span>Gracias por compartir tu experiencia</div>
    </div>
  )
}
function WhatsappCase() {
  return (
    <div className="demo demo--wa" aria-hidden="true">
      <div className="demo__row"><span className="demo__ava" /><span className="demo__name">Café BRUMA</span></div>
      <div className="demo__bubble">Hola, quiero hacer un pedido…</div>
      <div className="demo__bubble demo__bubble--reply">¡Hola! ¿Te ayudo con tu pedido?</div>
      <div className="demo__btn demo__btn--wa"><MessageCircle size={11} />Iniciar conversación</div>
    </div>
  )
}
function MenuCase() {
  return (
    <div className="demo demo--menu" aria-hidden="true">
      <div className="demo__dish"><span className="demo__thumb" /><i><b>Flat White</b><em>Bebidas</em></i><span className="demo__price">$2.900</span></div>
      <div className="demo__dish"><span className="demo__thumb" /><i><b>Croissant</b><em>Bollería</em></i><span className="demo__price">$3.800</span></div>
      <div className="demo__dish"><span className="demo__thumb" /><i><b>Iced Matcha</b><em>Bebidas</em></i><span className="demo__price">$3.500</span></div>
    </div>
  )
}
function BookingCase() {
  return (
    <div className="demo demo--book" aria-hidden="true">
      <div className="demo__cal">
        {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
          <span key={d} className={`demo__cal-d ${i === 4 ? "on" : ""} ${i === 3 ? "off" : ""}`}>{i === 3 ? "" : d}</span>
        ))}
      </div>
      <div className="demo__slots">
        <span className="demo__slot on">19:30</span>
        <span className="demo__slot">21:00</span>
      </div>
      <div className="demo__btn">Confirmar turno</div>
    </div>
  )
}

/* ==========================================================================
   MÓDULO 05 — CÓMO FUNCIONA (proceso)
   ========================================================================== */

const STEPS = [
  { n: "01", t: "Elegís la acción", d: "Reseñas, WhatsApp, menú, turnos, pagos o cualquier enlace." },
  { n: "02", t: "Lo configuramos", d: "Programamos el destino, personalizamos la pieza y verificamos." },
  { n: "03", t: "Lo ubicás", d: "Mostrador, mesa, recepción, packaging, vidriera o donde decide." },
  { n: "04", t: "Lo actualizás", d: "Cambiás el enlace sin reemplazar el soporte físico." },
]

function HowItWorks() {
  return (
    <section className="nfc-sec nfc-how">
      <div className="nfc-container">
        <div className="nfc-how__head">
          <p className="kicker">LISTO PARA USAR</p>
          <h2 className="nfc-section-title font-display">Lo configuramos. Lo entregamos. Tus clientes lo usan.</h2>
        </div>

        <ol className="nfc-progress" aria-label="Proceso en cuatro pasos">
          {STEPS.map((s) => (
            <li key={s.n} className="nfc-progress__node">
              <span className="nfc-progress__dot" />
              <span className="nfc-progress__label font-mono">{s.n} · {s.t}</span>
            </li>
          ))}
        </ol>

        <div className="nfc-how__grid">
          {STEPS.map((s) => (
            <div key={s.n} className="nfc-step">
              <span className="nfc-step__num font-mono">{s.n}</span>
              <h3 className="nfc-step__title font-display">{s.t}</h3>
              <p className="nfc-step__desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 06 — DESTINO CONFIGURABLE
   ========================================================================== */

function ConfigurableDestination({ activeDest, setDest, sectionRef }) {
  const destinations = [
    { id: "review", label: "Reseñas de Google", Demo: ReviewScreen },
    { id: "whatsapp", label: "WhatsApp", Demo: WhatsappScreen },
    { id: "menu", label: "Menú digital", Demo: MenuScreen },
    { id: "booking", label: "Reservas", Demo: BookingScreen },
  ]
  const current = destinations.find((d) => d.id === activeDest)
  const Demo = current.Demo

  const handleSelect = (id) => {
    setDest(id)
    track("select_nfc_use_case", { use_case: id })
  }

  return (
    <section ref={sectionRef} className="nfc-sec nfc-config" id="nfc-configurable">
      <div className="nfc-container">
        <div className="nfc-config__grid">
          <div className="nfc-config__left">
            <p className="kicker">UN LINK QUE PUEDE CAMBIAR</p>
            <h2 className="nfc-section-title nfc-config__title font-display">
              La pieza queda. El destino evoluciona con tu negocio.
            </h2>
            <p className="nfc-lead-para nfc-config__lead">
              Usá el mismo soporte para una campaña, una promoción, un menú nuevo o una acción
              diferente. Actualizá el enlace sin imprimir, reprogramar ni reemplazar la pieza.
            </p>

            <p className="nfc-config__label font-mono">Destino activo</p>
            <p className="nfc-config__current"><span className="nfc-config__dot" />{current.label}</p>

            <div className="nfc-config__list" role="radiogroup" aria-label="Cambiar destino">
              {destinations.map((d) => (
                <label key={d.id} className={`nfc-config__opt ${activeDest === d.id ? "on" : ""}`}>
                  <input type="radio" name="nfc-dest" checked={activeDest === d.id} onChange={() => handleSelect(d.id)} />
                  <span className="nfc-config__radio" />
                  {d.label}
                </label>
              ))}
            </div>

            <button type="button" className="nfc-config__save" onClick={() => track("click_nfc_primary_cta", { cta: "guardar_cambio" })}>
              Guardar cambio
            </button>
            <p className="nfc-config__status"><span className="nfc-config__status-dot" />Estado: actualizado ahora</p>
          </div>

          <div className="nfc-config__right">
            <div className="nfc-config__scene">
              <NfcPhysicalTag />
              <div className="nfc-config__phone">
                <div className="nfc-config__phone-inner">
                  <div className="nfc-config__phone-head"><span className="nfc-config__phone-dot" />Enlace abierto</div>
                  <Demo />
                </div>
              </div>
            </div>
            <p className="nfc-config__comercial font-mono">› {NFC_CONFIG.destinationCopy}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 07 — APLICACIONES: rubros + formatos físicos (misma sección)
   ========================================================================== */

const FORMAT_CARDS = [
  { id: "contador", name: "Soporte de mostrador" },
  { id: "sticker", name: "Sticker NFC + QR" },
  { id: "tarjeta", name: "Tarjeta personal" },
  { id: "mesa", name: "Display de mesa" },
  { id: "vidriera", name: "Pieza para vidriera" },
  { id: "empleado", name: "Identificador de empleado" },
]
const SECONDARY_FORMAT = "Adhesivo para packaging"

function Applications() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % NFC_BUSINESS_CASES.length), 3200)
    return () => clearInterval(id)
  }, [])
  const c = NFC_BUSINESS_CASES[idx]
  const scrollToForm = (e) => {
    e.preventDefault()
    document.querySelector("#nfc-form")?.scrollIntoView({ behavior: "smooth" })
    track("click_nfc_primary_cta", { cta: "consultar_formatos" })
  }

  return (
    <section className="nfc-sec nfc-apps">
      <div className="nfc-container">
        <header className="nfc-apps__head">
          <p className="kicker">DONDE HAY UN CLIENTE, HAY UNA ACCIÓN</p>
          <h2 className="nfc-section-title nfc-apps__title font-display">
            Una solución diferente para cada negocio.
          </h2>
          <p className="nfc-lead-para nfc-apps__lead">
            Configuramos cada pieza según el lugar, el cliente y la acción que querés facilitar.
          </p>
        </header>

        <div className="nfc-rubros" aria-hidden="true">
          <div className="nfc-rubros__track">
            {[...NFC_BUSINESS_CASES, ...NFC_BUSINESS_CASES].map((b, i) => (
              <span key={i}>{b.rubro.toUpperCase()} · </span>
            ))}
          </div>
        </div>

        <div className="nfc-rubro-demo" aria-live="polite">
          <span className="nfc-rubro-demo__rubro font-mono">{c.rubro.toUpperCase()}</span>
          <span className="nfc-rubro-demo__arrow">→</span>
          <span className="nfc-rubro-demo__lugar">{c.lugar}</span>
          <span className="nfc-rubro-demo__arrow">→</span>
          <span className="nfc-rubro-demo__accion text-gradient">{c.accion}</span>
        </div>

        <div className="nfc-apps__formats">
          <div className="nfc-apps__formats-head">
            <h3 className="nfc-subsection-title nfc-apps__formats-title font-display">En el mostrador, la mesa, la vidriera.</h3>
            <p className="nfc-apps__formats-desc">
              Adaptamos la solución al espacio y al uso real de cada negocio. Cada pieza incluye NFC y un QR de respaldo.
            </p>
          </div>

          <div className="nfc-format-grid">
            {FORMAT_CARDS.map((f) => (
              <div key={f.id} className="nfc-format">
                <FormatScene scene={f.id} />
                <span className="nfc-format__name">{f.name}</span>
                <span className="nfc-format__badge font-mono">NFC + QR</span>
              </div>
            ))}
          </div>
          <p className="nfc-apps__secondary">
            + {SECONDARY_FORMAT} y otras piezas según tu idea.
          </p>

          <div className="nfc-apps__cta">
            <a href="#nfc-form" onClick={scrollToForm} className="nfc-btn nfc-btn--primary">
              Consultar formatos <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormatScene({ scene }) {
  return (
    <div className={`fmt fmt--${scene}`} aria-hidden="true">
      <span className="fmt__nfc">NFC</span>
      <span className="fmt__qr">▪▫▪<br />▫▪▫</span>
    </div>
  )
}

/* ==========================================================================
   MÓDULO 08 — ESCALA (propuesta comercial)
   ========================================================================== */

const SCALE = [
  {
    title: "Una acción",
    desc: "Para un punto específico del negocio.",
    points: ["Un destino", "Configuración inicial", "Personalización básica", "NFC + QR"],
  },
  {
    title: "Negocio",
    desc: "Para distintos momentos del mismo local.",
    points: ["Múltiples piezas", "Diferentes destinos", "Personalización de marca", "Soporte de configuración"],
    featured: true,
  },
  {
    title: "Multipunto",
    desc: "Para cadenas, franquicias y equipos.",
    points: ["Múltiples locales", "Estructura por sede o equipo", "Destinos configurables", "Implementación coordinada"],
  },
]

function Scale() {
  const scrollToForm = (e, title) => {
    e.preventDefault()
    document.querySelector("#nfc-form")?.scrollIntoView({ behavior: "smooth" })
    track("click_nfc_primary_cta", { cta: title })
  }
  return (
    <section className="nfc-sec nfc-scale">
      <div className="nfc-container">
        <div className="nfc-scale__head">
          <p className="kicker">EMPEZÁ CON UNA. ESCALÁ CUANDO QUIERAS.</p>
          <h2 className="nfc-section-title nfc-scale__title font-display">
            Una solución simple para un local. Una red para todos tus puntos de atención.
          </h2>
        </div>

        <div className="nfc-scale__grid">
          {SCALE.map((m) => (
            <a
              key={m.title}
              href="#nfc-form"
              onClick={(e) => scrollToForm(e, m.title)}
              className={`nfc-plan ${m.featured ? "nfc-plan--featured" : ""}`}
            >
              <span className="nfc-plan__eyebrow font-mono">{m.featured ? "RECOMENDADO" : "PARA EMPEZAR"}</span>
              <h3 className="nfc-subsection-title nfc-plan__title font-display">{m.title}</h3>
              <p className="nfc-plan__desc">{m.desc}</p>
              <ul className="nfc-plan__points">
                {m.points.map((p) => <li key={p}><span className="nfc-plan__check">✓</span>{p}</li>)}
              </ul>
              <span className="nfc-plan__cta">Consultar <ArrowRight size={15} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 09 — CONFIANZA TÉCNICA (compacto)
   ========================================================================== */

const TRUST = [
  "No requiere instalar una app.",
  "Funciona con NFC y QR de respaldo.",
  "El destino puede actualizarse.",
  "Se personaliza para el negocio.",
  "Puede implementarse por etapas.",
  "Sirve para una o múltiples ubicaciones.",
]

function Trust() {
  return (
    <section className="nfc-sec nfc-trust">
      <div className="nfc-container">
        <div className="nfc-trust__grid">
          <div>
            <p className="kicker">SIMPLE Y FLEXIBLE</p>
            <h2 className="nfc-section-title nfc-trust__title font-display">
              Tecnología simple para las personas. Flexible para tu negocio.
            </h2>
          </div>
          <ul className="nfc-trust__list">
            {TRUST.map((t) => <li key={t} className="nfc-trust__item"><span className="nfc-trust__check">✓</span>{t}</li>)}
          </ul>
        </div>
        <p className="nfc-trust__note">
          <strong>Compatible con la mayoría de los smartphones modernos.</strong> El QR permite
          acceder desde equipos sin NFC o con la función desactivada.
        </p>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 10 — CTA Y FORMULARIO (ancho completo)
   ========================================================================== */

function LeadForm() {
  const [form, setForm] = useState({
    nombre: "", negocio: "", whatsapp: "", email: "", rubro: "", puntos: "",
    acciones: [], descripcion: "", _hp: "",
  })
  const [errs, setErrs] = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [started, setStarted] = useState(false)

  const utms = useMemo(() => {
    const p = new URLSearchParams(window.location.search)
    return {
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
    }
  }, [])

  useEffect(() => {
    if (started) track("start_nfc_form")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  const ACTION_OPTIONS = [
    "Reseñas de Google", "WhatsApp", "Menú o catálogo", "Turnos o reservas",
    "Pagos", "Promociones", "Otra acción", "Todavía no lo tengo claro",
  ]

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (!started) setStarted(true)
    if (touched[k]) setErrs((er) => ({ ...er, [k]: validate(k, e.target.value, form.acciones) }))
  }
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    if (!started) setStarted(true)
    setErrs((er) => ({ ...er, [k]: validate(k, form[k], form.acciones) }))
  }

  const toggleAccion = (opt) => {
    const arr = form.acciones.includes(opt) ? form.acciones.filter((a) => a !== opt) : [...form.acciones, opt]
    setForm((f) => ({ ...f, acciones: arr }))
    if (!started) setStarted(true)
    setTouched((t) => ({ ...t, acciones: true }))
    setErrs((er) => ({ ...er, acciones: arr.length ? "" : "Elegí al menos una opción." }))
  }

  const validate = (k, val, acc) => {
    if (k === "acciones") return acc.length ? "" : "Elegí al menos una opción."
    if (!String(val).trim()) return "Este campo es obligatorio."
    if (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Ingresá un email válido."
    if (k === "whatsapp" && !/^\+?[\d\s\-()]{7,}$/.test(val)) return "Ingresá un número válido."
    return ""
  }

  const submit = (e) => {
    e.preventDefault()
    if (form._hp) return
    const keys = ["nombre", "negocio", "whatsapp", "email", "rubro", "puntos", "descripcion"]
    const all = {}
    keys.forEach((k) => { all[k] = validate(k, form[k], form.acciones) })
    all.acciones = validate("acciones", null, form.acciones)
    setErrs(all)
    setTouched(Object.fromEntries([...keys, "acciones"].map((k) => [k, true])))
    if (Object.values(all).some(Boolean)) return

    setSending(true)
    const to = NFC_CONFIG.formRecipient
    const subject = `Solución NFC — ${form.negocio}`
    const body = [
      `Nombre: ${form.nombre}`,
      `Negocio o empresa: ${form.negocio}`,
      `WhatsApp: ${form.whatsapp}`,
      `Email: ${form.email}`,
      `Rubro: ${form.rubro}`,
      `Cantidad de locales o puntos: ${form.puntos}`,
      ``,
      `Acciones a facilitar: ${form.acciones.join(", ")}`,
      ``,
      `Dónde le gustaría usarlo:`,
      form.descripcion,
      ``,
      utms.utm_source ? `UTM Source: ${utms.utm_source}` : "",
      utms.utm_medium ? `UTM Medium: ${utms.utm_medium}` : "",
      utms.utm_campaign ? `UTM Campaign: ${utms.utm_campaign}` : "",
    ].filter(Boolean).join("\n")

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, "_blank", "noopener,noreferrer")
    setSending(false)
    track("submit_nfc_form", { action: form.acciones.join("|") })
    setSuccess(true)
  }

  const field = (k, label, type = "text", attrs = {}) => (
    <label className="nfc-field">
      <span className="nfc-field__label">{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={touched[k] && !!errs[k]}
        aria-describedby={errs[k] ? `nfc-err-${k}` : undefined}
        {...attrs}
      />
      {touched[k] && errs[k] && <span className="nfc-field__error" id={`nfc-err-${k}`}>{errs[k]}</span>}
    </label>
  )

  const goWhatsapp = () => { track("click_nfc_whatsapp") }

  return (
    <section id="nfc-form" className="nfc-sec nfc-contact">
      <div className="nfc-container">
        <div className="nfc-contact__grid">
          <div className="nfc-contact__intro">
            <p className="kicker">ACERCÁ TU NEGOCIO A LA PRÓXIMA ACCIÓN</p>
            <h2 className="nfc-section-title nfc-contact__title font-display">
              Contanos qué querés que pase después del toque.
            </h2>
            <p className="nfc-lead-para nfc-contact__bajada">
              Reseñas, consultas, reservas, pagos o una idea completamente diferente.
              Diseñamos la solución alrededor de tu negocio.
            </p>
            <ul className="nfc-contact__benefits">
              <li><span className="nfc-contact__check">✓</span>Respuesta personalizada</li>
              <li><span className="nfc-contact__check">✓</span>Formato y configuración a tu medida</li>
              <li><span className="nfc-contact__check">✓</span>Sin permanencia obligatoria</li>
            </ul>
            <a
              href={whatsappUrl("Hola, llegué desde la página de soluciones NFC de Fleximy. Quiero contarte qué acción quiero facilitar.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={goWhatsapp}
              className="nfc-contact__wa"
            >
              <MessageCircle size={16} /> Prefiero contarlo por WhatsApp →
            </a>
          </div>

          <div className="nfc-contact__form">
            {success ? (
              <div className="nfc-success" role="status">
                <span className="nfc-success__check">✓</span>
                <h3 className="font-display">Gracias, {form.nombre.split(" ")[0]}. Recibimos tu consulta NFC.</h3>
                <p className="nfc-contact__bajada">Vamos a revisar tu caso y te contactaremos para definir el formato y la configuración indicada.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="nfc-contact__fields">
                  {field("nombre", "Nombre")}
                  {field("negocio", "Negocio o empresa")}
                  {field("whatsapp", "WhatsApp", "tel", { inputMode: "tel" })}
                  {field("email", "Email", "email", { inputMode: "email", autoComplete: "email" })}
                  {field("rubro", "Rubro")}
                  {field("puntos", "Cantidad de locales o puntos", "text", { inputMode: "numeric" })}
                </div>

                <fieldset className="nfc-fieldset">
                  <legend className="nfc-field__label">¿Qué querés facilitar?</legend>
                  <div className="nfc-chips">
                    {ACTION_OPTIONS.map((opt) => (
                      <button key={opt} type="button" onClick={() => toggleAccion(opt)} className={`nfc-chip ${form.acciones.includes(opt) ? "on" : ""}`} aria-pressed={form.acciones.includes(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {touched.acciones && errs.acciones && <span className="nfc-field__error">{errs.acciones}</span>}
                </fieldset>

                <label className="nfc-field nfc-field--area">
                  <span className="nfc-field__label">Contanos dónde te gustaría usarlo</span>
                  <textarea
                    value={form.descripcion}
                    onChange={set("descripcion")}
                    onBlur={blur("descripcion")}
                    rows={4}
                    maxLength={500}
                    placeholder="Por ejemplo: tenemos una cafetería y queremos colocar una pieza en cada mesa para abrir el menú y facilitar reseñas."
                    aria-invalid={touched.descripcion && !!errs.descripcion}
                    aria-describedby={errs.descripcion ? "nfc-err-desc" : undefined}
                  />
                  <span className="nfc-field__count">{form.descripcion.length}/500</span>
                  {touched.descripcion && errs.descripcion && <span className="nfc-field__error" id="nfc-err-desc">{errs.descripcion}</span>}
                </label>

                <input type="text" name="_hp" value={form._hp} onChange={set("_hp")} className="nfc-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {Object.entries(utms).map(([k, v]) => v ? <input key={k} type="hidden" name={k} value={v} /> : null)}

                <p className="nfc-consent">
                  Al enviar aceptás nuestra <Link to="/privacidad">Política de Privacidad</Link>.
                </p>

                <button type="submit" className="nfc-contact__submit" disabled={sending}>
                  {sending ? "Enviando…" : "Quiero mi solución NFC"}
                  {!sending && <ArrowRight size={16} />}
                </button>
                <p className="nfc-contact__micro">Te respondemos personalmente para definir el formato y la configuración indicada.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 11 — FAQ
   ========================================================================== */

const FAQS = [
  { q: "¿Qué es NFC?", a: "NFC es una tecnología que permite abrir información al acercar un celular compatible a una pieza configurada. También incluimos un QR como alternativa." },
  { q: "¿El cliente tiene que instalar una aplicación?", a: "No. Solo acerca el celular o escanea el QR y accede al destino configurado." },
  { q: "¿Puedo cambiar el enlace después?", a: "Sí. El destino puede actualizarse sin reemplazar la pieza física. El procedimiento dependerá de la modalidad contratada." },
  { q: "¿Sirve solamente para reseñas de Google?", a: "No. Puede abrir WhatsApp, menús, turnos, pagos, promociones, redes sociales, formularios o cualquier URL." },
  { q: "¿Funciona en todos los celulares?", a: "Funciona con la mayoría de los smartphones modernos. Para equipos sin NFC o con la función desactivada, la pieza incluye un QR." },
  { q: "¿Se puede personalizar con mi marca?", a: "Sí. Podemos adaptar la pieza al estilo, los colores y la acción de tu negocio según el formato elegido." },
  { q: "¿Puedo usar diferentes enlaces en distintas piezas?", a: "Sí. Un negocio puede utilizar destinos diferentes por local, mesa, empleado, producto o campaña." },
  { q: "¿La solución garantiza mejores posiciones en Google?", a: "No se garantizan posiciones. La solución facilita que más clientes lleguen a la ficha del negocio y puedan compartir una experiencia auténtica con menos pasos." },
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="nfc-sec nfc-faq">
      <div className="nfc-container--text">
        <header className="nfc-faq__head">
          <p className="kicker">DUDAS FRECUENTES</p>
          <h2 className="nfc-section-title nfc-faq__title font-display">Preguntas frecuentes</h2>
        </header>
        <div className="nfc-faq__list">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`nfc-faq__item ${open === i ? "open" : ""}`}>
              <button type="button" className="nfc-faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`nfc-faq-a-${i}`}>
                <span>{f.q}</span><span className="nfc-faq__toggle">+</span>
              </button>
              <p className="nfc-faq__a" id={`nfc-faq-a-${i}`} hidden={open !== i}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   CSS — tokens + estilos por tema
   ========================================================================== */

function vars(dark) {
  return {
    "--nfc-page": dark ? "#080b18" : "#f5f6fb",
    "--nfc-section": dark ? "#0b0f20" : "#fafbfe",
    "--nfc-card": dark ? "#10162a" : "#ffffff",
    "--nfc-interface": dark ? "#0c1122" : "#f0f2f8",
    "--nfc-border": dark ? "rgba(151,164,215,0.15)" : "rgba(39,48,84,0.12)",
    "--nfc-border-strong": dark ? "rgba(151,164,215,0.30)" : "rgba(39,48,84,0.20)",
    "--nfc-text": dark ? "#f3f5ff" : "#111527",
    "--nfc-muted": dark ? "#aeb6cc" : "#667087",
    "--nfc-faint": dark ? "#7f89a6" : "#8b93a8",
    "--nfc-violet": dark ? "#725cff" : "#5a50d8",
    "--nfc-blue": dark ? "#397bff" : "#3a6fe0",
    "--nfc-cyan": dark ? "#16d8d2" : "#009f95",
    "--nfc-rose": dark ? "#f06fae" : "#d94687",
    "--nfc-green": dark ? "#35d58a" : "#16855b",
    "--nfc-amber": dark ? "#ffb45e" : "#a86000",
    "--nfc-error": dark ? "#ff747f" : "#ba1a1a",
    "--nfc-soft-violet": dark ? "rgba(114,92,255,0.14)" : "rgba(90,80,216,0.10)",
    "--nfc-soft-cyan": dark ? "rgba(22,216,210,0.12)" : "rgba(0,159,149,0.08)",
    "--nfc-scene-shadow": dark ? "0 30px 80px rgba(0,0,0,0.5)" : "0 22px 55px rgba(39,48,84,0.12)",
    "--nfc-section-space": "clamp(36px, 3vw, 56px)",
    "--nfc-section-space-compact": "clamp(28px, 2.6vw, 48px)",
  }
}

function css(dark) {
  return `
  /* ===== BASE / CONTAINERS ===== */
  .nfc { position: relative; overflow: clip; background: var(--nfc-page); color: var(--nfc-text); }

  .nfc-container { width: min(1240px, calc(100% - 48px)); margin-inline: auto; min-width: 0; }
  .nfc-container--wide { width: min(1440px, calc(100% - 64px)); margin-inline: auto; min-width: 0; }
  .nfc-container--text { width: min(820px, calc(100% - 48px)); margin-inline: auto; min-width: 0; }

  .nfc-sec { padding-block: var(--nfc-section-space); position: relative; }
  .nfc-sec--compact { padding-block: var(--nfc-section-space-compact); }
  .nfc-display { font-size: clamp(54px, 6.1vw, 108px); line-height: 0.92; letter-spacing: -0.065em; text-wrap: balance; font-weight: 700; }
  .nfc-section-title { font-size: clamp(40px, 4.2vw, 68px); line-height: 0.98; letter-spacing: -0.052em; text-wrap: balance; font-weight: 700; }
  .nfc-subsection-title { font-size: clamp(28px, 2.5vw, 42px); line-height: 1.05; letter-spacing: -0.035em; }
  .nfc-lead-para { font-size: clamp(18px, 1.45vw, 22px); line-height: 1.55; color: var(--nfc-muted); }
  .kicker { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--nfc-cyan); margin: 0 0 14px; }

  /* ===== HERO ===== */
  .nfc-hero { min-height: calc(100svh - 72px); padding-block: clamp(60px, 8vh, 112px); display: flex; align-items: center; position: relative; }
  .nfc-hero__grid { display: grid; grid-template-columns: minmax(0, 0.92fr) minmax(480px, 1.08fr); gap: clamp(48px, 6vw, 96px); align-items: center; }
  .nfc-hero__copy { max-width: 620px; min-width: 0; }
  .nfc-hero__title { max-width: 650px; margin: 20px 0 24px; }
  .nfc-hero__desc { max-width: 620px; margin: 0 0 18px; }
  .nfc-hero__refuerzo { font-size: clamp(16px, 1.1vw, 18px); color: var(--nfc-green); font-weight: 600; margin: 0 0 30px; }
  .nfc-hero__ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 0 0 24px; }
  .nfc-hero__micro { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nfc-faint); margin: 0; }

  .nfc-btn { display: inline-flex; align-items: center; gap: 9px; height: 52px; padding: 0 26px; border-radius: 999px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: transform .22s, box-shadow .22s; }
  .nfc-btn--primary { color: #fff; background-image: var(--gradient-primary); box-shadow: 0 10px 30px rgba(90,76,255,0.28); }
  .nfc-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(90,76,255,0.4); }
  .nfc-btn--ghost { color: var(--nfc-text); border: 1px solid var(--nfc-border-strong); background: var(--nfc-card); }
  .nfc-btn--ghost:hover { transform: translateY(-2px); box-shadow: var(--nfc-scene-shadow); }

  .nfc-hero__visual { width: 100%; max-width: 720px; justify-self: end; min-width: 0; position: relative; }
  .nfc-hero__scene { position: relative; width: 100%; padding-top: 52%; display: grid; align-items: center; justify-items: center; transform-style: preserve-3d; transition: transform .1s linear; will-change: transform; }
  .nfc-hero__glow { position: absolute; width: 480px; height: 480px; border-radius: 50%; background: radial-gradient(circle, var(--nfc-soft-violet), transparent 60%); transform: translate(-50%,-50%); pointer-events: none; transition: left .3s, top .3s; opacity: .7; }

  .nfc-tag { position: relative; width: 220px; height: 320px; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 24px 16px 26px; border-radius: 20px; background: linear-gradient(160deg, ${dark ? "#1a2140" : "#ffffff"}, ${dark ? "#0f1430" : "#eef1f8"}); border: 1px solid var(--nfc-border-strong); box-shadow: var(--nfc-scene-shadow); }
  .nfc-tag__glow { position: absolute; inset: -18px; border-radius: 40px; background: radial-gradient(circle at 50% 30%, var(--nfc-soft-violet), transparent 65%); filter: blur(8px); z-index: -1; }
  .nfc-tag__logo { width: 48px; height: 48px; border-radius: 14px; background: var(--gradient-primary); display: grid; place-items: center; font-family: var(--font-display); font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 16px; }
  .nfc-tag__text { text-align: center; }
  .nfc-tag__text span { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; color: var(--nfc-faint); margin-bottom: 6px; }
  .nfc-tag__text strong { display: block; font-family: var(--font-display); font-size: 14px; letter-spacing: 0.02em; color: var(--nfc-text); line-height: 1.25; }
  .nfc-tag__qr { color: var(--nfc-text); margin: 16px 0 4px; opacity: .9; }
  .nfc-tag__base { position: absolute; bottom: -6px; width: 120px; height: 12px; border-radius: 999px; background: rgba(0,0,0,.25); filter: blur(6px); }

  .nfc-phone { position: absolute; right: 4%; top: 6%; z-index: 3; width: 200px; transition: transform .5s cubic-bezier(0.16,1,0.3,1); }
  .nfc-phone--approach { transform: translateX(0); }
  .nfc-phone--tap, .nfc-phone--opened { transform: translateX(-12px); }
  .nfc-phone__frame { border-radius: 28px; border: 2px solid var(--nfc-border-strong); background: ${dark ? "#0a0e1f" : "#0d1020"}; padding: 10px; box-shadow: 0 28px 60px rgba(0,0,0,.4); position: relative; }
  .nfc-phone__notch { position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 60px; height: 15px; border-radius: 999px; background: #000; z-index: 2; }
  .nfc-phone__screen { background: ${dark ? "#f4f6ff" : "#ffffff"}; color: #111426; border-radius: 19px; height: 380px; overflow: hidden; }
  .nfc-phone__content { padding: 30px 12px 12px; display: flex; flex-direction: column; gap: 9px; height: 100%; }
  .nfc-phone__confirm { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #16855b; border: 1px solid rgba(22,133,91,.25); background: rgba(22,133,91,.08); width: fit-content; padding: 4px 9px; border-radius: 999px; }
  .nfc-phone__confirm-dot { width: 7px; height: 7px; border-radius: 50%; background: #35d58a; }
  .nfc-phone__idle { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; height: 100%; color: #687088; font-size: 13px; font-weight: 500; }
  .nfc-phone__idle-label { font-size: 20px; color: #725cff; }
  .nfc-phone__home { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); width: 70px; height: 4px; border-radius: 999px; background: rgba(255,255,255,.35); }

  .nfc-waves { position: absolute; top: 50%; left: -48px; transform: translateY(-50%); pointer-events: none; }
  .nfc-wave { position: absolute; left: 0; top: 50%; transform: translateY(-50%) scale(.4); width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--nfc-blue); opacity: 0; }
  .nfc-phone--tap .nfc-wave, .nfc-phone--opened .nfc-wave { animation: nfcWave 1.6s ease-out infinite; }
  .nfc-wave--1 { animation-delay: 0s !important; }
  .nfc-wave--2 { animation-delay: .35s !important; }
  .nfc-wave--3 { animation-delay: .7s !important; }
  @keyframes nfcWave { 0% { opacity: 0; transform: translateY(-50%) scale(.35); } 25% { opacity: .9; } 100% { opacity: 0; transform: translateY(-50%) scale(1.8); } }

  .nfc-rotator { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-size: 13px; color: var(--nfc-muted); margin: 0; }
  .nfc-rotator__wrap { display: inline-block; overflow: hidden; vertical-align: top; color: var(--nfc-cyan); font-weight: 600; }
  .nfc-rotator__inner { display: inline-block; white-space: nowrap; animation: nfcTicker 16s linear infinite; }
  @keyframes nfcTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Microscreens (hero/config) */
  .mini { display: flex; flex-direction: column; gap: 8px; }
  .mini__head { display: flex; align-items: center; justify-content: space-between; padding: 4px; font-weight: 700; font-size: 11px; color: #111426; }
  .mini__brand { display: flex; align-items: center; gap: 5px; }
  .mini__brand-logo { width: 20px; height: 20px; border-radius: 5px; background: linear-gradient(135deg,#725cff,#16d8d2); display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; }
  .mini__brand-name { font-weight: 700; font-size: 10px; color: #111426; }
  .mini__stars { display: flex; gap: 1px; color: #ffb45e; }
  .mini__rating { font-size: 13px; color: #ffb45e; letter-spacing: 2px; }
  .mini__field { height: 40px; border-radius: 8px; background: #f0f2f7; border: 1px solid rgba(31,38,70,.1); display: flex; align-items: center; padding: 0 10px; font-size: 9px; color: #687088; }
  .mini__btn { height: 30px; display: grid; place-items: center; border-radius: 8px; background: linear-gradient(135deg,#725cff,#16d8d2); color: #fff; font-size: 10px; font-weight: 600; }
  .mini__btn--wa { display: flex; align-items: center; justify-content: center; gap: 5px; }
  .mini__thank { display: flex; align-items: center; gap: 5px; font-size: 9px; color: #16855b; }
  .mini__check { width: 13px; height: 13px; border-radius: 50%; background: #35d58a; color: #fff; display: grid; place-items: center; font-size: 8px; }
  .mini__bubble { background: #e9f5ef; color: #112720; padding: 8px 10px; border-radius: 10px 10px 10px 2px; font-size: 10px; max-width: 82%; }
  .mini__bubble--reply { background: #e8ebf5; color: #232a44; align-self: flex-end; border-radius: 10px 10px 2px 10px; }
  .mini__contact { display: flex; align-items: center; gap: 7px; }
  .mini__contact-ava { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg,#16d8d2,#397bff); }
  .mini__contact-name { font-size: 10px; font-weight: 600; color: #111426; }
  .mini__dish { display: flex; align-items: center; gap: 7px; border: 1px solid rgba(31,38,70,.1); border-radius: 8px; padding: 5px 8px; font-size: 9px; color: #111426; }
  .mini__dish-thumb { width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(135deg,#725cff,#16d8d2); opacity: .5; flex-shrink: 0; }
  .mini__dish i { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
  .mini__dish i b { font-size: 9px; }
  .mini__dish i em { font-style: normal; font-size: 8px; color: #687088; }
  .mini__dish em { font-style: normal; }
  .mini__dish-price { margin-left: auto; font-weight: 600; font-size: 9px; }
  .mini__cal { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .mini__cal-d { height: 20px; display: grid; place-items: center; font-size: 8px; color: #687088; background: #f0f2f7; border-radius: 4px; }
  .mini__cal-d.on { background: #725cff; color: #fff; }
  .mini__cal-d.off { opacity: .25; }
  .mini__slots { display: flex; gap: 6px; }
  .mini__slot { flex: 1; text-align: center; padding: 6px 0; border-radius: 7px; border: 1px solid rgba(31,38,70,.12); font-size: 10px; color: #687088; }
  .mini__slot.on { border-color: #725cff; background: rgba(114,92,255,.12); color: #725cff; font-weight: 600; }
  .mini__hour { font-size: 16px; font-weight: 700; color: #111426; }

  /* ===== MENOS PASOS ===== */
  .nfc-friction { background: var(--nfc-section); padding-block: var(--nfc-section-space-compact); }
  .nfc-friction__header { display: grid; grid-template-columns: minmax(0, 0.62fr) minmax(320px, 0.38fr); gap: 64px; align-items: end; margin-bottom: 60px; }
  .nfc-friction__lead { margin: 0; max-width: 46ch; }
  .nfc-friction__comp { margin-top: 0; display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: stretch; }
  .nfc-path { height: 188px; border: 1px solid var(--nfc-border); border-radius: 18px; padding: 26px 30px; background: var(--nfc-card); display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .nfc-path--long { }
  .nfc-path--nfc { border-color: var(--nfc-violet); background: var(--nfc-soft-violet); }
  .nfc-path__tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--nfc-faint); }
  .nfc-path--nfc .nfc-path__tag { color: var(--nfc-cyan); }
  .nfc-path__steps { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .nfc-path__steps span { padding: 9px 14px; border-radius: 999px; background: var(--nfc-interface); color: var(--nfc-muted); font-size: 14px; font-weight: 500; }
  .nfc-path--nfc .nfc-path__steps span { background: var(--nfc-card); color: var(--nfc-text); }
  .nfc-path__steps .nfc-path__done { background: var(--gradient-primary); color: #fff; }
  .nfc-path__steps .nfc-path__tap { border: 1px solid var(--nfc-green); color: var(--nfc-green); }
  .nfc-path__sep { color: var(--nfc-faint); font-style: normal; }

  /* ===== POSIBILIDADES + CASOS ===== */
  .nfc-pos { background: var(--nfc-page); }
  .nfc-pos__head { text-align: center; max-width: 900px; margin: 0 auto; }
  .nfc-pos__title { max-width: 900px; margin: 0 auto 20px; }
  .nfc-pos__lead { max-width: 720px; margin: 0 auto; }
  .nfc-pos__claim { margin-top: 20px; color: var(--nfc-violet); font-size: 13px; letter-spacing: 0.1em; }
  .nfc-pos__head { margin-bottom: clamp(40px, 4vw, 56px); }

  .nfc-cases { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
  .nfc-case { min-height: 400px; height: 100%; display: grid; grid-template-rows: auto auto 1fr auto; gap: 16px; padding: clamp(26px, 3vw, 38px); border: 1px solid var(--nfc-border); border-radius: 24px; background: var(--nfc-card); }
  .nfc-case__top { display: flex; align-items: center; justify-content: space-between; }
  .nfc-case__num { font-size: 12px; color: var(--nfc-faint); letter-spacing: 0.16em; }
  .nfc-case__eyebrow { font-size: 10px; letter-spacing: 0.18em; color: var(--nfc-cyan); }
  .nfc-case__title { font-size: clamp(24px, 2.2vw, 32px); margin: 0; }
  .nfc-case__body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
  .nfc-case__text { color: var(--nfc-muted); font-size: 15px; line-height: 1.5; margin: 0; max-width: 44ch; }
  .nfc-case__micro { color: var(--nfc-faint); font-size: 13px; margin: 0; }
  .nfc-case__cta { align-self: flex-start; display: inline-flex; align-items: center; gap: 7px; margin-top: auto; padding: 11px 18px; border-radius: 999px; border: 1px solid var(--nfc-border-strong); background: var(--nfc-interface); color: var(--nfc-text); font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; }
  .nfc-case__cta:hover { background: var(--nfc-soft-violet); border-color: var(--nfc-violet); }

  .demo { border: 1px solid var(--nfc-border); border-radius: 14px; background: var(--nfc-interface); padding: 14px; display: flex; flex-direction: column; gap: 9px; max-height: 170px; }
  .demo__stars { color: #ffb45e; letter-spacing: 2px; font-size: 15px; }
  .demo__field { height: 34px; border-radius: 8px; background: var(--nfc-card); border: 1px solid var(--nfc-border); display: flex; align-items: center; padding: 0 10px; font-size: 11px; color: var(--nfc-muted); }
  .demo__btn { height: 32px; display: grid; place-items: center; border-radius: 8px; background: var(--gradient-primary); color: #fff; font-size: 11px; font-weight: 600; }
  .demo__btn--wa { display: flex; align-items: center; justify-content: center; gap: 6px; }
  .demo__ok { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--nfc-green); }
  .demo__check { width: 15px; height: 15px; border-radius: 50%; background: var(--nfc-green); color: #fff; display: grid; place-items: center; font-size: 9px; }
  .demo__bubble { background: var(--nfc-soft-cyan); color: var(--nfc-text); padding: 9px 12px; border-radius: 10px 10px 10px 2px; font-size: 12px; max-width: 80%; }
  .demo__bubble--reply { background: var(--nfc-soft-violet); align-self: flex-end; border-radius: 10px 10px 2px 10px; }
  .demo__row { display: flex; align-items: center; gap: 8px; }
  .demo__ava { width: 24px; height: 24px; border-radius: 50%; background: var(--gradient-primary); }
  .demo__name { font-size: 12px; font-weight: 600; }
  .demo__dish { display: flex; align-items: center; gap: 8px; border: 1px solid var(--nfc-border); border-radius: 8px; padding: 6px 10px; font-size: 12px; background: var(--nfc-card); }
  .demo__thumb { width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg,#725cff,#16d8d2); opacity: .5; flex-shrink: 0; }
  .demo__dish i { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
  .demo__dish i b { font-size: 12px; color: var(--nfc-text); }
  .demo__dish i em { font-style: normal; font-size: 10px; color: var(--nfc-faint); }
  .demo__price { margin-left: auto; font-weight: 600; font-size: 12px; color: var(--nfc-text); }
  .demo__cal { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .demo__cal-d { height: 22px; display: grid; place-items: center; font-size: 10px; color: var(--nfc-muted); background: var(--nfc-card); border-radius: 4px; border: 1px solid var(--nfc-border); }
  .demo__cal-d.on { background: var(--nfc-violet); color: #fff; border-color: var(--nfc-violet); }
  .demo__cal-d.off { opacity: .3; }
  .demo__slots { display: flex; gap: 8px; }
  .demo__slot { flex: 1; text-align: center; padding: 7px 0; border-radius: 7px; border: 1px solid var(--nfc-border); font-size: 11px; color: var(--nfc-muted); background: var(--nfc-card); }
  .demo__slot.on { border-color: var(--nfc-violet); background: var(--nfc-soft-violet); color: var(--nfc-violet); font-weight: 600; }

  .nfc-more { margin-top: 48px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
  .nfc-more__label { font-size: 11px; letter-spacing: 0.14em; color: var(--nfc-faint); text-transform: uppercase; }
  .nfc-more__list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  .nfc-more__list li { font-size: 14px; color: var(--nfc-muted); background: var(--nfc-card); border: 1px solid var(--nfc-border); padding: 7px 14px; border-radius: 999px; }

  /* ===== CÓMO FUNCIONA ===== */
  .nfc-how { background: var(--nfc-section); }
  .nfc-how__head { max-width: 800px; margin-bottom: clamp(56px, 6vw, 72px); }
  .nfc-progress { list-style: none; margin: 0 0 clamp(56px, 6vw, 72px); padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); position: relative; height: 84px; }
  .nfc-progress::before { content: ""; position: absolute; top: 6px; left: 4%; right: 4%; height: 2px; background: linear-gradient(90deg, var(--nfc-violet), var(--nfc-cyan)); opacity: .5; }
  .nfc-progress__node { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
  .nfc-progress__dot { width: 14px; height: 14px; border-radius: 50%; background: var(--nfc-card); border: 3px solid var(--nfc-violet); box-shadow: 0 0 0 4px var(--nfc-soft-violet); z-index: 1; }
  .nfc-progress__label { font-size: 12px; letter-spacing: 0.08em; color: var(--nfc-muted); }
  .nfc-how__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
  .nfc-step { min-height: 220px; border: 1px solid var(--nfc-border); border-radius: 18px; padding: 28px; background: var(--nfc-card); display: flex; flex-direction: column; }
  .nfc-step__num { font-size: 13px; color: var(--nfc-violet); }
  .nfc-step__title { font-size: clamp(22px, 1.6vw, 26px); margin: 12px 0 10px; letter-spacing: -0.01em; }
  .nfc-step__desc { font-size: 15px; line-height: 1.55; color: var(--nfc-muted); margin: 0; }

  /* ===== CONFIGURABLE ===== */
  .nfc-config { padding-block: var(--nfc-section-space); }
  .nfc-config__grid { display: grid; grid-template-columns: minmax(0, 0.88fr) minmax(480px, 1.12fr); gap: clamp(48px, 6vw, 84px); align-items: center; }
  .nfc-config__title { max-width: 560px; }
  .nfc-config__lead { max-width: 52ch; margin-bottom: 34px; }
  .nfc-config__label { font-size: 11px; letter-spacing: 0.14em; color: var(--nfc-faint); text-transform: uppercase; margin: 0 0 12px; }
  .nfc-config__current { display: flex; align-items: center; gap: 9px; font-size: 18px; font-weight: 600; color: var(--nfc-text); margin: 0 0 24px; }
  .nfc-config__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--nfc-green); box-shadow: 0 0 0 4px var(--nfc-soft-cyan); }
  .nfc-config__list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  .nfc-config__opt { position: relative; display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--nfc-border); background: var(--nfc-card); color: var(--nfc-muted); cursor: pointer; font-size: 14px; font-weight: 500; transition: all .2s; }
  .nfc-config__opt input { position: absolute; opacity: 0; pointer-events: none; width: 100%; height: 100%; }
  .nfc-config__radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--nfc-border-strong); flex-shrink: 0; position: relative; }
  .nfc-config__opt.on { border-color: var(--nfc-violet); background: var(--nfc-soft-violet); color: var(--nfc-text); }
  .nfc-config__opt.on .nfc-config__radio { border-color: var(--nfc-violet); }
  .nfc-config__opt.on .nfc-config__radio::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--nfc-violet); }
  .nfc-config__save { height: 48px; width: 100%; border: none; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 26px rgba(90,76,255,0.26); transition: transform .2s; }
  .nfc-config__save:hover { transform: translateY(-2px); }
  .nfc-config__status { display: flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; color: var(--nfc-green); margin: 16px 0 0; }
  .nfc-config__status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--nfc-green); }
  .nfc-config__right { min-width: 0; }
  .nfc-config__scene { position: relative; display: flex; align-items: center; justify-content: center; gap: 28px; }
  .nfc-config__phone { width: 220px; border-radius: 28px; border: 2px solid var(--nfc-border-strong); background: ${dark ? "#0a0e1f" : "#0d1020"}; padding: 9px; box-shadow: 0 24px 60px rgba(0,0,0,.38); }
  .nfc-config__phone-inner { background: ${dark ? "#f4f6ff" : "#ffffff"}; color: #111426; border-radius: 20px; padding: 28px 12px 12px; display: flex; flex-direction: column; gap: 10px; min-height: 340px; }
  .nfc-config__phone-head { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #16855b; }
  .nfc-config__phone-dot { width: 7px; height: 7px; border-radius: 50%; background: #35d58a; }
  .nfc-config__comercial { text-align: center; font-size: 14px; color: var(--nfc-muted); margin-top: 24px; }

  /* ===== APLICACIONES (rubros + formatos) ===== */
  .nfc-apps { background: var(--nfc-section); }
  .nfc-apps__head { text-align: center; max-width: 760px; margin: 0 auto; }
  .nfc-apps__title { max-width: 760px; margin: 0 auto 20px; }
  .nfc-apps__lead { max-width: 620px; margin: 0 auto; }
  .nfc-rubros { overflow: hidden; margin: 48px 0 28px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .nfc-rubros__track { display: flex; white-space: nowrap; width: max-content; animation: rubrosMove 32s linear infinite; font-size: 12px; letter-spacing: 0.18em; color: var(--nfc-faint); font-family: var(--font-mono); }
  .nfc-rubros:hover .nfc-rubros__track { animation-play-state: paused; }
  @keyframes rubrosMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .nfc-rubros__track span { padding-right: 26px; }
  .nfc-rubro-demo { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 16px; padding: 26px 30px; max-height: 180px; border: 1px solid var(--nfc-border); border-radius: 20px; background: var(--nfc-card); margin-bottom: clamp(36px, 4vw, 52px); }
  .nfc-rubro-demo__rubro { font-size: 13px; letter-spacing: 0.14em; color: var(--nfc-muted); }
  .nfc-rubro-demo__arrow { color: var(--nfc-cyan); font-size: 20px; }
  .nfc-rubro-demo__lugar { font-size: clamp(20px, 2.4vw, 28px); font-weight: 700; color: var(--nfc-text); }
  .nfc-rubro-demo__accion { font-size: clamp(22px, 2.6vw, 30px); font-weight: 700; }

  .nfc-apps__formats-head { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 40px; align-items: end; margin-bottom: 20px; }
  .nfc-apps__formats-title { margin: 0; }
  .nfc-apps__formats-desc { color: var(--nfc-muted); font-size: 15px; line-height: 1.55; margin: 0; max-width: 48ch; }
  .nfc-format-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
  .nfc-format { min-height: 215px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; text-align: center; border: 1px solid var(--nfc-border); border-radius: 18px; padding: 20px; background: var(--nfc-card); }
  .nfc-format__name { font-size: 14px; font-weight: 600; color: var(--nfc-text); }
  .nfc-format__badge { font-size: 10px; letter-spacing: 0.1em; color: var(--nfc-cyan); border: 1px solid var(--nfc-border); padding: 3px 9px; border-radius: 999px; background: var(--nfc-interface); }
  .fmt { display: grid; place-items: center; gap: 4px; border: 1px solid var(--nfc-border-strong); border-radius: 14px; transform: rotateX(14deg) rotateZ(-6deg); background: linear-gradient(160deg, ${dark ? "#1a2140" : "#ffffff"}, ${dark ? "#0f1430" : "#eef1f8"}); box-shadow: var(--nfc-scene-shadow); }
  .fmt span { pointer-events: none; }
  .fmt--contador { width: 84px; height: 108px; border-radius: 13px; }
  .fmt--sticker { width: 80px; height: 80px; border-radius: 50%; }
  .fmt--tarjeta { width: 110px; height: 66px; border-radius: 11px; }
  .fmt--mesa { width: 120px; height: 52px; border-radius: 15px; }
  .fmt--vidriera { width: 88px; height: 116px; border-radius: 9px; }
  .fmt--empleado { width: 64px; height: 96px; border-radius: 999px 999px 12px 12px; }
  .fmt__nfc { font-family: var(--font-mono); font-size: 15px; font-weight: 600; color: var(--nfc-violet); }
  .fmt__qr { font-size: 12px; line-height: 1.1; color: var(--nfc-text); opacity: .8; text-align: center; }
  .nfc-apps__secondary { text-align: center; font-size: 14px; color: var(--nfc-muted); margin: 22px 0 0; }
  .nfc-apps__cta { display: flex; justify-content: center; margin-top: 32px; }

  /* ===== ESCALA ===== */
  .nfc-scale { background: var(--nfc-page); }
  .nfc-scale__head { max-width: 820px; margin-bottom: clamp(48px, 5vw, 64px); }
  .nfc-scale__title { max-width: 820px; }
  .nfc-scale__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; align-items: stretch; }
  .nfc-plan { min-height: 430px; display: flex; flex-direction: column; gap: 16px; border: 1px solid var(--nfc-border); border-radius: 22px; padding: clamp(26px, 3vw, 34px); background: var(--nfc-card); text-decoration: none; color: var(--nfc-text); transition: box-shadow .22s, border-color .22s; }
  .nfc-plan:hover { border-color: var(--nfc-border-strong); box-shadow: var(--nfc-scene-shadow); }
  .nfc-plan--featured { border-color: var(--nfc-violet); background: var(--nfc-soft-violet); }
  .nfc-plan__eyebrow { font-size: 10px; letter-spacing: 0.16em; color: var(--nfc-faint); text-transform: uppercase; }
  .nfc-plan__title { font-size: clamp(26px, 2vw, 30px); margin: 0; }
  .nfc-plan__desc { color: var(--nfc-muted); font-size: 15px; margin: 0; }
  .nfc-plan__points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .nfc-plan__points li { display: flex; align-items: center; gap: 9px; font-size: 15px; color: var(--nfc-muted); }
  .nfc-plan__check { color: var(--nfc-green); font-weight: 700; }
  .nfc-plan__cta { margin-top: auto; display: inline-flex; align-items: center; gap: 7px; color: var(--nfc-cyan); font-weight: 600; font-size: 15px; }

  /* ===== CONFIANZA ===== */
  .nfc-trust { background: var(--nfc-section); padding-block: var(--nfc-section-space-compact); }
  .nfc-trust__grid { display: grid; grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr); gap: 72px; align-items: center; }
  .nfc-trust__title { max-width: 22ch; margin-bottom: 28px; }
  .nfc-trust__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .nfc-trust__item { display: flex; align-items: center; gap: 11px; color: var(--nfc-muted); font-size: 15px; padding: 18px 18px; border: 1px solid var(--nfc-border); border-radius: 12px; background: var(--nfc-card); }
  .nfc-trust__check { color: var(--nfc-green); font-weight: 700; }
  .nfc-trust__note { margin: 28px auto 0; max-width: 720px; text-align: center; color: var(--nfc-muted); font-size: 14px; line-height: 1.6; }
  .nfc-trust__note strong { color: var(--nfc-text); font-weight: 600; }

  /* ===== FORMULARIO ===== */
  .nfc-contact { background: var(--nfc-page); }
  .nfc-contact__grid { display: grid; grid-template-columns: minmax(300px, 0.72fr) minmax(0, 1.28fr); gap: clamp(56px, 7vw, 104px); align-items: start; }
  .nfc-contact__title { max-width: 14ch; }
  .nfc-contact__bajada { margin: 20px 0 0; max-width: 46ch; }
  .nfc-contact__benefits { list-style: none; margin: 28px 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .nfc-contact__benefits li { display: flex; align-items: center; gap: 10px; color: var(--nfc-muted); font-size: 15px; }
  .nfc-contact__check { color: var(--nfc-green); font-weight: 700; }
  .nfc-contact__wa { display: inline-flex; align-items: center; gap: 8px; color: var(--nfc-cyan); font-size: 15px; text-decoration: none; font-weight: 600; }
  .nfc-contact__wa:hover { opacity: .8; }
  .nfc-contact__form { border: 1px solid var(--nfc-border); border-radius: 24px; padding: clamp(40px, 4.5vw, 48px); background: var(--nfc-card); }
  .nfc-contact__fields { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .nfc-field { display: flex; flex-direction: column; gap: 7px; }
  .nfc-field--area { margin-top: 18px; position: relative; }
  .nfc-field__label { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nfc-muted); }
  .nfc-field input, .nfc-field textarea { width: 100%; height: 54px; background: var(--nfc-interface); border: 1px solid var(--nfc-border-strong); border-radius: 12px; padding: 0 16px; font-size: 15px; color: var(--nfc-text); outline: none; transition: border-color .25s, box-shadow .25s; min-width: 0; }
  .nfc-field textarea { height: auto; min-height: 150px; padding: 14px 16px; resize: vertical; }
  .nfc-field input::placeholder, .nfc-field textarea::placeholder { color: var(--nfc-faint); }
  .nfc-field input:focus, .nfc-field textarea:focus { border-color: var(--nfc-violet); box-shadow: 0 0 0 3px var(--nfc-soft-violet); }
  .nfc-field input[aria-invalid="true"], .nfc-field textarea[aria-invalid="true"] { border-color: var(--nfc-error); }
  .nfc-field__error { font-size: 12px; color: var(--nfc-error); }
  .nfc-field__count { font-size: 11px; color: var(--nfc-faint); position: absolute; bottom: 10px; right: 14px; }
  .nfc-fieldset { border: none; margin: 22px 0 0; padding: 0; min-width: 0; }
  .nfc-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
  .nfc-chip { border: 1px solid var(--nfc-border-strong); border-radius: 999px; padding: 9px 16px; font-size: 13px; color: var(--nfc-muted); background: var(--nfc-interface); cursor: pointer; transition: all .2s; }
  .nfc-chip.on { border-color: var(--nfc-violet); background: var(--nfc-soft-violet); color: var(--nfc-text); }
  .nfc-chip:hover { border-color: var(--nfc-violet); }
  .nfc-hp { position: absolute; left: -9999px; opacity: 0; height: 0; }
  .nfc-consent { font-size: 12px; color: var(--nfc-faint); margin: 18px 0 0; }
  .nfc-consent a { color: var(--nfc-cyan); text-decoration: underline; }
  .nfc-contact__submit { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 18px; height: 56px; width: 100%; border: none; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 30px rgba(90,76,255,0.28); transition: transform .22s, box-shadow .22s; }
  .nfc-contact__submit:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(90,76,255,0.4); }
  .nfc-contact__submit:disabled { opacity: .7; cursor: not-allowed; }
  .nfc-contact__micro { font-size: 12px; color: var(--nfc-faint); margin: 14px 0 0; text-align: center; }
  .nfc-success { text-align: center; padding: clamp(24px, 4vw, 48px); }
  .nfc-success__check { display: inline-grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: var(--nfc-green); color: #fff; font-size: 26px; margin-bottom: 18px; }
  .nfc-success h3 { font-size: clamp(24px, 2.4vw, 32px); letter-spacing: -0.02em; margin: 0 0 14px; }
  .nfc-success p { font-size: 15px; }

  /* ===== FAQ ===== */
  .nfc-faq { background: var(--nfc-section); padding-block: var(--nfc-section-space-compact); }
  .nfc-faq__head { text-align: center; max-width: 900px; margin: 0 auto clamp(40px, 5vw, 56px); }
  .nfc-faq__title { max-width: 900px; margin: 0 auto; }
  .nfc-faq__list { max-width: 900px; margin-inline: auto; display: flex; flex-direction: column; gap: 10px; }
  .nfc-faq__item { border: 1px solid var(--nfc-border); border-radius: 14px; background: var(--nfc-card); }
  .nfc-faq__q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; background: transparent; border: none; color: var(--nfc-text); font-size: 16px; font-weight: 600; text-align: left; cursor: pointer; }
  .nfc-faq__toggle { color: var(--nfc-cyan); font-size: 24px; line-height: 1; width: 24px; height: 24px; display: grid; place-items: center; transition: transform .25s; }
  .nfc-faq__item.open .nfc-faq__toggle { transform: rotate(45deg); }
  .nfc-faq__a { padding: 0 22px 18px; margin: 0; color: var(--nfc-muted); font-size: 14px; line-height: 1.6; max-width: 70ch; }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1599px) {
    .nfc-format-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 1279px) {
    .nfc-hero__grid { grid-template-columns: minmax(0, 0.9fr) minmax(400px, 1.1fr); gap: 48px; }
    .nfc-how__grid { grid-template-columns: repeat(2, 1fr); }
    .nfc-progress { grid-template-columns: repeat(2, 1fr); height: auto; gap: 24px; }
    .nfc-progress::before { display: none; }
    .nfc-config__grid { grid-template-columns: 1fr; align-items: start; }
    .nfc-config__right { max-width: 720px; margin-inline: auto; width: 100%; }
    .nfc-format-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .nfc-scale__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .nfc-scale__grid .nfc-plan { min-height: 0; }
  }
  @media (max-width: 1023px) {
    .nfc-hero { padding-block: 48px 72px; }
    .nfc-hero__grid { grid-template-columns: 1fr; }
    .nfc-hero__visual { max-width: 620px; margin-inline: auto; justify-self: center; }
    .nfc-friction__header { grid-template-columns: 1fr; gap: 20px; align-items: start; }
    .nfc-friction__lead { max-width: 56ch; }
    .nfc-friction__comp { grid-template-columns: 1fr; }
    .nfc-cases { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .nfc-case { min-height: 0; }
    .nfc-apps__formats-head { grid-template-columns: 1fr; gap: 16px; }
    .nfc-format-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .nfc-scale__grid { grid-template-columns: 1fr; }
    .nfc-trust__grid { grid-template-columns: 1fr; gap: 32px; }
    .nfc-contact__grid { grid-template-columns: 1fr; gap: 48px; }
  }
  @media (max-width: 767px) {
    .nfc-container, .nfc-container--wide, .nfc-container--text { width: min(calc(100% - 40px), 560px); }
    .nfc-sec { padding-block: var(--nfc-section-space-compact); }
    .nfc-display { font-size: clamp(48px, 11vw, 62px); }
    .nfc-section-title { font-size: clamp(38px, 9vw, 48px); }
    .nfc-hero__ctas { flex-direction: column; align-items: stretch; }
    .nfc-btn { justify-content: center; }
    .nfc-hero__visual { max-width: 460px; }
    .nfc-hero__scene { padding-top: 64%; }
    .nfc-phone { width: 172px; }
    .nfc-phone__screen { height: 330px; }
    .nfc-tag { width: 190px; height: 280px; }
    .nfc-tag__logo { width: 42px; height: 42px; }
    .nfc-cases { grid-template-columns: 1fr; }
    .nfc-case { min-height: 0; }
    .nfc-progress { grid-template-columns: 1fr; gap: 16px; }
    .nfc-how__grid { grid-template-columns: 1fr; }
    .nfc-step { min-height: 0; }
    .nfc-config__list { grid-template-columns: 1fr; }
    .nfc-config__scene { flex-direction: column; gap: 36px; }
    .nfc-format-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .nfc-trust__list { grid-template-columns: 1fr; }
    .nfc-contact__fields { grid-template-columns: 1fr; }
    .nfc-rotator { font-size: 11px; }
  }
  @media (max-width: 400px) {
    .nfc-phone { display: none; }
    .nfc-config__phone { display: none; }
  }

  /* ===== REDUCED MOTION ===== */
  @media (prefers-reduced-motion: reduce) {
    .nfc-phone--approach, .nfc-phone--tap, .nfc-phone--opened { transform: none; }
    .nfc-wave, .nfc-phone--tap .nfc-wave, .nfc-phone--opened .nfc-wave { animation: none; opacity: .6; }
    .nfc-rotator__inner { animation: none; white-space: normal; }
    .nfc-rubros__track { animation: none; }
  }
  `
}
