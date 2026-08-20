import { useState, useEffect } from "react"
import { BRUMA_ORDER } from "../data/brumaData"

const PALETTE = {
  crema: "#F3EBDD",
  espresso: "#241712",
  salvia: "#A8B89A",
  pistacho: "#C7D86D",
  coral: "#E47B62",
  tinta: "#171717",
}

const INITIAL_ORDERS = [
  { id: "#181", items: "Roll de Canela ×2", time: "12:15", status: "listo", total: "$13.000" },
  { id: "#182", items: "Focaccia Mortadela ×1", time: "12:22", status: "listo", total: "$12.800" },
  { id: "#183", items: "Iced Matcha ×3", time: "12:35", status: "preparando", total: "$17.700" },
]

const SALES_HOY = [180, 210, 195, 240, 225, 280, 265, 310, 295, 340, 325, 365, 350, 380]

export default function DashboardExperience({ isInteractive, story }) {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [metrics, setMetrics] = useState({ ventas: 1284600, pedidos: 85 })
  const [stock, setStock] = useState(12)
  const [notification, setNotification] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const newPedidos = story?.state?.dashMetrics?.pedidos ?? 85
  const newVentas = story?.state?.dashMetrics?.ventas ?? 1284600
  const newStock = story?.state?.dashStock?.["croissant-pistacho"] ?? 12

  useEffect(() => {
    setMetrics({ ventas: newVentas, pedidos: newPedidos })
    setStock(newStock)
  }, [newVentas, newPedidos, newStock])

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => {
      setNotification(`Pedido ${BRUMA_ORDER.id} recibido`)
      setOrders((prev) => [
        { id: BRUMA_ORDER.id, items: "Croissant Pistacho ×1, Iced Matcha ×1", time: BRUMA_ORDER.time, status: "nuevo", total: BRUMA_ORDER.total },
        ...prev,
      ])
    }, 1500)
    const t2 = setTimeout(() => {
      setNotification(null)
      setSelectedOrder(BRUMA_ORDER.id)
    }, 3000)
    const t3 = setTimeout(() => {
      story?.receiveOrder()
      setOrders((prev) =>
        prev.map((o) => (o.id === BRUMA_ORDER.id ? { ...o, status: "preparando" } : o))
      )
    }, 4500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isInteractive, story])

  // Mini chart
  const chartW = 200
  const chartH = 60
  const maxSale = Math.max(...SALES_HOY) * 1.1
  const points = SALES_HOY.map((v, i) => `${(i / (SALES_HOY.length - 1)) * chartW},${chartH - (v / maxSale) * chartH}`).join(" ")
  const areaPoints = `0,${chartH} ${points} ${chartW},${chartH}`

  return (
    <div
      className="w-full h-full flex text-[#e8e6e1] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: "#0d0f1a" }}
    >
      {/* Sidebar */}
      <aside
        className="shrink-0 border-r hidden md:flex flex-col"
        style={{ width: "130px", borderColor: "rgba(255,255,255,0.06)", padding: "12px" }}
      >
        <div className="flex items-center gap-2 mb-5 px-1">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `${PALETTE.coral}30` }}>
            <span style={{ fontSize: "9px", fontWeight: 700, color: PALETTE.coral, fontFamily: "'Space Grotesk'" }}>B</span>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk'" }}>Bruma</span>
        </div>
        {["Resumen", "Pedidos", "Menú", "Inventario", "Clientes", "Reportes"].map((item, i) => (
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
        {/* Top bar */}
        <header className="flex items-center justify-between shrink-0" style={{ marginBottom: "12px" }}>
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Resumen</h2>
            <div className="flex items-center gap-1.5" style={{ marginTop: "2px" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: PALETTE.salvia }} />
              <span style={{ fontSize: "10px", color: "#6a6a6a" }}>Operando · Palermo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: "4px 10px", background: "rgba(255,255,255,0.04)", fontSize: "11px", color: "#8a8a8a" }}>
            <span>🔍</span>
            <span>Buscar...</span>
          </div>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 shrink-0" style={{ marginBottom: "12px" }}>
          {[
            { label: "Ventas hoy", value: `$${(metrics.ventas / 1000).toFixed(0)},${String(metrics.ventas).slice(-3, -1)}00` },
            { label: "Pedidos", value: String(metrics.pedidos) },
            { label: "Ticket prom.", value: `$${Math.round(metrics.ventas / metrics.pedidos).toLocaleString("es-AR")}` },
            { label: "Tiempo medio", value: "14 min" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg"
              style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: "9px", color: "#5a5a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{kpi.label}</span>
              <span className="block" style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Main content — 3 columns */}
        <div className="flex gap-2 flex-1 min-h-0">
          {/* Col 1: Orders */}
          <div
            className="flex flex-col rounded-lg overflow-hidden"
            style={{ flex: "0 0 30%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-3 pt-3 pb-2 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "10px", color: "#6a6a6a", fontWeight: 600 }}>Pedidos recientes</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {orders.map((o) => {
                const statusColor = o.status === "nuevo" ? PALETTE.coral : o.status === "preparando" ? "#ffb45e" : PALETTE.salvia
                const statusLabel = o.status === "nuevo" ? "Nuevo" : o.status === "preparando" ? "Preparando" : "Listo"
                const isSelected = selectedOrder === o.id
                return (
                  <div
                    key={o.id}
                    className="rounded-lg transition-all"
                    style={{
                      padding: "8px 10px",
                      background: isSelected ? "rgba(121,87,255,0.08)" : "transparent",
                      border: isSelected ? "1px solid rgba(121,87,255,0.2)" : "1px solid transparent",
                      cursor: isInteractive ? "pointer" : "default",
                    }}
                    onClick={() => isInteractive && setSelectedOrder(o.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{o.id}</span>
                      <span
                        className="rounded-full"
                        style={{ fontSize: "8px", padding: "2px 6px", background: `${statusColor}25`, color: statusColor, fontWeight: 500 }}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    <p style={{ fontSize: "10px", color: "#6a6a6a", marginTop: "2px" }}>{o.items}</p>
                    <div className="flex items-center justify-between" style={{ marginTop: "2px" }}>
                      <span style={{ fontSize: "9px", color: "#5a5a5a" }}>{o.time}</span>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#b5bdd4" }}>{o.total}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Col 2: Chart */}
          <div
            className="flex-1 flex flex-col rounded-lg overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px" }}
          >
            <div className="flex items-center justify-between shrink-0" style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", color: "#6a6a6a" }}>Ventas por hora</span>
              <span style={{ fontSize: "10px", color: PALETTE.salvia, fontWeight: 500 }}>+18% vs ayer</span>
            </div>
            <div className="flex-1 min-h-0">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PALETTE.coral} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={PALETTE.coral} stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#dashGrad)" />
                <polyline points={points} fill="none" stroke={PALETTE.coral} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex justify-between shrink-0" style={{ fontSize: "7px", color: "#4a4a5a", marginTop: "4px" }}>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
            </div>
          </div>

          {/* Col 3: Inventory + alert */}
          <div className="flex flex-col gap-2" style={{ width: "180px" }}>
            {/* Top products */}
            <div
              className="rounded-lg"
              style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: "9px", color: "#5a5a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Top productos</span>
              {[
                { name: "Croissant Pistacho", sold: 24 },
                { name: "Iced Matcha", sold: 18 },
                { name: "Roll de Canela", sold: 15 },
              ].map((p) => (
                <div key={p.name} style={{ marginTop: "6px" }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "10px", color: "#8a8a8a" }}>{p.name}</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#fff" }}>{p.sold}</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.06)", marginTop: "3px" }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.sold / 24) * 100}%`, background: PALETTE.coral }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Stock alert */}
            <div
              className="rounded-lg"
              style={{
                padding: "10px",
                background: `${PALETTE.coral}10`,
                border: `1px solid ${PALETTE.coral}30`,
              }}
            >
              <span style={{ fontSize: "9px", color: PALETTE.coral, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                Alerta de inventario
              </span>
              <p style={{ fontSize: "11px", color: "#b5bdd4", marginTop: "6px", lineHeight: 1.4 }}>
                Croissant Pistacho: <strong style={{ color: "#fff" }}>{stock}</strong> unidades
              </p>
              <p style={{ fontSize: "9px", color: PALETTE.coral, marginTop: "4px" }}>
                Pistacho bajo: 18%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className="absolute top-4 right-4 px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2"
          style={{
            background: "#1a1a2e",
            border: `1px solid ${PALETTE.salvia}40`,
            fontSize: "11px",
            color: "#fff",
            animation: "fade-up 0.3s ease",
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: PALETTE.salvia }} />
          {notification}
        </div>
      )}
    </div>
  )
}
