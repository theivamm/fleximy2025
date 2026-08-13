import { Printer } from "lucide-react"

function renderBloque(bloque, index) {
  if (bloque.tipo === "p") {
    return (
      <p key={index} className="text-body max-w-[65ch] text-text-2">
        {bloque.texto}
      </p>
    )
  }
  if (bloque.tipo === "ul") {
    return (
      <ul key={index} className="grid gap-2.5">
        {bloque.items.map((item, i) => (
          <li key={i} className="text-body flex items-start gap-3 text-text-2">
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
          <li key={i} className="text-body flex items-start gap-3 text-text-2">
            <span className="font-mono text-micro text-text-3">{String(i + 1).padStart(2, "0")}</span>
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
    <main>
      <section className="border-b border-outline pb-12 pt-32 lg:pt-40">
        <div className="container-narrow">
          <p className="kicker">{doc.kicker}</p>
          <h1 className="text-h1 mt-6 text-text-1">{doc.h1}</h1>
          <p className="lead-text mt-5 max-w-[60ch] text-text-2">{doc.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-mono text-micro text-text-3">
              Última actualización: {doc.actualizacion}
            </p>
            <button
              type="button"
              onClick={imprimir}
              className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] border border-outline bg-surface-1/60 px-4 text-small font-semibold text-text-1 transition-colors hover:border-ink/30"
            >
              <Printer className="size-4" />
              Imprimir o guardar como PDF
            </button>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
          <nav
            aria-label={`Índice de ${doc.h1}`}
            className="print:hidden"
          >
            <p className="font-mono text-micro text-text-3">Índice</p>
            <ol className="mt-4 hidden flex-col gap-1 lg:flex">
              {doc.secciones.map((sec) => (
                <li key={sec.n}>
                  <a
                    href={`#${doc.id}-${sec.n}`}
                    className="flex items-baseline gap-2 rounded-lg px-3 py-1.5 text-small text-text-2 transition-colors hover:bg-surface-2/40 hover:text-text-1"
                  >
                    <span className="font-mono text-micro text-text-3">{sec.n}</span>
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
              className="mt-3 w-full rounded-[var(--radius-field)] border border-outline bg-surface-1/60 px-3 py-2.5 text-small text-text-1 lg:hidden"
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
                className="scroll-mt-28 border-t border-outline pt-8 first:border-t-0 first:pt-0"
              >
                <h2 id={`${doc.id}-titulo-${sec.n}`} className="text-h3 text-text-1">
                  <span className="mr-3 font-mono text-micro text-text-3">{sec.n}.</span>
                  {sec.titulo}
                </h2>
                <div className="mt-4 grid gap-4">
                  {sec.bloques.map((bloque, i) => renderBloque(bloque, i))}
                </div>
              </section>
            ))}

            <section className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
              <p className="font-mono text-micro text-text-3">versión</p>
              <p className="mt-2 text-small text-text-2">
                {doc.h1} · actualización {doc.actualizacion} · Fleximy
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
