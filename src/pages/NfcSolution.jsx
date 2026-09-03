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
import { NFC_CONFIG, NFC_FORMATS, NFC_BUSINESS_CASES } from "../data/nfcConfig"
import { track } from "../lib/analytics"

/* ==========================================================================
   FLEXIMY NFC — LANDING DE SOLUCIONES NFC (ruta /soluciones/nfc)
   ========================================================================== */

export default function NfcSolution() {
  const { theme } = useTheme()
  const dark = theme !== "light"

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

  const trackPrimary = (label) => () => {
    track("click_nfc_primary_cta", { cta: label })
  }

  return (
    <div className="nfc" style={vars(dark)}>
      <style>{css(dark)}</style>

      <Hero onPrimary={trackPrimary("hero")} />

      <FrictionComparison />

      <MoreThanReviews />

      <ActionBento />

      <HowItWorks />

      <ConfigurableDestination />

      <BusinessCases />

      <PhysicalFormats />

      <CommercialOptions />

      <TrustBenefits />

      <LeadForm />

      <NfcFaq />
    </div>
  )
}

/* ==========================================================================
   MÓDULO 01 — HERO
   ========================================================================== */

const HERO_DESTINATIONS = [
  {
    id: "review",
    label: "Reseña de Google",
    verb: "RESEÑAS",
    tag: "Tu negocio",
    icon: <Star size={14} fill="currentColor" />,
    screen: <ReviewScreen />,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    verb: "PEDIDOS",
    tag: "Conversación",
    icon: <MessageCircle size={14} />,
    screen: <WhatsappScreen />,
  },
  {
    id: "menu",
    label: "Menú digital",
    verb: "MENÚ",
    tag: "Tu menú",
    icon: <Menu size={22} />,
    screen: <MenuScreen />,
  },
  {
    id: "booking",
    label: "Reservar turno",
    verb: "RESERVAS",
    tag: "Tu calendario",
    icon: <Calendar size={22} />,
    screen: <BookingScreen />,
  },
]

function Hero({ onPrimary }) {
  const [destIdx, setDestIdx] = useState(0)
  const [phase, setPhase] = useState("approach") // approach -> tap -> opened
  const [moved, setMoved] = useState({ x: 0, y: 0 })
  const visualRef = useRef(null)

  const dest = HERO_DESTINATIONS[destIdx]

  // Loop de destinos: cada 3.2s cambia el caso de uso.
  useEffect(() => {
    const id = setInterval(() => {
      setDestIdx((i) => (i + 1) % HERO_DESTINATIONS.length)
      setPhase("approach")
    }, 3600)
    return () => clearInterval(id)
  }, [])

  // Fases del toque dentro de cada destino.
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tap"), 700)
    const t2 = setTimeout(() => setPhase("opened"), 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [destIdx])

  // Glow reactivo al mouse (no táctil, no reduced-motion).
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      setMoved({ x, y })
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section className="nfc-hero">
      <div className="nfc-hero__grid container-wide">
        <div className="nfc-hero__copy">
          <p className="kicker">FLEXIMY NFC · DEL MUNDO FÍSICO AL DIGITAL</p>
          <h1 className="nfc-hero__title font-display">
            Un toque. <br />
            <span className="text-gradient">La acción que tu negocio necesita.</span>
          </h1>
          <p className="nfc-hero__desc">
            Tus clientes acercan el celular y llegan directo a tu reseña de Google,
            WhatsApp, menú, reservas, pagos o cualquier enlace que quieras activar.
          </p>
          <p className="nfc-hero__refuerzo">
            Sin aplicaciones. Sin buscar links. Sin explicar pasos.
          </p>
          <div className="nfc-hero__ctas">
            <a
              href="#nfc-form"
              onClick={(e) => { e.preventDefault(); document.querySelector("#nfc-form")?.scrollIntoView({ behavior: "smooth" }); onPrimary() }}
              className="nfc-btn nfc-btn--primary"
            >
              Quiero mi solución NFC
              <ArrowRight size={17} />
            </a>
            <a
              href="#nfc-posibilidades"
              onClick={(e) => { e.preventDefault(); document.querySelector("#nfc-posibilidades")?.scrollIntoView({ behavior: "smooth" }) }}
              className="nfc-btn nfc-btn--ghost"
            >
              Descubrir posibilidades
            </a>
          </div>
          <p className="nfc-hero__micro">NFC + QR · Configurable · Listo para usar</p>
        </div>

        <div className="nfc-hero__visual" ref={visualRef}>
          <div
            className="nfc-hero__scene"
            style={{
              transform: `perspective(1200px) rotateX(${(moved.y - 0.5) * 3}deg) rotateY(${(moved.x - 0.5) * 3}deg)`,
            }}
          >
            <div className="nfc-hero__glow" style={{ left: `${moved.x * 100}%`, top: `${moved.y * 100}%` }} aria-hidden="true" />

            {/* Soporte NFC */}
            <NfcPhysicalTag />

            {/* Teléfono */}
            <NfcPhone
              phase={phase}
              label={dest.label}
              icon={dest.icon}
            >
              {dest.screen}
            </NfcPhone>
          </div>

          {/* Tipografía animada */}
          <DestinationRotator verbs={HERO_DESTINATIONS.map((d) => d.verb)} />
        </div>
      </div>
    </section>
  )
}

/* --- Soporte NFC físico (CSS) --- */
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
        <svg viewBox="0 0 24 24" width="34" height="34">
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

/* --- Ondas NFC + teléfono --- */
function NfcPhone({ phase, label, icon, children }) {
  return (
    <div className={`nfc-phone nfc-phone--${phase}`}>
      {/* Ondas NFC */}
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
              <div className="nfc-phone__confirm">
                <span className="nfc-phone__confirm-dot" />
                Enlace abierto
              </div>
              {children}
            </div>
          ) : (
            <div className="nfc-phone__idle">
              <span className="nfc-phone__idle-label">{icon}</span>
              <span>{label}</span>
            </div>
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
        <div className="mini__brand">
          <span className="mini__brand-logo">B</span>
          <span className="mini__brand-name">BRUMA</span>
        </div>
        <div className="mini__stars">
          <Star size={10} fill="currentColor" />
          <Star size={10} fill="currentColor" />
          <Star size={10} fill="currentColor" />
          <Star size={10} fill="currentColor" />
          <Star size={10} fill="currentColor" />
        </div>
      </div>
      <div className="mini__body">
        <div className="mini__rating">★★★★★</div>
        <div className="mini__field" />
        <div className="mini__btn">Publicar reseña</div>
        <div className="mini__thank">
          <span className="mini__check">✓</span> Gracias por compartir tu experiencia
        </div>
      </div>
    </div>
  )
}

function WhatsappScreen() {
  return (
    <div className="mini mini--wa">
      <div className="mini__bubble">Hola, quiero consultar…</div>
      <div className="mini__contact">
        <span className="mini__contact-ava" />
        <span className="mini__contact-name">Café BRUMA</span>
      </div>
      <div className="mini__btn mini__btn--wa">
        <MessageCircle size={11} /> Iniciar conversación
      </div>
    </div>
  )
}

function MenuScreen() {
  return (
    <div className="mini mini--menu">
      <div className="mini__head">Menú</div>
      <div className="mini__dish"><span>Flat White</span><span className="mini__dish-price">$2.900</span><em>Disponible</em></div>
      <div className="mini__dish"><span>Croissant Pistacho</span><span className="mini__dish-price">$3.800</span><em>Disponible</em></div>
      <div className="mini__dish"><span>Iced Matcha</span><span className="mini__dish-price">$3.500</span><em>Disponible</em></div>
    </div>
  )
}

