import { Printer } from "lucide-react"
import { LEGAL_NOTA } from "../../data/legal"

function renderBloque(bloque, index) {
  if (bloque.tipo === "p") {
    return (
      <p key={index} className="max-w-[65ch] text-body text-muted">
        {bloque.texto}
      </p>
    )
  }
  if (bloque.tipo === "ul") {
    return (
      <ul key={index} className="grid gap-2.5">
        {bloque.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-body text-muted">
            <span className="mt-[0.6em] size-2 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (bloque.tipo === "ol") {
    return (
      <ol key={index} className="grid gap-2.5">
        {bloque.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-body text-muted">
            <span className="font-mono text-micro text-muted">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    )
  }
  return null
}

export default function LegalDoc({ doc }) {
  const irASeccion = (n) => {
    const el = document.getElementById(`${doc.id}-${n}`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const imprimir = () => {
    window.print()
  }

  return (
    <main className="bg-paper text-text">
      <section className="border-b border-line pb-12 pt-28 lg:pt-36">
        <div className="container-narrow">
          <p className="kicker">{doc.kicker}</p>
          <h1 className="mt-6 text-h1 text-text">{doc.h1}</h1>
          <p className="mt-5 max-w-[60ch] text-lead text-muted">{doc.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-mono text-micro text-muted">
              Última actualización: {doc.actualizacion}
            </p>
            <button
              type="button"
              onClick={imprimir}
              className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] border border-line bg-paper-bright px-4 text-small font-semibold text-text transition-colors hover:border-ink/30"
            >
              <Printer className="size-4" />
              Imprimir o guardar como PDF
            </button>
          </div>

          <p className="mt-6 max-w-[60ch] rounded-xl border border-line bg-accent-soft px-4 py-3 text-small text-text">
            {LEGAL_NOTA}
          </p>
        </div>
      </section>

      <section className="container-narrow py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
          <nav
            aria-label={`Índice de ${doc.h1}`}
            className="lg:sticky lg:top-28 print:hidden"
          >
            <p className="font-mono text-micro text-muted">Índice</p>
            <ol className="mt-4 hidden flex-col gap-1 lg:flex">
              {doc.secciones.map((sec) => (
                <li key={sec.n}>
                  <a
                    href={`#${doc.id}-${sec.n}`}
                    className="flex items-baseline gap-2 rounded-lg px-3 py-1.5 text-small text-muted transition-colors hover:bg-paper-bright hover:text-text"
                  >
                    <span className="font-mono text-micro text-muted">{sec.n}</span>
                    {sec.titulo}
                  </a>
                </li>
              ))}
            </ol>

            <select
              aria-label="Ir a una sección"
              onChange={(e) => {
                const n = e.target.value
                if (n) irASeccion(n)
                e.target.value = ""
              }}
              className="mt-3 w-full rounded-[var(--radius-field)] border border-line bg-paper-bright px-3 py-2.5 text-small text-text lg:hidden"
            >
              <option value="">Ir a una sección…</option>
              {doc.secciones.map((sec) => (
                <option key={sec.n} value={sec.n}>
                  {sec.n} · {sec.titulo}
                </option>
              ))}
            </select>
          </nav>

          <div className="grid gap-10">
            {doc.secciones.map((sec) => (
              <section
                key={sec.n}
                id={`${doc.id}-${sec.n}`}
                aria-labelledby={`${doc.id}-titulo-${sec.n}`}
                className="scroll-mt-28 border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <h2 id={`${doc.id}-titulo-${sec.n}`} className="text-h3 text-text">
                  <span className="mr-3 font-mono text-micro text-muted">{sec.n}.</span>
                  {sec.titulo}
                </h2>
                <div className="mt-4 grid gap-4">
                  {sec.bloques.map((bloque, i) => renderBloque(bloque, i))}
                </div>
              </section>
            ))}

            <section className="rounded-[var(--radius-card)] border border-line bg-paper-bright p-6">
              <p className="font-mono text-micro text-muted">versión</p>
              <p className="mt-2 text-small text-muted">
                {doc.h1} · actualización {doc.actualizacion} · Fleximy
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
