import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-start justify-center min-h-screen pt-24 pb-16">
      <p className="kicker mb-6">
        <span className="text-accent">404</span> Ruta inexistente
      </p>
      <h1 className="text-h1 text-text max-w-[16ch] mb-4">
        Esta página no está disponible
      </h1>
      <p className="text-lead text-muted measure-narrow mb-10">
        Puede que el enlace haya cambiado o que la dirección esté incompleta. Volvé al
        inicio o elegí una de nuestras soluciones.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-[var(--radius-btn)] bg-accent text-ink text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <Link
          to="/soluciones"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-[var(--radius-btn)] border border-line bg-paper-bright text-text text-sm font-semibold"
        >
          Ver soluciones
          <ArrowRight size={16} />
        </Link>
      </div>

      <nav className="mt-14 flex flex-wrap gap-x-6 gap-y-2" aria-label="Accesos recomendados">
        {[
          { label: "Probar demos", to: "/demos" },
          { label: "Ver precios", to: "/precios" },
          { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
          { label: "Contactar a Fleximy", to: "/contacto" },
        ].map((item) => (
          <Link key={item.label} to={item.to} className="text-small text-muted hover:text-text">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
