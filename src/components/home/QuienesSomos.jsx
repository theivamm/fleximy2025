const POINTS = [
  "Entendemos el negocio antes de diseñar.",
  "Diseño y desarrollo trabajan juntos.",
  "Construimos en etapas claras y visibles.",
  "Acompañamos después del lanzamiento.",
]

function AbstractVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      <div className="absolute inset-0 rounded-3xl border border-outline bg-surface-1/30 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div
          className="absolute top-[12%] left-[10%] font-display text-[7rem] font-bold leading-none text-primary/15 select-none"
          aria-hidden="true"
        >
          F
        </div>

        <div className="absolute top-[15%] right-[12%] w-20 h-14 rounded-lg border border-outline bg-surface-2/50">
          <div className="flex gap-1 p-2">
            <span className="size-1.5 rounded-full bg-primary/50" />
            <span className="size-1.5 rounded-full bg-cyan/50" />
            <span className="size-1.5 rounded-full bg-accent/50" />
          </div>
          <div className="px-2 pb-2 flex flex-col gap-1">
            <div className="h-1 w-full rounded bg-surface-3/50" />
            <div className="h-1 w-3/4 rounded bg-surface-3/30" />
          </div>
        </div>

        <div className="absolute bottom-[18%] left-[8%] w-28 h-20 rounded-lg border border-outline bg-surface-2/50 p-2.5">
          <div className="h-1.5 w-10 rounded bg-primary/30 mb-2" />
          <div className="flex items-end gap-1 h-8">
            {[30, 55, 45, 70, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-[12%] right-[10%] w-24 h-16 rounded-lg border border-outline bg-surface-2/50 p-2">
          <div className="flex gap-1 mb-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-success/60" />
            <div className="h-1.5 w-8 rounded bg-surface-3/50" />
          </div>
          <div className="flex gap-1 mb-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            <div className="h-1.5 w-6 rounded bg-surface-3/40" />
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <div className="h-1.5 w-10 rounded bg-surface-3/30" />
          </div>
        </div>

        <div className="absolute top-[45%] left-[45%] w-px h-24 bg-gradient-to-b from-primary/20 to-transparent rotate-12" />
        <div className="absolute top-[30%] right-[30%] w-px h-16 bg-gradient-to-b from-cyan/15 to-transparent -rotate-6" />
      </div>
    </div>
  )
}

export default function QuienesSomos() {
  return (
    <section id="nosotros" className="section-space relative">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <span className="kicker">Somos Fleximy</span>
            <h2 className="h2-title mt-4 max-w-[24ch] text-text-1">
              Diseño, tecnología y visión de negocio en un mismo equipo.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-text-2 max-w-[52ch]">
              Somos una agencia y product studio que transforma ideas, procesos y oportunidades
              en productos digitales concretos. Trabajamos cerca de cada negocio para entender
              qué necesita, diseñar una solución clara y desarrollarla de principio a fin.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-2 max-w-[52ch]">
              No buscamos sumar tecnología porque sí. Creamos herramientas que tengan sentido
              para las personas que las usan y para el negocio que las sostiene.
            </p>

            <ul className="mt-8 grid gap-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-text-1">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <AbstractVisual />
        </div>
      </div>
    </section>
  )
}
