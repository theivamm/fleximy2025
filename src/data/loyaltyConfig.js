// ==========================================================================
// FLEXIMY — CONFIGURACIÓN DE LA LANDING DE FIDELIZACIÓN
// --------------------------------------------------------------------------
// Centraliza contenido comercial y datos de demo ficticios. No contiene lógica.
// ==========================================================================

export const BRAND = "BRUMA"

// ---------------------------------------------------------------------------
// HERO — demo principal
// ---------------------------------------------------------------------------
export const HERO_CUSTOMER = {
  name: "Martina López",
  initials: "ML",
  status: "Cliente frecuente",
  visits: 8,
  goal: 10,
  nextReward: "Café + croissant",
  history: [
    { date: "26 ago", concept: "Flat White + croissant", price: "$6.700" },
    { date: "18 ago", concept: "Iced Matcha + medialuna", price: "$6.300" },
    { date: "10 ago", concept: "Cortado + sándwich", price: "$8.900" },
  ],
  badge: "2 compras para el próximo premio",
}

// ---------------------------------------------------------------------------
// PROBLEMA — panels "Hoy" vs "Con Fleximy"
// ---------------------------------------------------------------------------
export const PROBLEM_BEFORE = [
  "Compras sueltas",
  "Nombres en WhatsApp",
  "Tarjetas de papel",
  "Promociones generales",
  "No sabemos quién volvió",
]
export const PROBLEM_AFTER = [
  "Perfil único",
  "Historial de compras",
  "Progreso visible",
  "Premio configurado",
  "Cada visita cuenta",
]

// ---------------------------------------------------------------------------
// PASOS — cómo funciona
// ---------------------------------------------------------------------------
export const STEPS = [
  {
    n: "01",
    icon: "id",
    title: "Identificás al cliente",
    desc: "Nombre, teléfono o código personal. Sin formularios eternos.",
  },
  {
    n: "02",
    icon: "register",
    title: "Registrás la compra",
    desc: "Una visita, un pedido, un turno o el valor que defina tu negocio.",
  },
  {
    n: "03",
    icon: "progress",
    title: "El sistema actualiza su progreso",
    desc: "Cada movimiento queda guardado en su perfil e historial.",
  },
  {
    n: "04",
    icon: "reward",
    title: "Se activa el premio",
    desc: "Cupón, descuento, regalo o beneficio listo para entregar.",
  },
]

// ---------------------------------------------------------------------------
// DEMO CENTRAL — clientes ficticios
// ---------------------------------------------------------------------------
export const DEMO_CUSTOMERS = [
  {
    id: "martina",
    name: "Martina López",
    status: "9 visitas",
    desc: "Última visita hoy · 9 compras",
    tags: ["Café", "Take away", "Frecuente"],
    visits: 9,
    goal: 10,
    nextReward: "Café + croissant",
    spend: "$84.500",
    since: "cliente desde marzo",
    insight: ["Martina suele volver cada 8 días.", "Su producto más elegido es Flat White."],
    history: [
      { date: "Hoy", concept: "Flat White + croissant", price: "$6.700", place: "Palermo", state: "Completada" },
      { date: "Hace 8 días", concept: "Iced Matcha + medialuna", price: "$6.300", place: "Palermo", state: "Completada" },
      { date: "Hace 16 días", concept: "Cortado + sándwich", price: "$8.900", place: "Palermo", state: "Completada" },
      { date: "Hace 24 días", concept: "Flat White + tostado", price: "$9.400", place: "Palermo", state: "Completada" },
    ],
  },
  {
    id: "lucas",
    name: "Lucas Ruiz",
    status: "premio disponible",
    desc: "Alcanzó su meta · cupón activo",
    tags: ["Café", "Frecuente"],
    visits: 10,
    goal: 10,
    nextReward: "Café + croissant",
    spend: "$112.300",
    since: "cliente desde enero",
    insight: ["Lucas tiene un premio listo para entregar.", "Vino 4 veces este mes."],
    history: [
      { date: "Hoy", concept: "Café + croissant (premio)", price: "Gratis", place: "Palermo", state: "Disponible" },
      { date: "Hace 5 días", concept: "Flat White + tostado", price: "$9.400", place: "Palermo", state: "Completada" },
      { date: "Hace 12 días", concept: "2 cortados + medialunas", price: "$8.100", place: "Palermo", state: "Completada" },
      { date: "Hace 19 días", concept: "Iced Matcha", price: "$3.500", place: "Palermo", state: "Completada" },
    ],
  },
  {
    id: "sofia",
    name: "Sofía Vega",
    status: "4 visitas",
    desc: "Última visita hace 5 días",
    tags: ["Take away", "Nueva"],
    visits: 4,
    goal: 10,
    nextReward: "Café + croissant",
    spend: "$24.800",
    since: "cliente desde junio",
    insight: ["Sofía empezó hace poco.", "Le faltan 6 compras para su premio."],
    history: [
      { date: "Hace 5 días", concept: "Matcha + medialuna", price: "$6.300", place: "Palermo", state: "Completada" },
      { date: "Hace 13 días", concept: "Flat White", price: "$3.400", place: "Palermo", state: "Completada" },
      { date: "Hace 22 días", concept: "Croissant + jugo", price: "$5.900", place: "Palermo", state: "Completada" },
      { date: "Hace 30 días", concept: "Cortado", price: "$3.100", place: "Palermo", state: "Completada" },
    ],
  },
  {
    id: "carla",
    name: "Carla Méndez",
    status: "inactiva hace 45 días",
    desc: "Cliente frecuente que dejó de venir",
    tags: ["Café", "Frecuente"],
    visits: 7,
    goal: 10,
    nextReward: "Café + croissant",
    spend: "$61.200",
    since: "cliente desde febrero",
    insight: ["Carla no vino hace 45 días.", "Podría ser candidata a una campaña de reactivación."],
    history: [
      { date: "Hace 45 días", concept: "Flat White", price: "$3.400", place: "Palermo", state: "Completada" },
      { date: "Hace 52 días", concept: "2 cafés + tostado", price: "$12.100", place: "Palermo", state: "Completada" },
      { date: "Hace 60 días", concept: "Matcha", price: "$3.500", place: "Palermo", state: "Completada" },
      { date: "Hace 71 días", concept: "Cortado + medialuna", price: "$6.200", place: "Palermo", state: "Completada" },
    ],
  },
  {
    id: "julian",
    name: "Julián Torres",
    status: "cliente nuevo",
    desc: "Primera compra hoy",
    tags: ["Nuevo"],
    visits: 1,
    goal: 10,
    nextReward: "Café + croissant",
    spend: "$3.400",
    since: "cliente desde hoy",
    insight: ["Julián es un cliente nuevo.", "Su primera visita quedó registrada."],
    history: [
      { date: "Hoy", concept: "Flat White", price: "$3.400", place: "Palermo", state: "Completada" },
    ],
  },
]

