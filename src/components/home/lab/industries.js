import {
  Building2,
  CalendarDays,
  Coffee,
  Gauge,
  GraduationCap,
  ShoppingBag,
  Truck,
  Wrench,
} from "lucide-react"

/**
 * Las ocho industrias del Laboratorio Fleximy.
 * `tone` se usa como acento (color) de marca en selector, frame y vista.
 */
export const INDUSTRIES = [
  { id: "gastronomia", label: "Gastronomía", product: "Café Nómada", tone: "acc-gastro", Icon: Coffee, kind: "mini" },
  { id: "ecommerce", label: "Ecommerce", product: "Distrito", tone: "acc-comercio", Icon: ShoppingBag, kind: "concept" },
  { id: "inmobiliaria", label: "Inmobiliarias", product: "Habitat CRM", tone: "acc-inmob", Icon: Building2, kind: "mini" },
  { id: "turnos", label: "Servicios y turnos", product: "Áurea Studio", tone: "acc-turnos", Icon: CalendarDays, kind: "concept" },
  { id: "educacion", label: "Educación", product: "Nexo Campus", tone: "acc-educacion", Icon: GraduationCap, kind: "concept" },
  { id: "talleres", label: "Talleres", product: "MotorLab", tone: "acc-talleres", Icon: Wrench, kind: "concept" },
  { id: "logistica", label: "Logística", product: "Ruta", tone: "acc-logistica", Icon: Truck, kind: "concept" },
  { id: "pymes", label: "Gestión para PyMEs", product: "Pulso", tone: "acc-gestion", Icon: Gauge, kind: "concept" },
]

export const toneVar = (tone) => `var(--color-${tone})`
export const toneSoft = (tone) => `color-mix(in srgb, var(--color-${tone}) 14%, transparent)`
export const toneFaint = (tone) => `color-mix(in srgb, var(--color-${tone}) 8%, transparent)`
