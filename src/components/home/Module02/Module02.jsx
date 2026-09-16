import "./module02.css"

/* ==========================================================================
   MODULE 02 — WEB + APP + DASHBOARD
   Tres capas del producto en tres paneles de igual jerarquía.
   El CSS vive en module02.css (externo), no inline ni como string.
   ========================================================================== */

export default function Module02() {
  return (
    <section id="plataforma" aria-labelledby="m02-title" className="m02">
      <header className="m02-header">
        <p className="m02-eyebrow">TODO EN UNA SOLA PLATAFORMA</p>
        <h2 id="m02-title" className="m02-title font-display">
          Tu web vende.{" "}
          <span className="m02-title--accent">Tu aplicación organiza.</span>{" "}
          Tu dashboard te muestra qué sigue.
        </h2>
        <p className="m02-desc">
          Creamos las tres partes alrededor de tu negocio para que tus clientes,
          tu equipo y tu información trabajen en el mismo sistema.
        </p>
      </header>

      <div className="platform-grid">
        <WebsitePanel />
        <ManagementPanel />
        <DashboardPanel />
      </div>

      <p className="m02-closing">
        <strong>Todo empieza en tu website.</strong>{" "}
        <span className="m02-closing--accent">
          Todo continúa dentro de tu plataforma.
        </span>
      </p>
    </section>
  )
}

/* ---------------------------------------------------------------------- */
/*  Panel 01 — Website público                                            */
/* ---------------------------------------------------------------------- */

function WebsitePanel() {
  return (
    <article className="mp mp--web">
      <header className="mp-head">
        <span className="mp-num">01</span>
        <h3 className="mp-title">
          Website <span className="mp-title--accent">público</span>
        </h3>
        <p className="mp-sentence">Tu negocio se presenta y convierte.</p>
      </header>

      <div className="mp-visual" aria-hidden="true">
        <div className="browser">
          <div className="browser__bar">
            <span className="browser__dot" />
            <span className="browser__dot" />
            <span className="browser__dot" />
            <span className="browser__url">TUHEGOCIO.COM</span>
          </div>
          <div className="browser__body">
            <div className="browser__copy">
              <span className="browser__title" />
              <span className="browser__line" />
              <span className="browser__line browser__line--short" />
              <span className="browser__cta" />
            </div>
            <div className="browser__cards">
              <span className="browser__card">
                <span className="browser__card-title" />
                <span className="browser__card-line" />
              </span>
              <span className="browser__card">
                <span className="browser__card-title" />
                <span className="browser__card-line" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mp-consequence">Clientes te encuentran, consultan y compran.</p>
    </article>
  )
}

/* ---------------------------------------------------------------------- */
/*  Panel 02 — Aplicación de gestión                                      */
/* ---------------------------------------------------------------------- */

function ManagementPanel() {
  return (
    <article className="mp mp--app">
      <header className="mp-head">
        <span className="mp-num">02</span>
        <h3 className="mp-title">
          Aplicación <span className="mp-title--accent">de gestión</span>
        </h3>
        <p className="mp-sentence">Todo el trabajo diario vive en un solo lugar.</p>
      </header>

      <div className="mp-visual" aria-hidden="true">
        <div className="manage">
          <div className="manage__side">
            <span className="manage__nav-dot manage__nav-dot--on" />
            <span className="manage__nav-dot" />
            <span className="manage__nav-dot" />
            <span className="manage__nav-dot" />
          </div>
          <div className="manage__main">
            <span className="manage__head">Consultas de hoy</span>
            <div className="manage__row manage__row--active">
              <span className="manage__ava" />
              <span className="manage__txt">
                <span className="manage__name" />
                <span className="manage__src" />
              </span>
              <span className="manage__badge">Nueva</span>
            </div>
            <div className="manage__row">
              <span className="manage__ava manage__ava--b" />
              <span className="manage__txt">
                <span className="manage__name" />
                <span className="manage__src" />
              </span>
            </div>
            <div className="manage__row">
              <span className="manage__ava" />
              <span className="manage__txt">
                <span className="manage__name" />
                <span className="manage__src" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mp-consequence">Pedidos, turnos y clientes ordenados para tu equipo.</p>
    </article>
  )
}

/* ---------------------------------------------------------------------- */
/*  Panel 03 — Dashboard y decisiones                                     */
/* ---------------------------------------------------------------------- */

function DashboardPanel() {
  const bars = [35, 55, 78, 48, 90, 62, 40]
  return (
    <article className="mp mp--dash">
      <header className="mp-head">
        <span className="mp-num">03</span>
        <h3 className="mp-title">
          Dashboard y <span className="mp-title--accent">decisiones</span>
        </h3>
        <p className="mp-sentence">Podés entender qué pasa y decidir qué sigue.</p>
      </header>

      <div className="mp-visual" aria-hidden="true">
        <div className="dash2">
          <div className="dash2__kpis">
            <div className="dash2__kpi">
              <span className="dash2__kpi-label">Ventas</span>
              <span className="dash2__kpi-value" />
              <span className="dash2__kpi-up" />
            </div>
            <div className="dash2__kpi">
              <span className="dash2__kpi-label">Pedidos</span>
              <span className="dash2__kpi-value" />
              <span className="dash2__kpi-up" />
            </div>
            <div className="dash2__kpi">
              <span className="dash2__kpi-label">Clientes</span>
              <span className="dash2__kpi-value" />
            </div>
          </div>
          <div className="dash2__chart">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`dash2__bar ${i === 4 ? "dash2__bar--hi" : i % 2 ? "dash2__bar--c" : "dash2__bar--v"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="dash2__alert">
            <span className="dash2__alert-dot" />
            Prioridad: stock bajo en tu producto top.
          </div>
        </div>
      </div>

      <p className="mp-consequence">Ves resultados y acciones claras para avanzar.</p>
    </article>
  )
}
