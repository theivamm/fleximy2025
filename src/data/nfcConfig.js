// ==========================================================================
// FLEXIMY — CONFIGURACIÓN DE LA LANDING NFC
// --------------------------------------------------------------------------
// Centraliza decisiones comerciales y de producto que deben verificarse con
// la operación real antes de publicar. Nada de esto debe quedar hardcodeado
// fuera de aquí sin revisión.
// ==========================================================================

// ---------------------------------------------------------------------------
// CONFIGURACIÓN DEL DESTINO
// ---------------------------------------------------------------------------
// Este bloque define cómo se comunica el cambio de destino.
//
// ⚠️ PENDIENTE REAL: todavía NO existe un panel autogestionable para que el
// cliente cambie el destino por sí mismo. Fleximy administra la actualización.
// Por eso el copy usado es:
//   "Nos pedís el cambio y actualizamos el destino."
//
// Cuando exista un panel autogestionable, cambiar este valor a true y revisar
// el copy del módulo "Configurable".
// ---------------------------------------------------------------------------
export const NFC_CONFIG = {
  selfServicePanelAvailable: false,
  destinationCopy: "Nos pedís el cambio y actualizamos el destino.",
  formRecipient: "mauroivanmedel@gmail.com",
}

// ---------------------------------------------------------------------------
// FORMATOS FÍSICOS DISPONIBLES
// ---------------------------------------------------------------------------
// ⚠️ PENDIENTE REAL: al momento de escribir esta landing no se confirmó qué
// formatos pueden ofrecerse de inmediato. Todos se marcan como "consultar"
// para no vender un producto que todavía no puede entregarse.
//
// Activar (available: true) únicamente los formatos que la operación real
// realmente pueda ofrecer y entregar.
// ---------------------------------------------------------------------------
export const NFC_FORMATS = [
  { id: "contador", name: "Soporte de mostrador", scene: "contador", available: false },
  { id: "sticker", name: "Sticker NFC + QR", scene: "sticker", available: false },
  { id: "tarjeta", name: "Tarjeta personal", scene: "tarjeta", available: false },
  { id: "mesa", name: "Display de mesa", scene: "mesa", available: false },
  { id: "vidriera", name: "Pieza para vidriera", scene: "vidriera", available: false },
  { id: "empleado", name: "Identificador de empleado", scene: "empleado", available: false },
  { id: "packaging", name: "Adhesivo para packaging", scene: "packaging", available: false },
]

// ---------------------------------------------------------------------------
// CASOS POR TIPO DE NEGOCIO (escenario del módulo 06)
// ---------------------------------------------------------------------------
export const NFC_BUSINESS_CASES = [
  { rubro: "Gastronomía", lugar: "Mesa 12", accion: "Abrir menú" },
  { rubro: "Óptica", lugar: "Mostrador", accion: "Reservar turno" },
  { rubro: "Inmobiliaria", lugar: "Cartel", accion: "Ver propiedad" },
  { rubro: "Estética", lugar: "Recepción", accion: "Dejar reseña" },
  { rubro: "Retail", lugar: "Caja", accion: "Ver catálogo" },
  { rubro: "Hotel", lugar: "Habitación", accion: "Conectar Wi-Fi" },
  { rubro: "Profesional", lugar: "Escritorio", accion: "Agendar consulta" },
  { rubro: "Evento", lugar: "Acceso", accion: "Acreditar ingreso" },
]
