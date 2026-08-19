import { useState, useEffect } from "react"

const ORDERS = [
  { id: "#1084", client: "Martina G.", items: "Bosque 500g x1, Flat White x2", total: "$24.800", status: "nuevo" },
  { id: "#1083", client: "Lucas M.", items: "Altura 250g x2", total: "$8.400", status: "preparacion" },
  { id: "#1082", client: "Camila R.", items: "Suscripcion mensual x1", total: "$3.800", status: "listo" },
  { id: "#1081", client: "Mateo P.", items: "Nocturno 1kg x1, Capuchino x1", total: "$9.900", status: "listo" },
]

const NAV_ITEMS = [
  { label: "Inicio", active: false },
  { label: "Pedidos", active: true, badge: 7 },
  { label: "Productos", active: false },
  { label: "Stock", active: false },
  { label: "Clientes", active: false },
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
      setToast("Pedido #1084 actualizado")
    }, 2200)
    const t3 = setTimeout(() => setToast(null), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isInteractive])

  const preparando = Object.values(orderStatuses).filter((s) => s === "preparacion").length
  const listos = Object.values(orderStatuses).filter((s) => s === "listo").length

  const statusColor = (s) => {
    if (s === "nuevo") return "bg-[#7957ff]/20 text-[#a594ff]"
    if (s === "preparacion") return "bg-[#ffb45e]/20 text-[#ffc97a]"
    return "bg-[#42d392]/20 text-[#6ee7a8]"
  }

  const statusLabel = (s) => {
    if (s === "nuevo") return "Nuevo"
    if (s === "preparacion") return "En preparacion"
    return "Listo"
  }

  return (
    <div className="w-full h-full flex bg-[#0d0f1a] text-[#e8e6e1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-[140px] shrink-0 border-r border-white/[0.06] p-3 flex flex-col gap-1 hidden sm:flex">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-5 h-5 rounded bg-[#7957ff]/30 flex items-center justify-center">
            <span className="text-[8px] font-display font-bold text-[#a594ff]">N</span>
          </div>
          <span className="text-[10px] font-display font-bold text-white">Nomada</span>
        </div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[10px] ${
              item.active ? "bg-white/[0.08] text-white font-medium" : "text-[#6a6a6a] hover:text-[#9a9a9a]"
            }`}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#7957ff] text-[8px] font-bold text-white px-1">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-semibold text-white">Operacion de hoy</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42d392]" />
              <span className="text-[9px] text-[#6a6a6a]">Abierta · Palermo</span>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Pedidos hoy", value: "84" },
              { label: "En preparacion", value: String(preparando) },
              { label: "Listos", value: String(listos) },
              { label: "Tiempo prom.", value: "8 min" },
            ].map((kpi) => (
              <div key={kpi.label} className="text-right">
                <span className="block text-[14px] font-bold text-white">{kpi.value}</span>
                <span className="text-[8px] text-[#5a5a5a]">{kpi.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Order list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {ORDERS.map((order) => {
              const status = orderStatuses[order.id]
              const isSelected = selectedOrder === order.id
              return (
                <button
                  key={order.id}
                  onClick={() => isInteractive && setSelectedOrder(order.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? "border-[#7957ff]/30 bg-[#7957ff]/[0.06]"
                      : "border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white">{order.id} · {order.client}</span>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full font-medium ${statusColor(status)}`}>
                      {statusLabel(status)}
                    </span>
                  </div>
                  <p className="text-[9px] text-[#6a6a6a] mt-1 truncate">{order.items}</p>
                  <span className="text-[10px] font-semibold text-[#b5bdd4] mt-1 block">{order.total}</span>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          {selectedOrder && (
            <div className="w-[200px] shrink-0 border-l border-white/[0.06] p-3 flex flex-col">
              <p className="text-[9px] text-[#5a5a5a] tracking-wider uppercase mb-2">Detalle del pedido</p>
              {(() => {
                const order = ORDERS.find((o) => o.id === selectedOrder)
                const status = orderStatuses[selectedOrder]
                return (
                  <>
                    <span className="text-[14px] font-bold text-white">{order.id}</span>
                    <span className="text-[11px] text-[#8a8a8a] mt-0.5">{order.client}</span>
                    <div className="mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-[9px] text-[#6a6a6a]">Items</p>
                      <p className="text-[10px] text-white mt-0.5">{order.items}</p>
                      <p className="text-[12px] font-bold text-white mt-2">{order.total}</p>
                    </div>
                    <div className="mt-3">
                      <span className={`text-[9px] px-2 py-1 rounded-full font-medium ${statusColor(status)}`}>
                        {statusLabel(status)}
                      </span>
                    </div>
                    {status === "nuevo" && isInteractive && (
                      <button
                        onClick={() => {
                          setOrderStatuses((s) => ({ ...s, [selectedOrder]: "preparacion" }))
                          setToast(`Pedido ${selectedOrder} actualizado`)
                          setTimeout(() => setToast(null), 2500)
                        }}
                        className="mt-4 w-full py-2 rounded-lg text-[10px] font-semibold text-white"
                        style={{ background: "linear-gradient(135deg, #7957ff, #5268ff)" }}
                      >
                        Comenzar preparacion
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-[#1a1a2e] border border-white/10 text-[10px] text-white shadow-lg animate-[fade-up_0.3s_ease]">
          {toast}
        </div>
      )}
    </div>
  )
}
