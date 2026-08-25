export default function InsightsPanel({ active }) {
  return (
    <>
      <div className="pg-copy">
        <p className="pg-kicker">04 · Tus números</p>
        <h3>Mirá cómo funciona tu negocio, sin armar reportes.</h3>
        <p>
          Ventas, clientes, productos y tareas importantes reunidos en un dashboard
          claro para decidir mejor.
        </p>
        <p className="pg-punch">La información importante, lista para usar.</p>
      </div>

      <div className="pg-scene pg-ins" aria-hidden="true">
        <div className="pg-kpis">
          <div className="pg-kpi">
            <span className="pg-kpi__l">Ventas</span>
            <span className="pg-kpi__s up">Subiendo</span>
          </div>
          <div className="pg-kpi">
            <span className="pg-kpi__l">Clientes</span>
            <span className="pg-kpi__s flat">Estable</span>
          </div>
          <div className="pg-kpi">
            <span className="pg-kpi__l">Operación</span>
            <span className="pg-kpi__s warn">Requiere atención</span>
          </div>
        </div>

        <div className="pg-area">
          <svg viewBox="0 0 300 96" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pgAreaGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7957ff" />
                <stop offset="100%" stopColor="#15cbea" />
              </linearGradient>
              <linearGradient id="pgAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7957ff" />
                <stop offset="100%" stopColor="#15cbea" stopOpacity="0" />
              </linearGradient>
            </defs>
            {active && (
              <>
                <path
                  className="ar"
                  d="M4 78 C 40 70, 60 44, 100 52 S 160 30, 200 38 S 262 16, 296 22 L296 92 L4 92 Z"
                />
                <path
                  className="ln"
                  d="M4 78 C 40 70, 60 44, 100 52 S 160 30, 200 38 S 262 16, 296 22"
                />
              </>
            )}
          </svg>
        </div>

        <div className="pg-insrow">
          <div className="pg-rec">
            <b>→</b>
            Los pedidos de la tarde se concentran entre 17:00 y 19:00.
          </div>
          <div className="pg-donut">
            <svg viewBox="0 0 64 64" width="74" height="74">
              <circle className="bg" cx="32" cy="32" r="28" />
              <circle className="fg" cx="32" cy="32" r="28" />
            </svg>
          </div>
        </div>

        <span className="pg-timeline">{active && <i />}</span>
      </div>
    </>
  )
}
