import SolutionHero from "../../components/soluciones/SolutionHero"
import EducacionScene from "../../components/soluciones/scenes/EducacionScene"
import {
  SectionHead,
  Problem,
  FeatureList,
  Recorrido,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.educacion

const ofertaItems = data.experiencia.grupos.flatMap((g) => g.items)

export default function Educacion() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Tu propuesta educativa", "y la gestión de alumnos, conectadas"]}
      >
        <EducacionScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <FeatureList
        accent={data.accent}
        title={data.experiencia.titulo}
        lead={data.experiencia.lead}
        items={ofertaItems}
      />
      <FeatureList
        accent={data.accent}
        title={data.portal.titulo}
        items={data.portal.items}
        nota={data.portal.nota}
        dark
      />
      <FeatureList
        accent={data.accent}
        title={data.panel.titulo}
        lead={data.panel.lead}
        items={data.panel.items}
      />
      <section className="bg-dark-surface py-20 text-text-invert lg:py-28">
        <div className="container-site">
          <SectionHead
            kicker="Modalidades"
            title={data.modalidades.titulo}
            lead={data.modalidades.nota}
            dark
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {data.modalidades.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line-dark bg-ink-soft px-4 py-2 text-small text-text-invert/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <Recorrido data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
