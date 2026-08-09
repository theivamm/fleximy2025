export const INDUSTRIES = [
  {
    slug: "gastronomia",
    label: "Gastronomía",
    to: "/soluciones/gastronomia",
    tagline: "Menú digital, reservas, pedidos y gestión operativa.",
    accent: "var(--color-acc-gastro)",
  },
  {
    slug: "turnos",
    label: "Servicios y Turnos",
    to: "/soluciones/servicios-turnos",
    tagline: "Reservas online, agenda, recordatorios e historial de clientes.",
    accent: "var(--color-acc-turnos)",
  },
  {
    slug: "pymes",
    label: "Gestión para PyMEs",
    to: "/soluciones/gestion-pymes",
    tagline: "Clientes, proyectos, tareas y seguimiento en un solo lugar.",
    accent: "var(--color-acc-gestion)",
  },
  {
    slug: "comercio",
    label: "Comercio y Retail",
    to: "/soluciones/comercio-retail",
    tagline: "Catálogo, consultas, stock, precios y pedidos conectados.",
    accent: "var(--color-acc-comercio)",
  },
  {
    slug: "inmobiliarias",
    label: "Inmobiliarias",
    to: "/soluciones/inmobiliarias",
    tagline: "Propiedades, consultas, CRM y agenda de visitas.",
    accent: "var(--color-acc-inmob)",
  },
  {
    slug: "educacion",
    label: "Educación",
    to: "/soluciones/educacion",
    tagline: "Oferta académica, inscripciones y seguimiento de estudiantes.",
    accent: "var(--color-acc-educacion)",
  },
  {
    slug: "talleres",
    label: "Talleres y Reparaciones",
    to: "/soluciones/talleres-reparaciones",
    tagline: "Órdenes de trabajo, presupuestos, estados y avisos.",
    accent: "var(--color-acc-talleres)",
  },
]

export function industryBySlug(slug) {
  return INDUSTRIES.find((i) => i.slug === slug)
}