// ---------------------------------------------------------------------------
// REGLAS — variantes visibles + constructor
// ---------------------------------------------------------------------------
export const RULE_VARIANTS = [
  { label: "Cada 10 compras", desc: "→ producto gratis" },
  { label: "Quinta visita", desc: "→ 20% de descuento" },
  { label: "30 días sin volver", desc: "→ beneficio de reactivación" },
  { label: "Cumpleaños", desc: "→ regalo especial" },
  { label: "Gasto acumulado", desc: "→ categoría VIP" },
]

export const REWARD_TYPES = ["Cupón 20%", "Producto gratis", "Descuento fijo", "Beneficio especial"]

// ---------------------------------------------------------------------------
// BENEFICIOS — una plataforma, tres formas de ganar
// ---------------------------------------------------------------------------
export const BENEFITS = {
  clientes: {
    label: "Tus clientes",
    points: [
      "Ven su progreso",
      "Reciben beneficios relevantes",
      "No pierden una tarjeta de papel",
      "Tienen una razón concreta para volver",
    ],
  },
  equipo: {
    label: "Tu equipo",
    points: [
      "Encuentra rápido cada perfil",
      "Registra visitas en segundos",
      "Sabe cuándo entregar un premio",
      "No depende de recordar reglas",
    ],
  },
  negocio: {
    label: "Tu negocio",
    points: [
      "Conoce la frecuencia de compra",
      "Identifica clientes valiosos",
      "Reactiva personas inactivas",
      "Mide qué beneficios generan retorno",
    ],
  },
}

// ---------------------------------------------------------------------------
// CASOS POR RUBRO
// ---------------------------------------------------------------------------
export const INDUSTRY_CASES = [
  {
    rubro: "Cafetería",
    rule: "Cada 10 consumos, café y croissant de regalo.",
    registro: "Compra o visita",
    accent: "cyan",
    icon: "coffee",
  },
  {
    rubro: "Restaurante",
    rule: "Después de 5 reservas, beneficio especial para la próxima cena.",
    registro: "Reserva completada",
    accent: "violet",
    icon: "restaurant",
  },
  {
    rubro: "Salón de uñas",
    rule: "En la quinta visita, 20% en el próximo servicio.",
    registro: "Turno atendido",
    accent: "pink",
    icon: "nails",
  },
  {
    rubro: "Estudio de tatuajes",
    rule: "Beneficio por sesiones acumuladas o recomendación de un nuevo cliente.",
    registro: "Sesión o referido",
    accent: "blue",
    icon: "ink",
  },
  {
    rubro: "Óptica",
    rule: "Recordatorio y beneficio cuando llega el momento de renovar.",
    registro: "Compra y fecha",
    accent: "green",
    icon: "glasses",
  },
  {
    rubro: "Gimnasio o estudio",
    rule: "Premio por asistencia sostenida durante el mes.",
    registro: "Clase o ingreso",
    accent: "orange",
    icon: "gym",
  },
]

