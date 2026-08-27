import { useState, useEffect, useCallback, useRef } from "react"
import { useTheme } from "../../../context/ThemeContext"
import img01 from "../../../assets/modulo02/01-una-web-preparada.png"
import img02 from "../../../assets/modulo02/imagen02.png"
import img03 from "../../../assets/modulo02/imagen03.png"
import img04 from "../../../assets/modulo02/imagen04.png"

const VIEWS = [
  {
    id: "website",
    index: "01",
    label: "Tu website",
    title: "Mostrá, vendé y recibí consultas.",
    description:
      "Una experiencia profesional, creada alrededor de tu negocio y disponible las 24 horas.",
    image: img01,
  },
  {
    id: "clientes",
    index: "02",
    label: "Tus clientes",
    title: "Cada consulta, en su lugar.",
    description:
      "WhatsApp, formularios, reservas y pedidos con el historial de cada cliente.",
    image: img02,
  },
  {
    id: "operacion",
    index: "03",
    label: "Tu operación",
    title: "Todo tu negocio en una sola app.",
    description:
      "Pedidos, tareas, turnos, equipo y stock organizados para trabajar con claridad.",
    image: img03,
  },
  {
    id: "resultados",
    index: "04",
    label: "Tus resultados",
    title: "Lo importante, siempre a la vista.",
    description:
      "Ventas, clientes y pendientes reunidos para decidir sin armar reportes.",
    image: img04,
  },
]

const INTERVAL = 6000

