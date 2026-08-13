import SectionIntro from "../ui/SectionIntro"

const STAGES = [
  { n: "01", t: "Entendemos", d: "Escuchamos tu negocio, tus procesos y tu objetivo real.", tone: "primary" },
  { n: "02", t: "Diseñamos", d: "Interfaces y experiencia pensadas para tus usuarios.", tone: "secondary" },
  { n: "03", t: "Construimos", d: "Desarrollamos el producto en etapas cortas y visibles.", tone: "blue" },
  { n: "04", t: "Probamos", d: "Testeamos flujos, datos y detalles antes de publicar.", tone: "warning" },
  { n: "05", t: "Lanzamos", d: "Publicamos, conectamos y dejamos todo funcionando.", tone: "accent" },
  { n: "06", t: "Mejoramos", d: "Seguimos midiendo, iterando y creciendo con vos.", tone: "success" },
]

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-28">
      <SectionIntro
        kicker="Cómo trabajamos"
        title={<>De una idea a un producto que funciona</>}
        lead="Un proceso claro, con etapas cortas y resultados visibles en cada paso."
      />

      <div className="container-wide mt-14">
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {/* Línea viva */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px lg:block" style={{ backgroundImage: "var(--gradient-primary)" }}>
            <span className="absolute -top-[3px] left-0 size-[7px] animate-pulse rounded-full bg-accent" />
          </div>

          {STAGES.map((s) => (
            <li key={s.n} className="group relative flex gap-4 lg:flex-col lg:gap-0">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-outline-strong bg-surface-1 font-mono text-xs font-bold text-text-1 transition-all duration-300 group-hover:scale-110"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 4px var(--${s.tone}-soft)`
                    e.currentTarget.style.borderColor = `var(--${s.tone})`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.borderColor = ""
                  }}
                >
                  {s.n}
                </span>
                {s.tone && (
                  <span className="mt-2 hidden size-1.5 rounded-full lg:block" style={{ backgroundColor: `var(--${s.tone})` }} />
                )}
              </div>
              <div className="lg:mt-4">
                <h3 className="text-base font-bold text-text-1">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
