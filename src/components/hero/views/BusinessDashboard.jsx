import { useState, useEffect } from "react"

const REVENUE_7D = [2.1, 2.8, 2.4, 3.2, 2.9, 3.6, 3.4]
const REVENUE_30D = [1.8, 2.1, 2.5, 2.3, 2.8, 3.1, 2.7, 3.2, 2.9, 3.5, 3.1, 3.8, 3.4, 4.1, 3.7, 4.3, 3.9, 4.5, 4.2, 4.8, 4.4, 5.0, 4.6, 5.2, 4.9, 5.4, 5.1, 5.6, 5.3, 5.8]
const ORDERS_7D = [145, 178, 162, 198, 185, 215, 202]
const ORDERS_30D = [120, 135, 148, 142, 165, 178, 158, 192, 180, 210, 195, 225, 208, 242, 228, 258, 245, 275, 262, 290, 278, 305, 292, 318, 305, 332, 320, 345, 335, 358]

const KPI_DATA = {
  "7": [
    { label: "Facturacion", value: "$5,2 M", change: "+18,6%", up: true },
    { label: "Pedidos", value: "1.284", change: "+12,3%", up: true },
    { label: "Ticket prom.", value: "$14.330", change: "+5,7%", up: true },
    { label: "Recompra", value: "31,8%", change: "+3,2 pp", up: true },
  ],
  "30": [
    { label: "Facturacion", value: "$18,4 M", change: "+22,1%", up: true },
    { label: "Pedidos", value: "4.856", change: "+15,8%", up: true },
    { label: "Ticket prom.", value: "$15.120", change: "+8,2%", up: true },
    { label: "Recompra", value: "34,2%", change: "+4,1 pp", up: true },
  ],
}

