import GradientText from "../ui/GradientText"

export default function ManifestoSection() {
  return (
    <section className="container-site py-24 sm:py-32">
      <div className="flex flex-col items-start gap-8">
        <span className="kicker">Manifiesto</span>
        <h2 className="h2-title max-w-5xl font-display text-text-1">
          No hacemos páginas para llenar espacio.{" "}
          <GradientText>Diseñamos productos</GradientText> para resolver problemas.
        </h2>
        <p className="lead-text max-w-2xl text-text-secondary">
          Combinamos estrategia, diseño y desarrollo para transformar procesos, ideas y oportunidades en experiencias digitales concretas.
        </p>
      </div>
    </section>
  )
}
