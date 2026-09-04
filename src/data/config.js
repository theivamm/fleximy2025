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

// ---------------------------------------------------------------------------
// WHATSAPP — número único y centralizado del sitio.
// Nunca repetir el número hardcodeado en componentes. Usar `whastsappUrl()`.
// ---------------------------------------------------------------------------
export const WHATSAPP_NUMBER = "5491161120433"

export const WHATSAPP = {
  number: WHATSAPP_NUMBER,
  // Mensaje por defecto (ruta Home/otras sin variante específica).
  message: "Hola, llegué desde el sitio de Fleximy. Quiero contarte mi idea y conocer cómo trabajan.",
}

// Mensajes específicos por ruta para el módulo global de WhatsApp.
// source: clave interna del módulo -> mensaje prefijado para esa página.
export const WHATSAPP_MESSAGES = {
  home: "Hola, llegué desde el sitio de Fleximy. Quiero contarte mi idea y conocer cómo trabajan.",
  nfc: "Hola, llegué desde la página de soluciones NFC de Fleximy. Quiero contarte qué acción quiero facilitar.",
  fidelizacion:
    "Hola, llegué desde la página de Fidelización de Fleximy. Quiero contarles cómo funciona mi negocio y conocer una solución para que mis clientes vuelvan.",
}

export const whatsappUrl = (message = WHATSAPP.message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const WHATSAPP_PLAIN_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const CONTACT = {
  whatsapp: WHATSAPP_PLAIN_URL,
  whatsappMessage: WHATSAPP.message,
  whatsappText: "Hablar por WhatsApp",
  ctaPrimary: "Contanos tu idea",
  ctaSecondary: "Explorar lo que hacemos",
}
