import { useState } from "react"
import "./industry-ribbon.css"

/* ==========================================================================
   SOLUCIONES POR RUBRO (spec §10)
   Grilla de tarjetas compactas: icono + nombre + hasta 3 capacidades.
   Mobile: 4 tarjetas iniciales + botón "Ver más soluciones" con aria-expanded.
   ========================================================================== */

const RUBROS = [
  {
    icon: "gastro",
    name: "Gastronomía",
    caps: ["Reservas y pedidos", "Carta digital", "Turnos y colas"],
  },
  {
    icon: "inmo",
    name: "Inmobiliarias",
    caps: ["Propiedades y visitas", "Agenda de turnos", "Seguimiento de clientes"],
  },
  {
    icon: "optica",
    name: "Ópticas",
    caps: ["Turnos y recetas", "Historial de clientes", "Reposición de stock"],
  },
  {
    icon: "comercio",
    name: "Comercio",
    caps: ["Catálogo en línea", "Pedidos y pagos", "Control de stock"],
  },
  {
    icon: "servicios",
    name: "Servicios",
    caps: ["Agenda de turnos", "Órdenes de trabajo", "Cobros y facturación"],
  },
  {
    icon: "logistica",
    name: "Logística",
    caps: ["Guías y entregas", "Estados en tiempo real", "Reportes de operación"],
  },
  {
    icon: "educacion",
    name: "Educación",
    caps: ["Alumnos y grupos", "Inscripciones", "Pagos de aranceles"],
  },
  {
    icon: "fitness",
    name: "Fitness",
    caps: ["Planes y clases", "Asistencia", "Pagos recurrentes"],
  },
]

const MOBILE_INITIAL = 4

export default function IndustryRibbon() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="rubros" className="rib rib--cards" aria-labelledby="rib-title">
      <header className="rib-header">
        <p className="rib-eyebrow">Una plataforma distinta para cada negocio</p>
        <h2 id="rib-title" className="rib-title font-display">
          Si tu negocio funciona distinto, su tecnología también debería hacerlo.
        </h2>
        <p className="rib-bajada">
          Diseñamos cada plataforma alrededor de sus clientes, sus procesos y su forma de trabajar.
        </p>
      </header>

      <div id="rib-grid" className={`rib-grid ${expanded ? "is-open" : ""}`}>
        {RUBROS.map((r) => (
          <article key={r.name} className="rib-card">
            <span className="rib-card__icon" aria-hidden="true">
              <RibIcon name={r.icon} />
            </span>
            <h3 className="rib-card__name">{r.name}</h3>
            <ul className="rib-card__caps">
              {r.caps.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="rib-morewrap">
        <button
          className="rib-more"
          type="button"
          aria-expanded={expanded}
          aria-controls="rib-grid"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Ver menos soluciones" : "Ver más soluciones"}
        </button>
      </div>

      <div className="rib-closing">
        <h3 className="font-display">No importa el rubro. Importa cómo funciona tu negocio.</h3>
        <p className="rib-sub">Contanos tu caso y diseñamos una solución alrededor de él.</p>
      </div>
    </section>
  )
}

function RibIcon({ name }) {
  const p = "currentColor"
  switch (name) {
    case "gastro":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
          <path d="M4 9h4" />
          <path d="M6 9v12" />
          <path d="M14 3c-1 1.5-1 3.5 1 5 1.4 1.1 1.4 3.5 0 5" />
          <path d="M18 3v18" />
        </svg>
      )
    case "inmo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20h18" />
          <path d="M5 20V10l7-5 7 5v10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      )
    case "optica":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        </svg>
      )
    case "comercio":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12l1.5 13h-15L6 7z" />
          <path d="M9 7a3 3 0 0 1 6 0" />
        </svg>
      )
    case "servicios":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
        </svg>
      )
    case "logistica":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="12" height="8" rx="1" />
          <path d="M15 10h4l3 3v3h-7" />
          <circle cx="7" cy="19" r="1.6" />
          <circle cx="18" cy="19" r="1.6" />
        </svg>
      )
    case "educacion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5" />
          <path d="M21 9v5" />
        </svg>
      )
    case "fitness":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={p} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />
        </svg>
      )
    default:
      return null
  }
}
