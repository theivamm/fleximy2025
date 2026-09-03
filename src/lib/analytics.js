// ==========================================================================
// FLEXIMY — ANALÍTICA
// --------------------------------------------------------------------------
// Capa mínima de eventos. Actualmente no hay ninguna infraestructura de
// analítica instalada (GTM/GA/Plausible/etc.), por lo que `track()` es un
// no-op seguro. Cuando se conecte una herramienta real, basta con publicar
// el evento en el canal correspondiente (p. ej. window.dataLayer.push).
//
// PENDIENTE REAL: no se registra ningún dato personal del formulario en estos
// eventos. Solo se envían identificadores y metadata no sensible.
// ==========================================================================

export function track(event, params = {}) {
  if (typeof window === "undefined") return
  // Publicar en dataLayer si alguna vez existe un contenedor.
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params })
  }
  // Guard para desarrollo / futuro GTM.
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params)
  }
}
