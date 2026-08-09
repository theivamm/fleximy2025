import SolutionHero from "../../components/soluciones/SolutionHero"
import InmobScene from "../../components/soluciones/scenes/InmobScene"
import {
  Problem,
  Duo,
  FeatureList,
  Recorrido,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.inmobiliarias

export default function Inmobiliarias() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["De la búsqueda de una propiedad", "al seguimiento comercial"]}
      >
        <InmobScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <Duo data={data} accent={data.accent} />
      <FeatureList
        accent={data.accent}
        title={data.agenda.titulo}
        lead={data.agenda.lead}
        items={data.agenda.items}
      />
      <FeatureList
        accent={data.accent}
        title={data.gestion.titulo}
        lead={data.gestion.lead}
        items={data.gestion.items}
        dark
      />
      <Recorrido data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
