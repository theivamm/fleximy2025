import { useState, useEffect } from "react"

const ORDERS = [
  { id: "#1084", client: "Martina G.", items: "Bosque 500g ×1, Flat White ×2", total: "$24.800", time: "10:42", status: "nuevo" },
  { id: "#1083", client: "Lucas M.", items: "Altura 250g ×2", total: "$8.400", time: "10:38", status: "preparacion" },
  { id: "#1082", client: "Camila R.", items: "Suscripción mensual ×1", total: "$3.800", time: "10:25", status: "listo" },
  { id: "#1081", client: "Mateo P.", items: "Nocturno 1kg ×1, Capuchino ×1", total: "$9.900", time: "10:18", status: "listo" },
  { id: "#1080", client: "Sofía L.", items: "Bosque 250g ×3", total: "$14.400", time: "10:05", status: "listo" },
]

const NAV_ITEMS = [
  { label: "Inicio", icon: "◈" },
  { label: "Pedidos", active: true, badge: 7 },
  { label: "Productos", icon: "◆" },
  { label: "Stock", icon: "◇" },
  { label: "Clientes", icon: "○" },
]

export default function OperationsApp({ isInteractive }) {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderStatuses, setOrderStatuses] = useState(() =>
    Object.fromEntries(ORDERS.map((o) => [o.id, o.status]))
  )
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!isInteractive) return
    const t1 = setTimeout(() => setSelectedOrder("#1084"), 800)
    const t2 = setTimeout(() => {
      setOrderStatuses((s) => ({ ...s, "#1084": "preparacion" }))
      setToast("Pedido #1084 actualizado a En preparación")
    }, 2200)
    const t3 = setTimeout(() => setToast(null), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isInteractive])

  const nuevos = Object.values(orderStatuses).filter((s) => s === "nuevo").length
  const preparando = Object.values(orderStatuses).filter((s) => s === "preparacion").length
  const listos = Object.values(orderStatuses).filter((s) => s === "listo").length

  const statusColor = (s) => {
    if (s === "nuevo") return { bg: "rgba(121,87,255,0.15)", text: "#a594ff" }
    if (s === "preparacion") return { bg: "rgba(255,180,94,0.15)", text: "#ffc97a" }
    return { bg: "rgba(66,211,146,0.15)", text: "#6ee7a8" }
  }

  const statusLabel = (s) => {
    if (s === "nuevo") return "Nuevo"
    if (s === "preparacion") return "En preparación"
    return "Listo"
  }

  const sc = (s) => statusColor(orderStatuses[s] || s)

  return (
    <div className="w-full h-full flex text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif", background: "#0d0f1a" }}>
      {/* Sidebar */}
      <aside
        className="shrink-0 border-r hidden sm:flex flex-col"
        style={{ width: "150px", borderColor: "rgba(255,255,255,0.06)", padding: "12px" }}
      >
        <div className="flex items-center gap-2 mb-5 px-1">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(121,87,255,0.3)" }}>
            <span style={{ fontSize: "9px", fontWeight: 700, color: "#a594ff", fontFamily: "Space Grotesk" }}>N</span>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "Space Grotesk" }}>Nómada</span>
        </div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-md"
            style={{
              padding: "7px 10px",
              fontSize: "12px",
              background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
              color: item.active ? "#fff" : "#6a6a6a",
              fontWeight: item.active ? 500 : 400,
            }}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  minWidth: "18px",
                  height: "18px",
                  background: "#7957ff",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#fff",
                  padding: "0 4px",
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between shrink-0"
          style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Operación de hoy</h2>
            <div className="flex items-center gap-1.5" style={{ marginTop: "2px" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#42d392" }} />
              <span style={{ fontSize: "10px", color: "#6a6a6a" }}>Abierta · Palermo</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Pedidos hoy", value: "84" },
              { label: "Nuevos", value: String(nuevos) },
              { label: "En preparación", value: String(preparando) },
              { label: "Listos", value: String(listos) },
              { label: "Tiempo prom.", value: "8 min" },
            ].map((kpi) => (
              <div key={kpi.label} className="text-right">
                <span className="block" style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{kpi.value}</span>
                <span style={{ fontSize: "9px", color: "#5a5a5a" }}>{kpi.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Order list */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "12px" }}>
            <div className="flex flex-col gap-2">
              {ORDERS.map((order) => {
                const isSelected = selectedOrder === order.id
                const s = sc(order.id)
                return (
                  <div
                    key={order.id}
                    className="rounded-lg transition-all"
                    style={{
                      padding: "12px 14px",
                      border: isSelected ? "1px solid rgba(121,87,255,0.3)" : "1px solid rgba(255,255,255,0.04)",
                      background: isSelected ? "rgba(121,87,255,0.06)" : "rgba(255,255,255,0.02)",
                      cursor: isInteractive ? "pointer" : "default",
                    }}
                    onClick={() => isInteractive && setSelectedOrder(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{order.id}</span>
                        <span style={{ fontSize: "12px", color: "#8a8a8a" }}>·</span>
                        <span style={{ fontSize: "12px", color: "#8a8a8a" }}>{order.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "10px", color: "#5a5a5a" }}>{order.time}</span>
                        <span
                          className="rounded-full"
                          style={{
                            fontSize: "9px",
                            padding: "2px 8px",
                            background: s.bg,
                            color: s.text,
                            fontWeight: 500,
                          }}
                        >
                          {statusLabel(orderStatuses[order.id])}
                        </span>
                      </div>
                    </div>
                    <p className="truncate" style={{ fontSize: "11px", color: "#6a6a6a", marginTop: "4px" }}>{order.items}</p>
                    <span className="block" style={{ fontSize: "12px", fontWeight: 600, color: "#b5bdd4", marginTop: "4px" }}>{order.total}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          {selectedOrder && (
            <div
              className="shrink-0 border-l flex flex-col"
              style={{ width: "220px", borderColor: "rgba(255,255,255,0.06)", padding: "14px" }}
            >
              <p style={{ fontSize: "9px", color: "#5a5a5a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                Detalle del pedido
              </p>
              {(() => {
                const order = ORDERS.find((o) => o.id === selectedOrder)
                const status = orderStatuses[selectedOrder]
                const s = statusColor(status)
                return (
                  <>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{order.id}</span>
                    <span style={{ fontSize: "12px", color: "#8a8a8a", marginTop: "2px" }}>{order.client}</span>
                    <span style={{ fontSize: "10px", color: "#5a5a5a", marginTop: "2px" }}>{order.time}</span>

                    <div
                      className="rounded-lg"
                      style={{ padding: "12px", marginTop: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p style={{ fontSize: "10px", color: "#6a6a6a" }}>Items</p>
                      <p style={{ fontSize: "12px", color: "#fff", marginTop: "4px" }}>{order.items}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginTop: "8px" }}>{order.total}</p>
                    </div>

                    <div style={{ marginTop: "12px" }}>
                      <span
                        className="rounded-full"
                        style={{ fontSize: "10px", padding: "3px 10px", background: s.bg, color: s.text, fontWeight: 500 }}
                      >
                        {statusLabel(status)}
                      </span>
                    </div>

                    {status === "nuevo" && isInteractive && (
                      <button
                        onClick={() => {
                          setOrderStatuses((p) => ({ ...p, [selectedOrder]: "preparacion" }))
                          setToast(`Pedido ${selectedOrder} actualizado a En preparación`)
                          setTimeout(() => setToast(null), 2500)
                        }}
                        className="mt-4 w-full rounded-lg text-[11px] font-semibold text-white"
                        style={{ padding: "8px 0", background: "linear-gradient(135deg, #7957ff, #5268ff)", cursor: "pointer" }}
                      >
                        Comenzar preparación
                      </button>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg"
          style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", fontSize: "11px", color: "#fff", animation: "fade-up 0.3s ease" }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
