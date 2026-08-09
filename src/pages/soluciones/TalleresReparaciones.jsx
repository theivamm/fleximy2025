import SolutionHero from "../../components/soluciones/SolutionHero"
import TalleresScene from "../../components/soluciones/scenes/TalleresScene"
import {
  Problem,
  FeatureList,
  Audience,
  FaqBlock,
  CtaBlock,
} from "../../components/soluciones/Blocks"
import { SOLUCIONES } from "../../data/soluciones"

const data = SOLUCIONES.talleres

export default function TalleresReparaciones() {
  return (
    <main className="bg-paper text-text">
      <SolutionHero
        data={data}
        lines={["Cada trabajo con un estado claro.", "Cada cliente mejor informado."]}
      >
        <TalleresScene />
      </SolutionHero>
      <Problem data={data} accent={data.accent} />
      <FeatureList
        accent={data.accent}
        title={data.recepcion.titulo}
        lead={data.recepcion.lead}
        items={data.recepcion.items}
      />
      <FeatureList
        accent={data.accent}
        title={data.presupuesto.titulo}
        items={data.presupuesto.items}
        dark
      />
      <FeatureList
        accent={data.accent}
        title={data.estados.titulo}
        items={data.estados.items}
        nota={data.estados.nota}
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
        title={data.inventario.titulo}
        items={data.inventario.items}
        nota={data.inventario.nota}
      />
      <Audience data={data} accent={data.accent} />
      <FaqBlock data={data} />
      <CtaBlock data={data} />
    </main>
  )
}