function BookingScreen() {
  return (
    <div className="mini mini--book">
      <div className="mini__head">Reservar turno</div>
      <div className="mini__cal">
        {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
          <span key={d} className={i === 4 ? "mini__cal-d on" : "mini__cal-d"}>{d}</span>
        ))}
      </div>
      <div className="mini__hour">19:30</div>
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
   MÓDULO 02 — EL PROBLEMA (fricción)
   ========================================================================== */

function FrictionComparison() {
  return (
    <section className="nfc-sec nfc-friction">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">MENOS PASOS. MÁS ACCIONES.</p>
          <h2 className="nfc-h2 font-display">Si es difícil encontrarlo, probablemente no suceda.</h2>
          <p className="nfc-lead">
            Buscar el negocio en Google, encontrar el WhatsApp, escribir una dirección o
            pedir el menú agrega pasos. Fleximy NFC convierte el momento exacto en una acción directa.
          </p>
        </div>

        <div className="nfc-friction__cols">
          <div className="nfc-path nfc-path--long">
            <span className="nfc-path__tag">Demasiados pasos</span>
            <div className="nfc-path__steps">
              <span>Buscar</span>
              <span>Escribir</span>
              <span>Elegir</span>
              <span>Encontrar</span>
              <span>Actuar</span>
            </div>
          </div>
          <div className="nfc-path nfc-path--nfc">
            <span className="nfc-path__tag">Una acción directa</span>
            <div className="nfc-path__steps">
              <span className="nfc-path__tap">Acercar</span>
              <span className="nfc-path__done">Listo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 03 — MUCHO MÁS QUE RESEÑAS
   ========================================================================== */

function MoreThanReviews() {
  return (
    <section id="nfc-mas" className="nfc-sec nfc-more">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">UN MISMO PRODUCTO. MUCHAS POSIBILIDADES.</p>
          <h2 className="nfc-h2 font-display">Hoy abre tus reseñas. Mañana, lo que necesites.</h2>
          <p className="nfc-lead">
            El destino es configurable. Podés cambiarlo sin reemplazar el soporte NFC y
            adaptarlo a cada campaña, local o momento de tu negocio.
          </p>
          <p className="nfc-more__refuerzo font-mono">Cambia el enlace. El producto sigue siendo el mismo.</p>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 04 — ACTION BENTO
   ========================================================================== */

const SECONDARY_ACTIONS = [
  "Pagos", "Promociones", "Redes sociales", "Wi-Fi", "Formularios",
  "Encuestas", "Eventos", "Contacto digital", "Catálogo PDF", "Fidelización",
]

function ActionBento() {
  return (
    <section id="nfc-posibilidades" className="nfc-sec nfc-bento">
      <div className="container">
        <div className="nfc-bento__grid">
          <BentoCard className="nfc-card--review" title="Reseñas de Google" eyebrow="CASO 01" onSelect="review">
            <p className="nfc-card__text">
              Llevá a tus clientes directo al lugar donde pueden compartir su experiencia.
            </p>
            <p className="nfc-card__micro">Más fácil de encontrar. Más fácil de completar.</p>
            <ReviewDemo />
          </BentoCard>

          <BentoCard className="nfc-card--wa" title="WhatsApp" eyebrow="CASO 02" onSelect="whatsapp">
            <p className="nfc-card__text">
              Abrí una conversación con un mensaje inicial preparado.
            </p>
            <p className="nfc-card__micro">Consultas, pedidos o soporte.</p>
            <WhatsappDemo />
          </BentoCard>

          <BentoCard className="nfc-card--menu" title="Menú o catálogo" eyebrow="CASO 03" onSelect="menu">
            <p className="nfc-card__text">
              Mostrá productos, servicios, precios o disponibilidad sin imprimir de nuevo.
            </p>
            <p className="nfc-card__micro">Siempre actualizado.</p>
            <MenuDemo />
          </BentoCard>

          <BentoCard className="nfc-card--book" title="Turnos y reservas" eyebrow="CASO 04" onSelect="booking">
            <p className="nfc-card__text">
              Llevá al cliente directamente al calendario o sistema de reservas.
            </p>
            <p className="nfc-card__micro">Del interés al turno.</p>
            <BookingDemo />
          </BentoCard>
        </div>

        <div className="nfc-bento__secondary">
          <span className="nfc-bento__secondary-label font-mono">También puede abrir</span>
          <ul className="nfc-bento__secondary-list">
            {SECONDARY_ACTIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function BentoCard({ className, title, eyebrow, onSelect, children }) {
  return (
    <article className={`nfc-card ${className}`}>
      <div className="nfc-card__top">
        <span className="nfc-card__eyebrow font-mono">{eyebrow}</span>
        <h3 className="nfc-card__title font-display">{title}</h3>
      </div>
      {children}
      <button type="button" className="nfc-card__select" onClick={() => track("select_nfc_use_case", { use_case: onSelect })}>
        Ver cómo funciona <ArrowRight size={14} />
      </button>
    </article>
  )
}

/* --- Microinterfaces CSS del bento --- */
function ReviewDemo() {
  return (
    <div className="demo demo--review" aria-hidden="true">
      <div className="demo__stars">★★★★★</div>
      <div className="demo__box demo__box--area" />
      <div className="demo__btn">Publicar reseña</div>
      <div className="demo__ok"><span className="demo__check">✓</span> Gracias por compartir tu experiencia</div>
    </div>
  )
}
function WhatsappDemo() {
  return (
    <div className="demo demo--wa" aria-hidden="true">
      <div className="demo__bubble">Hola, quiero consultar…</div>
      <div className="demo__row">
        <span className="demo__ava" />
        <span className="demo__name">Café BRUMA</span>
      </div>
      <div className="demo__btn demo__btn--wa">Iniciar conversación</div>
    </div>
  )
}
function MenuDemo() {
  return (
    <div className="demo demo--menu" aria-hidden="true">
      <div className="demo__dish"><span>Flat White</span><b>$2.900</b></div>
      <div className="demo__dish"><span>Croissant</span><b>$3.800</b></div>
      <div className="demo__dish"><span>Iced Matcha</span><b>$3.500</b></div>
    </div>
  )
}
function BookingDemo() {
  return (
    <div className="demo demo--book" aria-hidden="true">
      <div className="demo__cal">L M X J V S D</div>
      <div className="demo__hour">19:30</div>
      <div className="demo__btn">Confirmar turno</div>
    </div>
  )
}

/* ==========================================================================
   MÓDULO 05 — CÓMO FUNCIONA
   ========================================================================== */

const STEPS = [
  { n: "01", t: "Elegís la acción", d: "Reseñas, WhatsApp, menú, turnos, pagos o cualquier enlace." },
  { n: "02", t: "Lo configuramos", d: "Programamos el destino, personalizamos la pieza y verificamos el funcionamiento." },
  { n: "03", t: "Lo ubicás en tu negocio", d: "Mostrador, mesa, recepción, packaging, vidriera o donde sucede la decisión." },
  { n: "04", t: "Lo actualizás cuando quieras", d: "Cambiás el enlace sin reemplazar el soporte físico." },
]

function HowItWorks() {
  return (
    <section className="nfc-sec nfc-how">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">LISTO PARA USAR</p>
          <h2 className="nfc-h2 font-display">Lo configuramos. Lo entregamos. Tus clientes lo usan.</h2>
          <p className="nfc-lead">Nos decís qué acción querés facilitar y preparamos la solución completa para tu negocio.</p>
        </div>

        <div className="nfc-how__assembly font-mono">
          <span>DESTINO</span><i className="nfc-how__arrow">→</i>
          <span>CONFIGURACIÓN</span><i className="nfc-how__arrow">→</i>
          <span>SOPORTE NFC</span><i className="nfc-how__arrow">→</i>
          <span>ACCIÓN</span>
        </div>

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
   MÓDULO 06 — CONFIGURABLE
   ========================================================================== */

function ConfigurableDestination() {
  const [active, setActive] = useState("review")
  const destinations = [
    { id: "review", label: "Reseñas de Google", Demo: ReviewScreen },
    { id: "whatsapp", label: "WhatsApp", Demo: WhatsappScreen },
    { id: "menu", label: "Menú digital", Demo: MenuScreen },
    { id: "booking", label: "Reservas", Demo: BookingScreen },
  ]
  const current = destinations.find((d) => d.id === active)
  const Demo = current.Demo

  const handleSelect = (id) => {
    setActive(id)
    track("select_nfc_use_case", { use_case: id })
  }

  return (
    <section className="nfc-sec nfc-config">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">UN LINK QUE PUEDE CAMBIAR</p>
          <h2 className="nfc-h2 font-display">La pieza queda. El destino evoluciona con tu negocio.</h2>
          <p className="nfc-lead">
            Usá el mismo soporte para una campaña, una promoción, un menú nuevo o una acción
            diferente. Actualizá el enlace sin imprimir, reprogramar ni reemplazar la pieza.
          </p>
        </div>

        <div className="nfc-config__layout">
          {/* Panel de configuración */}
          <div className="nfc-config__panel">
            <p className="nfc-config__panel-label font-mono">Destino activo</p>
            <p className="nfc-config__current">
              <span className="nfc-config__dot" /> {destinations.find((d) => d.id === active)?.label}
            </p>
            <p className="nfc-config__panel-label nfc-config__panel-label--mt font-mono">Cambiar destino</p>
            <div className="nfc-config__list" role="radiogroup" aria-label="Cambiar destino">
              {destinations.map((d) => (
                <label key={d.id} className={`nfc-config__opt ${active === d.id ? "on" : ""}`}>
                  <input type="radio" name="nfc-dest" checked={active === d.id} onChange={() => handleSelect(d.id)} />
                  <span className="nfc-config__radio" />
                  {d.label}
                </label>
              ))}
            </div>
            <button type="button" className="nfc-config__save" onClick={() => track("click_nfc_primary_cta", { cta: "guardar_cambio" })}>
              Guardar cambio
            </button>
            <p className="nfc-config__status">
              <span className="nfc-config__status-dot" /> Estado: actualizado ahora
            </p>
          </div>

          {/* Pieza física + teléfono */}
          <div className="nfc-config__scene">
            <NfcPhysicalTag />
            <div className="nfc-config__phone">
              <div className="nfc-config__phone-inner">
                <div className="nfc-config__phone-head">
                  <span className="nfc-config__phone-dot" /> Enlace abierto
                </div>
                <Demo />
              </div>
            </div>
          </div>
        </div>

        <p className="nfc-config__comercial font-mono">
          › {NFC_CONFIG.destinationCopy}
        </p>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 07 — PARA CADA NEGOCIO
   ========================================================================== */

function BusinessCases() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % NFC_BUSINESS_CASES.length), 3200)
    return () => clearInterval(id)
  }, [])
  const c = NFC_BUSINESS_CASES[idx]

  return (
    <section className="nfc-sec nfc-cases">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">DONDE HAY UN CLIENTE, HAY UNA ACCIÓN</p>
          <h2 className="nfc-h2 font-display">Una solución diferente para cada negocio.</h2>
          <p className="nfc-lead">Configuramos cada pieza según el lugar, el cliente y la acción que querés facilitar.</p>
        </div>

        <div className="nfc-cases__marquee font-mono" aria-hidden="true">
          {NFC_BUSINESS_CASES.map((b) => (
            <span key={b.rubro}>{b.rubro.toUpperCase()} ·</span>
          ))}
        </div>

        <div className="nfc-cases__scene" aria-live="polite">
          <span className="nfc-cases__rubro font-mono">{c.rubro.toUpperCase()}</span>
          <span className="nfc-cases__arrow">→</span>
          <span className="nfc-cases__lugar">{c.lugar}</span>
          <span className="nfc-cases__arrow">→</span>
          <span className="nfc-cases__accion text-gradient">{c.accion}</span>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 08 — FORMATOS FÍSICOS
   ========================================================================== */

const FORMAT_DATA = [
  { id: "contador", name: "Soporte de mostrador", scene: "contador" },
  { id: "sticker", name: "Sticker NFC + QR", scene: "sticker" },
  { id: "tarjeta", name: "Tarjeta personal", scene: "tarjeta" },
  { id: "mesa", name: "Display de mesa", scene: "mesa" },
  { id: "vidriera", name: "Pieza para vidriera", scene: "vidriera" },
  { id: "empleado", name: "Identificador de empleado", scene: "empleado" },
  { id: "packaging", name: "Adhesivo para packaging", scene: "packaging" },
]

function PhysicalFormats() {
  return (
    <section className="nfc-sec nfc-formats">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">HECHO PARA ESTAR DONDE SUCEDE LA ACCIÓN</p>
          <h2 className="nfc-h2 font-display">En el mostrador, la mesa, la vidriera o en manos de tu equipo.</h2>
          <p className="nfc-lead">Adaptamos la solución al espacio y al uso real de cada negocio.</p>
        </div>

        <div className="nfc-formats__stage" role="list" aria-label="Formatos físicos">
          {FORMAT_DATA.map((f) => {
            const meta = NFC_FORMATS.find((x) => x.id === f.id)
            return (
              <div key={f.id} className="nfc-pedestal" role="listitem">
                <div className="nfc-pedestal__piece">
                  <FormatScene scene={f.scene} />
                </div>
                <span className="nfc-pedestal__name">{f.name}</span>
                <span className="nfc-pedestal__status">
                  {meta?.available ? "Disponible" : "Consultar"}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FormatScene({ scene }) {
  return (
    <div className={`fmt fmt--${scene}`} aria-hidden="true">
      <span className="fmt__nfc">NFC</span>
      <span className="fmt__qr">▪▫▪<br/>▫▪▫</span>
    </div>
  )
}

/* ==========================================================================
   MÓDULO 09 — PROPUESTA COMERCIAL
   ========================================================================== */

const COMMERCIAL = [
  {
    title: "Una acción",
    desc: "Para un punto específico del negocio.",
    points: ["Un destino", "Configuración inicial", "Personalización básica", "NFC + QR"],
    cta: "Quiero empezar",
  },
  {
    title: "Negocio",
    desc: "Para distintos momentos del mismo local.",
    points: ["Múltiples piezas", "Diferentes destinos", "Personalización de marca", "Soporte de configuración"],
    cta: "Armar mi solución",
    featured: true,
  },
  {
    title: "Multipunto",
    desc: "Para cadenas, franquicias y equipos.",
    points: ["Múltiples locales", "Estructura por sede o equipo", "Destinos configurables", "Implementación coordinada"],
    cta: "Solicitar propuesta",
  },
]

function CommercialOptions() {
  return (
    <section className="nfc-sec nfc-commercial">
      <div className="container">
        <div className="nfc-sec__head">
          <p className="kicker">EMPEZÁ CON UNA. ESCALÁ CUANDO QUIERAS.</p>
          <h2 className="nfc-h2 font-display">Una solución simple para un local. Una red para todos tus puntos de atención.</h2>
          <p className="nfc-lead">
            Podés comenzar con una acción puntual o implementar diferentes destinos para
            locales, mesas, vendedores, productos o campañas.
          </p>
        </div>

        <div className="nfc-commercial__grid">
          {COMMERCIAL.map((m) => (
            <a
              key={m.title}
              href="#nfc-form"
              onClick={(e) => { e.preventDefault(); document.querySelector("#nfc-form")?.scrollIntoView({ behavior: "smooth" }); track("click_nfc_primary_cta", { cta: m.title }) }}
              className={`nfc-plan ${m.featured ? "nfc-plan--featured" : ""}`}
            >
              <h3 className="nfc-plan__title font-display">{m.title}</h3>
              <p className="nfc-plan__desc">{m.desc}</p>
              <ul className="nfc-plan__points">
                {m.points.map((p) => <li key={p}><span className="nfc-plan__check">✓</span>{p}</li>)}
              </ul>
              <span className="nfc-plan__cta">{m.cta} <ArrowRight size={15} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 10 — CONFIANZA
   ========================================================================== */

const TRUST = [
  "No requiere instalar una app.",
  "Funciona con NFC y QR de respaldo.",
  "El destino puede actualizarse.",
  "Se personaliza para el negocio.",
  "Puede implementarse por etapas.",
  "Sirve para una o múltiples ubicaciones.",
]

function TrustBenefits() {
  return (
    <section className="nfc-sec nfc-trust">
      <div className="container">
        <div className="nfc-sec__head nfc-sec__head--center">
          <h2 className="nfc-h2 font-display">Tecnología simple para las personas. Flexible para tu negocio.</h2>
        </div>
        <div className="nfc-trust__grid">
          {TRUST.map((t) => <div key={t} className="nfc-trust__item"><span className="nfc-trust__check">✓</span>{t}</div>)}
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
   MÓDULO 11 — CTA Y FORMULARIO
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

  return (
    <section id="nfc-form" className="nfc-sec nfc-lead">
      <div className="container">
        <div className="nfc-lead__wrap">
          <div className="nfc-lead__left">
            <p className="kicker">ACERCÁ TU NEGOCIO A LA PRÓXIMA ACCIÓN</p>
            <h2 className="nfc-h2 font-display">Contanos qué querés que pase después del toque.</h2>
            <p className="nfc-lead__bajada">
              Reseñas, consultas, reservas, pagos o una idea completamente diferente.
              Diseñamos la solución alrededor de tu negocio.
            </p>
            <a
              href={whatsappUrl("Hola, llegué desde la página de soluciones NFC de Fleximy. Quiero contarte qué acción quiero facilitar.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("click_nfc_whatsapp")}
              className="nfc-lead__wa"
            >
              <MessageCircle size={16} /> Prefiero contarlo por WhatsApp →
            </a>
          </div>

          <div className="nfc-lead__right">
            {success ? (
              <div className="nfc-success" role="status">
                <span className="nfc-success__check">✓</span>
                <h3 className="font-display">Gracias, {form.nombre.split(" ")[0]}. Recibimos tu consulta NFC.</h3>
                <p className="nfc-lead__bajada">Vamos a revisar tu caso y te contactaremos para definir el formato y la configuración indicada.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-live="polite">
                <div className="nfc-lead__grid">
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
                    rows={3}
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

                <button type="submit" className="nfc-lead__submit" disabled={sending}>
                  {sending ? "Enviando…" : "Quiero mi solución NFC"}
                  {!sending && <ArrowRight size={16} />}
                </button>
                <p className="nfc-lead__micro">Te respondemos personalmente para definir el formato y la configuración indicada para tu negocio.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   MÓDULO 12 — FAQ
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

function NfcFaq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="nfc-sec nfc-faq">
      <div className="container">
        <div className="nfc-sec__head nfc-sec__head--center">
          <h2 className="nfc-h2 font-display">Preguntas frecuentes</h2>
        </div>
        <div className="nfc-faq__list">
          {FAQS.map((f, i) => (
            <div key={f.q} className="nfc-faq__item">
              <button type="button" className="nfc-faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`nfc-faq-a-${i}`}>
                <span>{f.q}</span><span className="nfc-faq__toggle">+</span>
              </button>
              {open === i && <p className="nfc-faq__a" id={`nfc-faq-a-${i}`}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   CSS — vars + estilos por tema
   ========================================================================== */

function vars(dark) {
  return {
    "--nfc-canvas": dark ? "#090b17" : "#f6f7fc",
    "--nfc-surface": dark ? "#101426" : "#ffffff",
    "--nfc-surface-2": dark ? "#171c31" : "#eef1f8",
    "--nfc-surface-3": dark ? "#202640" : "#e6eaf4",
    "--nfc-border": dark ? "rgba(174,184,225,0.15)" : "rgba(31,38,70,0.11)",
    "--nfc-border-strong": dark ? "rgba(174,184,225,0.26)" : "rgba(31,38,70,0.18)",
    "--nfc-text": dark ? "#f5f7ff" : "#111426",
    "--nfc-muted": dark ? "#a5aec8" : "#687088",
    "--nfc-faint": dark ? "#7d87a3" : "#9aa1b4",
    "--nfc-violet": dark ? "#725cff" : "#5a50d8",
    "--nfc-blue": dark ? "#397bff" : "#3a6fe0",
    "--nfc-cyan": dark ? "#16d8d2" : "#009f95",
    "--nfc-rose": dark ? "#f06fae" : "#d94687",
    "--nfc-green": dark ? "#35d58a" : "#16855b",
    "--nfc-amber": dark ? "#ffb45e" : "#a86000",
    "--nfc-error": dark ? "#ff747f" : "#ba1a1a",
    "--nfc-success": dark ? "#35d58a" : "#16855b",
    "--nfc-soft-violet": dark ? "rgba(114,92,255,0.14)" : "rgba(90,80,216,0.10)",
    "--nfc-soft-cyan": dark ? "rgba(22,216,210,0.12)" : "rgba(0,159,149,0.08)",
    "--nfc-scene-shadow": dark ? "0 40px 110px rgba(0,0,0,0.5)" : "0 30px 80px rgba(31,38,70,0.14)",
  }
}

function css(dark) {
  return `
  /* ===== BASE ===== */
  .nfc { position: relative; overflow: clip; background: var(--nfc-canvas); color: var(--nfc-text); }

  .nfc-sec { padding-block: clamp(72px, 8vw, 132px); position: relative; }
  .nfc-sec__head { max-width: 820px; margin: 0 0 clamp(40px, 5vw, 64px); }
  .nfc-sec__head--center { margin-inline: auto; text-align: center; }
  .nfc-h2 { font-size: clamp(34px, 4.3vw, 62px); line-height: 1.02; letter-spacing: -0.045em; margin: 18px 0 22px; max-width: 20ch; text-wrap: balance; }
  .nfc-sec__head--center .nfc-h2 { margin-inline: auto; }
  .nfc-lead { font-size: clamp(16px, 1.25vw, 19px); line-height: 1.6; color: var(--nfc-muted); max-width: 56ch; margin: 0; }

  /* ===== HERO ===== */
  .nfc-hero { min-height: calc(100svh - var(--header-height)); display: flex; align-items: center; padding-block: clamp(40px, 5vw, 72px); position: relative; overflow: hidden; }
  .nfc-hero__grid { display: grid; grid-template-columns: minmax(460px, 0.9fr) minmax(540px, 1.1fr); align-items: center; gap: clamp(40px, 5vw, 84px); width: 100%; }
  .nfc-hero__copy { max-width: 620px; }
  .nfc-hero__title { font-size: clamp(52px, 5.4vw, 92px); line-height: 0.94; letter-spacing: -0.06em; font-weight: 700; margin: 22px 0 22px; max-width: 12ch; text-wrap: balance; }
  .nfc-hero__desc { font-size: clamp(17px, 1.35vw, 20px); line-height: 1.55; color: var(--nfc-muted); max-width: 46ch; margin: 0 0 14px; }
  .nfc-hero__refuerzo { font-size: clamp(15px, 1.1vw, 17px); color: var(--nfc-cyan); font-weight: 600; margin: 0 0 28px; }
  .nfc-hero__ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 0 0 22px; }
  .nfc-hero__micro { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nfc-faint); margin: 0; }

  .nfc-btn { display: inline-flex; align-items: center; gap: 9px; height: 52px; padding: 0 26px; border-radius: 999px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: transform .22s, box-shadow .22s; }
  .nfc-btn--primary { color: #fff; background-image: var(--gradient-primary); box-shadow: 0 10px 30px rgba(90,76,255,0.32); }
  .nfc-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(90,76,255,0.44); }
  .nfc-btn--ghost { color: var(--nfc-text); border: 1px solid var(--nfc-border-strong); background: transparent; }
  .nfc-btn--ghost:hover { transform: translateY(-2px); background: var(--nfc-surface-2); }

  /* Hero visual */
  .nfc-hero__visual { width: min(100%, 780px); aspect-ratio: 1.18/1; justify-self: end; min-width: 0; position: relative; }
  .nfc-hero__scene { position: relative; width: 100%; height: 100%; display: grid; align-items: center; justify-items: center; transform-style: preserve-3d; transition: transform .1s linear; will-change: transform; }
  .nfc-hero__glow { position: absolute; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, var(--nfc-soft-violet), transparent 60%); transform: translate(-50%,-50%); pointer-events: none; transition: left .3s, top .3s; opacity: .7; }

  /* Soporte NFC */
  .nfc-tag { position: relative; width: 250px; height: 360px; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 26px 18px 30px; border-radius: 22px; background: linear-gradient(160deg, ${dark ? "#1a2140" : "#ffffff"}, ${dark ? "#0f1430" : "#eef1f8"}); border: 1px solid var(--nfc-border-strong); box-shadow: var(--nfc-scene-shadow); }
  .nfc-tag__glow { position: absolute; inset: -20px; border-radius: 40px; background: radial-gradient(circle at 50% 30%, var(--nfc-soft-violet), transparent 65%); filter: blur(8px); z-index: -1; }
  .nfc-tag__logo { width: 54px; height: 54px; border-radius: 16px; background: var(--gradient-primary); display: grid; place-items: center; font-family: var(--font-display); font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 18px; }
  .nfc-tag__text { text-align: center; }
  .nfc-tag__text span { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; color: var(--nfc-faint); margin-bottom: 6px; }
  .nfc-tag__text strong { display: block; font-family: var(--font-display); font-size: 15px; letter-spacing: 0.02em; color: var(--nfc-text); line-height: 1.25; }
  .nfc-tag__qr { color: var(--nfc-text); margin: 18px 0 6px; opacity: .9; }
  .nfc-tag__base { position: absolute; bottom: -6px; width: 130px; height: 14px; border-radius: 999px; background: rgba(0,0,0,.25); filter: blur(6px); }

  /* Teléfono + ondas */
  .nfc-phone { position: absolute; right: 2%; top: 8%; z-index: 3; width: 220px; transition: transform .5s cubic-bezier(0.16,1,0.3,1); }
  .nfc-phone--approach { transform: translateX(0); }
  .nfc-phone--tap { transform: translateX(-14px); }
  .nfc-phone--opened { transform: translateX(-14px); }
  .nfc-phone__frame { border-radius: 30px; border: 2px solid var(--nfc-border-strong); background: ${dark ? "#0a0e1f" : "#0d1020"}; padding: 10px; box-shadow: 0 30px 70px rgba(0,0,0,.45); position: relative; }
  .nfc-phone__notch { position: absolute; top: 16px; left: 50%; transform: translateX(-50%); width: 66px; height: 16px; border-radius: 999px; background: #000; z-index: 2; }
  .nfc-phone__screen { background: ${dark ? "#f4f6ff" : "#ffffff"}; color: #111426; border-radius: 20px; height: 420px; overflow: hidden; }
  .nfc-phone__content { padding: 34px 14px 14px; display: flex; flex-direction: column; gap: 10px; height: 100%; }
  .nfc-phone__confirm { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #16855b; border: 1px solid rgba(22,133,91,.25); background: rgba(22,133,91,.08); width: fit-content; padding: 4px 9px; border-radius: 999px; }
  .nfc-phone__confirm-dot { width: 7px; height: 7px; border-radius: 50%; background: #35d58a; }
  .nfc-phone__idle { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; height: 100%; color: #687088; font-size: 13px; font-weight: 500; }
  .nfc-phone__idle-label { font-size: 22px; color: #725cff; }
  .nfc-phone__home { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); width: 78px; height: 4px; border-radius: 999px; background: rgba(255,255,255,.35); }

  /* Ondas NFC */
  .nfc-waves { position: absolute; top: 50%; left: -54px; transform: translateY(-50%); pointer-events: none; }
  .nfc-wave { position: absolute; left: 0; top: 50%; transform: translateY(-50%) scale(.4); width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--nfc-blue); opacity: 0; }
  .nfc-phone--tap .nfc-wave, .nfc-phone--opened .nfc-wave { animation: nfcWave 1.6s ease-out infinite; }
  .nfc-wave--1 { animation-delay: 0s !important; }
  .nfc-wave--2 { animation-delay: .35s !important; }
  .nfc-wave--3 { animation-delay: .7s !important; }
  @keyframes nfcWave { 0% { opacity: 0; transform: translateY(-50%) scale(.35); } 25% { opacity: .9; } 100% { opacity: 0; transform: translateY(-50%) scale(1.8); } }

  /* Rotator tipográfico */
  .nfc-rotator { position: absolute; bottom: 4%; left: 0; right: 0; text-align: center; font-size: 13px; color: var(--nfc-muted); margin: 0; }
  .nfc-rotator__wrap { display: inline-block; overflow: hidden; vertical-align: top; color: var(--nfc-cyan); font-weight: 600; }
  .nfc-rotator__inner { display: inline-block; white-space: nowrap; animation: nfcTicker 16s linear infinite; }
  @keyframes nfcTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Microscreens de teléfono (hero) */
  .mini { display: flex; flex-direction: column; gap: 8px; }
  .mini--review .mini__head { display: flex; align-items: center; justify-content: space-between; padding: 6px; }
  .mini__brand { display: flex; align-items: center; gap: 5px; }
  .mini__brand-logo { width: 20px; height: 20px; border-radius: 5px; background: linear-gradient(135deg,#725cff,#16d8d2); display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; }
  .mini__brand-name { font-weight: 700; font-size: 10px; color: #111426; }
  .mini__stars { display: flex; gap: 1px; color: #ffb45e; }
  .mini__rating { font-size: 13px; color: #ffb45e; letter-spacing: 2px; }
  .mini__field { height: 40px; border-radius: 8px; background: #f0f2f7; border: 1px solid rgba(31,38,70,.1); }
  .mini__btn { height: 30px; display: grid; place-items: center; border-radius: 8px; background: linear-gradient(135deg,#725cff,#16d8d2); color: #fff; font-size: 10px; font-weight: 600; }
  .mini__btn--wa { display: flex; align-items: center; justify-content: center; gap: 5px; }
  .mini__thank { display: flex; align-items: center; gap: 5px; font-size: 9px; color: #16855b; }
  .mini__check { width: 13px; height: 13px; border-radius: 50%; background: #35d58a; color: #fff; display: grid; place-items: center; font-size: 8px; }
  .mini__bubble { background: #e9f5ef; color: #112720; padding: 8px 10px; border-radius: 10px 10px 10px 2px; font-size: 10px; max-width: 85%; }
  .mini__contact { display: flex; align-items: center; gap: 7px; }
  .mini__contact-ava { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg,#16d8d2,#397bff); }
  .mini__contact-name { font-size: 10px; font-weight: 600; color: #111426; }
  .mini__head { font-weight: 700; font-size: 11px; color: #111426; }
  .mini__dish { display: flex; align-items: center; gap: 6px; border: 1px solid rgba(31,38,70,.1); border-radius: 8px; padding: 6px 8px; font-size: 9px; color: #111426; }
  .mini__dish-price { margin-left: auto; font-weight: 600; }
  .mini__dish em { display: none; }
  .mini__cal { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .mini__cal-d { height: 20px; display: grid; place-items: center; font-size: 8px; color: #687088; background: #f0f2f7; border-radius: 4px; }
  .mini__cal-d.on { background: #725cff; color: #fff; }
  .mini__hour { font-size: 16px; font-weight: 700; color: #111426; }

  /* ===== FRICCIÓN ===== */
  .nfc-friction { background: var(--nfc-surface); border-block: 1px solid var(--nfc-border); }
  .nfc-friction__cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(28px,4vw,56px); align-items: stretch; }
  .nfc-path { border: 1px solid var(--nfc-border); border-radius: 20px; padding: clamp(22px,3vw,36px); background: var(--nfc-surface-2); }
  .nfc-path--long { opacity: .78; }
  .nfc-path--nfc { border-color: var(--nfc-soft-violet); background: var(--nfc-soft-violet); }
  .nfc-path__tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--nfc-faint); display: block; margin-bottom: 20px; }
  .nfc-path--nfc .nfc-path__tag { color: var(--nfc-cyan); }
  .nfc-path__steps { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .nfc-path__steps span { padding: 10px 16px; border-radius: 999px; background: var(--nfc-surface-3); color: var(--nfc-muted); font-size: 14px; font-weight: 500; }
  .nfc-path--nfc .nfc-path__steps span { background: var(--nfc-surface); color: var(--nfc-text); }
  .nfc-path__steps .nfc-path__done { background: var(--gradient-primary); color: #fff; }
  .nfc-path__steps .nfc-path__tap { border: 1px solid var(--nfc-success); color: var(--nfc-green); }

  /* ===== MÁS QUE RESEÑAS ===== */
  .nfc-more { text-align: center; }
  .nfc-more .nfc-sec__head { margin-inline: auto; }
  .nfc-more__refuerzo { margin-top: 26px; color: var(--nfc-violet); font-size: 13px; letter-spacing: 0.08em; }

  /* ===== BENTO ===== */
  .nfc-bento { background: var(--nfc-surface); border-block: 1px solid var(--nfc-border); }
  .nfc-bento__grid { display: grid; grid-template-columns: 1.3fr 1fr; grid-template-rows: auto auto; gap: clamp(20px,2.6vw,32px); }
  .nfc-card { border: 1px solid var(--nfc-border); border-radius: 24px; padding: clamp(22px,2.8vw,34px); background: var(--nfc-surface-2); display: flex; flex-direction: column; gap: 18px; }
  .nfc-card--review { grid-column: 1; grid-row: 1 / span 2; }
  .nfc-card--wa { grid-column: 2; grid-row: 1; }
  .nfc-card--menu { grid-column: 2; grid-row: 2; }
  .nfc-card--book { grid-column: 1 / -1; grid-row: 3; }
  .nfc-card__eyebrow { font-size: 10px; letter-spacing: 0.18em; color: var(--nfc-cyan); }
  .nfc-card__title { font-size: clamp(22px,2.2vw,30px); letter-spacing: -0.02em; margin: 6px 0 0; }
  .nfc-card__text { color: var(--nfc-muted); font-size: 15px; line-height: 1.5; margin: 0; max-width: 40ch; }
  .nfc-card__micro { color: var(--nfc-faint); font-size: 13px; margin: 0; }
  .nfc-card__select { align-self: flex-start; display: inline-flex; align-items: center; gap: 7px; margin-top: auto; padding: 10px 16px; border-radius: 999px; border: 1px solid var(--nfc-border-strong); background: transparent; color: var(--nfc-text); font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; }
  .nfc-card__select:hover { background: var(--nfc-surface-3); transform: translateY(-1px); }

  .demo { border: 1px solid var(--nfc-border); border-radius: 14px; background: var(--nfc-surface); padding: 14px; display: flex; flex-direction: column; gap: 9px; }
  .demo__stars { color: #ffb45e; letter-spacing: 2px; font-size: 15px; }
  .demo__box { height: 34px; border-radius: 8px; background: var(--nfc-surface-3); border: 1px solid var(--nfc-border); }
  .demo__btn { height: 30px; display: grid; place-items: center; border-radius: 8px; background: var(--gradient-primary); color: #fff; font-size: 11px; font-weight: 600; }
  .demo__ok { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--nfc-green); }
  .demo__check { width: 15px; height: 15px; border-radius: 50%; background: var(--nfc-green); color: #fff; display: grid; place-items: center; font-size: 9px; }
  .demo__bubble { background: var(--nfc-soft-cyan); color: var(--nfc-text); padding: 9px 12px; border-radius: 10px 10px 10px 2px; font-size: 12px; max-width: 80%; }
  .demo__row { display: flex; align-items: center; gap: 8px; }
  .demo__ava { width: 24px; height: 24px; border-radius: 50%; background: var(--gradient-primary); }
  .demo__name { font-size: 12px; font-weight: 600; }
  .demo__dish { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--nfc-border); border-radius: 8px; padding: 8px 10px; font-size: 12px; }
  .demo__dish b { font-size: 12px; }
  .demo__cal { font-size: 12px; color: var(--nfc-muted); font-family: var(--font-mono); letter-spacing: 6px; }
  .demo__hour { font-size: 18px; font-weight: 700; }
  .demo--book .demo__btn { margin-top: 2px; }
  .nfc-card--book .demo--book .demo__cal { letter-spacing: 4px; }

  .nfc-bento__secondary { margin-top: clamp(28px,4vw,44px); border: 1px solid var(--nfc-border); border-radius: 16px; padding: 20px 24px; background: var(--nfc-surface-2); display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
  .nfc-bento__secondary-label { font-size: 11px; letter-spacing: 0.14em; color: var(--nfc-faint); text-transform: uppercase; }
  .nfc-bento__secondary-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 20px; }
  .nfc-bento__secondary-list li { font-size: 14px; color: var(--nfc-muted); }
  .nfc-bento__secondary-list li::before { content: ""; display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--nfc-cyan); margin-right: 7px; vertical-align: middle; }

  /* ===== CÓMO FUNCIONA ===== */
  .nfc-how__assembly { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 14px; margin-bottom: clamp(40px,5vw,60px); padding: clamp(18px,2.5vw,26px); border: 1px dashed var(--nfc-border-strong); border-radius: 16px; color: var(--nfc-muted); }
  .nfc-how__assembly span { font-size: 12px; letter-spacing: 0.14em; }
  .nfc-how__arrow { color: var(--nfc-cyan); font-size: 16px; font-style: normal; animation: nfcBlink 1.6s ease-in-out infinite; }
  @keyframes nfcBlink { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
  .nfc-how__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(16px,2vw,24px); }
  .nfc-step { border: 1px solid var(--nfc-border); border-radius: 18px; padding: clamp(20px,2.5vw,28px); background: var(--nfc-surface); }
  .nfc-step__num { font-size: 13px; color: var(--nfc-violet); }
  .nfc-step__title { font-size: clamp(17px,1.4vw,20px); letter-spacing: -0.01em; margin: 10px 0 8px; }
  .nfc-step__desc { font-size: 14px; line-height: 1.5; color: var(--nfc-muted); margin: 0; }

  /* ===== CONFIGURABLE ===== */
  .nfc-config { background: var(--nfc-surface); border-block: 1px solid var(--nfc-border); }
  .nfc-config__layout { display: grid; grid-template-columns: minmax(320px,0.85fr) minmax(0,1.15fr); gap: clamp(28px,4vw,56px); align-items: center; }
  .nfc-config__panel { border: 1px solid var(--nfc-border); border-radius: 22px; padding: clamp(22px,3vw,34px); background: var(--nfc-surface-2); }
  .nfc-config__panel-label { font-size: 11px; letter-spacing: 0.14em; color: var(--nfc-faint); text-transform: uppercase; margin: 0 0 12px; }
  .nfc-config__panel-label--mt { margin-top: 26px; }
  .nfc-config__current { display: flex; align-items: center; gap: 9px; font-size: 17px; font-weight: 600; color: var(--nfc-text); margin: 0 0 6px; }
  .nfc-config__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--nfc-green); box-shadow: 0 0 0 4px var(--nfc-soft-cyan); }
  .nfc-config__list { display: flex; flex-direction: column; gap: 8px; margin: 0 0 22px; }
  .nfc-config__opt { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--nfc-border); background: var(--nfc-surface); color: var(--nfc-muted); cursor: pointer; font-size: 14px; font-weight: 500; transition: all .2s; }
  .nfc-config__opt input { position: absolute; opacity: 0; pointer-events: none; }
  .nfc-config__radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--nfc-border-strong); flex-shrink: 0; position: relative; }
  .nfc-config__opt.on { border-color: var(--nfc-soft-violet); background: var(--nfc-soft-violet); color: var(--nfc-text); }
  .nfc-config__opt.on .nfc-config__radio { border-color: var(--nfc-violet); }
  .nfc-config__opt.on .nfc-config__radio::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--nfc-violet); }
  .nfc-config__save { height: 48px; width: 100%; border: none; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 26px rgba(90,76,255,.3); transition: transform .2s; }
  .nfc-config__save:hover { transform: translateY(-2px); }
  .nfc-config__status { display: flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; color: var(--nfc-green); margin: 16px 0 0; }
  .nfc-config__status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--nfc-green); }
  .nfc-config__scene { position: relative; display: flex; align-items: center; justify-content: center; gap: 30px; min-height: 420px; }
  .nfc-config__phone { width: 230px; border-radius: 30px; border: 2px solid var(--nfc-border-strong); background: ${dark ? "#0a0e1f" : "#0d1020"}; padding: 9px; box-shadow: 0 28px 70px rgba(0,0,0,.4); }
  .nfc-config__phone-inner { background: ${dark ? "#f4f6ff" : "#ffffff"}; color: #111426; border-radius: 22px; padding: 30px 14px 14px; display: flex; flex-direction: column; gap: 10px; min-height: 340px; }
  .nfc-config__phone-head { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #16855b; }
  .nfc-config__phone-dot { width: 7px; height: 7px; border-radius: 50%; background: #35d58a; }
  .nfc-config__comercial { margin-top: clamp(28px,4vw,40px); text-align: center; font-size: 14px; color: var(--nfc-muted); }

  /* ===== CASES ===== */
  .nfc-cases__marquee { overflow: hidden; white-space: nowrap; font-size: 12px; letter-spacing: 0.18em; color: var(--nfc-faint); margin-bottom: clamp(28px,4vw,44px); }
  .nfc-cases__marquee span { display: inline-block; padding-right: 26px; }
  .nfc-cases__scene { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 18px; padding: clamp(30px,5vw,56px); border: 1px solid var(--nfc-border); border-radius: 24px; background: var(--nfc-surface); }
  .nfc-cases__rubro { font-size: 13px; letter-spacing: 0.14em; color: var(--nfc-muted); }
  .nfc-cases__arrow { color: var(--nfc-cyan); font-size: 20px; }
  .nfc-cases__lugar { font-size: clamp(22px,3vw,34px); font-weight: 700; color: var(--nfc-text); }
  .nfc-cases__accion { font-size: clamp(24px,3vw,36px); font-weight: 700; }

  /* ===== FORMATS ===== */
  .nfc-formats { background: var(--nfc-surface); border-block: 1px solid var(--nfc-border); }
  .nfc-formats__stage { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(16px,2.4vw,24px); }
  .nfc-pedestal { border: 1px solid var(--nfc-border); border-radius: 18px; padding: 20px; background: var(--nfc-surface-2); display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
  .nfc-pedestal__piece { height: 120px; display: grid; place-items: center; width: 100%; }
  .nfc-pedestal__name { font-size: 14px; font-weight: 600; color: var(--nfc-text); }
  .nfc-pedestal__status { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nfc-amber); padding: 3px 8px; border-radius: 999px; background: var(--nfc-soft-cyan); }
  .fmt { display: grid; place-items: center; gap: 4px; border: 1px dashed var(--nfc-border-strong); border-radius: 14px; transform: rotateX(18deg) rotateZ(-8deg); background: linear-gradient(160deg, ${dark ? "#1a2140" : "#ffffff"}, ${dark ? "#0f1430" : "#eef1f8"}); box-shadow: var(--nfc-scene-shadow); }
  .fmt img, .fmt span { pointer-events: none; }
  .fmt--contador { width: 90px; height: 120px; border-radius: 14px; }
  .fmt--sticker { width: 86px; height: 86px; border-radius: 50%; }
  .fmt--tarjeta { width: 120px; height: 74px; border-radius: 12px; }
  .fmt--mesa { width: 130px; height: 58px; border-radius: 16px; }
  .fmt--vidriera { width: 96px; height: 130px; border-radius: 10px; }
  .fmt--empleado { width: 70px; height: 104px; border-radius: 999px 999px 12px 12px; }
  .fmt--packaging { width: 112px; height: 62px; border-radius: 8px; }
  .fmt__nfc { font-family: var(--font-mono); font-size: 16px; font-weight: 600; color: var(--nfc-violet); }
  .fmt__qr { font-size: 12px; line-height: 1.1; color: var(--nfc-text); opacity: .8; text-align: center; }

  /* ===== COMMERCIAL ===== */
  .nfc-commercial__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(18px,2.6vw,28px); align-items: stretch; }
  .nfc-plan { display: flex; flex-direction: column; gap: 16px; border: 1px solid var(--nfc-border); border-radius: 22px; padding: clamp(24px,3vw,34px); background: var(--nfc-surface); text-decoration: none; color: var(--nfc-text); transition: transform .22s, box-shadow .22s, border-color .22s; }
  .nfc-plan:hover { transform: translateY(-4px); border-color: var(--nfc-border-strong); box-shadow: var(--nfc-scene-shadow); }
  .nfc-plan--featured { border-color: var(--nfc-soft-violet); background: var(--nfc-soft-violet); }
  .nfc-plan__title { font-size: clamp(22px,2.2vw,28px); letter-spacing: -0.02em; margin: 0; }
  .nfc-plan__desc { color: var(--nfc-muted); font-size: 14px; margin: 0; }
  .nfc-plan__points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .nfc-plan__points li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: var(--nfc-muted); }
  .nfc-plan__check { color: var(--nfc-green); font-weight: 700; }
  .nfc-plan__cta { margin-top: auto; display: inline-flex; align-items: center; gap: 7px; color: var(--nfc-cyan); font-weight: 600; font-size: 15px; }

  /* ===== TRUST ===== */
  .nfc-trust__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
  .nfc-trust__item { border: 1px solid var(--nfc-border); border-radius: 14px; padding: 16px 18px; background: var(--nfc-surface); display: flex; align-items: center; gap: 10px; color: var(--nfc-muted); font-size: 15px; }
  .nfc-trust__check { color: var(--nfc-green); font-weight: 700; }
  .nfc-trust__note { border: 1px dashed var(--nfc-border-strong); border-radius: 14px; padding: 18px 22px; color: var(--nfc-muted); font-size: 14px; line-height: 1.6; text-align: center; max-width: 720px; margin-inline: auto; }
  .nfc-trust__note strong { color: var(--nfc-text); font-weight: 600; }

  /* ===== LEAD FORM ===== */
  .nfc-lead { background: var(--nfc-surface); border-block: 1px solid var(--nfc-border); }
  .nfc-lead__wrap { display: grid; grid-template-columns: minmax(340px,0.8fr) minmax(520px,1.2fr); gap: clamp(40px,6vw,80px); align-items: start; }
  .nfc-lead__left { position: sticky; top: calc(var(--header-height) + 40px); }
  .nfc-lead__bajada { color: var(--nfc-muted); font-size: 16px; line-height: 1.6; margin: 0 0 24px; max-width: 46ch; }
  .nfc-lead__wa { display: inline-flex; align-items: center; gap: 8px; color: var(--nfc-cyan); font-size: 15px; text-decoration: none; transition: opacity .2s; }
  .nfc-lead__wa:hover { opacity: .8; }
  .nfc-lead__right { border: 1px solid var(--nfc-border); border-radius: 24px; padding: clamp(24px,3.4vw,40px); background: var(--nfc-surface-2); }
  .nfc-lead__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .nfc-field { display: flex; flex-direction: column; gap: 6px; }
  .nfc-field--area { margin-top: 18px; position: relative; }
  .nfc-field__label { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--nfc-muted); }
  .nfc-field input, .nfc-field textarea { width: 100%; height: 50px; background: var(--nfc-surface); border: 1px solid var(--nfc-border-strong); border-radius: 12px; padding: 0 14px; font-size: 15px; color: var(--nfc-text); outline: none; transition: border-color .25s; }
  .nfc-field textarea { height: auto; min-height: 110px; padding: 12px 14px; resize: vertical; }
  .nfc-field input::placeholder, .nfc-field textarea::placeholder { color: var(--nfc-faint); }
  .nfc-field input:focus, .nfc-field textarea:focus { border-color: var(--nfc-violet); }
  .nfc-field input[aria-invalid="true"], .nfc-field textarea[aria-invalid="true"] { border-color: var(--nfc-error, #ff747f); }
  .nfc-field__error { font-size: 12px; color: var(--nfc-error, #ff747f); }
  .nfc-field__count { font-size: 11px; color: var(--nfc-faint); position: absolute; bottom: 8px; right: 12px; }
  .nfc-fieldset { border: none; margin: 18px 0 0; padding: 0; }
  .nfc-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
  .nfc-chip { border: 1px solid var(--nfc-border-strong); border-radius: 999px; padding: 8px 16px; font-size: 13px; color: var(--nfc-muted); background: transparent; cursor: pointer; transition: all .2s; }
  .nfc-chip.on { border-color: var(--nfc-soft-violet); background: var(--nfc-soft-violet); color: var(--nfc-text); }
  .nfc-chip:hover { border-color: var(--nfc-violet); }
  .nfc-hp { position: absolute; left: -9999px; opacity: 0; height: 0; }
  .nfc-consent { font-size: 12px; color: var(--nfc-faint); margin: 16px 0 0; }
  .nfc-consent a { color: var(--nfc-cyan); text-decoration: underline; }
  .nfc-lead__submit { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 16px; height: 54px; width: 100%; border: none; border-radius: 999px; background: var(--gradient-primary); color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 30px rgba(90,76,255,.32); transition: transform .22s, box-shadow .22s; }
  .nfc-lead__submit:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(90,76,255,.44); }
  .nfc-lead__submit:disabled { opacity: .7; cursor: not-allowed; }
  .nfc-lead__micro { font-size: 12px; color: var(--nfc-faint); margin: 14px 0 0; text-align: center; }
  .nfc-success { text-align: center; padding: clamp(24px,4vw,48px); }
  .nfc-success__check { display: inline-grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: var(--nfc-green); color: #fff; font-size: 26px; margin-bottom: 18px; }
  .nfc-success h3 { font-size: clamp(24px,2.4vw,32px); letter-spacing: -0.02em; margin: 0 0 14px; }
  .nfc-success p { font-size: 15px; }

  /* ===== FAQ ===== */
  .nfc-faq__list { max-width: 760px; margin-inline: auto; display: flex; flex-direction: column; gap: 12px; }
  .nfc-faq__item { border: 1px solid var(--nfc-border); border-radius: 16px; background: var(--nfc-surface); overflow: hidden; }
  .nfc-faq__q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; background: transparent; border: none; color: var(--nfc-text); font-size: 16px; font-weight: 600; text-align: left; cursor: pointer; }
  .nfc-faq__toggle { color: var(--nfc-cyan); font-size: 22px; line-height: 1; width: 24px; height: 24px; display: grid; place-items: center; }
  .nfc-faq__a { padding: 0 22px 20px; margin: 0; color: var(--nfc-muted); font-size: 14px; line-height: 1.6; }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1279px) {
    .nfc-hero__grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .nfc-hero__title { font-size: clamp(46px,5vw,68px); }
    .nfc-phone { right: 0; }
    .nfc-formats__stage { grid-template-columns: repeat(3,1fr); }
  }
  @media (max-width: 1023px) {
    .nfc-hero { padding-block: 48px 72px; }
    .nfc-hero__grid { grid-template-columns: 1fr; }
    .nfc-hero__visual { aspect-ratio: 1.05/1; max-width: 620px; margin-inline: auto; justify-self: center; width: 100%; }
    .nfc-friction__cols { grid-template-columns: 1fr; }
    .nfc-bento__grid { grid-template-columns: 1fr; }
    .nfc-card--review { grid-column: 1; grid-row: auto; }
    .nfc-card--wa, .nfc-card--menu, .nfc-card--book { grid-column: 1; grid-row: auto; }
    .nfc-config__layout { grid-template-columns: 1fr; }
    .nfc-config__scene { min-height: 0; }
    .nfc-how__grid { grid-template-columns: repeat(2,1fr); }
    .nfc-commercial__grid { grid-template-columns: 1fr; }
    .nfc-trust__grid { grid-template-columns: repeat(2,1fr); }
    .nfc-lead__wrap { grid-template-columns: 1fr; }
    .nfc-lead__left { position: static; }
    .nfc-formats__stage { grid-template-columns: repeat(3,1fr); }
  }
  @media (max-width: 767px) {
    .nfc-sec { padding-block: 64px; }
    .nfc-h2 { font-size: clamp(30px,7vw,40px); }
    .nfc-hero__ctas { flex-direction: column; align-items: stretch; }
    .nfc-btn { justify-content: center; }
    .nfc-hero__visual { aspect-ratio: 1/1; max-width: 460px; }
    .nfc-tag { transform: scale(.85); }
    .nfc-phone { width: 180px; }
    .nfc-phone__screen { height: 320px; }
    .nfc-rotator { font-size: 11px; }
    .nfc-how__grid { grid-template-columns: 1fr; }
    .nfc-config__scene { flex-direction: column; gap: 40px; }
    .nfc-config__phone { width: 240px; }
    .nfc-formats__stage { grid-template-columns: repeat(2,1fr); }
    .nfc-trust__grid { grid-template-columns: 1fr; }
    .nfc-lead__grid { grid-template-columns: 1fr; }
    .nfc-cases__scene { gap: 12px; }
    .nfc-hero__visual { width: min(100%, 480px); }
  }
  @media (max-width: 400px) {
    .nfc-formats__stage { grid-template-columns: 1fr; }
    .nfc-phone { display: none; }
    .nfc-config__phone { display: none; }
    .nfc-tag { transform: scale(.9); }
  }

  /* ===== REDUCED MOTION ===== */
  @media (prefers-reduced-motion: reduce) {
    .nfc-phone--approach, .nfc-phone--tap, .nfc-phone--opened { transform: none; }
    .nfc-wave, .nfc-phone--tap .nfc-wave, .nfc-phone--opened .nfc-wave { animation: none; opacity: 1; }
    .nfc-rotator__inner { animation: none; }
    .nfc-how__arrow { animation: none; }
  }
  `
}