// ---------------------------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------------------------
export const DASHBOARD_KPIS = [
  { label: "Clientes activos", value: "342" },
  { label: "Tasa de regreso", value: "38%" },
  { label: "Premios entregados", value: "47" },
  { label: "Clientes por reactivar", value: "26" },
]
export const DASHBOARD_SEGMENTS = [
  "Nuevos", "Frecuentes", "Cerca del premio", "Inactivos", "VIP",
]
export const DASHBOARD_ALERTS = [
  "12 clientes están a una compra de su premio",
  "8 clientes frecuentes no volvieron este mes",
  "La regla Café + croissant generó 31 regresos",
]
export const DASHBOARD_RANKING = [
  { label: "Café + croissant", value: "97 usos" },
  { label: "20% en quinta visita", value: "64 usos" },
  { label: "Beneficio de cumpleaños", value: "41 usos" },
]
export const DASHBOARD_WEEKS = [
  { week: "S1", nuevos: 18, recurrentes: 24 },
  { week: "S2", nuevos: 14, recurrentes: 30 },
  { week: "S3", nuevos: 22, recurrentes: 27 },
  { week: "S4", nuevos: 16, recurrentes: 34 },
  { week: "S5", nuevos: 20, recurrentes: 38 },
  { week: "S6", nuevos: 12, recurrentes: 41 },
  { week: "S7", nuevos: 24, recurrentes: 44 },
  { week: "S8", nuevos: 18, recurrentes: 49 },
]

// ---------------------------------------------------------------------------
// CRECIMIENTO — empezar y crecer
// ---------------------------------------------------------------------------
export const GROWTH_STAGES = [
  {
    n: "01",
    title: "Primera regla",
    desc: "Un tipo de registro, una meta y un beneficio.",
  },
  {
    n: "02",
    title: "Más automatización",
    desc: "Segmentos, vencimientos, campañas y notificaciones.",
  },
  {
    n: "03",
    title: "Más puntos de atención",
    desc: "Locales, equipos, permisos y reportes consolidados.",
  },
]

// ---------------------------------------------------------------------------
// CONFIANZA / PRIVACIDAD
// ---------------------------------------------------------------------------
export const TRUST_POINTS = [
  "Acceso por usuarios y permisos",
  "Historial de cambios importantes",
  "Exportación de datos",
  "Reglas de vencimiento configurables",
  "Respaldo de la información",
  "Consentimiento para comunicaciones",
  "Baja de mensajes promocionales",
  "Integración con canales oficiales cuando corresponda",
]

export const WHATSAPP_NOTE =
  "Las notificaciones automáticas por WhatsApp requieren una integración autorizada con WhatsApp Business Platform o un proveedor oficial, además del consentimiento correspondiente del cliente."

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const FAQS = [
  { q: "¿Sirve solamente para cafeterías?", a: "No. Funciona en cualquier negocio donde una persona pueda volver a comprar, reservar, asistir o contratar un servicio." },
  { q: "¿Tengo que usar una regla de 10 compras?", a: "No. La cantidad, la acción y el beneficio se configuran alrededor de tu negocio." },
  { q: "¿Cómo se identifica al cliente?", a: "Podemos utilizar teléfono, email, código, QR u otro dato acordado durante la implementación." },
  { q: "¿Mi equipo necesita aprender un sistema complejo?", a: "No. Diseñamos el registro para que las acciones frecuentes puedan resolverse en pocos pasos." },
  { q: "¿El cliente necesita instalar una aplicación?", a: "No necesariamente. La experiencia puede funcionar desde una web, un enlace o un QR, según la solución definida." },
  { q: "¿Puedo cambiar el premio después?", a: "Sí. Las reglas y beneficios pueden actualizarse según permisos y configuración." },
  { q: "¿Puede funcionar en más de un local?", a: "Sí. La plataforma puede organizar sucursales, equipos y resultados separados o consolidados." },
  { q: "¿Puede enviar mensajes por WhatsApp?", a: "Sí, si se implementa una integración oficial y el negocio cuenta con el consentimiento necesario para enviar comunicaciones." },
  { q: "¿Fleximy entrega una plataforma propia?", a: "Sí. Definimos el alcance y construimos una solución alrededor de la operación y los objetivos del negocio." },
  { q: "¿Puedo empezar con algo pequeño?", a: "Sí. La recomendación es comenzar con una regla clara y sumar funciones cuando exista una necesidad real." },
]

// ---------------------------------------------------------------------------
// NAVEGACIÓN ANCLAS (para el CTA del hero y sub-navegación, si se usa)
// ---------------------------------------------------------------------------
export const ANCHORS = {
  comoFunciona: "como-funciona",
  ejemplos: "ejemplos",
  preguntas: "preguntas",
}
