import { useTheme } from "../../../context/ThemeContext"

export default function Module02() {
  const { theme } = useTheme()
  const dark = theme !== "light"

  return (
    <section
      id="plataforma"
      aria-labelledby="m02-title"
      className="m02"
      style={vars(dark)}
    >
      <style>{css(dark)}</style>

      <header className="m02-header">
        <p className="m02-eyebrow">TODO EN UNA SOLA PLATAFORMA</p>
        <h2 id="m02-title" className="m02-title font-display">
          Tu web vende.{" "}
          <span className="m02-title--accent">Tu aplicación organiza.</span>{" "}
          Tu dashboard te muestra qué sigue.
        </h2>
        <p className="m02-desc">
          Creamos las tres partes alrededor de tu negocio para que tus
          clientes, tu equipo y tu información trabajen en el mismo sistema.
        </p>
      </header>

      <PlatformJourney dark={dark} />

      <p className="m02-closing">
        <strong>Todo empieza en tu website.</strong>{" "}
        <span className="m02-closing--accent">
          Todo continúa dentro de tu plataforma.
        </span>
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PlatformJourney — the panoramic 3-panel scene                     */
/* ------------------------------------------------------------------ */

function PlatformJourney({ dark }) {
  return (
    <div className="pj" aria-hidden="true">
      {/* Topbar */}
      <div className="pj-topbar">
        <div className="pj-topbar__dots">
          <i /><i /><i />
        </div>
        <span className="pj-topbar__label">FLEXIMY / PLATAFORMA DE NEGOCIO</span>
        <span className="pj-topbar__status">
          <span className="pj-topbar__dot" />
          SISTEMA ACTIVO
        </span>
      </div>

      {/* 3-column grid */}
      <div className="pj-grid">
        <WebsitePanel dark={dark} />
        <ManagementPanel dark={dark} />
        <DashboardPanel dark={dark} />
      </div>

      {/* Connection line */}
      <div className="pj-line">
        <div className="pj-line__track" />
        <div className="pj-line__pulse" />
        <span className="pj-line__node pj-line__node--1" />
        <span className="pj-line__node pj-line__node--2" />
        <span className="pj-line__node pj-line__node--3" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sector 01 — Website                                               */
/* ------------------------------------------------------------------ */

function WebsitePanel({ dark }) {
  return (
    <div className="pj-col pj-col--web">
      <div className="pj-col__head">
        <span className="pj-col__num">01</span>
        <span className="pj-col__label">WEBSITE</span>
        <h3 className="pj-col__title">Lo que ven tus clientes</h3>
        <p className="pj-col__text">Mostrá, vendé y recibí consultas.</p>
      </div>

      {/* Mini landing */}
      <div className="web">
        <div className="web-nav">
          <div className="web-nav__brand">
            <span className="web-nav__logo">B</span>
            <span className="web-nav__name">BRUMA</span>
          </div>
          <div className="web-nav__links">
            <span>Menú</span>
            <span>Reservas</span>
          </div>
          <span className="web-nav__open">Abierto ahora</span>
        </div>

        <div className="web-hero">
          <div className="web-hero__copy">
            <h4 className="web-hero__title">Algo bueno está por pasar.</h4>
            <p className="web-hero__sub">Café de especialidad y cocinasimple.</p>
            <span className="web-hero__cta">Ver el menú</span>
          </div>
          <div className="web-hero__product">
            <div className="web-hero__img">
              <div className="web-hero__img-glow" />
            </div>
            <span className="web-hero__price">$4.200</span>
          </div>
        </div>

        <div className="web-products">
          <div className="web-product">
            <div className="web-product__swatch" style={{background: dark ? "linear-gradient(135deg, #3a2a1a, #5a3a20)" : "linear-gradient(135deg, #c8a87a, #e0c8a0)"}} />
            <div>
              <span className="web-product__name">Croissant Pistacho</span>
              <span className="web-product__price">$3.800</span>
            </div>
          </div>
          <div className="web-product">
            <div className="web-product__swatch" style={{background: dark ? "linear-gradient(135deg, #1a3a2a, #2a5a3a)" : "linear-gradient(135deg, #a0d0b0, #c0e8c8)"}} />
            <div>
              <span className="web-product__name">Iced Matcha</span>
              <span className="web-product__price">$3.500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event */}
      <div className="pj-col__event">
        <span className="pj-col__event-dot" />
        Nueva consulta · Mesa para 4
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sector 02 — App de gestión                                         */
/* ------------------------------------------------------------------ */

function ManagementPanel({ dark }) {
  return (
    <div className="pj-col pj-col--app">
      <div className="pj-col__head">
        <span className="pj-col__num">02</span>
        <span className="pj-col__label">APP DE GESTIÓN</span>
        <h3 className="pj-col__title">Donde trabaja tu equipo</h3>
        <p className="pj-col__text">Clientes, pedidos y tareas en un solo lugar.</p>
      </div>

      <div className="app">
        {/* Inbox */}
        <div className="app-inbox">
          <div className="app-inbox__head">Consultas</div>
          <div className="app-entry app-entry--active">
            <span className="app-entry__ava" style={{background: "linear-gradient(135deg, #7c6cff, #20d5c7)"}}>M</span>
            <div className="app-entry__info">
              <span className="app-entry__name">Marina López</span>
              <span className="app-entry__src">Reserva web · 18:42</span>
            </div>
            <span className="app-entry__badge">Nueva</span>
          </div>
          <div className="app-entry">
            <span className="app-entry__ava" style={{background: "linear-gradient(135deg, #ff6fae, #ffb45e)"}}>L</span>
            <div className="app-entry__info">
              <span className="app-entry__name">Lucas Ruiz</span>
              <span className="app-entry__src">Pedido nuevo · 18:35</span>
            </div>
          </div>
          <div className="app-entry">
            <span className="app-entry__ava" style={{background: "linear-gradient(135deg, #20d5c7, #4d8dff)"}}>S</span>
            <div className="app-entry__info">
              <span className="app-entry__name">Sofía Vega</span>
              <span className="app-entry__src">WhatsApp · 18:20</span>
            </div>
          </div>
        </div>

        {/* Active case */}
        <div className="app-active">
          <div className="app-active__head">
            <span className="app-active__badge-dot" />
            Reserva activa
          </div>
          <h4 className="app-active__title">Mesa para 4</h4>
          <div className="app-active__meta">
            <span>Hoy · 21:00</span>
            <span className="app-active__confirmed">Confirmada</span>
          </div>
          <div className="app-active__client">
            <span className="app-active__client-label">Cliente</span>
            <span>Marina López</span>
          </div>
          <div className="app-active__assigned">
            <span className="app-active__assigned-label">Asignado a</span>
            <span>Lucía</span>
          </div>
        </div>

        {/* Actions */}
        <div className="app-actions">
          <span className="app-actions__label">Próximas acciones</span>
          <div className="app-action">
            <span className="app-action__icon">☐</span>
            Preparar mesa 04
          </div>
          <div className="app-action">
            <span className="app-action__icon">☐</span>
            Enviar confirmación
          </div>
        </div>
      </div>

      {/* Event */}
      <div className="pj-col__event pj-col__event--mid">
        <span className="pj-col__event-dot pj-col__event-dot--cyan" />
        Consulta convertida en reserva
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sector 03 — Dashboard                                              */
/* ------------------------------------------------------------------ */

function DashboardPanel({ dark }) {
  const chartW = 240
  const chartH = 80
  const data = [40, 55, 48, 70, 65, 82, 78]
  const max = Math.max(...data) * 1.15
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * chartW},${chartH - (v / max) * chartH}`)
    .join(" ")
  const area = `0,${chartH} ${pts} ${chartW},${chartH}`
  const last = data[data.length - 1]
  const lx = chartW
  const ly = chartH - (last / max) * chartH

  return (
    <div className="pj-col pj-col--dash">
      <div className="pj-col__head">
        <span className="pj-col__num">03</span>
        <span className="pj-col__label">DASHBOARD</span>
        <h3 className="pj-col__title">Donde ves qué está pasando</h3>
        <p className="pj-col__text">Resultados y pendientes listos para decidir.</p>
      </div>

      <div className="dash">
        {/* KPIs */}
        <div className="dash-kpis">
          <div className="dash-kpi">
            <span className="dash-kpi__label">Ventas hoy</span>
            <span className="dash-kpi__value">$184.500</span>
            <span className="dash-kpi__change">+18%</span>
          </div>
          <div className="dash-kpi">
            <span className="dash-kpi__label">Reservas</span>
            <span className="dash-kpi__value">12</span>
            <span className="dash-kpi__change">+3</span>
          </div>
          <div className="dash-kpi">
            <span className="dash-kpi__label">Clientes nuevos</span>
            <span className="dash-kpi__value">8</span>
            <span className="dash-kpi__change">+12%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="dash-chart">
          <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="m02lg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={dark ? "#7c6cff" : "#6555e8"} />
                <stop offset="100%" stopColor={dark ? "#20d5c7" : "#009f95"} />
              </linearGradient>
              <linearGradient id="m02af" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dark ? "#7c6cff" : "#6555e8"} stopOpacity="0.25" />
                <stop offset="100%" stopColor={dark ? "#20d5c7" : "#009f95"} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={area} fill="url(#m02af)" />
            <polyline points={pts} fill="none" stroke="url(#m02lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lx} cy={ly} r="3.5" fill={dark ? "#f3f5ff" : "#111426"} className="dash-chart__dot" />
          </svg>
        </div>

        {/* Insight */}
        <div className="dash-insight">
          <span className="dash-insight__icon">→</span>
          Tu horario con más actividad es de 19 a 21 h.
        </div>

        {/* Alert */}
        <div className="dash-alert">
          <span className="dash-alert__dot" />
          Stock bajo · Café Brasil
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CSS                                                                */
/* ------------------------------------------------------------------ */

function vars(dark) {
  return {
    "--m02-bg": dark ? "#080b18" : "#f5f6fb",
    "--m02-scene": dark ? "#0d1224" : "#ffffff",
    "--m02-scene-raised": dark ? "#10162b" : "#f8f9fd",
    "--m02-scene-surface": dark ? "#0b1020" : "#f0f2f7",
    "--m02-border": dark ? "rgba(155,170,220,0.14)" : "rgba(31,38,70,0.10)",
    "--m02-border-strong": dark ? "rgba(155,170,220,0.24)" : "rgba(31,38,70,0.18)",
    "--m02-text": dark ? "#f3f5ff" : "#111426",
    "--m02-text-2": dark ? "#aeb7cf" : "#5a6478",
    "--m02-text-3": dark ? "#7a84a4" : "#8c94a8",
    "--m02-violet": dark ? "#7c6cff" : "#6555e8",
    "--m02-cyan": dark ? "#20d5c7" : "#009f95",
    "--m02-green": dark ? "#42d392" : "#16855b",
    "--m02-amber": dark ? "#ffb45e" : "#a86000",
    "--m02-pink": dark ? "#ff6fae" : "#d94687",
  }
}

function css(dark) {
  return `
    /* ===== MODULE 02 ===== */
    .m02 {
      position: relative;
      background: ${dark
        ? "radial-gradient(circle at 48% 42%, rgba(91,83,255,0.12), transparent 38%), radial-gradient(circle at 78% 58%, rgba(24,211,215,0.07), transparent 32%), #080b18"
        : "radial-gradient(circle at 48% 42%, rgba(100,91,255,0.09), transparent 40%), radial-gradient(circle at 78% 58%, rgba(25,195,202,0.06), transparent 34%), #f5f6fb"};
      padding-block: clamp(96px, 8vw, 144px);
      overflow: hidden;
    }

    /* Header */
    .m02-header {
      width: min(1480px, calc(100% - 64px));
      margin-inline: auto;
      text-align: center;
      margin-bottom: clamp(64px, 7vw, 80px);
    }
    .m02-eyebrow {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--m02-cyan);
      margin: 0 0 22px;
    }
    .m02-title {
      font-size: clamp(44px, 4.35vw, 78px);
      font-weight: 700;
      line-height: 0.98;
      letter-spacing: -0.055em;
      margin: 0 0 28px;
      max-width: 1120px;
      margin-inline: auto;
      text-wrap: balance;
    }
    .m02-title--accent {
      background: linear-gradient(135deg, ${dark ? "#7c6cff" : "#6555e8"}, ${dark ? "#20d5c7" : "#009f95"});
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .m02-desc {
      font-size: clamp(17px, 1.3vw, 21px);
      line-height: 1.55;
      color: var(--m02-text-2);
      max-width: 760px;
      margin-block: 0;
      margin-inline: auto;
    }

    /* ===== PLATFORM JOURNEY ===== */
    .pj {
      position: relative;
      width: min(1480px, calc(100% - 64px));
      margin-inline: auto;
      border-radius: 28px;
      border: 1px solid var(--m02-border);
      background: var(--m02-scene);
      box-shadow: ${dark
        ? "0 42px 100px rgba(1,5,18,0.48), 0 0 0 1px rgba(135,150,215,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
        : "0 32px 80px rgba(45,53,90,0.13), 0 0 0 1px rgba(48,57,95,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"};
      overflow: hidden;
      min-width: 0;
    }

    /* Topbar */
    .pj-topbar {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 54px;
      padding: 0 20px;
      border-bottom: 1px solid var(--m02-border);
      background: var(--m02-scene-raised);
    }
    .pj-topbar__dots {
      display: flex;
      gap: 6px;
    }
    .pj-topbar__dots i {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: ${dark ? "rgba(155,170,220,0.18)" : "rgba(31,38,70,0.12)"};
    }
    .pj-topbar__label {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--m02-text-3);
      text-transform: uppercase;
    }
    .pj-topbar__status {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--m02-green);
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
    }
    .pj-topbar__dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--m02-green);
    }

    /* 3-column grid */
    .pj-grid {
      display: grid;
      grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.16fr) minmax(0, 0.9fr);
      height: clamp(500px, 32vw, 610px);
      min-height: 500px;
    }
    .pj-col {
      display: flex;
      flex-direction: column;
      padding: clamp(16px, 1.8vw, 24px);
      border-right: 1px solid var(--m02-border);
      min-width: 0;
      position: relative;
    }
    .pj-col:last-child {
      border-right: none;
    }
    .pj-col--app {
      background: ${dark ? "rgba(124,108,255,0.04)" : "rgba(101,85,232,0.02)"};
    }

    /* Column headers */
    .pj-col__head {
      margin-bottom: clamp(12px, 1.4vw, 18px);
    }
    .pj-col__num {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: var(--m02-text-3);
    }
    .pj-col__label {
      display: block;
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: var(--m02-violet);
      margin-top: 4px;
      text-transform: uppercase;
    }
    .pj-col__title {
      font-size: clamp(15px, 1.2vw, 19px);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin: 6px 0 4px;
      color: var(--m02-text);
    }
    .pj-col__text {
      font-size: clamp(11px, 0.85vw, 13px);
      line-height: 1.45;
      color: var(--m02-text-2);
      margin: 0;
    }

    /* Connection events */
    .pj-col__event {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 500;
      color: var(--m02-text-2);
      padding-top: 10px;
    }
    .pj-col__event--mid {
      justify-content: center;
    }
    .pj-col__event-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--m02-violet);
      flex-shrink: 0;
    }
    .pj-col__event-dot--cyan {
      background: var(--m02-cyan);
    }

    /* ===== WEBSITE PANEL ===== */
    .web {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      border: 1px solid var(--m02-border);
      background: ${dark ? "#0e1128" : "#ffffff"};
      overflow: hidden;
      min-height: 0;
    }
    .web-nav {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--m02-border);
    }
    .web-nav__brand {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .web-nav__logo {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      background: linear-gradient(135deg, ${dark ? "#7c6cff" : "#6555e8"}, ${dark ? "#20d5c7" : "#009f95"});
      display: grid;
      place-items: center;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      font-family: var(--font-display);
    }
    .web-nav__name {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--m02-text);
      font-family: var(--font-display);
    }
    .web-nav__links {
      display: flex;
      gap: 10px;
      font-size: 9px;
      color: var(--m02-text-3);
      margin-left: auto;
    }
    .web-nav__open {
      font-size: 8px;
      font-weight: 600;
      color: var(--m02-green);
      padding: 2px 6px;
      border-radius: 999px;
      background: ${dark ? "rgba(66,211,146,0.12)" : "rgba(22,133,91,0.10)"};
      white-space: nowrap;
    }

    .web-hero {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 12px;
      min-height: 0;
    }
    .web-hero__copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .web-hero__title {
      font-size: clamp(14px, 1.1vw, 18px);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
      color: var(--m02-text);
    }
    .web-hero__sub {
      font-size: 10px;
      color: var(--m02-text-3);
      margin: 0 0 10px;
      line-height: 1.4;
    }
    .web-hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, ${dark ? "#7c6cff" : "#6555e8"}, ${dark ? "#20d5c7" : "#009f95"});
    }
    .web-hero__product {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .web-hero__img {
      width: 80%;
      aspect-ratio: 1;
      border-radius: 16px;
      background: radial-gradient(circle, ${dark ? "rgba(124,108,255,0.2)" : "rgba(101,85,232,0.12)"}, ${dark ? "rgba(32,213,199,0.1)" : "rgba(0,159,149,0.08)"} 60%, transparent 80%);
      position: relative;
    }
    .web-hero__img-glow {
      position: absolute;
      inset: 15%;
      border-radius: 50%;
      background: radial-gradient(circle, ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"}, transparent 70%);
    }
    .web-hero__price {
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      color: var(--m02-text);
      background: ${dark ? "rgba(14,17,40,0.85)" : "rgba(255,255,255,0.9)"};
      padding: 3px 7px;
      border-radius: 6px;
      border: 1px solid var(--m02-border);
    }

    .web-products {
      display: flex;
      gap: 8px;
      padding: 8px 12px 10px;
      border-top: 1px solid var(--m02-border);
    }
    .web-product {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--m02-border);
      background: var(--m02-scene-surface);
    }
    .web-product__swatch {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .web-product__name {
      display: block;
      font-size: 9px;
      font-weight: 600;
      color: var(--m02-text);
      line-height: 1.2;
    }
    .web-product__price {
      display: block;
      font-size: 9px;
      color: var(--m02-text-3);
      margin-top: 1px;
    }

    /* ===== APP PANEL ===== */
    .app {
      flex: 1;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 0;
      border-radius: 12px;
      border: 1px solid var(--m02-border);
      background: ${dark ? "#0e1128" : "#ffffff"};
      overflow: hidden;
      min-height: 0;
    }
    .app-inbox {
      border-bottom: 1px solid var(--m02-border);
    }
    .app-inbox__head {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--m02-text-3);
      padding: 10px 12px 6px;
    }
    .app-entry {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      border-bottom: 1px solid var(--m02-border);
    }
    .app-entry:last-child {
      border-bottom: none;
    }
    .app-entry--active {
      background: ${dark ? "rgba(124,108,255,0.08)" : "rgba(101,85,232,0.05)"};
    }
    .app-entry__ava {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 10px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }
    .app-entry__info {
      flex: 1;
      min-width: 0;
    }
    .app-entry__name {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: var(--m02-text);
      line-height: 1.2;
    }
    .app-entry__src {
      display: block;
      font-size: 9px;
      color: var(--m02-text-3);
      margin-top: 1px;
    }
    .app-entry__badge {
      font-size: 8px;
      font-weight: 600;
      color: var(--m02-violet);
      padding: 2px 6px;
      border-radius: 999px;
      background: ${dark ? "rgba(124,108,255,0.14)" : "rgba(101,85,232,0.10)"};
      white-space: nowrap;
    }

    .app-active {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .app-active__head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--m02-text-3);
    }
    .app-active__badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--m02-cyan);
    }
    .app-active__title {
      font-size: clamp(14px, 1.1vw, 17px);
      font-weight: 700;
      margin: 2px 0;
      color: var(--m02-text);
    }
    .app-active__meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      color: var(--m02-text-2);
    }
    .app-active__confirmed {
      font-size: 10px;
      font-weight: 600;
      color: var(--m02-green);
    }
    .app-active__client,
    .app-active__assigned {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--m02-text-2);
    }
    .app-active__client-label,
    .app-active__assigned-label {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--m02-text-3);
      min-width: 50px;
    }

    .app-actions {
      padding: 10px 12px;
      border-top: 1px solid var(--m02-border);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .app-actions__label {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--m02-text-3);
      margin-bottom: 2px;
    }
    .app-action {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--m02-text-2);
    }
    .app-action__icon {
      color: var(--m02-text-3);
      font-size: 10px;
    }

    /* ===== DASHBOARD PANEL ===== */
    .dash {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-radius: 12px;
      border: 1px solid var(--m02-border);
      background: ${dark ? "#0e1128" : "#ffffff"};
      padding: 12px;
      overflow: hidden;
      min-height: 0;
    }
    .dash-kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .dash-kpi {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--m02-border);
      background: var(--m02-scene-surface);
    }
    .dash-kpi__label {
      display: block;
      font-family: var(--font-mono);
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--m02-text-3);
      margin-bottom: 4px;
    }
    .dash-kpi__value {
      display: block;
      font-size: clamp(14px, 1.1vw, 18px);
      font-weight: 700;
      color: var(--m02-text);
      line-height: 1.1;
    }
    .dash-kpi__change {
      display: block;
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 600;
      color: var(--m02-green);
      margin-top: 2px;
    }

    .dash-chart {
      border: 1px solid var(--m02-border);
      border-radius: 10px;
      padding: 10px 10px 4px;
      background: var(--m02-scene-surface);
      flex: 1;
      min-height: 0;
    }
    .dash-chart svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .dash-chart__dot {
      filter: drop-shadow(0 0 4px ${dark ? "rgba(243,245,255,0.4)" : "rgba(17,20,38,0.3)"});
    }

    .dash-insight {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: var(--m02-text-2);
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--m02-border);
      background: ${dark ? "rgba(124,108,255,0.06)" : "rgba(101,85,232,0.04)"};
    }
    .dash-insight__icon {
      color: var(--m02-violet);
      font-weight: 700;
    }

    .dash-alert {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 500;
      color: var(--m02-amber);
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid ${dark ? "rgba(255,180,94,0.3)" : "rgba(168,96,0,0.2)"};
      background: ${dark ? "rgba(255,180,94,0.08)" : "rgba(168,96,0,0.06)"};
    }
    .dash-alert__dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--m02-amber);
      flex-shrink: 0;
    }

    /* ===== CONNECTION LINE ===== */
    .pj-line {
      position: absolute;
      top: 68%;
      left: 0;
      right: 0;
      height: 2px;
      pointer-events: none;
    }
    .pj-line__track {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg,
        var(--m02-violet) 0%,
        ${dark ? "#4d8dff" : "#4d8dff"} 50%,
        var(--m02-cyan) 100%);
      opacity: 0.25;
    }
    .pj-line__pulse {
      position: absolute;
      top: -4px;
      left: 0;
      width: 60px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(ellipse, ${dark ? "rgba(124,108,255,0.6)" : "rgba(101,85,232,0.4)"}, transparent 70%);
      animation: m02pulse 9s ease-in-out infinite;
    }
    .pj-line__node {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--m02-violet);
      background: var(--m02-scene);
    }
    .pj-line__node--1 { left: 16%; border-color: var(--m02-violet); }
    .pj-line__node--2 { left: 50%; border-color: ${dark ? "#4d8dff" : "#4d8dff"}; }
    .pj-line__node--3 { left: 84%; border-color: var(--m02-cyan); }

    @keyframes m02pulse {
      0% { left: 8%; opacity: 0; }
      10% { opacity: 1; }
      33% { left: 42%; opacity: 1; }
      66% { left: 76%; opacity: 1; }
      76% { opacity: 0; }
      100% { left: 92%; opacity: 0; }
    }

    /* ===== CLOSING ===== */
    .m02-closing {
      text-align: center;
      margin: clamp(40px, 4vw, 52px) auto 0;
      font-size: clamp(20px, 1.8vw, 28px);
      font-weight: 600;
      line-height: 1.35;
      max-width: 780px;
      width: min(1480px, calc(100% - 64px));
      margin-inline: auto;
      color: var(--m02-text);
    }
    .m02-closing strong {
      font-weight: 650;
    }
    .m02-closing--accent {
      background: linear-gradient(135deg, ${dark ? "#7c6cff" : "#6555e8"}, ${dark ? "#20d5c7" : "#009f95"});
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* ===== RESPONSIVE ===== */

    /* Tablet horizontal — 1024 to 1279 */
    @media (max-width: 1279px) {
      .pj {
        width: min(1480px, calc(100% - 48px));
      }
      .m02-header {
        width: min(1480px, calc(100% - 48px));
      }
      .m02-closing {
        width: min(1480px, calc(100% - 48px));
      }
    }

    @media (max-width: 1023px) {
      .pj-grid {
        grid-template-columns: 2fr 3fr;
        grid-template-rows: auto auto;
        height: auto;
        min-height: auto;
      }
      .pj-col--web {
        grid-row: 1;
        grid-column: 1;
        border-right: 1px solid var(--m02-border);
        border-bottom: none;
      }
      .pj-col--app {
        grid-row: 1;
        grid-column: 2;
        border-right: none;
        border-bottom: none;
      }
      .pj-col--dash {
        grid-row: 2;
        grid-column: 1 / -1;
        border-top: 1px solid var(--m02-border);
        border-right: none;
      }
      .pj-line { display: none; }
    }

    /* Tablet vertical — 768 to 1023 */
    @media (max-width: 1023px) {
      .pj-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
      .pj-col {
        border-right: none;
        border-bottom: 1px solid var(--m02-border);
      }
      .pj-col:last-child {
        border-bottom: none;
      }
      .pj-col--app {
        background: transparent;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .m02 {
        padding-block: 80px;
      }
      .m02-header {
        width: min(100% - 40px, 540px);
        margin-bottom: clamp(40px, 5vw, 56px);
      }
      .m02-title {
        font-size: clamp(38px, 8vw, 48px);
      }
      .m02-desc {
        font-size: clamp(16px, 3.5vw, 18px);
      }
      .pj {
        width: min(100% - 40px, 540px);
        border-radius: 20px;
      }
      .pj-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      .pj-col {
        padding: 16px;
        min-height: auto;
      }
      .pj-col--app {
        background: transparent;
      }
      .pj-col__title {
        font-size: 16px;
      }
      .pj-col__text {
        font-size: 12px;
      }

      .web-hero {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .web-hero__product {
        display: none;
      }
      .web-products {
        display: none;
      }

      .app-inbox {
        display: none;
      }

      .dash-kpis {
        grid-template-columns: repeat(3, 1fr);
      }
      .dash-kpi__value {
        font-size: 14px;
      }

      .m02-closing {
        width: min(100% - 40px, 540px);
        text-align: left;
        font-size: clamp(21px, 4.5vw, 24px);
        margin-top: clamp(40px, 5vw, 48px);
      }

      .pj-line { display: none; }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .pj-line__pulse { animation: none; }
    }
  `
}
