import { useState, useEffect } from "react"

export default function InsightsPanel() {
  const [showRec, setShowRec] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowRec(true), 1800)
    return () => clearTimeout(t)
  }, [])

  const chartW = 300
  const chartH = 120
  const data = [180, 210, 195, 240, 225, 280, 265, 310, 295, 340, 325, 365, 350, 380]
  const max = Math.max(...data) * 1.1
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * chartW},${chartH - (v / max) * chartH}`)
    .join(" ")
  const areaPoints = `0,${chartH} ${points} ${chartW},${chartH}`

  const lastPoint = data[data.length - 1]
  const lastX = chartW
  const lastY = chartH - (lastPoint / max) * chartH

  return (
    <div className="pg-card__scene" aria-hidden="true">
      <div className="sc-dash">
        {/* Header */}
        <div className="sc-dash__header">
          <span className="sc-dash__header-label">Ventas del mes</span>
          <span className="sc-dash__header-range">Últimos 30 días</span>
        </div>

        <div className="sc-dash__hero">
          <span className="sc-dash__number animate-count">$1.284.600</span>
          <span className="sc-dash__change">+18% vs mes anterior</span>
        </div>

        <div className="sc-dash__chart">
          <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="dashLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c6cff" />
                <stop offset="100%" stopColor="#20d5c7" />
              </linearGradient>
              <linearGradient id="dashAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c6cff" />
                <stop offset="100%" stopColor="#20d5c7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon className="ar" points={areaPoints} />
            <polyline className="ln animate-draw" points={points} />
            {/* Data point at the end */}
            <circle className="dot" cx={lastX} cy={lastY} r="3" />
          </svg>
        </div>

        <div className="sc-dash__kpis">
          <div className="sc-dash__kpi">
            <span className="sc-dash__kpi-label">Clientes activos</span>
            <span className="sc-dash__kpi-value">342</span>
          </div>
          <div className="sc-dash__kpi">
            <span className="sc-dash__kpi-label">Pedidos completados</span>
            <span className="sc-dash__kpi-value">85</span>
          </div>
        </div>

        {showRec && (
          <div className="sc-dash__rec animate-fade">
            <b>→</b>
            El horario con más pedidos es de 17 a 19 h.
          </div>
        )}
      </div>
    </div>
  )
}
