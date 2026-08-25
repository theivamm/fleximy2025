export const CHAPTERS = [
  {
    id: "fragmented",
    num: "01",
    title: "Una web preparada para convertir visitas en clientes.",
    text: "Una web única para mostrar, vender y recibir consultas, reservas o pedidos. Diseñada alrededor de tu negocio, no desde una plantilla.",
    micro: "Tu negocio abierto y listo para vender, las 24 horas.",
  },
  {
    id: "sales",
    num: "02",
    title: "Cada consulta se convierte en una oportunidad.",
    text: "WhatsApp, formularios, reservas y pedidos llegan al mismo lugar, con el historial completo de cada cliente.",
    micro: "Ninguna consulta olvidada. Ninguna oportunidad perdida.",
  },
  {
    id: "operations",
    num: "03",
    title: "Todo lo que necesitás para trabajar, en una sola app.",
    text: "Pedidos, turnos, tareas, empleados, stock o proyectos. Diseñamos la aplicación alrededor de cómo funciona tu negocio.",
    micro: "Menos planillas, menos mensajes sueltos y más orden.",
  },
  {
    id: "control",
    num: "04",
    title: "Mirá cómo funciona tu negocio, sin armar reportes.",
    text: "Ventas, clientes, productos y tareas importantes reunidos en un dashboard claro para decidir mejor.",
    micro: "La información importante, lista para usar.",
  },
]

export const NAV_ITEMS = [
  { id: "fragmented", label: "01 Tu web" },
  { id: "sales", label: "02 Tus clientes" },
  { id: "operations", label: "03 Tu operación" },
  { id: "control", label: "04 Tus números" },
]

export const DASHBOARD_DATA = {
  metrics: [
    { label: "Ventas del mes", value: "$18.420.000" },
    { label: "Pedidos", value: "486" },
    { label: "Conversión", value: "4,8%" },
    { label: "Tiempo recuperado", value: "32 h" },
  ],
  orders: [
    { id: "#1048", status: "nuevo", time: "10:42" },
    { id: "#1047", status: "preparando", time: "10:36" },
    { id: "#1046", status: "listo", time: "10:18" },
  ],
  inventory: [
    { name: "Producto principal", stock: "17 unidades" },
    { name: "Insumo secundario", stock: "Stock bajo" },
    { name: "Packaging", stock: "68 unidades" },
  ],
  insight: "Tu canal web generó un 24% más de consultas esta semana.",
  sidebar: ["Resumen", "Ventas", "Clientes", "Operación", "Inventario", "Reportes"],
}