const INSIGHTS = {
  "7": "Las suscripciones crecieron 24% y concentran el mayor nivel de recompra.",
  "30": "El canal app supero al local en volumen de pedidos por primera vez.",
}

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
  const W = 460
  const H = 140
  const PAD = { top: 10, right: 10, bottom: 24, left: 35 }
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

  // Y axis labels
  const yTicks = 4
  const yLabels = Array.from({ length: yTicks }, (_, i) => {
    const val = minRev + ((maxRev - minRev) / (yTicks - 1)) * i
    return { y: toYRev(val), label: `$${val.toFixed(1)}M` }
  })

  // X axis labels
  const xStep = range === "7" ? 1 : 7
  const xLabels = revenue
    .map((_, i) => i)
    .filter((i) => i % xStep === 0 || i === revenue.length - 1)
    .map((i) => ({ x: toX(i), label: range === "7" ? `L${i + 1}` : `${i + 1}` }))

  return (
    <div className="w-full h-full flex bg-[#0d0f1a] text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-[120px] shrink-0 border-r border-white/[0.06] p-3 flex-col gap-1 hidden md:flex">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-5 h-5 rounded bg-[#7957ff]/30 flex items-center justify-center">
            <span className="text-[8px] font-display font-bold text-[#a594ff]">N</span>
          </div>
          <span className="text-[10px] font-display font-bold text-white">Nomada</span>
        </div>
        {["Performance", "Productos", "Canales", "Clientes"].map((item, i) => (
          <div
            key={item}
            className={`px-2.5 py-1.5 rounded-md text-[10px] ${
              i === 0 ? "bg-white/[0.08] text-white font-medium" : "text-[#6a6a6a]"
            }`}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-3">
        {/* Header */}
        <header className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[13px] font-semibold text-white">Performance</h2>
            <span className="text-[9px] text-[#5a5a5a]">Agosto 2025</span>
          </div>
          <div className="flex gap-1 bg-white/[0.04] rounded-lg p-0.5">
            {["7", "30"].map((r) => (
              <button
                key={r}
                onClick={() => isInteractive && setRange(r)}
                className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${
                  range === r ? "bg-[#7957ff]/20 text-[#a594ff]" : "text-[#6a6a6a] hover:text-[#9a9a9a]"
                }`}
              >
                {r === "7" ? "7 dias" : "30 dias"}
              </button>
            ))}
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[8px] text-[#5a5a5a] uppercase tracking-wider">{kpi.label}</span>
              <span className="block text-[15px] font-bold text-white mt-0.5">{kpi.value}</span>
              <span className={`text-[9px] font-medium ${kpi.up ? "text-[#42d392]" : "text-[#ff747f]"}`}>
                {kpi.change}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 flex gap-2 min-h-0">
          <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-[#6a6a6a]">Facturacion y pedidos</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 rounded bg-[#7957ff]" /><span className="text-[8px] text-[#5a5a5a]">Facturacion</span></span>
                <span className="flex items-center gap-1"><span className="w-2 h-0.5 rounded bg-[#45e2d5]" /><span className="text-[8px] text-[#5a5a5a]">Pedidos</span></span>
              </div>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7957ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7957ff" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {yLabels.map((t, i) => (
                <g key={i}>
                  <line x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y} stroke="white" strokeOpacity="0.05" />
                  <text x={PAD.left - 4} y={t.y + 3} textAnchor="end" fill="#4a4a5a" fontSize="7" fontFamily="Inter">
                    {t.label}
                  </text>
                </g>
              ))}

              {/* X labels */}
              {xLabels.map((t, i) => (
                <text key={i} x={t.x} y={H - 4} textAnchor="middle" fill="#4a4a5a" fontSize="7" fontFamily="Inter">
                  {t.label}
                </text>
              ))}

              {/* Revenue area */}
              <polygon points={revAreaPoints} fill="url(#revGrad)" />
              {/* Revenue line */}
              <polyline points={revPoints} fill="none" stroke="#7957ff" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Orders line */}
              <polyline points={ordPoints} fill="none" stroke="#45e2d5" strokeWidth="1" strokeLinejoin="round" strokeDasharray="3,2" />

              {/* Tooltip */}
              {tooltipIdx !== null && tooltipIdx < revenue.length && (
                <g>
                  <line x1={toX(tooltipIdx)} y1={PAD.top} x2={toX(tooltipIdx)} y2={PAD.top + cH} stroke="white" strokeOpacity="0.15" strokeDasharray="2,2" />
                  <circle cx={toX(tooltipIdx)} cy={toYRev(revenue[tooltipIdx])} r="3" fill="#7957ff" stroke="#0d0f1a" strokeWidth="1.5" />
                  <rect x={toX(tooltipIdx) - 30} y={toYRev(revenue[tooltipIdx]) - 20} width="60" height="14" rx="3" fill="#1a1a2e" stroke="white" strokeOpacity="0.1" />
                  <text x={toX(tooltipIdx)} y={toYRev(revenue[tooltipIdx]) - 11} textAnchor="middle" fill="white" fontSize="7" fontFamily="Inter" fontWeight="600">
                    ${revenue[tooltipIdx]}M
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Right column */}
          <div className="w-[160px] shrink-0 flex flex-col gap-2">
            {/* Channels */}
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-2.5">
              <span className="text-[8px] text-[#5a5a5a] uppercase tracking-wider">Canales</span>
              {[
                { label: "Web", pct: "46%", color: "#7957ff" },
                { label: "App", pct: "32%", color: "#45e2d5" },
                { label: "Local", pct: "22%", color: "#ff6fae" },
              ].map((ch) => (
                <div key={ch.label} className="flex items-center gap-2 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span className="text-[9px] text-[#8a8a8a] flex-1">{ch.label}</span>
                  <span className="text-[9px] font-semibold text-white">{ch.pct}</span>
                </div>
              ))}
            </div>

            {/* Top products */}
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-2.5">
              <span className="text-[8px] text-[#5a5a5a] uppercase tracking-wider">Top productos</span>
              {[
                { name: "Bosque 500g", val: "$4,8 M" },
                { name: "Nocturno 1kg", val: "$3,6 M" },
                { name: "Suscripcion", val: "$2,9 M" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] text-[#8a8a8a] truncate">{p.name}</span>
                  <span className="text-[9px] font-semibold text-white ml-1">{p.val}</span>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div className="rounded-lg bg-[#7957ff]/[0.06] border border-[#7957ff]/20 p-2.5 flex-1">
              <span className="text-[8px] text-[#7957ff] uppercase tracking-wider font-medium">Insight</span>
              <p className="text-[9px] text-[#b5bdd4] mt-1 leading-relaxed">{insight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
