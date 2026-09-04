import { CONTACT } from "./config"

export { CONTACT }

export const NAV = {
  main: [
    { label: "Home", to: "/" },
    { label: "Soluciones NFC", to: "/soluciones/nfc" },
  ],
  footer: [
    { label: "Qué hacemos", href: "#que-hacemos" },
    { label: "Cómo trabajamos", href: "#como-trabajamos" },
    { label: "Rubros", href: "#rubros" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Privacidad", to: "/privacidad" },
    { label: "Términos", to: "/terminos" },
  ],
}
