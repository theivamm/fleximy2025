import { useState, useEffect } from "react"

const REVENUE_7D = [2.1, 2.8, 2.4, 3.2, 2.9, 3.6, 3.4]
const REVENUE_30D = [1.8, 2.1, 2.5, 2.3, 2.8, 3.1, 2.7, 3.2, 2.9, 3.5, 3.1, 3.8, 3.4, 4.1, 3.7, 4.3, 3.9, 4.5, 4.2, 4.8, 4.4, 5.0, 4.6, 5.2, 4.9, 5.4, 5.1, 5.6, 5.3, 5.8]
const ORDERS_7D = [145, 178, 162, 198, 185, 215, 202]
const ORDERS_30D = [120, 135, 148, 142, 165, 178, 158, 192, 180, 210, 195, 225, 208, 242, 228, 258, 245, 275, 262, 290, 278, 305, 292, 318, 305, 332, 320, 345, 335, 358]

const KPI_DATA = {
  "7": [
    { label: "Facturación", value: "$5,2 M", change: "+18,6%", up: true },
    { label: "Pedidos", value: "1.284", change: "+12,3%", up: true },
    { label: "Ticket prom.", value: "$14.330", change: "+5,7%", up: true },
    { label: "Recompra", value: "31,8%", change: "+3,2 pp", up: true },
  ],
  "30": [
    { label: "Facturación", value: "$18,4 M", change: "+22,1%", up: true },
    { label: "Pedidos", value: "4.856", change: "+15,8%", up: true },
    { label: "Ticket prom.", value: "$15.120", change: "+8,2%", up: true },
    { label: "Recompra", value: "34,2%", change: "+4,1 pp", up: true },
  ],
}

const INSIGHTS = {
  "7": "Las suscripciones crecieron 24% y concentran el mayor nivel de recompra.",
  "30": "El canal app superó al local en volumen de pedidos por primera vez.",
}

const CHANNELS = [
  { label: "Web", pct: "46%", color: "#7957ff" },
  { label: "App", pct: "32%", color: "#45e2d5" },
  { label: "Local", pct: "22%", color: "#ff6fae" },
]

const TOP_PRODUCTS = [
  { name: "Bosque 500g", val: "$4,8 M", pct: 26 },
  { name: "Nocturno 1kg", val: "$3,6 M", pct: 20 },
  { name: "Suscripción", val: "$2,9 M", pct: 16 },
  { name: "Altura 250g", val: "$2,1 M", pct: 11 },
]

