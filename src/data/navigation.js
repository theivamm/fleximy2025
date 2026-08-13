import { CONTACT } from "./config"

export { CONTACT }

export const NAV = {
  main: [
    { label: "Servicios", to: "/servicios" },
    { label: "Demos", to: "/demos", hasMega: false },
    { label: "Cómo trabajamos", to: "/como-funciona" },
    { label: "Soluciones", to: "/soluciones", hasMega: true },
    { label: "Nosotros", to: "/nosotros" },
  ],
  footer: [
    { label: "Servicios", to: "/servicios" },
    { label: "Soluciones", to: "/soluciones" },
    { label: "Demos", to: "/demos" },
    { label: "Cómo trabajamos", to: "/como-funciona" },
    { label: "Nosotros", to: "/nosotros" },
    { label: "Recursos", to: "/recursos" },
    { label: "Contacto", to: "/contacto" },
    { label: "Privacidad", to: "/privacidad" },
    { label: "Términos", to: "/terminos" },
  ],
  legal: [
    { label: "Privacidad", to: "/privacidad" },
    { label: "Términos", to: "/terminos" },
  ],
}