export default function ProductGallery() {
  const { theme } = useTheme()
  const isDark = theme !== "light"
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef(null)
  const moduleRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (reducedMotion || isPaused) return
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % 4)
    }, INTERVAL)
  }, [reducedMotion, isPaused])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const selectView = (idx) => {
    setActive(idx)
    clearInterval(timerRef.current)
    startTimer()
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      selectView((active + 1) % 4)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      selectView((active + 3) % 4)
    }
  }

  const s = styles(isDark)

  return (
    <section id="que-hacemos" ref={moduleRef} className="pg2">
      <style>{css(isDark)}</style>

      {/* Scenario */}
      <div
        className="pg2-scene"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
      >
        {/* Left column: header + selector */}
        <div className="pg2-left">
          <header className="pg2-header">
            <p className="pg2-eyebrow">WEBSITE + APP DE GESTIÓN</p>
            <h2 className="pg2-title font-display">
              Lo que ven tus clientes. Todo lo que necesitás para trabajar.
            </h2>
            <p className="pg2-bajada">
              Creamos tu website y la aplicación con la que administrás clientes,
              ventas y operación. Todo diseñado a medida como una sola plataforma.
            </p>
          </header>

          {/* Selector */}
          <div className="pg2-selector" role="tablist" aria-label="Vistas de la plataforma">
            <div className="pg2-selector__track">
            {VIEWS.map((v, i) => {
              const isActive = i === active
              return (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`pg2-view-${v.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`pg2-selector__item${isActive ? " is-active" : ""}`}
                  onClick={() => selectView(i)}
                >
                  <span className="pg2-selector__number">{v.index}</span>
                  <div className="pg2-selector__text">
                    <span className="pg2-selector__label">{v.label}</span>
                    <span className="pg2-selector__title">{v.title}</span>
                    <span className="pg2-selector__desc">{v.description}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        </div>

        {/* Right window */}
        <div className="pg2-window" role="tabpanel" aria-label="Demo de la plataforma">
          <div className="pg2-window__frame">
            {/* Window bar */}
            <div className="pg2-window__bar">
              <div className="pg2-window__dots">
                <i /><i /><i />
              </div>
              <span className="pg2-window__viewname">{VIEWS[active].label}</span>
              <span className="pg2-window__live">EN VIVO</span>
            </div>

            {/* Canvas */}
            <div className="pg2-window__canvas">
              {VIEWS.map((v, i) => (
                <div
                  key={v.id}
                  id={`pg2-view-${v.id}`}
                  className={`pg2-view${i === active ? " is-visible" : ""}`}
                  aria-hidden={i !== active}
                >
                  <img
                    src={v.image}
                    alt={v.label}
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked blocks */}
      <div className="pg2-mobile">
        {VIEWS.map((v) => (
          <div key={v.id} className="pg2-mobile__block">
            <div className="pg2-mobile__copy">
              <span className="pg2-mobile__number">{v.index}</span>
              <h3 className="pg2-mobile__title">{v.title}</h3>
              <p className="pg2-mobile__desc">{v.description}</p>
            </div>
            <div className="pg2-mobile__image">
              <img src={v.image} alt={v.label} draggable="false" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function styles(isDark) {
  return {
    "--pg2-bg": isDark ? "#070916" : "#f4f6ff",
    "--pg2-surface": isDark ? "#0e1128" : "#ffffff",
    "--pg2-surface-raised": isDark ? "#151933" : "#f8f9fd",
    "--pg2-border": isDark
      ? "rgba(174,184,225,0.12)"
      : "rgba(31,38,70,0.10)",
    "--pg2-border-strong": isDark
      ? "rgba(174,184,225,0.22)"
      : "rgba(31,38,70,0.18)",
    "--pg2-text": isDark ? "#f0f2ff" : "#111426",
    "--pg2-text-secondary": isDark ? "#a5aec8" : "#697188",
    "--pg2-text-muted": isDark ? "#6b7494" : "#8c94a8",
    "--pg2-accent-violet": isDark ? "#7c6cff" : "#6555e8",
    "--pg2-accent-cyan": isDark ? "#20d5c7" : "#009f95",
    "--pg2-shadow": isDark
      ? "0 40px 120px rgba(0,0,0,0.55)"
      : "0 40px 120px rgba(41,48,88,0.12)",
    "--pg2-glow": isDark
      ? "radial-gradient(ellipse 600px 500px at 60% 45%, rgba(124,108,255,0.10), transparent 70%)"
      : "radial-gradient(ellipse 600px 500px at 60% 45%, rgba(101,85,232,0.06), transparent 70%)",
  }
}

function css(isDark) {
  return `
    /* ===== MODULE 02 ===== */
    .pg2 {
      padding-block: clamp(96px, 9vw, 150px);
      position: relative;
      overflow: hidden;
    }
    .pg2::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--pg2-glow);
      pointer-events: none;
      z-index: 0;
    }

    /* Header */
    .pg2-header {
      position: relative;
      z-index: 1;
      max-width: 850px;
      width: calc(100% - 64px);
      margin-inline: auto;
      margin-bottom: clamp(56px, 6vw, 72px);
    }
    .pg2-eyebrow {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--color-accent-cool, #18d6d2);
      margin: 0 0 20px;
    }
    .pg2-title {
      font-size: clamp(42px, 4.4vw, 72px);
      font-weight: 700;
      line-height: 1.02;
      letter-spacing: -0.045em;
      margin: 0 0 20px;
      text-wrap: balance;
    }
    .pg2-bajada {
      font-size: clamp(17px, 1.35vw, 21px);
      line-height: 1.55;
      max-width: 720px;
      margin: 0;
    }

    /* Scene grid */
    .pg2-scene {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(280px, 0.34fr) minmax(0, 0.66fr);
      gap: clamp(40px, 5vw, 88px);
      align-items: center;
      max-width: 1440px;
      width: calc(100% - 64px);
      margin-inline: auto;
    }

    /* Selector */
    .pg2-selector {
      display: flex;
      flex-direction: column;
    }
    .pg2-selector__track {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .pg2-selector__item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px 0;
      border: none;
      background: none;
      cursor: pointer;
      text-align: left;
      position: relative;
      color: var(--pg2-text-secondary);
      transition: color 0.3s ease;
    }
    .pg2-selector__item + .pg2-selector__item {
      border-top: 1px solid var(--pg2-border);
    }
    .pg2-selector__item:hover {
      color: var(--pg2-text);
    }
    .pg2-selector__item.is-active {
      color: var(--pg2-text);
    }
    .pg2-selector__item:focus-visible {
      outline: 2px solid var(--pg2-accent-violet);
      outline-offset: 4px;
      border-radius: 6px;
    }

    /* Active indicator line */
    .pg2-selector__item.is-active::before {
      content: "";
      position: absolute;
      left: -16px;
      top: 16px;
      bottom: 16px;
      width: 3px;
      border-radius: 2px;
      background: linear-gradient(180deg, var(--pg2-accent-violet), var(--pg2-accent-cyan));
    }

    .pg2-selector__number {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--pg2-text-muted);
      min-width: 20px;
      padding-top: 2px;
      flex-shrink: 0;
    }
    .pg2-selector__item.is-active .pg2-selector__number {
      color: var(--pg2-accent-violet);
    }
    .pg2-selector__text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .pg2-selector__label {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .pg2-selector__item:not(.is-active) .pg2-selector__label {
      opacity: 0.7;
    }
    .pg2-selector__title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.35;
    }
    .pg2-selector__item:not(.is-active) .pg2-selector__title {
      opacity: 0.6;
    }
    .pg2-selector__desc {
      font-size: 13px;
      line-height: 1.5;
      color: var(--pg2-text-muted);
    }
    .pg2-selector__item.is-active .pg2-selector__desc {
      color: var(--pg2-text-secondary);
    }

    /* Window */
    .pg2-window {
      position: relative;
      width: 100%;
      min-width: 0;
    }
    .pg2-window__frame {
      width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: 22px;
      border: 1px solid var(--pg2-border);
      background: var(--pg2-surface);
      box-shadow: var(--pg2-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .pg2-window__bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 16px;
      height: 34px;
      border-bottom: 1px solid var(--pg2-border);
      background: var(--pg2-surface-raised);
      flex-shrink: 0;
    }
    .pg2-window__dots {
      display: flex;
      gap: 6px;
    }
    .pg2-window__dots i {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: ${isDark ? "rgba(174,184,225,0.18)" : "rgba(31,38,70,0.12)"};
    }
    .pg2-window__viewname {
      font-size: 11px;
      font-weight: 600;
      color: var(--pg2-text-secondary);
      letter-spacing: 0.02em;
    }
    .pg2-window__live {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--pg2-accent-cyan);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .pg2-window__live::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--pg2-accent-cyan);
      animation: pg2Pulse 2s ease-in-out infinite;
    }
    .pg2-window__canvas {
      flex: 1;
      position: relative;
      overflow: hidden;
      min-height: 0;
    }

    /* Views */
    .pg2-view {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(10px);
      filter: blur(3px);
      transition: opacity 0.55s ease, transform 0.55s ease, filter 0.55s ease;
      pointer-events: none;
      padding: 12px;
    }
    .pg2-view.is-visible {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
      pointer-events: auto;
    }
    .pg2-view img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }

    /* ===== MOBILE: stacked blocks ===== */
    .pg2-mobile {
      display: none;
    }

    /* ===== TABLET ===== */
    @media (max-width: 1279px) {
      .pg2-scene {
        width: calc(100% - 48px);
        gap: clamp(28px, 4vw, 56px);
      }
    }

    @media (max-width: 1023px) {
      .pg2-scene {
        grid-template-columns: 1fr;
        gap: 24px;
        width: calc(100% - 48px);
      }
      .pg2-header {
        max-width: 100%;
        text-align: center;
        margin-inline: auto;
      }
      .pg2-eyebrow {
        text-align: center;
      }

      /* Tabs row */
      .pg2-selector {
        order: 0;
      }
      .pg2-selector__track {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }
      .pg2-selector__item {
        padding: 8px 14px;
        border: 1px solid var(--pg2-border);
        border-radius: 8px;
        background: var(--pg2-surface);
        gap: 8px;
        align-items: center;
        transition: background 0.2s, border-color 0.2s;
      }
      .pg2-selector__item + .pg2-selector__item {
        border-top: 1px solid var(--pg2-border);
      }
      .pg2-selector__item:hover {
        border-color: var(--pg2-border-strong);
      }
      .pg2-selector__item.is-active {
        background: var(--pg2-surface-raised);
        border-color: var(--pg2-accent-violet);
      }
      .pg2-selector__item.is-active::before {
        display: none;
      }
      .pg2-selector__title,
      .pg2-selector__desc {
        display: none;
      }
      .pg2-selector__text {
        gap: 0;
      }
      .pg2-selector__label {
        font-size: 13px;
      }
      .pg2-window {
        order: 1;
      }
    }

    /* ===== MOBILE: stacked blocks ===== */
    @media (max-width: 767px) {
      .pg2 {
        padding-block: clamp(64px, 8vw, 96px);
      }
      .pg2-header {
        padding-inline: 20px;
        margin-bottom: clamp(40px, 5vw, 56px);
      }
      .pg2-scene {
        display: none !important;
      }
      .pg2-mobile {
        display: flex;
        flex-direction: column;
        gap: clamp(48px, 6vw, 64px);
        padding-inline: 20px;
      }
      .pg2-mobile__block {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .pg2-mobile__copy {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pg2-mobile__number {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        color: var(--pg2-accent-violet);
      }
      .pg2-mobile__title {
        font-size: clamp(20px, 5vw, 26px);
        font-weight: 700;
        line-height: 1.15;
        letter-spacing: -0.03em;
        margin: 0;
      }
      .pg2-mobile__desc {
        font-size: 15px;
        line-height: 1.5;
        color: var(--pg2-text-secondary);
        margin: 0;
      }
      .pg2-mobile__image {
        width: 100%;
        aspect-ratio: 4 / 3;
        border-radius: 16px;
        border: 1px solid var(--pg2-border);
        background: var(--pg2-surface);
        box-shadow: var(--pg2-shadow);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
      }
      .pg2-mobile__image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
    }

    /* ===== REDUCED MOTION ===== */
    @media (prefers-reduced-motion: reduce) {
      .pg2-view {
        transition: none;
        filter: none;
      }
      .pg2-window__live::before {
        animation: none;
      }
    }

    /* ===== KEYFRAMES ===== */
    @keyframes pg2Pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `
}
