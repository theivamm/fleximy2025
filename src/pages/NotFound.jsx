import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, PlugZap } from "lucide-react"

const ACCESOS = [
  { label: "Probar demos", to: "/demos" },
  { label: "Ver precios", to: "/precios" },
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
  { label: "Contactar a Fleximy", to: "/contacto" },
]

export default function NotFound() {
  const [reconectado, setReconectado] = useState(false)

  const atender = (activo) => () => setReconectado(activo)

  return (
    <div className="container-site flex min-h-screen flex-col justify-center pt-24 pb-16">
      <p className="kicker mb-6">
        <span className="text-accent">404</span> Ruta inexistente
      </p>
      <h1 className="max-w-[16ch] text-h1 text-text">Esta página no está disponible</h1>
      <p className="mt-5 max-w-[60ch] text-lead text-muted">
        Puede que el enlace haya cambiado o que la dirección esté incompleta. Volvé al inicio o
        elegí una de nuestras soluciones.
      </p>

      <div
        className="mt-12 max-w-xl"
        onPointerEnter={atender(true)}
        onPointerLeave={atender(false)}
      >
        <svg
          viewBox="0 0 520 110"
          className="w-full"
          role="img"
          aria-label="Conexión entre el sitio y el panel interrumpida en el nodo 404"
        >
          <rect x="8" y="42" width="100" height="38" rx="10" fill="var(--color-paper-bright)" stroke="var(--color-line)" />
          <rect x="412" y="42" width="100" height="38" rx="10" fill="var(--color-paper-bright)" stroke="var(--color-line)" />
          <rect
            x="230"
            y="26"
            width="60"
            height="58"
            rx="12"
            fill={reconectado ? "var(--color-accent)" : "var(--color-accent-soft)"}
            stroke={reconectado ? "var(--color-accent)" : "var(--color-line)"}
            style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
          />

          <line
            x1="108"
            y1="61"
            x2="230"
            y2="55"
            stroke="var(--color-muted)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />

          <line
            x1="290"
            y1="55"
            x2="412"
            y2="61"
            stroke={reconectado ? "var(--color-accent)" : "var(--color-line)"}
            strokeWidth="2.5"
            strokeDasharray="8 4"
            opacity={reconectado ? 1 : 0.45}
            style={{ transition: "stroke 300ms ease, opacity 300ms ease" }}
          />

          <text x="58" y="66" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--color-text)">
            Sitio
          </text>
          <text x="462" y="66" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--color-text)">
            Panel
          </text>

          <g className="cursor-pointer">
            <rect
              x="230"
              y="26"
              width="60"
              height="58"
              rx="12"
              fill="transparent"
              onPointerEnter={atender(true)}
              onPointerLeave={atender(false)}
              onFocus={atender(true)}
              onBlur={atender(false)}
              tabIndex={0}
              role="button"
              aria-label="Recomponer la conexión y ver los accesos"
            />
            <text x="260" y="55" textAnchor="middle" className="font-mono" fontSize="16" fontWeight="700" fill="var(--color-text)">
              404
            </text>
            {reconectado && (
              <text x="260" y="76" textAnchor="middle" className="font-mono" fontSize="9" fill="var(--color-text)">
                reconectado
              </text>
            )}
          </g>
        </svg>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/"
          className={`inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-6 text-sm font-semibold transition-all ${
            reconectado ? "bg-accent text-ink shadow-lift" : "bg-accent text-ink"
          }`}
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <Link
          to="/soluciones"
          className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] border border-line bg-paper-bright px-6 text-sm font-semibold text-text transition-colors hover:border-ink/30"
        >
          Ver soluciones
          <ArrowRight size={16} />
        </Link>
      </div>

      <nav className="mt-14 flex flex-wrap gap-x-6 gap-y-2" aria-label="Accesos recomendados">
        {ACCESOS.map((item) => (
          <Link key={item.label} to={item.to} className="text-small text-muted hover:text-text">
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="mt-10 flex items-center gap-2 font-mono text-micro text-muted">
        <PlugZap className="size-3.5" />
        Sin salida brusca: tenés caminos claros para continuar.
      </p>
    </div>
  )
}