export default function BusinessDashboard({ isInteractive }) {
  const [range, setRange] = useState("7")
  const [tooltipIdx, setTooltipIdx] = useState(null)

  const revenue = range === "7" ? REVENUE_7D : REVENUE_30D
  const orders = range === "7" ? ORDERS_7D : ORDERS_30D
  const kpis = KPI_DATA[range] || KPI_DATA["7"]
  const insight = INSIGHTS[range] || INSIGHTS["7"]

  useEffect(() => {
    if (!isInteractive) return
    const t = setTimeout(() => setRange("30"), 3000)
    const t2 = setTimeout(() => setTooltipIdx(14), 4000)
    const t3 = setTimeout(() => setTooltipIdx(null), 5500)
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3) }
  }, [isInteractive])

  // Chart dimensions
  const W = 520
  const H = 160
  const PAD = { top: 12, right: 12, bottom: 28, left: 40 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom

  const maxRev = Math.max(...revenue) * 1.15
  const minRev = Math.min(...revenue) * 0.85

  const toX = (i) => PAD.left + (i / (revenue.length - 1)) * cW
  const toYRev = (v) => PAD.top + cH - ((v - minRev) / (maxRev - minRev)) * cH

  const maxOrd = Math.max(...orders) * 1.15
  const toYOrd = (v) => PAD.top + cH - (v / maxOrd) * cH

  const revPoints = revenue.map((v, i) => `${toX(i)},${toYRev(v)}`).join(" ")
  const revAreaPoints = `${toX(0)},${PAD.top + cH} ${revPoints} ${toX(revenue.length - 1)},${PAD.top + cH}`
  const ordPoints = orders.map((v, i) => `${toX(i)},${toYOrd(v)}`).join(" ")

  const yTicks = 4
  const yLabels = Array.from({ length: yTicks }, (_, i) => {
    const val = minRev + ((maxRev - minRev) / (yTicks - 1)) * i
    return { y: toYRev(val), label: `$${val.toFixed(1)}M` }
  })

  const xStep = range === "7" ? 1 : 7
  const xLabels = revenue
    .map((_, i) => i)
    .filter((i) => i % xStep === 0 || i === revenue.length - 1)
    .map((i) => ({ x: toX(i), label: range === "7" ? `L${i + 1}` : `${i + 1}` }))

  return (
    <div className="w-full h-full flex text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif", background: "#0d0f1a" }}>
      {/* Sidebar */}
      <aside
        className="shrink-0 border-r hidden md:flex flex-col"
        style={{ width: "130px", borderColor: "rgba(255,255,255,0.06)", padding: "12px" }}
      >
        <div className="flex items-center gap-2 mb-5 px-1">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(121,87,255,0.3)" }}>
            <span style={{ fontSize: "9px", fontWeight: 700, color: "#a594ff", fontFamily: "Space Grotesk" }}>N</span>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "Space Grotesk" }}>Nómada</span>
        </div>
        {["Performance", "Productos", "Canales", "Clientes"].map((item, i) => (
          <div
            key={item}
            className="rounded-md"
            style={{
              padding: "7px 10px",
              fontSize: "12px",
              background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
              color: i === 0 ? "#fff" : "#6a6a6a",
              fontWeight: i === 0 ? 500 : 400,
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ padding: "14px" }}>
        {/* Header */}
        <header className="flex items-center justify-between shrink-0" style={{ marginBottom: "12px" }}>
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Performance</h2>
            <span style={{ fontSize: "10px", color: "#5a5a5a" }}>Agosto 2025</span>
          </div>
          <div className="flex gap-1 rounded-lg" style={{ padding: "2px", background: "rgba(255,255,255,0.04)" }}>
            {["7", "30"].map((r) => (
              <button
                key={r}
                onClick={() => isInteractive && setRange(r)}
                className="rounded-md transition-all"
                style={{
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 500,
                  background: range === r ? "rgba(121,87,255,0.2)" : "transparent",
                  color: range === r ? "#a594ff" : "#6a6a6a",
                  cursor: isInteractive ? "pointer" : "default",
                }}
              >
                {r === "7" ? "7 días" : "30 días"}
              </button>
            ))}
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-2 shrink-0" style={{ marginBottom: "12px" }}>
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg"
              style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: "9px", color: "#5a5a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{kpi.label}</span>
              <span className="block" style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>{kpi.value}</span>
              <span style={{ fontSize: "10px", fontWeight: 500, color: kpi.up ? "#42d392" : "#ff747f" }}>{kpi.change}</span>
            </div>
          ))}
        </div>

        {/* Chart + sidebar */}
        <div className="flex flex-1 gap-2 min-h-0">
          {/* Main chart */}
          <div
            className="flex-1 rounded-lg overflow-hidden flex flex-col"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px" }}
          >
            <div className="flex items-center justify-between shrink-0" style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", color: "#6a6a6a" }}>Facturación y pedidos</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-[2px] rounded" style={{ background: "#7957ff" }} />
                  <span style={{ fontSize: "9px", color: "#5a5a5a" }}>Facturación</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-[2px] rounded" style={{ background: "#45e2d5" }} />
                  <span style={{ fontSize: "9px", color: "#5a5a5a" }}>Pedidos</span>
                </span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7957ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7957ff" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {yLabels.map((t, i) => (
                  <g key={i}>
                    <line x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y} stroke="white" strokeOpacity="0.05" />
                    <text x={PAD.left - 6} y={t.y + 3} textAnchor="end" fill="#4a4a5a" fontSize="8" fontFamily="Inter">
                      {t.label}
                    </text>
                  </g>
                ))}

                {xLabels.map((t, i) => (
                  <text key={i} x={t.x} y={H - 4} textAnchor="middle" fill="#4a4a5a" fontSize="8" fontFamily="Inter">
                    {t.label}
                  </text>
                ))}

                <polygon points={revAreaPoints} fill="url(#revGrad)" />
                <polyline points={revPoints} fill="none" stroke="#7957ff" strokeWidth="2" strokeLinejoin="round" />
                <polyline points={ordPoints} fill="none" stroke="#45e2d5" strokeWidth="1.2" strokeLinejoin="round" strokeDasharray="4,3" />

                {tooltipIdx !== null && tooltipIdx < revenue.length && (
                  <g>
                    <line x1={toX(tooltipIdx)} y1={PAD.top} x2={toX(tooltipIdx)} y2={PAD.top + cH} stroke="white" strokeOpacity="0.15" strokeDasharray="2,2" />
                    <circle cx={toX(tooltipIdx)} cy={toYRev(revenue[tooltipIdx])} r="4" fill="#7957ff" stroke="#0d0f1a" strokeWidth="2" />
                    <rect x={toX(tooltipIdx) - 32} y={toYRev(revenue[tooltipIdx]) - 22} width="64" height="16" rx="4" fill="#1a1a2e" stroke="white" strokeOpacity="0.1" />
                    <text x={toX(tooltipIdx)} y={toYRev(revenue[tooltipIdx]) - 12} textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter" fontWeight="600">
                      ${revenue[tooltipIdx]}M
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-2" style={{ width: "180px" }}>
            {/* Channels */}
            <div
              className="rounded-lg"
              style={{ padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: "9px", color: "#5a5a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Canales</span>
              {CHANNELS.map((ch) => (
                <div key={ch.label} className="flex items-center gap-2" style={{ marginTop: "8px" }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                  <span className="flex-1" style={{ fontSize: "11px", color: "#8a8a8a" }}>{ch.label}</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{ch.pct}</span>
                </div>
              ))}
            </div>

            {/* Top products */}
            <div
              className="rounded-lg"
              style={{ padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: "9px", color: "#5a5a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Top productos</span>
              {TOP_PRODUCTS.map((p) => (
                <div key={p.name} style={{ marginTop: "8px" }}>
                  <div className="flex items-center justify-between">
                    <span className="truncate" style={{ fontSize: "11px", color: "#8a8a8a" }}>{p.name}</span>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff", marginLeft: "8px" }}>{p.val}</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.06)", marginTop: "4px" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "#7957ff" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div
              className="rounded-lg flex-1"
              style={{ padding: "12px", background: "rgba(121,87,255,0.06)", border: "1px solid rgba(121,87,255,0.2)" }}
            >
              <span style={{ fontSize: "9px", color: "#7957ff", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Insight</span>
              <p style={{ fontSize: "11px", color: "#b5bdd4", marginTop: "6px", lineHeight: 1.5 }}>{insight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
