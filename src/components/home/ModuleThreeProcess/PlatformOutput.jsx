export default function PlatformOutput({ active, reducedMotion }) {
  const on = active || reducedMotion

  return (
    <div className="m3p-output">
      <div className="m3p-output__head">
        <span className="m3p-zone-label">Tu plataforma</span>
        {on && (
          <span className={`m3p-ready ${reducedMotion ? "" : "breathe"}`}>
            <i aria-hidden="true" />
            Listo para usar
          </span>
        )}
      </div>

      <div className="m3p-blocks">
        <span className="m3p-blocks__rail" aria-hidden="true" />

        {/* WEBSITE */}
        <section className={`m3p-block ${on ? "" : "is-dim"}`} style={{ "--d": ".1s" }} aria-label="Website">
          <header className="m3p-block__title">
            Website
            <span className="m3p-block__tag">público</span>
          </header>
          <div className="m3p-web">
            <span className="m3p-web__nav">
              <i className="dot" />
              <i className="bar" /><i className="bar" /><i className="bar" />
              <em className="btn" />
            </span>
            <span className="m3p-web__hero">
              <i /><i />
            </span>
            <span className="m3p-web__cta" />
          </div>
        </section>

        {/* APP DE GESTIÓN */}
        <section className={`m3p-block ${on ? "" : "is-dim"}`} style={{ "--d": ".55s" }} aria-label="App de gestión">
          <header className="m3p-block__title">
            App de gestión
            <span className="m3p-block__tag">interna</span>
          </header>
          <div className="m3p-app">
            <span className="m3p-app__side">
              <i /><i /><i />
            </span>
            <ul className="m3p-app__list">
              <li>
                <i className="txt" />
                <em>lista de clientes</em>
              </li>
              <li>
                <i className="txt short" />
                <em>estado de pedidos</em>
                <b className="chip ok">nuevo</b>
              </li>
              <li>
                <i className="txt" />
                <em>tareas asignadas</em>
              </li>
            </ul>
          </div>
        </section>

        {/* DASHBOARD */}
        <section className={`m3p-block ${on ? "" : "is-dim"}`} style={{ "--d": "1s" }} aria-label="Dashboard">
          <header className="m3p-block__title">
            Dashboard
            <span className="m3p-block__tag">resultados</span>
          </header>
          <div className="m3p-dash">
            <svg viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="m3pDashLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#765dff" />
                  <stop offset="60%" stopColor="#18d6d2" />
                  <stop offset="100%" stopColor="#18d6d2" />
                </linearGradient>
              </defs>
              <path
                d="M2 26 C22 24 30 14 52 16 C74 18 86 6 118 8"
                fill="none"
                stroke="url(#m3pDashLine)"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={active && !reducedMotion ? "draw" : ""}
              />
            </svg>
            <span className="m3p-dash__kpis">
              <i /><i /><i />
            </span>
          </div>
        </section>
      </div>

      <p className={`m3p-outlabel ${on ? "on" : ""}`}>Creado alrededor de tu negocio</p>
    </div>
  )
}
