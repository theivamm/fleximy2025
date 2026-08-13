// ==========================================================================
// FLEXIMY — CONFIGURACIÓN CENTRAL DE CONTACTO Y EMPRESA
// --------------------------------------------------------------------------
// Única fuente de verdad para datos de contacto, legales y de empresa.
// Ningún teléfono, correo ni dato legal debe estar hardcodeado fuera de aquí.
//
// ⚠️ RELEASE BLOQUEADO
// Los valores marcados como PENDIENTE no deben publicarse. El build falla
// mientras existan (scripts/check-release.mjs). Completarlos con datos
// reales antes de publicar o promocionar el sitio.
// ==========================================================================

export const COMPANY = {
  nombre: "Fleximy",
  razonSocial: "[RAZÓN SOCIAL]",
  cuit: "[CUIT]",
  domicilio: "[DOMICILIO]",
  emailComercial: "[EMAIL COMERCIAL]",
  emailPrivacidad: "[EMAIL DE PRIVACIDAD]",
  emailLegal: "[EMAIL LEGAL]",
  fechaActualizacion: "[FECHA DE ACTUALIZACIÓN]",
}

export const WHATSAPP = {
  // PENDIENTE: reemplazar por el número real. No inventar ni usar ficticios.
  number: "541111111111",
  message: "Hola, llegué desde el sitio de Fleximy. Quiero contarte mi idea y conocer cómo trabajan.",
}

export const whatsappUrl = (message = WHATSAPP.message) =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`

export const WHATSAPP_PLAIN_URL = `https://wa.me/${WHATSAPP.number}`

export const CONTACT = {
  whatsapp: WHATSAPP_PLAIN_URL,
  whatsappMessage: WHATSAPP.message,
  whatsappText: "Hablar por WhatsApp",
  ctaPrimary: "Contanos tu idea",
  ctaSecondary: "Explorar lo que hacemos",
}
