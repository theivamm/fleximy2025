import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="section-space pt-28">
      <div className="container max-w-[480px] text-center">
        <p className="font-display text-[6rem] font-bold leading-none text-text-3/30">404</p>
        <h1 className="h2-title mt-4 text-text-1">Pagina no encontrada</h1>
        <p className="lead-text mt-4 text-text-2">
          La pagina que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-7 text-sm font-semibold text-white mt-8 transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
